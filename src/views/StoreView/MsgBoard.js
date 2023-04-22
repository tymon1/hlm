import s from './css/MsgBoard.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import {
				 hideMsg,
				 loadTruck,
	     } from '../../slice/AppSlice';

import {
				 makeMinutes,
				 totalTime,
	     } from '../../app/helpers';



export function MsgBoard() {

	const msg = useSelector(state => state.app.msg.text)
	const trLoading = useSelector(state => state.app.level.loadTruck)
	const msgType = useSelector(state => state.app.msg.type)
	const visible = useSelector(state => state.app.msg.visible)
	const levelNumber = useSelector(state => state.app.level.current)
	const levelTimes = useSelector(state => state.app.level_times)
	const bonuses = useSelector(state => state.app.level_bonuses)
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
				cup.style.top = "-30px"
			}
			approachBoard() 
		}, 100 )


		setTimeout( () => { 
			let watch = document.getElementById("watch")
			if (watch !== null) {
				watch.style.opacity = "1"
			}
		}, 1100 )

		setTimeout( () => { 
			let bonz = document.getElementById("bonuz")
			if (bonz !== null) {
				bonz.style.opacity = "1"
			}
		}, 2200 )


	})


	let approachBoard = () => {
		if (visible) {
			let mEl = document.getElementById("msg")
			mEl.style.marginLeft = 0 + "px"
			mEl.style.opacity = 1
		}
	}

	let mvForward = () => {
		// kolejnosc ma znaczenie :(( 
		dispatch( loadTruck(false) )
		dispatch( hideMsg(true) )
	}

	let mvLoadTruck = () => {
		dispatch( loadTruck(true) )
		dispatch( hideMsg(true) )
	}

	let clipart = type => { 
		switch(type) {
			case 'gratz':
				return s.stihl
			case 'start':
				return s.startIco
			case 'next':
				return s.truckArt
			case 'mess':
				return s.messy
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

	let levInx = () => { 
		let retV = bonuses.findIndex(l => l.level === levelNumber)
		return retV
	}

  return (
		<div>
			{ visible ? 
				<div id="msg" className={ s.msg }> 
				<div className={ s.msgWindow }> 

					<div className={ s.iconCntHdr }>
						{ (msgType === 'gratz') 
							? <div className={ s.calHdr }>
									<span className={ s.levNrHdr }>{ levelNumber }</span>
								</div>
							: '' }

					</div>

					<div className={ s.iconCnt }>

						<div className={ clipart(msgType) }> 

						{ (msgType === 'gratz') 
							? <div id="cup" className={ s.stihlCup }> </div>
							: '' }

						</div>

						{ (msgType === 'gratz' && !trLoading) 
							?  <div id="watch" className={ s.stwatch }>
									 <span className={ s.timeResult }>{ 
											 makeMinutes( Number( levelTimes[levelTimes.length -1] ) )
										 }</span>
								 </div> 
							: '' }

						{ (msgType === 'gratz' && levInx() !== -1) 
							? <div id="bonuz" className={ s.bonus }>
									 <span className={ s.bonusResult }>{ 
											 "x"+bonuses[ levInx() ].count
										 }</span>
								</div>
							: '' }


					{ (msgType === 'start') ?  <span>jak grać ?</span> : '' }

					{ (msgType === 'gratz') ? '' : <div className={ s.msgContent }>{ msg }</div> }

					</div>

					{ (levelNumber %3 === 0 && msgType === 'gratz' && !trLoading) 

						? <div id="fwBtn" onClick={ mvLoadTruck } 
						   className={ s.msgBtn }> załaduj fracht </div> 

						: <div id="fwBtn" onClick={ mvForward }
							 className={ s.msgBtn }> kontynuacja </div> }

		</div>
				</div> 
				: "" 
			}
		</div>
	)
}
