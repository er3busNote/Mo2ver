package com.mo2ver.web.global.common.uuid;

import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class UuidManager {

    public static String generateId() {
        return UUID.randomUUID().toString().replace("-", "").toUpperCase();
    }

    public static String generateUuid() {
        return UUID.randomUUID().toString();
    }
}
