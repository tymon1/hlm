import s from './DropContainer.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
	remove, 
	add,
	removeTruck } from '../../slice/StoreSlice';

//import { remove as remFromQueue } from './QueueSlice';
import { drag } from '../../slice/AppSlice';



export function DropContainer({ elementId }) {

	const dispatch = useDispatch()
	const user = useSelector(state => state.user)

	useEffect(() => {
		let fieldElem = document.getElementById(elementId)
		fieldElem.addEventListener("dragover", dragEnter);
		fieldElem.addEventListener("drop", dropped);
		return () => {
			fieldElem.removeEventListener("dragover", dragEnter);
			fieldElem.removeEventListener("drop", dropped);
		}
	})

	let dragEnter = e => { e.preventDefault() }

	let dropped = e => {
		e.preventDefault()
		let toName = document.getElementById( e.target.id ).parentElement.id.split("-")[0]
		let toIndex = document.getElementById( e.target.id ).parentElement.id.split("-")[1]

		// ugly shit here
		if (user.source.name === "queueTruck") {
				dispatch( removeTruck({ id: user.source.index }) )
		} 
		else {
				dispatch( remove({ name: user.source.name, 
													 index: user.source.index, 
													 id: user.picked.id }) )
		}

		dispatch( add({ name: toName,
										index: toIndex,
										pellet: user.picked }) )

		dispatch( drag(false) )
	}

	return (
		<div id = { "dropZoneOf_" + elementId } 
				 className = { s.cover }></div>
	)

}
