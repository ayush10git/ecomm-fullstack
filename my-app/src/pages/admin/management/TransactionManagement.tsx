import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import {
  useDeleteOrderMutation,
  useOrderDetailsQuery,
  useUpdateOrderMutation,
} from "../../../redux/api/orderAPI";
import { server } from "../../../redux/store";
import { UserReducerInitialState } from "../../../types/reducer-types";
import { OrderItemType, OrderType } from "../../../types/types";
import { Skeleton } from "../../../components/Loader";
import { responseToast } from "../../../utils/features";
import { FaTrash } from "react-icons/fa";

const orderItems: any[] = [];

const TransactionManagment = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const params = useParams();
  const navigate = useNavigate();

  const { data, isError, error, isLoading } = useOrderDetailsQuery(params.id!);
  console.log(data);

  const [order, setOrder] = useState<OrderType>({
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    status: "",
    subtotal: 0,
    discount: 0,
    shippingCharges: 0,
    tax: 0,
    total: 0,
    orderItems: [],
    _id: "",
  });

  useEffect(() => {
    if (data)
      setOrder({
        name: data.order.user.name,
        address: data.order.shippingInfo.address,
        city: data.order.shippingInfo.city,
        state: data.order.shippingInfo.state,
        country: data.order.shippingInfo.country,
        pinCode: data.order.shippingInfo.pinCode,
        status: data.order.status,
        subtotal: data.order.subtotal,
        discount: data.order.discount,
        shippingCharges: data.order.shippingCharges,
        tax: data.order.tax,
        total: data.order.total,
        orderItems,
        _id: data.order._id,
      });
  }, [data]);

  const {
    name,
    address,
    city,
    country,
    state,
    pinCode,
    subtotal,
    shippingCharges,
    tax,
    discount,
    total,
    status,
  } = order;

  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const updateHandler = async () => {
    const res = await updateOrder({
      userId: user?._id!,
      orderId: data?.order._id!,
    });
    responseToast(res, navigate, "/admin/transaction");
  };

  const deleteHandler = async () => {
    const res = await deleteOrder({
      userId: user?._id!,
      orderId: data?.order._id!,
    });
    responseToast(res, navigate, "/admin/transaction");
  };

  if (isError) {
    return <Navigate to={"/404"} />;
  }

  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="productManagement">
        {isLoading ? (
          <Skeleton length={20} />
        ) : (
          <>
            <section style={{ padding: "2rem" }}>
              <h2>Order Items</h2>
              {data?.order.orderItems.map((i) => (
                <ProductCard
                  name={i.name}
                  photo={i.photo}
                  price={i.price!}
                  quantity={i.quantity}
                  _id={i._id}
                />
              ))}
            </section>
            <article className="shippingInfoCard">
              <button className="productDeleteButton" onClick={deleteHandler}>
                <FaTrash />
              </button>
              <h1>Order Info</h1>
              <h5>User Info</h5>
              <p>Name: {name}</p>
              <p>
                Address:{" "}
                {`${address}, ${city}, ${state}, ${country}, ${pinCode}`}
              </p>
              <h5>Amount Info</h5>
              <p>Subtotal: {subtotal}</p>
              <p>Shipping Charges: {shippingCharges}</p>
              <p>Tax: {tax}</p>
              <p>Discount: {discount}</p>
              <p>Total: {total}</p>

              <h5>Status Info</h5>
              <p>
                Status:{" "}
                <span
                  className={
                    status === "Delivered"
                      ? "purple"
                      : status === "Shipped"
                      ? "green"
                      : "red"
                  }
                >
                  {status}
                </span>
              </p>
              <button className="shippingBtn" onClick={updateHandler}>
                Process Status
              </button>
            </article>
          </>
        )}
      </main>
    </div>
  );
};

const ProductCard = ({ name, photo, price, quantity, _id }: OrderItemType) => (
  <div className="transactionProductCard">
    <img src={`${server}/${photo}`} alt={name} />
    <Link to={`/product/${_id}`}>{name}</Link>
    <span style={{ marginLeft: "auto" }}>
      ₹{price} × {quantity} = ₹{price * quantity}
    </span>
  </div>
);

export default TransactionManagment;
