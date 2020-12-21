import useTranslation from "next-translate/useTranslation";
import Layout from "../components/layout";

export default function Sobre() {
	const { t } = useTranslation();
	return <Layout pageTitle={t("common:menu.about")}></Layout>;
}
