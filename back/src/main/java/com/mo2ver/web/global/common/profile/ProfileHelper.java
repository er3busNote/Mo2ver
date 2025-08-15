package com.mo2ver.web.global.common.profile;

import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
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
}
