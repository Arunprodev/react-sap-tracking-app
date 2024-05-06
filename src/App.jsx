import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import './index.css';

import { CitizesProvider } from './Context/CitizesContext';
import { ProvideAuth } from './Context/FakeAuthitication';
import ProtectedRouter from './Components/ProtectedRouter';

import CityList from './Components/CityList';
import CountryList from './Components/CountryList';
import City from './Components/City';
import Form from './Components/Form';
import SpinnerFullPage from './Components/SpinnerFullPage';

// import Product from './Pages/Product';
// import HomePage from './Pages/HomePage';
// import Pricing from './Pages/Pricing';
// import Login from './Pages/Login';
// import PageNotFound from './Pages/PageNotFound';
// import AppLayout from './Pages/AppLayout';

// dist/assets/index-280ad002.css   29.92 kB │ gzip:   5.09 kB
// dist/assets/index-c13964a4.js   515.24 kB │ gzip: 147.99 kB

const HomePage = lazy(() => import('./Pages/Homepage'));
const Product = lazy(() => import('./Pages/Product'));
const Pricing = lazy(() => import('./Pages/Pricing'));
const AppLayout = lazy(() => import('./Pages/AppLayout'));
const Login = lazy(() => import('./Pages/Login'));
const PageNotFound = lazy(() => import('./Pages/PageNotFound'));

function App() {
  return (
    <CitizesProvider>
      <ProvideAuth>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route
                path="app"
                element={
                  <ProtectedRouter>
                    <AppLayout />
                  </ProtectedRouter>
                }
              >
                <Route index element={<Navigate replace to="citizes" />} />
                <Route path="citizes" element={<CityList />} />
                <Route path="citizes/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="/login" element={<Login />} />{' '}
              {/* Corrected route path */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ProvideAuth>
    </CitizesProvider>
  );
}

export default App;
