import React from 'react'
import { Form, Field, ErrorMessage, Formik } from 'formik'
import * as Yup from 'yup'
import Button from '../components/Button';
export default function InvoiceForm() {
    return (
        <div className="formPage">
            <div className='form_container'>
            <Formik
                initialValues={{ clientName: '' }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .required('Required')
                })}
                onSubmit={(values) => {
                    setTimeout(() => {
                        console.log(values);

                    }, 400);
                }}
            >
                <Form>
                    <Field type='text' name='clientName' placeholder='Client Name' />
                    <ErrorMessage name='name' />
                    <Field type='text' name='clientName' placeholder='Client Name' />
                    <ErrorMessage name='name' />
                    <Button
                        type={'button'}
                        text={'Add'}
                        style={'btn_primary'}
                    />
                </Form>
            </Formik>
        </div>
        </div>
    )
}
