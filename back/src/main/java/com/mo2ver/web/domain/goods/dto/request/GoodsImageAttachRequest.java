package com.mo2ver.web.domain.goods.dto.request;

import com.mo2ver.web.common.file.dto.FileAttachInfo;
import com.mo2ver.web.global.common.validation.MinListSize;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class GoodsImageAttachRequest extends GoodsImageRequest {

    @MinListSize(value = 1, message = "상품 첨부 이미지 리스트는 최소 1개 이상의 항목을 포함해야 합니다.")
    private List<FileAttachInfo> goodsImg;
}
