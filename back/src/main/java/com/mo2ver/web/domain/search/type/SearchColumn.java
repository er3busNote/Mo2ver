package com.mo2ver.web.domain.search.type;

public enum SearchColumn {
    GOODS_NAME,
    MEMBER_NO,
    MIN_PRICE,
    MAX_PRICE;

    public String toCamelCase() {
        StringBuilder result = new StringBuilder();
        String[] words = this.name().toLowerCase().split("_");

        for (int i = 0; i < words.length; i++) {
            if (i == 0) {
                result.append(words[i]);
            } else {
                result.append(Character.toUpperCase(words[i].charAt(0)))
                        .append(words[i].substring(1));
            }
        }
        return result.toString();
    }
}
