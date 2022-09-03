package com.mo2ver.master.domain.auth.presentation;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.mo2ver.master.domain.auth.domain.Auth;

import java.io.IOException;

// [출력값 제한하기] email, password, roles 제거 --> id만 출력
public class AuthSerializer extends JsonSerializer<Auth> {
    @Override
    public void serialize(Auth auth, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        gen.writeStartObject();
        gen.writeNumberField("id", auth.getId());
        gen.writeEndObject();
    }
}
