// src/components/HeroSection.jsx
import styled from 'styled-components'
import backgroundImage from '../assets/images/band.jpg'

const Hero = styled.section`
  min-height: 100dvh;
  width: 100dvw;
  position: relative;
  background: url(${backgroundImage}) no-repeat center center/cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 2rem;
  padding-bottom: 4rem;
  text-align: center;
  overflow: hidden;

  .hero-content {
    background-color: rgba(0, 0, 0, 0.6); /* 🟤 halvgenomskinlig svart */
    padding: 1.5rem 2rem;
    max-width: 90%;
  }

  /* Förhindrar att barninnehåll orsakar scroll */
  > div {
    max-width: 100%;
    overflow-x: hidden;
  }

  h1 {
    font-size: 2.5rem;
    color: #f5f5f5;
    text-shadow: 2px 2px 6px #000;
    margin: 0;
    word-break: break-word;
  }

  p {
    margin-top: 1rem;
    font-size: 1.2rem;
    color: #ccc;
    text-shadow: 1px 1px 3px #000;
    word-break: break-word;
    justify-content: flex-end;
  }

  @media (min-width: 768px) {
    .hero-content {
      backdrop-filter: blur(4px); /* 🔮 snygg effekt (valfritt) */
    }

    h1 {
      font-size: 4rem;
    }

    p {
      font-size: 1.5rem;
    }
  }
`

export const HeroSection = () => {
  return (
    <Hero id="hero">
      <div className="hero-content">
        <h1>Morbid Gene Official</h1>
        <a
          href="https://open.spotify.com/album/0OnT6kBQPRmHazmvOiLxQe?si=_gBnA79hSHySmec_U1cdUg"
          target="_blank"
          rel="noopener noreferrer"
        >
          Our EP 'Pain Agony Misery' out now - Listen here!
        </a>
      </div>
    </Hero>
  )
}
