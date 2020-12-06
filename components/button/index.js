import styles from "./styles.module.scss";
import typography from "../../styles/typography.module.scss";
import Link from "next/link";

export default function Button({ type, active, children, href, locale }) {
	return (
		<Link href={href} locale={locale}>
			<a
				className={`${type ? styles[type] : ""} ${
					active ? styles.active : ""
				} ${typography.smcp}`}
			>
				{children}
			</a>
		</Link>
	);
}
