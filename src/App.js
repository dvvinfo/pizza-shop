import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import FullPizza from "./pages/FullPizza";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import MainLayout from "./layouts/MainLayout";

import "./scss/app.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element ={<MainLayout/>}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
