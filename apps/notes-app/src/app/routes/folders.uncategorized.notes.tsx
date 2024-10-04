import { Group, Title } from "@demo-remix-spa/ui";
import { useLoaderData } from "@remix-run/react";
import { NotesTable } from "src/features/notes-table";

export const clientLoader = () => {
	return {
		notes: [
			{ id: 1, title: "Notes1", createdAt: "2021-09-01" },
			{ id: 2, title: "Notes2", createdAt: "2021-09-01" },
			{ id: 3, title: "Notes3", createdAt: "2021-09-01" },
			{ id: 4, title: "Notes4", createdAt: "2021-09-01" },
			{ id: 5, title: "Notes5", createdAt: "2021-09-01" },
		],
	};
};

export default function FolderNotesPage() {
	const data = useLoaderData<typeof clientLoader>();

	return (
		<div>
			<Title order={2} size={"h5"}>
				<Group>Uncategorized Notes</Group>
			</Title>

			<NotesTable data={data.notes} />
		</div>
	);
}
