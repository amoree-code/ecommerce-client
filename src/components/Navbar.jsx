import styled from "styled-components";
import { RiShoppingCart2Line, RiSearchLine } from "react-icons/ri";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Container = styled.div`
  background: white;
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 1000;
  height: 60px;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "1rem" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border: 1px solid #eee;
  border-radius: var(--border-radius);
  transition: var(--transition);

  &:focus-within {
    border-color: var(--secondary-color);
    box-shadow: var(--shadow-sm);
  }

  ${mobile({ display: "none" })}
`;

const Input = styled.input`
  border: none;
  outline: none;
  font-size: 0.9rem;
  width: 200px;

  &::placeholder {
    color: var(--text-secondary);
  }
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary-color);
  text-decoration: none;
  transition: var(--transition);

  &:hover {
    color: var(--secondary-color);
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1.5rem;
`;

const MenuItem = styled(Link)`
  font-size: 0.9rem;
  color: var(--text-primary);
  text-decoration: none;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: var(--secondary-color);
  }
`;

const CartContainer = styled(Link)`
  position: relative;
  color: var(--text-primary);
  text-decoration: none;
  transition: var(--transition);

  &:hover {
    color: var(--secondary-color);
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: var(--accent-color);
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
`;

export default function Navbar() {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);

  const handleLogout = () => {
    if (user) {
      localStorage.removeItem("user");
      window.location.reload();
    }
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo to="/">SHOP</Logo>
          <SearchContainer>
            <Input placeholder="Search products..." />
            <RiSearchLine style={{ color: "var(--text-secondary)" }} />
          </SearchContainer>
        </Left>

        <Right>
          {user ? (
            <MenuItem
              as="button"
              onClick={handleLogout}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              LOGOUT
            </MenuItem>
          ) : (
            <>
              <MenuItem to="/register">REGISTER</MenuItem>
              <MenuItem to="/login">SIGN IN</MenuItem>
            </>
          )}

          <CartContainer to="/cart">
            <RiShoppingCart2Line size={20} />
            {quantity > 0 && <CartBadge>{quantity}</CartBadge>}
          </CartContainer>
        </Right>
      </Wrapper>
    </Container>
  );
}
