import styles from "./styles.module.scss";
import typography from "../../styles/typography.module.scss";

import { RichText } from "prismic-reactjs";
import useTranslation from "next-translate/useTranslation";

export default function Footer({ data }) {
	const { t } = useTranslation();
	return (
		<footer className={styles.footer}>
			<h2 className="visually-hidden">{t("common:colophon")}</h2>
			<ul className={styles.colophon}>
				{data &&
					data.contatos.map((p, index) => (
						<li key={`contato-${index}`}>
							<h3 className={typography.smcp}>{p.tipo}</h3>
							<RichText render={p.conteudo} />
						</li>
					))}
				<li key={`contato-penumbra`}>
					<h3 className={typography.smcp}>{t("common:credits.website")}</h3>
					<a href="https://penumbra.design/?ref=filipe-lampejo" target="_blank">
						{t("common:credits.author")}
					</a>
				</li>
			</ul>
		</footer>
	);
}
