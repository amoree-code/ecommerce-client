import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  position: relative;
  flex: 1;
  height: 70vh;
  min-width: 300px;
  margin: 0.5rem;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);

  &:hover {
    box-shadow: var(--shadow-lg);
  }

  ${mobile({ height: "30vh", minWidth: "100%" })}
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;

  ${Container}:hover & {
    transform: scale(1.1);
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.5)
  );
`;

const Info = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2rem;
  color: white;
  z-index: 2;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background-color: white;
  color: var(--primary-color);
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  transform-origin: center;

  &:hover {
    background-color: var(--secondary-color);
    color: white;
    transform: scale(1.05);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
`;

export default function CategoryItem({ it }) {
  return (
    <Container
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <StyledLink to={`/products/${it.cat}`}>
        <ImageContainer>
          <Image src={it.img} alt={it.title} />
          <Overlay />
          <Info>
            <Title>{it.title}</Title>
            <Button>SHOP NOW</Button>
          </Info>
        </ImageContainer>
      </StyledLink>
    </Container>
  );
}
