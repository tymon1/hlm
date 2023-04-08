//
//   helpers
//
//////////////////


// export this to config.js somewhere

// types of truck sizes
//

const truck_types = ['s','m','xl']


// pellets colors / colors of available zones
//

const pallets_colors = ['blue',
											  'sandyBrown',
											  'green',
											  'purple',
											  'white',
											  'pink',
											  'black',
											  'red']



//////////////////////////////////
// 
//  tid - truck id
//  pid - pallette start number id
//
export const genTruck = (tid, pid) => {

	let type = drawTruckType()
	let max
	// 3 5 8
	switch (type) {
		case 's':
			max = 3
			break
		case 'm':
			max = 5
			break
		case 'xl':
			max = 8
			break
		default:
			max = 1
	}
			
	return { 
					 id: tid, 
					 type: type,
					 cover: true, 
					 ready: false, 
					 // pallets: drawPallets( pid, randMax(max) )
					 pallets: drawPallets( pid, randMax(5) )
				 } 
}


//////////////////////////////////


export const drawTruckType = () => {
	const random = Math.floor(Math.random() * truck_types.length)
	return truck_types[random]
}


let randMax = max => {
	let min = 1
  let randNr = Math.floor(Math.random() * (max - min + 1)) + min
	return randNr
}


let drawPalletType = () => {
	const random = Math.floor(Math.random() * pallets_colors.length)
	return pallets_colors[random]
}



//////////////////////////////
//
//   idf_ - pallet start id 
//   len_ - amount of pallettes
//
let drawPallets = (idf_, len_) => {

	let retArr = []

  for ( let i = 0; i < len_; i++ ) {
		let type = drawPalletType()
		let id = idf_ + i

		// pallette object:
		//
		let palElem = { id: "p" + id, c: type, selected: false }
		retArr.push(palElem)
	}

	return retArr
}


//////////////////////////////
//
//   pick unloaded pallette 
//   from zones
//

export const drawUnloaded = zones => {
	//
	// array of all unloaded pallets based on existing store zones:
	let filZone = zones.filter( zone => zone.pallets.length > 0 )
	const rndZone = Math.floor( Math.random() * filZone.length )
	const rndPalInd = Math.floor( Math.random() * filZone[rndZone].pallets.length )
	let rndPalObj = { 
		zone_index: filZone[rndZone].no, 
		pal_id: filZone[rndZone].pallets[rndPalInd].id 
	}
	return rndPalObj
}


//////////////////////////////
//
//   par.d - docks
//   par.r - ramps
//   sa pelne ciezarowki kurierow lub palety na rampach ?
//
export const unloadingDone = par => {

	for ( let j= 0; j< par.d.length; j++ ) {

		if ((par.d[j].truck.ready === false && par.d[j].truck.type !== 'bonus') || 
				par.r[j].pallets.length > 0) { 

			return false 
		}
	}
	return true
}

//////////////////////////////
//
//   par.d - docks
//   par.r - ramps
//   sa puste ciezarowki do zaladunku lub palety na rampach ?
//
export const loadingDone = par => {

	for ( let j= 0; j< par.d.length; j++ ) {


		if ( ( par.d[j].truck.type === 'bonus' &&
					 par.d[j].truck.pallets.length === 0 ) || 
					 par.r[j].pallets.length > 0) { 

	// console.log("loDone",j,par.d[j].truck.pallets.length)
			return false 
		}
	}
	return true
}


//////////////////////////////
//
//  zones - all store zones
//  
export const storeMess = zones => {

	let retVal = []
	zones.forEach( zone => {
		// if field contains more than 2 pallets
		if (zone.pallets.length > 1) {
			for ( let i= 1; i< zone.pallets.length; i++ ) {
				// compare each one with first element
				if (zone.pallets[0].c !== zone.pallets[i].c) {
					retVal.push(false)
				}
			}
		}
	})
	return retVal.includes(false)
}


//////////////////////////////
//
//  p.zones - all store zones
//  p.czones - colored zones
//  zones{no, pallets}, czones {index, color}
//  
//

export const colorStoreMess = p => {

	let retVal = []

	// helpers helper palColor, znsCol
	let colorObligatory = col => {
		let zoneInx = col.znsCol.findIndex( 
				o => o.color === col.palColor )
		if (zoneInx !== -1) {
			return true
		}
		return false
	}

	// helpers helper palColor, znsCol
	let colZoneIx = col => {
		let zoneInx = col.znsCol.findIndex( 
				o => o.color === col.palColor )
		if (zoneInx !== -1) {
			return col.znsCol[ zoneInx ].index
		}
		return false
	}

	p.zones.forEach( (zone, index) => {
		// if field contains more than 2 pallets
		if (zone.pallets.length > 1) {
			for ( let i= 1; i< zone.pallets.length; i++ ) {
				// compare each one with first element
				if (zone.pallets[0].c !== zone.pallets[i].c) {
					retVal.push(false)
				}
			}
		}
		// for every non-empty field
		if (zone.pallets.length > 0) {
			if ( colorObligatory({ palColor: zone.pallets[0].c, znsCol: p.czones }) ) {
				if (zone.no !== colZoneIx({ palColor: zone.pallets[0].c, znsCol: p.czones })) {
					retVal.push(false)
				}
			}
		}
	})
	return retVal.includes(false)
}



//////////////////////////////
//
//  simple sum fn
//  times - [] waves times
//  
export const totalTime = times => {
	let sum = 0
	times.forEach( time => {
		sum += time
	})
	return sum
}


//////////////////////////////
//
//  secs to min:sec
//
export const makeMinutes = secs => {
	let m=0
	while (secs - 60 >= 0) { 
		secs -= 60
		m++ 
	}
	if (m > 0) { return m + "m " + secs } 
	else { return secs }
}



//////////////////////////////
//
//  draw zones 
//  indexes & colors
//
export const drawZones = zone => {
	let zoneInd = []
	let retArr = []
	let colors_copy = structuredClone(pallets_colors)
	// let colors_copy = pallets_colors.map(a => {return {...a}})

	for (let j=0; j<zone.len; j++) { zoneInd.push(j) }

	for (let i=0; i<zone.count; i++) {
		let randZoneInd = zoneInd[ Math.floor( Math.random() * zoneInd.length ) ]
		zoneInd.splice( zoneInd.indexOf(randZoneInd), 1)

		let randCol = colors_copy[ Math.floor( Math.random() * colors_copy.length ) ]
		colors_copy.splice( colors_copy.indexOf(randCol), 1 )

		retArr.push({ index: randZoneInd, color: randCol })
	}

	return retArr
}
