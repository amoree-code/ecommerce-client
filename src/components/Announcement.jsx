import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;

const Container = styled.div`
  background: linear-gradient(
    90deg,
    var(--secondary-color),
    var(--accent-color)
  );
  color: white;
  padding: 0.75rem;
  text-align: center;
  position: relative;
  z-index: 1000;
  animation: ${slideIn} 0.5s ease-out;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
`;

const Highlight = styled.span`
  font-weight: 700;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  opacity: 0.8;
  transition: var(--transition);

  &:hover {
    opacity: 1;
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 2px;
    height: 12px;
    background-color: currentColor;
    top: 50%;
    left: 50%;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

const announcements = [
  "Free Shipping on Orders Over $50! 🚚",
  "Summer Sale - Up to 50% Off! ☀️",
  "New Arrivals Just Dropped! 🎉",
];

export default function Announcement() {
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Container>
      <Content>
        <Highlight>LIMITED TIME</Highlight>
        {announcements[currentAnnouncement]}
      </Content>
    </Container>
  );
}
