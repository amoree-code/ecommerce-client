import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { IoAdd, IoRemoveOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { puplicRequest } from "../requesMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
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

const Breadcrumb = styled.div`
  color: var(--text-secondary);
  margin-bottom: 2rem;
  font-size: 0.9rem;

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      color: var(--secondary-color);
    }
  }
`;

const ProductWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  padding: 2rem;

  ${mobile({
    gridTemplateColumns: "1fr",
    gap: "2rem",
    padding: "1rem",
  })}
`;

const ImgContainer = styled.div`
  position: relative;
  border-radius: var(--border-radius);
  overflow: hidden;
  aspect-ratio: 3/4;

  ${mobile({
    aspectRatio: "1",
    maxWidth: "400px",
    margin: "0 auto",
  })}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);

  &:hover {
    transform: scale(1.05);
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: var(--primary-color);
`;

const Desc = styled.p`
  line-height: 1.6;
  color: var(--text-secondary);
`;

const Price = styled.span`
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--accent-color);
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const FilterTitle = styled.span`
  font-size: 1rem;
  font-weight: 500;
  min-width: 80px;
`;

const FilterColor = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  cursor: pointer;
  transition: var(--transition);
  border: 2px solid
    ${(props) => (props.selected ? "var(--secondary-color)" : "transparent")};

  &:hover {
    transform: scale(1.1);
  }
`;

const FilterSize = styled.select`
  padding: 0.75rem 1rem;
  border: 1.5px solid #e2e8f0;
  border-radius: var(--border-radius);
  min-width: 120px;
  cursor: pointer;
  transition: var(--transition);

  &:focus {
    outline: none;
    border-color: var(--secondary-color);
    box-shadow: 0 0 0 3px rgba(9, 132, 227, 0.1);
  }
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;

  ${mobile({
    flexDirection: "column",
    alignItems: "stretch",
  })}
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  border: 1.5px solid #e2e8f0;
  border-radius: var(--border-radius);
`;

const QuantityButton = styled.button`
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);

  &:hover {
    color: var(--secondary-color);
  }

  &:disabled {
    color: #cbd5e0;
    cursor: not-allowed;
  }
`;

const Quantity = styled.span`
  min-width: 40px;
  text-align: center;
  font-weight: 600;
`;

const Button = styled(motion.button)`
  flex: 1;
  padding: 1rem 2rem;
  border: none;
  border-radius: var(--border-radius);
  background-color: var(--secondary-color);
  color: white;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: var(--transition);

  &:hover {
    background-color: var(--primary-color);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  &:disabled {
    background-color: #cbd5e0;
    cursor: not-allowed;
    transform: none;
  }
`;

const WishlistButton = styled(motion.button)`
  padding: 1rem;
  border: 1.5px solid #e2e8f0;
  border-radius: var(--border-radius);
  background: white;
  color: var(--text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);

  &:hover {
    color: var(--secondary-color);
    border-color: var(--secondary-color);
    transform: translateY(-2px);
  }
`;

const ErrorMessage = styled(motion.div)`
  color: #e53e3e;
  font-size: 0.9rem;
  padding: 0.75rem;
  background-color: #fff5f5;
  border-radius: var(--border-radius);
  margin-top: 1rem;
`;

export default function Product() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setLoading(true);
        setError(null);
        const res = await puplicRequest.get("/products/" + id);
        setProduct(res.data);
        // Set default color and size if available
        if (res.data.color?.length) setColor(res.data.color[0]);
        if (res.data.size?.length) setSize(res.data.size[0]);
      } catch (err) {
        setError("Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    if (!color || !size) {
      setError("Please select both color and size");
      return;
    }
    setAddingToCart(true);
    setError(null);

    // Simulate adding to cart with a slight delay for better UX
    setTimeout(() => {
      dispatch(addProduct({ ...product, quantity, color, size }));
      setAddingToCart(false);
    }, 500);
  };

  if (loading) {
    return (
      <Container>
        <Navbar />
        <Announcement />
        <Main
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Loading...
          </motion.div>
        </Main>
        <Footer />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container>
        <Navbar />
        <Announcement />
        <Main
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Product not found
          </motion.div>
        </Main>
        <Footer />
      </Container>
    );
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Main>
        <Breadcrumb>
          <a href="/">Home</a> / <a href="/products">Products</a> /{" "}
          {product.title}
        </Breadcrumb>

        <ProductWrapper>
          <ImgContainer>
            <Image src={product.img} alt={product.title} />
          </ImgContainer>

          <InfoContainer>
            <Title>{product.title}</Title>
            <Desc>{product.desc}</Desc>
            <Price>${product.price}</Price>

            <FilterContainer>
              <FilterGroup>
                <FilterTitle>Color</FilterTitle>
                {product.color?.map((c) => (
                  <FilterColor
                    color={c}
                    key={c}
                    onClick={() => setColor(c)}
                    selected={color === c}
                  />
                ))}
              </FilterGroup>

              <FilterGroup>
                <FilterTitle>Size</FilterTitle>
                <FilterSize
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                >
                  {product.size?.map((s) => (
                    <FilterSizeOption key={s}>{s}</FilterSizeOption>
                  ))}
                </FilterSize>
              </FilterGroup>
            </FilterContainer>

            <AddContainer>
              <QuantityContainer>
                <QuantityButton
                  onClick={() => handleQuantity("dec")}
                  disabled={quantity <= 1}
                >
                  <IoRemoveOutline size={20} />
                </QuantityButton>
                <Quantity>{quantity}</Quantity>
                <QuantityButton onClick={() => handleQuantity("inc")}>
                  <IoAdd size={20} />
                </QuantityButton>
              </QuantityContainer>

              <Button
                onClick={handleAddToCart}
                disabled={addingToCart}
                whileTap={{ scale: 0.95 }}
              >
                {addingToCart ? "Adding..." : "Add to Cart"}
              </Button>

              <WishlistButton whileTap={{ scale: 0.95 }}>
                <FaRegHeart size={20} />
              </WishlistButton>
            </AddContainer>

            <AnimatePresence>
              {error && (
                <ErrorMessage
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {error}
                </ErrorMessage>
              )}
            </AnimatePresence>
          </InfoContainer>
        </ProductWrapper>
      </Main>
      <Newsletter />
      <Footer />
    </Container>
  );
}
