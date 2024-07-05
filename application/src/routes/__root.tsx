import { createRootRoute, Outlet } from '@tanstack/react-router'

import css from '../shared/styles/App.module.css'
css

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
    </>
  ),
})
