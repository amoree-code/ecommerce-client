import styled from "styled-components";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterestP,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.footer`
  background-color: var(--background-light);
  padding: 4rem 2rem 2rem;
  color: var(--text-primary);
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr repeat(2, 1fr);
  gap: 3rem;

  ${mobile({
    gridTemplateColumns: "1fr",
    gap: "2rem",
  })}
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Logo = styled.h1`
  font-size: 2rem;
  color: var(--primary-color);
`;

const Desc = styled.p`
  line-height: 1.6;
  color: var(--text-secondary);
`;

const SocialContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.$bg};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
  }
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled(Link)`
  width: 50%;
  margin-bottom: 0.75rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: var(--transition);

  &:hover {
    color: var(--secondary-color);
    transform: translateX(4px);
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--text-secondary);

  svg {
    color: var(--secondary-color);
  }
`;

const Bottom = styled.div`
  max-width: 1200px;
  margin: 4rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.9rem;

  a {
    color: var(--secondary-color);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo>SHOP</Logo>
          <Desc>
            Experience the future of online shopping with our curated collection
            of fashion-forward styles. We bring you the latest trends,
            exceptional quality, and unmatched customer service.
          </Desc>
          <SocialContainer>
            <SocialIcon href="#" $bg="#3B5999">
              <FaFacebookF />
            </SocialIcon>
            <SocialIcon href="#" $bg="#E4405F">
              <FaInstagram />
            </SocialIcon>
            <SocialIcon href="#" $bg="#55ACEE">
              <FaTwitter />
            </SocialIcon>
            <SocialIcon href="#" $bg="#E60023">
              <FaPinterestP />
            </SocialIcon>
          </SocialContainer>
        </Left>

        <Center>
          <Title>Quick Links</Title>
          <List>
            <ListItem to="/">Home</ListItem>
            <ListItem to="/cart">Cart</ListItem>
            <ListItem to="/">Men's Fashion</ListItem>
            <ListItem to="/">Women's Fashion</ListItem>
            <ListItem to="/">Accessories</ListItem>
            <ListItem to="/">My Account</ListItem>
            <ListItem to="/">Order Tracking</ListItem>
            <ListItem to="/">Wishlist</ListItem>
          </List>
        </Center>

        <Right>
          <Title>Contact Info</Title>
          <ContactItem>
            <FaMapMarkerAlt />
            <span>622 Dixie Path, South Tobinchester 98336</span>
          </ContactItem>
          <ContactItem>
            <FaPhoneAlt />
            <span>+1 234 567 8900</span>
          </ContactItem>
          <ContactItem>
            <FaEnvelope />
            <span>amoreevw@gmail.com</span>
          </ContactItem>
        </Right>
      </Wrapper>

      <Bottom>
        <p>
          © {currentYear} SHOP. All rights reserved. |{" "}
          <a href="/">Privacy Policy</a> | <a href="/">Terms of Service</a>
        </p>
      </Bottom>
    </Container>
  );
}
