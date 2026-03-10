import { useEffect, useState } from "react"; 
// Componentes visuais do MUI 
import { Container, Typography, Paper, TextField } from "@mui/material"; 
// Componente de tabela avançada 
import { DataGrid } from "@mui/x-data-grid"; 
function Alunos() { 
 // Estado que armazena os dados vindos do backend 
 const [alunos, setAlunos] = useState([]); 
 // Estado para armazenar o texto digitado na busca 
 const [busca, setBusca] = useState(""); 
 // useEffect executa quando o componente carrega 
 // Faz a requisição para o Spring Boot 
 useEffect(() => { 
 fetch("http://localhost:8080/api/alunos") 
 .then((res) => res.json()) 
 .then((data) => setAlunos(data)); 
 }, []); 
 // Filtro de busca pelo nome do aluno 
 const alunosFiltrados = alunos.filter((aluno) => 
 aluno.nome.toLowerCase().includes(busca.toLowerCase()) 
 );
 // Definição das colunas da DataGrid 
 const columns = [ 
 { field: "matricula", headerName: "Matrícula", flex: 1 }, 
 { field: "nome", headerName: "Nome", flex: 2 }, 
 { field: "curso", headerName: "Curso", flex: 2 }, 
 ]; 
 return ( 
 <Container> 
 {/* Título da página */} 
 <Typography variant="h4" sx={{ mt: 4 }}> 
 Lista de Alunos 
 </Typography> 
 {/* Campo de busca */} 
 <TextField 
 label="Buscar por nome" 
 variant="outlined" 
 fullWidth 
 sx={{ my: 2 }} 
 onChange={(e) => setBusca(e.target.value)} 
 /> 
 {/* Paper cria efeito de cartão na tabela */} 
 <Paper sx={{ height: 400 }}>
  <DataGrid 
    rows={alunosFiltrados} 
    columns={columns} 
    pageSize={5} 
    rowsPerPageOptions={[5, 10]} 
    getRowId={(row) => row.matricula} 
  />
</Paper>
 </Container> 
 ); 
} 
export default Alunos;
