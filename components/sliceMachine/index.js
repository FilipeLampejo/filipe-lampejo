import grid from "../../styles/grid.module.scss";
import typography from "../../styles/typography.module.scss";
import styles from "./styles.module.scss";

import { RichText } from "prismic-reactjs";

import Placeholder from "../placeholder";
import FichaTecnica from "../fichaTecnica";
import ImageCarousel from "../imageCarousel";

const SliceBodyText = ({ primary }) => (
	<section className={`${styles.sliceMd} ${typography.body}`}>
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
		<Placeholder
			src={primary.imagem.url.replace("?auto=compress,format", "")}
			width={primary.imagem.dimensions.width * 2}
			height={primary.imagem.dimensions.height * 2}
			alt={primary.imagem.alt}
			layout="responsive"
			sizes="768px,
					(max-width: 768px) 1366px,
					(max-width: 1920px) 2048px,
					4096px"
			quality={100}
			unoptimized
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
