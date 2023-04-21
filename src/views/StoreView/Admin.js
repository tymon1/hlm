import s from './css/Admin.module.css';
import { useDispatch } from 'react-redux';

import { 
	dump as state_dump, 
	setMess,
	} from '../../slice/StoreSlice';

import { hideMsg } from '../../slice/AppSlice';
import { colorStoreMess } from '../../app/helpers';

import { dump as app_dump, 
				 showMsg as shMsg,
	       runLevel } from '../../slice/AppSlice';




export function Admin({ ramp }) {

	const dispatch = useDispatch()

	let dump = () => { dispatch( state_dump() ) }
	let dump_app = () => { dispatch( app_dump() ) }

	// useEffect(() => {
		//const loopVar = setInterval( updTimer ,1000 )
	// }, [])

	let hide = () => {
	}

	let show = () => {
	}

	let stCheck = () => {
		dispatch( setMess() )
	}


  return (
		<div className={s.admin}>
			<div className={s.btn} onClick={ dump }>Dump Store</div>
			<div className={s.btn} onClick={ dump_app }>Dump App</div>
			<div className={s.btnB} onClick={ hide() }>undrag</div>
			<div className={s.btnS} onClick={ show() }>drag</div>
			<div className={s.btnG} onClick={ stCheck }>Check Store</div>
		</div>
	)
}
