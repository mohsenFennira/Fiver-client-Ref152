package com.example.pubfinder.dao.mapper;

import com.example.pubfinder.dto.PublicationAddDTO;
import com.example.pubfinder.dto.PublicationDTO;
import com.example.pubfinder.dto.UserRegisterDTO;
import com.example.pubfinder.model.Publication;
import com.example.pubfinder.model.User;
import lombok.Getter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Getter
public class PublicationMapper {
    @Autowired
    private ModelMapper modelMapper;

    public PublicationDTO mapToPublicationDTO(Publication publication){
        return modelMapper.map(publication,PublicationDTO.class);
    }

    public Publication mapToPublication(PublicationAddDTO publicationAddDTO){
        return  modelMapper.map(publicationAddDTO,Publication.class);
    }


}
