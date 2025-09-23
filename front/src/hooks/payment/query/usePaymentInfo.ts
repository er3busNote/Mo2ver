import { useQuery } from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { PaymentData, CSRFData } from '@/types/api';
import PaymentService from '@services/PaymentService';

interface PaymentProps {
	payment: ActionCreatorsMapObject;
	orderId: string;
	csrfData?: CSRFData;
}

const usePaymentInfo = ({ payment, orderId, csrfData }: PaymentProps) => {
	const service = new PaymentService(payment);
	return useQuery<PaymentData>({
		queryKey: ['paymentInfo', orderId, csrfData?.csrfToken],
		queryFn: () => service.getPaymentStart(orderId, csrfData),
		enabled: !!orderId,
	});
};

export default usePaymentInfo;
