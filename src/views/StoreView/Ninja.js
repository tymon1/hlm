import s from './css/Ramp.module.css';
import { useDispatch } from 'react-redux';
import { drag, source } from '../../slice/AppSlice';
import { rmNinja } from '../../slice/StoreSlice';



export function Ninja({ ramp }) {

	const dispatch = useDispatch();

	return (

		<div className={ s.ninjaLogo }
				draggable = { true }

				onDragStart = { () => {
					dispatch( drag( true ) )
					dispatch( source({ name: "ninja" }) )
				}}

				onDragEnd = { () => {
					dispatch( drag( false ) )
					dispatch( rmNinja({ rampInx: ramp.no }) )
				}} >

		</div>
	)
}
