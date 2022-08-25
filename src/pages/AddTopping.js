import React, { useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import "../assets/styles.css";
import paperclip from "../assets/paperclip.png";
import NavbarAdmin from "../components/navbarAdmin";
import ToppingAdd from "../components/modal/toppingAdd";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../config/api";

export default function AddTopping() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
  });

  const [viewLabel, setViewLabel] = useState(null);
  const [labelName, setLabelName] = useState("");
  const [addTopping, setAddTopping] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setViewLabel(url);
      setLabelName(e.target.files[0].name);
    }
  };

  let navigate = useNavigate();

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("title", form.title);
      formData.set("price", form.price);
      console.log(form);

      const response = await API.post("/topping", formData, config);
      console.log(response);

      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  });

  const handleCloseAdd = () => setAddTopping(false);
  console.log(setAddTopping);

  return (
    <div>
      <Container className="mt-5 pt-5">
        <NavbarAdmin />
        <Row>
          <Col xs={12} md={7}>
            <Form onSubmit={(e) => handleSubmit.mutate(e)}>
              <div className="add-title text-danger mb-5">
                <h1 className="fw-bold">Toping</h1>
              </div>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Name product"
                  className="form-box mb-4"
                  onChange={handleChange}
                />
                <Form.Control
                  type="number"
                  name="price"
                  placeholder="Price"
                  className="form-box mb-4"
                  onChange={handleChange}
                />
                <div
                  className="input-group  mb-4"
                  style={{ borderRadius: "5px" }}
                >
                  <input
                    type="file"
                    name="image"
                    className="form-control"
                    id="addToppingImage"
                    onChange={handleChange}
                    hidden
                    required
                  />
                  <label
                    className="d-flex jc-between ai-center input-group-text form-box"
                    htmlFor="addToppingImage"
                    style={{ width: "100%", borderRadius: "5px" }}
                  >
                    {" "}
                    {labelName === "" ? "Add Topping" : labelName}{" "}
                    <img src={paperclip} alt="" className="" />
                  </label>
                </div>
              </Form.Group>
              <Button
                className="btn btn-auth-red"
                style={{ width: "70%" }}
                type="submit"
              >
                Add Topping
              </Button>
              <ToppingAdd addTopping={addTopping} Close={handleCloseAdd} />
            </Form>
          </Col>
          <Col xs={12} md={5}>
            {viewLabel && (
              <img
                src={viewLabel}
                alt="view"
                style={{ width: "70%", borderRadius: "7px" }}
                className=""
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
