import { parseISO, format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function Year({ dateString }) {
	const date = parseISO(dateString);
	return (
		<time dateTime={dateString}>{format(date, "yyyy", { locale: ptBR })}</time>
	);
}
