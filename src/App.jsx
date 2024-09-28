import { BrowserRouter,  Navigate,  Route, Routes } from "react-router-dom";
import Product from "./pages/product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import CityList from "./components/CityList";
import City from "./components/City";
import Form from "./components/Form";
import CountryList from "./components/CountryList";
import {CitiesProvider} from "./contexts/CitiesContext"
export default function App() {

  return (
    <CitiesProvider>

        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="app" element={<AppLayout />}>
              <Route index element={<Navigate replace to="cities" />} />{/*THE NAVIGATE COMPONENT BASICALLY SERVES AS A REDIRECT SO AS SOON AS THE INDEX ROUTE IS HIT, IT MOVES STRAIGHT TO THE PATH. SO WE ARE GOING TO ALSO ADD THE REPLACE KEY WOR  */}
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
        </BrowserRouter>
    </CitiesProvider>
  );
}
