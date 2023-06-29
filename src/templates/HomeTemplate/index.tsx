import { Box, Container, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';

function HomeTemplate() {
  const router = useRouter();
  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" align="center" gutterBottom>
          Sistema de Gerenciamento de Deslocamentoss
        </Typography>
      </Box>
      <Box mt={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box bgcolor="primary.main" color="primary.contrastText" p={3} onClick={()=>router.push('/clientes')} css={{cursor: 'pointer'}}>
              <Typography variant="h5" gutterBottom>
                Clientes
              </Typography>
              <Typography variant="body1">
                Aqui você pode gerenciar os clientes cadastrados no sistema.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box bgcolor="secondary.main" color="secondary.contrastText" p={3} onClick={()=>router.push('/veiculos')} css={{cursor: 'pointer'}}>
              <Typography variant="h5" gutterBottom>
                Veículos
              </Typography>
              <Typography variant="body1">
                Aqui você pode gerenciar os veículos cadastrados no sistema.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box bgcolor="primary.main" color="primary.contrastText" p={3} onClick={()=>router.push('/condutores')} css={{cursor: 'pointer'}}>
              <Typography variant="h5" gutterBottom>
                Condutores
              </Typography>
              <Typography variant="body1">
                Aqui você pode gerenciar os condutores cadastrados no sistema.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box bgcolor="secondary.main" color="secondary.contrastText" p={3} onClick={()=>router.push('/deslocamentos')} css={{cursor: 'pointer'}}>
              <Typography variant="h5" gutterBottom>
                Deslocamentos
              </Typography>
              <Typography variant="body1">
                Aqui você pode gerenciar os deslocamentos registrados no sistema.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default HomeTemplate;