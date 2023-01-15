import styles from './css/Ramps.module.css';
import { useSelector } from 'react-redux';
import { Dock } from './Dock';



export function RampsExternal() {

	const docks = useSelector(state => state.store.docks)

  return (

			<div id="docks" className={ styles.rampsExternal }>
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

