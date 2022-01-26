import React, { useState, useEffect } from 'react'
import { Layout, Card, Form, Input, Checkbox, Select, Upload, message  } from 'antd';
import { Link } from 'react-router-dom'
import '../../../customcss/custom.css';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'material-react-toastify'
import 'material-react-toastify/dist/ReactToastify.css';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getCities, getStates, getZipCode } from '../../../store/Actions/Action'
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { MailFilled, UploadOutlined, LoadingOutlined, PlusOutlined  } from '@ant-design/icons'
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import FlagIcon from '@mui/icons-material/Flag';
import AddIcon from '@mui/icons-material/Add';


const { Sider } = Layout;
const { Option } = Select;


function handleChange(value) {
  console.log(`selected ${value}`);
}

// const props = {
//   name: 'file',
//   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//   headers: {
//     authorization: 'authorization-text',
//   },
//   onChange(info) {
//     if (info.file.status !== 'uploading') {
//       console.log(info.file, info.fileList);
//     }
//     if (info.file.status === 'done') {
//       message.success(`${info.file.name} file uploaded successfully`);
//     } else if (info.file.status === 'error') {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
// };

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

function getSteps() {
  return [
    {
      title: "Animal info",
      desc: "Select the animals you love"
    },

    {
      title: "Team Members",
      desc: "Add Team Member"
    },

    {
      title: "Team Members Added",
      desc: "Add Another Member"
    }
  ];
}

const PetLoverForms = (props) => {
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
  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };


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

  const handleCancel = () => {
    setCancel(!cancel)
  }
  
  const states = useSelector((state) => state.myState.states)
  const cities = useSelector((state) => state.myCities.cities)
  const zipcodes = useSelector((state) => state.myZipCode.zipcodes)

  useEffect(() => {
    dispatch(getStates())
    dispatch(getCities())
    dispatch(getZipCode())
  }, [])
  return (
    <>
     <motion.div
             initial={{opacity: 0}}
             animate={{opacity: 1}}
             exit={{opacity: 0}}
          >
            <div className='container-fluid g-0 overflow bg-grey'>
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
                <div className='col-12 col-md-6 mt-5 lover-positions'>
                  <Card className='card-radius'>
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
        className="avatar-uploader"
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
        
          <Button onClick={handleCancel} size="small" className='btn-cancel col-2 float-right'  style={{fontSize: 12, textTransform: 'capitalize'}}>
            cancel
          </Button>
        
        <ToastContainer />
      </Form.Item>
      </div>
    </Form>
                  </Card>
                  
              </div>
              
              </div>
           
            </div>
        
        </motion.div>
        
    </>
  )
}

export default PetLoverForms
