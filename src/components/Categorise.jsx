import styled from "styled-components";
import CategoryItem from "./CategoryItem";
import { categories } from "../data";
import { mobile } from "../responsive";

const Container = styled.section`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 2rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 2rem;

  ${mobile({ fontSize: "2rem", marginBottom: "1.5rem" })}
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem 0;

  ${mobile({
    gridTemplateColumns: "1fr",
    gap: "1rem",
    padding: "0.5rem",
  })}
`;

export default function Categories() {
  return (
    <Container>
      <Title>Shop by Category</Title>
      <Grid>
        {categories.map((item) => (
          <CategoryItem it={item} key={item.id} />
        ))}
      </Grid>
    </Container>
  );
}
