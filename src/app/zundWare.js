import { reverse_l,
         reverse_s,
         reverse_xxl,
         ping,
         newQ,
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


		case 'store/addPal':
			stomp.play()
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
					reverse_l.play()
			}
			break


		case 'store/truckOnDockEmpty':

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
					reverse_l.play()
			}
			break


		case 'app/showMsg':
			ping.play()
			// switch (action.payload.truck.type) {
			// 	case 'xl':
			// 		reverse_l.play()
			// 		break
			// 	default:
			// 		reverse_l.play()
			// }
			break


		default:
			// return next(action)
			//console.log("add to zone", state.getState().store.counter)
	}

	next(action)
}
