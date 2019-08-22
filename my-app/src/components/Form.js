import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const Form = ({ errors, touched, values, status }) =>{
    const [animals, setAnimals] = useState([]);
    console.log("this is touched", touched);
    useEffect(() => {
      if (status) {
        setAnimals([...animals, status]);
      }
    }, [status]);

    return(
        <div className = "formContainer">
            <Form>
                <Field name = "name" type = "text" placeholder = "name"/>
                <Field name = "email" type = "email" placeholder = "email"/>
                <Field name = "password" type = "password" placeholder = "password"/>
                <Field name = "terms" type = "checkbox" />
            </Form>
        </div>

    );
}


export default Form;