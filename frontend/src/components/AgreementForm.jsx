import React from 'react';
import { connect } from 'react-redux';
import { toggleCheckbox } from '../actions';
import { useNavigate } from 'react-router-dom';
import styles from "../styles/stylesForAgreementForm.module.css"

function AgreementForm({ isChecked, toggleCheckbox }) {
    const navigate = useNavigate();
    console.log(localStorage.getItem('token'));
  const handleSubmit = (event) => {
    event.preventDefault();

    navigate(`/search/`);
    console.log("Соглашение принято!");
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className={styles.termsText}>
            <div className={styles.centerContainer}>
                <h1 className={styles.h1}>Пользовательское соглашение для использования фотогалереи</h1>
            </div>

            <h2 className={styles.h2}>Добро пожаловать в нашу фотогалерею! Прежде чем продолжить использование этого сайта, пожалуйста, внимательно прочтите и примите следующие условия использования.</h2>

            <h3 className={styles.h3}>1. Права на фотографии:</h3>

            <div className={styles.textItem}>Все фотографии, представленные на этом сайте, являются собственностью и авторскими правами их владельцев.
            Пользователи не имеют права использовать, копировать, воспроизводить, перерабатывать или распространять фотографии без разрешения их владельцев.</div>


            <h3 className={styles.h3}>2. Поведение пользователей:</h3>

            <div className={styles.textItem}>При использовании фотогалереи пользователи обязуются соблюдать законы и нормы приличия.
            Запрещается размещать на сайте контент, который может быть оскорбительным, непристойным, нарушающим законы о защите авторских прав или иным образом противоречить общепринятым правилам этики.</div>


            <h3 className={styles.h3}>3. Ответственность:</h3>

            <div className={styles.textItem}>Администрация сайта не несет ответственности за контент, предоставленный пользователями.
            Пользователи несут ответственность за любой контент, который они размещают на сайте, включая фотографии и комментарии.</div>


            <h3 className={styles.h3}>4. Конфиденциальность:</h3>

            <div className={styles.textItem}>Личная информация пользователей, предоставленная при использовании сайта, будет храниться и использоваться в соответствии с нашей политикой конфиденциальности.</div>


            <h3 className={styles.h3}>5. Изменения в соглашении:</h3>

            <div className={styles.textItem}>Администрация оставляет за собой право вносить изменения в это пользовательское соглашение без предварительного уведомления. Пользователи обязуются регулярно проверять наличие изменений.</div>
            
            <h3 className={styles.h3}>Продолжая использовать этот сайт, вы подтверждаете, что прочитали и согласны с условиями этого пользовательского соглашения.</h3>

            <h3 className={styles.h3}>Последнее обновление: 10.04.2024</h3>
        </div>
      
        <div className={styles.centerContainer}>
            {/* <div> */}
                <label className={styles.labelOfCheckbox}>
                    <input className={styles.checkbox}
                    type="checkbox"
                    checked={isChecked}
                    onChange={toggleCheckbox}
                    />
                    Я принимаю пользовательское соглашение
                </label>
            {/* </div>
            <div> */}
                <button className={styles.button} type="submit" disabled={!isChecked}>
                    Подтвердить
                </button>
            {/* </div> */}
        </div>
    </form>
  );
}

const mapStateToProps = (state) => ({
  isChecked: state.isChecked
});

const mapDispatchToProps = {
  toggleCheckbox
};

export default connect(mapStateToProps, mapDispatchToProps)(AgreementForm);