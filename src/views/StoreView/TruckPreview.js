import s from './css/TruckPreview.module.css';
import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { drag, pick, source } from '../../slice/AppSlice';
import { unSelectPal } from '../../slice/StoreSlice';



// preview of tiny truck
export function TruckPreview( props ) {

	const dispatch = useDispatch()
	const myRef = useRef(null);
	const truck = props.truck
	const countInt = useRef()

	useEffect( () => { 

		setTimeout( ()=>{ approachQueue() }, 500)  

		if (truck.type === 'bonus') { 
			return () => {
				let timr = 6
				
				countInt.current = setInterval( () => { 
					if (timr >= 0 ) {
						if (myRef.current !== null) { myRef.current.innerHTML = timr-- }
					}
					else { 
						clearFn() 
						props.remTruck( truck.id ) 
					}
				}, 1000)
			}
		}
	}, [])


	let approachQueue = () => {
		if (myRef.current !== null) {
			myRef.current.style.marginLeft = 10 + "px"
			myRef.current.style.opacity = 1
		}
	}

	let clearFn = () => {
		clearInterval(countInt.current)
		dispatch( unSelectPal() )
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

					 onDragEnd = { () => { 
						 dispatch( drag( false ) ) }}
					 > 

				{ truck.type } 

			</div> 
	)
}
