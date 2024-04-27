package com.example.pubfinder.dto;

import com.example.pubfinder.config.Adult;
import com.example.pubfinder.model.enume.GenderType;
import com.example.pubfinder.model.enume.RoleType;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRegisterDTO {
    @NotBlank(message = "Invalid Email: Empty Email")
    @NotNull(message = "Invalid Email: Email is NULL")
    @Email(message = "Invalid email")
    private String email;
    @NotNull(message = "Invalid password: password is NULL")
    private String password;

    @NotBlank(message = "Invalid firstName: Empty firstName")
    @NotNull(message = "Invalid firstName: firstName is NULL")
    @Size(min = 3, max = 30, message = "Invalid firstName: Must be of 3 - 30 characters")
    private String firstName;
    private String nationality;
    @NotBlank(message = "Invalid lastName: Empty lastName")
    @NotNull(message = "Invalid lastName: lastName is NULL")
    @Size(min = 3, max = 30, message = "Invalid lastName: Must be of 3 - 30 characters")
    private String lastName;
    private String phoneNumber;
    private String profilePicture;
    @NotNull(message = "Invalid role type: roleType is NULL")
    private RoleType roleTypes;
    private GenderType genderType;
    @Past(message = "Invalid birth date: Must be in the past")
    @Adult
    private Date birthDate;

}
