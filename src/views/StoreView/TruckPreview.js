import s from './css/TruckPreview.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { drag, pick, source } from '../../slice/AppSlice';
import { checkTrucks, clearBlink } from '../../slice/StoreSlice';



// preview of tiny truck
export function TruckPreview( props ) {

	const dispatch = useDispatch()
	const bonusWait = useSelector(state => state.app.bonus_wait)
	const truck = props.truck
	const myRef = useRef();
	const countInt = useRef()

	useEffect( () => { 

		setTimeout( ()=>{ approachQueue() }, 500)  

		if (truck.type === 'bonus') { 
			return () => {
				let timr = bonusWait
				
				countInt.current = setInterval( () => { 
					if (timr > 0 ) {
						const myElem = myRef.current
						if (myElem !== null) { myElem.childNodes[0].innerHTML = (timr--/10) }
					}
					else { 
						clearFn() 
						props.remTruck( truck.id ) 
					}
				}, 10)
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
		dispatch( drag( false ) )
		clearInterval(countInt.current)
		dispatch( clearBlink({ payload: truck.target }) ) 
		setTimeout( () => { 
			dispatch( checkTrucks() ) 
		}, 2000 )
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

						 <div className={ s.counter }></div>
						 <div className={ s.counterOverlay }></div>

			</div> 
	)
}
