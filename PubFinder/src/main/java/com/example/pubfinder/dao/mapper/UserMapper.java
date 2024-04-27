package com.example.pubfinder.dao.mapper;

import com.example.pubfinder.dto.UserDTO;
import com.example.pubfinder.dto.UserRegisterDTO;
import com.example.pubfinder.dto.UserResponse;
import com.example.pubfinder.dto.UserUpdateProfile;
import com.example.pubfinder.model.User;
import lombok.Getter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Getter
public class UserMapper {

    @Autowired
    private ModelMapper modelMapper;

    // convert User Jpa Entity into UserDTO
    public UserDTO mapToUserDto(User user) {
        return modelMapper.map(user, UserDTO.class);
    }

    // Convert UserDTO to User JPA Entity
    public User mapToUser(UserRegisterDTO userRegisterDTO) {
        return modelMapper.map(userRegisterDTO, User.class);
    }
    public User mapToUserUpdateProfile(UserUpdateProfile userUpdateProfile) {
        return modelMapper.map(userUpdateProfile, User.class);
    }

    // Convert UserDTO to User JPA Entity
    public UserResponse mapToUserResponse(User user) {
        return modelMapper.map(user, UserResponse.class);
    }
}
