import React, { useContext, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import NavbarLogin from "../components/navbarUser";
import { useNavigate, useParams } from "react-router-dom";
import convertRupiah from "rupiah-format";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";

function Detail() {
  const navigate = useNavigate();

  const [topping, setTopping] = useState([]);
  const [topping_id, setIdTopping] = useState([]);

  const handleChange = (e) => {
    let updateTopping = [...topping];
    if (e.target.checked) {
      updateTopping = [...topping, e.target.value];
    } else {
      updateTopping.splice(topping.indexOf(e.target.value));
    }
    setTopping(updateTopping);

    let toppingId = [...topping_id];
    if (e.target.checked) {
      toppingId = [...topping_id, parseInt(e.target.id)];
    } else {
      toppingId.splice(topping_id.indexOf(e.target.id));
    }
    setIdTopping(toppingId);
  };

  let { id } = useParams();
  let { data: product } = useQuery("productCache", async () => {
    const response = await API.get("/product/" + id);
    return response.data.data;
  });

  let { data: toppings } = useQuery("toppingCache", async () => {
    const resp = await API.get("/toppings");
    return resp.data.data;
  });

  let resultTotal = topping.reduce((a, b) => {
    return a + parseInt(b);
  }, 0);

  let subtotal = product?.price + resultTotal;
  let qty = 1;

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "applicaton/json",
        },
      };
      const body = JSON.stringify({
        topping_id: topping_id,
        subtotal: subtotal,
        product_id: parseInt(id),
        qty: qty,
      });
      const response = await API.post("/cart", body, config);
      console.log(response);

      navigate("/cart");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div>
      <NavbarLogin />
      <Container className="mt-5 pt-5">
        <Row>
          <Col xs={12} md={5}>
            <img
              src={product?.image}
              style={{ width: "80%" }}
              className="img-fluid"
              alt="transaction"
            />
          </Col>
          <Col xs={12} md={7} style={{ backgroundColor: "white" }}>
            <div>
              <h1 className="text-start text-danger fw-bold mb-3">
                {product?.title}
              </h1>
            </div>
            <div className="mb-3">
              <p
                className="text-start text-danger"
                style={{ fontSize: "22px" }}
              >
                {convertRupiah.convert(product?.price)}
              </p>
            </div>
            <div className="mb-5 mt-3">
              <h3
                className="text-start fw-bold mb-3"
                style={{ color: "#974A4A" }}
              >
                Topping
              </h3>
              <Row>
                {toppings?.map((item, index) => (
                  <Col className="topping" xs={4} md={3}>
                    <input
                      type="checkbox"
                      className="checkbox-toping"
                      id={item?.id}
                      value={item?.price}
                      onChange={handleChange}
                      name="topping"
                    />

                    <label htmlFor={item?.id}>
                      <img src={item?.image} alt="" />
                    </label>
                    <p className="text-align-center text-danger fw-semibold ">
                      {item.title}
                    </p>
                  </Col>
                ))}
              </Row>
            </div>
            <div className="d-flex justify-content-between">
              <h2 className="text-danger fw-bold fs-4 mt-3 mb-5">Total</h2>
              <h2 className="text-danger fw-bold fs-4 mt-3 mb-5">
                {convertRupiah.convert(product?.price + resultTotal)}{" "}
              </h2>
            </div>
            <div className="">
              <Button
                className="btn btn-auth-red fw-bold mb-4"
                style={{ width: "100%" }}
                onClick={(e) => handleSubmit.mutate(e)}
              >
                Add to Cart
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Detail;
