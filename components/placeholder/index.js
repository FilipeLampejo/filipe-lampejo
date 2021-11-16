import Image from "next/image";
import { useState } from "react";
import styles from "./styles.module.scss";

export default function Placeholder(props) {
	const [loaded, setLoaded] = useState(false);
	return (
		<div className={`${styles.placeholder} ${loaded ? styles.loaded : ""}`}>
			<Image
				className={`${styles.image} ${loaded ? styles.loaded : ""}`}
				{...props}
				onLoadingComplete={() => setLoaded(true)}
			/>
		</div>
	);
}
