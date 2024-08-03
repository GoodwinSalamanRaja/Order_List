import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

function ManageOrders() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8080/product/get")
      .then((response) => {
        console.log("products", response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [id, setId] = useState();

  function handleDelete() {
    console.log(id);
    axios
      .delete(`http://localhost:8080/product/delete/${id}`)
      .then((response) => {
        handleClose();
        toast.success("Order deleted successfully");
        console.log("products", response.data);
        setData(data.filter((order) => order._id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const [sort, setSort] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/product/sortByPrice/${sort}`)
      .then((response) => {
        console.log("products", response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [sort]);

  const [sortTime, setSortTime] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/product/sortByTime/${sortTime}`)
      .then((response) => {
        console.log("products", response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [sortTime]);

  return (
    <div>
      <div className="container-fluid mt-5">
        <div className="container">
          <div className="d-flex justify-content-between">
            <h3 className="fw-bold">Order List</h3>
            <div className="d-flex gap-5">
              <div>
                <select
                  class="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option selected disabled>
                    Sort By Price
                  </option>
                  <option value="asc">Low-High</option>
                  <option value="desc">High-Low</option>
                </select>
              </div>
              <div>
                <select
                  class="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                  onChange={(e) => setSortTime(e.target.value)}
                >
                  <option selected disabled>
                    Sort By Time
                  </option>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
              <Link className="btn btn-primary" to={"/AddProducts"}>
                Create
              </Link>
            </div>
          </div>
          <hr />
          <div className="table-responsive">
            <table class="table table-light table-bordered table-hover align-middle">
              <thead>
                <tr className="text-center">
                  <th scope="col">Order-Id</th>
                  <th scope="col">Grand Total</th>
                  <th scope="col">Details</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(data) &&
                  data.map((order) => (
                    <tr key={order._id} className="text-center">
                      <td>{order._id}</td>
                      <td>{order.discountPrice}</td>
                      <td>
                        <Link
                          className="btn btn-primary"
                          to={`/ViewProducts/${order._id}`}
                        >
                          View
                        </Link>
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => {
                            setId(order._id);
                            handleShow();
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title className="fw-bold">Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure to delete?</Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="success" onClick={handleDelete}>
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default ManageOrders;
