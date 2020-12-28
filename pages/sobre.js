import useTranslation from "next-translate/useTranslation";

import Meta from "../components/meta";
import { Client, manageLocal } from "../utils/prismicHelpers";

import { RichText } from "prismic-reactjs";
import Placeholder from "../components/placeholder";
import Layout from "../components/layout";
import Image from "next/image";

import grid from "../styles/grid.module.scss";
import typography from "../styles/typography.module.scss";
import styles from "../styles/pages/sobre.module.scss";

export default function Sobre({ doc }) {
	const { t } = useTranslation();
	return (
		<Layout altLangs={doc.alternate_languages}>
			<Meta pageTitle={t("common:menu.about")} />
			{doc && doc.data && (
				<article className={`${grid.col} ${styles.container}`}>
					{doc.data.imagem.url && (
						<div className={styles.img}>
							<Placeholder>
								<Image
									width={doc.data.imagem.dimensions.width}
									height={doc.data.imagem.dimensions.height}
									sizes="(max-width: 768px) 300px,
	            							600px"
									layout="responsive"
									quality={90}
									src={doc.data.imagem.url}
									alt={doc.data.imagem.alt}
								/>
							</Placeholder>
						</div>
					)}
					<section className={`${styles.body} ${typography.body}`}>
						<RichText render={doc.data.corpo} />
					</section>
					<section className={styles.prizes}>
						<h2>{t("common:premiacoes")}</h2>
						<ul>
							{doc.data.premiacoes.map((p, index) => (
								<li key={`premio-${index}`}>
									<h3>{p.premio}</h3>
									<p className={styles.entity}>{p.entidade}</p>
									<p className={`${styles.year} ${typography.smcp}`}>{p.ano}</p>
								</li>
							))}
						</ul>
					</section>
				</article>
			)}
		</Layout>
	);
}

export async function getStaticProps({
	// preview,
	// previewData,
	locale,
	// locales,
}) {
	const langs = {
		en: "en-gb",
		"pt-BR": "pt-br",
	};
	const client = Client();

	// const { currentLang, isMyMainLanguage } = manageLocal(locales, locale);

	const doc = (await client.getSingle("sobre", { lang: langs[locale] })) || {};

	if (doc) {
		return {
			props: {
				doc: doc ? doc : {},
			},
		};
	}
}
