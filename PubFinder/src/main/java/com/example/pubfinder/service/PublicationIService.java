package com.example.pubfinder.service;

import com.example.pubfinder.dto.PublicationAddDTO;
import com.example.pubfinder.dto.PublicationDTO;
import com.example.pubfinder.dto.ResponseDto;
import com.example.pubfinder.dto.ResponseModel;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface PublicationIService {
 public PublicationDTO addPublication(PublicationAddDTO publicationAddDTO);
 public PublicationDTO updatePubToAddImage(@RequestParam long pubId, @RequestParam MultipartFile image) throws IOException ;

 public List<PublicationDTO> getPublications();

 public  ResponseModel<PublicationDTO> getPublicationForAdmin(Pageable pageable);

 public PublicationDTO updateStatusOfPostByAdmin(PublicationAddDTO publicationAddDTO,long idPost);

 public ResponseDto deletePost(long idPost);

 public List<PublicationDTO> getMyPublications();

 public PublicationDTO getPublicationWithId(long idPublication);

 public ResponseEntity<Map<String, List<PublicationDTO>>> ListsOfProductByCategoryHomePage();

 public ResponseModel<PublicationDTO> retreivePubByCountryAndCityAndCategory(String country, String city, String category, Pageable pageable);


}
