import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Typography, Container, Box, Link } from '@mui/material';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter()

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push('/');
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit} autoComplete="off">
          <TextField
            label="Usuário"
            fullWidth
            margin="normal"
            value={username}
            autoComplete='off'
            onChange={handleUsernameChange}
          />
          <TextField
            label="Senha"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            autoComplete='off'
            onChange={handlePasswordChange}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Entrar
          </Button>
          <Box mt={2} textAlign="center">
            <Link href="/esqueci-senha">Esqueci minha senha</Link>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
