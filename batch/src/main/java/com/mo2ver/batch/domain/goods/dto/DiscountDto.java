package com.mo2ver.batch.domain.goods.dto;

import com.mo2ver.batch.domain.goods.domain.Goods;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiscountDto {

    private static final LocalDateTime START_DATETIME = LocalDateTime.of(2024, 1, 1, 0, 0);
    private static final LocalDateTime END_DATETIME = LocalDateTime.of(2024, 12, 31, 23, 59);
    private static final Integer PRICE_UNIT = 1000;
    private static final Integer MAX_SALE_RATIO = 20;

    private Goods goodsCode;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private BigDecimal discountPrice;

    private Character rateYesNo;

    private Character maxLimitYesNo;

    private BigDecimal maxLimitAmount;

    private String register;

    private String updater;

    public static DiscountDto toDto(Goods goods) {
        LocalDateTime startDate = getRandomDateTime();
        LocalDateTime endDate = getRandomDateTimeAfter(startDate);
        Character rateYesNo = getRandomYesNo();
        BigDecimal discountPrice = Character.compare(rateYesNo, 'N') == 0 ? getRandomPrice() : getRandomPercentage();
        BigDecimal maxLimitAmount = Character.compare(rateYesNo, 'N') == 0 ? new BigDecimal(0) : new BigDecimal(10000);
        return DiscountDto.builder()
                .goodsCode(goods)
                .startDate(startDate)
                .endDate(endDate)
                .discountPrice(discountPrice)
                .rateYesNo(rateYesNo)
                .maxLimitYesNo(rateYesNo)
                .maxLimitAmount(maxLimitAmount)
                .register("SYSTEM")
                .updater("SYSTEM")
                .build();
    }

    private static BigDecimal getRandomPrice() {
        // 1에서 10까지의 천원 단위 랜덤 값 생성
        return new BigDecimal((new Random().nextInt(10) + 1) * PRICE_UNIT);
    }

    private static BigDecimal getRandomPercentage() {
        // 0에서 20까지의 백분율 랜덤 값 생성
        return new BigDecimal(new Random().nextInt(MAX_SALE_RATIO + 1));
    }

    private static Character getRandomYesNo() {
        Random random = new Random();

        // 0 또는 1을 랜덤하게 생성
        int randomNumber = random.nextInt(2);

        // 0이면 'Y', 1이면 'N'을 반환
        if (randomNumber == 0) return 'Y';
        return 'N';
    }

    private static LocalDateTime getRandomDateTime() {
        long startEpochSecond = START_DATETIME.toEpochSecond(java.time.ZoneOffset.UTC);
        long endEpochSecond = END_DATETIME.toEpochSecond(java.time.ZoneOffset.UTC);

        long randomEpochSecond = ThreadLocalRandom.current().nextLong(startEpochSecond, endEpochSecond + 1);

        return LocalDateTime.ofEpochSecond(randomEpochSecond, 0, java.time.ZoneOffset.UTC);
    }

    private static LocalDateTime getRandomDateTimeAfter(LocalDateTime startDateTime) {
        long startEpochSecond = startDateTime.toEpochSecond(java.time.ZoneOffset.UTC);
        long endEpochSecond = END_DATETIME.toEpochSecond(java.time.ZoneOffset.UTC);

        long diffInSeconds = endEpochSecond - startEpochSecond;
        long randomDiff = ThreadLocalRandom.current().nextLong(diffInSeconds + 1);

        return startDateTime.plusSeconds(randomDiff);
    }
}
