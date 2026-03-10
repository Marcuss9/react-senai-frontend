import { AppBar, Toolbar, Typography, Button } from "@mui/material";
// Adicione 'setTelaAtiva' aqui nas chaves
function Menu({ onLogout, setTelaAtiva }) {
return (
<AppBar position="static">
<Toolbar>
<Typography variant="h6" sx={{ flexGrow: 1 }}>
Sistema Acadêmico
</Typography>
{/* Botão para ir ao Dashboard */}
<Button color="inherit" onClick={() => setTelaAtiva("dashboard")}>
Dashboard
</Button>
{/* Botão para acessar a área de alunos */}
<Button color="inherit" onClick={() => setTelaAtiva("alunos")}>
Alunos
</Button>
<Button color="inherit" onClick={onLogout}>
Sair
</Button>
</Toolbar>
</AppBar>
);
}
export default Menu;