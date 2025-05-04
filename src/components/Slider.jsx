import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { silderItems } from "../data";
import { mobile } from "../responsive";
import { motion, AnimatePresence } from "framer-motion";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 90vh;
  overflow: hidden;
  background-color: var(--background-light);
  ${mobile({ display: "none" })}
  touch-action: pan-y pinch-zoom;
`;

const Arrow = styled(motion.button)`
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.direction === "left" ? "left: 20px" : "right: 20px")};
  cursor: pointer;
  z-index: 2;
  transition: var(--transition);
  box-shadow: var(--shadow-md);

  &:hover {
    background-color: white;
    transform: translateY(-50%) scale(1.1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--secondary-color);
  }

  svg {
    color: var(--primary-color);
    font-size: 1.5rem;
  }
`;

const Slide = styled(motion.div)`
  width: 100vw;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
  padding: 0 2rem;
`;

const ImgContainer = styled(motion.div)`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled(motion.img)`
  height: 80%;
  max-width: 100%;
  object-fit: contain;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1));
`;

const InfoContainer = styled(motion.div)`
  flex: 1;
  padding: 3rem;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  line-height: 1.2;
`;

const Desc = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  max-width: 80%;
`;

const Button = styled(motion.button)`
  padding: 1rem 2.5rem;
  font-size: 1rem;
  font-weight: 600;
  background-color: var(--secondary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);

  &:hover {
    background-color: var(--primary-color);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(9, 132, 227, 0.3);
  }
`;

const Dots = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 2;
`;

const Dot = styled(motion.button)`
  width: 10px;
  height: 10px;
  border: none;
  border-radius: 50%;
  background-color: ${(props) =>
    props.active ? "var(--secondary-color)" : "rgba(255,255,255,0.5)"};
  cursor: pointer;
  transition: var(--transition);
  padding: 0;

  &:hover {
    transform: scale(1.2);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--secondary-color);
  }
`;

const slideVariants = {
  enter: () => ({
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    opacity: 1,
  },
  exit: () => ({
    zIndex: 0,
    opacity: 0,
  }),
};

export default function Slider() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [autoplay, setAutoplay] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const slideIndex = page % silderItems.length;

  const paginate = useCallback(
    (newDirection) => {
      setAutoplay(false);
      setPage([page + newDirection, newDirection]);
    },
    [page]
  );

  // Handle touch events
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      paginate(1);
    }
    if (isRightSwipe) {
      paginate(-1);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        setPage((prev) => [prev[0] + 1, 1]);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoplay]);

  return (
    <Container
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Arrow
        as={motion.button}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        direction="left"
        onClick={() => paginate(-1)}
        aria-label="Previous slide"
      >
        <IoIosArrowBack />
      </Arrow>

      <AnimatePresence initial={false} custom={direction}>
        <Slide
          key={page}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          bg={silderItems[slideIndex].bg}
        >
          <ImgContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Image
              src={silderItems[slideIndex].img}
              alt={silderItems[slideIndex].title}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </ImgContainer>
          <InfoContainer>
            <Title
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {silderItems[slideIndex].title}
            </Title>
            <Desc
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              {silderItems[slideIndex].desc}
            </Desc>
            <Button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              SHOP NOW
            </Button>
          </InfoContainer>
        </Slide>
      </AnimatePresence>

      <Arrow
        as={motion.button}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        direction="right"
        onClick={() => paginate(1)}
        aria-label="Next slide"
      >
        <IoIosArrowForward />
      </Arrow>

      <Dots>
        {silderItems.map((_, index) => (
          <Dot
            key={index}
            active={slideIndex === index}
            onClick={() => {
              setPage([index, index > slideIndex ? 1 : -1]);
              setAutoplay(false);
            }}
            aria-label={`Go to slide ${index + 1}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </Dots>
    </Container>
  );
}
