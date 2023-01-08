import s from './css/Truck.module.css';
import { useEffect } from 'react';
import { Pallet } from './Pallet';

import { useDispatch } from 'react-redux';
import { unparkTruck } from '../../slice/StoreSlice';


// XL TRUCK seen on the ramp
export function Truck({ truck }) {

	const id = truck.id
	const dispatch = useDispatch()

	useEffect(() => {
		if (truck.ready === true) {
			setTimeout( () => { dispatch( unparkTruck({id: truck.id}) ) }, 1500 )
			return offRamp() 
		}
		toRamp()
		// when resolution change ..
		window.addEventListener("resize", toRamp);
		return () => {
			window.removeEventListener("resize", toRamp);
		}
	})

	const toRamp = () => {
		let rampsWid = document.getElementById("ramps").offsetWidth
		let truckEl = document.getElementById("truck-"+id)
		// truck.classList.add(styles.approaching)
		truckEl.style.marginLeft = rampsWid + "px"
	}

	const offRamp = () => {
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
