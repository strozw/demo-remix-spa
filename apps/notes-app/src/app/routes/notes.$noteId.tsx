import {
	Editor,
	Group,
	Stack,
	Text,
	TextInput,
	Title,
} from "@demo-remix-spa/ui";
import { IconNotes } from "@demo-remix-spa/ui/icons";
import { useParams } from "@remix-run/react";
import { $params } from "remix-routes";

export default function NotesDetailPage() {
	const params = useParams();

	const { noteId } = $params("/notes/:noteId", params);

	return (
		<Stack gap={"sm"}>
			<Title order={2} size="h5">
				<Group gap="xs">
					<IconNotes />
					<Text fw="inherit">#{noteId}</Text>
				</Group>
			</Title>

			<TextInput label="Title" />

			<Editor />
		</Stack>
	);
}
