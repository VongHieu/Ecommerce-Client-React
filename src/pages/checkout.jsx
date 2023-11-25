import { Helmet } from 'react-helmet-async';
import { CheckoutView } from 'src/sections/checkout/view';

export default function CheckoutPage() {
  return (
    <>
      <Helmet>
        <title> Thanh toán </title>
      </Helmet>
      <CheckoutView />
    </>
  );
}
