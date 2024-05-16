package com.example.photogalleryserver.repositories;

import com.example.photogalleryserver.models.Photo;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface PhotoRepository extends MongoRepository<Photo, String> {
    List<Photo> findPhotosByTags(String tags);
    List<Photo> findPhotosByUserid(String userid);
}
