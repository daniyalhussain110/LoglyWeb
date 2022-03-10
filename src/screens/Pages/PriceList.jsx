import React, { useEffect, useState } from 'react'
import { Checkbox, Card, Button, Radio } from 'antd';
import '../../customcss/custom.css';
import { Link, useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'material-react-toastify';
import Logo from '../../assets/images/logo-logly.png'
import { SubscriptionPacakgeType } from '../../store/Actions/SubscriptionPackageType'
import { useDispatch, useSelector } from 'react-redux'
import ActionType from '../../store/Constants/Type';
import { userRegister } from '../../store/Actions/UserAction';

const { Meta } = Card;

export default function PriceList() {
    let history = useHistory();
    const [togglePrice, setTogglePrice] = useState('petLover');
    const [checkbox, setCheckbox] = useState(false);
    const [item, setItem] = useState(null)
    const [selectType, setSelectedType] = useState(null)

    const dispatch = useDispatch();

    const accountType = useSelector((state) => state.mySubscription.accountType)

    const handleChange = () => {
            // items === item ? setItem(null): setItem(items);
            // console.log(items)
           
    }


    const submitCheckbox = (e) => {
        e.preventDefault();
        setSelectedType(accountType[selectType + 1])
        console.log(accountType[selectType+1].type)
        if(accountType[selectType+1].type == "Individual"){
           let data =  JSON.parse(localStorage.getItem('user'));
           data = {...data,packageType:accountType[selectType+1].type}
           console.log('pricelist--->',data)
            dispatch(userRegister(data))
            
        }else{
            let data =  JSON.parse(localStorage.getItem('user'));
           data = {...data,packageType:accountType[selectType+1].type}
           localStorage.setItem('user',JSON.stringify(data))
            history.push('/registereddetails')
        }
    }

    const togglePriceButton = (index) => {
            setTogglePrice(index)
            console.log(index)
    }

    useEffect(() => {
        dispatch(SubscriptionPacakgeType())
    }, [])
  
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
                                    {accountType.map((type, index) => { 
                                        console.log("type",type)
                                        return(
                                            <>
                                            
                                            <Radio.Group value={selectType} onChange={(e) => setSelectedType(e.target.value)}  className='checkbox'>
                                                <Radio value={index - 1}>
                                                    <Card
                                                    className={(selectType === index - 1 ? 'active-card' : 'card-active') + ' cards mt-2 bg-card'}
                                                    onClick={() => handleChange('petLover')}
                                                        style={{ width: 280, height: 100 }}
                                                    >
                                                    
                                                                <p className='fw-bold lover'>{type.packageType == "Individual"? "Pet Lover":type.packageType}</p>
                                                                    <div className='top-marg'>
                                                                    <p className='desc'>{type.description}</p>
                                                                    <div className='span'>
                                                                        <span className='price'>Starting at 
                                                                        <strong className='fs-6'>
                                                                            {type.packageType == "Individual"?"Free":type.packageType == "Charity Organization"?"Free":"$"+type.minprice}
                                                                            </strong>
                                                                            </span>
                                                                    </div>
                                                                </div>
                                                    </Card>
                                                </Radio>
                                            </Radio.Group>
                                            </>
                                        )
                                    })}
                                

                                {/* <Checkbox checked={item === 'Business Owner'}  className='checkbox'  >
                                    <Card
                                    className={(item === 'Business Owner' ? 'active-card' : 'card-active') + ' cards mt-2  bg-card'}
                                    onClick={() => handleChange('Business Owner')}    
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

                                <Checkbox  checked={item === 'Charity Organization'} className='checkbox '  >
                                    <Card
                                    className={(item === 'Charity Organization' ? 'active-card ' : 'card-active') + ' cards mt-2 bg-card'}
                                    onClick={() => handleChange('Charity Organization')}       
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

                                <Checkbox  checked={item === 'Business Services'} className='checkbox'>
                                    <Card
                                    className={(item === 'Business Services' ? 'active-card ' : 'card-active') + ' cards mt-2 bg-card'}
                                    onClick={() => handleChange('Business Services')}    
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

                                <Checkbox checked={item === 'Business Listing'} className='checkbox'  >
                                    <Card
                                    className={(item === 'Business Listing' ? 'active-card ' : 'card-active') + ' cards mt-2 bg-card'}
                                    onClick={() => handleChange('Business Listing')}      
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
                                </Checkbox> */}
                                <Link to="/register" className='text-white'>
                                <Button className='btn-bg mt-4 fonts-sizes' type="primary">BACK</Button> </Link>
                                
                                <Button onClick={submitCheckbox} className='btn-bg mt-4 fonts-sizes col-4 width-btn ms-3' type="primary">CONTINUE  <i className="fas fa-arrow-circle-right ml"></i></Button>
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
