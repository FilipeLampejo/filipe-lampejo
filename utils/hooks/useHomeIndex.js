import useSWR from "swr";
import { useRouter } from "next/router";
import { indexFetcher } from "../fetcher";

export function useHomeIndex() {
	const { locale } = useRouter();
	return useSWR(locale, indexFetcher, {
		revalidateOnFocus: false,
		revalidateOnMount: true,
		revalidateOnReconnect: false,
	});
}
