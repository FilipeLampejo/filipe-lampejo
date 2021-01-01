import useSWR from "swr";
import { useRouter } from "next/router";
import { fetcher } from "../fetcher";

export function useProjects() {
	const { locale } = useRouter();
	return useSWR(`project/${locale}`, fetcher, {
		revalidateOnFocus: false,
		revalidateOnMount: true,
		revalidateOnReconnect: false,
	});
}
