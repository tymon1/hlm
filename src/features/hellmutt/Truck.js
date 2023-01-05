import s from './Truck.module.css';
import { useEffect } from 'react';


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
		//console.log("toramp",truck)
		let truckEl = document.getElementById("truck-"+id)
		// truck.classList.add(styles.approaching)
		truckEl.style.marginLeft = rampsWid + "px"
		truckEl.innerHTML=rampsWid
		// dispatch( occupy(1) )
	}

	let offRamp = () => {
		let rampsWid = document.getElementById("ramps").offsetWidth
		let truckEl = document.getElementById("truck-"+id)
		// truck.classList.remove(styles.approaching)
		truckEl.style.marginLeft = "0px"
		truckEl.innerHTML = rampsWid
		// dispatch( free(1) )
	}


	return (
		<div id={"truck-" + truck.id } 
				 className={ s.truck }>
		</div>
	)

}
