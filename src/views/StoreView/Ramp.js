import s from './css/Ramp.module.css';
import { useSelector } from 'react-redux';
import { DropContainer } from './DropContainer';
import { DropNinja } from './DropNinja';
import { Ninja } from './Ninja';
import { Pallet } from './Pallet';



// internal ramp
export function Ramp({ ramp }) {

	const dragging = useSelector(state => state.app.drag )
	const sourceName = useSelector(state => state.app.source.name )
	const loadTruck = useSelector(state => state.app.level.loadTruck )
	const elementId = "ramp-" + ramp.no 

	return (
		<div id = { elementId } className={ s.ramp }>
		                                
			{ 
				dragging && (sourceName !== "queueTruck") 
				         && (sourceName !== "ninja")
				         && (loadTruck && sourceName === 'truck' ? false : true) ? 
				<DropContainer elementId = { elementId } /> : '' 
			}

			{ 
				dragging && (sourceName === "ninja") 
				         && (loadTruck && sourceName === 'truck' ? false : true) ? 
				<DropNinja rampNo = { ramp.no } /> : '' 
			}

			{ 
				ramp.pallets.map( (pallet,index) => {
					return ( <Pallet key={ index } pallet={ pallet }/> )
			  } )
			}

			{ 
				ramp.ninja ? <Ninja ramp = { ramp }/> : ''
			}

		</div>
	)

}
