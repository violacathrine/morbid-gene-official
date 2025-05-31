// src/components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import logo from '../assets/logo.svg'

// --- Styled Components ---

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9;
  color: #fff;
  padding: 2rem 2rem; // Consistent padding for both pages
  display: flex;
  justify-content: ${({ $isMedia }) =>
    $isMedia ? 'flex-end' : 'space-between'};
  align-items: center;
  background: transparent;

  @media (min-width: 768px) {
    padding: 2.5rem 3rem; // Consistent desktop padding
  }
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  height: auto;

  img {
    height: 100px;

    @media (min-width: 768px) {
      height: 100px;
    }
  }
`

const DesktopNavLinks = styled.ul`
  display: none;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;

  @media (min-width: 768px) {
    display: flex;
    align-items: flex-start;
    margin-top: 0.5rem;
  }

  li a {
    color: #fff;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: bold;
    white-space: nowrap;
  }
`

const HamburgerIcon = styled.div`
  display: block;
  font-size: 2rem;
  cursor: pointer;
  color: #fff;
  margin-left: auto;

  @media (min-width: 768px) {
    display: none;
  }
`

const MobileMenu = styled.ul`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.95);
  list-style: none;
  padding: 1.5rem 1rem;
  z-index: 10;
  flex-direction: column;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
  transform: ${({ $isOpen }) =>
    $isOpen ? 'translateY(0)' : 'translateY(-100%)'};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  display: flex;

  li {
    text-align: center;
    margin-bottom: 1rem;
  }

  li:last-child {
    margin-bottom: 0;
  }

  li a {
    color: #fff;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1.2rem;
    display: block;
    padding: 0.5rem 0;
  }

  @media (min-width: 768px) {
    display: none;
  }
`

// --- Component ---
export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const iconRef = useRef(null)
  const location = useLocation()
  const isMediaPage = location.pathname === '/media'

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  useEffect(() => {
    if (!isMobileMenuOpen) return

    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        iconRef.current &&
        !iconRef.current.contains(e.target)
      ) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <NavWrapper $isMedia={isMediaPage}>
        {/* Visa inte loggan på media */}
        {!isMediaPage && (
          <LogoContainer>
            <img src={logo} alt="Morbid Gene logo" />
          </LogoContainer>
        )}

        <DesktopNavLinks>
          <li>
            <Link to="/" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li>
            <a href="#gigs" onClick={closeMobileMenu}>
              Gigs
            </a>
          </li>
          <li>
            <Link to="/media" onClick={closeMobileMenu}>
              Media
            </Link>
          </li>
          <li>
            <a href="#contact" onClick={closeMobileMenu}>
              Contact
            </a>
          </li>
        </DesktopNavLinks>

        <HamburgerIcon ref={iconRef} onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? '✖' : '☰'}
        </HamburgerIcon>
      </NavWrapper>

      <MobileMenu ref={menuRef} $isOpen={isMobileMenuOpen}>
        <li>
          <Link to="/" onClick={closeMobileMenu}>
            Home
          </Link>
        </li>
        <li>
          <a href="#gigs" onClick={closeMobileMenu}>
            Gigs
          </a>
        </li>
        <li>
          <Link to="/media" onClick={closeMobileMenu}>
            Media
          </Link>
        </li>
        <li>
          <a href="#contact" onClick={closeMobileMenu}>
            Contact
          </a>
        </li>
      </MobileMenu>
    </>
  )
}
