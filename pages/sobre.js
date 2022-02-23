import useTranslation from "next-translate/useTranslation";

import Meta from "../components/meta";
import { Client, localeToPrismic } from "../utils/prismicHelpers";

import { RichText } from "prismic-reactjs";
import Placeholder from "../components/placeholder";
import Layout from "../components/layout";

import grid from "../styles/grid.module.scss";
import typography from "../styles/typography.module.scss";
import styles from "../styles/pages/sobre.module.scss";

export default function Sobre({ doc, footer }) {
	const { t } = useTranslation();
	return (
		<Layout altLangs={doc.alternate_languages} footer={footer}>
			<Meta pageTitle={t("common:menu.about")} />
			{doc && doc.data && (
				<article className={`${grid.col} ${styles.container}`}>
					{doc.data.imagem.url && (
						<div className={styles.img}>
							<Placeholder
								width={doc.data.imagem.dimensions.width}
								height={doc.data.imagem.dimensions.height}
								sizes="(max-width: 768px) 300px,
	            							600px"
								layout="responsive"
								quality={90}
								src={doc.data.imagem.url}
								alt={doc.data.imagem.alt}
							/>
						</div>
					)}
					<section className={`${styles.body} ${typography.body}`}>
						<RichText render={doc.data.corpo} />
					</section>
					<section className={styles.prizes}>
						{!!doc.data.premiacoes.length && <h2>{t("common:premiacoes")}</h2>}
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
					<section className={styles.contact}>
						<h2 className="visually-hidden">{t("common:menu.contact")}</h2>
						<ul>
							{footer.data.contatos.map((p, index) => (
								<li key={`contato-${index}`}>
									<h3 className={typography.smcp}>{p.tipo}</h3>
									<RichText render={p.conteudo} />
								</li>
							))}
						</ul>
					</section>
				</article>
			)}
		</Layout>
	);
}

export async function getStaticProps({ locale }) {
	const client = Client();

	const doc =
		(await client.getSingle("sobre", { lang: localeToPrismic(locale) })) || {};

	const footer =
		(await client.getSingle("contato", { lang: localeToPrismic(locale) })) ||
		{};

	if (doc) {
		return {
			props: {
				footer: footer || {},
				doc: doc || {},
			},
		};
	}
}
