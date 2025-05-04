import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import { IoAdd, IoRemoveOutline, IoClose } from "react-icons/io5";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeProduct } from "../redux/cartRedux";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

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

const Title = styled.h1`
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 2rem;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  ${mobile({ flexDirection: "column", gap: "1rem" })}
`;

const Button = styled.button`
  padding: 1rem 2rem;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) =>
    props.outlined ? "2px solid var(--primary-color)" : "none"};
  background-color: ${(props) =>
    props.outlined ? "transparent" : "var(--primary-color)"};
  color: ${(props) => (props.outlined ? "var(--primary-color)" : "white")};
  border-radius: var(--border-radius);
  transition: var(--transition);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    background-color: ${(props) =>
      props.outlined ? "var(--primary-color)" : "var(--secondary-color)"};
    color: white;
  }
`;

const CartContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-top: 2rem;

  ${mobile({
    gridTemplateColumns: "1fr",
    gap: "1rem",
  })}
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CartItem = styled(motion.div)`
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1.5rem;
  padding: 1.5rem;
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);

  ${mobile({
    gridTemplateColumns: "1fr",
    textAlign: "center",
    gap: "1rem",
    padding: "2rem 1rem",
  })}
`;

const ProductImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: var(--border-radius);
  transition: var(--transition);

  &:hover {
    transform: scale(1.05);
  }

  ${mobile({
    width: "120px",
    height: "120px",
    margin: "0 auto",
  })}
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ProductName = styled.h3`
  font-size: 1.2rem;
  color: var(--primary-color);
`;

const ProductInfo = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const ProductControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;

  ${mobile({
    flexDirection: "column",
    alignItems: "center",
    gap: "0.75rem",
  })}
`;

const QuantityControl = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  border: 1px solid #eee;
  border-radius: var(--border-radius);
  background: white;

  ${mobile({
    margin: "0 auto",
  })}
`;

const QuantityButton = styled.button`
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);

  &:hover {
    color: var(--secondary-color);
  }
`;

const Quantity = styled.span`
  min-width: 30px;
  text-align: center;
  font-weight: 600;
`;

const Price = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--accent-color);
`;

const Summary = styled.div`
  padding: 2rem;
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  height: fit-content;
`;

const SummaryTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  font-weight: ${(props) => (props.total ? "600" : "400")};
  font-size: ${(props) => (props.total ? "1.2rem" : "1rem")};
  padding: ${(props) => (props.total ? "1rem 0 0" : "0")};
  border-top: ${(props) => (props.total ? "1px solid #eee" : "none")};
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-secondary);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: -4px;
  right: -5px;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #e53e3e;
    transform: scale(1.1);
  }

  ${mobile({
    top: "0.5rem",
    right: "0.5rem",
  })}
`;

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleQuantity = (id, type) => {
    dispatch(updateQuantity({ id, type }));
  };

  const handleRemove = (id) => {
    dispatch(removeProduct(id));
  };

  if (cart.products.length === 0) {
    return (
      <Container>
        <Navbar />
        <Announcement />
        <Main>
          <EmptyCart>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
          </EmptyCart>
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
        <Title>Your Shopping Cart</Title>
        <Top>
          <StyledLink to="/">
            <Button outlined>Continue Shopping</Button>
          </StyledLink>
          <Button>Checkout Now</Button>
        </Top>

        <CartContent>
          <CartItems>
            <AnimatePresence mode="popLayout">
              {cart.products.map((product) => (
                <CartItem
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  layout
                >
                  <RemoveButton onClick={() => handleRemove(product._id)}>
                    <IoClose size={24} />
                  </RemoveButton>
                  <ProductImage src={product.img} alt={product.title} />
                  <ProductDetails>
                    <ProductName>{product.title}</ProductName>
                    <ProductInfo>Color: {product.color}</ProductInfo>
                    <ProductInfo>Size: {product.size}</ProductInfo>
                  </ProductDetails>
                  <ProductControls>
                    <QuantityControl>
                      <QuantityButton
                        onClick={() => handleQuantity(product._id, "dec")}
                        disabled={product.quantity <= 1}
                      >
                        <IoRemoveOutline size={20} />
                      </QuantityButton>
                      <Quantity>{product.quantity}</Quantity>
                      <QuantityButton
                        onClick={() => handleQuantity(product._id, "inc")}
                      >
                        <IoAdd size={20} />
                      </QuantityButton>
                    </QuantityControl>
                    <Price>
                      ${(product.price * product.quantity).toFixed(2)}
                    </Price>
                  </ProductControls>
                </CartItem>
              ))}
            </AnimatePresence>
          </CartItems>

          <Summary>
            <SummaryTitle>Order Summary</SummaryTitle>
            <SummaryItem>
              <span>Subtotal</span>
              <span>${cart.total.toFixed(2)}</span>
            </SummaryItem>
            <SummaryItem>
              <span>Estimated Shipping</span>
              <span>$5.90</span>
            </SummaryItem>
            <SummaryItem>
              <span>Shipping Discount</span>
              <span>-$5.90</span>
            </SummaryItem>
            <SummaryItem total>
              <span>Total</span>
              <span>${cart.total.toFixed(2)}</span>
            </SummaryItem>
            <Button style={{ width: "100%", marginTop: "2rem" }}>
              Checkout Now
            </Button>
          </Summary>
        </CartContent>
      </Main>
      <Footer />
    </Container>
  );
}
