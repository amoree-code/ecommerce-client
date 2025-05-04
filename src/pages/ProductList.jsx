import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const Breadcrumb = styled.div`
  color: var(--text-secondary);
  font-size: 0.9rem;

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      color: var(--secondary-color);
    }
  }
`;

const FiltersWrapper = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  margin-bottom: 2rem;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  ${mobile({
    flexDirection: "column",
    alignItems: "stretch",
  })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  ${mobile({
    flexDirection: "column",
    alignItems: "stretch",
  })}
`;

const FilterText = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-primary);
  white-space: nowrap;
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 1.5px solid #e2e8f0;
  border-radius: var(--border-radius);
  background: white;
  min-width: 150px;
  font-size: 0.9rem;
  color: var(--text-primary);
  cursor: pointer;
  transition: var(--transition);

  &:focus {
    outline: none;
    border-color: var(--secondary-color);
    box-shadow: 0 0 0 3px rgba(9, 132, 227, 0.1);
  }

  ${mobile({ width: "100%" })}
`;

const Option = styled.option``;

const ActiveFilters = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
`;

const FilterTag = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--background-light);
  border-radius: 20px;
  font-size: 0.9rem;
  color: var(--text-secondary);

  button {
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    padding: 0;
    font-size: 1.2rem;
    line-height: 1;
    display: flex;
    align-items: center;

    &:hover {
      color: var(--primary-color);
    }
  }
`;

const NoResults = styled(motion.div)`
  text-align: center;
  padding: 3rem;
  color: var(--text-secondary);
`;

export default function ProductList() {
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    if (value === "all") {
      const newFilters = { ...filters };
      delete newFilters[e.target.name];
      setFilters(newFilters);
    } else {
      setFilters({
        ...filters,
        [e.target.name]: value,
      });
    }
  };

  const removeFilter = (filterName) => {
    const newFilters = { ...filters };
    delete newFilters[filterName];
    setFilters(newFilters);
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Main>
        <Header>
          <Title>
            {category
              ? category.charAt(0).toUpperCase() + category.slice(1)
              : "All Products"}
          </Title>
          <Breadcrumb>
            <a href="/">Home</a> / {category || "Products"}
          </Breadcrumb>
        </Header>

        <FiltersWrapper>
          <FilterContainer>
            <Filter>
              <FilterText>Filter Products:</FilterText>
              <Select
                name="color"
                onChange={handleFilters}
                value={filters.color || "all"}
              >
                <Option value="all">All Colors</Option>
                <Option value="white">White</Option>
                <Option value="black">Black</Option>
                <Option value="red">Red</Option>
                <Option value="blue">Blue</Option>
                <Option value="yellow">Yellow</Option>
                <Option value="gray">Gray</Option>
              </Select>
              <Select
                name="size"
                onChange={handleFilters}
                value={filters.size || "all"}
              >
                <Option value="all">All Sizes</Option>
                <Option value="XS">XS</Option>
                <Option value="S">S</Option>
                <Option value="M">M</Option>
                <Option value="L">L</Option>
                <Option value="XL">XL</Option>
              </Select>
            </Filter>
            <Filter>
              <FilterText>Sort By:</FilterText>
              <Select onChange={(e) => setSort(e.target.value)} value={sort}>
                <Option value="newest">Newest</Option>
                <Option value="asc">Price (Low to High)</Option>
                <Option value="desc">Price (High to Low)</Option>
              </Select>
            </Filter>
          </FilterContainer>

          <AnimatePresence>
            {Object.keys(filters).length > 0 && (
              <ActiveFilters
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {Object.entries(filters).map(([key, value]) => (
                  <FilterTag
                    key={key}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    {key}: {value}
                    <button onClick={() => removeFilter(key)}>&times;</button>
                  </FilterTag>
                ))}
              </ActiveFilters>
            )}
          </AnimatePresence>
        </FiltersWrapper>

        <Products cat={category} filters={filters} sort={sort} />
      </Main>
      <Newsletter />
      <Footer />
    </Container>
  );
}
