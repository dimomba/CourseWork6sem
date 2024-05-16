package com.example.photogalleryserver.services;

import com.example.photogalleryserver.models.Photo;
import com.example.photogalleryserver.repositories.PhotoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PhotoService {
    private final PhotoRepository photoRepository;
    public PhotoService(PhotoRepository photoRepository) {
        this.photoRepository = photoRepository;
    }
    public void addPhoto(Photo photo) {
        photoRepository.insert(photo);
    }
    public void updatePhoto(Photo photo) {
        Photo savedPhoto = photoRepository.findById(photo.getId())
                .orElseThrow(() -> new RuntimeException(
                        String.format("Cannot find photo by ID %s", photo.getId())));

        savedPhoto.setName(photo.getName());
        savedPhoto.setTags(photo.getTags());
        savedPhoto.setDescription(photo.getDescription());

        photoRepository.save(savedPhoto);
    }
    public List<Photo> getAllPhotos() {
        return photoRepository.findAll();
    }

    public Photo getPhotoById(String id) {
        Optional<Photo> photo = photoRepository.findById(id);
        Photo photo1 = photo.orElse(null);
        return photo1;
    }

    public List<Photo> findPhotosByTags(String tags) {
        return photoRepository.findPhotosByTags(tags);
    }

    public List<Photo> findPhotosByUserid(String userid) {
        return photoRepository.findPhotosByUserid(userid);
    }

    public void deletePhoto(String id) {
        photoRepository.deleteById(id);
    }
}
