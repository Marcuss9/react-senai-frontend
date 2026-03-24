import { useState, useMemo } from "react";
// ThemeProvider: Providencia o tema para todos os componentes filhos
// createTheme: Função que define as cores e estilos do sistema
// CssBaseline: Normaliza o CSS e aplica a cor de fundo correta (preto no dark, branco no light)
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import Login from "./Login";
import Menu from "./Menu";
import Dashboard from "./Dashboard";
import Alunos from "./Alunos";
function App() {
// Estado para controlar se o utilizador passou pela tela de login
const [logado, setLogado] = useState(false);
// Estado para saber qual componente renderizar no conteúdo principal
const [telaAtiva, setTelaAtiva] = useState("dashboard");
// Estado para controlar o modo de cor (claro ou escuro)
const [modo, setModo] = useState("light");
// useMemo: Memoriza o tema para evitar que o React o processe novamente
// sem necessidade, a menos que o 'modo' mude.
const theme = useMemo(() => createTheme({
palette: {
mode: modo, // Define se o MUI usa paleta clara ou escura
primary: { main: '#1976d2' }, // Cor azul padrão
},
}), [modo]);
// Função simples para inverter o estado do tema
const toggleTema = () => {
setModo((prev) => (prev === "light" ? "dark" : "light"));
};
// Proteção de Rota: Se não estiver logado, interrompe e mostra apenas o Login
if (!logado) {
return <Login onLogin={() => setLogado(true)} />;
}
return (
<ThemeProvider theme={theme}>
<CssBaseline />
{/* Box com minHeight garante que o fundo escuro cubra a tela toda */}
<Box sx={{ minHeight: '100vh' }}>
{/* Passamos as funções e o estado do modo para o Menu */}
<Menu
onLogout={() => setLogado(false)}
setTelaAtiva={setTelaAtiva}
toggleTema={toggleTema}
modo={modo}

/>
{/* Renderização Condicional: Mostra o componente conforme o valor da string telaAtiva */}
<main style={{ padding: '20px' }}>
{telaAtiva === "dashboard" && <Dashboard />}
{telaAtiva === "alunos" && <Alunos />}
</main>
</Box>
</ThemeProvider>
);
}
export default App;