import { reverse_l,
         reverse_s,
         reverse_xxl,
         wave,
         katana,
         kabuki,
         error,
				 complete,
         newQ,
         beep,
         rush_largo,
         rush_xxl,
         rush_m,
         stomp,
								} from '../app/zunds.js';





export const zundWare = (state) => (next) => (action) => {


	switch (action.type) {

		case 'store/addQueueTruck':
			setTimeout( () => { newQ.play() }, 800)
			break


		case 'app/buyNinja':
			if (action.payload.payload === 50) { kabuki.play() } 
			if (action.payload.payload === 100) { katana.play() } 
			break

		case 'store/addPal':
			if (action.payload.name === "ramp") { beep.play() } 
			else { stomp.play() }
			break


		case 'store/addPalToZone':
			let ramps = state.getState().store.ramps
			let ninja = ramps.map(ramp => {
				let retV = false
				if ( ramp.ninja === true ) {
					retV = true
					return retV
				}
				return retV
			})
			if (ninja) { stomp.play() } 
			break


		case 'store/addPalToRamp':
			if (action.payload.pallet.recovered === 0) { error.play() } 
			else { }
			break


		case 'store/parkTruck':
			switch (action.payload.truck.type) {
				case 's':
					reverse_s.play()
				break
				case 'm':
					reverse_l.play()
					break
				case 'xl':
					reverse_xxl.play()
					break
				default:
					// reverse_l.play()
			}
			break


		case 'store/truckOnDockReady':

			switch (action.payload.type) {
				case 's':
					rush_largo.play()
				break
				case 'm':
					rush_m.play()
					break
				case 'xl':
					rush_xxl.play()
					break
				default:
					// reverse_l.play()
			}
			break


		case 'app/showMsg':
			let level = state.getState().app.level
			let levels = state.getState().app.levels
			let mess = state.getState().store.mess
			//let sorting = state.getState().store.sorting

			if  ( level.wave === levels[ level.current ].waves -1 &&
					  action.payload.type !== "howto" &&
					  mess === false ) {
				complete.play()
			}
			else {
				if (action.payload.type !== "howto") {
					wave.play()
				}
			}
			break


		default:
			// return next(action)
			//console.log("add to zone", state.getState().store.counter)
	}

	next(action)
}
