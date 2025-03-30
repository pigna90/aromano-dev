import { Link } from 'react-scroll';
import styled from 'styled-components';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 1rem;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Logo = styled.div`
  font-size: 1.3rem;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
  font-weight: bold;
  color: #2c3e50;
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
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
`;

const Navbar = () => {
  return (
    <Nav>
      <NavContent>
        <Logo>Alessandro Romano</Logo>
        <NavLinks>
          <li>
            <NavLink
              to="about"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              activeClass="active"
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