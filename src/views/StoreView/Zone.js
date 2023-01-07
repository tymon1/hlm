import s from './Zone.module.css';
import { useSelector } from 'react-redux';
import { Pallet } from './Pallet';
import { DropContainer } from './DropContainer';



export function Zone({ zone }) {

	const dragging = useSelector(state => state.app.drag )
	const source = useSelector(state => state.app.source.name )
	const elementId = "zone-" + zone.no

	return (
			<div className={ s.zone } id={ elementId } >
			{ 
				dragging && (source !== "queueTruck") ? 
					<DropContainer elementId = { elementId } /> : '' 
			}
			{
				zone.pallets.map( (pallet,index) => {
					return ( <Pallet key={ index } pallet={ pallet }/> )
			  } )
			}
			</div>
	)
}
