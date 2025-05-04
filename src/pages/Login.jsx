import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.6)
    ),
    url(${require("../assets/background2.jpg")}) center;
  background-size: cover;
`;

const FormWrapper = styled(motion.div)`
  width: 100%;
  max-width: 440px;
  padding: 2.5rem;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-lg);
  ${mobile({ width: "85%", padding: "2rem" })}
`;

const Title = styled.h1`
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  text-align: center;
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  text-align: center;
  margin-bottom: 2rem;
  font-size: 0.95rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
`;

const Input = styled.input`
  padding: 1rem;
  border: 1.5px solid #e2e8f0;
  border-radius: var(--border-radius);
  font-size: 1rem;
  transition: var(--transition);

  &:focus {
    outline: none;
    border-color: var(--secondary-color);
    box-shadow: 0 0 0 3px rgba(9, 132, 227, 0.1);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: var(--secondary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  margin-top: 1rem;

  &:hover {
    background-color: var(--primary-color);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: #cbd5e0;
    cursor: not-allowed;
    transform: none;
  }
`;

const ForgotPassword = styled(Link)`
  color: var(--secondary-color);
  text-decoration: none;
  font-size: 0.9rem;
  text-align: right;
  margin-top: -0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const Error = styled(motion.div)`
  color: #e53e3e;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #fff5f5;
  border-radius: var(--border-radius);
`;

const RegisterLink = styled(Link)`
  display: block;
  text-align: center;
  color: var(--text-secondary);
  text-decoration: none;
  margin-top: 1.5rem;
  font-size: 0.9rem;

  span {
    color: var(--secondary-color);
    font-weight: 600;
    margin-left: 0.25rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SocialLogin = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
  text-align: center;
`;

const SocialButton = styled.button`
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
  border: 1.5px solid #e2e8f0;
  border-radius: var(--border-radius);
  background: white;
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background-color: #f8fafc;
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
  }
`;

export default function Login() {
  const dispatch = useDispatch();
  const { isFetching, error: loginError } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) return;

    await login(dispatch, formData);
  };

  return (
    <Container>
      <FormWrapper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Title>Welcome Back</Title>
        <Subtitle>Sign in to your account to continue</Subtitle>

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </InputGroup>

          {/* <ForgotPassword to="/forgot-password">
            Forgot your password?
          </ForgotPassword> */}

          {loginError && (
            <Error
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Invalid username or password
            </Error>
          )}

          <Button type="submit" disabled={isFetching}>
            {isFetching ? "Signing in..." : "Sign In"}
          </Button>
        </Form>

        <RegisterLink to="/register">
          Don't have an account?<span>Sign Up</span>
        </RegisterLink>

        {/* <SocialLogin>
          <p style={{ color: "var(--text-secondary)", marginBottom: "1rem" }}>
            Or continue with
          </p>
          <SocialButton type="button">
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              width="20"
              height="20"
            />
            Sign in with Google
          </SocialButton>
        </SocialLogin> */}
      </FormWrapper>
    </Container>
  );
}
