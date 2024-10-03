import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/layout/Header";
import List from "./pages/List";
import ScrollToTop from "./utils/ScrollToTop";
import Shelter from "./pages/Shelter";
import MyPet from "./pages/MyPet";
import Detail from "./pages/Detail";
import Recommend from "./pages/Recommend";
import Result from "./pages/Result";

function App() {
  return (
    <>
      <ScrollToTop />
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<List />} />
        <Route path="/shelter" element={<Shelter />} />
        <Route path="/mypet" element={<MyPet />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </>
  );
}

export default App;
