# Remix SPA Monorepo Demo

Turborepo を使った monorepo 構成で、Remix SPA Mode で構築したアプリを試すために作成したデモ。

## 構成

### Apps

| パス                             | 内容                                                                                                   |
| -------------------------------- | ------------------------------------------------------------------------------------------------------ |
| [apps/notes-api](apps/notes-api) | [Hono](https://hono.dev/) による単純な Note とそれを分類する Folder を扱う API                         |
| [apps/notes-spa](apps/notes-spa) | `notes-api` を利用した [Remix SPA Mode](https://remix.run/docs/en/main/guides/spa-mode) を利用した SPA |

### Packages

| パス                       | 内容                                                                                                                                                 |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| [packages/ui](packages/ui) | `apps` 内で利用する共通 UI をまとめたもの。Demo なので [Mantine UI](https://mantine.dev/) と関連 package を re-export しているだけのものになっている |

## Setup

```sh
pnpm install
```

### Build Apps & Packages for deployment

```sh
pnpm build
```

### Build & Start Apps

```sh
pnpm start
```

## Development

### Develop Apps & Packages

```sh
pnpm dev
```

### Develop Apps & Packages Components in Storybook

```sh
pnpm storybook
```

### Build Apps & Packages Storybook

```sh
pnpm build-storybook
```

### Check Apps & Packages types

```sh
pnpm check-types
```

### Lint Apps & Packages codes

```sh
pnpm check
```

### Format Apps & Packages codes

```sh
pnpm format
```

### Tests Apps & Packages

```sh
pnpm test
```
