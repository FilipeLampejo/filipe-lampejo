import grid from "../../styles/grid.module.scss";
import typography from "../../styles/typography.module.scss";
import styles from "./styles.module.scss";

import { RichText } from "prismic-reactjs";

import Placeholder from "../placeholder";
import FichaTecnica from "../fichaTecnica";
import ImageCarousel from "../imageCarousel";
import VideoPlayer from "../VideoPlayer";

const SliceBodyText = ({ primary }) => (
	<section
		className={`${styles.sliceMd} ${typography.body} ${
			styles[`color-${primary.color}`] || "black"
		}`}
	>
		<RichText render={primary.body_text} />
	</section>
);
const SliceFichaTecnica = ({ items }) => (
	<section className={`${styles.sliceSm} ${styles.fichaTecnica}`}>
		<FichaTecnica items={items} />
	</section>
);
const SliceCarousel = ({ items }) => (
	<section className={styles.sliceLg}>
		<ImageCarousel images={items} />
	</section>
);

const SliceDivider = ({ primary }) => (
	<section
		className={styles.sliceMd}
		style={{ height: `${primary.height * 1.618}em` }}
	></section>
);
const SliceImage = ({ primary }) => (
	<section
		className={`${styles[`size--${primary.tamanho}`]} ${
			styles[`align--${primary.alinhamento}`]
		}`}
	>
		<Placeholder
			src={primary.imagem.url.replace("?auto=compress,format", "?")}
			width={primary.imagem.dimensions.width}
			height={primary.imagem.dimensions.height}
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
const SliceVideo = ({ primary }) => (
	<section
		className={`${styles[`size--${primary.tamanho}`]} ${
			styles[`align--${primary.alinhamento}`]
		}`}
	>
		<VideoPlayer
			src={primary.video.url}
			width={primary.width || 1920}
			height={primary.height || 1080}
			layout="responsive"
			videoProps={{
				muted: primary.muted || primary.autoplay,
				loop: primary.loop,
				controls: primary.controls,
				autoPlay: primary.autoplay,
				playsInline: true,
			}}
		/>
	</section>
);

export default function SliceMachine({ slices }) {
	const outputComponents = {
		corpo_de_texto: SliceBodyText,
		ficha_tecnica: SliceFichaTecnica,
		carrossel: SliceCarousel,
		imagem: SliceImage,
		imagem1: SliceVideo,
		divisor: SliceDivider,
	};
	let sliceId = 0;
	return (
		<div className={`${grid.col} ${styles.container}`}>
			{slices.map((slice) => {
				sliceId++;
				const Slice = outputComponents[slice.slice_type];
				if (!Slice) return null;
				return (
					<Slice key={sliceId} primary={slice.primary} items={slice.items} />
				);
			})}
		</div>
	);
}
