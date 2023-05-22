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
        let auxColors = []
        response.data.items.forEach(i => {if(!auxColors.includes(i.color)) auxColors.push(i.color)
        setColors(auxColors)
        })
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
      <h2>Transmission: {motorcycle.transmission}</h2>
      <h2>Year: {motorcycle.year}</h2>
      <h2>Price: {motorcycle.price}</h2>
      <h2>CC: {motorcycle.cc}</h2>
      <h2>Color options: {colors?.map(c => <p>{c}</p>)}</h2>
      <h4>Description: {motorcycle.description}</h4>
      <img src={motorcycle.image} alt={motorcycle.brand} />
      <button>Add to cart</button>
      <Footer></Footer>
    </div>
  );
}
