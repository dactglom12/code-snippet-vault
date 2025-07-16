import { Route } from "react-router";
import type { AppRoute } from "./route-type";

export function renderRoutes(routes: AppRoute[]) {
  return routes.map((route) => {
    const key = buildKey(route);

    if (route.index) {
      if (route.path) {
        console.warn("Index route shouldn't have a path: ", route);
      }

      return <Route key={key} index element={route.element} />;
    }
    if (route.children) {
      return (
        <Route key={key} path={route.path} element={route.element}>
          {renderRoutes(route.children)}
        </Route>
      );
    }

    return <Route key={key} element={route.element} path={route.path} />;
  });
}

let routeCount = 0;

function buildKey(route: AppRoute) {
  routeCount++;
  if (route.index) {
    return "index";
  }

  if (route.path) {
    return route.path;
  }

  return `pathless-route-${routeCount}`;
}
