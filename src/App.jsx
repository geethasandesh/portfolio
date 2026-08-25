import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { ContentProvider } from './context/ContentContext';
import Portfolio from './pages/Portfolio';
import Admin from './pages/Admin';

function App() {
  return (
    <ContentProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </ContentProvider>
  );
}

export default App;
