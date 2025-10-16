import { useEffect, useRef, useState, RefObject } from 'react';
import {
	loadTossPayments,
	ANONYMOUS,
	TossPaymentsWidgets,
} from '@tosspayments/tosspayments-sdk';
import { AmountData } from '@/types/payment';
import { MemberData } from '@/types/api';

interface TossPaymentProps {
	orderId: string;
	clientKey: string;
	memberData?: MemberData;
}

interface TossPaymentResultProps {
	paymentMethodRef: RefObject<HTMLDivElement>;
	agreementRef: RefObject<HTMLDivElement>;
	setAmount: (amount: AmountData) => Promise<void>;
	handlePayment: () => Promise<void>;
}

const useTossPaymentWidget = ({
	orderId,
	clientKey,
	memberData,
}: TossPaymentProps): TossPaymentResultProps => {
	const paymentMethodRef = useRef(null);
	const agreementRef = useRef(null);
	const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);

	useEffect(() => {
		const initialize = async () => {
			try {
				const tossPayments = await loadTossPayments(clientKey);

				const widgetsInstance = tossPayments.widgets({
					customerKey: ANONYMOUS, // 실서비스에선 고유 사용자 키 사용
				});

				setWidgets(widgetsInstance);
			} catch (err) {
				console.error('Toss SDK 초기화 실패', err);
			}
		};

		if (!clientKey) return;

		initialize();
	}, [clientKey]);

	const setAmount = async (amount: AmountData) => {
		if (!widgets) return;
		await widgets.setAmount(amount);

		await Promise.all([
			widgets.renderPaymentMethods({
				selector: '#payment-method',
				variantKey: 'DEFAULT',
			}),
			widgets.renderAgreement({
				selector: '#agreement',
				variantKey: 'AGREEMENT',
			}),
		]);
	};

	const handlePayment = async () => {
		if (!widgets) return;

		try {
			await widgets.requestPayment({
				orderId: orderId,
				orderName: '토스 티셔츠 외 2건',
				successUrl: window.location.origin + '/sandbox/success',
				failUrl: window.location.origin + '/sandbox/fail',
				customerEmail: memberData?.email,
				customerName: memberData?.memberName,
				customerMobilePhone: memberData?.cellPhoneNumber,
			});
		} catch (err) {
			console.error('결제 요청 실패', err);
		}
	};

	return {
		paymentMethodRef,
		agreementRef,
		setAmount,
		handlePayment,
	};
};

export default useTossPaymentWidget;
