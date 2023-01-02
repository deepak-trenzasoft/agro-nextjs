/**
 * Internal Dependencies.
 */
import Products from '../../src/components/products';
import { HEADER_FOOTER_ENDPOINT } from '../../src/utils/constants/endpoints';
import { CATEGORIES_ENDPOINT } from '../../src/utils/constants/endpoints';
import { getProductsDataByCategory } from '../../src/utils/category-product';

/**
 * External Dependencies.
 */
import axios from 'axios';
import Layout from '../../src/components/layout';


export default function Home({ headerFooter, products, categories }) {

	return (
		<Layout headerFooter={headerFooter || {}} categories={categories || {}}>
			<Products products={products}/>
		</Layout>
	)
}

export async function getStaticPaths() {


    const categories = await axios.get( CATEGORIES_ENDPOINT );

    const data = categories.data;
  
    const paths = data.categories.map((category) => ({
      params: { id: category.id.toString() },
    }))

    return {
      paths: paths,
      fallback: true, // can also be true or 'blocking'
    }
  }


export async function getStaticProps(context) {

    const id = context.params.id;
	
	const { data: headerFooterData } =  await axios.get( HEADER_FOOTER_ENDPOINT );
	const { data: products } = await getProductsDataByCategory(id);
    //const { data: products } = await getProductsData();

    const { data: categories } = await axios.get( CATEGORIES_ENDPOINT );

    console.log('tt' + id)
	
	return {
		props: {
			headerFooter: headerFooterData?.data ?? {},
			products: products ?? {},
            categories: categories ?? {}
		},
		
		/**
		 * Revalidate means that if a new request comes to server, then every 1 sec it will check
		 * if the data is changed, if it is changed then it will update the
		 * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
		 */
		revalidate: 1,
	};
}

  
