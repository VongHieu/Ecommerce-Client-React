import { Helmet } from 'react-helmet-async';
import { ProductCategoryView } from 'src/sections/product-categories';

export default function ProductCategory() {
  return (
    <>
      <Helmet>
        <title> Danh mục sản phẩm </title>
      </Helmet>
      <ProductCategoryView />
    </>
  );
}
