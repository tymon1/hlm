import s from './Ramp.module.css';
import { useSelector } from 'react-redux';
import { DropContainer } from './DropContainer';
import { Pallet } from './Pallet';


// internal ramp
export function Ramp({ ramp }) {

	const dragging = useSelector(state => state.app.drag )
	const source = useSelector(state => state.app.source.name )
	const elementId = "ramp-" + ramp.no 

	return (
		<div id = { elementId } className={ s.ramp }>
			{ dragging && (source !== "queueTruck") ? <DropContainer elementId = { elementId } /> : '' }
			{
				ramp.pallets.map( (pallet,index) => {
					return ( <Pallet key={ index } pallet={ pallet }/> )
			  } )
			}
		</div>
	)

}
