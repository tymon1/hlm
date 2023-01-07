import React from 'react';
import { useSelector } from 'react-redux';
import s from './Store.module.css';
import { Zone } from './Zone';
import { RampsExternal } from './Ramps';
import { Ramp } from './Ramp';
import { RampsQueue } from './Queue';
import { Admin } from './Admin';

//import { useEffect } from 'react';


export function Store() {


	const zones = useSelector(state => state.store.zones)
	const ramps_internal = useSelector(state => state.store.ramps)

	//useEffect(() => {
		//console.log("ramps_internal",ramps_internal)
	//})

  return (
    <div>
		  <Admin />
			<RampsQueue />

      <div className={s.row}>

				<RampsExternal/>

				<div id="store" className={s.store}>

					<div className={s.rampsArea}>
						{ 
							ramps_internal.map( (ramp,index) => { 
								return ( <Ramp key={ index } ramp={ ramp } /> ) 
							})
						}
					</div>

					<div className={s.zonesArea}>
						<div className={s.zonesRow}>
							{ 
								zones.map( (zone,index) => { 
									return ( 
											<Zone key={ index } zone={ zone } /> ) 
								})
							}
						</div>
					</div>

				</div>

      </div>
    </div>
  );
}
