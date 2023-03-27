import s from './css/Pallet.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { drag, pick, source } from '../../slice/AppSlice';



export function Pallet({ pallet }) {

	const dispatch = useDispatch()
	const myRef = useRef(null);
	// const blinkInt = useRef()


	useEffect( () => { 
		const intId = setInterval( () => { 
			if (pallet.selected) {
				setTimeout( () => { myRef.current.classList.remove(s.selected) }, 600)
				myRef.current.classList.add(s.selected)
			}
		}, 1200)

		return () => {
			clearInterval(intId)
		}

	})

		
	return (
		<div draggable={ true } className={ s.pallet }
				 id = { pallet.id } style={{ background: pallet.c }}
				 ref={ myRef }

				 onDragStart = { () => {
					 let palElem = document.getElementById( pallet.id )
					 palElem.style.zIndex="10002"

					 dispatch( drag( true ) )
					 dispatch( pick( pallet ) )
					 dispatch( source( {
						 name: palElem.parentElement.id.split("-")[0],
						 index: palElem.parentElement.id.split("-")[1]
					 } ) )
				 }}

				 onDragEnd = { () => {
					 document.getElementById(pallet.id).style.zIndex="9001"
					 dispatch( drag( false ) )
				 }}

				 //onDrop = { console.log("check empties") }
				 >

		</div>
	)
}
