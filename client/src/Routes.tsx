import { Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout";
import { AboutPage, AddLicense, AuthenticateToken, LandingPage } from "./pages";
import Products from "./pages/Products";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/authenticate" element={<AuthenticateToken />} />
        <Route path="/add-license" element={<AddLicense />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
