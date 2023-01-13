import s from './css/Admin.module.css';
import { useDispatch } from 'react-redux';

import { 
         updateTimer } from '../../slice/AppSlice';
import { 
	dump as state_dump, 
	addQueueTruck as addTruckToQueue } from '../../slice/StoreSlice';

import { dump as app_dump } from '../../slice/AppSlice';
import { useEffect } from 'react';

import { drawTruckType } from '../../app/helpers.js';

/////////////////////////////////////////



export function Admin({ ramp }) {

	const dispatch = useDispatch()

	let dump = () => { dispatch( state_dump() ) }
	let dump_app = () => { dispatch( app_dump() ) }

	let addTruck = () => {
		dispatch( addTruckToQueue( drawTruckType() ) )
	}

	// let updTimer = () => {
		// dispatch( updateTimer() )
	// }

	useEffect(() => {
		//const loopVar = setInterval( updTimer ,1000 )
	}, [])

	let stopTimer = () => {
		// clearInterval( loopVar )
	}

	let startTimer = () => {
		dispatch( updateTimer() )
	}

  return (
			<div className={s.admin}>
				<div className={s.btn} onClick={ dump }>Dump Store</div>
				<div className={s.btn} onClick={ dump_app }>Dump App</div>
				<div className={s.btn} onClick={ addTruck }>Add truck</div>
				<div className={s.btn} onClick={ startTimer }>Update Timer</div>
				<div className={s.btn} onClick={ stopTimer }>Test</div>
			</div>
	)
}
