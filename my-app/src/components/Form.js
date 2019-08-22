import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const UserForm = ({ errors, touched, values, status }) => {
    const [user, setUser] = useState([]);
    console.log("this is touched", touched);
    useEffect(() => {
        if (status) {
            setUser([...user, status]);
        }
    }, [status]);

    return (
        <div className="formContainer">
            <Form>
                <div className="formInput">
                    <h2>Name</h2>
                    <Field name="name" type="text" placeholder="Name" />
                    {touched.name && errors.name && (
                        <p className="error">{errors.name}</p>
                    )}
                </div>

                <div className="formInput">
                    <h2>E-mail</h2>
                    <Field  name="email" type="email" placeholder="E-mail" />
                    {touched.email && errors.email && (
                        <p className="error">{errors.email}</p>
                    )}
                </div>

                <div className="formInput">
                    <h2>Password</h2>
                    <Field name="password" type="password" placeholder="Password (6+ Chars)" />
                    {touched.password && errors.password && (
                        <p className="error">{errors.password}</p>
                    )}
                </div>

                <br />

                <div className="formInput">
                    <label className="checkbox-container">
                        I have read and agree to the terms or whatever
                    <br />
                        <Field name="terms" type="checkbox" checked={values.terms} />
                        {touched.terms && errors.terms && (
                            <p className="error">{errors.terms}</p>
                        )}
                    </label>
                </div>


                <div className="formInput"></div>
                <button type="submit">Submit</button>
            </Form>

            <div className="infoDisplay">
                {user.map(info => (
                    <div className="infoCard">
                        <ul key={info.id}>
                            <h4>Haha I have your data nerd</h4>
                            <li>Name:  {info.name}</li>
                            <li>E-mail:  {info.email}</li>
                            <li>Password:  {info.password}</li>
                        </ul>
                    </div>
                ))}
            </div>


        </div>

    );
};

const checkIfWaffle = (value) =>{
    if(value === 'waffle@syrup.com'){
        return true;
    }
    return false;    
    
}

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
        email: Yup
        .string()
        // .test(checkIfWaffle(email), 'That e-mail is already in use, how could you not know that??')
        .required("You forgot an e-mail, c'mon bro"),
        password: Yup.string().min(6, "Password must be at least 6 characters long, It literally says it on the form my guy ").required("Oh yeah for sure, let's just make an account with no password... smh"),
        
        
        terms: Yup.bool()
            .test('consent',
                "Read the terms, or don't, just please, click the check box",
                value => value === true)
            .required("")
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