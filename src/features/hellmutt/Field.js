import styles from './Field.module.css';
import { useSelector } from 'react-redux';
import { Pellet } from './Pellet';
import { DropContainer } from './DropContainer';



export function Field({ field }) {

	const dragging = useSelector(state => state.user.drag )
	const source = useSelector(state => state.user.source.name )
	const elementId = "field-" + field.no

	return (
			<div className={ styles.field } id={ elementId } >
			{ 
				dragging && (source !== "queueTruck") ? 
					<DropContainer elementId = { elementId } /> : '' 
			}
			{
				field.pellets.map( (pellet,index) => {
					return ( <Pellet key={ index } pellet={ pellet }/> )
			  } )
			}
			</div>
	)
}
