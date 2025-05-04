import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";

const Container = styled.div`
  background: linear-gradient(
    135deg,
    var(--primary-color),
    var(--secondary-color)
  );
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  ${mobile({ fontSize: "2rem" })}
`;

const Desc = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 600px;
  margin-bottom: 2rem;
  opacity: 0.9;
  ${mobile({ fontSize: "1rem" })}
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 500px;
`;

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 0.5rem;
  ${mobile({ flexDirection: "column" })}
`;

const Input = styled.input`
  flex: 1;
  padding: 1rem 1.5rem;
  border: 2px solid transparent;
  border-radius: var(--border-radius);
  font-size: 1rem;
  outline: none;
  transition: var(--transition);

  &:focus {
    border-color: var(--accent-color);
  }

  &::placeholder {
    color: var(--text-secondary);
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  &:active {
    transform: translateY(0);
  }

  ${mobile({ width: "100%" })}
`;

const Message = styled.p`
  font-size: 0.9rem;
  color: ${(props) => (props.error ? "#FF6B6B" : "#51CF66")};
  margin-top: 0.5rem;
`;

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Please enter your email");
      setError(true);
      return;
    }
    if (!email.includes("@")) {
      setMessage("Please enter a valid email");
      setError(true);
      return;
    }

    // Here you would typically handle the newsletter subscription
    setMessage("Thank you for subscribing!");
    setError(false);
    setEmail("");
  };

  return (
    <Container>
      <Title>Join Our Newsletter</Title>
      <Desc>
        Subscribe to our newsletter and get 10% off your first purchase plus
        exclusive access to new arrivals and special offers.
      </Desc>
      <FormContainer onSubmit={handleSubmit}>
        <InputContainer>
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit">
            Subscribe
            <IoMdSend />
          </Button>
        </InputContainer>
        {message && <Message error={error}>{message}</Message>}
      </FormContainer>
    </Container>
  );
}
