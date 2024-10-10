import {
	Editor,
	Group,
	NativeSelect,
	Stack,
	Text,
	TextInput,
	Title,
  Input,
} from "@demo-remix-spa/ui";
import { IconNotes } from "@demo-remix-spa/ui/icons";
import { Await, Form, useParams } from "@remix-run/react";
import { $params } from "remix-routes";
import { useRootLoaderData } from "src/shared/model/remix";

export default function NotesDetailPage() {
	const params = useParams();

	const { noteId } = $params("/notes/:noteId", params);

  const rootData = useRootLoaderData()

	return (
		<Stack gap={"sm"}>
			<Title order={2} size="h5">
				<Group gap="xs">
					<IconNotes />
					<Text fw="inherit">#{noteId}</Text>
				</Group>
			</Title>

      <Form>
        <Stack gap="sm">
          <TextInput label="Title" />

          <Await resolve={rootData?.folders}>
            {folders => <NativeSelect label="Folder" data={[{ value: null, label: 'Uncategorzied' }, ...folders?.map(folder => ({ label: folder.name, value: folder.id }))]} />}
          </Await>

          <Input.Wrapper>
            <Input.Label>Content</Input.Label>
            <Editor />
          </Input.Wrapper>
        </Stack>
      </Form>
		</Stack>
	);
}
