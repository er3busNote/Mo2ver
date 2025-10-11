package com.mo2ver.web.common.code.entity;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@EqualsAndHashCode(of = {"commonCode", "groupCode"})
@NoArgsConstructor @AllArgsConstructor
public class CodeId implements Serializable {
    @Column(name = "CMM_CD", columnDefinition = "CHAR(5) COMMENT '공통코드'", length = 5)
    private String commonCode;
    @Column(name = "CMM_GRP_CD")
    private String groupCode;
}
