declare module "remix-routes" {
  type URLSearchParamsInit = string | string[][] | Record<string, string> | URLSearchParams;
  // symbol won't be a key of SearchParams
  type IsSearchParams<T> = symbol extends keyof T ? false : true;
  
  type ExportedQuery<T> = IsSearchParams<T> extends true ? T : URLSearchParamsInit;
  

  export interface Routes {
  
    "": {
      params: never,
      query: ExportedQuery<import('src/app/routes/_index').SearchParams>,
    };
  
    "/": {
      params: never,
      query: ExportedQuery<import('src/app/root').SearchParams>,
    };
  
    "/folders/:folderId/destroy": {
      params: {
        folderId: string | number;
      } ,
      query: ExportedQuery<import('src/app/routes/folders_.$folderId.destroy').SearchParams>,
    };
  
    "/folders/:folderId/notes": {
      params: {
        folderId: string | number;
      } ,
      query: ExportedQuery<import('src/app/routes/folders.$folderId.notes').SearchParams>,
    };
  
    "/folders/new": {
      params: never,
      query: ExportedQuery<import('src/app/routes/folders_.new').SearchParams>,
    };
  
    "/notes/:noteId": {
      params: {
        noteId: string | number;
      } ,
      query: ExportedQuery<import('src/app/routes/notes.$noteId').SearchParams>,
    };
  
    "/notes/:noteId/destroy": {
      params: {
        noteId: string | number;
      } ,
      query: ExportedQuery<import('src/app/routes/notes_.$noteId.destroy').SearchParams>,
    };
  
    "/notes/new": {
      params: never,
      query: ExportedQuery<import('src/app/routes/notes_.new').SearchParams>,
    };
  
  }

  type RoutesWithParams = Pick<
    Routes,
    {
      [K in keyof Routes]: Routes[K]["params"] extends Record<string, never> ? never : K
    }[keyof Routes]
  >;

  export type RouteId =
    | 'root'
    | 'routes/_index'
    | 'routes/folders_.$folderId.destroy'
    | 'routes/folders_.new'
    | 'routes/folders.$folderId.notes'
    | 'routes/notes_.$noteId.destroy'
    | 'routes/notes_.new'
    | 'routes/notes.$noteId';

  export function $path<
    Route extends keyof Routes,
    Rest extends {
      params: Routes[Route]["params"];
      query?: Routes[Route]["query"];
    }
  >(
    ...args: Rest["params"] extends Record<string, never>
      ? [route: Route, query?: Rest["query"]]
      : [route: Route, params: Rest["params"], query?: Rest["query"]]
  ): string;

  export function $params<
    Route extends keyof RoutesWithParams,
    Params extends RoutesWithParams[Route]["params"]
  >(
      route: Route,
      params: { readonly [key: string]: string | undefined }
  ): {[K in keyof Params]: string};

  export function $routeId(routeId: RouteId): RouteId;
}