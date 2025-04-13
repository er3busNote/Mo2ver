package com.mo2ver.web.domain.search.repository;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Repository
@CacheConfig(cacheNames = "recentList")
public class SearchRepository {

    private static final int MAX_RECENT = 10;

    @Cacheable(key = "'user:' + #userId", condition = "#userId != null", unless = "#result == null")
    public List<String> findByUser(String userId) {
        log.info("Repository findByUser {}", userId);
        return new ArrayList<>(); // 캐시에 없으면 빈 리스트
    }

    @Cacheable(key = "'guest:' + #clientId", condition = "#clientId != null", unless = "#result == null")
    public List<String> findByGuest(String clientId) {
        log.info("Repository findByGuest {}", clientId);
        return new ArrayList<>(); // 캐시에 없으면 빈 리스트
    }

    @CachePut(key = "'user:' + #userId")
    public List<String> saveSearchForUser(String userId, String keyword) {
        List<String> list = findByUser(userId);
        return updateRecentList(userId, list, keyword);
    }

    @CachePut(key = "'guest:' + #clientId")
    public List<String> saveSearchForGuest(String clientId, String keyword) {
        List<String> list = findByGuest(clientId);
        return updateRecentList(clientId, list, keyword);
    }

    private List<String> updateRecentList(String id, List<String> list, String keyword) {
        list = new ArrayList<>(list);   // 방어 복사
        list.remove(keyword);           // 중복 제거
        list.add(0, keyword);     // 앞에 추가

        if (list.size() > MAX_RECENT) {
            list = list.subList(0, MAX_RECENT);
        }
        return list;
    }
}
