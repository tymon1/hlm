import s from './css/Drop.module.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { 
	addNinja } from '../../slice/StoreSlice';
import { drag } from '../../slice/AppSlice';



export function DropNinja({ rampNo }) {

	const dispatch = useDispatch()

	useEffect(() => {
		let fieldElem = document.getElementById("dropZoneNinja_"+rampNo)
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
		dispatch( addNinja({ rampNo }) )
		dispatch( drag( false ) )
	}

	return (
		<div id = { "dropZoneNinja_" + rampNo } 
				 className = { s.ninjaCover }></div>
	)

}
