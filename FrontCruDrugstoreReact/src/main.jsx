import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { createRoot } from "react-dom/client";
import '@fontsource/inter';
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <ToastProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ToastProvider>
);
