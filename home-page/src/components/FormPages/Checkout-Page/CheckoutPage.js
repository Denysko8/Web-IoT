import React from 'react';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import './CheckoutPage.css';
import ErrorMessage from '../Errors/ErrorMessage';

const CheckoutPage = () => {
    const validationSchema = Yup.object({
        firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('First name is required'),
        lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Last name is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        phoneNumber: Yup.string()
            .matches(/^[0-9]+$/, 'Must be only digits') // RegEx validation
            .min(10, 'Must be exactly 10 digits')
            .max(10, 'Must be exactly 10 digits')
            .required('Phone number is required'),
        address: Yup.string()
            .required('Address is required'),
    });

    const handleSubmit = (values, { setSubmitting }) => {
        console.log('Form values:', values);
        setSubmitting(false);
        // Redirect to success page
        window.location.href = '/success';
    };

    return (
        <div className="checkout-page">
            <h2>Checkout</h2>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    address: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <Field name="firstName" type="text" />
                            <FormikErrorMessage name="firstName" component={ErrorMessage} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <Field name="lastName" type="text" />
                            <FormikErrorMessage name="lastName" component={ErrorMessage} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field name="email" type="email" />
                            <FormikErrorMessage name="email" component={ErrorMessage} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <Field name="phoneNumber" type="text" />
                            <FormikErrorMessage name="phoneNumber" component={ErrorMessage} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <Field name="address" type="text" />
                            <FormikErrorMessage name="address" component={ErrorMessage} />
                        </div>
                        <button type="submit" disabled={isSubmitting}>Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CheckoutPage;