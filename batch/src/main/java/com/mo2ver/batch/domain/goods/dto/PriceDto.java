package com.mo2ver.batch.domain.goods.dto;

import com.mo2ver.batch.domain.goods.entity.Goods;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Random;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PriceDto {

    private static final String START_TIMESTAMP = "2024-01-03 00:00:00";
    private static final String END_TIMESTAMP = "2024-10-24 00:00:00";
    private static final Integer MAX_PRICE = 300000;    // → 시작가
    private static final Double SALE_RATIO = 0.05;      // → 할인가

    private Goods goodsCode;

    private LocalDateTime applyDate;

    private BigDecimal supplyPrice;

    private BigDecimal salePrice;

    private Integer maxBuyQuantity;

    private Character buyLimitYesNo;

    private String buyLimitCondition;

    private Character salePeriodYesNo;

    private Date saleStartDate;

    private Date saleEndDate;

    private String saleConditionCode;

    private String register;

    private String updater;

    public static PriceDto of(Goods goods) {
        Timestamp startDate = getRandomTimestamp();
        Timestamp endDate = getRandomTimestampAfter(startDate);
        BigDecimal supplyPrice = getRandomBigDecimal();
        BigDecimal salePrice = getDiscountBigDecimal(supplyPrice);
        return PriceDto.builder()
                .goodsCode(goods)
                .applyDate(LocalDateTime.now())
                .supplyPrice(supplyPrice)
                .salePrice(salePrice)
                .maxBuyQuantity(1)
                .buyLimitYesNo('N')
                .buyLimitCondition("10")
                .salePeriodYesNo('Y')
                .saleStartDate(startDate)
                .saleEndDate(endDate)
                .saleConditionCode("10")
                .register("SYSTEM")
                .updater("SYSTEM")
                .build();
    }

    private static BigDecimal getRandomBigDecimal() {
        return new BigDecimal(new Random().nextInt(MAX_PRICE + 1));
    }

    private static BigDecimal getDiscountBigDecimal(BigDecimal supplyPrice) {
        BigDecimal discountAmount = supplyPrice.multiply(new BigDecimal(SALE_RATIO));
        return supplyPrice.subtract(discountAmount);
    }

    private static Timestamp getRandomTimestamp() {
        long offset = Timestamp.valueOf(START_TIMESTAMP).getTime();
        long end = Timestamp.valueOf(END_TIMESTAMP).getTime();

        long diff = end - offset + 1;
        long randomTimestamp = offset + (long) (Math.random() * diff);

        return new Timestamp(randomTimestamp);
    }

    private static Timestamp getRandomTimestampAfter(Timestamp startDate) {
        // 시작 날짜 이후의 랜덤한 Timestamp 값 생성
        long startTimestamp = startDate.getTime();
        long endTimestamp = Timestamp.valueOf(END_TIMESTAMP).getTime();

        long diff = endTimestamp - startTimestamp + 1;
        long randomTimestampAfterStart = startTimestamp + (long) (Math.random() * diff);

        return new Timestamp(randomTimestampAfterStart);
    }
}
