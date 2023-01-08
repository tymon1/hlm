import s from './css/Admin.module.css';
import { gen } from '../../app/helpers.js';
import { useDispatch, useSelector } from 'react-redux';

import { incrementTruckId } from '../../slice/AppSlice';
import { 
	dump as state_dump, 
	addQueueTruck as addTruckToQueue } from '../../slice/StoreSlice';
import { dump as app_dump } from '../../slice/AppSlice';



export function Admin({ ramp }) {

	const dispatch = useDispatch()
	const id = useSelector(state => state.app.counter.truckId)

	let dump = () => { dispatch( state_dump() ) }
	let dump_app = () => { dispatch( app_dump() ) }

	let addTruck = () => {
		dispatch( addTruckToQueue( gen(id) ) )
		dispatch( incrementTruckId() )
	}

  return (
			<div className={s.admin}>
				<div className={s.btn} onClick={dump}>Dump Store</div>
				<div className={s.btn} onClick={dump_app}>Dump App</div>
				<div className={s.btn} onClick={addTruck}>Add truck</div>
			</div>
	)
}
