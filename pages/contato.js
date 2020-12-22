import useTranslation from "next-translate/useTranslation";
import Meta from "../components/meta";

export default function Contato() {
	const { t } = useTranslation();
	return (
		<>
			<Meta pageTitle={t("common:menu.contact")} />
			Contato
		</>
	);
}
