package com.saikiran.expense_service.responseDTO;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaginationMeta {

    private int page;              // current page number (0-based)
    private int size;              // size used for this request
    private int totalPages;        // total available pages
    private long totalElements;    // total records in DB
    private boolean hasNext;       // is next page available
    private boolean hasPrevious;   // is previous page available
}
