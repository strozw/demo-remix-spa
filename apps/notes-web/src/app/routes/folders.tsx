import type { ClientActionFunctionArgs } from "@remix-run/react";
import { $path } from "remix-routes";
import { defineUseAction, defineUseLoader } from "src/lib/utils/remix";

export const clientLoader = async () => {
	return {
		folders: [
			{ id: 1, name: "Folder1" },
			{ id: 2, name: "Folder2" },
			{ id: 3, name: "Folder3" },
		],
	};
};

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
	const body = await request.formData();

	console.log("aaaaaaaaaaaaaaaaaaaaaa");
	console.log(body);

	return {};
};

export const useFoldersLoader = defineUseLoader<typeof clientLoader>(
	$path("/folders"),
);

export const useFoldersAction = defineUseAction<typeof clientAction>(
	$path("/folders"),
);
