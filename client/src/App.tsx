import { ModeToggle } from "./components/theme-mode-toggle";
import { ThemeProvider } from "./components/theme/theme-provider";
import LoginPage from "./pages/login/login-page";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <ModeToggle />
      <LoginPage />
    </ThemeProvider>
  );
}

export default App;
