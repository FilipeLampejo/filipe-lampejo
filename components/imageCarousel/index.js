import styles from "./styles.module.scss";
import { useState } from "react";
import grid from "../../styles/grid.module.scss";
import Placeholder from "../placeholder";
export default function ImageCarousel({ images }) {
	const [slide, setSlide] = useState(0);
	const maxSlides = images.length;

	let gallery = [...images.slice(slide - 1), ...images.slice(0, slide - 1)];
	gallery = gallery.slice(0, 3);

	const handleClick = (newSlide) => {
		newSlide >= maxSlides
			? setSlide(0)
			: newSlide < 0
			? setSlide(maxSlides - 1)
			: setSlide(newSlide);
	};

	return (
		<figure className={`${styles.container} ${grid.col}`}>
			{gallery.map((i) => (
				<div
					key={i.imagem.url.replace("?auto=compress,format", "?")}
					className={styles.image}
					onClick={() => handleClick(images.indexOf(i))}
				>
					<Placeholder
						src={i.imagem.url.replace("?auto=compress,format", "?")}
						width={i.imagem.dimensions.width * 2}
						height={i.imagem.dimensions.height * 2}
						alt={i.imagem.alt}
						layout="responsive"
						sizes="768px,
									(max-width: 768px) 1366px,
									(max-width: 1920px) 2048px,
									4096px"
						quality={100}
						unoptimized
					/>
				</div>
			))}
			<figcaption className={styles.counter}>
				<span className={styles.super}>{slide + 1}</span>⁄
				<span className={styles.sub}>{maxSlides}</span>
			</figcaption>
		</figure>
	);
}
