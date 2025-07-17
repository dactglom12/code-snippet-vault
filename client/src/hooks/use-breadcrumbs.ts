import { useLocation } from "react-router";

type Breadcrumb = {
  label: string;
  path: string;
};

const HOME_BREADCRUMB: Breadcrumb = {
  label: "Home",
  path: "/",
};

export function useBreadcrumbs() {
  const { pathname } = useLocation();

  const segments = pathname.split("/");

  if (segments.every((segment) => segment === "")) {
    return [];
  }

  const breadcrumbs: Breadcrumb[] = [HOME_BREADCRUMB];

  // skip home breadcrumb which is included by default
  segments
    .filter((_, index) => index !== 0)
    .forEach((segment, index, filtered) => {
      const path = "/" + filtered.slice(0, index + 1).join("/");
      const decoded = decodeURIComponent(segment);
      breadcrumbs.push({
        label: decoded[0].toUpperCase() + decoded.slice(1),
        path,
      });
    });

  return breadcrumbs;
}
