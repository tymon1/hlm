import s from './css/Queue.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { addQueueTruck } from '../../slice/StoreSlice';
import { increaseWave } from '../../slice/AppSlice';
import { drawTruckType } from '../../app/helpers.js';

import { TruckPreview } from './TruckPreview';



// Queue of draggable tiny trucks 
export function RampsQueue() {

	const dispatch = useDispatch()
	const trucks = useSelector(state => state.store.queue)
	const level = useSelector(state => state.app.level)
	const levels = useSelector(state => state.app.levels)

	useEffect(() => {
		//console.log("Queue len:",trucks.length)
		// const qLoop = setInterval( queueLoop ,2000 )
		// return () => clearInterval(qLoop)
	})

	useEffect(() => {
		const qLoop = setInterval( queueLoop ,2000 )
		return () => clearInterval(qLoop)
	}, [level.run, trucks.length])


	let queueLoop = () => {
		if ( level.run && trucks.length === 0 ) {

			console.log("lev.curr", levels[level.current].waves )

			if ( level.wave < levels[level.current].waves ) {
				for (let i = 0; i < levels[level.current].truckMax; i++) {
					setTimeout( ()=> {return dispatch( addQueueTruck( drawTruckType() ) )}, 500*i)
				}
				dispatch( increaseWave() )
			}
			else {
				console.log("level complete ?",)
			}
		}
	}

  return (
			<div className={s.queue}>
				{ 
					trucks.map( (truck,index) => { 
						return ( <TruckPreview key={ index } truck={ truck }/> )
					} )
				}
			</div>
	)
}
