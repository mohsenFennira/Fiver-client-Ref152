package com.example.pubfinder.dto;

import com.example.pubfinder.model.enume.RoleType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private String email;
    private String username;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String profilePicture;
    private RoleType roleTypes;
    private String nationality;

}
