import s from './css/MsgBoard.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import {
				 hideMsg,
	       } from '../../slice/AppSlice';




export function MsgBoard() {

	// const dispatch = useDispatch()
	const msg = useSelector(state => state.app.msg.text)
	const visible = useSelector(state => state.app.msg.visible)
	const dispatch = useDispatch()

	useEffect(() => { 
		approachBoard() 
		// blinkBtn()
		// setTimeout( () => { blinkBtn() }, 3000)
		// setTimeout( () => { blinkBtn() }, 6000)
		// const blink = setInterval( () => { blinkBtn() }, 1700 )
    // return () => { clearInterval(blink) }
	})

	let approachBoard = () => {
		if (visible) {
			let mEl = document.getElementById("msg")
			mEl.style.marginLeft = 10 + "px"
			mEl.style.opacity = 1
		}
	}

	let runLvl = () => {
		dispatch( hideMsg(true) )
	}

	// let blinkBtn = () => {
	// 	let el = document.getElementById("fwBtn")
	// 	el.style.background = "white"
	// 	setTimeout( () => {
	// 		el.style.background = "green"
	// 	}, 100)
	// }

  return (
		<div>
			{ visible ? 
				<div id="msg" className={s.msg}> 
					<span>{ msg }</span>
					<span id="fwBtn" onClick={ runLvl }
								className={ s.msgBtn }>ok &#8811;</span>
				</div> 
				: "" 
			}
		</div>
	)
}
