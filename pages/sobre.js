import useTranslation from "next-translate/useTranslation";
import Meta from "../components/meta";

export default function Sobre() {
	const { t } = useTranslation();
	return <Meta pageTitle={t("common:menu.about")}></Meta>;
}
