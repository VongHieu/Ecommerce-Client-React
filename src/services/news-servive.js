import { stringify } from 'query-string';
import { HEADER_TYPES, METHOS_TYPE, callApi } from 'src/utils/axios-instance';
const URI = 'v1/news';
export const newsService = {
  getAllNews: async (p) => await callApi(`${URI}/paging?${stringify(p)}`, METHOS_TYPE.get, HEADER_TYPES.json, null),
};
