import type { ReactElement, ReactNode } from "react";
import { act, render, type RenderOptions } from "@testing-library/react";
import {
  RouterContextProvider,
  createMemoryHistory,
  createRouter,
} from "@tanstack/react-router";

import { routeTree } from "../routeTree.gen";

type RenderWithRouterOptions = Omit<RenderOptions, "wrapper"> & {
  initialEntry?: string;
};

export async function renderWithRouter(
  ui: ReactElement,
  { initialEntry = "/", ...renderOptions }: RenderWithRouterOptions = {},
) {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries: [initialEntry],
    }),
  });

  await act(() => router.load());

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <RouterContextProvider router={router}>{children}</RouterContextProvider>
    );
  }

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    router,
  };
}
