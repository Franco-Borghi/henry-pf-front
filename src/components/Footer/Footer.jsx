import FB from "../Footer/fb.png"
import IG from "../Footer/ig.png"
import WPP from "../Footer/wpp.png"
import DN from "../Footer/dinamo.png"
import {Link} from "react-router-dom"

export default function Footer(){
<footer>
    <div>
        <a><img src={DN} alt="logo Dinamo"></img></a>
    </div>
    

    <div>
        <Link to="/home">Home</Link>
        <a href="https://www.dinamotos.mx/wp-content/uploads/2016/08/terminos-y-condiciones-DINAMO.pdf">Términos y condiciones</a>
        <a href="https://www.dinamotos.mx/wp-content/uploads/2016/08/aviso-privacidad-DINAMO.pdf">Política de privacidad</a>
    </div>
  
    <div>
        <a>Contact us</a>
        <ul><a href="https://www.facebook.com/dinamotocicletas/"><img src={FB} alt="link to facebook"></img></a></ul>
        <ul><a href="https://www.instagram.com/dinamotocicletas/?hl=es"><img src={IG} alt="link to instagram"></img></a></ul>
        <ul><a href=""><img src={WPP} alt="link to whatsapp"></img></a></ul>
      
        <ul>Correo electrónico: motos@dinamo.com.mx</ul>
    </div>
  
    <p>Dinamo© 2023 Todos los derechos reservados.</p>
</footer>
}