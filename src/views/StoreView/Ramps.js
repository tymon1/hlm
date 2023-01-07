import styles from './Ramps.module.css';
import { useSelector } from 'react-redux';
import { Entrance } from './Entrance';



export function RampsExternal() {

	const ramps = useSelector(state => state.store.ramps)

  return (

			<div id="ramps" className={ styles.rampsExternal }>
				{ 
					ramps.map( (ramp,index) => { 
						return ( 
							<Entrance ramp={ ramp } key={ index }/>
						) 
					})
				}
			</div>
	)
}

