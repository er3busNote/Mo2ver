package com.mo2ver.web.global.common.utils;

import lombok.RequiredArgsConstructor;
import org.jasypt.encryption.StringEncryptor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JasyptUtil {

    private final StringEncryptor jasyptEncryptor;

    public String encrypt(String input) {
        return jasyptEncryptor.encrypt(input);
    }

    public String decrypt(String encryptedText) {
        return jasyptEncryptor.decrypt(encryptedText);
    }
}
