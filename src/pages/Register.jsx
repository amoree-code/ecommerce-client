import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { register } from "../redux/apiCalls";
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
    url(${require("../assets/background.jpg")}) center;
  background-size: cover;
`;

const FormWrapper = styled(motion.div)`
  width: 100%;
  max-width: 480px;
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

const Agreement = styled.div`
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 1rem 0;
  text-align: center;

  a {
    color: var(--secondary-color);
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
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

const Error = styled(motion.div)`
  color: #e53e3e;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #fff5f5;
  border-radius: var(--border-radius);
`;

const LoginLink = styled(Link)`
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

export default function Register() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const validateForm = () => {
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields");
      return false;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await register(dispatch, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (!response.success) {
        setError(response.error || "Registration failed. Please try again.");
      }
      // window.location.replace("/login");
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <FormWrapper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Title>Create Account</Title>
        <Subtitle>
          Join us and discover the best products at the best prices
        </Subtitle>

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
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </InputGroup>

          <Agreement>
            By creating an account, you agree to our{" "}
            <Link to="/terms">Terms of Service</Link> and{" "}
            <Link to="/privacy">Privacy Policy</Link>
          </Agreement>

          {error && (
            <Error
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </Error>
          )}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </Button>
        </Form>

        {/* <LoginLink to="/login">
          Already have an account?<span>Sign In</span>
        </LoginLink> */}
      </FormWrapper>
    </Container>
  );
}
