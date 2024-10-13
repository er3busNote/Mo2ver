package com.mo2ver.web.auth;

import com.mo2ver.web.global.configs.JasyptConfig;
import org.assertj.core.api.Assertions;
import org.jasypt.encryption.StringEncryptor;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = JasyptConfig.class)
public class JasyptConfigTest {

    @Autowired
    private StringEncryptor jasyptEncryptor;

    @Test
    @DisplayName("Jasypt 암복호화 테스트")
    void jasyptTest() {
        String encrypted = jasyptEncryptor.encrypt("test");
        System.out.println("encrypted: " + encrypted);

        String decrypted = jasyptEncryptor.decrypt("DV3cevRTSs5oAkESCUE6RUwSwa1zdBGwaC5sT 7Z8pE35pUn1xnN5lpDBF/lcHFV");
        System.out.println("decrypted: " + decrypted);
        Assertions.assertThat(decrypted).isEqualTo("test");
    }
}
