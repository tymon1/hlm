import styles from './css/Ramps.module.css';
import { useSelector } from 'react-redux';
import { Dock } from './Dock';



export function RampsExternal() {

	const ramps = useSelector(state => state.store.ramps)

  return (

			<div id="ramps" className={ styles.rampsExternal }>
				{ 
					ramps.map( (ramp,index) => { 
						return ( 
							<Dock ramp={ ramp } key={ index }/>
						) 
					})
				}
			</div>
	)
}

