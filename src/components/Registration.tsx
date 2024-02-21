import React, { ChangeEvent, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

type InputFieldType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  //   dob: Date;
  termsAndConditions: boolean;
};

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const RegistrationForm: React.FC = () => {
  const labels = {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    dateOfBirth: 'Date Of Birth',
    termsAndConditions: 'I accept terms and conditions',
  };

  const [fields, setFields] = useState<InputFieldType>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    // dob: newDate(),
    termsAndConditions: false,
  });

  const [error, setError] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
    // dob: false,
    termsAndConditions: false,
  });

  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'termsAndConditions') {
      setFields((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.checked,
      }));
    } else {
      setFields((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    }
    // console.log('error****', error);
  };
  const MAX_LENGTH = 8;

  useEffect(() => {
    for (let key in fields) {
      handleValidation(key);
    }
  }, [fields]);

  const handleValidation = (name: string) => {
    // console.log('validation');
    // let { name, value } = event.target;
    console.log('validation***', name);
    //   const stateObj = { ...prev, [name]: '' };

    switch (name) {
      //   case 'firstName':
      //     if (!fields.firstName) {
      //       setError((prevState) => ({
      //         ...prevState,
      //         [name]: true,
      //       }));
      //     } else {
      //       setError((prevState) => ({
      //         ...prevState,
      //         [name]: false,
      //       }));
      //     }
      //     break;
      case 'password':
        if (!fields.password || MAX_LENGTH > fields.password.length) {
          setError((prevState) => ({
            ...prevState,
            [name]: true,
          }));
        } else {
          setError((prevState) => ({
            ...prevState,
            [name]: false,
          }));
        }
        break;

      case 'confirmPassword':
        if (
          !fields.confirmPassword ||
          fields.password !== fields.confirmPassword
        ) {
          setError((prevState) => ({
            ...prevState,
            [name]: true,
          }));
        } else {
          setError((prevState) => ({
            ...prevState,
            [name]: false,
          }));
        }
        break;

      case 'email':
        if (!fields.email || !emailRegex.test(fields.email)) {
          setError((prevState) => ({
            ...prevState,
            [name]: true,
          }));
        } else {
          setError((prevState) => ({
            ...prevState,
            [name]: false,
          }));
        }
        break;
      case 'termsAndConditions':
        if (!fields.termsAndConditions) {
          setError((prevState) => ({
            ...prevState,
            [name]: true,
          }));
        } else {
          setError((prevState) => ({
            ...prevState,
            [name]: false,
          }));
        }

        break;
      default:
        break;
    }
  };

  // if (fields.password !== fields.confirmPassword) {
  //   alert('passwords dont match');
  // }

  //   useEffect(() => {
  //     localStorage.setItem('userDetails', JSON.stringify(fields));
  //   }, [fields]);

  const handleSubmit = () => {
    let userData: any = JSON.parse(localStorage.getItem('userDetails') || '[]');

    if (Array.isArray(userData)) {
      if (userData.some(({ email }) => email === fields.email)) {
        alert(`user with ${fields.email} already registered`);
      } else {
        userData.push(fields);
        localStorage.setItem('userDetails', JSON.stringify(userData));
        navigate('/login');
      }
    }
  };

  //   const handleDateChange = (value: number | null) => {
  //     setFields((prevState) => ({
  //       ...prevState,
  //       dob: (value as unknown as Date)?.getTime(),
  //     }));
  //   };

  const style = {
    padding: '8px',
    width: '20%',
  };

  //   console.log('fields*****', fields);
  //   console.log('userDetails***', userDetails);

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        mt: 5,
      }}
    >
      <TextField
        required
        sx={style}
        name="firstName"
        value={fields.firstName}
        label={labels['firstName']}
        onChange={handleChange}
      />
      {/* {fields.firstName && error.firstName && <span>enter your firstName</span>} */}
      <TextField
        required
        sx={style}
        name="lastName"
        value={fields.lastName}
        label={labels['lastName']}
        onChange={handleChange}
      />
      <TextField
        required
        autoComplete="off"
        sx={style}
        name="email"
        type="email"
        value={fields.email}
        label={labels.email}
        onChange={handleChange}
      />
      {fields.email && error.email && (
        <span color="error">enter a valid email id</span>
      )}
      <TextField
        required
        sx={style}
        autoComplete="off"
        name="password"
        type="password"
        value={fields.password}
        label={labels.password}
        onChange={handleChange}
      />
      {fields.password && error.password && (
        <span color="error">
          password must be 8 ,{fields.password.length}characters long
        </span>
      )}
      <TextField
        required
        sx={style}
        name="confirmPassword"
        value={fields.confirmPassword}
        label={labels.confirmPassword}
        onChange={handleChange}
      />
      {fields.confirmPassword && error.confirmPassword && (
        <p color="error">password and confirm password are not same</p>
      )}

      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            label={labels.dateOfBirth}
            format={'MM/dd/yyyy'}
            value={fields?.dob}
            onChange={(value) => handleDateChange(value as unknown as number)}
          />
        </DemoContainer>
      </LocalizationProvider> */}
      <FormControlLabel
        control={
          <Checkbox
            required
            name="termsAndConditions"
            checked={fields.termsAndConditions}
            onChange={handleChange}
          />
        }
        label={labels.termsAndConditions}
      />

      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ width: '200px', alignItem: 'center' }}
        disabled={!Object.values(error).every((value) => !value)}
      >
        Register
      </Button>
    </Box>
  );
};

export default RegistrationForm;
