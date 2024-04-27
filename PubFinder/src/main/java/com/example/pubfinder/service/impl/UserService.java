package com.example.pubfinder.service.impl;

import com.example.pubfinder.config.AuthenticationConstants;
import com.example.pubfinder.dao.mapper.UserMapper;
import com.example.pubfinder.dto.*;
import com.example.pubfinder.exception.UserServiceCustomException;
import com.example.pubfinder.model.Publication;
import com.example.pubfinder.model.User;
import com.example.pubfinder.model.enume.RoleType;
import com.example.pubfinder.repository.PublicationRepositroy;
import com.example.pubfinder.repository.UserRepository;
import com.example.pubfinder.service.UserIService;
import com.example.pubfinder.utility.EmailUtility;
import com.example.pubfinder.utility.ResponseUtil;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserService implements UserIService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    JWTService jwtService;
    @Autowired
    UserMapper userMapper;
    @Autowired
    private EmailUtility emailUtility;

    @Autowired
    private ResponseUtil responseUtil;

    @Autowired
    private SessionService sessionService;
    @Autowired
    private PublicationRepositroy publicationRepositroy;


    private Random random = new Random();

    @Override
    public UserDTO createUserAccount(UserRegisterDTO userRegisterDTO) throws MessagingException {
        if(userRegisterDTO.getRoleTypes()!= RoleType.USER){
            throw new UserServiceCustomException("Unsupported role type", "UNSUPPORTED_ROLE_TYPE",
                    HttpStatus.BAD_REQUEST);
        }
        userRegisterDTO.setRoleTypes(RoleType.USER);
        return createAccount(userRegisterDTO,RoleType.USER);
    }

    @Override
    public UserDTO createUserAccountForAll(UserRegisterDTO userRegisterDTO) throws MessagingException {
        return createAccount(userRegisterDTO,userRegisterDTO.getRoleTypes());
    }

    @Override
    public UserDTO createUserByAdmin(UserRegisterDTO userRegisterDTO) {
        User user=userMapper.mapToUser(userRegisterDTO);
        user.setCreationDate(Instant.now());
        user.setValidated(true);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return userMapper.mapToUserDto(user);
    }

    @Override
    public UserDTO createAdminAccount(UserRegisterDTO userRegisterDTO) throws MessagingException {
        if(userRegisterDTO.getRoleTypes()!= RoleType.ADMIN){
            throw new UserServiceCustomException("Unsupported role type", "UNSUPPORTED_ROLE_TYPE",
                    HttpStatus.BAD_REQUEST);
        }
        userRegisterDTO.setRoleTypes(RoleType.ADMIN);
        return createAccount(userRegisterDTO,RoleType.ADMIN);
    }

    @Override
    public ResponseDto validateAccount(Long verificationCode) throws MessagingException {
        User user=userRepository.findByTokenToValidate(verificationCode);
        if (Boolean.FALSE.equals(user.getTokenToValidate()) && !user.getTokenToValidate().equals(verificationCode)) {
            throw new UserServiceCustomException("Invalid verification code!", "INVALID_CODE");
        }
        if (isTokenExpired(user.getValidateCodeCreationDate())) {
            user.setTokenToValidate(generateOTPToSend());
            user.setValidateCodeCreationDate(LocalDateTime.now());
            user = userRepository.save(user);
            emailUtility.sendVerificationEmail(user.getEmail(), user.getFirstName(), user.getTokenToValidate(),
                    user.getRoleTypes());
            return responseUtil.createResponse("Current token experied!! Sent a new Token", "SUCCESS",
                    "Check your email :" + user.getEmail()
                            + " and OTP token to reset your password. If you didn't receive contact support team.");
        }
        if (Boolean.TRUE.equals(user.getTokenToValidate())) {
            return responseUtil.createResponse("Your account is already validated", "SUCCESS",
                    "Account already validated");
        }
        user.setValidated(true);
        user.setTokenToValidate(null);
        userRepository.save(user);
        return responseUtil.createResponse("Your account is validated", "SUCCESS", "Account validated successfully");
    }

    @Override
    public JwtResponse login(String email) {
        String token = null;
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new UserServiceCustomException("No user found with this email:" + email, "User_Not_Found"));
        if (!user.isValidated()) {
            throw new UserServiceCustomException("You need to validate your account first and check your email",
                    "ACCOUNT_NOT_VALID", HttpStatus.FORBIDDEN);
        } else {
            token = jwtService.generateToken(email);
            UserResponse userResponse = userMapper.mapToUserResponse(user);
            user.setActiveUser(true);
            userRepository.save(user);
            return new JwtResponse(userResponse, token);
        }
    }

    @Override
    public ResponseDto forgotPassword(String email) throws MessagingException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserServiceCustomException("No user found with this email: " + email,
                        "USER_NOT_FOUND", HttpStatus.NOT_FOUND));
        if (Boolean.FALSE.equals(user.isValidated())) {
            throw new UserServiceCustomException("You need to validate your account first.",
                    "ACCOUNT_NOT_VALID", HttpStatus.FORBIDDEN);
        }
        if (user.getTokenToForgotPassword() != null && !isTokenExpired(user.getTokenToForgotPasswordCreationDate())) {
            return responseUtil.createResponse("Your forgot password OTP was already sent", "OTP_ALREADY_SENT",
                    "Check your email :" + email + "and OTP token to reset your password");
        }

        user.setTokenToForgotPassword(generateOTPToSend());
        user.setTokenToForgotPasswordCreationDate(LocalDateTime.now());
        user = userRepository.save(user);
        emailUtility.sendForgetPasswordEmail(user.getEmail(), user.getFirstName(), user.getTokenToForgotPassword());
        return responseUtil.createResponse("Your Token is successfully sended", "SUCCESS",
                "Check your email :" + email + "and OTP token to reset your password");
    }

    @Override
    public ResponseDto resetPassword(Long token, ResetPasswordRequest newPassword) {
        User user=userRepository.findByTokenToForgotPassword(token);
        if (!Objects.equals(user.getTokenToForgotPassword(), token)) {
            throw new UserServiceCustomException("Token Invalid", "Token invalid");
        }
        LocalDateTime tokenCreationDate = user.getTokenToForgotPasswordCreationDate();
        if (isTokenExpired(tokenCreationDate)) {
            return responseUtil.createResponse("Token expired", "Failed", "Token expired");
        }
        System.out.println(newPassword);
        user.setPassword(passwordEncoder.encode(newPassword.getPassword()));
        user.setTokenToForgotPassword(null);
        user.setTokenToForgotPasswordCreationDate(null);
        userRepository.save(user);
        return responseUtil.createResponse("Password Updated", "SUCCESS", "Your password successfully updated.");
    }

    @Override
    public ResponseModel<UserDTO>  getUsers(Pageable pageable) {
        Page<User> users=userRepository.findUsers(pageable);
        return buildResponse(users);
    }
    @Override
    public User getUserBySession() {
        User user=sessionService.getUserBySession().get();
        return user;
    }

    @Override
    public UserUpdateProfile updateProfile(UserUpdateProfile userUpdateProfile, long idUser) {
        User user=userRepository.findById(idUser).get();
        User user1=userMapper.mapToUserUpdateProfile(userUpdateProfile);
        user.setFirstName(user1.getFirstName());
        user.setLastName(user1.getLastName());
        user.setPhoneNumber(user1.getPhoneNumber());
        user.setEmail(user1.getEmail());
        userRepository.save(user);
        return userUpdateProfile;
    }


    @Override
    public ResponseDto deleteUser(long idUser) {
        userRepository.deleteById(idUser);
        return responseUtil.createResponse("User deleted", "SUCCESS", "Your user deleted with succes.");
    }

    @Override
    public UserDTO getUserById(long idUser) {
        User user=userRepository.findById(idUser).get();
        return userMapper.mapToUserDto(user);
    }

    @Override
    public ResponseModel<UserDTO>  getActiveUseerTodashbord(Pageable pageable) {
        Page<User> usersList=userRepository.findActiveUsers(pageable);
        return buildResponse(usersList);
    }
    public long getUserCount() {
        return userRepository.count();
    }
    public long getPostsCount() {
        return publicationRepositroy.count();
    }
    public long activeUserCount() {
        return userRepository.countByActiveUser(true);
    }
    public long countEnablePost() {
        return publicationRepositroy.countByEnabled(true);
    }
    @Override
    public ResponseEntity<Map<String, Long>> getStatistics() {
        Map<String, Long> statistics = new HashMap<>();
        statistics.put("userCount", getUserCount());
        statistics.put("postsCount", getPostsCount());
        statistics.put("enablePost", countEnablePost());
        statistics.put("activeUsersCount", activeUserCount());
        return ResponseEntity.ok(statistics);
    }

    @Override
    public ResponseDto logout(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserServiceCustomException("No user found with this email: " + email,
                        "USER_NOT_FOUND", HttpStatus.NOT_FOUND));
        user.setActiveUser(false);
        userRepository.save(user);
        return responseUtil.createResponse("User logout", "SUCCESS", "Your account logout with succes.");
    }

    private boolean isTokenExpired(final LocalDateTime tokenCreationDate) {
        LocalDateTime now = LocalDateTime.now();
        Duration diff = Duration.between(tokenCreationDate, now);
        return diff.toMinutes() >= AuthenticationConstants.EXPIRE_TOKEN_AFTER_MINUTES;
    }
    public UserDTO createAccount(UserRegisterDTO userRegisterDTO,RoleType roleType) throws MessagingException {
        if(userRepository.existsByEmail(userRegisterDTO.getEmail())){
            throw new UserServiceCustomException("Email must be unique","DUPLICATED_EMAIL");
        }
        User user=userMapper.mapToUser(userRegisterDTO);
        user.setCreationDate(Instant.now());
        user.setPassword(passwordEncoder.encode(userRegisterDTO.getPassword()));
        user.setValidated(false);
        user.setRoleTypes(roleType);
        user.setTokenToValidate(generateOTPToSend());
        user.setValidateCodeCreationDate(LocalDateTime.now());
        user.setActiveUser(false);
        User userSave=userRepository.save(user);
        UserDTO userDTO=userMapper.mapToUserDto(userSave);
        emailUtility.sendVerificationEmail(userRegisterDTO.getEmail(), userRegisterDTO.getFirstName(),
                user.getTokenToValidate(), user.getRoleTypes());
        return userDTO;
    }
    private Long generateOTPToSend() {
        int min = 10000;
        int max = 99999;
        return Long.valueOf(this.random.nextInt(max - min + 1) + min);
    }


    private ResponseModel<UserDTO> buildResponse(Page<User> userPage) {
        List<UserDTO> listOfUser = userPage.toList()
                .stream()
                .map(userMapper::mapToUserDto)
                .collect(Collectors.toList());

        return ResponseModel.<UserDTO>builder()
                .pageNo(userPage.getNumber())
                .pageSize(userPage.getSize())
                .totalElements(userPage.getTotalElements())
                .totalPages(userPage.getTotalPages())
                .data(listOfUser)
                .isLastPage(userPage.isLast())
                .build();
    }
}
