package com.example.photogalleryserver.controllers;

import com.example.photogalleryserver.models.Photo;
import com.example.photogalleryserver.security.jwt.AuthTokenFilter;
import com.example.photogalleryserver.security.jwt.JwtUtils;
import com.example.photogalleryserver.security.services.UserDetailsServiceImpl;
import com.example.photogalleryserver.services.PhotoService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.util.Base64;
import java.util.List;
import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;



@RestController
@RequestMapping("/api/photo")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PhotoController {
    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private AuthTokenFilter authTokenFilter;
    private final PhotoService photoService;
    public PhotoController(PhotoService photoService) {
        this.photoService = photoService;
    }


    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity addPhoto(
            @RequestParam("name") String name,
            @RequestParam("tags") String tags,
            @RequestParam("description") String description,
            @RequestParam("user_id") String user_id,
            @RequestParam("file") MultipartFile file
    ) {
        try {
            Photo photo = new Photo(name, tags, description, user_id, file);
            photoService.addPhoto(photo);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing the file");
        }
    }


    @PutMapping
    public ResponseEntity updatePhoto(@RequestBody Photo photo) {
        photoService.updatePhoto(photo);
        return ResponseEntity.ok().build();
    }
    @GetMapping
    public ResponseEntity<List<Photo>> getAllPhotos() {
        return ResponseEntity.ok(photoService.getAllPhotos());
    }

    @GetMapping("/getPost/{id}")
    public ResponseEntity<Map<String, Object>> getFieldsById(@PathVariable String id) {
        Photo photo = photoService.getPhotoById(id);
        Map<String, Object> response = new HashMap<>();
        response.put("name", photo.getName());
        response.put("tags", photo.getTags());
        response.put("description", photo.getDescription());
        response.put("username", userDetailsService.getUsernameByUserId(photo.getUserid()));
        response.put("image", Base64.getEncoder().encodeToString(photo.getBytes()));
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/getImage/{id}")
    public ResponseEntity<?> getImageById(@PathVariable String id) {
        Photo photo = photoService.getPhotoById(id);
        return ResponseEntity.ok()
                .contentType(MediaType.valueOf(photo.getContentType()))
                .body(new InputStreamResource(new ByteArrayInputStream(photo.getBytes())));
    }

    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity deletePhoto(@PathVariable String id, HttpServletRequest request) {
        String jwt = authTokenFilter.parseJwt(request);
        if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
            String username = jwtUtils.getUserNameFromJwtToken(jwt);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            if (userDetails.getUsername().equals(userDetailsService.getUsernameByUserId(
                    photoService.getPhotoById(id).getUserid())))  {
                photoService.deletePhoto(id);
            } else if ((userDetails.getAuthorities().stream().anyMatch(r -> r.getAuthority().equals("ROLE_ADMIN")))) {
                photoService.deletePhoto(id);
            }
        }
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @GetMapping("/isityourphoto/{id}")
    public Boolean isItYourPhoto(@PathVariable String id, HttpServletRequest request) {
        String jwt = authTokenFilter.parseJwt(request);
        if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
            String username = jwtUtils.getUserNameFromJwtToken(jwt);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            if (userDetails.getAuthorities().stream().anyMatch(r -> r.getAuthority().equals("ROLE_ADMIN"))) {
                return true;
            }
            return userDetails.getUsername().equals(userDetailsService.getUsernameByUserId(
                    photoService.getPhotoById(id).getUserid()));
        }
        return false;
    }

    @GetMapping("/search/{tags}")
    public ResponseEntity<List<Photo>> getPhotosByTags(@PathVariable String tags) {
        try {
            List<Photo> photos = photoService.findPhotosByTags(tags);
            return ResponseEntity.ok().body(photos);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/searchbyuserid/{userid}")
    public ResponseEntity<List<Photo>> getPhotosByUserid(@PathVariable String userid) {
        try {
            List<Photo> photos = photoService.findPhotosByUserid(userid);
            return ResponseEntity.ok().body(photos);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
