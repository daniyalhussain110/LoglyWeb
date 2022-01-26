import React from 'react'
import '../../customcss/custom.css'
import { Form, Input, Button, Checkbox, Select, Row, Col, Card, Upload,DatePicker, Space, Tag, Divider } from 'antd';
import { CreditCardFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../../assets/images/logo-logly.png'

export default function CreditCard() {
    return (
        <>
            <section id='img-bg'>
                <div className='overlay'>
                    <div className='bone-bg'>
                    <img src={Logo} alt="" className='float-left'  height="100" />
                        <h1 className='logos'></h1>
                        <div className='container mt-5 py-5'>
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
                                        <Input suffix={<i class="fas fa-credit-card"></i>} autoComplete='off' className='border-radius-forms' placeholder='0000 1234 0123 0125'/>
                                    </Form.Item>

                                    
                                    <div className='row rows'>
                                        <div className='col-12 col-md-6'>
                                        <Form.Item
                                    label="Expiry Date"
                                        name="expirydate"
                                        rules={[{ required: true, message: 'Please input your expiry date!' }]}
                                    >
                                    <Space direction="vertical">
                                        <DatePicker onKeyDown={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                            }
                                        }}  className='border-radius-forms' />
                                    </Space>
                                    </Form.Item>
                                        </div>

                                        <div className='col-12 col-md-6 mar-left'>
                                        <Form.Item
                                    label="CVC"
                                        name="cvc"
                                        rules={[{ required: true, message: 'Please input your cvc!' }]}
                                    >
                                        <Input autoComplete='off' className='border-radius-forms' placeholder='315'/>
                                    </Form.Item>
                                        </div>
                                    </div>
                                    <Form.Item
                                    label="Name"
                                        name="name"
                                        className='rows'
                                        rules={[{ required: true, message: 'Please input your name!' }]}
                                    >
                                        <Input autoComplete='off' className='border-radius-forms ' placeholder='Jacob andrew'/>
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
