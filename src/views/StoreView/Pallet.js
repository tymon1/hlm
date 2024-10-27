import s from './css/Pallet.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { drag, pick, source } from '../../slice/AppSlice';
import { palletRecover } from '../../slice/StoreSlice';



export function Pallet({ pallet }) {

	const dispatch = useDispatch()
	const oneRef = useRef();
	const recPc = useSelector(state => state.app.recover_step)

	useEffect( () => { 
		const intId = setInterval( () => { 
			if (pallet.selected) {
				setTimeout( () => { 
					if (oneRef.current !== null) { oneRef.current.classList.remove(s.selected) }
				}, 500)
				oneRef.current.classList.add(s.selected)
			}
		}, 1200)

		return () => {
			clearInterval(intId)
		}

	})


		
	return (
		<div draggable={ pallet.recovered >= 100 ? true : false } className={ s.pallet }
				 id = { pallet.id } style={{ background: pallet.c }}
				 ref={ oneRef }

				 // recovery of flipped pallets 
				 onClick = { () => {
					   if ( pallet.recovered < 100 ) {
							 let pElem = oneRef.current
							 let rampIndex = pElem.parentElement.id.split("-")[1]
							 dispatch( palletRecover( {
								 pallet: pallet,
								 rampIndex: rampIndex,
								 percent: recPc 
							 }) )
						 }
				   }
				 }

				 onDragStart = { () => {
					 // let palElem = document.getElementById( pallet.id )
					 let palElem = oneRef.current
					 palElem.style.zIndex="10002"

					 dispatch( drag( true ) )
					 dispatch( pick( pallet ) )
					 dispatch( source( {
						 name: palElem.parentElement.id.split("-")[0],
						 index: palElem.parentElement.id.split("-")[1]
					 } ) )
				 }}

				 onDragEnd = { () => {
					 oneRef.current.style.zIndex="9001"
					 dispatch( drag( false ) )
				 }}

				 >
       
					 { pallet.recovered < 100 ?
						 <span style={{ height: pallet.recovered +"%" }}
									 className={ s.recover }> </span>
										 : ""
					 }

					 <span className={ s.xrecover }> 
					 	 { pallet.recovered < 100 ? "X" : "" } </span>

		</div>
	)
}
