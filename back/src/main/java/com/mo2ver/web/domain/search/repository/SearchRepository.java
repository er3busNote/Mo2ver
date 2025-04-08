package com.mo2ver.web.domain.search.repository;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.stereotype.Repository;

@Slf4j
@Repository
@CacheConfig(cacheNames = "recentList")
public class SearchRepository {
}
