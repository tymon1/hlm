import s from './css/Zone.module.css';
import { useSelector } from 'react-redux';
import { Pallet } from './Pallet';
import { DropContainer } from './DropContainer';



export function Zone({ zone }) {

	const dragging = useSelector(state => state.app.drag )
	const src = useSelector(state => state.app.source.name )
	const curr = useSelector(state => state.app.level.current )
	const colorized = useSelector(state => state.app.levels[ curr ].color_zones.colorize )
	const color_zone_arr = useSelector(state => state.app.level.color_zone )
	const elementId = "zone-" + zone.no


	let resp_bg = () => { 
		if (colorized) {
			for (let n=0; n<color_zone_arr.length; n++) {
				if (color_zone_arr[n].index === zone.no ) {
					return color_zone_arr[n].color
				}
			}
			return 'rgb(172, 172, 172)'
		}
		else {
			return 'rgb(172, 172, 172)'
		}
	}

	return (
			// <div className={ s.zone } id={ elementId } >
			<div style={{ background: resp_bg() }} 
			     className={ s.zone } 
					 id={ elementId } >
			{ 
				dragging && (src !== "queueTruck") 
					       && (src !== "truck") 
								 && (src !== "ninja") ? 
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
