import React, { useEffect, useCallback } from 'react';
import styles from "../styles/stylesForPhoto.module.css"

export function Photo({ photo }) {
    const handleGetFields = useCallback(() => {
        const nameElement = document.getElementById(`name_${photo.id}`);
        nameElement.textContent = photo.name;
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [photo.id]);
    
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const handleGetImage = async (id) => {
        try {
          const response = await fetch(`https://pgbackend.onrender.com/api/photo/getImage/${id}`);
          const blob = await response.blob();
      
          const imageUrl = URL.createObjectURL(blob);
          const imageElement = document.getElementById(`image_${id}`);
          imageElement.src = imageUrl;
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      };

    
    
      useEffect(() => {
        handleGetFields();
        handleGetImage(photo.id);
      }, [handleGetFields, handleGetImage, photo.id]);
            


    return (
        <div className={styles.containerOfPhoto}>
            <img src={photo.url} alt="" className={styles.photo} id={`image_${photo.id}`} />
            <div className={styles.containerOfName} id={`name_${photo.id}`}></div>
        </div>
    )
}