import { Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout";
import AboutPage from "./pages/About";

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path='about' element={<AboutPage />} />
        </Route>
      </Routes>
  );
};

export default AppRoutes;
