package com.mo2ver.web.common.code.service;

import com.mo2ver.web.common.code.dao.CodeRepository;
import com.mo2ver.web.common.code.dto.CodeDto;
import com.mo2ver.web.common.code.dto.GroupCodeDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class CodeService {

    @Autowired
    protected CodeRepository codeRepository;

    @Transactional
    public Map<String, List<CodeDto>> fileCodelist(List<String> groupCodelist) {
        return this.codeRepository.findGroupCodeByCodelist(groupCodelist);
    }

    @Transactional
    public List<GroupCodeDto> fileCodelistDetail(List<String> groupCodelist) {
        return this.codeRepository.findGroupCodeByCodelistDetail(groupCodelist);
    }
}
