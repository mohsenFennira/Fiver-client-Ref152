package com.example.pubfinder.service;

import com.example.pubfinder.dto.*;
import com.example.pubfinder.model.User;
import jakarta.mail.MessagingException;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface UserIService {
    public UserDTO createUserAccount(UserRegisterDTO userRegisterDTO) throws MessagingException;
    public UserDTO createUserAccountForAll(UserRegisterDTO userRegisterDTO) throws MessagingException;

    public UserDTO createUserByAdmin(UserRegisterDTO userRegisterDTO);
    public UserDTO createAdminAccount(UserRegisterDTO userRegisterDTO) throws MessagingException;

    public ResponseDto validateAccount(Long verificationCode) throws MessagingException;

    public JwtResponse login(String email);

    public ResponseDto forgotPassword(String email) throws MessagingException;
    public ResponseDto resetPassword(Long token, ResetPasswordRequest newPassword);

    public ResponseModel<UserDTO>  getUsers(Pageable pageable);
    public User getUserBySession();

    public UserUpdateProfile updateProfile(UserUpdateProfile userUpdateProfile, long idUser);

    public ResponseDto deleteUser(long idUser);

    public UserDTO getUserById(long idUser);

    public ResponseModel<UserDTO> getActiveUseerTodashbord(Pageable pageable);

    public ResponseEntity<Map<String, Long>> getStatistics();


    public ResponseDto logout(String email);


}
