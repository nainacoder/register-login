import React, { useState, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const style = {
    padding: '8px',
    width: '20%',
  };

  const navigate = useNavigate();

  const [inputFields, setInputFields] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputFields((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  console.log('data***', inputFields);
  const handleSubmit = () => {
    const userInfo = JSON.parse(localStorage.getItem('userDetails') || '[]');
    console.log('userInfo******', userInfo);
    const userData = userInfo.find(
      ({ email }: { email: string }) => email === inputFields.email
    );

    if (userData) {
      localStorage.setItem('currentUser', JSON.stringify(userData));
      navigate('/');
    } else {
      alert('Invalid email or password');
    }
  };

  const isDisabled = inputFields.email && inputFields.password;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        mt: 10,
      }}
    >
      <TextField
        autoComplete="off"
        sx={style}
        required
        name="email"
        value={inputFields.email}
        label="email"
        onChange={handleChange}
      />
      <TextField
        sx={style}
        required
        name="password"
        value={inputFields.password}
        label="password"
        onChange={handleChange}
      />
      <Button
        sx={style}
        variant="contained"
        onClick={handleSubmit}
        disabled={!isDisabled}
      >
        Login
      </Button>
    </Box>
  );
};
export default LoginForm;
