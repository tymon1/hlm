import s from './css/Drop.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
	parkTruck,
	remQueueTruck } from '../../slice/StoreSlice';
import { drag } from '../../slice/AppSlice';


// this slot is only visible when user 
// is dragging truck from queue
export function DropTruck({ elementId }) {

	const dispatch = useDispatch()
	const app = useSelector(state => state.app)

	useEffect(() => {
		let fieldElem = document.getElementById(elementId)
		fieldElem.addEventListener("dragover", dragEnter);
		fieldElem.addEventListener("drop", dropped);
		fieldElem.addEventListener("pointerover", dragEnter, false);
		fieldElem.addEventListener("pointerup", touchDrop, false);
		return () => {
			fieldElem.removeEventListener("dragover", dragEnter);
			fieldElem.removeEventListener("drop", dropped);
			fieldElem.removeEventListener("pointerover", dragEnter, false);
			fieldElem.removeEventListener("pointerup", dropped, false);
		}
	})

	let dragEnter = e => { 
		console.log("touchover.. ?")
		// e.stopPropagation()
		// e.dataTransfer.dropEffect = 'move'
		// e.dataTransfer.setData('text/plain', 'hello');
		// e.dataTransfer.dropEffect = 'copy'
		e.preventDefault() 
	}

	let touchDrop = e => {
		console.log("touchdrop.. ?")
	}

	let dropped = e => {
		e.stopPropagation()
		e.preventDefault()
		let toIndex = document.getElementById( e.target.id ).parentElement.id.split("-")[1]

		dispatch( remQueueTruck({ id: app.source.index }) )
		dispatch( parkTruck({ index: toIndex,
													truck: app.picked }) )
		dispatch( drag( false ) )
	}

	return (
		<div id = { "dropZoneOf_" + elementId } 
				 className = { s.cover }></div>
	)

}
