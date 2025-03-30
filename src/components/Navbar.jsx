import { Link } from 'react-scroll';
import styled from 'styled-components';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 0.8rem 1rem;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.3rem;
  white-space: nowrap;
  font-weight: bold;
  color: #2c3e50;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;

  @media (max-width: 768px) {
    display: ${props => props.$isOpen ? 'flex' : 'none'};
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.98);
    flex-direction: column;
    padding: 1rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    gap: 1rem;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #3498db;
  }

  &.active {
    color: #3498db;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.5rem;
    display: block;
    width: 100%;
    text-align: center;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #2c3e50;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #3498db;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <Nav>
      <NavContent>
        <Logo>Alessandro Romano</Logo>
        <MenuButton onClick={toggleMenu}>
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </MenuButton>
        <NavLinks $isOpen={isOpen}>
          <li>
            <NavLink
              to="about"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              activeClass="active"
              onClick={closeMenu}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="education"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              activeClass="active"
              onClick={closeMenu}
            >
              Education
            </NavLink>
          </li>
          <li>
            <NavLink
              to="experience"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              activeClass="active"
              onClick={closeMenu}
            >
              Experience
            </NavLink>
          </li>
          <li>
            <NavLink
              to="conferences"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              activeClass="active"
              onClick={closeMenu}
            >
              Conferences
            </NavLink>
          </li>
          <li>
            <NavLink
              to="hobbies"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              activeClass="active"
              onClick={closeMenu}
            >
              Hobbies
            </NavLink>
          </li>
        </NavLinks>
      </NavContent>
    </Nav>
  );
};

export default Navbar; 