import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useNewOrderMutation } from "../redux/api/orderAPI";
import { resetCart } from "../redux/reducer/cartReducer";
import { RootState } from "../redux/store";
import { NewOrderRequest } from "../types/api-types";
import { responseToast } from "../utils/features";

const Checkout = () => {
  const stripePromise = loadStripe(
    "pk_test_51OqymoSBSds6sJPXprH8TftBkYLiEi4H1aGnVHMiNdMfBIYspqvS9K4ybGsKL4f2nnNinXa6OhnVG7US08HgDmBT00Wv9nBbeR"
  );

  const location = useLocation();

  const clientSecret: string | undefined = location.state;

  if (!clientSecret) return <Navigate to={"/shipping"} />;

  const CheckoutForm = () => {
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    const { user } = useSelector((state: RootState) => state.userReducer);

    const {
      shippingInfo,
      cartItems,
      subtotal,
      tax,
      shippingCharges,
      discount,
      total,
    } = useSelector((state: RootState) => state.cartReducer);

    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const [newOrder] = useNewOrderMutation();

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!stripe || !elements) return;
      setIsProcessing(true);

      const orderData: NewOrderRequest = {
        shippingInfo,
        orderItems: cartItems,
        subtotal,
        tax,
        discount,
        shippingCharges,
        total,
        user: user?._id!,
      };

      const { paymentIntent, error } = await stripe.confirmPayment({
        elements,
        confirmParams: { return_url: window.location.origin },
        redirect: "if_required",
      });

      if (error) return toast.error(error.message || "Something went wrong.");

      if (paymentIntent.status === "succeeded") {
        const res = await newOrder(orderData);
        dispatch(resetCart());
        responseToast(res, navigate, "/orders");
      }

      setIsProcessing(false);
    };

    return (
      <div className="checkoutContainer">
        <form onSubmit={submitHandler}>
          <PaymentElement />
          <button disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Pay"}
          </button>
        </form>
      </div>
    );
  };

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
      }}
    >
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
