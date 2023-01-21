import { addPalToZone, addPalToRamp, addPalToTruck,
				 remPalFrZone, remPalFrRamp, remPalFrTruck,
				 addQueueTruck, 
				 setMess, 
				 setTruckCounter, setPalletsCounter,
				 truckOnDockEmpty, } from '../slice/StoreSlice';

import { saveTimer, setStamp, 
	       increaseWave,
				 showMsg,
	       runLevel } from '../slice/AppSlice';

import { genTruck, unloadingDone, storeMess } from '../app/helpers.js';



// let elab = obj => {
// 	console.log("elab (storeware)",JSON.stringify( obj, null, 2 ))
// }


export const storeWare = (state) => (next) => (action) => {

	let level_times = state.getState().app.level_times
	let level = state.getState().app.level
	let levels = state.getState().app.levels
	let docks = state.getState().store.docks
	let ramps = state.getState().store.ramps
	

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

				//console.log("wave done !")
				state.dispatch(runLevel(false))

				let level = state.getState().app.level
				let levels = state.getState().app.levels

				// console.log(level.wave," < ",levels[ level.current ].waves)
				if  ( level.wave < levels[ level.current ].waves -1 ) {
					if  ( level.run === false ) {
					// show msg
					//
						state.dispatch( showMsg({ text: "Nadciąga kolejna fala kurierów" }) )
						state.dispatch( increaseWave() )
					}
				}
				else {
					// check for mess
					//
					let mStatus = storeMess( state.getState().store.zones )
					state.dispatch( setMess( mStatus ) )

					if (mStatus) { state.dispatch( 
							showMsg({ text: "Żeby ukończyć poziom, posortuj palety" }) )

					} else {
						let gratz = "Gratulacje, ukończyłeś " + level.current + " poziom"
						state.dispatch( showMsg({ text: gratz }) )
						console.log("podbijanie levelu ??") 
					}
					//
					//todo msg
					//     <
					//   {
					//  {
					//   {
					//todo inc level ??
				}
			}
			break

		case 'app/increaseWave':
			// new wave spawns new wave of couriers
			//setTimeout( ()=>{state.dispatch( runLevel(true) )}, 2000 )
			break


		case 'app/hideMsg':
			if ( action.payload === true) {
				if ( level.wave === level_times.length -1 ) { }
				else {
					state.dispatch( runLevel(true) )
				}
			}
			// it could be hub for firing actions
			// if payload === true
			// pause game
			// if false , run game
			//
			break


		case 'store/setMess':
			break

		case 'store/addQueueTruck':
			// alter current truck id counter
			//
			state.dispatch( setTruckCounter() )
			break


		// start Level
		//
		case 'app/runLevel':
			if ( action.payload === true ) {
				// 
				// adding a group of trucks
				//
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
			}
			// stop level
			if ( action.payload === false ) {
				// jesli byla to ostatnia fala to nie rob saveTimer 
				//
				if ( level.wave === level_times.length -1 ) {
					// console.log("to była ostatnia fala, przestawiasz palety")
				}
				else { state.dispatch( saveTimer() ) }
			}
			break


		// start timer when you drop first truck on the free dock
		case 'store/parkTruck':
			let queue = state.getState().store.queue
			let trMax = state.getState().app.levels[level.current].truckMax
			if ( (queue.length + 1) === trMax) {
				state.dispatch( setStamp( Date.now() ) ) 
				// console.log("start Timer")
			}
			break

			
		default:
			// return next(action)
			//console.log("add to zone", state.getState().store.counter)
	}

	next(action)
}
