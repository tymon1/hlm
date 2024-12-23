import s from './css/Truck.module.css';
import { useEffect, useLayoutEffect } from 'react';
import { Pallet } from './Pallet';

import { useDispatch, useSelector } from 'react-redux';
import { unparkTruck, 
	       setTruckCover } from '../../slice/StoreSlice';

import { DropContainer } from './DropContainer';




// TRUCK seen on the ramp
export function Truck({ truck }) {

	const id = truck.id
	const dispatch = useDispatch()
	const dragging = useSelector(state => state.app.drag )
	const source = useSelector(state => state.app.source )
	const picked = useSelector(state => state.app.picked )
	const elementId = "truck-" + truck.id 

	// covering up 
	useEffect(() => {
		if (!truck.cover) {
			offCover()
		}
		if (truck.ready) { 
			putCover() 
		}
	})

	useLayoutEffect(() => {
		toRamp()
    return () => {
			offRamp()
    }
	})


	// moving to / from ramp
	useEffect(() => {
		// regular trucks go offramp if empty
		if (truck.ready === true) {
			setTimeout( () => { 
				dispatch( unparkTruck({id: truck.id}) ) 
			}, 1500 )
			return offRamp()
		}
		//if (truck.type === 'bonus' && truck.ready === true) {
		//	//dispatch( unSelectPal() ) 
		//	setTimeout( () => { 
		//		dispatch( unparkTruck({id: truck.id}) ) 
		//	}, 1500 )
		//	return offRamp()
		//}
		// toRamp()
		// when resolution change ..
		//
		window.addEventListener("resize", toRamp);
		return () => {
			window.removeEventListener("resize", toRamp);
		}
	})

	const cssCabin = 70

	const toRamp = () => {
		let rampsWid = document.getElementById("docks").offsetWidth
		let truckEl = document.getElementById("truck-"+id)
		// truck.classList.add(styles.approaching)
		truckEl.style.marginLeft = rampsWid -cssCabin + "px"
	}

	const offRamp = () => {
		let truckEl = document.getElementById("truck-"+id)
		// truck.classList.remove(styles.approaching)
		if (truckEl !== null) {
			truckEl.style.marginLeft = "-" + cssCabin + "px"
		}
	}

	const offCover = () => {
		let coverEl = document.getElementById("tcover-"+id)
		coverEl.style.visibility = "hidden"
		dispatch( setTruckCover({id: truck.id, cover: false}) ) 
	}

	const putCover = () => { 
		let coverEl = document.getElementById("tcover-"+id)
		coverEl.style.visibility = "visible"
		dispatch( setTruckCover({id: truck.id, cover: true}) ) 
	}

	let resp = () => { 
		switch(truck.type) {
			case 'full':
				return s.truck_xl
			case 'bonus':
				return s.truck_s
			case 's':
				return s.truck_s
			case 'm':
				return s.truck_m
			case 'xl':
				return s.truck_xl
			default:
			  return false
	}}

	let resp_cover = () => { 
		switch(truck.type) {
			case 'full':
				return s.tcover_xl
			case 'bonus':
				return s.tcover_bonus
			case 's':
				return s.tcover_s
			case 'm':
				return s.tcover_m
			case 'xl':
				return s.tcover_xl
			default:
			  return false
	}}



	return (
		<div id={"truck-" + truck.id } 
				 className={ resp() }>

			{ (truck.type === 'bonus' && dragging && !truck.cover &&
				(picked.id === truck.target.pal_id) && 
				(source.name === "ramp") ) || 

			  ((truck.type === 'full' && dragging && !truck.cover &&
				picked.id === truck.target[truck.pallets.length].pal_id) && 
				(source.name === "ramp") ) ? 

				<DropContainer elementId = { elementId } /> : '' }

			<div id={"tcover-" + truck.id } 
			     className={ resp_cover() }
					 onClick={ () => { offCover() } }>  </div>
			{
				truck.pallets.map( (pallet,index) => {
					return ( <Pallet key={ index } pallet={ pallet }/> )
			  } )
			}
		</div>
	)

}
