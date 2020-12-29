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
	<span
		style={{
			display: "inline-block",
			transform: "rotate(-45deg)",
		}}
	>
		->
	</span>
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
