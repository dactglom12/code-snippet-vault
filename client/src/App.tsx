import { BrowserRouter, Routes } from "react-router";
import { ModeToggle } from "./components/theme-mode-toggle";
import { ThemeProvider } from "./components/theme/theme-provider";
import { AuthProvider } from "./contexts/auth/auth-provider";
import { renderRoutes } from "./routes/routes-renderer";
import { routes } from "./routes/routes-config";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark">
        <BrowserRouter>
          <ModeToggle />
          <Routes>{renderRoutes(routes)}</Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
