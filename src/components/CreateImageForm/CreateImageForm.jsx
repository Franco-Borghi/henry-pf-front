import styles from "./CreateImageForm.module.scss"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import axios from "axios"

export default function CreateImageForm() {
  const navigate = useNavigate()
  const mySwal = withReactContent(Swal)

  const currentOrder = useSelector(state => state.currentOrder)
  const [loader, setLoader] = useState(false);
  const [image, setImage] = useState("")
  const [inputs, setInputs] = useState({
    brand: "BMW",
    motorcycle: "R1250GS",
    color: "Red",
    style: "",
    background: "",
    typeOfImage: "",
  })
  const [background, setBackground] = useState([
    "Interstellar Nebula in space",
    "Lost Jungle Ruins",
    "Ultra-Modern Cityscape",
    "Deserted Ghost Town",
    "Burning Man",
    "Mechanic's Workshop",
    "Medieval Castle",
    "Ancient Greek Temple",
    "Volcano Lair",
  ])
  const [style, setStyle] = useState([
    "Cybernetic sci-fi",
    "Gothic fantasy",
    "Cyberpunk Futurism",
    "Japanese Ukiyo-e",
    "Post-Apocalyptic Dystopia",
    "Retro 80s",
    "Steampunk",
  ])

  const [typeOfImage, setTypeOfImage] = useState([
    "Airbrush",
    "Digital painting",
    "3D render",
    "Roman mosaic",
    "Baroque painting",
    "Abstract painting",
    "Pop Art",
    "Street Art Graffiti",
  ])

  useEffect(() => {
    setInputs({
      ...inputs,
      color: currentOrder?.color,
      motorcycle: currentOrder?.motorcycle.model,
      brand: currentOrder?.motorcycle.brand,
    })
  }, [currentOrder])

  async function handleSumbitImage(e) {
    e.preventDefault()

    setLoader(true);
    const generateImage = await axios.post(
      `${process.env.REACT_APP_HOST_NAME}/openAI/generateImage`,
      inputs
    )
    setImage(generateImage.data.image)
    setLoader(false);
  }

  function handleChange(e) {
    let inputsAux = { ...inputs, [e.target.name]: e.target.value }
    setInputs(inputsAux)
  }

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image;
    link.download = 'imagen.png';
    link.click();
  };

  return (
    <>
      {
        loader
        ? 
          <div className={styles["loader-openia"]}>
            <div class={styles["pyramid-loader"]}>
              <div class={styles["wrapper"]}>
                <span class={styles["side1"]}></span>
                <span class={styles["side2"]}></span>
                <span class={styles["side3"]}></span>
                <span class={styles["side4"]}></span>
                <span class={styles["shadow"]}></span>
              </div>  
            </div>
          </div>
          
        : null
      }
      <div className={styles["form-container"]}>
        <section className={styles["my-form-box"]}>
          <form className={styles["my-form"]} onSubmit={handleSumbitImage}>
            <section className={styles["item-info"]}>
              <h2>{`Congratulations!`.toUpperCase()}</h2>
              <h4>Let's celebrate generating a cool image of your new {currentOrder?.motorcycle.brand || "motorcycle"} {currentOrder?.motorcycle.model}</h4>
    

              <div className={styles["input-container"]}>
                <div className={styles["input-container-item"]}>
                  <label htmlFor="style">Style</label>
                  <select
                    name="style"
                    onChange={handleChange}
                    value={inputs.style}>
                    <option></option>
                    {style.map(s => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles["input-container-item"]}>
                  <label htmlFor="background">Background</label>
                  <select
                    name="background"
                    onChange={handleChange}
                    value={inputs.background}>
                    {" "}
                    <option></option>
                    {background.map(b => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles["input-container-item"]}>
                  <label htmlFor="background">Type of image</label>
                  <select
                    name="typeOfImage"
                    onChange={handleChange}
                    value={inputs.typeOfImage}>
                    {" "}
                    <option></option>
                    {typeOfImage.map(b => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>
            <div className={styles['inputs-container']}>
              <input type="submit" value="Generate" />
              <input
                type="button"
                value="No, thank you"
                onClick={() => navigate("/")}
              />
            </div>
          </form>
        </section>
        {image && (
          <div className={styles["my-image-box"]}>
            <img src={image} alt="generated image" />
          </div>
        )}
        {
          image
          ? <div style={{ display: 'flex', justifyContent: 'center'}}>
              <button onClick={handleDownload} className={styles['boton-afanado']}>
                <span class="text">Preview</span>
              </button>
            </div>
          : null
        }
        
      </div>
    </>
  )
}
