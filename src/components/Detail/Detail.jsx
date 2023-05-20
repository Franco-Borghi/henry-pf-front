//!para fines de testeo, aun no se me rompe nada :) pero aun no puedo ver renderizado los resultados :(
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const [motorcycle, setMotorcycle] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchMotorcycle = async () => {
      try {
        const response = await axios.get(`/motorcycles/${id}`);
        setMotorcycle(response.data);
        
      } catch (error) {
        console.log(error);
      }
    };

    fetchMotorcycle();
  }, [id]);

  if (!motorcycle) {
    return <div>Aun no hay motocicletas para mostrar...</div>;
  }

  return (
    <div>
      <h1>ID: {motorcycle.id}</h1>
      <h2>Brand: {motorcycle.brand}</h2>
      <h2>Model: {motorcycle.model}</h2>
      <h2>Category: {motorcycle.category}</h2>
      <h2>Price: {motorcycle.price}</h2>
      <img src={motorcycle.image} alt={motorcycle.brand} />
    </div>
  );
};

export default Detail;