import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { PaymentData, PaymentInfoData, CSRFData } from '@api/types';

interface PaymentProps {
	payment: ActionCreatorsMapObject;
	paymentInfoData: PaymentInfoData;
	csrfData: CSRFData;
}

const usePaymentInfo = ({
	payment,
	paymentInfoData,
	csrfData,
}: PaymentProps): PaymentData => {
	const [data, setData] = useState<PaymentData>(new Object() as PaymentData);

	const fetchAndSetData = useCallback(async () => {
		const data = await payment.start(paymentInfoData, csrfData);
		setData(data);
	}, [csrfData.csrfToken]);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return data;
};

export default usePaymentInfo;
