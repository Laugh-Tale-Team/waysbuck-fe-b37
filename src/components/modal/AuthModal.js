import React, { useContext, useState } from 'react'
import { Nav, Button, Modal, Form, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { useMutation } from 'react-query';
import { API } from '../../config/api';

export default function AuthModal() {
    
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [message, setMessage] = useState(null);
  const [shows, setShows] = useState(false);
  const handleShows = () => setShows(true);
  const handleCloses = () => setShows(false);

  const switchLogin = () => {
    setShow(true);
    setShows(false);
  };

  const switchRegister = () => {
    setShows(true);
    setShow(false);
  };

  const [state, dispatch] = useContext(UserContext)
  const [form, setForm] = useState({
    email:'',
    password:'',
  })

  const {email, password} = form

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  const navigate = useNavigate()


  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      console.log(body);
      const response = await API.post('/login', body, config);
    
      // const { status, name, email, token } = response.data.data
      if (response?.status === 200) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: response.data.data
        })

        if (response.data.data.status === "admin") {
          navigate('/admin')
        } else {
          navigate('/')
        }
      }
      console.log(response);

    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  const [register, setRegister] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChangeRegister = (e) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitRegister = useMutation(async (e) => {
    e.preventDefault();

    // Configuration Content-type
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    // Data body
    const body = JSON.stringify(register);

    // Insert data user to database
    await API.post("/register", body, config);

    // Handling response here
    setShows(false);
  });
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const email = document.getElementById('emailInput').value
  //   const password = document.getElementById('passwordInput').value
  

  // let status 
  // if (email === 'admin@mail.com') {
  //   status = 'admin'
  //   navigate('/admin')
  // } else {
  //   status = 'user'
  //   navigate('/')
  // }

  // const data ={
  //   email,
  //   password,
  //   status,
  // }

  // dispatch ({
  //   type: 'LOGIN_SUCCESS',
  //   payload: data,
  // })
  // setShow(false)
  // }

 
  
  return (
    <div>
        <Nav>
            <Nav.Link className=" fw-bolder text-danger">
              <Button
                className="btn btn-auth-white fw-semibold px-4"
                variant="danger"
                onClick={handleShow}
              >
                Login
              </Button>
              {message && message}
              <Modal show={show} onHide={handleClose}>
                <Modal.Body closebutton="true">
                  <div>
                    <h1 className="mb-4 text-danger fw-bolder">Login</h1>{" "}
                    <Form >
                        <Form.Control
                          className="formInput border-danger mb-3"
                          type="email"
                          id="emailInput"
                          value={email}
                          name="email"
                          onChange={handleChange}
                          placeholder="your email"
                        />
                        <Form.Control
                          className="formInput border-danger mb-3"
                          type="password"
                          name="password"
                          value={password}
                          onChange={handleChange}
                          id="passwordInput"
                          placeholder="your password"
                        />
                      <Button variant="danger" type="submit" className="w-100" onClick={ (e) => handleSubmit.mutate(e)} >
                        Submit
                      </Button>
                    </Form>
                  </div>
                  <div className="mt-3 text-center">
                    <p>
                      Dont have an account please{" "}
                      <strong
                        className="toReg text-danger point"
                        onClick={switchRegister}
                      >
                        Register
                      </strong>
                    </p>
                  </div>
                </Modal.Body>
              </Modal>

            </Nav.Link>
            <Nav.Link className="me-5 fw-bolder text-danger">
              <Button
                className="btn btn-auth-red fw-semibold px-4"
                variant="danger"
                onClick={handleShows}
              >
                Signup
              </Button>
                {message && message}
              <Modal show={shows} onHide={handleCloses}>
                <Modal.Body>
                  <h1 className="mb-4 text-danger fw-bolder">Register</h1>{" "}
                  <Form >
                      <Form.Control
                        className="formInput border-danger mb-3"
                        type="text"
                        name='name'
                        onChange={handleChangeRegister}
                        placeholder="your name"
                        autoFocus
                        />
                      <Form.Control
                        className="formInput border-danger mb-3"
                        type="email"
                        name='email'
                        onChange={handleChangeRegister}
                        placeholder="your email"
                        autoFocus
                        />
                      <Form.Control
                        type="password"
                        name='password'
                        onChange={handleChangeRegister}
                        className="formInput border-danger mb-3"
                        placeholder="your password"
                        autoFocus
                      />
                    <Button variant="danger" type="submit" className="w-100" onClick={(e) => handleSubmitRegister.mutate(e)}>
                      Submit
                    </Button>
                  </Form>
                  <div className="mt-3 text-center">
                    <p>
                      Already have an account please{" "}
                      <strong
                        className="toLogin text-danger point"
                        onClick={switchLogin}
                      >
                        Login
                      </strong>
                    </p>
                  </div>
                </Modal.Body>
              </Modal>

            </Nav.Link>
          </Nav>
    </div>
  )
}
