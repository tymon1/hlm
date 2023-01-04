import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Hellmutt.module.css';
import { Field } from './Field';
import { RampsExternal } from './Ramps';
import { Ramp } from './Ramp';
import { RampsQueue } from './Queue';
import { sdump } from './FieldSlice';
// import { fieldsSlice, } from './FieldSlice';


export function Hellmutt() {

	const fields = useSelector(state => state.field.fields)
	const ramps_internal = useSelector(state => state.field.ramps)
	const dispatch = useDispatch()

	//rem
	useEffect(() => {
		// when resolution change ..
		window.addEventListener("resize", tester);
		return () => {
			window.removeEventListener("resize", tester);
		}
	})

	//rem
	let tester = () => {
		let rampsWid = document.getElementById("ramps").offsetWidth
		let truck = document.getElementById("truck-r1")
		// truck.classList.add(styles.approaching)
		truck.style.marginLeft = rampsWid + "px"
		truck.innerHTML=rampsWid
	}

	//rem
	let reset = () => {
		let rampsWid = document.getElementById("ramps").offsetWidth
		let truck = document.getElementById("truck-r1")
		// truck.classList.remove(styles.approaching)
		truck.style.marginLeft = "0px"
		truck.innerHTML = rampsWid
	}

	let dump = () => {
		dispatch( sdump() )
	}

  return (
    <div>
			<RampsQueue />

      <div className={styles.row}>

				<RampsExternal/>

				<div className={styles.store}>

					<div className={styles.rampsArea}>
						{ 
							ramps_internal.map( (ramp,index) => { 
								return ( <Ramp key={ index } ramp={ ramp } /> ) 
							})
						}
						<div onClick={ tester } className={styles.buttons}>t</div>
						<div onClick={ reset } className={styles.buttons}>r</div>
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
