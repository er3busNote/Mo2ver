package com.mo2ver.master.auth;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class CsrfEnabledTest extends CsrfConfigTest {

    @Test
    @DisplayName("CSRF Forbidden 확인")
    public void CsrfForbidden() throws Exception {

        mockMvc.perform(post("/member/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(createData())
                .with(testUser())
        ).andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("CSRF Created 확인")
    public void CsrfCreated() throws Exception {

        mockMvc.perform(post("/member/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(createData())
                .with(testUser()).with(csrf()))
                .andDo(print())
                .andExpect(status().isCreated());
    }
}
