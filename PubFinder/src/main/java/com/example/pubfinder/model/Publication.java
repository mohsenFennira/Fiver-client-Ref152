package com.example.pubfinder.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Entity
@EqualsAndHashCode
@Table(name = "[Publication]")
public class Publication {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long idPublication;
    private String title;
    private String shortDescription;
    private String longDescription;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean enabled;
    private String category;
    private String country;
    private String region;
    @Column(length = 10000000)
    @Lob
    private byte[] image;
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id")
    private User user;
}
