import s from './Admin.module.css';
import { gen } from '../../app/helpers.js';
import { useDispatch, useSelector } from 'react-redux';

import { add } from './QueueSlice.js';
import { incrementTruckId } from './DropSlice.js';
import { sdump as user_dump } from './DropSlice.js';
import { sdump as fields_dump } from './FieldSlice.js';
import { sdump as queue_dump } from './QueueSlice.js';



export function Admin({ ramp }) {

	const dispatch = useDispatch()
	const id = useSelector(state => state.user.truckId)

	let dump = () => {
		dispatch( user_dump() )
		//dispatch( fields_dump() )
		// dispatch( queue_dump() )
	}

	let addTruck = () => {
		dispatch( add( gen(id) ) )
		dispatch( incrementTruckId() )
	}

  return (
			<div className={s.admin}>
				<div className={s.btn} onClick={dump}>Dump</div>
				<div className={s.btn} onClick={addTruck}>Add truck</div>
			</div>
	)
}
