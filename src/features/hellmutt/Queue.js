import styles from './Queue.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { TruckPreview } from './TruckPreview';


// Queue of draggable tiny trucks 
export function RampsQueue() {

	const trucks = useSelector(state => state.queue.trucks)

	useEffect(() => {
		//console.log("first 1 ",trucks[0])
	})

  return (
			<div className={styles.queue}>
				{ 
					trucks.map( (truck,index) => { 
						return ( <TruckPreview key={ index } truck={ truck }/> )
					} )
				}
			</div>
	)
}
