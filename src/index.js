import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// Importa o ThemeProvider do MUI
// Ele permite aplicar o tema global na aplicação
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
// Renderização da aplicação React
ReactDOM.createRoot(document.getElementById("root")).render(
// ThemeProvider envolve toda a aplicação
// Assim todos os componentes MUI usam as cores e estilos definidos no theme.js
<ThemeProvider theme={theme}>
<App />
</ThemeProvider>
);