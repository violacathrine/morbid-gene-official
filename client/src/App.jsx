import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { GlobalStyles } from './styles/GlobalStyles'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { Media } from './pages/Media'

export const App = () => {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/media" element={<Media />} />
        </Routes>
      </Router>
    </>
  )
}
