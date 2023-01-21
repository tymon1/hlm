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

	useEffect(() => { approachBoard() })

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

  return (
		<div>
			{ visible ? 
				<div id="msg" className={s.msg}> 
					<span>{ msg }</span>
					<span onClick={ runLvl }
								className={s.msgBtn}>Ok. </span>
				</div> 
				: "" 
			}
		</div>
	)
}
