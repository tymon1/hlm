import s from './css/Admin.module.css';
import { useDispatch } from 'react-redux';

import { 
	dump as state_dump, 
	setMess,
	} from '../../slice/StoreSlice';

import { hideMsg } from '../../slice/AppSlice';

import { dump as app_dump, 
				 showMsg as shMsg,
	       runLevel } from '../../slice/AppSlice';
// import { useEffect } from 'react';
import { unSelectPal, selectPallette } from '../../slice/StoreSlice';


/////////////////////////////////////////



export function Admin({ ramp }) {

	const dispatch = useDispatch()

	let dump = () => { dispatch( state_dump() ) }
	let dump_app = () => { dispatch( app_dump() ) }


	// useEffect(() => {
		//const loopVar = setInterval( updTimer ,1000 )
	// }, [])

	let showMsg = () => {
		dispatch( shMsg({ text: "Nadjeżdża nowa fala kurierów" }) )
	}

	let hide = () => {
		dispatch( hideMsg() )
	}

	let startLevel = () => {
		dispatch( runLevel(true) )
	}

	let stCheck = () => {
		dispatch( setMess() )
	}

	let strue = () => {
		dispatch( selectPallette({zone_index: 1, pal_id: "p100"}) )
	}

	let sfalse = () => {
		dispatch( unSelectPal() )
	}


  return (
			<div className={s.admin}>
				<div className={s.btn} onClick={ dump }>Dump Store</div>
				<div className={s.btn} onClick={ dump_app }>Dump App</div>
				<div className={s.btnS} onClick={ sfalse }>Sel false</div>
				<div className={s.btnS} onClick={ strue }>Sel tru</div>
				<div className={s.btnS} onClick={ hide }>Hide msg</div>
				<div className={s.btnG} onClick={ stCheck }>Check Store</div>
			</div>
	)
}
