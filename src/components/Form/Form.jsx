import styles from "./Form.module.scss";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import validate from "./validate";
import { fetchData, postMotorcycle } from "../../redux/actions";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';

export default function Form(){
    const navigate = useNavigate();
    const mySwal= withReactContent(Swal);

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
                setErrors({})
                mySwal.fire({
                    html: <strong>The motorcycle has been successfully created</strong>,
                    icon: "success",
                })
                fetchData(dispatch)
            }).catch(err => {
                if(err.response?.data) mySwal.fire({
                    html: <strong>{err.response.data}</strong>,
                    icon: "error",
                })
            })
        }
        else setErrors(errorsAux)
    }

    function handleChange(e){
        let inputsAux = {...inputs, [e.target.name]: e.target.value}
        setInputs(inputsAux);
    }

    return (
        <>
        <div className={styles['form-container']}>
            <section className={styles['my-form-box']}>
                <form className={styles['my-form']} onSubmit={handleSumbitMotorcycle}>
                    <section className={styles['item-info']}>
                        <h2>Item Info</h2>
                        <div>
                            <label for="chassisId">Chassis Number:</label>
                            <input className={styles[`${errors.chassisId ? 'error' : ''}`]} type="text" id="chassisId" name="chassisId" onChange={handleChange} value={inputs.chassisId}/>
                            <p>{errors.chassisId}</p>
                        </div>

                        <div>
                            <label for="color">Color:</label>
                            <input className={styles[`${errors.color ? 'error' : ''}`]} type="text" id="color" name="color" onChange={handleChange} value={inputs.color}/>
                            <p>{errors.color}</p>
                        </div>
                    </section>

                    <section className={styles['motorcycle-info']}>
                        <h2>Motorcycle Info</h2>

                        <div className={styles.brandModel}>
                            <div className={styles.brand}>
                                <label for="brand">Brand:</label>
                                <input className={styles[`${errors.brand ? 'error' : ''}`]} type="text" id="brand" name="brand" onChange={handleChange} value={inputs.brand}/>
                                <p>{errors.brand}</p>
                            </div>

                            <div className={styles.model}>
                                <label for="model">Model:</label>
                                <input className={styles[`${errors.model ? 'error' : ''}`]} type="text" id="model" name="model" onChange={handleChange} value={inputs.model}/>
                                <p>{errors.model}</p>
                            </div>
                        </div>

                        <div className={styles.yearCC}>
                            <div>
                                <label for="year">Year:</label>
                                <input className={styles[`${errors.year ? 'error' : ''}`]} type="number" id="year" name="year" onChange={handleChange} value={inputs.year}/>
                                <p>{errors.year}</p>
                            </div>

                            <div>
                                <label for="cc">CC:</label>
                                <input className={styles[`${errors.cc ? 'error' : ''}`]} type="number" id="cc" name="cc" onChange={handleChange} value={inputs.cc}/>
                                <p>{errors.cc}</p>
                            </div>
                        </div>

                        <div>
                            <label for="transmission">Transmission:</label>
                            <br/>
                            <input type="radio" id="automatictransmission" name="transmission" value="Automatic" ref={autoRadio} onClick={handleChange}></input> <label htmlFor="automatictransmission">Automatic</label><br/>
                            <input type="radio" id="manualtransmission" name="transmission" value="Manual" ref={manualRadio} onClick={handleChange}></input> <label htmlFor="manualtransmission"> Manual</label>
                            <p>{errors.transmission}</p>
                            <br/>
                        </div>

                        <div>
                            <label for="description">Description:</label>
                            <input className={styles[`${errors.description ? 'error' : ''}`]} type="text" id="description" name="description" onChange={handleChange} value={inputs.description}/>
                            <p>{errors.description}</p>
                        </div>

                        <div>
                            <label for="image">Image URL:</label>
                            <input className={styles[`${errors.image ? 'error' : ''}`]} type="text" id="image" name="image" onChange={handleChange} value={inputs.image}/>
                            <p>{errors.image}</p>
                        </div>

                        <div className={styles.priceCategory}>
                            <div>
                                <label for="price">Price:</label>
                                <input className={styles[`${errors.price ? 'error' : ''}`]} type="number" id="price" name="price" onChange={handleChange} value={inputs.price}/>
                                <p>{errors.price}</p>
                            </div>

                            <div>
                                <label for="category">Category:</label>
                                <select name="category" id="selectCategory" onChange={handleChange} ref={catRef}>
                                    <option></option>
                                    {categories?.map(c => <option>{c}</option>)}
                                </select>
                            
                                <input className={styles[`${errors.category ? 'error' : ''}`]} type="text" id="category" name="category" placeholder="Other"onChange={handleChange} value={inputs.category}/>
                                <p>{errors.category}</p>
                            </div>
                        </div>

                    </section>

                    <input type="submit" value="Submit"/>
                </form>
            </section>
        </div>
        </>
    )
}