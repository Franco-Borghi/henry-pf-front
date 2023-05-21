import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home"
import Form from "./components/Form/Form";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchData } from "./redux/actions";

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    fetchData(dispatch)
  }, [])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/create" element={<Form/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
