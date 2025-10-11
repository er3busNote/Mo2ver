package com.mo2ver.web.global.common.profile;

import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;

@Component
@RequiredArgsConstructor
public class ProfileHelper {

    private final Environment environment;
    private static String[] profiles;

    @PostConstruct
    public void init() {
        profiles = environment.getActiveProfiles();
    }

    public static boolean isTest() {
        return Arrays.asList(profiles).contains("test");
    }

    public static boolean isProduction() {
        return Arrays.asList(profiles).contains("production");
    }

    public static boolean isLocalhost(HttpServletRequest request) {
        String clientIp = request.getRemoteAddr();
        return clientIp.equals("127.0.0.1") || clientIp.equals("0:0:0:0:0:0:0:1");
    }
}
