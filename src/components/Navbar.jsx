import { Link } from 'react-scroll';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faTimes,
  faChevronDown,
  faMoon,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { buttonReset } from '../styles/SharedStyles';
import { useColorScheme } from '../styles/colorScheme';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  height: var(--nav-height);
  display: flex;
  align-items: center;
  background: ${({ theme }) =>
    theme.name === 'dark' ? 'rgba(15, 18, 22, 0.72)' : 'rgba(253, 252, 250, 0.72)'};
  backdrop-filter: saturate(180%) blur(14px);
  -webkit-backdrop-filter: saturate(180%) blur(14px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.hairline};
  z-index: 1000;
  padding: 0 ${({ theme }) => theme.layout.gutter};

  @media (max-width: 768px) {
    padding: 0 ${({ theme }) => theme.layout.gutterMobile};
  }
`;

const NavContent = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const Logo = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.375rem;
  letter-spacing: -0.02em;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.ink};
  text-decoration: none;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 1.1875rem;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  gap: 0.25rem;

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
    display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
    position: fixed;
    top: var(--nav-height);
    left: 0;
    right: 0;
    background: ${({ theme }) => theme.colors.bg};
    border-bottom: 1px solid ${({ theme }) => theme.colors.hairline};
    flex-direction: column;
    align-items: stretch;
    padding: 0.75rem ${({ theme }) => theme.layout.gutterMobile} 1.25rem;
    gap: 0.125rem;
    max-height: calc(100vh - var(--nav-height));
    overflow-y: auto;
  }
`;

const NavLink = styled(Link)`
  display: block;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.inkSecondary};
  padding: 0.5rem 0.7rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  cursor: pointer;
  transition: color ${({ theme }) => theme.motion.fast},
    background ${({ theme }) => theme.motion.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.ink};
    background: ${({ theme }) => theme.colors.accentSoft};
  }

  &.active {
    color: ${({ theme }) => theme.colors.accentInk};
  }

  @media (max-width: 768px) {
    font-size: 0.8125rem;
    padding: 0.7rem 0.6rem;
  }
`;

const iconButton = ({ theme }) => `
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: ${theme.radii.md};
  color: ${theme.colors.inkSecondary};
  font-size: 0.95rem;
  transition: color ${theme.motion.fast}, background ${theme.motion.fast};

  &:hover {
    color: ${theme.colors.accentInk};
    background: ${theme.colors.accentSoft};
  }
`;

const ThemeToggle = styled.button`
  ${buttonReset}
  ${iconButton}
`;

const MenuButton = styled.button`
  ${buttonReset}
  ${iconButton}
  display: none;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const DropdownMenu = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  ${buttonReset}
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.inkSecondary};
  padding: 0.5rem 0.7rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  transition: color ${({ theme }) => theme.motion.fast},
    background ${({ theme }) => theme.motion.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.ink};
    background: ${({ theme }) => theme.colors.accentSoft};
  }

  .icon {
    font-size: 0.65rem;
    transition: transform ${({ theme }) => theme.motion.fast};
    transform: ${(props) => (props.$isOpen ? 'rotate(180deg)' : 'rotate(0)')};
  }
`;

const DropdownContent = styled.div`
  position: absolute;
  top: calc(100% + 0.6rem);
  right: 0;
  min-width: 190px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.hairline};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.colors.shadowLg};
  padding: 0.4rem;
  opacity: ${(props) => (props.$isOpen ? '1' : '0')};
  visibility: ${(props) => (props.$isOpen ? 'visible' : 'hidden')};
  transform: ${(props) => (props.$isOpen ? 'translateY(0)' : 'translateY(-6px)')};
  transition: opacity ${({ theme }) => theme.motion.fast},
    transform ${({ theme }) => theme.motion.fast},
    visibility ${({ theme }) => theme.motion.fast};
  z-index: 1000;
`;

const sections = [
  { to: 'about', label: 'About' },
  { to: 'conferences', label: 'Talks' },
  { to: 'podcast', label: 'Podcast' },
  { to: 'blog', label: 'Writing' },
  { to: 'experience', label: 'Experience' },
];

const moreSections = [
  { to: 'education', label: 'Education' },
  { to: 'hobbies', label: 'Hobbies' },
  { to: 'contact', label: 'Contact' },
];

const scrollProps = {
  spy: true,
  smooth: true,
  offset: -64,
  duration: 500,
  activeClass: 'active',
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { mode, toggleMode } = useColorScheme();

  const closeMenu = () => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Nav>
      <NavContent>
        <Logo to="hero" smooth duration={500}>
          Alessandro Romano
        </Logo>

        <Right>
          <NavLinks $isOpen={isOpen}>
            {sections.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} {...scrollProps} onClick={closeMenu}>
                  {label}
                </NavLink>
              </li>
            ))}

            <li className="desktop-only" ref={dropdownRef}>
              <DropdownMenu>
                <DropdownButton
                  onClick={(event) => {
                    event.stopPropagation();
                    setIsDropdownOpen((previous) => !previous);
                  }}
                  $isOpen={isDropdownOpen}
                  aria-expanded={isDropdownOpen}
                >
                  More
                  <FontAwesomeIcon icon={faChevronDown} className="icon" />
                </DropdownButton>
                <DropdownContent $isOpen={isDropdownOpen}>
                  {moreSections.map(({ to, label }) => (
                    <NavLink key={to} to={to} {...scrollProps} onClick={closeMenu}>
                      {label}
                    </NavLink>
                  ))}
                </DropdownContent>
              </DropdownMenu>
            </li>

            {moreSections.map(({ to, label }) => (
              <li className="mobile-only" key={to}>
                <NavLink to={to} {...scrollProps} onClick={closeMenu}>
                  {label}
                </NavLink>
              </li>
            ))}
          </NavLinks>

          <ThemeToggle
            onClick={toggleMode}
            aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} theme`}
            title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} theme`}
          >
            <FontAwesomeIcon icon={mode === 'dark' ? faSun : faMoon} />
          </ThemeToggle>

          <MenuButton
            onClick={() => setIsOpen((previous) => !previous)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
          </MenuButton>
        </Right>
      </NavContent>
    </Nav>
  );
};

export default Navbar;
