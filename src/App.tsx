import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/layout/Header";
import List from "./pages/List";
import ScrollToTop from "./utils/ScrollToTop";
import Shelter from "./pages/Shelter";

function App() {
  return (
    <>
      <ScrollToTop />
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<List />} />
        <Route path="/shelter" element={<Shelter />} />
      </Routes>
    </>
  );
}

export default App;
