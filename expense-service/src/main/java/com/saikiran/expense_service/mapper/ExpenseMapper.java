package com.saikiran.expense_service.mapper;
import com.saikiran.expense_service.entities.ExpenseInfo;
import com.saikiran.expense_service.requestDTO.CreateExpenseRequest;
import com.saikiran.expense_service.responseDTO.ExpenseResponse;
import org.mapstruct.*;


@Mapper(componentModel = "spring")
public interface ExpenseMapper {

    // DTO -> Entity
    @Mapping(target = "expenseId", ignore = true)

    @Mapping(target = "fund", ignore = true)

    @Mapping(target = "userId", ignore = true)

    @Mapping(target = "category", ignore = true)

    ExpenseInfo toExpenseInfo(
            CreateExpenseRequest dto
    );

    // Entity -> DTO
    @Mapping(
            target = "category",
            source = "category.name"
    )

    @Mapping(
            target = "fundId",
            source = "fund.fundId"
    )

    ExpenseResponse toExpenseResponse(
            ExpenseInfo entity
    );

    // PATCH
    @BeanMapping(
            nullValuePropertyMappingStrategy =
                    NullValuePropertyMappingStrategy.IGNORE
    )

    @Mapping(target = "expenseId", ignore = true)

    @Mapping(target = "fund", ignore = true)

    @Mapping(target = "userId", ignore = true)

    @Mapping(target = "category", ignore = true)

    void updateExpenseFromDto(
            CreateExpenseRequest dto,

            @MappingTarget ExpenseInfo entity
    );
}