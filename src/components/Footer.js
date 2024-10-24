import * as React from 'react';
import { Container, Typography, Link } from '@mui/material';

export default function Footer({ description, title }) {
  return (
    <footer
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        marginTop: (theme) => theme.spacing(4),
        padding: (theme) => theme.spacing(6, 0),
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          {description}
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          Copyright ©{' '}
          <Link color="inherit" href="https://material-ui.com/">
            Your Website
          </Link>{' '}
          {new Date().getFullYear()}.
        </Typography>
      </Container>
    </footer>
  );
}
