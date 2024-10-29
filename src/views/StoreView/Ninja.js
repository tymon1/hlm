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
	const picked = useSelector(state => state.app.picked)
	const dragged = useSelector(state => state.app.drag)
	const recPc = useSelector(state => state.app.recover_step)

	const ninja_level = useSelector(state => state.app.ninja_level)
	const ninja_speed = useSelector(state => state.app.ninja_speed)
	const speed = ninja_speed[ ninja_level ]


	useEffect( () => { 
		const intIdx = setInterval( () => { 
			// makaroni code start
			// any pallets on ramp?

			if ( ramps[ramp.no].pallets.length > 0 ) {

				let pal = ramps[ramp.no].pallets[0]

				if ( pal.recovered < 100 ) {
					dispatch( palletRecover( {
						pallet: pal,
						rampIndex: ramp.no,
						percent: recPc 
					}) )
				}
				else {
					// returns matching color field index or false
					let matchIndex = colorMatch({"pallet":pal, 
																			 "color_fields":levelColorZones})
					if (matchIndex !== false) {
						dispatch( addPalToZone({ "index":matchIndex, "pallet":pal }) )
						dispatch( remPalFrRamp({ "index":ramp.no, "id":pal.id }) )
					}
					else {
						let matchField = fieldMatch({ "pallet":pal,
																					"color_fields":levelColorZones,
								                          "fields":zones })
						if (matchField !== false) {
							dispatch( addPalToZone({ "index":matchField, "pallet":pal }) )
							dispatch( remPalFrRamp({ "index":ramp.no, "id":pal.id }) )
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
