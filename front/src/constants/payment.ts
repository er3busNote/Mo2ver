export const PAYMENT_OPTIONS = {
	CARD: '카드',
	// VIRTUAL_ACCOUNT: '가상계좌',
	// ACCOUNT_TRANSFER: '계좌이체',
	// MOBILE: '휴대폰',
	// TOSS_PAY: '토스페이',
	// KAKAO_PAY: '카카오페이',
	// SAMSUNG_PAY: '삼성페이',
	// NAVER_PAY: '네이버페이',
	// PAYCO: '페이코',
} as const;

export type PaymentMethod = keyof typeof PAYMENT_OPTIONS;
