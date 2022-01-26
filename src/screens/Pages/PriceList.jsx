import React, { useState } from 'react'
import { Checkbox, Card, Button  } from 'antd';
import '../../customcss/custom.css';
import { Link, useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'material-react-toastify';
import Logo from '../../assets/images/logo-logly.png'

const { Meta } = Card;

export default function PriceList() {
    let history = useHistory();
    const [togglePrice, setTogglePrice] = useState(1);
    const [checkbox, setCheckbox] = useState(false);
    const [item, setItem] = useState(null)

    const handleChange = (items) => {
            items === item ? setItem(null): setItem(items);
    }

    const submitCheckbox = (e) => {
        e.preventDefault();
        history.push('/registereddetails')

    }

    const togglePriceButton = (index) => {
            setTogglePrice(index)
            console.log(index)
    }

  
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
                            <div className='col-12 col-md-6 margins-tops'>
                            <motion.div
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                            >
                                <h1 className='bold f-s reg-acc'>Register Account</h1>
                                <p className=' f-size reg-get'>Please select the account</p>
                                <div className='margin-space'>
                                <Checkbox checked={item === 1} className='checkbox'>
                                    <Card
                                    className={(item === 1 ? 'active-card' : 'card-active') + ' cards mt-2 bg-card'}
                                    onClick={() => handleChange(1)}
                                        style={{ width: 280 }}
                                    >
                                        <p className='fw-bold lover'>Pet Lover</p>
                                        <div className='top-marg'>
                                            <p className='desc'>Lorem ipsum dolor sit amet consectetur .</p>
                                            <div className='span'>
                                                <span className='price'>Starting at <strong className='fs-6'>$99.9/Month</strong></span>
                                            </div>
                                        </div>
                                    </Card>
                                </Checkbox>

                                <Checkbox checked={item === 2}  className='checkbox'  >
                                    <Card
                                    className={(item === 2 ? 'active-card' : 'card-active') + ' cards mt-2  bg-card'}
                                    onClick={() => handleChange(2)}    
                                    style={{ width: 280 }}
                                    >
                                        
                                        <p className='fw-bold lover'>Business Owener</p>
                                        <div className='top-marg'>
                                            <p className='desc'>Lorem ipsum dolor sit amet consectetur .</p>
                                            <div className='span'>
                                                <span className='price'>Starting at <strong className='fs-6'>$99.9/Month</strong></span>
                                            </div>
                                        </div>
                                    </Card>
                                </Checkbox>

                                <Checkbox  checked={item === 3} className='checkbox '  >
                                    <Card
                                    className={(item === 3 ? 'active-card ' : 'card-active') + ' cards mt-2 bg-card'}
                                    onClick={() => handleChange(3)}       
                                    style={{ width: 280 }}
                                    >
                                        <p className='fw-bold lover'>Charity / Non Profit</p>
                                        <div className='top-marg'>
                                            <p className='desc'>Lorem ipsum dolor sit amet consectetur .</p>
                                            <div className='span'>
                                                <span className='price'>Starting at <strong className='fs-6'>$99.9/Month</strong></span>
                                            </div>
                                        </div>
                                    </Card>
                                </Checkbox>

                                <Checkbox  checked={item === 4} className='checkbox'>
                                    <Card
                                    className={(item === 4 ? 'active-card ' : 'card-active') + ' cards mt-2 bg-card'}
                                    onClick={() => handleChange(4)}    
                                    style={{ width: 280 }}
                                    >
                                        <p className='fw-bold lover'>Business Services</p>
                                        <div className='top-marg'>
                                            <p className='desc'>Lorem ipsum dolor sit amet consectetur .</p>
                                            <div className='span'>
                                                <span className='price'>Starting at <strong className='fs-6'>$99.9/Month</strong></span>
                                            </div>
                                        </div>
                                    </Card>
                                </Checkbox>

                                <Checkbox checked={item === 5} className='checkbox'  >
                                    <Card
                                    className={(item === 5 ? 'active-card ' : 'card-active') + ' cards mt-2 bg-card'}
                                    onClick={() => handleChange(5)}      
                                    style={{ width: 280 }}
                                    >
                                        <p className='fw-bold lover'>Business Listing</p>
                                        <div className='top-marg'>
                                            <p className='desc'>Lorem ipsum dolor sit amet consectetur .</p>
                                            <div className='span'>
                                                <span className='price'>Starting at <strong className='fs-6'>$99.9/Month</strong></span>
                                            </div>
                                        </div>
                                    </Card>
                                </Checkbox>
                                <Link to="/register" className='text-white'>
                                <Button className='btn-bg mt-4 fonts-sizes' type="primary">BACK</Button> </Link>
                                
                                <Button disabled={!item} onClick={submitCheckbox} className='btn-bg mt-4 fonts-sizes col-4 width-btn ms-3' type="primary">CONTINUE  <i className="fas fa-arrow-circle-right ml"></i></Button>
                                <ToastContainer />
                                </div>
                               
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
