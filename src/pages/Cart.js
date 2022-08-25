import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
// import NavbarUser from '../components/navbar';
import iceblend from "../assets/ice-blend.png";
import DeleteModal from "../components/modal/deleteModal";
import trash from "../assets/trash2.svg";
import PaymentModal from "../components/modal/paymentmodal";
import { UserContext } from "../context/userContext";
import NavbarLogin from "../components/navbarUser";
import { cartList, dataProduct } from "../components/datadummy";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";

const order = cartList.order;

export default function Cart() {
  const [payShow, setPayShow] = useState(false);
  const handlePay = () => setPayShow(true);
  const handleClose = () => setPayShow(false);
  //   console.log(setPayShow);

  const [listDel, setListDel] = useState(false);
  const handleDel = () => setListDel(true);
  const handleCloseDel = () => setListDel(false);
  //   console.log(setListDel);

  const [state, dispatch] = useContext(UserContext);
  const [addCart, setAddChart] = useState(0);

  let navigate = useNavigate();

  let { data: cart, refetch } = useQuery("cartsCache", async () => {
    const response = await API.get("/carts-id");
    return response.data.data;
  });
  console.log(cart);

  //subtotal
  let resultTotal = cart?.reduce((a, b) => {
    return a + b.subtotal;
  }, 0);

  //remove
  let handleDelete = async (id) => {
    console.log(id);
    await API.delete(`/cart/` + id);
    refetch();
  };

  //pay
  const form = {
    status: "pending",
    total: resultTotal,
  };
  const handleSubmit = useMutation(async (e) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const body = JSON.stringify(form);

    const response = await API.patch("/transactionID", body, config);
    console.log(response.data.data.token);

    const token = response.data.data.token;

    window.snap.pay(token, {
      onSuccess: function (result) {
        /* You may add your own implementation here */
        console.log(result);
        navigate("/profile");
      },
      onPending: function (result) {
        /* You may add your own implementation here */
        console.log(result);
        navigate("/profile");
      },
      onError: function (result) {
        /* You may add your own implementation here */
        console.log(result);
      },
      onClose: function () {
        /* You may add your own implementation here */
        alert("you closed the popup without finishing the payment");
      },
    });

    await API.patch("/cart_id", body, config);
  });

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "Client key here ...";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <div>
      <NavbarLogin show={addCart} />
      <Container className="mt-5">
        <Row className="">
          <Col xs={12} md={7} className="mt-5 py-5 px-4" style={{}}>
            <div className="text-danger text-start">
              <h3 className="  fw-bold">My Cart</h3>
              <p>Review your order</p>
            </div>
            <div
              style={{
                backgroundColor: "white",
                borderTop: "2px solid red",
                borderBottom: "2px solid red",
              }}
            >
              <Row className="p-3">
                {cart?.map((item, index) => (
                  <>
                    <Col xs={12} md={2} style={{}}>
                      <img
                        src={item?.product?.image}
                        alt="cartImage"
                        style={{ width: "100%", borderRadius: "8px" }}
                      />
                    </Col>
                    <Col xs={12} md={6} style={{}}>
                      <ul className="description justify-content-start align-items-center pt-4 ps-0 mb-0">
                        <li>
                          <p className="text-danger fw-bold">
                            {item?.product?.title}
                          </p>
                        </li>
                        <li>
                          <p className="text-danger text-start fw-semibold">
                            Boba :
                            <span className="text-danger ">
                              {item.topping?.map((topping, idx) => (
                                <span className="d-inline" key={idx}>
                                  {topping.title},
                                </span>
                              ))}{" "}
                            </span>
                          </p>
                        </li>
                      </ul>
                    </Col>
                    <Col xs={12} md={4} style={{}}>
                      <ul className="description text-end align-items-center pt-4 pr-3 ps-0 mb-0">
                        <li>
                          <p className="text-danger fw-semibold">
                            Rp {item?.subtotal}
                          </p>
                        </li>
                        <li>
                          <i
                            className="trash-btn"
                            onClick={() => handleDelete(item.id)}
                          >
                            <img src={trash} alt="" style={{ width: "" }} />
                          </i>
                        </li>
                        <DeleteModal listDel={listDel} Close={handleCloseDel} />
                      </ul>
                    </Col>
                  </>
                ))}
              </Row>
            </div>
          </Col>
          <Col xs={12} md={5} className="mt-5 p-5">
            <div className="text-white">
              <h3 className="  fw-bold">My Cart</h3>
              <p>Review yor order</p>
            </div>
            <div
              className="p-2"
              style={{
                borderTop: "2px solid red",
                borderBottom: "2px solid red",
                width: "80%",
              }}
            >
              <div className="d-flex justify-content-between">
                <p className="text-danger">Subtotal</p>
                <p className="text-danger">Rp. {resultTotal}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="text-danger">Qty</p>
                <p className="text-danger">{cart?.length}</p>
              </div>
            </div>
            <div
              className="d-flex justify-content-between"
              style={{ width: "80%" }}
            >
              <p className="text-danger fw-bold">Total</p>
              <p className="text-danger fw-bold"> Rp.{resultTotal}</p>
            </div>
            <div className="mt-5" style={{ width: "80%" }}>
              <Button
                type="submit"
                onClick={(e) => handleSubmit.mutate(e)}
                className="btn btn-danger fw-bold px-5"
                style={{ width: "100%" }}
              >
                Pay
              </Button>
              <PaymentModal payShow={payShow} Close={handleClose} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
