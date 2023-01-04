import styles from './Queue.module.css';
import { useSelector, useDispatch } from 'react-redux';


export function RampsQueue() {

	const trucks = useSelector(state => state.queue.trucks)

  return (
			<div className={styles.queue}>
				{ 
					// TRUCKS LOOKS UGLY, SEE BELOW
					trucks.map( (truck,index) => { 

						let resp = () => { switch(truck.type) {
							case 's':
								return styles.tType_s
							case 'm':
								return styles.tType_m
							case 'xl':
								return styles.tType_xl
						}}

						return ( 
								<div className={ resp() } 
										 id={"queueTruck-" + truck.id} 
										 draggable={ true }
										 onDragStart = { e => {
											 e.dataTransfer.setData("text/plain", e.target.id)
										 }}
										 key={ index } > 

								  { truck.type } 

							  </div> 
						) 
					})
				}
			</div>
	)
}
