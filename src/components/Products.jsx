import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import { mobile } from "../responsive";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const Section = styled.section`
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

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1rem 0;

  ${mobile({
    gap: "1rem",
    padding: "0.5rem",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  })}
`;

const LoadingOverlay = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: var(--text-secondary);
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid var(--background-light);
  border-top: 3px solid var(--secondary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled(motion.div)`
  text-align: center;
  color: #e74c3c;
  padding: 2rem;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--border-radius);
  background: ${(props) => (props.active ? "var(--secondary-color)" : "white")};
  color: ${(props) => (props.active ? "white" : "var(--text-primary)")};
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

export default function Products({ cat, filters, sort }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(
          "https://ecommerce-server-production-e4ae.up.railway.app/api/products"
        );
        setProducts(res.data);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    if (cat && products.length) {
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key]?.includes(value)
          )
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [cat, filters, products]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  if (error) {
    return (
      <ErrorMessage
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {error}
      </ErrorMessage>
    );
  }

  return (
    <Section>
      <Title>
        {cat
          ? `${cat.charAt(0).toUpperCase() + cat.slice(1)} Collection`
          : "Featured Products"}
      </Title>

      {loading ? (
        <LoadingOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <LoadingSpinner />
        </LoadingOverlay>
      ) : (
        <AnimatePresence>
          <GridContainer>
            {(cat ? filteredProducts : products.slice(0, 8)).map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Product it={item} />
              </motion.div>
            ))}
          </GridContainer>
        </AnimatePresence>
      )}
    </Section>
  );
}
