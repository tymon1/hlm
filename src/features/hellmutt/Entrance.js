import s from './Entrance.module.css';
import { useEffect } from 'react';
import { Truck } from './Truck';


// external drive-in ramp
export function Entrance({ ramp }) {

	const id = ramp.no

	//useEffect(() => {
	//	let rampElem = document.getElementById("extRamp-" + id)
	//	rampElem.addEventListener("dragover", dragEnter);
	//	rampElem.addEventListener("drop", dropped);
	//	return () => {
	//		rampElem.removeEventListener("dragover", dragEnter);
	//		rampElem.removeEventListener("drop", dropped);
	//	}
	//})

	let dragEnter = e => { e.preventDefault() }

	let dropped = e => {
		e.preventDefault()
		let trId = e.dataTransfer.getData("text/plain")
		// let fromId = document.getElementById( pelId ).parentElement.id
		// let fromIndex = fromId.split("-")
		let toRamp = e.target.id.split("-")
		console.log("trId",trId, "toRamp:",  e.target.id, toRamp[1])
		// dispatch( movePellet ({
		// 	id: pelId,
		// 	fromField: fromIndex[1],
		// 	toField: toIndex[1]
		// }))
	}

	return (
			<div id={ "extRamp-" + ramp.no } 
					 className={ s.ramps }>

				{ ramp.truck.id ? <Truck truck={ ramp.truck }/> : ''	}

			</div>
	)
}
