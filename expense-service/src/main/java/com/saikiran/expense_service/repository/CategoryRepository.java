package com.saikiran.expense_service.repository;

import com.saikiran.expense_service.entities.Category;
import com.saikiran.expense_service.enums.CategorySource;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findBySourceOrUserId(
            CategorySource categorySource,
            String userId
    );

    boolean existsByNameIgnoreCaseAndUserId(
            String name,
            String userId
    );


    boolean existsByNameIgnoreCase(String name);
}
