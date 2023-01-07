import styles from './Queue.module.css';
import { useSelector } from 'react-redux';

import { TruckPreview } from './TruckPreview';



// Queue of draggable tiny trucks 
export function RampsQueue() {

	const trucks = useSelector(state => state.queue.trucks)

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
