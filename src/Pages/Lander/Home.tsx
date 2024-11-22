// HomePage.tsx
import React, { useState } from "react";
import styled from "styled-components";
import image from "../../assests/healthy.jpg";
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  color: #343a40;
  font-family: 'Poppins', sans-serif;
`;

const HeaderBar = styled.header`
  width: 100%;
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #4a5cfb;
  color: #ffffff;
  position: sticky;
  top: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  margin: 0;
  z-index: 1000;
`;

const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 1px;
`;

const LoginButton = styled.button`
  background: #4a5cfb;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #3b4bd0;
    transform: translateY(-2px);
  }
`;

const HeroSection = styled.div`
  text-align: center;
  padding: 60px 20px;
  max-width: 900px;
`;

const AnimatedHeader = motion(styled.h2`
  font-size: 2.8rem;
  font-weight: 700;
  margin-top: 32px;
  text-align: center;
  color: #2d3748;
  line-height: 1.2;
`);

const AnimatedImage = motion.img;
const AnimatedButton = styled(motion.button)`
  background: linear-gradient(135deg, #4a5cfb, #d5b094);
  color: white;
  padding: 14px 28px;
  font-size: 1.2rem;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  margin-top: 16px;
  box-shadow: 0 4px 12px rgba(255, 126, 95, 0.3);
  transition: all 0.4s ease-in-out;

  &:hover {
    background: linear-gradient(135deg, #d5b094, #4a5cfb);
    box-shadow: 0 6px 18px rgba(255, 126, 95, 0.5);
    transform: translateY(-3px);
  }
`;

const Content = styled.p`
  font-size: 1.25rem;
  text-align: center;
  max-width: 700px;
  margin: 24px 0;
  color: #4a5568;
  line-height: 1.6;
`;

const Divider = styled.div`
  height: 2px;
  width: 80%;
  background: #e2e8f0;
  margin: 40px 0;
`;

const Home: React.FC = () => {
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  const handleLearnMoreClick = () => {
    setShowContent(!showContent);
  };

  const handleClickLogin = () => {
    navigate("/auth");
  };

  return (
    <Container>
      <HeaderBar>
        <HeaderTitle>My Awesome Website</HeaderTitle>
        <LoginButton onClick={handleClickLogin}>Login</LoginButton>
      </HeaderBar>
      <HeroSection>
        <AnimatedHeader
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to Our Amazing Platform
        </AnimatedHeader>
        <AnimatedImage
          src={image}
          alt="Example Image"
          style={{
            width: '100%',
            maxWidth: '600px',
            margin: '24px auto',
            borderRadius: '16px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
          }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        <Content>
          Experience an intuitive and seamless journey through our platform. Learn how we can make a difference in your everyday life.
        </Content>
        <AnimatedButton
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          onClick={handleLearnMoreClick}
        >
          Learn More
        </AnimatedButton>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              marginTop: '24px',
              padding: '20px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              backgroundColor: '#f7fafc',
            }}
          >
            Here is more detailed information about what we offer and how it can help you achieve your goals.
          </motion.div>
        )}
      </HeroSection>
      <Divider />
    </Container>
  );
};

export default Home;