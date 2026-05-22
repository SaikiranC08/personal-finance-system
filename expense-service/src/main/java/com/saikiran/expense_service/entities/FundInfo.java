package com.saikiran.expense_service.entities;

import com.saikiran.expense_service.enums.FundStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(
        name = "funds",
        uniqueConstraints = {
                // ONE SELF fund per user
                @UniqueConstraint(
                        name = "uk_user_self",
                        columnNames = {"user_id", "owner_type"}
                ),
                // Unique OTHER fund name per user
                @UniqueConstraint(
                        name = "uk_user_other_name",
                        columnNames = {"user_id", "owner_type", "owner_name"}
                )
        }
)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FundInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fund_id")
    private Long fundId;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "owner_type", nullable = false)
    private String ownerType; // SELF or OTHER

    @Column(name = "owner_name")
    private String ownerName; // NULL for SELF, required for OTHER

    // ONLY for OTHER funds
    @Column(name = "amount_received")
    private BigDecimal amountReceived;

    // ONLY for OTHER funds
    @Column(name = "remaining_amount")
    private BigDecimal remainingAmount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FundStatus status;

    @Column(name = "created_date", nullable = false)
    private LocalDate createdDate;
}
