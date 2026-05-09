import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React from "react";
import { loginUser } from "../../services/auth";

export const LoginUser = () => {
  const outlinedPasswordId = React.useId();
  const [showPassword, setShowPassword] = React.useState(false);
  const [emailError, setEmailError] = React.useState<string | null>(null);
  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  });

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const checkEmailValidity = (email: string) => {
    if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError(null);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    checkEmailValidity(loginData.email);
    if (!emailError) {
      console.log("Form submitted with:", loginData);
      try {
        await loginUser(loginData.email, loginData.password);
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <Paper elevation={2}>
      <h1>Login</h1>
      <Box>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <TextField
            id="outlined-email-input"
            type="email"
            label="Email"
            name="email"
            error={!!emailError}
            helperText={emailError}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor={`${outlinedPasswordId}-input`}>
            Password
          </InputLabel>
          <OutlinedInput
            onChange={handleChange}
            name="password"
            id={`${outlinedPasswordId}-input`}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <Button variant="contained" onClick={handleSubmit}>
            Login
          </Button>
        </FormControl>
      </Box>
    </Paper>
  );
};
