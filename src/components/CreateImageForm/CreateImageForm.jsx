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
    "Pop Art",
    "Comic Book",
  ])

  const [typeOfImage, setTypeOfImage] = useState([
    "Airbrush",
    "Digital painting",
    "3D render",
    "Roman mosaic",
    "Baroque painting",
    "Abstract painting",
    "hyperrealistic painting",
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

    const generateImage = await axios.post(
      `${process.env.REACT_APP_HOST_NAME}/openAI/generateImage`,
      inputs
    )
    setImage(generateImage.data.image)
  }

  function handleChange(e) {
    let inputsAux = { ...inputs, [e.target.name]: e.target.value }
    setInputs(inputsAux)
  }

  return (
    <>
      <div className={styles["form-container"]}>
        <section className={styles["my-form-box"]}>
          <form className={styles["my-form"]} onSubmit={handleSumbitImage}>
            <section className={styles["item-info"]}>
              <h2>Congratulations on your order! Let's celebrate generating a cool image of your new {currentOrder?.motorcycle.brand || "motorcycle"} {currentOrder?.motorcycle.model}
              </h2>
    

              <div className={styles["input-container"]}>
                <div>
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

                <div>
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

                <div>
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
            <input type="submit" value="Generate" />
            <input
              type="submit"
              value="No, thank you"
              onClick={() => navigate("/")}
              style={{ marginLeft: "10px" }}
            />
          </form>
        </section>
        {image && (
          <div className={styles["my-image-box"]}>
            <img src={image} alt="generated image" />
          </div>
        )}
      </div>
    </>
  )
}
