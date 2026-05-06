import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  CatsPage,
  JokesPage,
  QuotesPage,
  UsersPage,
  MealsPage,
  YouTubePage,
} from "./pages";
import { Layout } from "./components";
import { ProductsPage } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cats" element={<CatsPage />} />
          <Route path="/quotes" element={<QuotesPage />} />
          <Route path="/jokes" element={<JokesPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/meals" element={<MealsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/youtube" element={<YouTubePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
