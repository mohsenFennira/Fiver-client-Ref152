package com.example.pubfinder.service.impl;

import com.example.pubfinder.dao.mapper.PublicationMapper;
import com.example.pubfinder.dto.PublicationAddDTO;
import com.example.pubfinder.dto.PublicationDTO;
import com.example.pubfinder.dto.ResponseDto;
import com.example.pubfinder.dto.ResponseModel;
import com.example.pubfinder.model.Publication;
import com.example.pubfinder.model.User;
import com.example.pubfinder.repository.PublicationRepositroy;
import com.example.pubfinder.service.PublicationIService;
import com.example.pubfinder.specifications.PublicationSpecification;
import com.example.pubfinder.utility.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PublicationService implements PublicationIService {
    @Autowired
    PublicationRepositroy publicationRepositroy;
    @Autowired
    PublicationMapper publicationMapper;
    @Autowired
    SessionService sessionService;
    @Autowired
    ResponseUtil responseUtil;
    @Override
    public PublicationDTO addPublication(PublicationAddDTO publicationAddDTO) {
        User user=sessionService.getUserBySession().get();
        System.out.println(user.getEmail());
        Publication publication=publicationMapper.mapToPublication(publicationAddDTO);
        publication.setCreatedAt(LocalDateTime.now());
        publication.setEnabled(false);
        publication.setUser(user);
        publicationRepositroy.save(publication);
        return publicationMapper.mapToPublicationDTO(publication);
    }

    @Override
    public PublicationDTO updatePubToAddImage(@RequestParam long pubId, @RequestParam MultipartFile image) throws IOException {
        Publication publication=publicationRepositroy.findById(pubId).get();
        publication.setImage(image.getBytes());
        publicationRepositroy.save(publication);
        return publicationMapper.mapToPublicationDTO(publication);
    }

    @Override
    public List<PublicationDTO> getPublications() {
        // Retrieve publications from the repository
        List<Publication> publications = (List<Publication>) publicationRepositroy.findAll();

        // Sort publications by created date in descending order
        Collections.sort(publications, Comparator.comparing(Publication::getCreatedAt).reversed());

        // Map sorted publications to DTOs
        List<PublicationDTO> publicationDTOS = new ArrayList<>();
        for (Publication p : publications) {
            publicationDTOS.add(publicationMapper.mapToPublicationDTO(p));
        }
        return publicationDTOS;
    }

    @Override
    public  ResponseModel<PublicationDTO> getPublicationForAdmin(Pageable pageable){
        Page<Publication> publications=publicationRepositroy.findAll(pageable);
        return buildResponse(publications);
    }

    @Override
    public PublicationDTO updateStatusOfPostByAdmin(PublicationAddDTO publicationAddDTO,long idPost) {
        Publication publication=publicationRepositroy.findById(idPost).get();
        if(publicationAddDTO.isEnabled()) {
            publication.setEnabled(true);
            publicationRepositroy.save(publication);
        }
        else{
            publication.setEnabled(false);
            publicationRepositroy.save(publication);
        }
        return publicationMapper.mapToPublicationDTO(publication);
    }

    @Override
    public ResponseDto deletePost(long idPost) {
        publicationRepositroy.deleteById(idPost);
        return responseUtil.createResponse("post deleted", "SUCCESS", "Your post deleted with succes.");
    }

    @Override
    public List<PublicationDTO> getMyPublications() {
        User user=sessionService.getUserBySession().get();
        List<Publication> publications=publicationRepositroy.findMyPubl(user.getIdUser());
        List<PublicationDTO> publicationDTOS=new ArrayList<>();
        for (Publication p:publications) {
            publicationDTOS.add(publicationMapper.mapToPublicationDTO(p));
        }
        return publicationDTOS;
    }

    @Override
    public PublicationDTO getPublicationWithId(long idPublication) {
        Publication publication=publicationRepositroy.findById(idPublication).get();
        return publicationMapper.mapToPublicationDTO(publication);
    }
    private PublicationDTO convertToDto(Publication publication) {
          PublicationDTO publicationDTO=publicationMapper.mapToPublicationDTO(publication);
          return  publicationDTO;
    }
    @Override
    public ResponseEntity<Map<String, List<PublicationDTO>>> ListsOfProductByCategoryHomePage() {
        Map<String, List<PublicationDTO>> listProduct = new HashMap<>();
        Page<Publication> pageByCategoryProduct = publicationRepositroy.findPubByCategoryProduct(PageRequest.of(0, 4));
        Page<Publication> pageByCategoryClothes = publicationRepositroy.findPubByCategoryClothes(PageRequest.of(0, 4));
        Page<Publication> pageByCategoryFoods = publicationRepositroy.findPubByCategoryFoods(PageRequest.of(0, 4));
        Page<Publication> pageByCategoryServices = publicationRepositroy.findPubByCategoryServices(PageRequest.of(0, 4));
        Page<Publication> pageByAll = publicationRepositroy.findPubAll(PageRequest.of(0, 8));


        // Convert the retrieved publications to PublicationDTO objects
        List<PublicationDTO> allproductDTOs = pageByAll.getContent().stream()
                .map(this::convertToDto) // Assuming you have a method to convert Publication to PublicationDTO
                .collect(Collectors.toList());
        // Convert the retrieved publications to PublicationDTO objects
        List<PublicationDTO> productDTOs = pageByCategoryProduct.getContent().stream()
                .map(this::convertToDto) // Assuming you have a method to convert Publication to PublicationDTO
                .collect(Collectors.toList());
        // Convert the retrieved publications to PublicationDTO objects
        List<PublicationDTO> productDTOsByClothes = pageByCategoryClothes.getContent().stream()
                .map(this::convertToDto) // Assuming you have a method to convert Publication to PublicationDTO
                .collect(Collectors.toList());
        // Convert the retrieved publications to PublicationDTO objects
        List<PublicationDTO> productDTOsByFoods = pageByCategoryFoods.getContent().stream()
                .map(this::convertToDto) // Assuming you have a method to convert Publication to PublicationDTO
                .collect(Collectors.toList());
        // Convert the retrieved publications to PublicationDTO objects
        List<PublicationDTO> productDTOsByServices = pageByCategoryServices.getContent().stream()
                .map(this::convertToDto) // Assuming you have a method to convert Publication to PublicationDTO
                .collect(Collectors.toList());
        listProduct.put("Product", productDTOs);
        listProduct.put("Clothes", productDTOsByClothes);
        listProduct.put("Foods",  productDTOsByFoods);
        listProduct.put("Services",  productDTOsByServices);
        listProduct.put("all8Products",  allproductDTOs);
        return ResponseEntity.ok(listProduct);
    }

    @Override
    public ResponseModel<PublicationDTO> retreivePubByCountryAndCityAndCategory(String country, String city, String category, Pageable pageable) {
       final Specification<Publication> specification = PublicationSpecification.searchPublicationByManyConditions(country,city,category,true);
       Page<Publication> publcationList;
        publcationList = this.publicationRepositroy.findAll(specification, pageable);
        return buildResponse(publcationList);
    }
    private ResponseModel<PublicationDTO> buildResponse(Page<Publication> pubPage) {
        List<PublicationDTO> listOfPub = pubPage.toList()
                .stream()
                .map(publicationMapper::mapToPublicationDTO)
                .collect(Collectors.toList());

        return ResponseModel.<PublicationDTO>builder()
                .pageNo(pubPage.getNumber())
                .pageSize(pubPage.getSize())
                .totalElements(pubPage.getTotalElements())
                .totalPages(pubPage.getTotalPages())
                .data(listOfPub)
                .isLastPage(pubPage.isLast())
                .build();
    }
}
