package com.mo2ver.master.domain.auth.dao;

import com.mo2ver.master.domain.auth.domain.Auth;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthRepository extends JpaRepository<Auth, Integer> {
    Optional<Auth> findByEmail(String username);
}
