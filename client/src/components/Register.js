import React from 'react';
import "./Register.css";
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input type="text" placeholder="Username" style={{ padding: '10px', fontSize: '16px' }} />
        <input type="email" placeholder="Email" style={{ padding: '10px', fontSize: '16px' }} />
        <input
          type="password"
          placeholder="Password"
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <Button variant="contained" style={{color:'white',backgroundColor:'#02075D',}} type="submit">
          Register
        </Button>
      </form>
      <Typography style={{ marginTop: '1rem' }}>
        Already have an account?{' '}
        <Button component={Link} to="/login" style={{  color: '#02075D',textDecoration: 'underline',cursor: 'pointer', }}>
          Login
        </Button>
      </Typography>
    </Container>
  );
}

export default Register;
