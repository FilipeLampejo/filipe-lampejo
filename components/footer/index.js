import styles from "./styles.module.scss";
import Button from "../button";
import useTranslation from "next-translate/useTranslation";

export default function Footer() {
	const { t } = useTranslation();
	return (
		<footer className={styles.footer}>
			<p className={styles.colophon}>
				{t("common:footer.credits")}{" "}
				<Button type="link" href="https://penumbra.design?ref=filipe-lampejo">
					{t("common:footer.author")}
				</Button>
			</p>
		</footer>
	);
}
