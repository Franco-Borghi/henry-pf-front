import FB from "../Footer/fb.png"
import IG from "../Footer/ig.png"
import WPP from "../Footer/wpp.png"
import DN from "../Footer/dinamo.png"
import {Link} from "react-router-dom"
import styles from './Footer.module.scss'

export default function Footer(){
    return (
        <footer className={styles.footer}>
            <section>
                <div className={styles['logo-container']}>
                    <Link to="/home">
                        <img src={DN} alt="logo Dinamo"></img>
                    </Link>
                </div>
                
                <div className={styles['links']}>
                    <Link to="/home">Home</Link>
                    <a href="https://www.dinamotos.mx/wp-content/uploads/2016/08/terminos-y-condiciones-DINAMO.pdf">Términos y condiciones</a>
                    <a href="https://www.dinamotos.mx/wp-content/uploads/2016/08/aviso-privacidad-DINAMO.pdf">Política de privacidad</a>
                </div>
            
                <div className={styles['contact-us']}>
                    <a>Contact us</a>
                        <div className={styles.icons}>
                            <a href="https://www.facebook.com/dinamotocicletas/"><img src={FB} alt="link to facebook"></img></a>
                            <a href="https://www.instagram.com/dinamotocicletas/?hl=es"><img src={IG} alt="link to instagram"></img></a>
                            <a href=""><img src={WPP} alt="link to whatsapp"></img></a>
                        </div>
                    <p>Correo electrónico: motos@dinamo.com.mx</p>
                </div>
            </section>

            <section>
                <p style={{ color: '#fff' }}>Dinamo© 2023 Todos los derechos reservados.</p>
            </section>
        </footer>
    )
}
