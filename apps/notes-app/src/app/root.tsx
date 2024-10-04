import {
	type ClientLoaderFunction,
	Link,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";

import "./global.css";

import {
	AppSidebarLayout,
	Group,
	Navbar,
	Text,
	Title,
	UiProvider,
} from "@demo-remix-spa/ui";
import { IconNotes, IconPlus } from "@demo-remix-spa/ui/icons";
import { FolderList } from "src/features/folder-list";
import { NotesCreationButton } from "src/features/notes-creation-button";

export const clientLoader: ClientLoaderFunction = () => {
	return { message: "root" };
};

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<UiProvider>
					<AppSidebarLayout
						header={
							<>
								<Title order={1} size="h5">
									<Link to="/" style={{ color: "inherit" }}>
										<Group gap="xs">
											<IconNotes />
											<Text fw="inherit">Demo Notes App</Text>
										</Group>
									</Link>
								</Title>
								<Group align="flex-end" style={{ marginLeft: "auto" }}>
									<NotesCreationButton />
								</Group>
							</>
						}
						sidebar={
							<Navbar>
								<FolderList />
							</Navbar>
						}
					>
						{children}
					</AppSidebarLayout>

					<ScrollRestoration />

					<Scripts />
				</UiProvider>
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}

export function HydrateFallback() {
	return <p>Loading...</p>;
}
