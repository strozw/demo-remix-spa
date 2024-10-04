import { redirect } from "@remix-run/react";
import { $path } from "remix-routes";
import { defineUseAction } from "src/lib/utils/remix";

export const clientAction = () => {
	console.log("notes");

	return redirect($path("/notes/:noteId", { noteId: 1 }));
};

export const useNotesAction = defineUseAction<typeof clientAction>(
	$path("/notes"),
);
