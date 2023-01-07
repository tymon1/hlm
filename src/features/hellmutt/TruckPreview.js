import s from './TruckPreview.module.css';
import { useDispatch } from 'react-redux';
import { drag, pick, source } from './DropSlice';



// preview of tiny truck
export function TruckPreview({ truck }) {

	//const ramps = useSelector(state => state.store.ramps)
	const dispatch = useDispatch()

	let resp = () => { 
		switch(truck.type) {
			case 's':
				return s.tType_s
			case 'm':
				return s.tType_m
			case 'xl':
				return s.tType_xl
			default:
			  return false
	}}


	return (
			<div className={ resp() } 
					 id={"queueTruck-" + truck.id} 
					 draggable={ true }

					 onDragStart = { e => {
						 dispatch( drag( true ) )
						 dispatch( pick( truck ) )
						 dispatch( source( {
							 name: e.target.id.split("-")[0],
							 index: e.target.id.split("-")[1]
						 } ) )
					 }}

					 onDragEnd = { () => {
						 dispatch( drag( false ) )
					 }}
					 > 

				{ truck.type } 

			</div> 
	)
}
