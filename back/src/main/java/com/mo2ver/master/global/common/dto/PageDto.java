package com.mo2ver.master.global.common.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PageDto {

    @NotNull
    private int page;

    @NotNull
    private int size;
}
