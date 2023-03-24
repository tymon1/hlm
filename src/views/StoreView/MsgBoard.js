import s from './css/MsgBoard.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import {
				 hideMsg,
	       } from '../../slice/AppSlice';



export function MsgBoard() {

	const msg = useSelector(state => state.app.msg.text)
	const visible = useSelector(state => state.app.msg.visible)
	const dispatch = useDispatch()

	useEffect(() => { 

		setTimeout( () => { 
			let melem = document.querySelector("#msg")
			if (melem !== null) {
				// melem.style.marginLeft = 10 + "px"
				melem.style.opacity = 1

			}
			approachBoard() 
		}, 100 )

		// blinkBtn()
		// setTimeout( () => { blinkBtn() }, 4000)
		// const blink = setInterval( () => { blinkBtn() }, 1700 )
    // return () => { departBoard() }
	})


	let approachBoard = () => {
		if (visible) {
			let mEl = document.getElementById("msg")
			mEl.style.marginLeft = 0 + "px"
			mEl.style.opacity = 1
		}
	}

	let mvForward = () => {
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
				<div id="msg" className={ s.msg }> 
					<div className={ s.msgContent }>{ msg }</div>
					<div id="fwBtn" onClick={ mvForward }
								className={ s.msgBtn }>kontynuacja</div>
				</div> 
				: "" 
			}
		</div>
	)
}
