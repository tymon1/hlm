import s from './css/Drop.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
	addPal,
	remPal, } from '../../slice/StoreSlice';
import { drag } from '../../slice/AppSlice';



export function DropContainer({ elementId }) {

	const dispatch = useDispatch()
	const app = useSelector(state => state.app)

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
		let toName = document.querySelector( '#' + e.target.id ).parentElement.id.split("-")[0]
		let toIndex = document.querySelector( '#' + e.target.id ).parentElement.id.split("-")[1]

		dispatch( remPal({ name: app.source.name, 
											 index: app.source.index, 
											 pallet: app.picked }) )

		dispatch( addPal({ name: toName,
											 index: toIndex,
											 pallet: app.picked }) )

		dispatch( drag( false ) )
	}

	return (
		<div id = { "dropZoneOf_" + elementId } 
				 className = { s.cover }></div>
	)

}
