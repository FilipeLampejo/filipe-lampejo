import grid from "../../styles/grid.module.scss";
import styles from "./styles.module.scss";

import { RichText } from "prismic-reactjs";

import Image from "next/image";
import FichaTecnica from "../fichaTecnica";
import ImageCarousel from "../imageCarousel";

const SliceBodyText = ({ primary }) => (
	<section className={styles.sliceMd}>
		<RichText render={primary.body_text} />
	</section>
);
const SliceFichaTecnica = ({ items }) => (
	<section className={styles.sliceSm}>
		<FichaTecnica items={items} />
	</section>
);
const SliceCarousel = ({ items }) => (
	<section className={styles.sliceLg}>
		<ImageCarousel images={items} />
	</section>
);
const SliceImage = ({ primary }) => (
	<section
		className={`${styles[`size--${primary.tamanho}`]} ${
			styles[`align--${primary.alinhamento}`]
		}`}
	>
		<Image
			src={primary.imagem.url}
			width={primary.imagem.dimensions.width}
			height={primary.imagem.dimensions.height}
			alt={primary.imagem.alt}
		/>
	</section>
);

export default function SliceMachine({ slices }) {
	const outputComponents = {
		corpo_de_texto: SliceBodyText,
		ficha_tecnica: SliceFichaTecnica,
		carrossel: SliceCarousel,
		imagem: SliceImage,
	};
	let sliceId = 0;
	return (
		<div className={`${grid.col} ${styles.container}`}>
			{slices.map((slice) => {
				sliceId++;
				const Slice = outputComponents[slice.slice_type];
				return (
					<Slice key={sliceId} primary={slice.primary} items={slice.items} />
				);
			})}
		</div>
	);
}
