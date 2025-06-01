// src/pages/GalleryPage.jsx
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

// Glob-import
const galleries = {
  fryshuset: {
    title: 'Fryshuset 24.05.25',
    credit: 'Photo: Marielle Tengström @ Tritone',
    images: Object.values(
      import.meta.glob('/src/assets/images/fryshuset/*.{jpg,JPG,png}', {
        eager: true,
        import: 'default',
      })
    ),
  },
  fredagsmangel: {
    title: 'Fredagsmangel 15.11.24',
    credit: 'Photo: Per Lenner',
    images: Object.values(
      import.meta.glob('/src/assets/images/fredagsmangel/*.{jpg,JPG,png}', {
        eager: true,
        import: 'default',
      })
    ),
  },
}

const Wrapper = styled.section`
  padding: 120px 1rem 2rem;
  background: #000;
  color: #fff;
  min-height: 100vh;
  text-align: center;
`

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;

  @media (min-width: 768px) {
    font-size: 2.8rem;
  }
`

const Credit = styled.p`
  font-size: 1rem;
  color: #ffffff;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    font-size: 1.3rem;
  }
`

const ImageGrid = styled.div`
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));

  @media (min-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  }

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`

export const GalleryPage = () => {
  const { slug } = useParams()
  const gallery = galleries[slug]
  const [sortedImages, setSortedImages] = useState([])

  useEffect(() => {
    if (!gallery) return

    Promise.all(
      gallery.images.map((src) => {
        return new Promise((resolve) => {
          const img = new Image()
          img.src = src
          img.onload = () => {
            resolve({ src, isLandscape: img.width >= img.height })
          }
        })
      })
    ).then((results) => {
      const landscape = results.filter((img) => img.isLandscape)
      const portrait = results.filter((img) => !img.isLandscape)
      setSortedImages([...portrait, ...landscape])
    })
  }, [gallery])

  if (!gallery) {
    return (
      <Wrapper>
        <Title>404 – Gallery Not Found</Title>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <Title>{gallery.title}</Title>
      <Credit>{gallery.credit}</Credit>

      <ImageGrid>
        {sortedImages.map((img, i) => (
          <img key={i} src={img.src} alt={`${gallery.title} image ${i + 1}`} />
        ))}
      </ImageGrid>
    </Wrapper>
  )
}
