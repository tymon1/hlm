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
// import { useEffect } from 'react';
import { unSelectPal, selectPallette } from '../../slice/StoreSlice';


/////////////////////////////////////////



export function Admin({ ramp }) {

	const dispatch = useDispatch()

	let dump = () => { dispatch( state_dump() ) }
	let dump_app = () => { dispatch( app_dump() ) }
	const sample = {
			zones:[ { "no": 0, "pallets": [ 
				{ "id": "p3", "c": "royalBlue", "selected": false },
        { "id": "p5", "c": "red", "selected": false },
        { "id": "p4", "c": "royalBlue", "selected": false }
      ]
    },
    { "no": 1, "pallets": [ { "id": "p2", "c": "deepPink", "selected": false } ] },
    { "no": 2, "pallets": [] },
    { "no": 3, "pallets": [] },
    { "no": 4, "pallets": [ { "id": "p1", "c": "green", "selected": false } ] },
    { "no": 5, "pallets": [] },
    { "no": 6, "pallets": [] },
    { "no": 7, "pallets": [] } ], 

			czones:[ 
			{ "index": 0, "color": "royalBlue" }, 
			{ "index": 4, "color": "green" },
      { "index": 2, "color": "blue" }, 
			{ "index": 1, "color": "deepPink" }, 
			{ "index": 6, "color": "red" },
      { "index": 5, "color": "sandyBrown" } ]
		}

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
		// dispatch( selectPallette({zone_index: 1, pal_id: "p100"}) )
		console.log("sample",sample)
	}

	let sfalse = () => {
		dispatch( unSelectPal() )
	}

	let colorSto = () => {
		colorStoreMess(sample)
	}


  return (
			<div className={s.admin}>
				<div className={s.btn} onClick={ dump }>Dump Store</div>
				<div className={s.btn} onClick={ dump_app }>Dump App</div>
				<div className={s.btnB} onClick={ colorSto }>colorStoreMess</div>
				<div className={s.btnS} onClick={ strue }>dump sample</div>
				<div className={s.btnS} onClick={ hide }>Hide msg</div>
				<div className={s.btnG} onClick={ stCheck }>Check Store</div>
			</div>
	)
}
