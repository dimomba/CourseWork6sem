import styles from "../styles/stylesForProfile.module.css"
import React, { useState, useEffect } from 'react';
import { PhotoInprofile } from "./PhotoInProfile"
import { useNavigate } from 'react-router-dom';

export function Myprofile() {
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const handleGetUserdetails = () => {
            const accessToken = localStorage.getItem('token');
        if (!accessToken) {
            console.error('Access token is missing');
            return;
        }
      
        const headers = {
            'Authorization': 'Bearer ' + accessToken
        };
      
        fetch(`https://pgbackend.onrender.com/api/auth/getuserdetails`, {
            headers: headers
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(result => {
                setUserDetails(result); 
                console.log(result);
            })
            .catch(error => {
                console.error('Error checking photo ownership:', error);
            });
        }
    
        handleGetUserdetails();
    }, []);

    const user_id = userDetails ? userDetails.id : null;
    const [data, setData] = useState([]);
    const navigate = useNavigate();
  
    const handleGetAllUserPhotos = async () => {
        try {
            var url;
            console.log(user_id);
            if (user_id) {
              url = `https://pgbackend.onrender.com/api/photo/searchbyuserid/${user_id}`
            } else {
                return
            }
            const response = await fetch(url, {
                method: 'GET',
            });
            const result = await response.json();
  
            setData(result);
        } catch (error) {
            console.error('Error during the request:', error);
        }
    };

    const handleGoToPost = (id) => {
        navigate(`/post/${id}`);
    };
  
    useEffect(() => {
        if (user_id) {
            handleGetAllUserPhotos();
        }
    }, [user_id]);


    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        sessionStorage.setItem('pageReloaded', false);
    };

    return (
        <div className={styles.registration}>
            <form method="get" className={styles.formRegistration}>
                <div className={styles.header1Container}>
                    <div className={styles.header1}>Мои данные</div>
                </div>
                <div className={styles.gridTable}>

                    {userDetails && (
                        <div className={styles.gridTable}>
                            <div className={styles.stringContainer}>
                                <div className={styles.nameOfInput}>Имя пользователя:</div>
                                <input type="text" value={userDetails.username} placeholder="Имя *" className={`${styles.inputboxes} ${styles.name}`} required disabled />
                            </div>
                            <div className={styles.stringContainer}>
                                <div className={styles.nameOfInput}>Эл. почта:</div>
                                <input type="text" value={userDetails.email} placeholder="Адрес электронной почты *" className={`${styles.inputboxes} ${styles.email}`} required disabled />
                            </div>
                        </div>
                    )}

                </div>

                <br></br>
                <div className={styles.btnSubmitContainer}>
                    <div className={styles.loginBtnContainer}><a onClick={handleLogout} href="/search/" className={styles.loginBtn}>Выйти из профиля</a></div>
                </div>
            </form>
            <div className={styles.photoList}>
                <div className={styles.header11Container}>
                    <div className={styles.header1}>Публикации</div>
                </div>
                {data.map(photo => (
                    <div onClick={() => handleGoToPost(photo.id)} key={photo.id}>
                        <PhotoInprofile photo={photo} />
                    </div>
                ))}
            </div>
        </div>
    )
}
