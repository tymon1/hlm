import styles from './Pellet.module.css';
import { useDispatch } from 'react-redux';
import { drag, pick, source } from './DropSlice';



export function Pellet({ pellet }) {

	const dispatch = useDispatch()

	return (
		<div draggable={ true } className={ styles.pellet }
				 id = { pellet.id } style={{ background: pellet.c }}

				 onDragStart = { () => {
					 let palElem = document.getElementById( pellet.id )
					 palElem.style.zIndex="10002"

					 dispatch( drag( true ) )
					 dispatch( pick( pellet ) )
					 dispatch( source( {
						 name: palElem.parentElement.id.split("-")[0],
						 index: palElem.parentElement.id.split("-")[1]
					 } ) )
				 }}

				 onDrop = { () => {
					 document.getElementById(pellet.id).style.zIndex="9001"
				 }}
				 >

		</div>
	)
}
