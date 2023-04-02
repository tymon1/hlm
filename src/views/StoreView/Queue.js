import s from './css/Queue.module.css';
import { useSelector, useDispatch } from 'react-redux';

import { TruckPreview } from './TruckPreview';
import { remQueueTruck } from '../../slice/StoreSlice';



// Queue of draggable tiny trucks 
export function RampsQueue() {

	const trucks = useSelector(state => state.store.queue)
	const dispatch = useDispatch()

	let remTruck = id => {
		dispatch( remQueueTruck({ id: id }) )
	}

  return (
			<div className={s.queue}>
				{ 
					trucks.map( (truck,index) => { 
						return ( <TruckPreview remTruck={ remTruck } 
								                   key={ truck.id } 
																	 truck={ truck }/> )
					} )
				}
			</div>
	)
}
