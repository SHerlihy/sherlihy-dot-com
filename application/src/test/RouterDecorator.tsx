import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  RouterContextProvider,
  createMemoryHistory,
  createRouter,
} from "@tanstack/react-router";

import { routeTree } from "../routeTree.gen";

export function RouterDecorator({
  children,
  initialEntry = "/",
}: {
  children: ReactNode;
  initialEntry?: string;
}) {
  const router = useMemo(
    () =>
      createRouter({
        routeTree,
        history: createMemoryHistory({
          initialEntries: [initialEntry],
        }),
      }),
    [initialEntry],
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    setIsLoaded(false);
    void router.load().then(() => {
      if (isMounted) {
        setIsLoaded(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [router]);

  if (!isLoaded) {
    return null;
  }

  return (
    <RouterContextProvider router={router}>{children}</RouterContextProvider>
  );
}
