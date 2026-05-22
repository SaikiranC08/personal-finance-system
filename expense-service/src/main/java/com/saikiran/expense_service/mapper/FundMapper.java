package com.saikiran.expense_service.mapper;

import com.saikiran.expense_service.entities.FundInfo;
import com.saikiran.expense_service.requestDTO.CreateFundRequest;
import com.saikiran.expense_service.responseDTO.FundResponse;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface FundMapper {

    // =========================
    // DTO → Entity (CREATE)
    // =========================
    @Mapping(target = "fundId", ignore = true)                 // DB generated
    @Mapping(target = "remainingAmount", ignore = true)        // calculated in service
    @Mapping(target = "createdDate", ignore = true)            // system generated
    @Mapping(target = "status", ignore = true)                 // set in service
    FundInfo toFundInfo(CreateFundRequest dto);

    // =========================
    // Entity → Response
    // =========================
    @Mapping(target = "givenDate", source = "createdDate")     // rename field
    FundResponse toFundResponse(FundInfo entity);

    // =========================
    // DTO → Entity (PATCH)
    // =========================
    @BeanMapping(nullValuePropertyMappingStrategy =
            NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "fundId", ignore = true)
    @Mapping(target = "remainingAmount", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "status", ignore = true)
    void updateFundFromDto(
            CreateFundRequest dto,
            @MappingTarget FundInfo entity
    );
}
