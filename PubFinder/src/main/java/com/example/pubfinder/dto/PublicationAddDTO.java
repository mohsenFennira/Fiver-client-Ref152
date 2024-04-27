package com.example.pubfinder.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PublicationAddDTO {
    @NotBlank(message = "Invalid title: Empty title")
    @NotNull(message = "Invalid title: title is NULL")
    private String title;
    @NotBlank(message = "Invalid shortDescription: Empty description")
    @NotNull(message = "Invalid shortDescription: description is NULL")
    private String shortDescription;
    @NotBlank(message = "Invalid longDescription: Empty description")
    @NotNull(message = "Invalid longDescription: description is NULL")
    private String longDescription;
    @NotBlank(message = "Invalid category: Empty category")
    @NotNull(message = "Invalid category: category is NULL")
    private String category;
    private boolean enabled;
    @NotBlank(message = "Invalid country: Empty country")
    @NotNull(message = "Invalid country: country is NULL")
    private String country;
    @NotBlank(message = "Invalid region: Empty region")
    @NotNull(message = "Invalid region: region is NULL")
    private String region;
}
