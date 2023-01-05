import s from './TruckPreview.module.css';

import { useSelector } from 'react-redux';


// preview of tiny truck
export function TruckPreview({ truck }) {

	const ramps = useSelector(state => state.store.ramps)

	let resp = () => { 
		switch(truck.type) {
			case 's':
				return s.tType_s
			case 'm':
				return s.tType_m
			case 'xl':
				return s.tType_xl
			default:
			  return false
	}}
/*
	let setStoreCover = () => { 
		 let cover = document.createElement("div")	
		 cover.id = "storeCover"
		 document.getElementById("store").appendChild(cover)
	}

	// DIRTY SOLUTION
	let setRampsCover = () => { 
		ramps.map( ramp => {
			if (ramp.blocked) {
				let rampId = "extRamp-"+ramp.no
				let cover = document.createElement("div")	
				cover.id = "extCover-"+ramp.no
				//cover.draggable = false
				//cover.aria-disabled=true
				document.getElementById(rampId).appendChild(cover)
				
				cover.addEventListener("drop", e => { e.preventDefault() } )
				cover.addEventListener("dragover", () => {return false} )
			}
			return true
		})
	}

	let remStCover = () => { 
		 let cover = document.getElementById("storeCover")
		 cover.parentElement.removeChild(cover)
	}

	let remRampsCover = () => { 
		ramps.map( ramp => {
			if (ramp.blocked) {
				let coverId = "extCover-"+ramp.no
				let cover = document.getElementById(coverId)
				cover.parentElement.removeChild(cover)
			}
		})
	}
*/
	return (
			<div className={ resp() } 
					 id={"queueTruck-" + truck.id} 
					 draggable={ true }

					 onDragStart = { e => {
						 e.dataTransfer.setData("text/plain", e.target.id)
						 console.log("drag start of elem:", e.target.id)
						 // setStoreCover()
						 // setRampsCover()
					 }}

					 onDragEnd = { e => {
						 // remStCover()
						 // remRampsCover()
					 }}

					 > 

				{ truck.type } 

			</div> 
	)
}
