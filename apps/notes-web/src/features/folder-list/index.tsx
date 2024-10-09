import {
	ActionIcon,
	Button,
	Group,
	NavLink,
	Text,
	Title,
	Tooltip,
	UnstyledButton,
	rem,
} from "@demo-remix-spa/ui";
import { IconFolder, IconPlus } from "@demo-remix-spa/ui/icons";
import { Form, Link } from "@remix-run/react";
import { $path } from "remix-routes";
import { useFoldersAction, useFoldersLoader } from "src/app/routes/folders";

export const FolderList = () => {
	const { data: loadData } = useFoldersLoader();

	const { submit } = useFoldersAction();

	return (
		<div>
			<Group className={""} justify="space-between">
				<Title size="h6">Folders</Title>
				<Tooltip label="Create collection" withArrow position="right">
					<Form
						method="post"
						onSubmit={(event) => {
							event.preventDefault();

							submit(event.currentTarget);
						}}
					>
						<ActionIcon type="submit" variant="outline" size="xs" color="blue">
							<IconPlus />
						</ActionIcon>
					</Form>
				</Tooltip>
			</Group>

			<NavLink
				component={Link}
				to={$path("/folders/uncategorized/notes")}
				label={
					<Group>
						<IconFolder /> 未分類
					</Group>
				}
			/>

			{loadData?.folders?.map((folder) => (
				<NavLink
					key={folder.id}
					component={Link}
					to={$path("/folders/:folderId/notes", { folderId: folder.id })}
					label={
						<Group>
							<IconFolder /> {folder.name}
						</Group>
					}
				/>
			))}
		</div>
	);
};
