import styles from './Pellet.module.css';


//export class Pellet extends React.Component {
export function Pellet({ pellet }) {


	return (
		<div draggable={ true } className={ styles.pellet }
				 id = { pellet.id } style={{ background: pellet.c }}

				 onDragStart = { e => {
					 e.dataTransfer.setData("text/plain", e.target.id)
				 }}
				 >

		</div>
	)

}
