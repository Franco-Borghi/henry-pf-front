import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

export default function Detail() {
  const [motorcycle, setMotorcycle] = useState(null);
  const [colors, setColors] = useState([])
  const { id } = useParams();

  useEffect(() => {
    const fetchMotorcycle = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/motorcycles/${id}`);
        setMotorcycle(response.data);
        response.data.items.forEach(i => {if(!colors.includes(i.color)) setColors(colors.concat(i.color))})
      } catch (error) {
        console.log(error);
      }
    };
    fetchMotorcycle();
  }, [id]);

  if (!motorcycle) {
    return <div>Searching...</div>;
  }

  return (
    <div>
      <NavBar></NavBar>
      <h2>Brand: {motorcycle.brand}</h2>
      <h2>Model: {motorcycle.model}</h2>
      <h2>Category: {motorcycle.category}</h2>
      <h2>Price: {motorcycle.price}</h2>
      <h2>Color options: {colors}</h2>
      <img src={motorcycle.image} alt={motorcycle.brand} />
      <Footer></Footer>
    </div>
  );
}
