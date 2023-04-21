import { addPalToZone, addPalToRamp, addPalToTruck,
				 remPalFrZone, remPalFrRamp, remPalFrTruck,
				 addQueueTruck, 
				 setMess, 
				 resetZones, 
				 parkTruck, 
				 setSorting, 
				 setTruckCounter, setPalletsCounter,
				 selectPallette,
				 unSelectPal,
				 setNewTarget,
				 truckOnDockReady, } from '../slice/StoreSlice';

import { saveTimer, setStamp, 
	       increaseWave,
	       resetWave,
	       resetTimeResults,
	       increaseLevel,
	       preparingLevel,
	       popTimeSum,
				 showMsg,
				 loadTruck,
				 setBonusCounter,
				 setColorZone, colorZonesReset,
	       runLevel } from '../slice/AppSlice';

import { genTruck, 
				 unloadingDone, 
				 loadingDone, 
				 drawUnloaded, 
				 drawUnloadedArray, 
				 totalTime, 
				 makeMinutes, 
				 drawZones, 
				 colorStoreMess, 
				 storeMess } from '../app/helpers.js';




export const storeWare = (state) => (next) => (action) => {

	let wave_times = state.getState().app.wave_times
	let level = state.getState().app.level
	let levels = state.getState().app.levels
	let docks = state.getState().store.docks
	let ramps = state.getState().store.ramps
	let zones = state.getState().store.zones
	let stamp = state.getState().app.stamp
	let timer = state.getState().app.timer
	

	switch (action.type) {

		// addPal helper
		//
		case 'store/addPal':

			if (action.payload.name === "zone") { 
				state.dispatch( addPalToZone(action.payload) ) 
			}
			if (action.payload.name === "ramp") { 
				state.dispatch( addPalToRamp(action.payload) ) 
			}
			if (action.payload.name === "truck") { 
				state.dispatch( addPalToTruck(action.payload) ) 
				// count bonus truck pallettes:
				if (action.payload.pallet.selected) {
					state.dispatch( setBonusCounter( { level: level.current } ) ) 
					state.dispatch( unSelectPal() )
				}
			}
			break


		// remPal helper
		//
		case 'store/remPal':

			if (action.payload.name === "zone") { 
				state.dispatch( remPalFrZone(action.payload) ) 
			}
			if (action.payload.name === "ramp") { 
				state.dispatch( remPalFrRamp(action.payload) ) 
			}
			if (action.payload.name === "truck") { 
				state.dispatch( remPalFrTruck(action.payload) ) 
			}
			break


		// check which truck is empty to unpark it
		//
		case 'store/checkTrucks':

			let current = levels[ level.current ]

			for ( let i= 0; i< docks.length; i++ ) {

				// if regular trucks unloaded - unpark it
				if ( docks[i].truck.id && 
					 (docks[i].truck.type !== 'bonus' && docks[i].truck.ready === false) &&
					 (docks[i].truck.type !== 'bonus' && docks[i].truck.pallets.length === 0) && 
					 (docks[i].truck.type !== 'full' && docks[i].truck.ready === false) &&
					 (docks[i].truck.type !== 'full' && docks[i].truck.pallets.length === 0) && 
					 ramps[i].pallets.length === 0 ) {

					state.dispatch( truckOnDockReady({index: i, type: docks[i].truck.type}) )
				}

				// if full truck loaded ..
				if ( docks[i].truck.id && 
						 docks[i].truck.type === 'full'
						 && docks[i].truck.pallets.length > 0
						 && docks[i].truck.pallets[docks[i].truck.pallets.length -1].id === 
						 docks[i].truck.target[docks[i].truck.pallets.length -1].pal_id
					 ) {
					// is it the last target?
					if (docks[i].truck.pallets.length === docks[i].truck.target.length) {
						console.log("FULL TRUCK LOADED !!")
						state.dispatch( truckOnDockReady({index: i, type: docks[i].truck.type}) )
						// state.dispatch( loadTruck(false) )
					}
					// mark next target pallette
					else {
						let nextTarget = {
							zone_index: docks[i].truck.target[docks[i].truck.pallets.length].zone_index,
							pal_id: docks[i].truck.target[docks[i].truck.pallets.length].pal_id,
						}
						if (nextTarget.pal_id === state.getState().store.bonus_target_pallette.pid) {
							console.log("nutting")
						}
						else {
							state.dispatch( selectPallette(nextTarget) )
						}
					}
					console.log("checkTruck-full")
				}

				// if bonus truck loaded - unpark it
				// instead of pallets[0] we need also array comparing logarithm
				if ( docks[i].truck.id && 
						 docks[i].truck.type === 'bonus' && 
						 docks[i].truck.pallets[0].id === 
						 docks[i].truck.target.pal_id
					 ) {
						 // docks[i].truck.pallets[docks[i].truck.pallets.length -1].id === 
					// console.log("dan")

					let target = drawUnloaded( state.getState().store.zones )
					state.dispatch( selectPallette(target) )
					state.dispatch( setNewTarget({ target: target }) )

					// one of the former condition:
						 // docks[i].truck.pallets.length === docks[i].truck.target.length
					// state.dispatch( truckOnDockReady({index: i, type: docks[i].truck.type}) )
				}
			}

			// check if docks & ramps are empty 
			//
			if ( unloadingDone({ r:state.getState().store.ramps, 
													 d:state.getState().store.docks }) === true &&

					 loadingDone({ r:state.getState().store.ramps, 
												 d:state.getState().store.docks }) === true &&

					 state.getState().store.queue.length === 0 ) {

				//console.log("wave done !")
				state.dispatch( runLevel(false) )

				let level = state.getState().app.level
				let levels = state.getState().app.levels

				if  ( level.wave< levels[ level.current ].waves-1 && !level.run ) {
					// show msg
					//
					state.dispatch( showMsg({ type:"next", text: "Nadjeżdza kolejna grupa kurierów" }) )
					state.dispatch( increaseWave() )
				}
				else {
					// check for mess
					//
					let messStatus
						// level have color zones
					if (current.color_zones.colorize) {
						messStatus = colorStoreMess({ zones: zones, czones: level.color_zone })
					}
						// level doesnt have color zones
					else {
						messStatus = storeMess( zones )
					}
					state.dispatch( setMess( messStatus ) )
					let sorting = state.getState().store.sorting

					if (messStatus) { 

						if (!sorting) {
							state.dispatch( setSorting(true) )
							state.dispatch( showMsg({ type:"mess", text: "Żeby ukończyć poziom, posortuj palety" }) )
						}

					} else {

						let gratz = "Gratulacje, ukończyłeś poziom " + 
												 level.current + ", w  czasie " +
												 makeMinutes( Number(totalTime( state.getState().app.wave_times )) ) + "s."

						state.dispatch( showMsg({ type:"gratz", text: gratz }) )
						state.dispatch( popTimeSum() )
						state.dispatch( preparingLevel(true) )
					}
				}
			}
			break


		case 'app/hideMsg':
			// przygotowanie załadunku linii 
			if ( state.getState().app.level.preparing &&
					 state.getState().app.level.loadTruck ) {

				state.dispatch( resetTimeResults() )
					//

				// how to forge target array.. 
				let target = drawUnloadedArray( state.getState().store.zones )

				// for full select 1st pallette
				state.dispatch( selectPallette(target[0]) )

				let fullTruck = genTruck( state.getState().store.counter.truckId, 1, target )

				state.dispatch( parkTruck({ index: 1, truck: fullTruck }) )

				console.log("dont prepare level, cause truckLd incoming!!",)
				// dispatch those after successfull load
				// state.dispatch( loadTruck(false) )
				// state.dispatch( increaseLevel() )
			}

			// przygotowanie zwykłego levelu
			if ( state.getState().app.level.preparing &&
					 !state.getState().app.level.loadTruck ) {

				// podbijanie levelu.. 
				state.dispatch( preparingLevel(false) )
				state.dispatch( setSorting(false) )
				state.dispatch( colorZonesReset() ) 
				state.dispatch( resetZones() )
				state.dispatch( resetWave() )
				// todo zrobic ogranicznik leveli
				state.dispatch( increaseLevel() )
				state.dispatch( resetTimeResults() )
			}
			if ( level.wave === wave_times.length-1 && 
					 state.getState().store.sorting ) { }
			else {
				state.dispatch( runLevel(true) )
			}
			break


		case 'store/addQueueTruck':
			state.dispatch( setTruckCounter() )
			break


		// start Level
		//
		case 'app/runLevel':

			if ( action.payload === true && state.getState().app.level.loadTruck) {
				console.log("runLev tru loadtruck tru")
			}

			if ( action.payload === true && !state.getState().app.level.loadTruck) {

				let current = levels[ level.current ]
				//
				// make color zone / zones
				if ( current.color_zones.colorize && 
						 level.color_zone.length === 0 ) {
					let cZone = drawZones({ 
						count: current.color_zones.count, 
						len: state.getState().store.zones.length 
					})
					state.dispatch( setColorZone( cZone ) )
				}

				// 
				// adding a group of trucks
				
				// level trucks
				for ( let i= 1; i<= current.truckMax; i++ ) {
					setTimeout( () => { 
						// get current truck and pallets counters
						//
						let currTruckId = state.getState().store.counter.truckId
						let currPalId = state.getState().store.counter.palletId
						// generate random regular truck
						//
						let truck = genTruck( currTruckId, currPalId, null )
						state.dispatch( addQueueTruck({ truck: truck }) )
						// alter current pallet id counter
						//
						let newId = currPalId + truck.pallets.length
						state.dispatch( setPalletsCounter({ newId: newId }) )
					}, i*500 )
				}

				// bonus client truck, on second+ waves
				if (level.wave > 0) {
						// add some probability fn
						if (true) {
							// he came for this pallette:
					    let bonusTarget = drawUnloaded( zones )
							let cTruckId = state.getState().store.counter.truckId

							// use 
							// genTruck()
							
							let bonus_truck = {
								id: cTruckId, 
								type: 'bonus',
								target: bonusTarget,
								cover: true, 
								ready: false, 
								pallets: []
							}
							state.dispatch( selectPallette(bonusTarget) )
							state.dispatch( addQueueTruck({ truck: bonus_truck }) )
						}
				}
			}

			// stop level
			if ( action.payload === false ) {
				// in case of last wave dont saveTimer:
				//
				if ( level.wave > wave_times.length -1 ) {
					state.dispatch( saveTimer( timer ) ) 
				}
			}
			break


		// start timer when you drop first truck on the free dock
		case 'store/parkTruck':
			let queue = state.getState().store.queue
			let trMax = state.getState().app.levels[level.current].truckMax
			// 
			// dont start to add trucks to docks ,
			// dont start timer unless they all arrive & show :(
			if ( (((queue.length + 1) === trMax) || (queue.length === trMax)) && stamp === 0 ) {
				state.dispatch( setStamp( Date.now() ) ) 
			}
			break

			
		default:

	}

	// 4 hard debug purpose:
	// console.log(action)
	next(action)
}
