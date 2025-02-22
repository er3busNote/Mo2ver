package com.mo2ver.web.global.common.dto;

import lombok.*;

import javax.validation.constraints.NotNull;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class PageInfo {

    @NotNull
    private int page;

    @NotNull
    private int size;
}
