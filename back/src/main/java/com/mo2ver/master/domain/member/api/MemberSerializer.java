package com.mo2ver.master.domain.member.api;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.mo2ver.master.domain.member.domain.Member;

import java.io.IOException;

// [출력값 제한하기] email, password, roles 제거 --> id만 출력
public class MemberSerializer extends JsonSerializer<Member> {
    @Override
    public void serialize(Member member, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        gen.writeStartObject();
        gen.writeStringField("memberNo", member.getMemberNo());
        gen.writeEndObject();
    }
}
