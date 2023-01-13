import s from './css/Queue.module.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { TruckPreview } from './TruckPreview';



// Queue of draggable tiny trucks 
export function RampsQueue() {

	const trucks = useSelector(state => state.store.queue)

	useEffect(() => {
		console.log("Queue len:",trucks.length)
	})

	useEffect(() => {
		const loopVar = setInterval( storeLoop ,5000 )
		return () => clearInterval(loopVar)
	}, [])

	let storeLoop = () => {
		console.log("queue !! ")
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
