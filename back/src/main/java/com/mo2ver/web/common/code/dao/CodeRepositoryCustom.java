package com.mo2ver.web.common.code.dao;

import com.mo2ver.web.common.code.dto.response.CodeResponse;
import com.mo2ver.web.common.code.dto.response.GroupCodeResponse;

import java.util.List;
import java.util.Map;

public interface CodeRepositoryCustom {
    Map<String, List<CodeResponse>> findGroupCodeByCodelist(List<String> groupCodelist);
    List<GroupCodeResponse> findGroupCodeByCodelistDetail(List<String> groupCodelist);
}
