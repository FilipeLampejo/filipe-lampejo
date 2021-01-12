import { useRouter } from "next/router";
import Link from "next/link";

import styles from "./styles.module.scss";
import grid from "../../styles/grid.module.scss";
import typography from "../../styles/typography.module.scss";

import { localeToNext } from "../../utils/prismicHelpers";
import Button from "../button";
import useTranslation from "next-translate/useTranslation";

const LangPicker = ({ langs, current, asPath }) => {
	let { t } = useTranslation();
	return (
		<ul className={`${styles.langPicker} ${typography.smcp}`}>
			{langs.map((locale) => (
				<li className={`${styles.locale}`} key={locale}>
					<Button
						active={locale == current}
						href={asPath}
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

const External = () => (
	<svg
		style={{ marginLeft: ".25em" }}
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		width="9px"
		height="9px"
		viewBox="0 0 404 404"
	>
		<path d="M387.2,24.2l17,288l-30,1.3l-54.8-205.7L65.9,404.2L0,338.9l296.4-254l-205-54.2L92.7,0L380,17L387.2,24.2z" />
	</svg>
);

export default function Navbar({
	altLangs = [{ lang: "pt-br" }, { lang: "en-gb" }],
}) {
	const router = useRouter();
	let { t } = useTranslation();
	const menuItems = {
		sobre: t("common:menu.about"),
		projetos: t("common:menu.projects"),
		instagram: t("common:menu.instagram"),
	};
	const altLocales = altLangs.map((lang) => localeToNext(lang.lang));

	return (
		<aside className={`${styles.navbar} ${grid.col}`}>
			<ul className={`${styles.menu}`}>
				{Object.entries(menuItems).map(([key, value]) => {
					const href =
						key === "instagram"
							? "https://instagram.com/filipe_lampejo"
							: `/${key}`;
					return (
						<li key={key} className={styles.item}>
							<Button href={href} active={router.asPath === href} type="link">
								{value}
								{key === "instagram" ? <External /> : ""}
							</Button>
						</li>
					);
				})}
				<li className={`${styles.item}`} key="lang">
					<LangPicker
						langs={router.locales.filter(
							(locale) =>
								locale === router.locale || altLocales.includes(locale)
						)}
						current={router.locale}
						asPath={router.asPath}
					/>
				</li>
				<li
					key="logo"
					className={`${styles.logo} ${
						router.asPath === "/" ? styles.hidden : ""
					}`}
				>
					<Button href="/" type="link">
						{t("common:title")}
					</Button>
				</li>
			</ul>
		</aside>
	);
}
