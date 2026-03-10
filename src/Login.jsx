import { useState } from "react";
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  Box 
} from "@mui/material";

function Login({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const autenticar = () => {
    // Certifique-se de que o endpoint no Java (Spring Boot) aceita POST em /api/login
    fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ usuario, senha })
    })
    .then(res => res.json())
    .then(data => {
      // O backend deve retornar true para sucesso
      if (data === true) {
        onLogin(); 
      } else {
        setErro("Usuário ou senha inválidos");
      }
    })
    .catch(() => setErro("Erro ao conectar com o servidor"));
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 10 }}>
        <Typography variant="h5" gutterBottom>
          Tela de Acesso
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Usuário"
            variant="outlined"
            fullWidth
            onChange={(e) => setUsuario(e.target.value)}
          />
          <TextField
            label="Senha"
            type="password"
            variant="outlined"
            fullWidth
            onChange={(e) => setSenha(e.target.value)}
          />
          <Button variant="contained" onClick={autenticar} color="primary">
            Entrar
          </Button>
          {erro && (
            <Typography color="error" variant="body2">
              {erro}
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;