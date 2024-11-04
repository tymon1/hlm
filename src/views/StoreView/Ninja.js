import s from './css/Ramp.module.css';
import { useDispatch, useSelector } from 'react-redux';

import { drag, source } from '../../slice/AppSlice';

import { rmNinja,
				 remPalFrRamp,
				 palletRecover,
				 checkTrucks,
				 addPalToZone } from '../../slice/StoreSlice';

import { useEffect } from 'react';

import { colorMatch, fieldMatch } from '../../app/helpers';




export function Ninja({ ramp }) {

	const dispatch = useDispatch();
	const zones = useSelector(state => state.store.zones)
	const ramps = useSelector(state => state.store.ramps)
	const levelColorZones = useSelector(state => state.app.level.color_zone)
	const recPc = useSelector(state => state.app.recover_step)

	const ninja_level = useSelector(state => state.app.ninja_level)
	const ninja_speed = useSelector(state => state.app.ninja_speed)
	const speed = ninja_speed[ ninja_level ]


	useEffect( () => { 
		const intIdx = setInterval( () => { 
			// makaroni code start
			// any pallets on ramp?

			let tramp = []
			if (ninja_level > 4) { 
				for (let i=0; i<3; i++) {
					if (ramps[i].pallets.length > 0) {
						tramp = ramps[i]  
						break;
					}
					else {
						tramp = ramps[ramp.no]
					}
				}
			}
			else { tramp = ramps[ramp.no] }

			////
			if ( ramps[tramp.no].pallets.length > 0 ) {

				let pal = ramps[tramp.no].pallets[ ramps[tramp.no].pallets.length-1 ]

				if ( pal.recovered < 100 ) {
					dispatch( palletRecover( {
						pallet: pal,
						rampIndex: tramp.no,
						percent: recPc 
					}) )
				}
				else {
					// returns matching color field index or false
					let matchIndex = colorMatch({"pallet":pal, 
																			 "color_fields":levelColorZones})
					if (matchIndex !== false) {
						dispatch( addPalToZone({ "index":matchIndex, "pallet":pal }) )
						dispatch( remPalFrRamp({ "index":tramp.no, "id":pal.id }) )
					}
					else {
						let matchField = fieldMatch({ "pallet":pal,
																					"color_fields":levelColorZones,
																					"fields":zones })
						if (matchField !== false) {
							dispatch( addPalToZone({ "index":matchField, "pallet":pal }) )
							dispatch( remPalFrRamp({ "index":tramp.no, "id":pal.id }) )
						}
					}
				}
			}

			else {
				dispatch( checkTrucks() ) 
			}


			// }
			// makaroni code end
		}, speed)

		return () => {
			clearInterval(intIdx)
		}
	})

	let ninjaPreLook = level => {
		switch (level) {
			case 0:
				return s.ninjaLogo
			case 1:
				return s.ninjaLogo_p
			case 2:
				return s.ninjaLogo_pp
			case 3:
				return s.ninjaLogo_ppp
			case 4:
				return s.ninjaLogo_pppp
			default:
				return ""
		}
	}

	return (

		<div className={ ninjaPreLook( ninja_level -1 ) }
				draggable = { true }

				onDragStart = { () => {
					dispatch( drag( true ) )
					dispatch( source({ name: "ninja" }) )
				}}

				onDragEnd = { () => {
					dispatch( drag( false ) )
					dispatch( rmNinja({ rampInx: ramp.no }) )
				}} >

		</div>
	)
}
