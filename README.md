# Mo2ver

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=flat&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Spring Batch](https://img.shields.io/badge/Spring%20Batch-6DB33F?style=flat&logo=spring&logoColor=white)](https://spring.io/projects/spring-batch)
[![Oracle Cloud](https://img.shields.io/badge/Oracle%20Cloud-F80000?style=flat&logo=oracle&logoColor=white)](https://www.oracle.com/cloud/free/)
[![Material UI](https://img.shields.io/badge/Material%20UI-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com/material-ui/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white)](https://18.react.dev)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vite.dev)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.com)
[![Let's Encrypt](https://img.shields.io/badge/Let's%20Encrypt-003A70?style=flat&logo=letsencrypt&logoColor=white)](https://letsencrypt.org)
![CI/CD](https://github.com/er3busnote/mo2ver/actions/workflows/deploy.yml/badge.svg)

사용자 맞춤형 의류 중고거래 사이트

## Infra & Concept
![Infra & Concept](./images/INFRA&CONCEPT_v3.PNG)

## Init Setting
- [Spring Data JPA](https://start.spring.io/#!type=gradle-project&language=java&platformVersion=2.7.3&packaging=jar&jvmVersion=1.8&groupId=com.mo2ver&artifactId=mo2ver&name=mo2ver&description=Mo2ver%20project%20for%20Spring%20Boot&packageName=com.mo2ver.web&dependencies=data-jpa,validation,security,mail,devtools,mariadb,lombok)
- [Spring Batch](https://start.spring.io/#!type=gradle-project&language=java&platformVersion=2.7.3&packaging=jar&jvmVersion=1.8&groupId=com.mo2ver&artifactId=batch&name=batch&description=Mo2ver%20project%20for%20Spring%20Batch&packageName=com.mo2ver.batch&dependencies=batch,mariadb,lombok) for **`Data Migration`**

## Compatible
- JAVA: OpenJDK 1.8.0_282
- DB: 10.4.11-MariaDB
- Node: 16.14.2 → 20.11.0 (**`dependency issue..!`**)
- Server: Oracle Cloud VM.Standard.E2.1.Micro → **`1 OCPU`**, **`1GB Memory`** (**`free tier`**)
- Network: Oracle Cloud VCN → **`Internet Gateway`** (**`free tier`** is not support **`NAT Gateway`**)

**Note**: For **dump data**, temporarily used [Fashion Product Images Dataset](https://www.kaggle.com/datasets/paramaggarwal/fashion-product-images-dataset) (with <img src="https://www.kaggle.com/static/images/site-logo.svg" height="18" alt=""/>, **`MIT License`**). Once product verification is complete, the data will be deleted again in batches.

## Demo Website Link
Under construction of demo website.
- URL : [Demo](https://mo2ver.vercel.app/)

## User Page
| 대시보드 | 카테고리 | 대시보드 M | 검색 M |
| :-----: | :-----: | :-----: | :-----: |
| ![Home Page 01](./images/HOME_PC_01.PNG) | ![Home Page 02](./images/HOME_PC_02.PNG) | ![Home Page 03](./images/HOME_MOBILE_01.PNG) | ![Home Page 04](./images/GOODS_SEARCH_MOBILE_01.PNG) |

- **대시보드** (PC) : 반응형 PC 대시보드 화면
- **카테고리** (PC) : 반응형 PC 카테고리 화면
- **대시보드 M** (MOBILE) : 반응형 Mobile 대시보드 화면
- **검색 M** (MOBILE) : 반응형 Mobile 검색 화면 (<ins>**개발 中**</ins>)

| 상품 상세 | 상품 등록 | 장바구니 | 장바구니 M |
| :------: | :------: | :-----: | :-----: |
| ![Detail Page 01](./images/GOODS_DETAIL_PC_01.PNG) | ![Register Page 01](./images/GOODS_REGISTER_PC_01.PNG) | ![Cart Page 01](./images/CART_PC_01.PNG) | ![Cart Page 02](./images/CART_MOBILE_01.PNG) |

- **상품 상세** (PC) : 반응형 PC 상품 상세 화면
- **상품 등록** (PC) : 반응형 PC 상품 등록 화면
- **장바구니** (PC) : 반응형 PC 장바구니 화면
- **장바구니 M** (MOBILE) : 반응형 Mobile 장바구니 화면

| 주문/배송내역 | 상품등록내역 | 주문/배송내역 M |
| :--------: | :--------: | :--------: |
| ![Profile Page 01](./images/MY_PROFILE_PC_01.PNG) | ![Profile Page 02](./images/MY_PROFILE_PC_02.PNG) | ![Profile Page 03](./images/MY_PROFILE_MOBILE_01.PNG) |

- **주문/배송내역** (PC) : 반응형 PC 주문/배송내역 화면 (<ins>**개발 中**</ins>)
- **상품등록내역** (PC) : 반응형 PC 상품등록내역 화면 (<ins>**개발 中**</ins>)
- **주문/배송내역 M** (MOBILE) : 반응형 Mobile 주문/배송내역 화면 (<ins>**개발 中**</ins>)

## Admin Page
| 카테고리 관리 | 배너 메인 이미지 등록 | 배너 메인 이미지 목록 |
| :---------: | :-------: | :-------: |
| ![Category Page 01](./images/CATEGORY_MANAGE_PC_01.PNG) | ![Banner Page 01](./images/BANNER_MANAGE_PC_01.PNG) | ![Banner Page 02](./images/BANNER_MANAGE_PC_02.PNG) |

- **카테고리 관리** (PC) : 반응형 PC 카테고리 관리 화면
- **배너 메인 이미지 등록** (PC) : 반응형 PC 배너 관리 등록 화면
- **배너 메인 이미지 목록** (PC) : 반응형 PC 배너 관리 목록 화면

| 상품 전시 등록  | 상품 전시 선택 | 상품 전시 등록 M | 상품 전시 선택 M |
| :------: | :------: | :------: | :------: |
| ![Goods Page 01](./images/GOODS_MANAGE_PC_01.PNG) | ![Goods Page 02](./images/GOODS_MANAGE_PC_02.PNG) | ![Goods Page 03](./images/GOODS_MANAGE_MOBILE_01.PNG) | ![Goods Page 04](./images/GOODS_MANAGE_MOBILE_02.PNG) |

- **상품 전시 등록** (PC) : 반응형 PC 상품 전시 등록 화면
- **상품 전시 선택** (PC) : 반응형 PC 상품 전시 등록 선택 화면
- **상품 전시 등록 M** (MOBILE) : 반응형 Mobile 전시 등록 화면
- **상품 전시 선택 M** (MOBILE) : 반응형 Mobile 전시 등록 선택 화면

## Contact us
- qudwn0768@naver.com