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

/*
 * Opaque and flat. A translucent blurred bar is the opposite of what this
 * direction is after, so the nav is a solid slab with a thick rule under it.
 */
const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  height: var(--nav-height);
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.bg};
  border-bottom: ${({ theme }) => theme.borders.thick} solid
    ${({ theme }) => theme.colors.ink};
  z-index: 1000;
  padding: 0 ${({ theme }) => theme.layout.gutter};

  @media (max-width: 768px) {
    padding: 0 ${({ theme }) => theme.layout.gutterMobile};
    border-bottom-width: ${({ theme }) => theme.borders.base};
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

/* Monogram as a filled block. The full name is in the hero at 9rem already. */
const Logo = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 42px;
  height: 34px;
  padding: 0 0.5rem;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.125rem;
  font-weight: 800;
  font-stretch: 112%;
  letter-spacing: 0.02em;
  white-space: nowrap;
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.bg};
  text-decoration: none;
  cursor: pointer;
  transition: background ${({ theme }) => theme.motion.fast},
    color ${({ theme }) => theme.motion.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.onAccent};
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
    border-bottom: ${({ theme }) => theme.borders.base} solid
      ${({ theme }) => theme.colors.ink};
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
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.ink};
  padding: 0.45rem 0.6rem;
  border: ${({ theme }) => theme.borders.thin} solid transparent;
  cursor: pointer;
  transition: color ${({ theme }) => theme.motion.fast},
    background ${({ theme }) => theme.motion.fast},
    border-color ${({ theme }) => theme.motion.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.ink};
  }

  /* The current section is a filled block, not a colour change. */
  &.active {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.onAccent};
    border-color: ${({ theme }) => theme.colors.ink};
  }

  @media (max-width: 768px) {
    font-size: 0.8125rem;
    padding: 0.65rem 0.6rem;
  }
`;

const iconButton = ({ theme }) => `
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 34px;
  border: ${theme.borders.thin} solid ${theme.colors.ink};
  color: ${theme.colors.ink};
  font-size: 0.9rem;
  transition: color ${theme.motion.fast}, background ${theme.motion.fast};

  &:hover {
    background: ${theme.colors.accentAlt};
    color: ${theme.colors.onAccentAlt};
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
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.ink};
  padding: 0.45rem 0.6rem;
  border: ${({ theme }) => theme.borders.thin} solid transparent;
  transition: background ${({ theme }) => theme.motion.fast},
    border-color ${({ theme }) => theme.motion.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.ink};
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
  border: ${({ theme }) => theme.borders.base} solid
    ${({ theme }) => theme.colors.ink};
  box-shadow: ${({ theme }) => theme.colors.shadowHard};
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
  offset: -72,
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
        <Logo to="hero" smooth duration={500} aria-label="Alessandro Romano">
          AR
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
