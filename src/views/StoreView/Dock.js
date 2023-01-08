import s from './css/Dock.module.css';
import { useSelector } from 'react-redux';
import { Truck } from './Truck';
import { DropTruck } from './DropTruck';



// external drive-in ramp
export function Dock({ ramp }) {

	const dragging = useSelector(state => state.app.drag)
	const source = useSelector(state => state.app.source.name)
	const elementId = "dock-" + ramp.no

	
	return (
			<div id={ elementId } 
					 className={ s.ramps }>
				{ 
					dragging && !ramp.truck.id && (source === "queueTruck") ? 
						<DropTruck elementId ={ elementId } /> : '' 
				}
				{ ramp.truck.id ? <Truck truck={ ramp.truck }/> : ''	}

			</div>
	)
}
