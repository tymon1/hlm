import s from './css/Admin.module.css';
import { useDispatch } from 'react-redux';

import { 
	dump as state_dump, 
	} from '../../slice/StoreSlice';


import { dump as app_dump, 
				 hardReset,
	     } from '../../slice/AppSlice';




export function Admin({ ramp }) {

	const dispatch = useDispatch()

	let dump = () => { dispatch( state_dump() ) }
	let dump_app = () => { dispatch( app_dump() ) }
	let hReset = () => { dispatch( hardReset() ) }


  return (
		<div>
			<div className={ s.adminBtn }
					 onClick={ () => { 
						 let aelem = document.querySelector("#adm")
						 if (aelem !== null && aelem.style.display === "none") {
							 aelem.style.display = "block"
						 }
						 else {
							 aelem.style.display = "none"
						 }
					 }}> A </div>
			<div className={ s.admin }
					 id="adm" >

				<div className={s.btn} onClick={ dump }>Dump Store</div>
				<div className={s.btn} onClick={ dump_app }>Dump App</div>
				<div className={s.btnG} onClick={ hReset }>Reset app</div>
			</div>
		</div>
	)
}
