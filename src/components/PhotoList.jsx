import { Photo } from "./Photo"
import styles from "../styles/stylesForPhotoList.module.css"
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function PhotoList() {
    const { tags } = useParams();
    const [data, setData] = useState([]);
    const navigate = useNavigate();
  
    const handleSubmit = async () => {
        try {
            var url;
            if (tags) {
              url = `https://pgbackend.onrender.com/api/photo/search/${tags}`
            } else {
              url = `https://pgbackend.onrender.com/api/photo`
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
        handleSubmit();
    }, [tags]);

    return (
        <div className={styles.photoList}>
            {data.map(photo => (
                <div onClick={() => handleGoToPost(photo.id)} key={photo.id}>
                    <Photo photo={photo} />
                </div>
            ))}
        </div>
    )
}
