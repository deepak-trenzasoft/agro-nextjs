import Layout from '../src/components/layout';
import {
	HEADER_FOOTER_ENDPOINT,
	WOOCOMMERCE_COUNTRIES_ENDPOINT,
} from '../src/utils/constants/endpoints';
import { CATEGORIES_ENDPOINT } from '../src/utils/constants/endpoints';
import axios from 'axios';
import CheckoutForm from '../src/components/checkout/checkout-form';

import { getPaymentMethods } from '../src/utils/payment-method/methods';

export default function Checkout({ headerFooter, countries , categories , paymentMethods}) {
	return (
		<Layout headerFooter={headerFooter || {}} categories={categories || {}}>
			<h1>Checkout</h1>
			<CheckoutForm countriesData={countries} paymentMethods={paymentMethods}/>
		</Layout>
	);
}

export async function getStaticProps() {
	
	const { data: headerFooterData } = await axios.get( HEADER_FOOTER_ENDPOINT );
	const { data: countries } = await axios.get( WOOCOMMERCE_COUNTRIES_ENDPOINT );
	const { data: categories } = await axios.get( CATEGORIES_ENDPOINT );

	const { data: paymentMethods } = await getPaymentMethods();

	return {
		props: {
			headerFooter: headerFooterData?.data ?? {},
			countries: countries || {},
			categories: categories || {},
			paymentMethods: paymentMethods || {},
		},
		
		/**
		 * Revalidate means that if a new request comes to server, then every 1 sec it will check
		 * if the data is changed, if it is changed then it will update the
		 * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
		 */
		revalidate: 1,
	};
}
