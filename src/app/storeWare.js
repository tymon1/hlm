import { addPalToZone, addPalToRamp, addPalToTruck,
				 remPalFrZone, remPalFrRamp, remPalFrTruck,
				 truckOnDockEmpty, } from '../slice/StoreSlice';




export const storeWare = (state) => (next) => (action) => {
	
	switch (action.type) {

		case 'store/addPal':

			if (action.payload.name === "zone") { state.dispatch( addPalToZone(action.payload) ) }
			if (action.payload.name === "ramp") { state.dispatch( addPalToRamp(action.payload) ) }
			if (action.payload.name === "truck") { state.dispatch( addPalToTruck(action.payload) ) }
			break

		case 'store/remPal':

			if (action.payload.name === "zone") { state.dispatch( remPalFrZone(action.payload) ) }
			if (action.payload.name === "ramp") { state.dispatch( remPalFrRamp(action.payload) ) }
			if (action.payload.name === "truck") { state.dispatch( remPalFrTruck(action.payload) ) }
			break

		case 'store/checkTrucks':

			let docks = state.getState().store.docks
			let ramps = state.getState().store.ramps

			for ( let i= 0; i< docks.length; i++ ) {
				if ( docks[i].truck.id && 
						 docks[i].truck.pallets.length === 0 && 
						 ramps[i].pallets.length === 0 ) {

					state.dispatch( truckOnDockEmpty({index: i}) )
				}
			}
			break
			
		default:
			// return next(action)
			//console.log("add to zone", state.getState().store.counter)
	}

	next(action)
}
