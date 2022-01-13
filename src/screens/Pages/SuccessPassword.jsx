import React from 'react'
import '../../customcss/custom.css'
import { Card, Input, Button } from 'antd';
import Logo from '../../assets/images/logo-logly.png'
import check from '../../assets/images/checkcircle.png';
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';

export default function SuccessPassword() {
    return (
        <>
          <section id='img-bg'>
                <div className='opacity-bg'>
                    <div className='container padds'>
                        <div className='row justify-content-center align-items-center'>
                            <div className='col-12 col-md-8'>
                            <motion.div
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                            >
                            <Card className='text-center opac p-5'>
                                <img src={check} alt="" className='img-fluid width-md' />
                            <h4 className=' text-center mt-3 fw-bolder'>Passwords Reset Successfully </h4>
                            <p>You have successfully resets your password. Please use your new password to login.</p>
                            <Link to="/" className='text-white'>
                                <Button type='primary mt-5 btn-bg col-4'>LOGIN </Button></Link>
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
