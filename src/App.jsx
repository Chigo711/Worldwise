import { BrowserRouter,  Navigate,  Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import {CitiesProvider} from "./contexts/CitiesContext"
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import SpinnerFullPage from "./components/SpinnerFullPage"

import CityList from "./components/CityList";
import City from "./components/City";
import Form from "./components/Form";
import CountryList from "./components/CountryList";

// import Product from "./pages/product";
// import Pricing from "./pages/Pricing";
// import Homepage from "./pages/Homepage";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";
// import PageNotFound from "./pages/PageNotFound";

const Homepage = lazy(()=> import("./pages/Homepage"))
const Product = lazy(()=> import("./pages/Product"))
const Pricing = lazy(()=> import("./pages/Pricing"))
const AppLayout = lazy(()=> import("./pages/AppLayout"))
const Login = lazy(()=> import("./pages/Login"))
const PageNotFound = lazy(()=> import("./pages/PageNotFound"))

// dist/assets/index-0bb31e0d.css   30.49 kB │ gzip:   5.09 kB
// dist/assets/index-c4cfb9c5.js   506.98 kB │ gzip: 148.06 kB




export default function App() {

  return (
    <AuthProvider>
    <CitiesProvider>

        <BrowserRouter>
        <Suspense fallback= {<SpinnerFullPage />}>
        
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="app" element={   //THIS IS A LOGIC TO PROTECT THE APPLICATION FROM UNAUTHORIZED USERS.FOR INSTANCE USERS WHO ARE NOT LOGGED IN BUT WHAT TO ACCESS A ROUTE WITHOUT LOGGING IN
              <ProtectedRoute> 
                <AppLayout />
            </ProtectedRoute>}>
              <Route index element={<Navigate replace to="cities" />} />{/*THE NAVIGATE COMPONENT BASICALLY SERVES AS A REDIRECT SO AS SOON AS THE INDEX ROUTE IS HIT, IT MOVES STRAIGHT TO THE PATH. SO WE ARE GOING TO ALSO ADD THE REPLACE KEY WORD SO WE CAN REDIRECT BACKWARDS IF WE WANT TO  */}
              <Route
                path="cities"
                element={<CityList />}
              />
              <Route path="cities/:id" element={<City />} />
              <Route
                path="countries"
                element={<CountryList />}
              />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
        </BrowserRouter>
    </CitiesProvider>
    </AuthProvider>
  );
}
