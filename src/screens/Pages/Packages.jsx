import React from 'react'
import Logo from '../../assets/images/logo-logly.png'
import { Card, Input, Button, Form, Tabs } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../../customcss/custom.css'

const { TabPane } = Tabs;

export default function Packages() {
    return (
        <>
           <section id='img-bg'>
                <div className='opacity-bg'>
                    <div className='container padds'>
                        <div className='row justify-content-center align-items-center'>
                            <div className='col-12 col-md-10 mar-tp'>
                            <motion.div
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                            >
                            <Card className='opac p-4'>
                            
                            <h4 className=' text-center fw-bolder'>Select Packages <Link to="/creditcard" className='right-text text-black'><CloseCircleOutlined /></Link></h4>
                            <Tabs defaultActiveKey="1" className='tabs' centered>
                                <TabPane tab="Monthly"   key="1">
                                Content of Tab Pane 1
                                </TabPane>
                                <TabPane tab="Yearly" key="2" className='mt-3'>
                                    <div className='container'>
                                        <div className='row justify-content-center'>
                                        <div className='col-12 col-md-4'>
                                        <Card className='radius card-color-bg' >
                                        <div className='mt-2'>
                                            <h6 className='text-center h6 text-white'>Business Professional large</h6>
                                            <p className='text-center para text-white'><span className='f-sizes text-white'>$</span>1200</p>
                                            <ul className='ul-list text-white'>
                                                <li>Great Package for Small to Medium Sized Animal Service Businesses</li>
                                                <li>Allowed animal 200</li>
                                                <li>Allowed employees 20</li>
                                                <li>Allowed products 200</li>
                                            </ul>
                                            <div className='text-center'>
                                                <Button type='priamry' className='col-8 border-radius mt-3 mb-3 shadow'>Selected</Button>
                                            </div>
                                            </div>
                                        </Card>
                                        </div>
                                        <div className='col-12 col-md-4'>
                                        <Card className='radius'>
                                            <div className='mt-2'>
                                            <h6 className='text-center h6'>Business professional Sm/Mid</h6>
                                            <p className='text-center para'><span className='f-size'>$</span>500</p>
                                            <ul className='ul-list'>
                                                <li>Great Package for Small to Medium Sized Animal Service Businesses</li>
                                                <li>Allowed animal 200</li>
                                                <li>Allowed employees 20</li>
                                                <li>Allowed products 200</li>
                                            </ul>
                                            <div className='text-center'>
                                                <Button type='priamry' className='col-8 border-radius mt-3 mb-3'>Select</Button>
                                            </div>
                                            </div>
                                        </Card>
                                        </div>
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane tab="Lifetime" key="3" className='mt-3'>
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col-12 col-md-4'>
                                        <Card className='radius'>
                                            <div className='mt-2'>
                                            <h6 className='text-center h6'>Animal Rescue & Shelters</h6>
                                            <p className='text-center para'><span className='f-size'>$</span>0</p>
                                            <ul className='ul-list'>
                                                <li>Great Package for Small to Medium Sized Animal Service Businesses</li>
                                                <li>Allowed animal 200</li>
                                                <li>Allowed employees 20</li>
                                                <li>Allowed products 200</li>
                                            </ul>
                                            <div className='text-center'>
                                                <Button type='priamry' className='col-8 border-radius mt-3 mb-3'>Select</Button>
                                            </div>
                                            </div>
                                        </Card>
                                        </div>
                                        <div className='col-12 col-md-4'>
                                        <Card className='radius card-color-bg'>
                                        <div className='mt-2'>
                                            <h6 className='text-center h6 text-white'>Business Professional large</h6>
                                            <p className='text-center para text-white'><span className='f-size text-white'>$</span>1200</p>
                                            <ul className='ul-list text-white'>
                                                <li>Great Package for Small to Medium Sized Animal Service Businesses</li>
                                                <li>Allowed animal 200</li>
                                                <li>Allowed employees 20</li>
                                                <li>Allowed products 200</li>
                                            </ul>
                                            <div className='text-center'>
                                                <Button type='priamry' className='col-8 border-radius mt-3 mb-3 shadow'>Selected</Button>
                                            </div>
                                            </div>
                                        </Card>
                                        </div>
                                        <div className='col-12 col-md-4'>
                                        <Card className='radius'>
                                            <div className='mt-2'>
                                            <h6 className='text-center h6'>Business professional Sm/Mid</h6>
                                            <p className='text-center para'><span className='f-size'>$</span>500</p>
                                            <ul className='ul-list'>
                                                <li>Great Package for Small to Medium Sized Animal Service Businesses</li>
                                                <li>Allowed animal 200</li>
                                                <li>Allowed employees 20</li>
                                                <li>Allowed products 200</li>
                                            </ul>
                                            <div className='text-center'>
                                                <Button type='priamry' className='col-8 border-radius mt-3 mb-3'>Select</Button>
                                            </div>
                                            </div>
                                        </Card>
                                        </div>
                                    </div>
                                </div>
                                </TabPane>
                            </Tabs>
                               
                                
                                <div className='text-center'>
                                <Link to="/creditcard">
                                <Button type='primary mt-3 btn-bg col-2'>DONE </Button></Link></div>
                                <br />
                               
                            </Card>
                            </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
                <img src={Logo} alt="" className='float-right'  height="100" />
           </section>
        </>
    )
}
