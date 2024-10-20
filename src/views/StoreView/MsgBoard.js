import s from './css/MsgBoard.module.css';
import p from './css/Pallet.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { hideMsg,
				 showMsg,
				 loadTruck,
				 incHowto,
				 decHowto,
	     } from '../../slice/AppSlice';


import { makeMinutes,
				 // totalTime,
	     } from '../../app/helpers';



export function MsgBoard() {

	const dispatch = useDispatch()
	const msg = useSelector(state => state.app.msg.text)
	const trLoading = useSelector(state => state.app.level.loadTruck)
	const msgType = useSelector(state => state.app.msg.type)
	const visible = useSelector(state => state.app.msg.visible)
	const levelNumber = useSelector(state => state.app.level.current)
	const levelTimes = useSelector(state => state.app.level_times)
	const bonuses = useSelector(state => state.app.level_bonuses)

	const waveTim = useSelector(state => state.app.wave_times)
	const waveCur = useSelector(state => state.app.level.wave)
	const levels = useSelector(state => state.app.levels)

	const levStartCnt = useSelector(state => state.app.level_start_pal_count)
	const levFinCnt = useSelector(state => state.store.counter.palletId)
	const levelPalNum = levFinCnt - levStartCnt[ levelNumber -1 ]

	const howtoPage = useSelector(state => state.app.howtoPage)

	const ppMinute = ((levelPalNum/levelTimes[levelTimes.length -1]) *60).toFixed(1)

	const levelPoints = useSelector(state => state.app.level_points)
  const currLevelPoints = Math.round( (ppMinute / 60 *levelPalNum) *10) /10
	// sum of all level points
	const levelPtsSum = levelPoints.reduce( (a,b) => { return a +b }, 0 )


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


	// for blinking in howto page 3/3
	useEffect( () => { 
		if (msgType === 'howto' && howtoPage === 3) {
			let demoP = document.getElementById("demoP")
			const intId = setInterval( () => { 
				setTimeout( () => { 
					if (demoP !== null) { demoP.classList.remove(p.selected) }
				}, 500)
				demoP.classList.add(p.selected)
			}, 1200)

			return () => {
				clearInterval(intId)
			}
		}
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
			  return ''
	}}


	let speedAnimal = speed => { 
		if (speed >= 0 && speed <= 10) { return s.slime } 
		if (speed > 10 && speed <= 20) { return s.turtle } 
		if (speed > 20 && speed <= 30) { return s.hare } 
		if (speed > 30 && speed <= 50) { return s.gepart } 
	}

	// let blinkBtn = () => {
	// 	let el = document.getElementById("fwBtn")
	// 	el.style.background = "white"
	// 	setTimeout( () => {
	// 		el.style.background = "green"
	// 	}, 100)
	// }

	let showHowto = () => { 
		dispatch( showMsg({ type:"howto", text:"pl" }) )
	}

	let showStart = () => {
		dispatch( showMsg({ type:"start", text:"Rozpocznij grę" }) )
	}

	let incHT = () => { dispatch( incHowto() ) }
	let decHT = () => { dispatch( decHowto() ) }


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
						{ (msgType === 'next') ? 
							<div className={ s.topRes }>
								<span className={ s.resEmptyBis }>{ waveCur } / { levels[ levelNumber].waves }</span>
								<span className={ s.resBis }>
									{ makeMinutes( Number( waveTim[ waveCur-1]) ) }
								</span>
							</div>
							: '' }

						{ (msgType === 'gratz') ? 
							<div className={ s.topRes }>
							  <div className={ s.calHdr }>
									<span className={ s.levNrHdr }>{ levelNumber }</span>
								</div>
								<div className={ speedAnimal(ppMinute) }>
									<span className={ s.resEmptySpeed }>{ ppMinute }</span>
								</div>
								<div className={ s.palHdr }>
									<span className={ s.palCnt }>{ levelPalNum }</span>
								</div>
							</div>
							: '' }

						{ (msgType === 'howto') ? 
							<div className={ s.topRes }>   
								<span className={ s.howtoBtn } onClick={ decHT }>&#60;</span>
								<span className={ s.resEmptyPrim }> { howtoPage } / 3 </span>
								<span className={ s.howtoBtn } onClick={ incHT }>&#62;</span>
								<span className={ s.howtoBtn } onClick={ showStart }>x</span>
							</div>
							: '' }

					</div>

					<div className={ s.iconCnt }>

						<div className={ clipart(msgType) }> 
							{ (msgType === 'gratz') ? 
								<div id="cup" className={ s.stihlCup }> </div>
								: '' }
						</div>

						{ (msgType === 'gratz' && !trLoading) ?  
							  <div id="watch" className={ s.stwatch }>
									<span className={ s.timeResult }>
									  { makeMinutes( Number( levelTimes[levelTimes.length -1] ) ) }
							    </span>
								</div> 
							: '' }

						{ (msgType === 'gratz' && levInx() !== -1) ? 
							  <div id="bonuz" className={ s.bonus }>
									 <span className={ s.bonusResult }>
									 	 { "x"+bonuses[ levInx() ].count } 
								   </span>
								</div>
							: '' }

						{ (msgType === 'gratz' && !trLoading) ?  
							  <div className={ s.result }>
								  <span>level pts: {  currLevelPoints } </span>
								  <span>total pts: {  Math.round( (levelPtsSum + 
												                           currLevelPoints) *10) /10 } 
									</span>
								</div> 
							: '' }


						<div className={ s.msgCnt }>
							{ (msgType === 'howto' && howtoPage === 1) ? 
								<div className={ s.howtoContainer }>
									<div className={ s.howtoBox }>
									  <div className={ s.howToDrag }></div>
										<div> przeciągaj ciężarówki na niezajęte rampy </div>
									</div>
									<div className={ s.howtoBox }>
									  <div className={ s.howToCover }></div>
										<div> kliknij żeby otworzyć ciężarówkę </div>
									</div>
								</div>
								: '' }

							{ (msgType === 'howto' && howtoPage === 2) ? 
								<div className={ s.howtoContainer }>
									<div className={ s.howtoBox }>
									  <div className={ s.howToRamp }>
											<div id="demoR" className={ p.pallet } style={{"background": "red"}}></div>
										</div>
										<div> przeciągaj palety na rampy żeby zeskanować </div>
									</div>
									<div className={ s.howtoBox }>
									  <div className={ s.howToGroup }>
											<div id="demoYA" className={ p.pallet } style={{"background": "yellow"}}></div>
											<div id="demoYB" className={ p.pallet } style={{"background": "yellow"}}></div>
											<div id="demoGA" className={ p.pallet } style={{"background": "springgreen"}}></div>
											<div id="demoGB" className={ p.pallet } style={{"background": "springgreen"}}></div>
										</div>
										<div> sortuj palety według ich kolorów </div>
									</div>
								</div>
								: '' }

							{ (msgType === 'howto' && howtoPage === 3) ? 
								<div className={ s.howtoContainer }>
									<div className={ s.howtoBox }>
									  <div className={ s.howToColor }>
											<div id="demoYA" className={ p.pallet } style={{"background": "yellow"}}></div>
											<div id="demoYB" className={ p.pallet } style={{"background": "yellow"}}></div>
											<div id="demoGA" className={ p.pallet } style={{"background": "springgreen"}}></div>
											<div id="demoGB" className={ p.pallet } style={{"background": "springgreen"}}></div>
										</div>
										<div> na zabarwione pola stawiaj palety o korespondującym kolorze </div>
									</div>
									<div className={ s.howtoBox }>
									  <div className={ s.howToBonus }>
											<div id="demoP" className={ p.pallet } style={{"background": "sandybrown"}}></div>
										</div>
										<div> bonusowe ciężarówki i frachty ładuj migającymi paletami </div>
									</div>
								</div>
								: '' }


							{ (msgType === 'gratz' || msgType === 'howto') ? '' : <div className={ s.msgContent }>{ msg }</div> }
							{ (msgType === 'start') ?  <span className={ s.msgContentRef } 
								                               onClick={ showHowto }>Jak grać ?</span> : '' }
						</div>

					</div>


					{ (levelNumber %3 === 0 && msgType === 'gratz' && !trLoading) 

						? <div id="fwBtn" onClick={ mvLoadTruck } 
							 className={ s.msgBtn }> ładuj fracht </div> 

						: (msgType === 'howto') ? <div id="fwBtn" onClick={ mvForward } 
							                             className={ s.msgBtn }> graj </div> :
						   <div id="fwBtn" onClick={ mvForward } 
															 className={ s.msgBtn }> kontynuacja </div> }


				</div>
				</div> 

				: "" 
			}
		</div>
	)
}
