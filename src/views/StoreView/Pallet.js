import s from './Pallet.module.css';
import { useDispatch } from 'react-redux';
import { drag, pick, source } from '../../slice/AppSlice';



export function Pallet({ pallet }) {

	const dispatch = useDispatch()

	return (
		<div draggable={ true } className={ s.pallet }
				 id = { pallet.id } style={{ background: pallet.c }}

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

				 onDrop = { () => {
					 document.getElementById(pallet.id).style.zIndex="9001"
				 }}
				 >

		</div>
	)
}
