package com.mo2ver.web.global.common.util;

import org.jasypt.encryption.StringEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class JasyptUtil {

    @Autowired
    private StringEncryptor jasyptEncryptor;

    public String encrypt(String input) {
        return jasyptEncryptor.encrypt(input);
    }

    public String decrypt(String encryptedText) {
        return jasyptEncryptor.decrypt(encryptedText);
    }
}
