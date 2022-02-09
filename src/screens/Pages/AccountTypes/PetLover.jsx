import React, { useState, useEffect } from 'react'
import { Steps,message, Layout, Calendar, Form, Card, Upload, Input, Select, Alert, Tooltip, TimePicker, InputNumber, Popover, Divider, Modal, Tree  } from 'antd';
import { PercentageOutlined, CloseOutlined, DownOutlined, ClockCircleFilled } from '@ant-design/icons';import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../../../customcss/custom.css'
import AddIcon from '@mui/icons-material/Add';
import avatar from '../../../assets/images/avatar.png'
import avatar1 from '../../../assets/images/avatar1.png'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import WelcomeScreen from '../WelcomeScreen';
import Person from '../../../components/Person';
import { useDispatch, useSelector } from 'react-redux';
import { getCities, getStates, getZipCode } from '../../../store/Actions/Action'
import { toast, ToastContainer } from 'material-react-toastify'

import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import rightarrows from '../../../assets/images/rightarrows.png'
import { MailFilled, UploadOutlined, LoadingOutlined, PlusOutlined  } from '@ant-design/icons'
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import Avatar from 'antd/lib/avatar/avatar';
import moment from 'moment';

const { Option } = Select;

const { TextArea } = Input;


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
    <p><Button size="small" startIcon={<i class="fas fa-edit" style={{fontSize: 12}}></i>} style={{fontSize: 12, textTransform: 'capitalize'}}><span className='color-edit'>Edit</span></Button></p>
    <Divider />
    {/* <p> <Button size="small" className='text-danger'  startIcon={<DeleteIcon />}  style={{fontSize: 12, textTransform: 'capitalize'}}>Delete</Button></p> */}
    <p><DeleteModal /></p>
  </div>
);


function getSteps() {
  return [
    {
      title: "Business Details",
      desc: "Please setup your business profile"
    },

    {
      title: "Animal Info",
      desc: "Select the animals you love"
    },

    {
      title: "Team Members",
      desc: "Add Team Member"
    }
  ];
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
          <Avatar
          id={animals}
          onClick={() => selectAnimal(animals)}
          className="week-days font-size week-btns"
          key={animals}
        >
          {animals}
        </Avatar>
      </div>
  );
};



const AnimalToggle = () => {

  return(
    <>
<div className='container-fluid g-0'>
          <div className='row'>
            <div className='col-12 col-md-12'>
              <h6>Animal Info</h6>
              <p>Select the animals you love</p>
              <div className='row f-bold animal-row'>
                  {animalName.map((animals, index) => selectedAnimals(animals))}
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
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [zipcode, setZipcode] = useState('')

  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState("")
  const [cancel, setCancel] = useState(false);

  const dispatch = useDispatch()


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

  // const states = useSelector((state) => state.myState.states)
  // const cities = useSelector((state) => state.myCities.cities)
  // const zipcodes = useSelector((state) => state.myZipCode.zipcodes)

  const[cities,setCities]= useState([])
  const[states,setStatesList]= useState([])
  const[zipcodes,setZipcodes]= useState([])


  useEffect(() => {
    dispatch(getStates()).then((values)=>{
      setStatesList(values)
    })
  }, [])

  const stateChange = (value, e) => {
    setState(value)
    setCities([])
    setZipcodes([])
    setCity('')
    setZipcode('')
    if(value) {
      let id = states.filter((state) => state.name === value)[0].id
      dispatch(getCities(id)).then((values)=>{
        setCities(values)
      })
    }
    
  }

  const cityChange = (value, e) => {
    
    if(value) {
      let city = cities.filter((id) => id.name === value)[0].name
      console.log(city)
      setCity(value)
      setZipcode('')
      dispatch(getZipCode(city)).then((values) => {
        setZipcodes(values)
      })
    }
  }

  const zipChange = (value, e) => {
    console.log(value)
    setZipcode(value)
  }
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

                      {
                        pattern: new RegExp(/^[a-zA-Z0-9 ]+$/i),
                        message: "numbers and special characters not allowed",
                      },
                      {
                        min: 3,
                        message: "Full name  should not be less than 3 characters.",
                      },
                      {
                        max: 50,
                        message: "Full name should not be more than 50 characters.",
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
                    rules={[
                      {
                        required: true,
                        message: 'please input your email'
                      },

                      {
                        pattern: new RegExp(/\S+@\S+\.\S+/),
                        message: 'Email is valid'
                      }
                    ]}
                    
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

                      {
                        pattern: new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g),
                        message: 'Phone Number atleast 10 Characters'
                      }
                    ]}
                  >
                    <Input maxLength={10} onKeyPress={(event) => {
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
                      <Select  className='state-city form-select' defaultValue="Select State" onChange={stateChange}>
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
                   
                       <Select onChange={cityChange}  className='state-city' defaultValue="Select State">
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
                     <Select onChange={zipChange} className='state-city' defaultValue="Select Zipcode">
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

function getBase641(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function before1Upload(file) {
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

function handleChange1(value) {
  console.log(`selected ${value}`);
}

function AddTeamMembers() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [zipcode, setZipcode] = useState('')

  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState("")
  const [cancel, setCancel] = useState(false);
  
  const dispatch = useDispatch()

  

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
  }, [])

  const stateChange = (value) => {
    setState(value)
    if(value) {
      let id = states.filter((state) => state.name === value)[0].id
      dispatch(getCities(id))
    }
  }

 const cityChange = (value) => {
  setCity(value)
  if(value) {
    let city = cities.filter((id) => id.name === value)[0].name
    dispatch(getZipCode(city))
  }
 }

 const zipcodeChange = (value) => {
   setZipcode(value)
 }

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
            <div className='col-12 col-md-12 mt-5'>
          
            <div >
            <Button endIcon={<AddIcon />} className='outline-border col-8 mt-5' variant="outlined" color="primary"  onClick={showModal}>
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
                    rules={[
                      {
                        required: true,
                        message: 'please input your email'
                      },

                      {
                        pattern: new RegExp(/\S+@\S+\.\S+/),
                        message: 'please input valid email'
                      }
                    ]}
                    
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
                      <Select  className='state-city form-select' defaultValue="Select State" onChange={stateChange}>
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
                   
                      <Select  className='state-city form-select' defaultValue="Select City" onChange={cityChange}>
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
                    <Select  className='state-city form-select' defaultValue="Select ZipCode" onChange={zipcodeChange}>
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



function Toggle() {


  return(
    <>
    <AnimalToggle />
    </>
  )
}



function Profile() {
  const [Loading, setLoading] = useState(false);
  const [chars_left, setCharLeft] = useState(0)
  const [max_char, setMaxChar] = useState(0)
  const [show, setShow] = useState(false)

  const [startSelectedTime, setStartSelectedTime] = useState("00:00")
  const [endSelectedTime, setEndSelectedTime] = useState("00:00")
  const [start1SelectedTime, setStart1SelectedTime] = useState("00:00")
  const [end1SelectedTime, setEnd1SelectedTime] = useState("00:00")
  const [isModalVisible, setIsModalVisible] = useState(false);
 
  const handleWordCount = (e) => {
    const charCount = e.target.value.length
    const maxChar = max_char;
    const charLength = charCount - maxChar;
    setCharLeft(charLength)
  }


  const handleChange = info => {
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

  const { imageUrl } = Loading

  const uploadButton = (
    <div>
      {Loading ? <LoadingOutlined /> : <PlusOutlined className='plus-outlined' />}
      <div style={{ marginTop: 8 }}>Logo</div>
    </div>
  );

  function onChange(time, timeString) {
    console.log(time, timeString);
  }

 
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  
  function onPanelChange(value, mode) {
    console.log(value, mode);
  }
  return(
    <>
      <div className='container-fluid g-0 postions'>
        <div className='row'>
          <div className='col-12 col-md-12'>
            
            <div>
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader uploaders text-center"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
            <label htmlFor=""> Description *</label>
            <TextArea 
              rows={4} 
              id='value' 
              className='text-area' 
              maxLength="1800"
              onChange={handleWordCount}
            />
            <p className='mt-2 float-end'><span className='text-danger'>{chars_left}</span> - 1800 </p>
           
       </div>
       </div>
        </div>
      </div>
    </>
  )
}


function getStepContent(step) {
  
  switch (step) {
    case 0: 
    return(
      <>
        <Profile />
      </>
    )
    case 1:
      return (
        <>
          <Toggle />
        </>
      );

    case 2:
      return (
        
        <>
         <TeamMembers />
        </>
      );
    // case 3:
    //   return (
    //     <>
    //        <div className='container-fluid g-0'>
    //       <div className='row'>
    //         <div className='col-12 col-md-12'>
    //           <h6>Team member added!</h6>
          
    //           <div className='mt-3'>
    //            <div className='card cardes mb-3' style={{maxWidth: 450, maxHeight: 74}}>
    //              <div className='row g-0'>
    //                <div className='col-12 col-md-2'>
    //                   <img src={avatar} alt="" className='img-fluid rounded-start'  />
    //                </div>
    //                <div className='col-12 col-md-10'>
    //                   <div className='card-body'>
    //                       <h6 className='card-title text-card'>Jack Rio</h6>
    //                       <p className='card-text text-card'>0213462840459 
    //                       {/* <Tooltip className='text-align tools-tips' placement="left" title={text}>
    //                         <MoreVertIcon />
    //                       </Tooltip> */}

    //                       <Popover className='pop text-align tools-tips cursor-pointer' placement="left" content={content} trigger="click">
    //                         <MoreVertIcon className='vector-icon' />
    //                       </Popover>
    //                       </p>
                         
    //                   </div>
    //                  </div>
    //              </div>
            
                
    //              <div className='card cardes mt-0 mb-3' style={{maxWidth: 450, maxHeight: 74}}>
    //              <div className='row g-0'>
    //                <div className='col-12 col-md-2'>
    //                   <img src={avatar1} alt="" className='img-fluid rounded-start'  />
    //                </div>
    //                <div className='col-12 col-md-10'>
    //                   <div className='card-body'>
    //                       <h6 className='card-title text-card'>Rosie Fernadez</h6>
    //                       <p className='card-text text-card'>0213222382819
    //                       <Popover className='text-align tools-tips cursor-pointer' placement="left" content={content} trigger="click">
    //                         <MoreVertIcon className='vector-icon' />
    //                       </Popover>
    //                       </p>
                          
    //                   </div>
    //                  </div>
                  
    //              </div>
    //              </div>
    //            </div>
    //            <div className='mt-0'>
                    
    //                 <AddTeamMembers />
    //      </div>
    //      </div>
    //      </div>
    //       </div>
    //     </div>
         
    //     </>
    //   );
    // case 3:
    //   return (
    //     <>
    //       <TextField
    //         id="cardNumber"
    //         label="Card Number"
    //         variant="outlined"
    //         placeholder="Enter Your Card Number"
    //         fullWidth
    //         margin="normal"
    //         name="cardNumber"
    //       />
    //       <TextField
    //         id="cardMonth"
    //         label="Card Month"
    //         variant="outlined"
    //         placeholder="Enter Your Card Month"
    //         fullWidth
    //         margin="normal"
    //         name="cardMonth"
    //       />
    //       <TextField
    //         id="cardYear"
    //         label="Card Year"
    //         variant="outlined"
    //         placeholder="Enter Your Card Year"
    //         fullWidth
    //         margin="normal"
    //         name="cardYear"
    //       />
    //     </>
    //   );
    default:
      return "unknown step";
  }
}



const { Sider } = Layout

const  PetLover = () =>  {
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const isStepOptional = (step) => {
    return step === 0 || step === 1;
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
                <p className='text-white text-thick' align='left' variant='p'>{step.desc}</p>
                </StepLabel>
            </Step>
          );
        })}
      </Stepper>
                                </div>
                                <Link to="/">
                                  <Button className='logout' startIcon={<i className="fas fa-sign-out-alt"></i>}>
                                     <Typography style={{textTransform: 'capitalize', fontSize: 18}} > Logout </Typography>
                                  </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                   
                </Sider>
                </div>
                <div className='col-12 col-md-6 mt-5'>
              
                {activeStep === steps.length ? (
        <Typography variant="h3" align="center">
          Thank You
        </Typography>
      ) : (
        <>
          <form>{getStepContent(activeStep)}</form>
          <div>

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
                className='mt-5 ms-2 width-btns btn-bg col-3'
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
                <img src={rightarrows} alt="" />
              </Button>
            )}
        
          </div>
        </>
      )}
                               
                     
                 
                </div>
                </div>
                </div>
               


           {/* <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div> */}

</motion.div>
        </>
    )
}


export default PetLover



