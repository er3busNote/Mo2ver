package com.mo2ver.web.common.code.service;

import com.mo2ver.web.common.code.dao.CodeRepository;
import com.mo2ver.web.common.code.dto.response.CodeResponse;
import com.mo2ver.web.common.code.dto.response.GroupCodeResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class CodeService {

    private final CodeRepository codeRepository;

    @Transactional
    public Map<String, List<CodeResponse>> fileCodelist(List<String> groupCodelist) {
        return this.codeRepository.findGroupCodeByCodelist(groupCodelist);
    }

    @Transactional
    public List<GroupCodeResponse> fileCodelistDetail(List<String> groupCodelist) {
        return this.codeRepository.findGroupCodeByCodelistDetail(groupCodelist);
    }
}
