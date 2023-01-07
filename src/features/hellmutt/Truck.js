import s from './Truck.module.css';
import { useEffect } from 'react';
import { Pellet } from './Pellet';



// XL TRUCK seen on the ramp
export function Truck({ truck }) {

	const id = truck.id

	useEffect(() => {
		toRamp()
		// when resolution change ..
		window.addEventListener("resize", toRamp);
		return () => {
			window.removeEventListener("resize", toRamp);
		}
	})

	let toRamp = () => {
		let rampsWid = document.getElementById("ramps").offsetWidth
		let truckEl = document.getElementById("truck-"+id)
		// truck.classList.add(styles.approaching)
		truckEl.style.marginLeft = rampsWid + "px"
	}

	let offRamp = () => {
		let rampsWid = document.getElementById("ramps").offsetWidth
		let truckEl = document.getElementById("truck-"+id)
		// truck.classList.remove(styles.approaching)
		truckEl.style.marginLeft = "0px"
	}


	return (
		<div id={"truck-" + truck.id } 
				 className={ s.truck }>
			{
				truck.pellets.map( (pellet,index) => {
					return ( <Pellet key={ index } pellet={ pellet }/> )
			  } )
			}
		</div>
	)

}
