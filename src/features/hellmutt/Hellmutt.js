import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Hellmutt.module.css';
import { Field } from './Field';
import { RampsExternal } from './Ramps';
import { Ramp } from './Ramp';
import { RampsQueue } from './Queue';

import { sdump } from './FieldSlice';


export function Hellmutt() {

	const fields = useSelector(state => state.store.fields)
	const ramps_internal = useSelector(state => state.store.ramps)
	const dispatch = useDispatch()

	let dump = () => {
		dispatch( sdump() )
	}

  return (
    <div>
			<RampsQueue />

      <div className={styles.row}>

				<RampsExternal/>

				<div id="store" className={styles.store}>

					<div className={styles.rampsArea}>
						{ 
							ramps_internal.map( (ramp,index) => { 
								return ( <Ramp key={ index } ramp={ ramp } /> ) 
							})
						}
					</div>

					<div className={styles.fieldsArea}>
						<div className={styles.fieldsRow}>
							{ 
								fields.map( (field,index) => { 
									return ( <Field key={ index } field={ field } /> ) 
								})
							}
						</div>
					</div>

				</div>

      </div>
    </div>
  );
}
