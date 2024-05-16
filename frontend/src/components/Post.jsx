import styles from "../styles/stylesForPost.module.css"
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';




export function Post() {

  const { idPost } = useParams();

const handleGetPost = useCallback(() => {
  return new Promise((resolve, reject) => {
    fetch(`https://pgbackend.onrender.com/api/photo/getPost/${idPost}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(photo => {
        const name1 = document.getElementById('name');
        name1.textContent = photo.name;

        const tags1 = document.getElementById('tags');
        tags1.textContent = photo.tags;

        const description1 = document.getElementById('description');
        description1.textContent = photo.description;

        const username1 = document.getElementById('username');
        username1.textContent = "Автор: " + photo.username;

        // Декодируем base64 и устанавливаем изображение
        const imageElement = document.getElementById('image');
        imageElement.src = `data:image/jpeg;base64, ${photo.image}`;

        resolve();
      })
      .catch(error => {
        console.error('Error fetching photo:', error);
        reject(error);
      });
  });
}, [idPost]);

const navigate = useNavigate();

const [isYourPhoto, setIsYourPhoto] = useState(false); 
const handleDelete = async () => {
  try {
    const accessToken = localStorage.getItem('token');
        if (!accessToken) {
            console.error('Access token is missing');
            return;
        }

        // Добавляем токен в заголовок запроса
        const headers = {
            'Authorization': 'Bearer ' + accessToken
        };

    const response = await fetch(`https://pgbackend.onrender.com/api/photo/${idPost}`, {
      method: 'DELETE',
      headers: headers
    });

    if (response.ok) {

      // Перенаправление пользователя после успешного удаления
      navigate(`/search/`);
    } else {
      console.error('Failed to delete photo. HTTP status:', response.status);
    }
  } catch (error) {
    console.error('Error during delete request:', error);
  }
};

const handleGoToUser = async () => {
  try {
    const username1 = document.getElementById('username');
    const fullText = username1.textContent;
    const searchString = 'Автор: ';
    const index = fullText.indexOf(searchString);
    const username = fullText.slice(index + searchString.length);

    const response = await fetch(`https://pgbackend.onrender.com/api/auth/getuserid/${username}`, {
      method: 'GET'
    });

    if (response.ok) {
      const userId = await response.text(); // Получить user_id из ответа
      navigate(`/user/${userId}`); // Перенаправление на пользователя
  } else {
      console.error('Failed to get user_id. HTTP status:', response.status);
  }
  } catch (error) {
    console.error('Error during delete request:', error);
  }
};

const handleCheckOwnership = useCallback(() => {
  const accessToken = localStorage.getItem('token');
  if (!accessToken) {
      console.error('Access token is missing');
      return;
  }

  // Добавляем токен в заголовок запроса
  const headers = {
      'Authorization': 'Bearer ' + accessToken
  };

  fetch(`https://pgbackend.onrender.com/api/photo/isityourphoto/${idPost}`, {
      headers: headers
  })
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
      })
      .then(result => {
          setIsYourPhoto(result); // Обновляем состояние в соответствии с результатом проверки
      })
      .catch(error => {
          console.error('Error checking photo ownership:', error);
      });
}, [idPost]);

useEffect(() => {
  handleGetPost();
  handleCheckOwnership(); // Проверяем принадлежность фотографии текущему пользователю при загрузке компонента
}, [handleGetPost, handleCheckOwnership]);

    return (
        <div className={styles.upload}>
            <form method="get" className={styles.formUpload} id="form" encType="multipart/form-data">
                <div className={styles.header1Container}>
                    <div id="name" className={styles.header1}></div>
                </div>
                <div className={styles.gridTable}>
                  
                    <div id="photoContainer" className={styles.photoInputContainer}>
                        <img id="image" alt="img" />
                    </div>

                    <div id="tags" className={`${styles.inputboxes} ${styles.tags}`}></div>

                    <div id="description" className={styles.note}></div>

                    <div id="username" className={`${styles.inputboxes} ${styles.username}`} onClick={handleGoToUser}></div>
                </div>
            </form>
      {isYourPhoto && (
        <div className={styles.btnSubmitContainer}>
          <button className={styles.btnSubmit} onClick={handleDelete}>Удалить публикацию</button>
        </div>
      )}
        </div>
    )
}