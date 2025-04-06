package com.mo2ver.batch.common.utils;

import java.util.*;
import java.util.stream.Collectors;

public class RandomKeywordUtil {

    private static final List<String> KEYWORDS = Arrays.asList(
            "운동", "건강", "패션", "전자기기", "여행", "음식", "책", "게임", "스포츠", "음악"
    );

    private static final Random RANDOM = new Random();

    public static String getRandomKeywords(int count) {
        List<String> copy = new ArrayList<>(KEYWORDS);
        Collections.shuffle(copy);
        return copy.stream()
                .limit(Math.min(count, copy.size()))
                .map(keyword -> "#" + keyword)
                .collect(Collectors.joining());
    }

    public static void main(String[] args) {
        System.out.println("랜덤 키워드 - " + getRandomKeywords(3));
    }
}
