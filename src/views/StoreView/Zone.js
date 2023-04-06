import s from './css/Zone.module.css';
import { useSelector } from 'react-redux';
import { Pallet } from './Pallet';
import { DropContainer } from './DropContainer';



export function Zone({ zone }) {

	const dragging = useSelector(state => state.app.drag )
	const src = useSelector(state => state.app.source.name )
	const curr  = useSelector(state => state.app.level.current )
	const colorized = useSelector(state => state.app.levels[ curr ].colorized )
	const elementId = "zone-" + zone.no

	return (
			<div className={ s.zone } id={ elementId } >
			{ 
				dragging && (src !== "queueTruck") && (src !== "truck") ? 
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
