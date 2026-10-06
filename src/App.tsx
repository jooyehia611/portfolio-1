import React from 'react';
import Home from '@pages/Home/Home';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Contact from '@pages/Contact/Contact';
import { LocaleProvider } from './i18n/Locale';

const App = () => (
  <LocaleProvider><BrowserRouter>
    <Routes>
      <Route index element={<Home />} />
      <Route path='/contact' element={<Contact />} />
    </Routes>
  </BrowserRouter></LocaleProvider>
);

export default App;
