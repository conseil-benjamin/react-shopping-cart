import axios from 'axios';
import { IGetProductsResponse } from 'models';

export const getProducts = async () => {
  let response: IGetProductsResponse;

  response = await axios.get(
    'https://fakestoreapi.com/products'
  );

  return response.data;
};
