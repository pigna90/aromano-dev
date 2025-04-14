import { Link } from 'react-scroll';
import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faChevronDown, faBlog, faHeart, faEnvelope } from '@fortawesome/free-solid-svg-icons';

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

  .desktop-only {
    @media (max-width: 768px) {
      display: none;
    }
  }

  .mobile-only {
    display: none;
    @media (max-width: 768px) {
      display: block;
    }
  }

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
  background: transparent;
  border: none;
  color: #2c3e50;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.3s ease;
  outline: none;

  &:hover {
    color: #3498db;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const DropdownMenu = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  color: #2c3e50;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    color: #3498db;
  }

  .icon {
    transition: transform 0.3s ease;
    transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const DropdownContent = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  min-width: 200px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 0.5rem;
  opacity: ${props => props.$isOpen ? '1' : '0'};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all 0.3s ease;
  z-index: 1000;

  @media (max-width: 768px) {
    position: static;
    box-shadow: none;
    padding: 0;
    margin-top: 0.5rem;
    background: transparent;
  }
`;

const DropdownLink = styled(NavLink)`
  display: block;
  padding: 0.75rem 1rem;
  color: #2c3e50;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(52, 152, 219, 0.1);
    color: #3498db;
  }

  &.active {
    background: rgba(52, 152, 219, 0.1);
    color: #3498db;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`;

const IconLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.$isActive ? 'rgba(52, 152, 219, 0.1)' : 'transparent'};
  transition: all 0.3s ease;

  &:hover {
    background: rgba(52, 152, 219, 0.1);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    padding: 0.5rem;
    border-radius: 8px;
    justify-content: flex-start;
    gap: 0.5rem;
  }
`;

const IconText = styled.span`
  display: none;
  @media (max-width: 768px) {
    display: inline;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
              to="blog"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              activeClass="active"
              onClick={closeMenu}
            >
              Blog
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
          <li className="desktop-only" ref={dropdownRef}>
            <DropdownMenu>
              <DropdownButton 
                onClick={toggleDropdown}
                $isOpen={isDropdownOpen}
              >
                More
                <FontAwesomeIcon icon={faChevronDown} className="icon" />
              </DropdownButton>
              <DropdownContent $isOpen={isDropdownOpen}>
                <DropdownLink
                  to="education"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  activeClass="active"
                  onClick={closeMenu}
                >
                  Education
                </DropdownLink>
                <DropdownLink
                  to="hobbies"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  activeClass="active"
                  onClick={closeMenu}
                >
                  Hobbies
                </DropdownLink>
                <DropdownLink
                  to="contact"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  activeClass="active"
                  onClick={closeMenu}
                >
                  Contact
                </DropdownLink>
              </DropdownContent>
            </DropdownMenu>
          </li>
          <li className="mobile-only">
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
          <li className="mobile-only">
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
          <li className="mobile-only">
            <NavLink
              to="contact"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              activeClass="active"
              onClick={closeMenu}
            >
              Contact
            </NavLink>
          </li>
        </NavLinks>
      </NavContent>
    </Nav>
  );
};

export default Navbar; 