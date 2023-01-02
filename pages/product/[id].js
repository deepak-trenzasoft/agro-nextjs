/**
 * Internal Dependencies.
 */
import Products from '../../src/components/products';
import { HEADER_FOOTER_ENDPOINT } from '../../src/utils/constants/endpoints';
import { CATEGORIES_ENDPOINT } from '../../src/utils/constants/endpoints';
import { getProductDataById } from '../../src/utils/product/single-product';

import Image from '../../src/components/image';
import AddToCart from '../../src/components/cart/add-to-cart';
//import AddToCart from '../cart/add-to-cart';

/**
 * External Dependencies.
 */
import axios from 'axios';
import Layout from '../../src/components/layout';
import { getProductsData } from '../../src/utils/products';
import { sanitize } from '../../src/utils/miscellaneous';

//import { sanitize } from '../../utils/miscellaneous';

export default function Home({ headerFooter, product, categories }) {

	console.log(product)
	const productData = product[0]
	const img = productData?.images?.[0] ?? {};
	const productType = productData?.type ?? '';

	return (
		<Layout headerFooter={headerFooter || {}} categories={categories || {}}>
			<div className="product-index-view" >
				<div className='product-block'>
					<Image
						sourceUrl={ img?.src ?? '' }
						altText={ img?.alt ?? ''}
						title={ productData?.name ?? '' }
						width="480"
						height="480"
					/>
					<div className="product-details">
						<h1 className='title'>{productData.name}</h1>

						<div className="mb-4" dangerouslySetInnerHTML={{ __html: sanitize( productData?.price_html ?? '' ) }}/>
						<div className="mb-4" dangerouslySetInnerHTML={{ __html: sanitize( productData?.description ?? '' ) }}/>

						{ 'simple' === productType ? <AddToCart product={productData}/> : null }
					</div>
				</div>
			</div>
		</Layout>
	)
}

export async function getStaticPaths() {


    const products = await getProductsData();

    const data = products.data;
  
    const paths = data.map((product) => ({
      params: { id: product.slug.toString() },
    }))

    return {
      paths: paths,
      fallback: true, // can also be true or 'blocking'
    }
  }


export async function getStaticProps(context) {

    const id = context.params.id;
	
	const { data: headerFooterData } =  await axios.get( HEADER_FOOTER_ENDPOINT );
	const { data: product } = await getProductDataById(id);
    //const { data: products } = await getProductsData();

    const { data: categories } = await axios.get( CATEGORIES_ENDPOINT );

    console.log('tt' + id)
	
	return {
		props: {
			headerFooter: headerFooterData?.data ?? {},
			product: product ?? {},
            categories: categories ?? {}
		},
		revalidate: 1,
	};
}

  
