import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const UserForm = ({ errors, touched, values, status }) => {
    const [users, setUsers] = useState([]);
    console.log("this is touched", touched);
    useEffect(() => {
        if (status) {
            setUsers([...users, status]);
        }
    }, [status]);

    return (
        <div className="formContainer">
            <Form>
                <Field name="name" type="text" placeholder="Name" />
                {touched.name && errors.name && (
                    <p className="error">{errors.name}</p>
                )}

                <Field name="email" type="email" placeholder="E-mail" />
                {touched.email && errors.email && (
                    <p className="error">{errors.email}</p>
                )}

                <Field name="password" type="password" placeholder="Password (6+ Chars)" />
                {touched.password && errors.password && (
                    <p className="error">{errors.password}</p>
                )}

                <label className="checkbox-container">
                    Terms of Service
                <Field name="terms" type="checkbox" checked = {values.terms}/>
                </label>

                <button type="submit">Submit</button>
            </Form>
        </div>

    );
};


const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, terms }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("You forgot to enter a name dude..."),
        email: Yup.string().required("You forgot an email, c'mon bro."),
        password: Yup.string().min(6, "Password must be at least 6 characters long, It literally says it on the form my guy ").required("Oh yeah for sure, let's just make an account with no password... smh"),
        terms: Yup.boolean().required("Read the terms, or don't, just please, click the check box")
    }),

    handleSubmit(values, { setStatus }) {
        axios
            .post("https://reqres.in/api/users/", values)
            .then(res => {
                setStatus(res.data);
            })
            .catch(err => console.log(err.response));
    }

})(UserForm)


export default FormikUserForm;