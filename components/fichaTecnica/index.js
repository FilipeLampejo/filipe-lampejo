import React from "react";
import styles from "./styles.module.scss";

export default function FichaTecnica({ items }) {
	return (
		<>
			<h2 className={styles.title}>Ficha Técnica</h2>
			<dl className={styles.ficha}>
				{items.map((item) => (
					<React.Fragment key={item.tarefa + item.executor}>
						<dd>{item.tarefa}</dd>
						<dt>{item.executor}</dt>
					</React.Fragment>
				))}
			</dl>
		</>
	);
}
