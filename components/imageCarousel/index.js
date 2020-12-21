import styles from "./styles.module.scss";
import { useState } from "react";
import Image from "next/image";
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
				<div className={styles.image}>
					<Placeholder>
						<Image
							onClick={() => handleClick(images.indexOf(i))}
							src={i.imagem.url}
							width={i.imagem.dimensions.width}
							height={i.imagem.dimensions.height}
							alt={i.imagem.alt}
							layout="responsive"
						/>
					</Placeholder>
				</div>
			))}
			<figcaption className={styles.counter}>
				<span className={styles.super}>{slide + 1}</span>⁄
				<span className={styles.sub}>{maxSlides}</span>
			</figcaption>
		</figure>
	);
}
