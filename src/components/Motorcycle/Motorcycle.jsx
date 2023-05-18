import {Link} from 'react-router-dom';
 import React from 'react'
 
 export default function Motorcycle(props) {
    const {id, brand, image, price, model, category} = props.info;
   return (
     <div>
        <Link to={`/motorcycles/${id}`}>
        <h1>{price}</h1>
        <h2>{brand}</h2>
        <h3>{model}</h3>
        <h4>{category}</h4>
        <img src={image} alt={brand} />
        </Link>
     </div>
   )
 }
 