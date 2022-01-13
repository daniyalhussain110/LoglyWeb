import React from 'react'
import { Form, Input, Button, Checkbox, Select, Row, Col, Card, Upload } from 'antd';
import { PaperClipOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


const { Option } = Select;
export default function RegisteredDetails() {
    return (
        <>
            <section id='img-bg'>
                <div className='overlay'>
                    <div className='bone-bg'>
                <h1 className='logo'>LOGLY</h1>
                <div className='container py-5'>
                    <div className='row justify-content-center align-items-center'>
                        <div className='col-12 col-md-6'>

                        </div>
                        <div className='col-12 col-md-6'>
                        <motion.div
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                            >
                        <h1 className='bold f-s reg-acc'>Register Account</h1>
                                <p className=' f-size reg-get'>Let's Get Registered</p>
                                <Form
      name="basic"
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 10 }}
      initialValues={{ remember: true }}
      className='mt-5'
      autoComplete="off"
    >
      <Form.Item
        name="businessname"
        rules={[{ required: true, message: 'Please input your business name!' }]}
      >
        <Input className='forms width-forms' placeholder='Business Name'/>
      </Form.Item>

      <Form.Item
        name="state"
        className='form-radius'
        rules={[{ required: true, message: 'Please input your Employee !' }]}
      >
      <Select className="forms" defaultValue="No Of Employee">
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>
        Disabled
      </Option>
      <Option value="Yiminghe">yiminghe</Option>
    </Select>
    </Form.Item>
      <Form.Item
        name="websiteurl"
        rules={[{ required: true, message: 'Please input your Website Url!' }]}
      >
        <Input className='forms width-forms' placeholder='Website Url' />
      </Form.Item>

        <h6 className='upload'>Upload your Photo ID *</h6>
      <Form.Item
        name="upload"
        valuePropName="fileList"
      >
        <Upload className='img-upload ' name="logo" action="/upload.do" listType="picture">
          <Button icon={<PaperClipOutlined />} size='medium' className='font-upload'>Upload Image</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
      <Link to="/pricelist" className='text-white'>
      <Button className='btn-bg mt-4 fonts-sizes' type="primary">BACK</Button> </Link>
      <Link to="/verification" className='text-white'>
      <Button className='btn-bg mt-4 fonts-sizes col-7  ms-3' type="primary">CONTINUE <i className="fas fa-arrow-circle-right ml"></i></Button></Link> 
      </Form.Item>
      
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
