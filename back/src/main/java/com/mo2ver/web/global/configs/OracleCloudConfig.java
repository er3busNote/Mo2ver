package com.mo2ver.web.global.configs;

import com.mo2ver.web.global.common.properties.OracleCloudProperties;
import com.oracle.bmc.Region;
import com.oracle.bmc.auth.SimpleAuthenticationDetailsProvider;
import com.oracle.bmc.auth.StringPrivateKeySupplier;
import com.oracle.bmc.objectstorage.ObjectStorage;
import com.oracle.bmc.objectstorage.ObjectStorageClient;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.function.Supplier;

@Configuration
@RequiredArgsConstructor
public class OracleCloudConfig {

    private final OracleCloudProperties oracleCloudProperties;

    @Bean
    public ObjectStorage objectStorageClient() throws IOException {
        Supplier<InputStream> privateKeySupplier = new StringPrivateKeySupplier(loadPrivateKey(oracleCloudProperties.getPrivateKey()));
        SimpleAuthenticationDetailsProvider provider = SimpleAuthenticationDetailsProvider.builder()
                .tenantId(oracleCloudProperties.getTenantId())
                .userId(oracleCloudProperties.getUserId())
                .fingerprint(oracleCloudProperties.getFingerprint())
                .region(Region.AP_SEOUL_1)
                .privateKeySupplier(privateKeySupplier)
                .build();

        return ObjectStorageClient.builder()
                .region(Region.AP_SEOUL_1)
                .build(provider);
    }

    private static String loadPrivateKey(String filePath) throws IOException {
        return new String(Files.readAllBytes(Paths.get(filePath)));
    }
}
