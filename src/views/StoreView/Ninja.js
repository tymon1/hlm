import s from './css/Ramp.module.css';
import { useDispatch, useSelector } from 'react-redux';

import { drag, source } from '../../slice/AppSlice';

import { rmNinja,
				 palletRecover,
				 checkTrucks,
				 addPal,
				 remPal,
				 addPalToZone } from '../../slice/StoreSlice';

import { useEffect } from 'react';

import { colorMatch, fieldMatch } from '../../app/helpers';




export function Ninja({ ramp }) {

	const dispatch = useDispatch();
	const docks = useSelector(state => state.store.docks)
	const zones = useSelector(state => state.store.zones)
	const ramps = useSelector(state => state.store.ramps)
	const levelColorZones = useSelector(state => state.app.level.color_zone)
	const recPc = useSelector(state => state.app.recover_step)

	const ninja_level = useSelector(state => state.app.ninja_level)
	const ninja_speed = useSelector(state => state.app.ninja_speed)
	const speed = ninja_speed[ ninja_level ]

	const loading = useSelector(state => state.app.level.loadTruck)
	const highlight = useSelector(state => state.store.highlight)



	useEffect( () => { 
		const intIdx = setInterval( () => { 

			// full truck loading 
			if (loading) { // && ninja level
				let tPal = docks[1].truck.pallets
				let tTar = docks[1].truck.target
				let tr_id = docks[1].truck.id

				// push on ramp
				// console.log("tpal.len",tPal.length," === highlight",highlight)
				if (tPal.length === highlight &&
				    ramps[1].pallets.length === 0) {

					console.log("da na rampe", tTar[highlight])

					let cZone = zones.find( zone => {
						return zone.pallets.find( pal => {
							if (pal.id === tTar[highlight].pal_id) { return pal }
						})
					})

					let pal = cZone.pallets.filter( pal => {
						if (pal.id === tTar[highlight].pal_id) { return pal }
					})
					              // ramp index
					dispatch( addPal({ index: 1, pallet: pal[0], name: "ramp" }) ) 
					dispatch( remPal({ index: cZone.no, pallet: pal[0], name: "zone" }) ) 

				}
				// push to truck
				else if ( ramps[1].pallets.length > 0 &&
					        ramps[1].pallets.some(p => p.id === tTar[highlight].pal_id )) {

					console.log("da na traka")

					let spal = ramps[1].pallets.filter( pal => {
						if (pal.id === tTar[highlight].pal_id) { return pal }
					})

					if (spal[0].recovered < 100) {

						dispatch( palletRecover( {
							pallet: spal[0],
							rampIndex: 1,
							percent: recPc 
						}) )
					}

					else {
						dispatch( addPal({ index: tr_id, pallet: spal[0], name: "truck", }) ) 
						dispatch( remPal({ index: 1, pallet: spal[0], name: "ramp", }) ) 
					}

				}

			}

			// regular truck unloading
			// moving pallets to zones
			else {

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
							dispatch( remPal({ "index":tramp.no, name:"ramp", "pallet":pal }) )
						}
						else {
							let matchField = fieldMatch({ "pallet":pal,
																						"color_fields":levelColorZones,
																						"fields":zones })
							if (matchField !== false) {
								dispatch( addPalToZone({ "index":matchField, "pallet":pal }) )
								dispatch( remPal({ "index":tramp.no, name:"ramp", "pallet":pal }) )
							}
						}
					}
				}

				else {
					// dispatch( checkTrucks() ) 
				}

			}
			dispatch( checkTrucks() ) 

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
