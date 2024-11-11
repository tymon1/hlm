//
//   helpers
//
//////////////////


// export this to config.js somewhere

// types of truck sizes
//

const truck_types = ['s','m','xl']


// pellets colors / colors of available zones
// no of colors must coresponds with no of zones..

											  // 'saddleBrown',
												
const pallets_colors = ['rgb(54,119,78)',
											  'peru',
											  'purple',
												'blue',
											  'yellow',
											  'white',
											  'pink',
											  'CadetBlue',
											  'red']



//////////////////////////////////
// 
//  tid - truck id
//  pid - pallette start number id,
//        pass 0 to make bonus truck
//        pass 1 to make full truck
//  target - gotta pass target pal...
//           pass regular truck gets 
//           null
//

export const genTruck = (tid, pid, target) => {

	let retType = pid => {
		if ( pid === 0 ) { return 'bonus' }
		if ( pid === 1 ) { return 'full' }
		else { return drawTruckType() }
	}

	let type = retType(pid)
	let max

	switch (type) {
		case 's':
			max = 3
			break
		case 'm':
			max = 6
			break
		case 'xl':
			max = 10
			break
		default:
			max = 1
	}
			
	return { 
					 id: tid, 
					 type: type,
					 cover: true, 
					 target: target,
					 ready: false, 
					 pallets: drawPallets( pid, randMax(max) )
				 } 
}


export const drawTruckType = () => {
	const random = Math.floor(Math.random() * truck_types.length)
	return truck_types[random]
}


let randMax = max => {
	let min = 1
  let randNr = Math.floor(Math.random() * (max - min + 1)) + min
	return randNr
}


// pick random available pallette color
let drawPalletType = () => {
	const random = Math.floor(Math.random() * pallets_colors.length)
	return pallets_colors[random]
}



//////////////////////////////
//
//   idf_ - pallet start id 
//          pass 0 or 1 to return 
//          empty array
//   len_ - amount of pallettes
//   
//

let drawPallets = (idf_, len_) => {

	let retArr = []

	// warunek stworzony zeby byla mozliwosc
	// zwrocenia pustej tablicy
	if (idf_ > 1 ) {
		for ( let i = 0; i < len_; i++ ) {
			let colorType = drawPalletType()
			let id = idf_ + i

			// pallette object:
			//
			let palElem = { id: "p" + id, 
				              c: colorType, 
											selected: false, 
											recovered: 100,
			              }
			retArr.push(palElem)
		}
	}

	return retArr
}


///////////////////////////////////////
//
//  determine if pallet is flipping ..
//
//  if you pass 0 as flip risk you can
//  get recovered palette :)
//
//  fr - flip risk
//  p - palette
//

export const isFlipping = (pl) => {
	let drawFlip = Math.round( Math.random() *100 )
	let flipped
	
	if (drawFlip <= pl.fr) { flipped = 0 }
	else { flipped = 100 }

	let actionCopy = {
		index: pl.p.index,
		name: pl.p.name,
		pallet: {
			id: pl.p.pallet.id,
			c: pl.p.pallet.c,
			selected: pl.p.pallet.selected,
			recovered: flipped,
		}

	}
	return actionCopy
}


// deSelects pallet ...
//
export const deSelected = (pl) => {
	let actionCopy = {
		index: pl.p.index,
		name: pl.p.name,
		pallet: {
			id: pl.p.pallet.id,
			c: pl.p.pallet.c,
			selected: false,
			recovered: pl.p.pallet.recovered,
		}

	}
	return actionCopy
}



//////////////////////////////
//
//   pick unloaded pallette 
//   from zones /used in bonus
//   levels/
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
//   forge an array from unloaded 
//   pallettes, based on zones
//   
//   currently it returns pallets
//   from 2 most populated zones
//

export const drawUnloadedArray = zones => {

	let rndPalArr = []

	let filZone = zones.filter( zone => zone.pallets.length > 0 )
	let zonesDesc = filZone.sort( (a,b) => { return b.pallets.length - a.pallets.length } )

	for (let i = 0; i <= 1; i++) {
		if (zonesDesc[i].pallets.length >= 1) {
		  for (let j=0; j<zonesDesc[i].pallets.length; j++) {
				rndPalArr.push({
					zone_index: zonesDesc[i].no, 
					pal_id: zonesDesc[i].pallets[j].id 
				})
			}
		}
	}
	return rndPalArr
}



//////////////////////////////
//
//   par.d - docks
//   par.r - ramps
//   sa pelne ciezarowki kurierow lub palety na rampach ?
//   unloaded truck or pallets on ramps present ?
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


//
// Ninja helpers

export const colorMatch = param => {

	let cfields = param.color_fields
	for (let field of cfields) {
		if (param.pallet.c === field.color) {
			return field.index;
			// break;
		}
	}
	return false
}
//
//
const matchColorIndex = param => {
	for (let cfield of param.color_fields) {
		if (cfield.index === param.field.no) {
			return cfield.color
		}
	}
	return false
}
//
export const fieldMatch = param => {

	for (let field of param.fields) {
		if (field.pallets.length > 0 && 
				field.pallets[0].c === param.pallet.c) {
			return field.no
		}
		let retColor = matchColorIndex({"field":field, 
																		"color_fields":param.color_fields})
		if (field.pallets.length === 0 && !retColor) {
			return field.no
		}
	}
	return false
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


// returns array of 
// unoccupied docks indexes
//
export const countEmptyDocks = (docks) => {
	let retV = [] 
	docks.forEach( dock => {
		if (dock.truck.id === undefined) {
			retV.push(dock.no)
		}
	})
	return retV;
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

	let digify = dig => {
		if (dig < 10) { return "0"+dig }
		else return dig
	}

	while (secs - 60 >= 0) { 
		secs -= 60
		m++ 
	}

	if (m > 0) {
		return digify(m) + ":" + digify(secs)
	}
	else {
		return "00:" + digify(secs)
	}
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
