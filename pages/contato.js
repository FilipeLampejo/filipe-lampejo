import useTranslation from "next-translate/useTranslation";

import Meta from "../components/meta";
import { Client } from "../utils/prismicHelpers";

import { RichText } from "prismic-reactjs";

import grid from "../styles/grid.module.scss";
import typography from "../styles/typography.module.scss";
import styles from "../styles/pages/contato.module.scss";

export default function Contato({ doc }) {
	const { t } = useTranslation();
	return (
		<>
			{doc && doc.data && (
				<article className={`${grid.col} ${styles.container}`}>
					<Meta pageTitle={t("common:menu.contact")} />
					<section className={`${styles.body} ${typography.body}`}>
						<RichText render={doc.data.corpo} />
					</section>
					<section className={styles.contact}>
						<h2 className="visually-hidden">{t("common:menu.contact")}</h2>
						<ul>
							{doc.data.contatos.map((p, index) => (
								<li key={`contato-${index}`}>
									<h3 className={typography.smcp}>{p.tipo}</h3>
									<RichText render={p.conteudo} />
								</li>
							))}
						</ul>
					</section>
				</article>
			)}
		</>
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

	const doc =
		(await client.getSingle("contato", { lang: langs[locale] })) || {};

	if (doc) {
		return {
			props: {
				doc: doc ? doc : {},
			},
		};
	}
}
