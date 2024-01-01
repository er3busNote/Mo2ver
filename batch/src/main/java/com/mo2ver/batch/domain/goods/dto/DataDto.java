package com.mo2ver.batch.domain.goods.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DataDto {

    private String id;

    private String gender;

    private String masterCategory;

    private String subCategory;

    private String articleType;

    private String baseColour;

    private String season;

    private String year;

    private String usage;

    private String productDisplayName;
}
