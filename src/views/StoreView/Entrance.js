import s from './Entrance.module.css';
import { useSelector } from 'react-redux';
import { Truck } from './Truck';
import { DropContainer } from './DropContainer';



// external drive-in ramp
export function Entrance({ ramp }) {

	const dragging = useSelector(state => state.app.drag)
	const source = useSelector(state => state.app.source.name)
	const elementId = "extRamp-" + ramp.no

	
	return (
			<div id={ elementId } 
					 className={ s.ramps }>
				{ 
					dragging && !ramp.truck.id && (source === "queueTruck") ? 
						<DropContainer elementId ={ elementId } /> : '' 
				}
				{ ramp.truck.id ? <Truck truck={ ramp.truck }/> : ''	}

			</div>
	)
}
