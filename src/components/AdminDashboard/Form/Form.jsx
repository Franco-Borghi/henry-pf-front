import styles from "./Form.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavBar from "../../NavBar/NavBar";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import validate from "./validate";
import { fetchData, postMotorcycle } from "../../../redux/actions";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';
import CloudinaryUploadWidget from "../../CloudinaryUploadWidget/CloudinaryUploadWidget";

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
    const imageRef = useRef()
    const motorcycleModelRef = useRef()
    const [createModel, setCreateModel] = useState(false)

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
            }).then(() => {
                console.log("YES");
                setInputs({
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
                if(createModel){
                catRef.current.value = ""
                manualRadio.current.checked = false
                autoRadio.current.checked = false
                imageRef.current.src = ""
                }else{
                    motorcycleModelRef.current.value = ""
                }
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

        if (e.target.name !== 'image') {
        let inputsAux = {...inputs, [e.target.name]: e.target.value}
        setInputs(inputsAux);
        }
    }

    const handleSelectModelChange = (e) => {
        if(e.target.value){
        const motorcycle = motorcyclesData.find(m => m.id === e.target.value);
        setInputs({
            ...inputs,
                brand: motorcycle.brand,
                model: motorcycle.model,
                year: motorcycle.year,
                cc: motorcycle.cc,
                transmission: motorcycle.transmission,
                description: motorcycle.description,
                image: motorcycle.image,
                price: motorcycle.price,
                category: motorcycle.category
        })
    }
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

                        <div>
                            {!createModel ?
                            <label for="motorcycleModel">Color:
                            <select name="motorcycleModel" id="" onChange={handleSelectModelChange} ref={motorcycleModelRef}>
                                <option></option>
                                {[...motorcyclesData].sort((a,b) => {if(a.brand.localeCompare(b.brand) !== 0) return a.brand.localeCompare(b.brand) 
                                    else return a.model.localeCompare(b.model)
                                     }).map(m => <option value={m.id}>{m.brand} {m.model} {m.cc} {m.year}</option>)}
                            </select>
                            </label>
                            : null }
                            { !createModel ? <button onClick={() => {
                                setCreateModel(true)
                                setInputs({
                                    ...inputs,
                                    brand: "",
                                    model: "",
                                    year: "",
                                    cc: "",
                                    transmission: "",
                                    description: "",
                                    image: "",
                                    price: "",
                                    category: ""
                                })
                                setErrors({})
                                }} type="button">Other</button> : <button onClick={() => {
                                    setCreateModel(false)
                                    setErrors({})
                                    }} type="button">Cancel</button> }
                        </div>
                    </section>
                        {createModel ? 
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
                            <label for="image">Image:</label>
                            <input className={styles[`${errors.image ? 'error' : ''}`]} type="text" id="image" name="image" onChange={handleChange} value={inputs.image} hidden />
                            <p>{errors.image}</p>
                            <CloudinaryUploadWidget imageUrl={setInputs} inputs={inputs}/>
                            <img id="uploadedimage" src="" ref={imageRef}></img>
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
: null }
 
                    <input type="submit" value="Submit"/>
                </form>
            </section>
        </div>
        </>
    )
}