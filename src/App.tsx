import { BrowserRouter } from "react-router-dom";
import { Routers } from "./Routers";
import { ThemeProvider } from "./components/theme-provider";
// import { Toaster } from "sonner";
import { Toaster } from "@/components/ui/sonner";
function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routers />
        <Toaster theme="dark" position="top-right" />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
