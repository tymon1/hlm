import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Hellmutt.module.css';
import { Field } from './Field';
// import { fieldsSlice, } from './fieldSlice';


export function Hellmutt() {

	const fields = useSelector(state => state.field.fields)

  return (
    <div>
      <div className={styles.row}>

				<div className={styles.ramps}>r</div>

				<div className={styles.store}>

					<div className={styles.rampsArea}>
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
