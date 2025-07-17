import LoginPage from "@/pages/login/login-page";
import type { AppRoute } from "./route-type";
import { ProtectedRoute } from "@/components/routes/protected-route";
import SignupPage from "@/pages/signup/signup-page";
import { SignedInRedirectRoute } from "@/components/routes/signed-in-redirect-route";
import { CreateSnippetPage } from "@/pages/snippet/create-snippet-page";
import LoggedInAppLayout from "@/components/layout/app-layout";
import { AllSnippetsPage } from "@/pages/snippet/all-snippets-page";
import { NotFoundPage } from "@/pages/404/not-found-page";
import { CreateFolderPage } from "@/pages/folder/create-folder-page";

export const routes: AppRoute[] = [
  {
    path: "/login",
    element: (
      <SignedInRedirectRoute>
        <LoginPage />
      </SignedInRedirectRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <SignedInRedirectRoute>
        <SignupPage />
      </SignedInRedirectRoute>
    ),
  },
  // TODO: add app element and its children
  {
    path: "/",
    children: [
      { element: <CreateSnippetPage />, path: "snippets/new" },
      {
        element: <AllSnippetsPage />,
        path: "snippets",
      },
      {
        element: <CreateFolderPage />,
        path: "folders/new",
      },
      {
        element: <NotFoundPage />,
        path: "*",
      },
    ],
    element: (
      <ProtectedRoute>
        <LoggedInAppLayout />
      </ProtectedRoute>
    ),
  },
];
