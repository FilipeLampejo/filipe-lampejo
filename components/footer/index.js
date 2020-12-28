import styles from "./styles.module.scss";
import typography from "../../styles/typography.module.scss";

import { RichText } from "prismic-reactjs";
import useTranslation from "next-translate/useTranslation";

export default function Footer({ data }) {
	const { t } = useTranslation();
	console.log(data);
	return (
		<footer className={styles.footer}>
			<h2 className="visually-hidden">{t("common:colophon")}</h2>
			<ul className={styles.colophon}>
				{data.contatos.map((p, index) => (
					<li key={`contato-${index}`}>
						<h3 className={typography.smcp}>{p.tipo}</h3>
						<RichText render={p.conteudo} />
					</li>
				))}
			</ul>
		</footer>
	);
}
