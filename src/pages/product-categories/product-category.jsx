/* eslint-disable react/jsx-no-useless-fragment */
import { Helmet } from 'react-helmet-async';
import { ProductCategoryView } from 'src/sections/product-categories';

export default function ProductCategory() {
  return (
    <>
      <Helmet>
        <title> MeatDeli Product </title>
      </Helmet>
      <ProductCategoryView />
    </>
  );
}
