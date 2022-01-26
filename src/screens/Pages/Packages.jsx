import React from 'react'
import Logo from '../../assets/images/logo-logly.png'
import { Card, Input, Button, Form } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../../customcss/custom.css'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const { TabPane } = Tabs;

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

export default function Packages() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
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
                            <Card className='opac p-2'>
                            
                            <h4 className=' text-center fw-bolder'>Select Packages <Link to="/creditcard" className='right-text text-black'><CloseCircleOutlined /></Link></h4>
                                <Box>
                                    <Box>
                                        <Tabs className='justify-content' value={value} onChange={handleChange} aria-label="basic tabs example">
                                        <Tab className='monthly' label="Monthly" {...a11yProps(0)} />
                                        <Tab className='yearly' label="Yearly" {...a11yProps(1)} />
                                        <Tab className='lifetime' label="Lifetime" {...a11yProps(2)} />
                                        </Tabs>
                                    </Box>
                                    <TabPanel value={value} index={0}>
                                       
                                    </TabPanel>
                                    <TabPanel value={value} index={1}>
                                       
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
                                    </TabPanel>
                                    <TabPanel value={value} index={2}>
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
                                    </TabPanel>
                                    </Box>
                               
                                
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
