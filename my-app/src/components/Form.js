import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const UserForm = ({ errors, touched, values, status }) => {
    const [animals, setAnimals] = useState([]);
    console.log("this is touched", touched);
    useEffect(() => {
        if (status) {
            setAnimals([...animals, status]);
        }
    }, [status]);

    return (
        <div className="formContainer">
            <Form>
                <Field name="name" type="text" placeholder="name" />
                <Field name="email" type="email" placeholder="email" />
                <Field name="password" type="password" placeholder="password" />

                <label className="checkbox-container">
                    Terms of Service
                <Field name="terms" type="checkbox" />
                </label>

                <button>Submit</button>
            </Form>
        </div>

    );
};


const FormikUserForm = withFormik({
    mapPropsToValues({ errors, touched, values, status }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("Enter a name"),
        email: Yup.string().required("Enter an email"),
        password: Yup.string().min(6,"Password must be at least 6 characters long").required("Enter a password"),
        terms: Yup.boolean().required("Please agree to terms of service")
    })

})(UserForm)


export default UserForm;