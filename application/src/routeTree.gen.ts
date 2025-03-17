/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ProjectsImport } from './routes/projects'
import { Route as EventsImport } from './routes/events'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const ProjectsRoute = ProjectsImport.update({
  id: '/projects',
  path: '/projects',
  getParentRoute: () => rootRoute,
} as any)

const EventsRoute = EventsImport.update({
  id: '/events',
  path: '/events',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/events': {
      id: '/events'
      path: '/events'
      fullPath: '/events'
      preLoaderRoute: typeof EventsImport
      parentRoute: typeof rootRoute
    }
    '/projects': {
      id: '/projects'
      path: '/projects'
      fullPath: '/projects'
      preLoaderRoute: typeof ProjectsImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/events': typeof EventsRoute
  '/projects': typeof ProjectsRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/events': typeof EventsRoute
  '/projects': typeof ProjectsRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/events': typeof EventsRoute
  '/projects': typeof ProjectsRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/events' | '/projects'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/events' | '/projects'
  id: '__root__' | '/' | '/events' | '/projects'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  EventsRoute: typeof EventsRoute
  ProjectsRoute: typeof ProjectsRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  EventsRoute: EventsRoute,
  ProjectsRoute: ProjectsRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/events",
        "/projects"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/events": {
      "filePath": "events.tsx"
    },
    "/projects": {
      "filePath": "projects.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
