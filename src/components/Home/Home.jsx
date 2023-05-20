import React, { useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import Motorcycles from "../Motorcycles/Motorcycles";
import Detail  from "../Detail/Detail"
import { useDispatch } from "react-redux";
import { fetchData } from "../../redux/actions";


export default function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    fetchData(dispatch)
  }, [])

  return <div>
    <NavBar/>
    <Motorcycles/>
    <Detail/>
  </div>;
}
