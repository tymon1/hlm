import s from './css/MsgBoard.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import {
				 hideMsg,
	     } from '../../slice/AppSlice';

import {
				 makeMinutes,
				 totalTime,
	     } from '../../app/helpers';



export function MsgBoard() {

	const msg = useSelector(state => state.app.msg.text)
	const msgType = useSelector(state => state.app.msg.type)
	const visible = useSelector(state => state.app.msg.visible)
	const levelNumber = useSelector(state => state.app.level.current)
	const waveTimes = useSelector(state => state.app.wave_times)
	const dispatch = useDispatch()

	useEffect(() => { 

		setTimeout( () => { 
			let melem = document.querySelector("#msg")
			if (melem !== null) {
				// melem.style.marginLeft = 10 + "px"
				melem.style.opacity = 1

			}
			let cup = document.getElementById("cup")
			if (cup !== null) {
				cup.style.top = "9px"
			}
			approachBoard() 
		}, 100 )

		// setTimeout( () => { 
		// 	let cup = document.getElementById("cup")
		// 	if (cup !== null) { cup.style.top = "-35px" }
		// }, 1000 )

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

	let clipart = type => { 
		switch(type) {
			case 'gratz':
				return s.stihl
				break
			case 'start':
				return s.startIco
				break
			case 'next':
				return s.truckArt
			case 'mess':
				return s.messy
				break
			default:
			  return s.stihl
	}}

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

					<div className={ s.iconCnt }>
						<div className={ clipart(msgType) }> 

						{ (msgType === 'gratz') 
							? <div id="cup" className={ s.stihlCup }>
									<span className={ s.levNr }>{ levelNumber }</span> 
								</div>
							: '' }

						</div>

						{ (msgType === 'gratz') 
							?  <div className={ s.stwatch }>
									 <span className={ s.timeResult }>{ 
											 makeMinutes( Number(totalTime( waveTimes )) )
										 }"</span>
								 </div> 
							: '' }

					</div>

					{ (msgType === 'start') ?  <span>jak grać ?</span> : '' }

					<div className={ s.msgContent }>{ msg }</div>
					<div id="fwBtn" onClick={ mvForward }
								className={ s.msgBtn }>kontynuacja</div>
				</div> 
				: "" 
			}
		</div>
	)
}
