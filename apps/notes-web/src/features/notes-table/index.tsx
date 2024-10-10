import { Anchor, Table } from "@demo-remix-spa/ui";
import { Link } from "@remix-run/react";
import { $path } from "remix-routes";

export const NotesTable = ({
  data,
}: {
  data: { id: string; title: string; createdAt: string }[];
}) => {
  const rows = data.map((row) => {
    return (
      <Table.Tr key={row.id}>
        <Table.Td>
          <Anchor
            component={Link}
            fz="sm"
            to={$path("/notes/:noteId", { noteId: row.id })}
          >
            {row.id}
          </Anchor>
        </Table.Td>
        <Table.Td>{row.title}</Table.Td>
        <Table.Td>{row.createdAt}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="xs">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Id</Table.Th>
            <Table.Th>Title</Table.Th>
            <Table.Th>Created At</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};
