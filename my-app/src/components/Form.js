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
})(UserForm)


export default UserForm;