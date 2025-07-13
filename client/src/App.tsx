import { BrowserRouter } from "react-router";
import { ModeToggle } from "./components/theme-mode-toggle";
import { ThemeProvider } from "./components/theme/theme-provider";
import LoginPage from "./pages/login/login-page";
import { AuthProvider } from "./contexts/auth/auth-provider";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark">
        <BrowserRouter>
          <ModeToggle />
          <LoginPage />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
