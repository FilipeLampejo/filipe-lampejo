import { useRouter } from "next/router";
import Link from "next/link";

import styles from "./styles.module.scss";
import grid from "../../styles/grid.module.scss";
import typography from "../../styles/typography.module.scss";

import Button from "../button";
import useTranslation from "next-translate/useTranslation";

const LangPicker = () => {
	let router = useRouter();
	let { t } = useTranslation();
	return (
		<ul className={`${styles.langPicker} ${typography.smcp}`}>
			{router.locales.map((locale) => (
				<li className={`${styles.locale}`} key={locale}>
					<Button
						active={locale == router.locale}
						href={router.asPath}
						locale={locale}
						type="lang"
					>
						{t(`common:locales.${locale}`)}
					</Button>
				</li>
			))}
		</ul>
	);
};

export default function Navbar() {
	const { asPath } = useRouter();
	let { t } = useTranslation();
	const menuItems = {
		sobre: t("common:menu.about"),
		contato: t("common:menu.contact"),
		projetos: t("common:menu.projects"),
	};

	return (
		<aside tabindex="0" className={`${styles.navbar} ${grid.col}`}>
			<ul className={`${styles.menu}`}>
				{Object.entries(menuItems).map(([key, value]) => {
					const href = `/${key}`;
					return (
						<li key={key} className={styles.item}>
							<Button href={href} active={asPath === href} type="link">
								{value}
							</Button>
						</li>
					);
				})}
				<li className={`${styles.item}`} key="lang">
					<LangPicker />
				</li>
				<li
					key="logo"
					className={`${styles.logo} ${asPath === "/" ? styles.hidden : ""}`}
				>
					<Link href="/">
						<a>{t("common:title")}</a>
					</Link>
				</li>
			</ul>
		</aside>
	);
}
