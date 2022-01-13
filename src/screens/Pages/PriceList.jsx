import React, { useState } from 'react'
import { Checkbox, Card, Button  } from 'antd';
import '../../customcss/custom.css';
import { Link, useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'material-react-toastify';

const { Meta } = Card;

export default function PriceList() {
    let history = useHistory();
    const [togglePrice, setTogglePrice] = useState(1);
    const [checkbox, setCheckbox] = useState(false);
    // const [item, setItem] = useState(null)

    // const handleChange = (items) => {
    //         items === item ? setItem(null): setItem(items);
    // }

    const submitCheckbox = (e) => {
        e.preventDefault();
        if(checkbox == "") {
            toast.error('Please Selected Fields!', {
                position: 'top-center'
            })
        }
        else {
            history.push('/registereddetails')
        }
      
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
                <h1 className='logo'>LOGLY</h1>
                    <div className='container py-5'>
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
                                <Checkbox className='checkbox' onChange={(e) => setCheckbox(e.target.checked)}>
                                    <Card
                                    className={(togglePrice === 1 ? 'active-card' : 'card-active') + ' cards mt-2 bg-card'}
                                    onClick={() => togglePriceButton(1)}
                                        style={{ width: 280 }}
                                    >
                                        <h6 className='pet-white pet-lover'>Pet Lover</h6>
                                        <p className='desc'>Lorem ipsum dolor sit amet consectetur .</p>
                                        <div className='span'>
                                            <span className='price'>Starting at <strong>$99.9/Month</strong></span>
                                        </div>
                                    </Card>
                                </Checkbox>

                                <Checkbox   className='checkbox'   onChange={(e) => setCheckbox(e.target.checked)}>
                                    <Card
                                    className={(togglePrice === 2 ? 'active-card ' : 'card-active') + ' cards mt-2 bg-card'}
                                    onClick={() => togglePriceButton(2)}    
                                    style={{ width: 280 }}
                                    >
                                        <h6 className='pet-lover'>Business Owener</h6>
                                        <p className='desc'>Lorem ipsum dolor sit amet consectetur .</p>
                                        <div className='span'>
                                            <span className='price'>Starting at <strong>$99.9/Month</strong></span>
                                        </div>
                                    </Card>
                                </Checkbox>

                                <Checkbox  className='checkbox '   onChange={(e) => setCheckbox(e.target.checked)}>
                                    <Card
                                    className={(togglePrice === 3 ? 'active-card ' : 'card-active') + ' cards mt-2 bg-card'}
                                    onClick={() => togglePriceButton(3)}       
                                    style={{ width: 280 }}
                                    >
                                        <h6 className='pet-lover'>Charity / Non Profit</h6>
                                        <p className='desc'>Lorem ipsum dolor sit amet consectetur .</p>
                                        <div className='span'>
                                            <span className='price'>Starting at <strong>$99.9/Month</strong></span>
                                        </div>
                                    </Card>
                                </Checkbox>

                                <Checkbox  className='checkbox'   onChange={(e) => setCheckbox(e.target.checked)}>
                                    <Card
                                    className={(togglePrice === 4 ? 'active-card ' : 'card-active') + ' cards mt-2 bg-card'}
                                    onClick={() => togglePriceButton(4)}    
                                    style={{ width: 280 }}
                                    >
                                        <h6 className='pet-lover'>Business Services</h6>
                                        <p className='desc'>Lorem ipsum dolor sit amet consectetur .</p>
                                        <div className='span'>
                                            <span className='price'>Starting at <strong>$99.9/Month</strong></span>
                                        </div>
                                    </Card>
                                </Checkbox>

                                <Checkbox  className='checkbox'   onChange={(e) => setCheckbox(e.target.checked)}>
                                    <Card
                                    className={(togglePrice === 5 ? 'active-card ' : 'card-active') + ' cards mt-2 bg-card'}
                                    onClick={() => togglePriceButton(5)}      
                                    style={{ width: 280 }}
                                    >
                                        <h6 className='pet-lover'>Business Listing</h6>
                                        <p className='desc'>Lorem ipsum dolor sit amet consectetur .</p>
                                        <div className='span'>
                                            <span className='price'>Starting at <strong>$99.9/Month</strong></span>
                                        </div>
                                    </Card>
                                </Checkbox>
                                <Link to="/register" className='text-white'>
                                <Button className='btn-bg mt-4 fonts-sizes' type="primary">BACK</Button> </Link>
                                
                                <Button disabled={!checkbox} onClick={submitCheckbox} className='btn-bg mt-4 fonts-sizes col-4 width-btn ms-3' type="primary">CONTINUE  <i className="fas fa-arrow-circle-right ml"></i></Button>
                                <ToastContainer />
                                </div>
                               
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
