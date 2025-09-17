import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { PaymentData, CSRFData } from '@/types/api';

interface PaymentProps {
	payment: ActionCreatorsMapObject;
	orderId: string;
	csrfData?: CSRFData;
}

const usePaymentInfo = ({
	payment,
	orderId,
	csrfData,
}: PaymentProps): PaymentData => {
	const [data, setData] = useState<PaymentData>(new Object() as PaymentData);

	const fetchAndSetData = useCallback(async () => {
		const data = await payment.start(orderId, csrfData);
		setData(data);
	}, [csrfData?.csrfToken]);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return data;
};

export default usePaymentInfo;
