import styles from "../styles/stylesForProfile.module.css"
import React, { useState, useEffect } from 'react';
import { PhotoInprofile } from "./PhotoInProfile"
import { useNavigate, useParams } from 'react-router-dom';

export function Profile() {
    const { user_id } = useParams();
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    console.log(user_id);
    const handleGetAllUserPhotos = async () => {
        try {
            var url;
            if (user_id) {
              url = `https://pgbackend.onrender.com/api/photo/searchbyuserid/${user_id}`
            } else {
                return
            }
            const response = await fetch(url, {
                method: 'GET',
            });
            const result = await response.json();
  
            // Update the state with the fetched data
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

    return (
        <div className={styles.registration}>
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
