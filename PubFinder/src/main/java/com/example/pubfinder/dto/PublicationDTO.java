package com.example.pubfinder.dto;

import com.example.pubfinder.model.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PublicationDTO {
    private long idPublication;
    private String title;
    private String shortDescription;
    private String longDescription;
    private String category;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean enabled;
    private UserResponse user;
    private String region;
    private String country;
    public byte[] image;

}
