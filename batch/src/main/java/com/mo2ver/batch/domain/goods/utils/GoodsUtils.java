package com.mo2ver.batch.domain.goods.utils;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class GoodsUtils {

    private static final String GOODSNAME = "(Men|Women|Unisex|Boys|Girls)(s|'s)?(.+)";
    private static final String BRANDNAME = "(.+?)(Men|Women|Unisex|Boys|Girls)(s|'s)?";
    private static final HashMap<String, String> LARGE_CATEGORY_CODE = new HashMap<String, String>() {{
        put("Apparel", "C001000000"); put("Accessories", "C010000000"); put("Footwear", "C003000000");
        put("Personal Care", "C011000000"); put("Free Items", "C010000000"); put("Sporting Goods", "C005000000");
        put("Home", "C008000000");
    }};
    private static final HashMap<String, String> MEDIUM_CATEGORY_CODE = new HashMap<String, String>() {{
        put("Topwear", "C001001000"); put("Shoes", "C003001000"); put("Bags", "C004001000");
        put("Bottomwear", "C002001000"); put("Watches", "C010002000"); put("Innerwear", "C001012000");
        put("Jewellery", "C010003000"); put("Eyewear", "C009002000"); put("Fragrance", "C011001000");
        put("Sandal", "C003001000"); put("Wallets", "C010001000"); put("Flip Flops", "C003002000");
        put("Belts", "C010001000"); put("Socks", "C007001000"); put("Lips", "C011002000");
        put("Dress", "C001011000"); put("Loungewear and Nightwear", "C001013000");
        put("Saree", "C001014000"); put("Nails", "C011001000"); put("Makeup", "C011001000");
        put("Headwear", "C006001000"); put("Ties", "C010004000"); put("Accessories", "C010001000");
        put("Scarves", "C010001000"); put("Cufflinks", "C010001000"); put("Apparel Set", "C001002000");
        put("Free Gifts", "C010001000"); put("Stoles", "C010003000"); put("Skin Care", "C011001000");
        put("Skin", "C011001000"); put("Eyes", "C009003000"); put("Mufflers", "C010003000");
        put("Shoe Accessories", "C003002000"); put("Sports Equipment", "C005001000");
        put("Gloves", "C005002000"); put("Hair", "C006002000"); put("Bath and Body", "C011001000");
        put("Water Bottle", "C010004000"); put("Perfumes", "C011001000"); put("Umbrellas", "C010005000");
        put("Wristbands", "C010001000"); put("Beauty Accessories", "C011001000");
        put("Sports Accessories", "C005002000"); put("Vouchers", "C012001000"); put("Home Furnishing", "C008001000");
    }};
    private static final HashMap<String, String> SMALL_CATEGORY_CODE = new HashMap<String, String>() {{
        put("Tshirts", "C001001001"); put("Shirts", "C001001000"); put("Casual Shoes", "C003001001");
        put("Watches", "C010002001"); put("Sports Shoes", "C003001002"); put("Kurtas", "C001011001");
        put("Tops", "C001004001"); put("Handbags", "C004002001"); put("Heels", "C003003001");
        put("Sunglasses", "C009001001"); put("Wallets", "C010001001"); put("Flip Flops", "C003003001");
        put("Sandals", "C003003002"); put("Briefs", "C002004001"); put("Belts", "C010001002");
        put("Backpacks", "C004001001"); put("Socks", "C007001001"); put("Formal Shoes", "C003003002");
        put("Perfume and Body Mist", "C011001001"); put("Jeans", "C002002001"); put("Shorts", "C003002001");
        put("Trousers", "C002001001"); put("Flats", "C003002002"); put("Bra", "C001012001");
        put("Dresses", "C001011001"); put("Sarees", "C001011002"); put("Earrings", "C010003003");
        put("Deodorant", "C011001002"); put("Nail Polish", "C011001003"); put("Lipstick", "C011002001");
        put("Track Pants", "C008001001"); put("Clutches", "C010003004"); put("Sweatshirts", "C001002001");
        put("Caps", "C006001001"); put("Sweaters", "C001001002"); put("Ties", "C010004001");
        put("Jackets", "C001002002"); put("Innerwear Vests", "C001012002"); put("Kurtis", "C001004001");
        put("Tunics", "C001004002"); put("Nightdress", "C001012003"); put("Leggings", "C008001002");
        put("Pendant", "C010003002"); put("Capris", "C002001001"); put("Necklace and Chains", "C010003005");
        put("Lip Gloss", "C011002002"); put("Night suits", "C001013001"); put("Trunk", "C010001003");
        put("Skirts", "C002003001"); put("Scarves", "C010003001"); put("Ring", "C010001006");
        put("Dupatta", "C001011002"); put("Accessory Gift Set", "C010001004"); put("Cufflinks", "C010001005");
        put("Kajal and Eyeliner", "C011001006"); put("Kurta Sets", "C001011003"); put("Free Gifts", "C012001001");
        put("Stoles", "C010004003"); put("Duffel Bag", "C004001002"); put("Bangle", "C010003006");
        put("Laptop Bag", "C004001003"); put("Foundation and Primer", "C011001007"); put("Sports Sandals", "C003003003");
        put("Bracelet", "C010003007"); put("Face Moisturisers", "C011001008"); put("Lounge Pants", "C002001002");
        put("Jewellery Set", "C010003008"); put("Fragrance Gift Set", "C012001002");
        put("Highlighter and Blush", "C011001009"); put("Boxers", "C002004002"); put("Compact", "C011001010");
        put("Lip Liner", "C011002003"); put("Mobile Pouch", "C010001007"); put("Messenger Bag", "C004001004");
        put("Eyeshadow", "C011001007"); put("Suspenders", "C010001008"); put("Camisoles", "C001012004");
        put("Mufflers", "C010003002"); put("Patiala", "C001011004"); put("Jeggings", "C002002002");
        put("Lounge Shorts", "C003002003"); put("Salwar", "C001011005"); put("Stockings", "C007002001");
        put("Churidar", "C001011006"); put("Tracksuits", "C008001003"); put("Face Wash and Cleanser", "C011001011");
        put("Sunscreen", "C009001002"); put("Shoe Accessories", "C003002004"); put("Gloves", "C005001001");
        put("Bath Robe", "C001002003"); put("Hair Colour", "C006002001"); put("Rain Jacket", "C001008001");
        put("Swimwear", "C005001002"); put("Waist Pouch", "C005001003"); put("Travel Accessory", "C010001009");
        put("Jumpsuit", "C001006001"); put("Lip Care", "C011002004"); put("Baby Dolls", "C010001010");
        put("Waistcoat", "C001002004"); put("Mascara", "C011001013"); put("Basketballs", "C005001004");
        put("Booties", "C003001003"); put("Mask and Peel", "C011001014"); put("Rompers", "C001005001");
        put("Rucksacks", "C005001005"); put("Concealer", "C011001015"); put("Water Bottle", "C010001011");
        put("Shapewear", "C001012005"); put("Tights", "C002005001"); put("Blazers", "C001005002");
        put("Clothing Set", "C001001001"); put("Footballs", "C005001006"); put("Headband", "C010001012");
        put("Salwar and Dupatta", "C001011007"); put("Wristbands", "C010001013"); put("Umbrellas", "C010005001");
        put("Shrug", "C005001007"); put("Body Lotion", "C011001016"); put("Nail Essentials", "C011001017");
        put("Eye Cream", "C011001018"); put("Face Scrub and Exfoliator", "C011001019"); put("Toner", "C011001020");
        put("Nehru Jackets", "C001002005"); put("Beauty Accessory", "C010001014"); put("Makeup Remover", "C011001021");
        put("Robe", "C001002003"); put("Lip Plumper", "C011002005"); put("Lehenga Choli", "C001011008");
        put("Trolley Bag", "C004001005"); put("Tablet Sleeve", "C011001023"); put("Hat", "C006001002");
        put("Lounge Tshirts", "C001001001"); put("Rain Trousers", "C002001003"); put("Key chain", "C010001015");
        put("Ties and Cufflinks", "C010004003"); put("Face Serum and Gel", "C011001024");
        put("Mens Grooming Kit", "C010001016"); put("Suits", "C001001003"); put("Cushion Covers", "C010001017");
        put("Body Wash and Scrub", "C011001025"); put("Hair Accessory", "C006002002"); put("Ipad", "C010001018");
        put("Shoe Laces", "C003002005");
    }};

    public String goodsName(String productDisplayName) {
        Pattern pattern = Pattern.compile(GOODSNAME);
        Matcher match = pattern.matcher(productDisplayName);
        while (match.find()) { return match.group(3).trim(); }
        return "";
    }

    public String brandName(String productDisplayName) {
        Pattern pattern = Pattern.compile(BRANDNAME);
        Matcher match = pattern.matcher(productDisplayName);
        while (match.find()) { return match.group(1).trim(); }
        return "";
    }

    public String largeCategoryCode(String masterCategory) {
        return LARGE_CATEGORY_CODE.get(masterCategory);
    }

    public String mediumCategoryCode(String subCategory) {
        return MEDIUM_CATEGORY_CODE.get(subCategory);
    }

    public String smallCategoryCode(String articleType) {
        return SMALL_CATEGORY_CODE.get(articleType);
    }
}
