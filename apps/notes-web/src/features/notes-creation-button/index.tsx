import { ActionIcon } from "@demo-remix-spa/ui";
import { IconPlus } from "@demo-remix-spa/ui/icons";
import { Form } from "@remix-run/react";
import { useNotesAction } from "src/app/routes/notes";

export const NotesCreationButton = () => {
	const { submit } = useNotesAction();

	return (
		<Form
			method="post"
			onSubmit={(event) => {
				event.preventDefault();

				submit(event.currentTarget);
			}}
		>
			<ActionIcon type="submit">
				<IconPlus />
			</ActionIcon>
		</Form>
	);
};
