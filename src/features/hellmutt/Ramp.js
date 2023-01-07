import s from './Ramp.module.css';
import { useSelector } from 'react-redux';
import { DropContainer } from './DropContainer';
import { Pellet } from './Pellet';


// internal ramp
export function Ramp({ ramp }) {

	const dragging = useSelector(state => state.user.drag )
	const source = useSelector(state => state.user.source.name )
	const elementId = "ramp-" + ramp.no 

	return (
		<div id = { elementId } className={ s.ramp }>
			{ dragging && (source !== "queueTruck") ? <DropContainer elementId = { elementId } /> : '' }
			{
				ramp.pellets.map( (pellet,index) => {
					return ( <Pellet key={ index } pellet={ pellet }/> )
			  } )
			}
		</div>
	)

}
