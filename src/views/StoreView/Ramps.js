import styles from './css/Ramps.module.css';
import { useSelector } from 'react-redux';
import { Dock } from './Dock';



export function RampsExternal() {

	const docks = useSelector(state => state.store.docks)

	const curLevel = useSelector(state => state.app.level.current)
	const levels = useSelector(state => state.app.levels)


  return (

			<div id="docks" style={{"backgroundColor": levels[curLevel].bg }} 
			     className={ styles.rampsExternal }>
				{ 
					docks.map( (dock,index) => { 
						return ( 
							<Dock dock={ dock } key={ index }/>
						) 
					})
				}
			</div>
	)
}

