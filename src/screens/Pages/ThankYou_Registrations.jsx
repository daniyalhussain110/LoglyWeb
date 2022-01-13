import React from 'react'
import '../../customcss/custom.css'
import { Card, Input, Button } from 'antd';
import Logo from '../../assets/images/logo-logly.png'
import fireworks from '../../assets/images/fireworks.png';
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';

export default function ThankYou_Registrations() {
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
                                <img src={fireworks} alt="" className='img-fluid width-md' />
                            <h4 className=' text-center mt-3 fw-bolder'>Thank You For Registration</h4>
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
