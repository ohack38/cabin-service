import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { login } from './API'

const loginUrl = process.env.REACT_APP_NODE_URL

const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };


const LoginComponent = () => {

    const history = useHistory();
    const form = useRef();
    const checkBtn = useRef();

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ loading, setLoading ] = useState(false);
    const [ message, setMessage ] = useState("");
    
    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    }
    
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    }

    const handleLogin = (e) => { 
        e.preventDefault()
        form.current.validateAll();

        setMessage("");
        setLoading(true);

        if (checkBtn.current.context._errors.length === 0) {
          login(email, password).then(() => {
            history.push('/')
          },
          (error)=>{
            const errorRes =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
    
              setLoading(false);
              setMessage(errorRes);
          })
        }
    }



    return (
        <div className='d-flex justify-content-center'>
            <Form onSubmit={handleLogin} ref={form}>
            <div className="">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required]}
                />
              </div>
    
              <div className="">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required]}
                />
              </div>
    
              <div className="">
                <button className="" disabled={loading}>
                  {loading && (
                      <span>Loading..</span>
                  )}
                  <span>Login</span>
                </button>
              </div>
    
              {message && (
                <div className="">
                  <div className="" role="alert">
                    {message}
                  </div>
                </div>
              )}
              <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
        </div>

    );
}

export default LoginComponent;