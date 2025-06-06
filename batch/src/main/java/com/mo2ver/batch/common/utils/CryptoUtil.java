package com.mo2ver.batch.common.utils;

import org.springframework.stereotype.Component;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.SecureRandom;
import java.security.spec.KeySpec;

@Component
public class CryptoUtil {

    private static final int ITERATIONS = 10000;
    private static final int KEY_SIZE = 256;
    private static final int IV_LENGTH = 16;

    // 참고 (Java AES Encryption and Decryption) : https://howtodoinjava.com/java/java-security/aes-256-encryption-decryption/
    public static void encryptFile(String inputFilePath, String outputFilePath, String password, String salt) throws Exception {
        // 파일 읽기
        byte[] fileBytes = Files.readAllBytes(Paths.get(inputFilePath));

        // 키 생성
        SecretKey key = generateKey(password, salt);

        // 초기화 벡터 생성
        SecureRandom secureRandom = new SecureRandom();
        byte[] iv = new byte[IV_LENGTH];
        secureRandom.nextBytes(iv);
        IvParameterSpec ivParameterSpec = new IvParameterSpec(iv);

        // AES 암호화
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(Cipher.ENCRYPT_MODE, key, ivParameterSpec);
        byte[] encryptedFileBytes = cipher.doFinal(fileBytes);

        // 암호화된 파일 저장
        try (FileOutputStream outputStream = new FileOutputStream(outputFilePath)) {
            outputStream.write(iv);
            outputStream.write(encryptedFileBytes);
        }
    }

    public static void decryptFile(String inputFilePath, String outputFilePath, String password, String salt) throws Exception {
        // 암호화된 파일 읽기
        byte[] encryptedFileBytesWithIV = Files.readAllBytes(Paths.get(inputFilePath));

        // 키 생성
        SecretKey key = generateKey(password, salt);

        // 초기화 벡터 추출
        byte[] iv = new byte[IV_LENGTH];
        System.arraycopy(encryptedFileBytesWithIV, 0, iv, 0, IV_LENGTH);
        IvParameterSpec ivParameterSpec = new IvParameterSpec(iv);

        // AES 복호화
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(Cipher.DECRYPT_MODE, key, ivParameterSpec);
        byte[] decryptedFileBytes = cipher.doFinal(encryptedFileBytesWithIV, IV_LENGTH, encryptedFileBytesWithIV.length - IV_LENGTH);

        // 복호화된 파일 저장
        Files.write(Paths.get(outputFilePath), decryptedFileBytes);
    }

    private static SecretKey generateKey(String password, String salt) throws Exception {
        // PBKDF2 키 생성
        SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
        KeySpec spec = new PBEKeySpec(password.toCharArray(), salt.getBytes(), ITERATIONS, KEY_SIZE);
        SecretKey tmp = factory.generateSecret(spec);

        return new SecretKeySpec(tmp.getEncoded(), "AES");
    }
}
