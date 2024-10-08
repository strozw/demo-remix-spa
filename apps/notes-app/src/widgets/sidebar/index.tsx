import { Navbar } from "@demo-remix-spa/ui";
import { FolderList } from "src/features/folder-list";

export function Sidebar() {
  return (
    <>
      <Navbar>
        <FolderList />
      </Navbar>
    </>
  );
}
