import React, { useState } from "react";
import { Container, Table } from "react-bootstrap";
import { dataIncome } from "../components/datadummy";
import "../assets/styles.css";
import TransModal from "../components/modal/transModal";
import NavbarAdmin from "../components/navbarAdmin";
import convertRupiah from "rupiah-format";

export default function IncomeTransaction() {
  const [transShow, setTransShow] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const handleTrans = (id) => {
    setOrderId(id);
    setTransShow(true);
  };
  const handleClose = () => setTransShow(false);
  console.log(setTransShow);
  return (
    <div>
      <NavbarAdmin />
      <Container className="mt-5 pt-5">
        <div>
          <h1 className="text-start text-danger fw-semibold mb-5 mt-2">
            Income Transaction
          </h1>
        </div>
        <Table>
          <thead
            style={{ backgroundColor: "#E5E5E5", border: "1px solid grey" }}
          >
            <tr>
              <th style={{ border: "1px solid grey" }}>No</th>
              <th style={{ border: "1px solid grey" }}>Name</th>
              <th style={{ border: "1px solid grey" }}>Address</th>
              <th style={{ border: "1px solid grey" }}>Post Code</th>
              <th style={{ border: "1px solid grey" }}>Income</th>
              <th style={{ border: "1px solid grey" }}>Status</th>
            </tr>
          </thead>
          <tbody className="triggered" style={{ border: "1px solid grey" }}>
            <TransModal
              transShow={transShow}
              Close={handleClose}
              id={orderId}
            />
            {dataIncome.map((item, index) => (
              <tr onClick={() => handleTrans(item.id)} key={index}>
                <td>{index + 1}</td>
                <td style={{ border: "1px solid grey" }}>{item.name}</td>
                <td style={{ border: "1px solid grey" }}>{item.address}</td>
                <td style={{ border: "1px solid grey" }}>{item.postcode}</td>
                <td style={{ border: "1px solid grey" }}>
                  {convertRupiah.convert(item.income)}
                </td>
                <td
                  className={item.status}
                  style={{ border: "1px solid grey" }}
                >
                  {item.status === "success"
                    ? "Success"
                    : item.status === "ontheway"
                    ? "On The Way"
                    : item.status === "waiting"
                    ? "Waiting Approve"
                    : item.status === "canceled"
                    ? "Canceled"
                    : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
