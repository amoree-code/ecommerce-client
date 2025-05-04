import styled from "styled-components";
import { RiShoppingCart2Line, RiHeartLine, RiSearchLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  min-width: 280px;
  max-width: 350px;
  margin: 1rem;
  background: white;
  border-radius: var(--border-radius);
  overflow: hidden;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-4px);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 125%; /* 4:5 Aspect ratio */
  background-color: var(--background-light);
  overflow: hidden;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);

  ${Container}:hover & {
    transform: scale(1.05);
  }
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  opacity: 0;
  transition: var(--transition);

  ${Container}:hover & {
    opacity: 1;
  }
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);

  &:hover {
    background: var(--secondary-color);
    color: white;
    transform: scale(1.1);
  }
`;

const Details = styled.div`
  padding: 1rem;
`;

const Title = styled.h3`
  font-size: 1rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`;

const Price = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--accent-color);
`;

export default function Product({ it }) {
  return (
    <Container>
      <ImageContainer>
        <Image src={it.img} alt={it.title} />
        <Info>
          <Icon>
            <RiShoppingCart2Line size={20} />
          </Icon>
          <Icon>
            <Link to={`/product/${it._id}`} style={{ color: "inherit" }}>
              <RiSearchLine size={20} />
            </Link>
          </Icon>
          <Icon>
            <RiHeartLine size={20} />
          </Icon>
        </Info>
      </ImageContainer>
      <Details>
        <Title>{it.title}</Title>
        <Price>${it.price}</Price>
      </Details>
    </Container>
  );
}
