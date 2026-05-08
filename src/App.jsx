import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  CatsPage,
  JokesPage,
  QuotesPage,
  UsersPage,
  ProductsPage,
  MealsPage,
  YouTubePage,
  AuthPage,
  PageNotFound,
} from "./pages";
import { Layout } from "./components";

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
          <Route path="/auth/*" element={<AuthPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
