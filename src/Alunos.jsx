import { useEffect, useState } from "react";
import { Container, Typography, Paper, TextField, Snackbar, Alert, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

function Alunos() {
const [alunos, setAlunos] = useState([]);
const [nome, setNome] = useState("");
const [curso, setCurso] = useState("");
const [open, setOpen] = useState(false);
const [msg, setMsg] = useState("");
// Carregar alunos
const carregar = () => {
fetch("http://localhost:8080/api/alunos")
.then(res => res.json())
.then(data => setAlunos(data));
};
useEffect(() => {
carregar();
}, []);
// Adicionar aluno
const adicionar = () => {
fetch("http://localhost:8080/api/alunos", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ nome, curso })
}).then(() => {
setMsg("Aluno cadastrado!");
setOpen(true);
carregar();
});
};
// Excluir aluno
const excluir = (id) => {
fetch(`http://localhost:8080/api/alunos/${id}`, {
method: "DELETE"
}).then(() => {
setMsg("Aluno removido!");
setOpen(true);
carregar();
});
};

const columns = [
{ field: "matricula", headerName: "ID", flex: 1 },
{ field: "nome", headerName: "Nome", flex: 2 },
{ field: "curso", headerName: "Curso", flex: 2 },
{
field: "acoes",
headerName: "Ações",
renderCell: (params) => (
<Button color="error" onClick={() => excluir(params.row.matricula)}>
Excluir
</Button>
)
}
];
return (
<Container>
<h2>Cadastro de Alunos</h2>
<TextField label="Nome" fullWidth onChange={e => setNome(e.target.value)} />
<TextField label="Curso" fullWidth onChange={e => setCurso(e.target.value)} />
<Button variant="contained" onClick={adicionar}>Salvar</Button>
<div style={{ height: 400 }}>
<DataGrid
rows={alunos}
columns={columns}
getRowId={(row) => row.matricula}
/>
</div>
<Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
<Alert severity="success">{msg}</Alert>
</Snackbar>
</Container>
);
}
export default Alunos;