import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ViewProducts() {
  const { id } = useParams();
  console.log(id);

  const [data, setData] = useState();
  const [order, setOrder] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/product/getById/${id}`)
      .then((response) => {
        console.log("products", response.data);
        setData(response.data);
        setOrder(response.data[0].orderId);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
      <div className="container-fluid mt-5">
        <div className="container">
          <div className="table-responsive">
            <table class="table table-light table-bordered table-hover align-middle">
              <thead>
                <tr>
                  <th scope="col">Product Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(data) &&
                  data.map((product) => (
                    <tr key={product._id}>
                      <td>{product.name}</td>
                      <td>{product.quantity}</td>
                      <td>{product.price}</td>
                      <td>{product.totalPrice}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {order && (
            <div className="mt-5 d-flex justify-content-end">
              <div>
                <div className="d-flex gap-1 mb-3">
                  <span>Grand Total : </span>
                  <span className="fw-bold">{order.grandTotal}</span>
                </div>
                <div className="d-flex gap-1 align-items-center mb-3">
                  <span className="text-nowrap">Discount : </span>
                  <span className="fw-bold">{order.coupon}%</span>
                </div>
                <div className="d-flex gap-1 mb-3">
                  <span>Total : </span>
                  <span className="fw-bold">{order.discountPrice}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewProducts;
