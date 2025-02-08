package com.mo2ver.web.common.code.dao;

import com.mo2ver.web.common.code.dto.CodeDto;
import com.mo2ver.web.common.code.dto.GroupCodeDto;

import java.util.List;
import java.util.Map;

public interface CodeRepositoryCustom {
    Map<String, List<CodeDto>> findGroupCodeByCodelist(List<String> groupCodelist);
    List<GroupCodeDto> findGroupCodeByCodelistDetail(List<String> groupCodelist);
}
