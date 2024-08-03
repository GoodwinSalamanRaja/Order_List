const orders = require("../model/orders");
const products = require("../model/products");

exports.insert = (req, res) => {
  const { rows } = req.body;
  console.log(rows);
  const order = new orders({
    grandTotal: req.body.grandTotal,
    coupon: req.body.coupon,
    discountPrice: req.body.discountPrice,
  });
  order
    .save()
    .then((data) => {
      const product = rows.map((product) => {
        return new products({
          name: product.productName,
          quantity: product.quantity,
          price: product.price,
          totalPrice: product.total,
          orderId: data._id,
        });
      });
      products
        .insertMany(product)
        .then((datas) => {
          res
            .status(200)
            .send({ data: datas, msg: "Product added successfully" });
        })
        .catch((e) => {
          console.log(e);
          res.status(401).send(e);
        });
    })
    .catch((e) => {
      console.log(e);
      res.status(401).send(e);
    });
};

exports.list = (req, res) => {
  orders
    .find().sort({createdAt:"desc"})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(401).send(e);
    });
};

exports.sortByPrice = (req, res) => {
  console.log(req.params.value);
  orders
    .find().sort({discountPrice:req.params.value})
    .then((data) => {
      // console.log(data);
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(401).send(e);
    });
};

exports.sortByTime = (req, res) => {
  console.log(req.params.value);
  orders
    .find().sort({createdAt:req.params.value})
    .then((data) => {
      // console.log(data);
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(401).send(e);
    });
};

exports.findById = (req, res) => {
  products
    .find({orderId:req.params.id}).populate("orderId")
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(401).send(e);
    });
};

exports.delete = async (req, res) => {
    orders.findByIdAndDelete(req.params.id)
      .then(async (data) => {
        await products.deleteMany({orderId:data._id})
        res.status(200).send(data);
      })
      .catch((e) => {
        res.status(401).send(e);
      });
  };
