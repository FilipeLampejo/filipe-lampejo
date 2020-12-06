import styles from "./styles.module.scss";

import ContentfulImage from "@moxy/react-contentful-image";
import { objToLocale } from "../../lib/contentful";
import { useRouter } from "next/router";

export function ContentfulFig({ file, fileWidth, fit, position, transparent }) {
	let router = useRouter();
	const fileInfo = objToLocale(file, router.locale, router.defaultLocale);
	if (!fileInfo) return false;

	const { width, height } = fileInfo.details.image;
	return (
		<Fig
			fit={fit}
			position={position}
			transparent={transparent}
			ratio={(height / width).toFixed(3)}
		>
			<ContentfulImage
				image={fileInfo.url}
				format="png"
				resize={{ width: fileWidth || 600 }}
			/>
		</Fig>
	);
}

export default function Fig({
	src,
	alt,
	ratio,
	children,
	fit,
	position,
	transparent,
}) {
	const figureStyle = {
		paddingBottom: `${ratio * 100}%`,
		"--objectFit": fit || "cover",
		"--objectPosition": position || "center",
		"--bg": transparent || "#f0f0f0",
	};

	return (
		<figure className={styles.container} style={figureStyle}>
			{src ? <img src={src} alt={alt} /> : children}
		</figure>
	);
}
