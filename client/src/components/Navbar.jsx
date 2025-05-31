// src/components/Navbar.jsx
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";

// --- Styled Components ---

const NavWrapper = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  color: #fff;
  padding: 10px; /* Justerad padding för att ge lite mer utrymme, men box-sizing hanterar bredden */
  flex-wrap: wrap; /* 🛡️ tillåter radbrytning vid platsbrist */

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 768px) {
    padding: 1rem 2rem; /* Mer padding på större skärmar */
  }
`;

const LogoContainer = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;

  img {
    height: 120px;
    width: auto;
    max-width: 100%;
    object-fit: contain;
    display: block;
  }
`;

const DesktopNavLinks = styled.ul`
  display: none;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;

  @media (min-width: 768px) {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;    /* 🔼 Viktig: justerar vertikalt */
    align-self: flex-start;     /* 🔼 Flyttar hela ul:en uppåt */
    margin-top: 0.5rem;         /* Justera efter behov */
  }

  li a {
    color: #fff;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: bold;
    white-space: nowrap;
  }
`;

const HamburgerIcon = styled.div`
  display: block;
  font-size: 2rem;
  cursor: pointer;
  color: #fff;

  align-self: flex-start;       /* 💥 flyttar den till toppen av flexboxen */
  margin-left: auto;            /* 💥 trycker den längst till höger */
  margin-top: 0.5rem;           /* justera om du vill ännu högre upp */

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileMenu = styled.ul`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.9);
  list-style: none;
  margin: 0;
  padding: 1.5rem 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 9;
  flex-direction: column;
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform: ${({ $isOpen }) => ($isOpen ? 'translateY(0)' : 'translateY(-100%)')};
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
`;

// --- Navbar Component ---

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const iconRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        iconRef.current &&
        !iconRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <NavWrapper>
        <LogoContainer>
          <img src={logo} alt="MetalBand logo" />
        </LogoContainer>

        <DesktopNavLinks>
          <li><a href="#hero" onClick={closeMobileMenu}>Home</a></li>
          <li><a href="#gigs" onClick={closeMobileMenu}>Gigs</a></li>
          <li><a href="#media" onClick={closeMobileMenu}>Media</a></li>
          <li><a href="#contact" onClick={closeMobileMenu}>Contact</a></li>
        </DesktopNavLinks>

        {/* Hamburger Icon for Mobile */}
        <HamburgerIcon ref={iconRef} onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? '✖' : '☰'}
        </HamburgerIcon>
      </NavWrapper>

      {/* Mobile Navigation */}
      <MobileMenu ref={menuRef} $isOpen={isMobileMenuOpen}>
        <li><a href="#hero" onClick={closeMobileMenu}>Home</a></li>
        <li><a href="#gigs" onClick={closeMobileMenu}>Gigs</a></li>
        <li><a href="#media" onClick={closeMobileMenu}>Media</a></li>
        <li><a href="#contact" onClick={closeMobileMenu}>Contact</a></li>
      </MobileMenu>
    </>
  );
};