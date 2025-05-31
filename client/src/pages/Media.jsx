// Media.jsx (refaktorerad till mobile-first CSS)
import styled from 'styled-components'
import { useState, useEffect } from 'react'

const fryshusetImages = import.meta.glob(
  '/src/assets/images/fryshuset/*.{jpg,png,JPG}',
  { eager: true, import: 'default' }
)
const fredagsmangelImages = import.meta.glob(
  '/src/assets/images/fredagsmangel/*.{jpg,png,JPG}',
  { eager: true, import: 'default' }
)

const galleries = [
  {
    name: 'Fryshuset 24.05.25',
    folder: 'fryshuset',
    credit: 'Photo: Marielle Tengström @ Tritone',
    images: Object.values(fryshusetImages),
  },
  {
    name: 'Fredagsmangel 15.11.24',
    folder: 'fredagsmangel',
    credit: 'Photo: Per Lenner',
    images: Object.values(fredagsmangelImages),
  },
]

const Wrapper = styled.section`
  padding: 120px 2rem 2rem;
  background: #000;
  color: #fff;
  min-height: 100dvh;
  width: 100vw;
`

const Heading = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1rem;
`

const CreditBlock = styled.p`
  font-size: 0.75rem;
  color: #aaa;
  text-align: center;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    font-size: 0.875rem;
  }
`

const BackButton = styled.button`
  background: none;
  color: #fff;
  border: 2px solid #fff;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin: 0 auto 2rem;
  display: block;

  &:focus {
    outline: none;
    box-shadow: none;
  }
  &:focus-visible {
    outline: none;
    box-shadow: none;
  }

  @media (min-width: 768px) {
    margin: 0 0 2rem 0;
    display: inline-block;
  }
`

const GalleryGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;

  @media (min-width: 768px) {
    gap: 2rem;
  }
`

const GalleryCard = styled.div`
  width: 100%;
  max-width: 400px;
  cursor: pointer;
  text-align: center;

  img {
    width: 100%;
    height: 250px; /* 🔥 fast höjd för konsekvent storlek */
    object-fit: cover;
    border-radius: 8px;
  }

  p {
    margin-top: 0.5rem;
    text-transform: uppercase;
  }
`

const ThumbGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    cursor: pointer;
    border-radius: 4px;
  }

  @media (min-width: 768px) {
    gap: 1rem;

    img {
      width: 100px;
      height: 100px;
    }
  }
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
`

const ModalImage = styled.img`
  max-width: 90%;
  max-height: 80vh;
  border-radius: 8px;
  box-shadow: 0 0 20px #000;
  z-index: 1;
`

const ButtonBase = styled.button`
  position: absolute;
  background: none;
  border: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
  z-index: 2;
`

const ArrowLeft = styled(ButtonBase)`
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
`

const ArrowRight = styled(ButtonBase)`
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
`

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2rem;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  z-index: 1000;
  &:focus {
    outline: none;
    box-shadow: none;
  }
  &:hover {
    color: #ccc;
  }
`

const ModalCredit = styled.p`
  font-size: 0.75rem;
  color: #ccc;
  text-align: center;
  margin-top: 1rem;

  @media (min-width: 768px) {
    font-size: 0.8rem;
  }
`

const Modal = ({ src, onClose, onPrev, onNext, credit }) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, onPrev, onNext])

  return (
    <ModalOverlay onClick={onClose}>
      <ArrowLeft
        onClick={(e) => {
          e.stopPropagation()
          onPrev()
        }}
      >
        ⬅
      </ArrowLeft>
      <ModalImage
        src={src}
        alt="Large image"
        onClick={(e) => e.stopPropagation()}
      />
      <ModalCredit>{credit}</ModalCredit>
      <ArrowRight
        onClick={(e) => {
          e.stopPropagation()
          onNext()
        }}
      >
        ➡
      </ArrowRight>
      <CloseButton
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
      >
        ✖
      </CloseButton>
    </ModalOverlay>
  )
}

export const Media = () => {
  const [selectedGallery, setSelectedGallery] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)

  const handlePrev = () => {
    const index = selectedGallery.images.indexOf(selectedImage)
    const prevIndex =
      (index - 1 + selectedGallery.images.length) %
      selectedGallery.images.length
    setSelectedImage(selectedGallery.images[prevIndex])
  }

  const handleNext = () => {
    const index = selectedGallery.images.indexOf(selectedImage)
    const nextIndex = (index + 1) % selectedGallery.images.length
    setSelectedImage(selectedGallery.images[nextIndex])
  }

  if (selectedGallery) {
    return (
      <Wrapper>
        <Heading>{selectedGallery.name}</Heading>
        <CreditBlock>{selectedGallery.credit}</CreditBlock>
        <BackButton onClick={() => setSelectedGallery(null)}>
          ⬅ Back
        </BackButton>
        <ThumbGrid>
          {selectedGallery.images.map((img, i) => (
            <div key={i}>
              <img src={img} alt="" onClick={() => setSelectedImage(img)} />
            </div>
          ))}
        </ThumbGrid>
        {selectedImage && (
          <Modal
            src={selectedImage}
            onClose={() => setSelectedImage(null)}
            onPrev={handlePrev}
            onNext={handleNext}
            credit={selectedGallery.credit}
          />
        )}
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <Heading>Media</Heading>
      <GalleryGrid>
        {galleries.map((gallery, i) => (
          <GalleryCard key={i} onClick={() => setSelectedGallery(gallery)}>
            <img src={gallery.images[0]} alt={gallery.name} />
            <p>{gallery.name}</p>
          </GalleryCard>
        ))}
      </GalleryGrid>
    </Wrapper>
  )
}
