package com.example.pubfinder.specifications;

import com.example.pubfinder.model.Publication;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;


public class PublicationSpecification {
    public static Specification<Publication> searchPublicationByManyConditions(
            String country, String region, String category,boolean enabled) {
        return (publicationRoot, query, builder) -> {

            Predicate countryPredicate = country != null
                    ? builder.equal(publicationRoot.get("country"), country)
                    : builder.conjunction();

            Predicate regionPredicate = region != null
                    ? builder.equal(publicationRoot.get("region"), region)
                    : builder.conjunction();

            Predicate categoryPredicate = category != null
                    ? builder.equal(publicationRoot.get("category"), category)
                    : builder.conjunction();

            Predicate enabledPredicate = enabled != false
                    ? builder.equal(publicationRoot.get("enabled"), enabled)
                    : builder.conjunction();

            return builder.and(countryPredicate, regionPredicate, categoryPredicate, enabledPredicate);
        };
    }

}
