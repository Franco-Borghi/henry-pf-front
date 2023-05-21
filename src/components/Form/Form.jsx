import { useRef, useState } from "react"
import styles from "./Form.module.css"
import { useDispatch, useSelector } from "react-redux"
import validate from "./validate"
import { fetchData, postMotorcycle } from "../../redux/actions"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import withReactContent from 'sweetalert2-react-content'

export default function Form(){
    const mySwal= withReactContent(Swal)
    const [categories, setCategories] = useState([])
    const motorcyclesData = useSelector(state => state.motos)
    motorcyclesData?.forEach(m => {if(!categories.includes(m.category)) setCategories(categories.concat(m.category))})
    const [inputs, setInputs] = useState({
        chassisId: "",
        brand: "",
        model: "",
        year: "",
        cc: "",
        color: "",
        transmission: "",
        description: "",
        image: "",
        price: "",
        category: "",
    })
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()
    const catRef = useRef()
    const manualRadio = useRef()
    const autoRadio = useRef()

    async function handleSumbitMotorcycle(e){
        e.preventDefault()
        let errorsAux = validate(inputs, categories);
        if(JSON.stringify(errorsAux) === JSON.stringify({})) {
            postMotorcycle({...inputs, 
                year: Number(inputs.year), 
                cc: Number(inputs.cc), 
                price: Number(inputs.price), 
                color: inputs.color.charAt(0).toUpperCase() + inputs.color.slice(1).toLowerCase(),
                model: inputs.model.charAt(0).toUpperCase() + inputs.model.slice(1),
                brand: inputs.brand.charAt(0).toUpperCase() + inputs.brand.slice(1),
                category: inputs.category.charAt(0).toUpperCase() + inputs.category.slice(1).toLowerCase()
            }).then(() => {setInputs({
                chassisId: "",
                brand: "",
                model: "",
                year: "",
                cc: "",
                color: "",
                transmission: "",
                description: "",
                image: "",
                price: "",
                category: ""})
                catRef.current.value = ""
                manualRadio.current.checked = false
                autoRadio.current.checked = false
                mySwal.fire({
                    title: <strong>The motorcycle has been successfully created</strong>,
                    icon: "success",
                })
                fetchData(dispatch)
            }).catch(err => {
                if(err.response.data === "SequelizeUniqueConstraintError: llave duplicada viola restricción de unicidad «items_pkey»")mySwal.fire({
                    html: <p>There is a motorcycle registered with the Chassis Number you are providing, please check the data</p>,
                    icon: "error",
                })
                else {
                    console.log(err);
                }
            })
        }
        else setErrors(errorsAux)
    }

    function handleChange(e){
        let inputsAux = {...inputs, [e.target.name]: e.target.value}
        setInputs(inputsAux)
        setErrors(validate(inputsAux, categories))
    }

    return <>
    <h3>CREATE MOTORCYCLE</h3>
<Link to="/"><button>Home</button></Link>
    <form className={styles['my-form']} onSubmit={handleSumbitMotorcycle}>
  <label for="chassisId">Chassis Number:</label>
  <input type="text" id="chassisId" name="chassisId" onChange={handleChange} value={inputs.chassisId}/>
  <p>{errors.chassisId}</p>

  <label for="brand">Brand:</label>
  <input type="text" id="brand" name="brand" onChange={handleChange} value={inputs.brand}/>
  <p>{errors.brand}</p>

  <label for="model">Model:</label>
  <input type="text" id="model" name="model" onChange={handleChange} value={inputs.model}/>
  <p>{errors.model}</p>

  <label for="year">Year:</label>
  <input type="number" id="year" name="year" onChange={handleChange} value={inputs.year}/>
  <p>{errors.year}</p>

  <label for="cc">CC:</label>
  <input type="number" id="cc" name="cc" onChange={handleChange} value={inputs.cc}/>
  <p>{errors.cc}</p>

  <label for="color">Color:</label>
  <input type="text" id="color" name="color" onChange={handleChange} value={inputs.color}/>
  <p>{errors.color}</p>

  <label for="transmission">Transmission:</label>
  <br/>
  <input type="radio" id="automatictransmission" name="transmission" value="Automatic" ref={autoRadio} onClick={handleChange}></input> <label htmlFor="automatictransmission">Automatic</label><br/>
  <input type="radio" id="manualtransmission" name="transmission" value="Manual" ref={manualRadio} onClick={handleChange}></input> <label htmlFor="manualtransmission"> Manual</label>
  <p>{errors.transmission}</p>
<br/>

  <label for="description">Description:</label>
  <input type="text" id="description" name="description" onChange={handleChange} value={inputs.description}/>
  <p>{errors.description}</p>

  <label for="image">Image URL:</label>
  <input type="text" id="image" name="image" onChange={handleChange} value={inputs.image}/>
  <p>{errors.image}</p>

  <label for="price">Price:</label>
  <input type="number" id="price" name="price" onChange={handleChange} value={inputs.price}/>
  <p>{errors.price}</p>

  <label for="category">Category:</label>
  <select name="category" id="selectCategory" onChange={handleChange} ref={catRef}>
    <option></option>
    {categories?.map(c => <option>{c}</option>)}
  </select>
  <input type="text" id="category" name="category" placeholder="Other?"onChange={handleChange} value={inputs.category}/>
  <p>{errors.category}</p>
  <input type="submit" value="Submit"/>
</form>

    </>
}