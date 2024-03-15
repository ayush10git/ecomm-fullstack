import { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import { Skeleton } from "../components/Loader";
import TableHOC from "../components/admin/TableHOC";
import { useMyOrdersQuery } from "../redux/api/orderAPI";
import { RootState } from "../redux/store";

type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action: ReactElement;
};

const column: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Orders = () => {
  const { user } = useSelector(
    (state: RootState) => state.userReducer
  );

  const { data, isError, error, isLoading } = useMyOrdersQuery(user?._id!);

  useEffect(() => {
    if (data)
      setRows(
        data.orders.map((i) => ({
          _id: i._id,
          amount: i.total,
          quantity: i.orderItems.length,
          discount: i.discount,
          status: (
            <span
              className={
                i.status === "Processing"
                  ? "red"
                  : i.status === "Shipped"
                  ? "green"
                  : "purple"
              }
            >
              {i.status}
            </span>
          ),
          action: (
            <Link to={`/order/${i._id}`} style={{ padding: "2.5px 6px" }}>
              View
            </Link>
          ),
        }))
      );
  }, [data]);

  const [rows, setRows] = useState<DataType[]>([
    {
      _id: "ajgjagsjxa",
      amount: 42000,
      quantity: 2,
      discount: 500,
      status: <span className="red">Processing</span>,
      action: (
        <Link to={`/order/ajgjagsjxa`} style={{ padding: "2.5px 6px" }}>
          View
        </Link>
      ),
    },
  ]);
  const Table = TableHOC<DataType>(
    column,
    rows,
    "dashboardProductBox",
    "Orders",
    rows.length > 6
  )();
  return (
    <div className="container">
      <h1>My Orders</h1>
      {isLoading ? <Skeleton length={10} /> : Table}
    </div>
  );
};

export default Orders;
