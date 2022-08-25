import React, { useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import paperclip from "../assets/paperclip.png";
import NavbarAdmin from "../components/navbarAdmin";
import ProductAdd from "../components/modal/productAdd";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../config/api";

function AddProduct() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
  });

  const [viewLabel, setViewLabel] = useState(null);
  const [labelName, setLabelName] = useState("");
  const [addProduct, setAddProduct] = useState(false);
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

      const response = await API.post("/product", formData, config);
      console.log(response);

      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  });

  const handleCloseAp = () => setAddProduct(false);
  console.log(setAddProduct);

  return (
    <div>
      <NavbarAdmin />
      <Container className="mt-5 pt-5">
        <Row>
          <Col xs={12} md={7}>
            <Form onSubmit={(e) => handleSubmit.mutate(e)}>
              <div className="add-title text-danger mb-5">
                <h1 className="fw-bold">Product</h1>
              </div>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Name product"
                  onChange={handleChange}
                  className="form-box mb-4"
                />
                <Form.Control
                  type="number"
                  name="price"
                  id="price"
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
                    className="form-control"
                    name="image"
                    id="inputgroupfile2"
                    onChange={handleChange}
                    hidden
                    required
                  />
                  <label
                    className="d-flex jc-between ai-center input-group-text form-box"
                    htmlFor="inputgroupfile2"
                    style={{ width: "100%", borderRadius: "5px" }}
                  >
                    {" "}
                    {labelName === "" ? "Add Product" : labelName}{" "}
                    <img src={paperclip} alt="" className="" />
                  </label>
                </div>
              </Form.Group>
              <Button
                className="btn btn-danger"
                style={{ width: "70%" }}
                type="submit"
              >
                Add Product
              </Button>
              <ProductAdd addProduct={addProduct} Close={handleCloseAp} />
            </Form>
          </Col>
          <Col xs={12} md={5} className="mt-5">
            {viewLabel && (
              <img
                src={viewLabel}
                className=""
                style={{ height: "80%", borderRadius: "10px" }}
                alt="view"
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AddProduct;
