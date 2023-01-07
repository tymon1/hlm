import s from './Truck.module.css';
import { useEffect } from 'react';
import { Pallet } from './Pallet';



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
		let truckEl = document.getElementById("truck-"+id)
		// truck.classList.remove(styles.approaching)
		truckEl.style.marginLeft = "0px"
	}


	return (
		<div id={"truck-" + truck.id } 
				 className={ s.truck }>
			{
				truck.pallets.map( (pallet,index) => {
					return ( <Pallet key={ index } pallet={ pallet }/> )
			  } )
			}
		</div>
	)

}
