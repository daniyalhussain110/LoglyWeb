import React, {useState, useEffect} from 'react'
import { motion } from 'framer-motion';
import { Steps,message, Form, Layout, Card, Upload, Input, Select, Alert, Tooltip, Popover, Divider, Modal } from 'antd';
import { Link } from 'react-router-dom'
import '../../../customcss/custom.css'
import rightarrows from '../../../assets/images/rightarrows.png'
import AddIcon from '@mui/icons-material/Add';
import avatar from '../../../assets/images/avatar.png'
import avatar1 from '../../../assets/images/avatar1.png'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from 'react-redux';
import { getCities, getStates, getZipCode } from '../../../store/Actions/Action'
import { toast, ToastContainer } from 'material-react-toastify'
import { LoadingOutlined, PlusOutlined, PercentageOutlined, CloseOutlined, MailFilled, DownOutlined, ClockCircleFilled } from '@ant-design/icons';

import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';

const { Option } = Select;

const DeleteModal = () => {
  const [visible, setVisible] = useState(false)


  const showModel = () => {
    setVisible(true)
  }

  const hideModel = () => {
    setVisible(false)
  }

  return (
    <>
        <Button size="small" startIcon={<DeleteIcon />} className='text-danger' style={{fontSize: 12, textTransform: 'capitalize'}} onClick={showModel}>
          Delete
        </Button>
        <Modal
          visible={visible}
          className='border-model-radius'
        >
          <div className='text-center'>
          <span>Are you sure you want to delete this service?</span>
            <br />
            <Button className='btn-bg mt-5 col-12' onClick={hideModel} variant="contained" type="primary">Delete</Button>
            <br />
            <Button className='mt-3 text-cancel' onClick={hideModel}>Cancel</Button>
         </div>
        </Modal>
    </>
  )
}

const content = (
  <div>
    <motion.div>
      <p><Button size="small" startIcon={<i class="fas fa-edit" style={{fontSize: 12}}></i>} style={{fontSize: 12, textTransform: 'capitalize'}}><span className='color-edit'>Edit</span></Button></p>
      <Divider />
      <p>
        <DeleteModal />
      </p>
    </motion.div>
  </div>
);

function getSteps() {
  return [
    {
      title: "Listing Service",
      desc: "Select one of these below"
    },

    {
      title: "Animal Info",
      desc: "Select the animals you love"
    }, 

    {
      title: "Product info",
      desc: "Select the Products you sell"
    }, 

    {
      title: "Team Members",
      desc: "Add Team Member"
    }, 

    {
      title: "Team Members Added",
      desc: "Add Another Member"
    }, 
  ];
}

const listing = [];
const listings = ["I Deal in Animal Selling / Products", "I Deal in Animal Services"];

const selectListing = listings => {
  console.log("listing", listings);
  let L = listing
  let index = L.findIndex(lis => lis === listings);
  if (index > -1) {
    L.splice(index, 1);
  } else {
    L.push(listing);
  }

  const dayElement = document.getElementById(listings);
  dayElement.classList.toggle("selected-day");

  
  console.log("P", listing);
};

const selectedListing = listings => {
  let index = listing.findIndex(lis => listings.value === lis);

  console.log(index, "index");
 
  if (index > -1) {
    console.log(listings, "INSIE INDEX COLOR");
  }
  console.log(listings);
  return (
    <div className='col-12 col-md-12 mt-2'>
      <Button
        id={listings}
        onClick={() => selectListing(listings)}
        className="week-days week-btns"
        key={listings}
      >
        {listings}
      </Button>
    </div>
  );
};

const Toggles = () => {
  
  // const [toggleState, setToggleState] = useState(1)
  
  // const togglebutton = (index) => {
  //   setToggleState(index);
  // }

  return(
    <>
    <motion.div
    >
       <div className='row'>
            {listings.map((listings, index) => selectedListing(listings))}
          </div>

      {/* <Button onClick={() => togglebutton(1)} className={(toggleState === 1 ? 'active-button' : 'activeses') + ' col-8'} variant="contained" color="primary"><Typography style={{textTransform: 'capitalize', fontSize: 12}}>I Deal in Animal Selling / Products</Typography></Button>
      <Button onClick={() => togglebutton(2)} className={(toggleState === 2 ? 'active-button' : 'activeses') + ' col-8 mt-3'} variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>I Deal in Animal Services</Button> */}
    </motion.div>
    </>
  )
}

const animal = [];
const animalName = ["Dog", "Cat", "Horse", "Parrot"];

const selectAnimal = animals => {
  console.log(animal)
  console.log("animal", animals);
  let SA = animal;
  let index = SA.findIndex(animal => animal === animals);
  if (index > -1) {
    SA.splice(index, 1);
  } else {
    SA.push(animals);
  }

  const dayElement = document.getElementById(animals);
  dayElement.classList.toggle("selected-day");

  
  console.log("SA", animal);
};

const selectedAnimals = animals => {
  let index = animal.findIndex(animal => animals.value === animal);

  console.log(index, "index");
 
  if (index > -1) {
    console.log(animals, "INSIE INDEX COLOR");
  }
  console.log(animals);
  return (
        <div className='col-12 col-md-6 mt-2'>
          <Button
          id={animals}
          onClick={() => selectAnimal(animals)}
          className="week-days week-btns"
          key={animals}
        >
          {animals}
        </Button>
      </div>
  );
};

function Toggle() {
  

  return(
    <>
    <div className='row'>
            <div className='col-12 col-md-12'>
              <h6>Animal Info</h6>
              <p>Select the animals you love</p>
              <div className='mt-3'>
              <div className='row'>
                  {animalName.map((animals, index) => selectedAnimals(animals))}
                </div>
         </div>
         </div>
          </div>
    </>
  )
}

const product = [];
const AnimalProduct = ["Cage", "Dog Food", "Royal Cabin", "Sojos", "Blue Buffalo", "Bentonite Cat Litter", "Josera Active", "Pet House"];

const selectProduct = products => {
  console.log("day", products);
  let P = product
  let index = P.findIndex(pro => pro === products);
  if (index > -1) {
    P.splice(index, 1);
  } else {
    P.push(product);
  }

  const dayElement = document.getElementById(products);
  dayElement.classList.toggle("selected-day");

  
  console.log("P", product);
};

const selectedProduct = products => {
  let index = product.findIndex(pro => products.value === pro);

  console.log(index, "index");
 
  if (index > -1) {
    console.log(products, "INSIE INDEX COLOR");
  }
  console.log(products);
  return (
    <div className='col-12 col-md-6 mt-2'>
      <Button
        id={products}
        onClick={() => selectProduct(products)}
        className="week-days week-btns"
        key={products}
      >
        {products}
      </Button>
    </div>
  );
};

function ProductInfo() {
 
  return(
    <>
        <div className='row'>
      <div className='col-12 col-md-12'>
        <h6>Product Info</h6>
        <p>Select the Products you sell</p>
        <div className='mt-3'>
        <div className='row'>
            {AnimalProduct.map((products, index) => selectedProduct(products))}
          </div>
    </div>
    </div>
    </div>
    </>

  )

}

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

function handleChange(value) {
  console.log(`selected ${value}`);
}


function TeamMembers() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState("")
  const [cancel, setCancel] = useState(false);
  
  const dispatch = useDispatch()

  const emailRegex = /\S+@\S+\.\S+/

  const validateEmail = (e) => {
    const email = e.target.value;
    if(email == "") {
      setMessage('Email is Required')
    }
    else if(emailRegex.test(email)) {
        setIsValid(true);
        setMessage('email is valid');
    } else {
      setIsValid(false);
      setMessage('email is not valid');
    }
  }

  const [ loading, setLoading ] = useState(false);

  const { imageUrl } = loading

   handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };



  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const states = useSelector((state) => state.myState.states)
  const cities = useSelector((state) => state.myCities.cities)
  const zipcodes = useSelector((state) => state.myZipCode.zipcodes)

  useEffect(() => {
    dispatch(getStates())
    dispatch(getCities())
    dispatch(getZipCode())
  }, [])

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return(
    <>
       <div className='container-fluid g-0'>
          <div className='row'>
            <div className='col-12 col-md-12'>
            <h6>Manage Team Members</h6>
            <div className='mt-5'>
            <Button endIcon={<AddIcon />} className='outline left-text col-4' variant="outlined" color="primary"  onClick={showModal}>
              <Typography className='' style={{textTransform: 'capitalize', fontSize: 12}}>Add a Team member</Typography>
            </Button>
          
                  <Modal className='modal-radius' centered visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
             
           
            <Form
                  
                  name="basic"
                 
                  initialValues={{
                    remember: true,
                  }}
                 
                  autoComplete="off"
                >
              
                  <div className='row'>
                    <div className='col-12 col-md-12 text-center mt-5'>
              
                    <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader avatar-radius"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                  </Upload>
                    </div>
                   
                    <div className='col-12 col-md-6 mt-5'>
                  <Form.Item
                    name="name"
                    className='place'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your name!',
                      },
                    ]}
                  >
                    <Input  prefix={<PersonIcon />} placeholder=' Enter Name'  className='name' />
                  </Form.Item>
                  </div>
                  <div className='col-12 col-md-6 mt-5'>
                  <Form.Item
                    name="email"
                    className='place'
                    onChange={validateEmail}
                    
                  >
                    <Input  prefix={<MailFilled />} placeholder=' Enter Email' className='name' />
                  </Form.Item>
                    {message && <span className={`message ${isValid ? 'success' : 'error'}`}> {message}</span>}
                  </div>
                  <div className='col-12 col-md-6 '>
                  <Form.Item
                    name="phone"
                    className='place'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your phoneNo!',
                      },
                    ]}
                  >
                    <Input onKeyPress={(event) => {
                                                        if (!/[0-9]/.test(event.key)) {
                                                        event.preventDefault();
                                                        }
                                                    }}  prefix={<PhoneIcon />} placeholder=' Phone No.' className='name' />
                  </Form.Item>
                  </div>
                  <div className='col-12 col-md-6 '>
                  <Form.Item
                    name="state"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your state!',
                      },
                    ]}
                  >
                      <Select  className='state-city form-select' defaultValue="Select State" onChange={handleChange}>
                        {states.map((state) => (
                            <Option value={state.name}>{state.name}</Option>
                        ))}
                        
                      </Select>
                  </Form.Item>
                 
                  </div>
                  <div className='col-12 col-md-6 '>
                  <Form.Item
                    name="city"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your city!',
                      },
                    ]}
                  >
                   
                      <Select  className='state-city form-select' defaultValue="Select City" onChange={handleChange}>
                        {cities.map((city) => (
                           <Option value={city.name}>{city.name}</Option>
                        ))}
                      </Select>
                  </Form.Item>
                  </div>
                  <div className='col-12 col-md-6 '>
                  <Form.Item
                    name="zipcode"
                    className='place'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your ZipCode!',
                      },
                    ]}
                  >
                    <Select  className='state-city form-select' defaultValue="Select ZipCode" onChange={handleChange}>
                      {zipcodes.map((zip) => (
                        <Option value={zip.zipcode}>{zip.zipcode}</Option>
                      ))}
                       
                      </Select>
                  </Form.Item>
                  </div>
                  </div>
                  <div className='mt-5'>
                  <Form.Item
                   
                  >
                 
                    <Button  size="small" className='btn-add col-2' type="primary" htmlType="submit" style={{fontSize: 12, textTransform: 'capitalize'}}>
                      Add
                    </Button>
                    
                      <Button onClick={handleCancel} size="small" className='btn-cancel col-2 float-end'  style={{fontSize: 12, textTransform: 'capitalize'}}>
                        cancel
                      </Button>
                    
                    <ToastContainer />
                  </Form.Item>
                  </div>
                </Form>
            </Modal>
            </div>
              </div>
            </div>
            {/* <Button ></Button> */}
        
        </div>
    </>
  )  
}


function AddTeamMembers() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState("")
  const [cancel, setCancel] = useState(false);
  
  const dispatch = useDispatch()

  const emailRegex = /\S+@\S+\.\S+/

  const validateEmail = (e) => {
    const email = e.target.value;
    if(email == "") {
      setMessage('Email is Required')
    }
    else if(emailRegex.test(email)) {
        setIsValid(true);
        setMessage('email is valid');
    } else {
      setIsValid(false);
      setMessage('email is not valid');
    }
  }

  const [ loading, setLoading ] = useState(false);


  const { imageUrl } = loading

   handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };



  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const states = useSelector((state) => state.myState.states)
  const cities = useSelector((state) => state.myCities.cities)
  const zipcodes = useSelector((state) => state.myZipCode.zipcodes)

  useEffect(() => {
    dispatch(getStates())
    dispatch(getCities())
    dispatch(getZipCode())
  }, [])

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return(
    <>
 <div className='container-fluid g-0'>
          <div className='row'>
            <div className='col-12 col-md-12'>
            <h6>Manage Team Members</h6>
            <div >
            <Button endIcon={<AddIcon />} className='outline-border mt-5 col-8' variant="outlined" color="primary"  onClick={showModal}>
              <Typography className='' style={{textTransform: 'capitalize', fontSize: 12}}>Add Another Member</Typography>
            </Button>
                  <Modal className='modal-radius' centered visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Form
                  
                  name="basic"
                 
                  initialValues={{
                    remember: true,
                  }}
                 
                  autoComplete="off"
                >
              
                  <div className='row'>
                    <div className='col-12 col-md-12 text-center mt-5'>
              
                    <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader avatar-radius"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                  </Upload>
                    </div>
                   
                    <div className='col-12 col-md-6 mt-5'>
                  <Form.Item
                    name="name"
                    className='place'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your name!',
                      },
                    ]}
                  >
                    <Input  prefix={<PersonIcon />} placeholder=' Enter Name'  className='name' />
                  </Form.Item>
                  </div>
                  <div className='col-12 col-md-6 mt-5'>
                  <Form.Item
                    name="email"
                    className='place'
                    onChange={validateEmail}
                    
                  >
                    <Input  prefix={<MailFilled />} placeholder=' Enter Email' className='name' />
                  </Form.Item>
                    {message && <span className={`message ${isValid ? 'success' : 'error'}`}> {message}</span>}
                  </div>
                  <div className='col-12 col-md-6 '>
                  <Form.Item
                    name="phone"
                    className='place'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your phoneNo!',
                      },
                    ]}
                  >
                    <Input onKeyPress={(event) => {
                                                        if (!/[0-9]/.test(event.key)) {
                                                        event.preventDefault();
                                                        }
                                                    }}  prefix={<PhoneIcon />} placeholder=' Phone No.' className='name' />
                  </Form.Item>
                  </div>
                  <div className='col-12 col-md-6 '>
                  <Form.Item
                    name="state"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your state!',
                      },
                    ]}
                  >
                      <Select  className='state-city form-select' defaultValue="Select State" onChange={handleChange}>
                        {states.map((state) => (
                            <Option value={state.name}>{state.name}</Option>
                        ))}
                        
                      </Select>
                  </Form.Item>
                 
                  </div>
                  <div className='col-12 col-md-6 '>
                  <Form.Item
                    name="city"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your city!',
                      },
                    ]}
                  >
                   
                      <Select  className='state-city form-select' defaultValue="Select City" onChange={handleChange}>
                        {cities.map((city) => (
                           <Option value={city.name}>{city.name}</Option>
                        ))}
                      </Select>
                  </Form.Item>
                  </div>
                  <div className='col-12 col-md-6 '>
                  <Form.Item
                    name="zipcode"
                    className='place'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your ZipCode!',
                      },
                    ]}
                  >
                    <Select  className='state-city form-select' defaultValue="Select ZipCode" onChange={handleChange}>
                      {zipcodes.map((zip) => (
                        <Option value={zip.zipcode}>{zip.zipcode}</Option>
                      ))}
                       
                      </Select>
                  </Form.Item>
                  </div>
                  </div>
                  <div className='mt-5'>
                  <Form.Item
                   
                  >
                 
                    <Button  size="small" className='btn-add col-2' type="primary" htmlType="submit" style={{fontSize: 12, textTransform: 'capitalize'}}>
                      Add
                    </Button>
                    
                      <Button onClick={handleCancel} size="small" className='btn-cancel col-2 float-end'  style={{fontSize: 12, textTransform: 'capitalize'}}>
                        cancel
                      </Button>
                    
                    <ToastContainer />
                  </Form.Item>
                  </div>
                </Form>
            </Modal>
            </div>
              </div>
            </div>
            {/* <Button ></Button> */}
        
        </div>
    </>
  )
}

function getStepContent(step) {

  switch (step) {
    case 0:
      return (
        <>
        <div className='container-fluid g-0 postions'>
          <div className='row'>
            <div className='col-12 col-md-12'>
              
              <div className='mt-5'>
        
              <Toggles />
         </div>
         </div>
          </div>
        </div>
        </>
      );

    case 1:
      return (
        
        <>
           <Toggle />
      
        </>
      );
      case 2:
        return (
          <>
           <ProductInfo />
          </>
        )
        case 3 :
          return (
            <>
            <TeamMembers />
          </>
          )
    case 4:
      return (
        <>
           <div className='container-fluid g-0'>
          <div className='row'>
            <div className='col-12 col-md-12'>
              <h6>Team member added!</h6>
          
              <div className='mt-5'>
               <div className='card cardes mb-3' style={{maxWidth: 450, maxHeight: 74}}>
                 <div className='row g-0'>
                   <div className='col-12 col-md-2'>
                      <img src={avatar} alt="" className='img-fluid rounded-start'  />
                   </div>
                   <div className='col-12 col-md-10'>
                      <div className='card-body'>
                          <h6 className='card-title text-card'>Jack Rio</h6>
                          <p className='card-text text-card'>0213462840459 
                          <Popover className='pop text-align tools-tips cursor-pointer' placement="left" content={content} trigger="click">
                                  <MoreVertIcon className='vector-icon' />
                          </Popover>
                          </p>
                          
                      </div>
                     </div>
                 </div>
            
                 <div className='card cardes mt-2 mb-3' style={{maxWidth: 450, maxHeight: 74}}>
                 <div className='row g-0'>
                   <div className='col-12 col-md-2'>
                      <img src={avatar1} alt="" className='img-fluid rounded-start'  />
                   </div>
                   <div className='col-12 col-md-10'>
                      <div className='card-body'>
                          <h6 className='card-title text-card'>Rosie Fernadez</h6>
                          <p className='card-text text-card'>0213222382819
                          <Popover className='pop text-align tools-tips cursor-pointer' placement="left" content={content} trigger="click">
                                  <MoreVertIcon className='vector-icon' />
                          </Popover>
                          </p>
                          
                      </div>
                     </div>
                  
                 </div>
                 </div>
               </div>
               <div className='mt-0'>
                   <AddTeamMembers />
         </div>
         </div>
         </div>
          </div>
        </div>
        </>
      );
    case 5:
      return (
        <>
          <TextField
            id="cardNumber"
            label="Card Number"
            variant="outlined"
            placeholder="Enter Your Card Number"
            fullWidth
            margin="normal"
            name="cardNumber"
          />
          <TextField
            id="cardMonth"
            label="Card Month"
            variant="outlined"
            placeholder="Enter Your Card Month"
            fullWidth
            margin="normal"
            name="cardMonth"
          />
          <TextField
            id="cardYear"
            label="Card Year"
            variant="outlined"
            placeholder="Enter Your Card Year"
            fullWidth
            margin="normal"
            name="cardYear"
          />
        </>
      );
    default:
      return "unknown step";
  }
}


const { Sider } = Layout

export default function BusinessListing() {
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  

  const isStepOptional = (step) => {
    return step === 0 || step === 1 || step === 2 || step === 3;
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    setSkippedSteps(skippedSteps.filter((skipItem) => skipItem !== activeStep));
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSkip = () => {
    if (!isStepSkipped(activeStep)) {
      setSkippedSteps([...skippedSteps, activeStep]);
    }
    setActiveStep(activeStep + 1);
  };
    return (
        <>
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
              <div className='container-fluid g-0 overflow'>
               <div className='row  align-items-center'>
                   <div className='col-12 col-md-4'>
                   
                <Sider className='heights'>
                    <div className='container'>
                    <h1 className='text-white pt-4 padding-5'>LOGLY</h1>
                        <div className='row justify-content-center'>
                            <div className='col-12 col-md-9 mt-4'>
                            
                                <h3 className='text-center text-white fw-bolder'>Welcome!</h3>
                                <h6 className='text-center text-white font-h5'>To get started, Please complete your account step</h6>
                                 <div className='ms-5 mt-5'>
                                 <Stepper  activeStep={activeStep} orientation='vertical'>
        {steps.map((step, index) => {
          const labelProps = {};
          const stepProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography
              className='text-white'
                variant="caption"
                align="center"
                style={{ display: "inline" }}
              >
               
              </Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step {...stepProps} key={index}>
              <StepLabel {...labelProps}>
                <Typography className='text-white' align='left' variant='p'>{step.title}</Typography>
                <p className='text-white' align='left' variant='p'>{step.desc}</p>
                </StepLabel>
            </Step>
          );
        })}
      </Stepper>
                                </div>
                                <Link to="/">
                                  <Button className='logout' startIcon={<i className="fas fa-sign-out-alt"></i>}>
                                     <Typography style={{textTransform: 'capitalize', fontSize: 18}}>Logout</Typography> 
                                  </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Sider>
                </div>
                <div className='col-12 col-md-6 button-positions'>
                {activeStep === steps.length ? (
        <Typography variant="h3" align="center">
          Thank You
        </Typography>
      ) : (
        <>
          <form>{getStepContent(activeStep)}</form>

          {activeStep < 1 && (
            <Link to="/welcome">
            <Button
            className='mt-5 btn-button'
              // className={classes.button}
              // disabled={activeStep === 0}
              onClick={handleBack}
            >
              back
            </Button>
            </Link>
          )}
     
            {activeStep > 0 && (
              <Button
              className='mt-5 btn-button'
                // className={classes.button}
                // disabled={activeStep === 0}
                onClick={handleBack}
              >
                back
              </Button>
            )}
           
           {activeStep < steps.length - 1 && (
              <Button
                className='mt-5 ms-2 btn-bg col-3'
              // className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleNext}
            >
                Next
            </Button>
           )}
           
         
         {activeStep === steps.length - 1 && (
           <Link to="/">
              <Button
              className='mt-5 ms-2 btn-bg col-3'
              // className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleNext}
              >
              Finish
              </Button>
            </Link>
         )}
         
          {isStepOptional(activeStep)  &&  (
            <Button
            className='mt-5 skip float-end'
              // className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleSkip}
            >
              skip
              <img  src={rightarrows} alt="" />
            </Button>
          )}
          </>
      )}
          
                </div>
                </div>
                </div>
        </motion.div>
        </>
    )
}
