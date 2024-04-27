package com.example.pubfinder.controller;

import com.example.pubfinder.dto.*;
import com.example.pubfinder.exception.UserServiceCustomException;
import com.example.pubfinder.model.User;
import com.example.pubfinder.service.UserIService;
import com.example.pubfinder.service.impl.SessionService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin("**")
@RestController
@RequestMapping("/api/v1/auth/")
@Validated
public class UserController {
    @Autowired
    SessionService sessionService;
    @Autowired
    UserIService userIService;
    @Autowired
    AuthenticationManager authenticationManager;

    @PostMapping("/user/register")
    public UserDTO createUserAccount(@Valid  @RequestBody UserRegisterDTO userRegisterDTO) throws MessagingException {
        return userIService.createUserAccount(userRegisterDTO);
    }
    @PostMapping("/admin/register")
    public UserDTO createAdminAccount(@Valid  @RequestBody UserRegisterDTO userRegisterDTO) throws MessagingException {
        return userIService.createAdminAccount(userRegisterDTO);
    }
    @PutMapping("/validateAccount/{verificationCode}")
    public ResponseDto validateAccount(@PathVariable Long verificationCode) throws MessagingException {
        return userIService.validateAccount(verificationCode);
    }
    @PostMapping("/token")
    public JwtResponse login(@Valid @RequestBody LoginRequestDTO loginData) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginData.getEmail(), loginData.getPassword()));
            return userIService.login(loginData.getEmail());
        } catch (AuthenticationException e) {
            throw new UserServiceCustomException("Invalid Information", "BAD_LOGIN_CREDENTIALS");
        }
    }
    @PostMapping("/forgotPassword")
    public ResponseDto forgotPassword( @NotBlank(message = "Invalid Email: Empty Email")
                                           @NotNull(message = "Invalid Email: Email is NULL")
                                           @Email(message = "Invalid email")
                                           @RequestParam String email) throws MessagingException {
        return userIService.forgotPassword(email);
    }
    @PutMapping("/resetPassword/{token}")
    public ResponseDto resetPassword(@PathVariable Long token,@RequestBody ResetPasswordRequest  newPassword) {
        return userIService.resetPassword(token, newPassword);
    }
    @GetMapping("/getUsers")
    public ResponseEntity<ResponseModel<UserDTO>> getUsers(
            @RequestParam(required = false,defaultValue="1")int pageNo,
            @RequestParam(required = false,defaultValue="10")int size) {
        Pageable pageRequestData = PageRequest.of(pageNo - 1, size);
        ResponseModel<UserDTO> usersActive=userIService.getUsers(pageRequestData);
        return new ResponseEntity<>(usersActive, HttpStatus.PARTIAL_CONTENT);
    }
    @GetMapping("/getUserinSession")
    public User getUserBySession(){
        return userIService.getUserBySession();
    }

    @GetMapping("/getUserBySession")
    public User storeData() {
        return sessionService.getUserBySession().get();
    }

    @PostMapping("/createUserByAdmin")
    public UserDTO createUserByAdmin(@Valid @RequestBody UserRegisterDTO userRegisterDTO) {
        return userIService.createUserByAdmin(userRegisterDTO);
    }
    @PostMapping("/register")
    public UserDTO createUserAccountForAll(@Valid @RequestBody UserRegisterDTO userRegisterDTO) throws MessagingException {
        return userIService.createUserAccountForAll(userRegisterDTO);
    }
        @DeleteMapping("/delete")
    public ResponseDto deleteUser(@RequestParam long idUser) {
        return userIService.deleteUser(idUser);
    }
    @PutMapping("/update")
    public UserUpdateProfile updateProfile(@Valid @RequestBody UserUpdateProfile userUpdateProfile,@RequestParam long idUser) {
        return userIService.updateProfile(userUpdateProfile, idUser);
    }
    @GetMapping("/getUserById")
    public UserDTO getUserById(@RequestParam long idUser) {
         return userIService.getUserById(idUser);
    }
    @GetMapping("/getActiveUsers")
    public ResponseEntity<ResponseModel<UserDTO>>  getActiveUseerTodashbord(
            @RequestParam(required = false,defaultValue="1")int pageNo,
            @RequestParam(required = false,defaultValue="10")int size) {
        Pageable pageRequestData = PageRequest.of(pageNo - 1, size);
        ResponseModel<UserDTO> usersActive=userIService.getActiveUseerTodashbord(pageRequestData);
        return new ResponseEntity<>(usersActive, HttpStatus.PARTIAL_CONTENT);
    }
    @GetMapping("/getStatistics")
    public ResponseEntity<Map<String, Long>> getStatistics() {
        return userIService.getStatistics();
    }

    @PutMapping("/logout")
    public ResponseDto logout(@RequestParam String email) {
        return userIService.logout(email);
    }
    }
