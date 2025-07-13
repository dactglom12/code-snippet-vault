import LoginPage from "@/pages/login/login-page";
import type { AppRoute } from "./route-type";
import { ProtectedRoute } from "@/components/routes/protected-route";

export const routes: AppRoute[] = [
  { path: "/login", element: <LoginPage /> },
  // TODO: add signup element
  { path: "/signup", element: null },
  // TODO: add app element and its children
  {
    path: "/",
    children: [],
    element: (
      <ProtectedRoute>
        <div>Hello</div>
      </ProtectedRoute>
    ),
  },
];
