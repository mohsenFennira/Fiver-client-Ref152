package com.example.pubfinder.controller;

import com.example.pubfinder.dto.*;
import com.example.pubfinder.model.Publication;
import com.example.pubfinder.service.PublicationIService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@CrossOrigin("**")
@RestController
@RequestMapping("/api/v1/publication/")
@Validated
public class PublicationController {
    @Autowired
    PublicationIService publicationIService;

    @PostMapping("/add")
    public PublicationDTO addPublication(@Valid @RequestBody PublicationAddDTO publicationAddDTO) {
        return publicationIService.addPublication(publicationAddDTO);
    }
    @GetMapping("/getPublications")
    public List<PublicationDTO> getPublications(){
        return publicationIService.getPublications();
    }
    @GetMapping("/getPublicationForAdmin")
    public ResponseEntity<ResponseModel<PublicationDTO>> getPublicationForAdmin(
            @RequestParam(required = false)int pageNo,
            @RequestParam(required = false)int size) {

        Pageable pageRequestData = PageRequest.of(pageNo - 1, size);
        ResponseModel<PublicationDTO> publications=publicationIService.getPublicationForAdmin(pageRequestData);
        return new ResponseEntity<>(publications, HttpStatus.PARTIAL_CONTENT);
    }
    @PutMapping("/updateStatusOfPostByAdmin")
    public PublicationDTO updateStatusOfPostByAdmin(@RequestBody PublicationAddDTO publicationAddDTO,@RequestParam long idPost) {
        return publicationIService.updateStatusOfPostByAdmin(publicationAddDTO, idPost);
    }
    @DeleteMapping("/deletePost")
    public ResponseDto deletePost(@RequestParam long idPost) {
        return publicationIService.deletePost(idPost);
    }

    @GetMapping("/getMyPublications")
    public List<PublicationDTO> getMyPublications() {
    return publicationIService.getMyPublications();
    }
    @PutMapping("/updatePubToAddImage")
    public PublicationDTO updatePubToAddImage(@RequestParam long pubId,@RequestParam MultipartFile image) throws IOException {
        return publicationIService.updatePubToAddImage(pubId, image);
    }
    @GetMapping("/getPublicationWithId")
    public PublicationDTO getPublicationWithId(@RequestParam long idPublication) {
        return publicationIService.getPublicationWithId(idPublication);
    }
    @GetMapping("/ListsOfProductByCategoryHomePage")
    public ResponseEntity<Map<String, List<PublicationDTO>>> ListsOfProductByCategoryHomePage() {
        return publicationIService.ListsOfProductByCategoryHomePage();
    }
    @GetMapping("/retreivePubByCountryAndCityAndCategory")
    public ResponseEntity<ResponseModel<PublicationDTO>> retreivePubByCountryAndCityAndCategory( @RequestParam(required = false)String country,
                                                                                 @RequestParam(required = false)String city,
                                                                                 @RequestParam(required = false)String category,
                                                                                 @RequestParam(required = false,defaultValue="1")int pageNo,
                                                                                 @RequestParam(required = false,defaultValue="10")int size
                                                                                 ) {
        Pageable pageRequestData = PageRequest.of(pageNo - 1, size);
        ResponseModel<PublicationDTO> searchedPub = this.publicationIService.retreivePubByCountryAndCityAndCategory(country, city, category,pageRequestData);
        return new ResponseEntity<>(searchedPub, HttpStatus.PARTIAL_CONTENT);
    }
    }