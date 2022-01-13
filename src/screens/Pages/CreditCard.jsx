import React from 'react'
import '../../customcss/custom.css'
import { Form, Input, Button, Checkbox, Select, Row, Col, Card, Upload,DatePicker, Space, Tag, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CreditCard() {
    return (
        <>
            <section id='img-bg'>
                <div className='overlay'>
                    <div className='bone-bg'>
                        <h1 className='logos'>LOGLY</h1>
                        <div className='container py-5'>
                            <div className='row'>
                                <div className='col-12 col-md-6'>

                                </div>
                                <div className='col-12 col-md-6 marg'>
                                <motion.div
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                            >
                                    <h1 className='bold f-s reg-acc'>Register Account</h1>
                                    <p className=' f-size reg-get'>Let's Get Registered</p>
                                     <Form
                                     layout='vertical'
                                    name="basic"
                                    labelCol={{ span: 10 }}
                                    wrapperCol={{ span: 10 }}
                                    initialValues={{ remember: true }}
                                    className='mt-5'
                                    autoComplete="off"
                                    >
                                    <Form.Item
                                    label="Card Number"
                                        name="cardnumber"
                                        rules={[{ required: true, message: 'Please input your card number!' }]}
                                    >
                                        <Input className='border-radius-forms' placeholder='0000 1234 0123 0125'/>
                                    </Form.Item>

                                    
                                    <div className='row rows'>
                                        <div className='col-12 col-md-6'>
                                        <Form.Item
                                    label="Expiry Date"
                                        name="expirydate"
                                        rules={[{ required: true, message: 'Please input your expiry date!' }]}
                                    >
                                    <Space direction="vertical">
                                        <DatePicker className='border-radius-forms' />
                                    </Space>
                                    </Form.Item>
                                        </div>

                                        <div className='col-12 col-md-6 mar-left'>
                                        <Form.Item
                                    label="CW"
                                        name="cw"
                                        rules={[{ required: true, message: 'Please input your cw!' }]}
                                    >
                                        <Input className='border-radius-forms' placeholder='315'/>
                                    </Form.Item>
                                        </div>
                                    </div>
                                    <Form.Item
                                    label="Name"
                                        name="name"
                                        className='rows'
                                        rules={[{ required: true, message: 'Please input your name!' }]}
                                    >
                                        <Input className='border-radius-forms ' placeholder='Jacob andrew'/>
                                    </Form.Item>
                                    <Checkbox defaultChecked className='checked rows'>Save Card Details</Checkbox>
                                   <div className='top mt-4'>
                                   <h6 className='h6-size'>Business Account &nbsp; &nbsp; &nbsp; <Link to="/pricelist" className='text-black'><i className="fas fa-edit"></i></Link></h6> 
                                    <h6 className='h6-size'>Professional Package &nbsp; &nbsp; &nbsp; <Link to="/packages" className='text-black'><i className="fas fa-edit"></i></Link> &nbsp; &nbsp; &nbsp;  <Tag className='tags' color="geekblue">$999.9</Tag></h6>
                                   </div>
                                   <Link to="/registereddetails" className='text-white'>
                                    <Button className='btn-bg mt-4 fonts-sizes' type="primary">BACK</Button></Link> 
                                    <Link to="/thankyou" className='text-white'>
                                    <Button className='btn-bg mt-4 fonts-sizes col-4  ms-3' type="primary">CONTINUE  <i className="fas fa-arrow-circle-right ml"></i></Button></Link>
                                </Form>
                                </motion.div>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
