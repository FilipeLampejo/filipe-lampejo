import styles from "./styles.module.scss";
import typography from "../../styles/typography.module.scss";
import grid from "../../styles/grid.module.scss";

export default function Hero({ title, desc, invisible }) {
	return (
		<article
			className={`${styles.hero} ${grid.col} ${
				invisible ? styles.invisible : ""
			}`}
		>
			<header className={styles.title}>
				<h1 className={typography.headingOne}>{title}</h1>
			</header>
			<div className={styles.bio}>{desc}</div>
		</article>
	);
}
