/* eslint-disable no-return-await */
import { HEADER_TYPES, METHOS_TYPE, callApi } from 'src/utils/axios-instance';

const URI = 'v1/product/';
export const productService = {
  getProductByProductCategory: async () =>
    await callApi(`${URI}product-category`, METHOS_TYPE.get, HEADER_TYPES.json, null),
  getAllProduct: async () =>
    await callApi(`${URI}get-all`, METHOS_TYPE.get, HEADER_TYPES.json, null),
};
