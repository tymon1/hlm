import styles from './Ramps.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { occupy, free } from './RampsSlice';
import { Truck } from './Truck';



export function RampsExternal() {

	const dispatch = useDispatch()
	const ramps = useSelector(state => state.field.ramps)

	let toRamp = () => {
		let rampsWid = document.getElementById("ramps").offsetWidth
		let truck = document.getElementById("truck-r1")
		// truck.classList.add(styles.approaching)
		truck.style.marginLeft = rampsWid + "px"
		truck.innerHTML=rampsWid
		dispatch( occupy(1) )
	}

	let offRamp = () => {
		let rampsWid = document.getElementById("ramps").offsetWidth
		let truck = document.getElementById("truck-r1")
		// truck.classList.remove(styles.approaching)
		truck.style.marginLeft = "0px"
		truck.innerHTML = rampsWid
		dispatch( free(1) )
	}

  return (
			<div id="ramps" className={styles.rampsExternal}>
				{ 
					ramps.map( (ramp,index) => { 
						return ( 
							<div id={"extRamp-" + ramp.no} 
									 className={styles.ramps}
									 key={index}>
								{ ramp.truck.id ? <Truck truck={ ramp.truck }/> : ''	}
							</div>
						) 
					})
				}

			</div>
	)
}

