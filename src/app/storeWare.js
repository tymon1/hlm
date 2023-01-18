import { addPalToZone, addPalToRamp, addPalToTruck,
				 remPalFrZone, remPalFrRamp, remPalFrTruck,
				 addQueueTruck, 
				 truckOnDockEmpty, } from '../slice/StoreSlice';

import { saveTimer, setStamp, runLevel } from '../slice/AppSlice';

import { drawTruckType, unloadingDone } from '../app/helpers.js';




export const storeWare = (state) => (next) => (action) => {

	let curr_level = state.getState().app.level.current
	let levels = state.getState().app.levels
	let docks = state.getState().store.docks
	let ramps = state.getState().store.ramps
	

	switch (action.type) {


		// addPal helper
		case 'store/addPal':
			if (action.payload.name === "zone") { state.dispatch( addPalToZone(action.payload) ) }
			if (action.payload.name === "ramp") { state.dispatch( addPalToRamp(action.payload) ) }
			if (action.payload.name === "truck") { state.dispatch( addPalToTruck(action.payload) ) }
			break


		// remPal helper
		case 'store/remPal':
			if (action.payload.name === "zone") { state.dispatch( remPalFrZone(action.payload) ) }
			if (action.payload.name === "ramp") { state.dispatch( remPalFrRamp(action.payload) ) }
			if (action.payload.name === "truck") { state.dispatch( remPalFrTruck(action.payload) ) }
			break


		// check which truck is empty to unpark it
		case 'store/checkTrucks':
			for ( let i= 0; i< docks.length; i++ ) {
				if ( docks[i].truck.id && 
						 docks[i].truck.pallets.length === 0 && 
						 ramps[i].pallets.length === 0 ) {

					state.dispatch( truckOnDockEmpty({index: i}) )
				}
			}
			// check if docks & ramps are empty 
			//
			if ( unloadingDone({ r:state.getState().store.ramps, 
													 d:state.getState().store.docks }) === true &&
					 state.getState().store.queue.length === 0 ) {

				console.log("wave done !")
				state.dispatch(runLevel(false))
			}
			break


		// start Level
		case 'app/runLevel':
			if ( action.payload === true ) {
				// adding a group of trucks
				for ( let i= 1; i<= levels[curr_level].truckMax; i++ ) {
					setTimeout( () => { 
						state.dispatch( addQueueTruck( drawTruckType() ) )
					}, i*500 )
				}
			}
			// stopping level also saves timer :))
			if ( action.payload === false ) {
				state.dispatch( saveTimer() )
			}
			break


		// start timer when you drop first truck on the dock
		case 'store/parkTruck':
			let queue = state.getState().store.queue
			let trMax = state.getState().app.levels[curr_level].truckMax
			if ( (queue.length + 1) === trMax) {
				state.dispatch( setStamp( Date.now() ) ) 
				console.log("start Timer")
			}
			break

			
		default:
			// return next(action)
			//console.log("add to zone", state.getState().store.counter)
	}

	next(action)
}
