import { addPalToZone, addPalToRamp, addPalToTruck,
				 remPalFrZone, remPalFrRamp, remPalFrTruck,
				 addQueueTruck, 
				 setMess, 
				 resetZones, 
				 setSorting, 
				 setTruckCounter, setPalletsCounter,
				 selectPallette,
				 truckOnDockEmpty, } from '../slice/StoreSlice';

import { saveTimer, setStamp, 
	       increaseWave,
	       resetWave,
	       resetTimeResults,
	       increaseLevel,
	       preparingLevel,
	       popTimeSum,
				 showMsg,
	       runLevel } from '../slice/AppSlice';

import { genTruck, 
				 unloadingDone, 
				 loadingDone, 
				 drawUnloaded, 
				 totalTime, 
				 makeMinutes, 
				 storeMess } from '../app/helpers.js';




export const storeWare = (state) => (next) => (action) => {

	let wave_times = state.getState().app.wave_times
	let level = state.getState().app.level
	let levels = state.getState().app.levels
	let docks = state.getState().store.docks
	let ramps = state.getState().store.ramps
	let zones = state.getState().store.zones
	

	switch (action.type) {

		// addPal helper
		//
		case 'store/addPal':
			if (action.payload.name === "zone") { state.dispatch( addPalToZone(action.payload) ) }
			if (action.payload.name === "ramp") { state.dispatch( addPalToRamp(action.payload) ) }
			if (action.payload.name === "truck") { state.dispatch( addPalToTruck(action.payload) ) }
			break


		// remPal helper
		//
		case 'store/remPal':
			if (action.payload.name === "zone") { state.dispatch( remPalFrZone(action.payload) ) }
			if (action.payload.name === "ramp") { state.dispatch( remPalFrRamp(action.payload) ) }
			if (action.payload.name === "truck") { state.dispatch( remPalFrTruck(action.payload) ) }
			break


		// check which truck is empty to unpark it
		//
		case 'store/checkTrucks':
			for ( let i= 0; i< docks.length; i++ ) {

				if ( docks[i].truck.id && 
				     // docks[i].truck.type !== 'bonus' && 
						 (docks[i].truck.type !== 'bonus' && docks[i].truck.empty === false) &&
						 (docks[i].truck.type !== 'bonus' && docks[i].truck.pallets.length === 0) && 
						 ramps[i].pallets.length === 0 ) {

					state.dispatch( truckOnDockEmpty({index: i, type: docks[i].truck.type}) )
				}

				// instead of pallets[0] we need also array comparing logarithm
				if ( docks[i].truck.id && 
						 docks[i].truck.type === 'bonus' && 
						 docks[i].truck.pallets.length > 0 && 
						 docks[i].truck.pallets[0].id === docks[i].truck.target.pal_id
					 ) {
					console.log("loaded truck unpark !!",)
					state.dispatch( truckOnDockEmpty({index: i, type: docks[i].truck.type}) )
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

				if  ( level.wave < levels[ level.current ].waves -1 ) {
					if  ( level.run === false ) {
					// show msg
					//
						state.dispatch( showMsg({ text: "Nadciąga następna ekipa kurierów" }) )
						state.dispatch( increaseWave() )
	
					}
				}
				else {
					// check for mess
					//
					let mStatus = storeMess( zones )
					state.dispatch( setMess( mStatus ) )
					let sorting = state.getState().store.sorting

					if (mStatus) { 

						if (!sorting) {
							state.dispatch( setSorting(true) )
							state.dispatch( showMsg({ text: "Żeby ukończyć poziom, posortuj palety" }) )
						}

					} else {

						let gratz = "Gratulacje, ukończyłeś poziom " + 
												 level.current + ", w  czasie " +
												 makeMinutes( Number(totalTime( state.getState().app.wave_times )) ) + "s."

						state.dispatch( showMsg({ text: gratz }) )
						state.dispatch( popTimeSum() )
						state.dispatch( preparingLevel(true) )
					}
				}
			}
			break


		case 'app/hideMsg':
			if ( state.getState().app.level.preparing === true ) {
				// console.log("podbijanie levelu.. ") 
				state.dispatch( preparingLevel(false) )
				state.dispatch( setSorting(false) )
				state.dispatch( resetZones() )
				state.dispatch( resetWave() )
				// todo zrobic ogranicznik leveli
				state.dispatch( increaseLevel() )
				state.dispatch( resetTimeResults() )
			}
			if ( action.payload === true) {
				if ( level.wave === wave_times.length -1 ) { }
				else {
					state.dispatch( runLevel(true) )
				}
			}
			break


		case 'store/addQueueTruck':
			state.dispatch( setTruckCounter() )
			break


		// start Level
		//
		case 'app/runLevel':
			if ( action.payload === true ) {
				////////////////////////////////////////////////  HERE //////////
				// 
				// adding a group of trucks
				
				// level trucks
				for ( let i= 1; i<= levels[level.current].truckMax; i++ ) {
					setTimeout( () => { 
						// get current truck and pallets counters
						//
						let currTruckId = state.getState().store.counter.truckId
						let currPalId = state.getState().store.counter.palletId
						// generate random truck
						//
						let truck = genTruck( currTruckId, currPalId )
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

							let bonus_truck = {
								id: cTruckId, 
								type: 'bonus',
								target: bonusTarget,
								cover: true, 
								empty: false, 
								pallets: []
							}
							state.dispatch( selectPallette(bonusTarget) )
							state.dispatch( addQueueTruck({ truck: bonus_truck }) )
						}
				}
			}

			// stop level
			if ( action.payload === false ) {
				// jesli byla to ostatnia fala to nie rob saveTimer 
				//
				if ( level.wave === wave_times.length -1 ) {
					// console.log("to była ostatnia fala, przestawiasz palety")
				}
				else {state.dispatch( saveTimer() ) }
			}
			break


		// start timer when you drop first truck on the free dock
		case 'store/parkTruck':
			let queue = state.getState().store.queue
			let trMax = state.getState().app.levels[level.current].truckMax
			// 
			// dont start to add trucks to docks unless they all arrive & show :(
			if ( (queue.length + 1) === trMax) {
				state.dispatch( setStamp( Date.now() ) ) 
			}
			break

			
		default:
			// return next(action)
			//console.log("add to zone", state.getState().store.counter)
	}

	next(action)
}
