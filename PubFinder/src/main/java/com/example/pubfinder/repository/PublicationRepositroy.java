package com.example.pubfinder.repository;

import com.example.pubfinder.dto.PublicationDTO;
import com.example.pubfinder.model.Publication;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

import java.util.List;

@Repository
public interface PublicationRepositroy extends CrudRepository<Publication,Long> {
    long countByEnabled(boolean enabled);
    @Query("select p from Publication p where p.user.idUser=:v1")
    List<Publication> findMyPubl(@Param("v1") long idUser);
    @Query("select  p from Publication  p where p.category like 'Product' and p.enabled ORDER BY p.createdAt DESC")
    Page<Publication> findPubByCategoryProduct(Pageable pageable);

    @Query("select p from Publication  p where p.enabled = true ORDER BY p.createdAt DESC")
    Page<Publication> findPubAll(Pageable pageable);
    @Query("select  p from Publication  p where p.category='Clothes' and p.enabled = true ORDER BY p.createdAt DESC")
    Page<Publication> findPubByCategoryClothes(Pageable pageable);
    @Query("select  p from Publication  p where p.category='Services' and p.enabled = true ORDER BY p.createdAt DESC")
    Page<Publication> findPubByCategoryServices(Pageable pageable);
    @Query("select  p from Publication  p where p.category='Foods' and p.enabled = true ORDER BY p.createdAt DESC")
    Page<Publication> findPubByCategoryFoods(Pageable pageable);

    Page<Publication> findAll(Specification<Publication> specification, Pageable pageable);
    Page<Publication> findAll(Pageable pageable);


}
