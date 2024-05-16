import styles from "../styles/stylesForFooter.module.css"
import iconphone from "../images/iconphone.png"
import iconemail from "../images/iconemail.png"

export function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.container}>
                <div className={`${styles.unit} ${styles.about}`}>
                    <div className={`${styles.headeraboutus} ${styles.h2}`}>О нас</div>
                    <div>Фотогалерея — социальный интернет-сервис, фотохостинг, позволяющий пользователям добавлять в режиме онлайн изображения и просматривать чужие публикации.</div>
                </div>

                <div className={`${styles.unit} ${styles.services}`}>
                    <div className={`${styles.headerinfoinfooter} ${styles.h2}`}><a href="/upload">Загрузить свое фото</a></div>
                    <div>Для публикации своего фото Вам необходимо быть зарегистрированным, войти в аккаунт, затем загрузить фото, указать название, описание и теги к изображению.</div>
                </div>

                <div className={`${styles.unit} ${styles.adressinfooter}`}>
                    <div className={`${styles.headercontactsinfooter} ${styles.h2}`}>Контакты</div>
                    <div className={styles.phonenumber}><img src={iconphone} alt=""/><a href="tel:+7(3452)29-11-00">+7 (3452) 29-11-00</a></div>
                    <div className={styles.mail}><img src={iconemail} alt=""/><a href="mailto:info@gallery.ru">info@gallery.ru</a></div>
                </div>
            </div>
        </div>
    )
}