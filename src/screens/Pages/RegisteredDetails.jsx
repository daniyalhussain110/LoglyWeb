import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, Select, Row, Col, Card, Upload, Popover } from 'antd';
import { PaperClipOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../../assets/images/logo-logly.png'
import Info from '../../assets/images/info.png'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';



const { Option } = Select;
export default function RegisteredDetails() {

  const [visible, setVisible] = useState(false)


  const hide = () => {
    setVisible(false)
  }

  const handleVisibleChange = visible => {
    setVisible(visible)
  }

  const content = (
    <div>
      <a onClick={hide} className='float-end mt-1'><CloseOutlinedIcon style={{fontSize: '18px', color: 'black'}} /></a>
      <p className='text-center p-4'>To help fight fraud and Scammers, <br />
        we request Business Owner to hold <br />
        their Driver's License next to their <br />
        face, take and upload picture to <br />
        verify identity. <br />
        By doing this step your business will <br />
        automatically get a verified by logly <br />
        badge. if you decide not to do this <br />
        step, your business will be subject to <br />
        other verification steps by Logly <br />
        before your business is deemed<br />
        verified.</p>
    </div>
  );
    return (
        <>
            <section id='img-bg'>
                <div className='overlay'>
                    <div className='bone-bg'>
                <h1 className='logo'></h1>
                <div className='container mt-5 py-5'>
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
        <Input autoComplete='off' className='forms width-forms' placeholder='Business Name'/>
      </Form.Item>

      <Form.Item
        name="state"
        className='form-radius'
        rules={[{ required: true, message: 'Please input your Employee !' }]}
      >
      <Select className="forms" defaultValue="No Of Employee">
      <Option value="jack">1 - 10</Option>
      <Option value="lucy">20 - 50</Option>
      <Option value="Yiminghe">30 - 60</Option>
    </Select>
    </Form.Item>
      <Form.Item
        name="websiteurl"
       rules={[
         {
          required: true,
          message: 'please enter your websiteUrl'
         },

         {
           pattern: new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'),
           message: 'please enter valid url'
         }
       ]}
      >
        <Input autoComplete='off'  className='forms width-forms' placeholder='Website Url' />
      </Form.Item>
        {/* {URL && (
          <div className={`URL ${isValidURL ? 'success' : 'error'}`}>{URL}</div>
        )} */}
        <h6 className='upload'>Upload your Photo ID 
         <Popover placement="right" content={content} trigger="click" visible={visible} onVisibleChange={handleVisibleChange}>
          <img src={Info} className="img-fluid ms-1" />
        </Popover>
        </h6>
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
      <Button className='btn-bg mt-4 widths-btns fonts-sizes col-7  ms-3' type="primary">CONTINUE <i className="fas fa-arrow-circle-right ml"></i></Button></Link> 
      </Form.Item>
      
    </Form>
    </motion.div>
                        </div>
                    </div>
                </div>
                </div>
                </div>
                <img src={Logo} alt="" className='float-right'  height="100" />
            </section>
        </>
    )
}
