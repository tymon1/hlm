import styles from './Field.module.css';
import { Pellet } from './Pellet';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { movePellet } from './FieldSlice';



export function Field({ field }) {

	const dispatch = useDispatch()
	const fieldId = field.no

// will be useless
	useEffect(() => {
		let fieldElem = document.getElementById("field-" + fieldId)
		fieldElem.addEventListener("dragover", dragEnter);
		fieldElem.addEventListener("drop", dropped);
		return () => {
			fieldElem.removeEventListener("dragover", dragEnter);
			fieldElem.removeEventListener("drop", dropped);
		}
	})

// will be useless
	let dragEnter = e => { 
		e.preventDefault() 
	}

// will be useless
	let dropped = e => {
		e.preventDefault()
		let pelId = e.dataTransfer.getData("text/plain")
		let fromId = document.getElementById( pelId ).parentElement.id
		let fromIndex = fromId.split("-")
		let toIndex = e.target.id.split("-")
		dispatch( movePellet ({
			id: pelId,
			fromField: fromIndex[1],
			toField: toIndex[1]
		}))
	}


	return (
			<div className={ styles.field } id={ "field-" + field.no } >
			{
				field.pellets.map( (pellet,index) => {
					return ( <Pellet key={ index } pellet={ pellet }/> )
			  } )
			}
			</div>
	)

}
