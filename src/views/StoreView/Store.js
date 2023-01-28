import React from 'react';
import { useSelector } from 'react-redux';
import s from './css/Store.module.css';
import { Zone } from './Zone';
import { RampsExternal } from './Ramps';
import { Ramp } from './Ramp';
import { TopBar } from './TopBar';
import { Timer } from './Timer';
import { ResultsBar } from './ResultsBar';
import { Admin } from './Admin';

//import { useEffect } from 'react';


export function Store() {

	const zones = useSelector(state => state.store.zones)
	const ramps_internal = useSelector(state => state.store.ramps)
	const lock = useSelector(state => state.app.msg.visible)

	// <Admin />

  return (
    <div>
			<ResultsBar />
			<TopBar />

      <div className={s.row}>

				<RampsExternal/>

				<div id="store" className={s.store}>
					
					{ lock ? <div className={s.block}></div> : '' }

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

			<Timer />

    </div>
  );
}
