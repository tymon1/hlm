import s from './Admin.module.css';
import { gen } from '../../app/helpers.js';
import { useDispatch, useSelector } from 'react-redux';

import { incrementTruckId } from '../../slice/AppSlice';
import { 
	dump as state_dump, 
	addTruck as addTruckToQueue } from '../../slice/StoreSlice';



export function Admin({ ramp }) {

	const dispatch = useDispatch()
	const id = useSelector(state => state.app.counter.truckId)

	let dump = () => {
		dispatch( state_dump() )
	}

	let addTruck = () => {
		dispatch( addTruckToQueue( gen(id) ) )
		dispatch( incrementTruckId() )
	}

  return (
			<div className={s.admin}>
				<div className={s.btn} onClick={dump}>Dump</div>
				<div className={s.btn} onClick={addTruck}>Add truck</div>
			</div>
	)
}
