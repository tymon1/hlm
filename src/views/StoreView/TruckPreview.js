import s from './css/TruckPreview.module.css';
import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { drag, pick, source } from '../../slice/AppSlice';



// preview of tiny truck
export function TruckPreview({ truck }) {

	const dispatch = useDispatch()
	const myRef = useRef(null);

	useEffect(() => { setTimeout( ()=>{ approachQueue()}, 500)  })

	let approachQueue = () => {
		myRef.current.style.marginLeft = 10 + "px"
		myRef.current.style.opacity = 1
	}

	let resp = () => { 
		switch(truck.type) {
			case 'bonus':
				return s.tType_bonus
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
					 ref={ myRef }
					 draggable={ true }

					 onDragStart = { e => {
						 dispatch( drag( true ) )
						 dispatch( pick( truck ) )
						 dispatch( source( {
							 name: e.target.id.split("-")[0],
							 index: e.target.id.split("-")[1]
						 } ) )
					 }}

					 onDragEnd = { () => { dispatch( drag( false ) ) }}
					 > 

				{ truck.type } 

			</div> 
	)
}
