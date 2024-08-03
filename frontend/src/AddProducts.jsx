import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function AddProducts() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [rows, setRows] = useState([
    {
      id: 1,
      productName: "",
      quantity: 1,
      price: "",
      total: 0,
      grandTotal: "",
      coupon: "",
      discountPrice: "",
      selected: false,
    },
  ]);

  const addRow = () => {
    const newRow = {
      id: rows.length + 1,
      productName: "",
      quantity: 1,
      price: "",
      total: 0,
      selected: false,
    };
    setRows([...rows, newRow]);
  };

  function handleChange(e, id) {
    const { name, value } = e.target;
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        if (name === "selected") {
          return { ...row, selected: e.target.checked };
        } else {
          const updatedRow = { ...row, [name]: value };
          if (name === "quantity" || name === "price") {
            updatedRow.total = calculateTotal(
              updatedRow.quantity,
              updatedRow.price
            );
          }
          return updatedRow;
        }
      } else {
        return row;
      }
    });
    setRows(updatedRows);
  }

  const calculateTotal = (quantity, price) => {
    const qty = parseInt(quantity);
    const prc = parseFloat(price);
    return qty * (prc || 0);
  };

  const grandTotal = rows.reduce((total, row) => {
    console.log("total", total);
    return total + calculateTotal(row.quantity, row.price);
  }, 0);

  console.log("grandTotal", grandTotal);

  const [coupon, setCoupon] = useState("");

  const [discountPrice, setDiscountPrice] = useState(0);

  function handleDiscount(e) {
    setCoupon(e.target.value);
    setDiscountPrice(
      grandTotal - grandTotal * (parseInt(e.target.value) / 100)
    );
  }

  useEffect(() => {
    setDiscountPrice(grandTotal - grandTotal * (parseInt(coupon) / 100) || 0);
  }, [grandTotal, coupon]);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (coupon === "") {
      toast.error("Please select coupon")
    } else {
      const data = {
        rows: rows,
        grandTotal: grandTotal,
        coupon: coupon,
        discountPrice: parseInt(discountPrice),
      };
      console.log(data);
      axios
        .post(`http://localhost:8080/product/set`, data)
        .then((response) => {
          console.log("product", response.data);
          toast.success(response.data.msg);
          setTimeout(() => navigate("/"), 1000);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = (e) => {
    console.log(e.target.checked);
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    const updatedRows = rows.map((row) => ({
      ...row,
      selected: isChecked,
    }));
    setRows(updatedRows);
  };

  function handleDelete() {
    handleClose();
    const filteredRows = rows.filter((row) => row.selected === false);
    const updatedRows = filteredRows.map((row, i) => ({
      ...row,
      id: i + 1,
      productName: row.productName,
      quantity: row.quantity,
      price: row.price,
      total: row.total,
    }));
    setRows(updatedRows);
    setSelectAll(false);
  }

  return (
    <div>
      <div className="container-fluid mt-5">
        <div className="container">
          <div className="d-flex justify-content-between">
            <Form.Check
              inline
              label="Select All"
              name="group1"
              className="fs-3 fw-bold"
              type={"checkbox"}
              checked={selectAll}
              id={`inline-1`}
              onChange={handleSelectAll}
            />
            <div className="d-flex gap-5">
              <button className="btn btn-outline-danger" onClick={handleShow}>
                Delete
              </button>
              <button className="btn btn-outline-primary" onClick={addRow}>
                Add
              </button>
            </div>
          </div>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="table-responsive">
              <table class="table table-light table-bordered table-hover align-middle">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">S.No</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <div className="form-check form-check-inline ms-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="selected"
                            id="inlineCheckbox"
                            checked={row.selected}
                            onChange={(e) => handleChange(e, row.id)}
                          />
                        </div>
                      </td>
                      <td>{row.id}</td>
                      <td>
                        <input
                          type="text"
                          name="productName"
                          className="form-control w-75"
                          required
                          value={row.productName}
                          onChange={(e) => handleChange(e, row.id)}
                        />
                      </td>
                      <td>
                        <select
                          className="form-select"
                          name="quantity"
                          value={row.quantity}
                          onChange={(e) => handleChange(e, row.id)}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          name="price"
                          min={"1"}
                          pattern="[1-9]\d*(\.\d+)?"
                          title="Enter only numbers"
                          className="form-control w-50"
                          required
                          value={row.price}
                          onChange={(e) => handleChange(e, row.id)}
                        />
                      </td>
                      <td>₹{calculateTotal(row.quantity, row.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-5 d-flex justify-content-end">
              <div>
                <div className="d-flex gap-1 mb-3">
                  <span>Grand Total : </span>
                  <span className="fw-bold">{grandTotal}</span>
                </div>
                <div className="d-flex gap-3 align-items-center mb-3">
                  <span className="fw-bold text-nowrap">Coupon Code : </span>
                  <select
                    className="form-select"
                    aria-label=".form-select-sm example"
                    required
                    onChange={handleDiscount}
                  >
                    <option selected disabled>
                      Select Coupon
                    </option>
                    <option value="10">Coupon 1</option>
                    <option value="20">Coupon 2</option>
                    <option value="30">Coupon 3</option>
                  </select>
                </div>
                <div className="d-flex gap-1 mb-3">
                  <span>Total : </span>
                  <span className="fw-bold">{discountPrice}</span>
                </div>
                <div>
                  <button className="btn btn-success">Submit</button>
                </div>
              </div>
            </div>
          </form>
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
  );
}

export default AddProducts;
