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
											  'deepPink',
											  'royalBlue',
											  'red']



//////////////////////////////////
// 
//  tid - truck id
//  pid - pallette start number id
//  type - type of truck
//
export const genTruck = (tid, pid, type) => {

	let max
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
					 empty: false, 
					 pallets: drawPallets( pid, randMax(max) )
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
		let palElem = { id: "p" + id, c: type }
		retArr.push(palElem)
	}

	return retArr
}
