import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { PublicLayout } from "./components/PublicLayout";
import { AuthProvider } from "./lib/auth";
import { CartProvider } from "./lib/cart";
import { Home } from "./pages/Home";
import { DigitizeBiz } from "./pages/DigitizeBiz";
import { CitizenEase } from "./pages/CitizenEase";
import { Cart } from "./pages/Cart";
import { AdminPage } from "./pages/AdminPage";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/digitizebiz" element={<DigitizeBiz />} />
                <Route path="/citizenease" element={<CitizenEase />} />
                <Route path="/cart" element={<Cart />} />
              </Route>
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
