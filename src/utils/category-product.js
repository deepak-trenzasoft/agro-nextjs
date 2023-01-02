const WooCommerceRestApi = require( '@woocommerce/woocommerce-rest-api' ).default;

const api = new WooCommerceRestApi( {
	url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
	consumerKey: process.env.WC_CONSUMER_KEY,
	consumerSecret: process.env.WC_CONSUMER_SECRET,
	version: 'wc/v3',
} );

/**
 * Get Products.
 *
 * @return {Promise<void>}
 */
export const getProductsDataByCategory = async ( id ) => {
	return await api.get(
		'products?category='+id,
		{
			per_page:  50,
		},
	);
};
