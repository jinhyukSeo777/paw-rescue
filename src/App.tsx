import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/layout/Header";
import List from "./pages/List";
import Shelter from "./pages/Shelter";
import MyPet from "./pages/MyPet";
import Detail from "./pages/Detail";
import Match from "./pages/Match";
import Result from "./pages/Result";
import Error from "./pages/404";

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<List />} />
        <Route path="/shelter" element={<Shelter />} />
        <Route path="/mypet" element={<MyPet />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/match" element={<Match />} />
        <Route path="/result" element={<Result />} />
        <Route path="/404" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
