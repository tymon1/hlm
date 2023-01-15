import s from './css/Dock.module.css';
import { useSelector } from 'react-redux';
import { Truck } from './Truck';
import { DropTruck } from './DropTruck';



export function Dock({ dock }) {

	const dragging = useSelector(state => state.app.drag)
	const source = useSelector(state => state.app.source.name)
	const elementId = "dock-" + dock.no

	
	return (
			<div id={ elementId } 
					 className={ s.ramps }>
				{ 
					dragging && !dock.truck.id && (source === "queueTruck") ? 
						<DropTruck elementId ={ elementId } /> : '' 
				}
				{ dock.truck.id ? <Truck truck={ dock.truck }/> : ''	}

			</div>
	)
}
