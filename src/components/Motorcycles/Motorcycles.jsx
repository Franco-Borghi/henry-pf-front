
import MotorcyclesApi from '../../data.json';
import Motorcycle from '../Motorcycle/Motorcycle';

export default function Motorcycles() {
    const motorcyclesData = MotorcyclesApi.motorcycles; // Cuando este el back se cambia a la llamada al back para obtener los datos
    // console.log(motorcyclesData)
  return (
    <div>
      {motorcyclesData.map((motorcycle) => (
        <Motorcycle key={motorcycle.id} info={motorcycle} />
      ))}
      </div>
  )
}


