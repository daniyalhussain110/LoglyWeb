import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import { Steps,message, Layout, Card, Form, Upload, Avatar, Input, Calendar, Select, Alert, Tooltip, TimePicker, Popover, Divider, Modal  } from 'antd';
import { LoadingOutlined, PlusOutlined, PercentageOutlined, ClockCircleFilled, MailFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import rightarrows from '../../../assets/images/rightarrows.png'
import '../../../customcss/custom.css'
import AddIcon from '@mui/icons-material/Add';
import avatar from '../../../assets/images/avatar.png'
import avatar1 from '../../../assets/images/avatar1.png'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { getCities, getStates, getZipCode } from '../../../store/Actions/Action'
import { toast, ToastContainer } from 'material-react-toastify'

import moment from 'moment';
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

const { TextArea } = Input;

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
    <p><Button size="small" startIcon={<i class="fas fa-edit" style={{fontSize: 12}}></i>} style={{fontSize: 12, textTransform: 'capitalize'}}><span className='color-edit'>Edit</span></Button></p>
    <Divider />
    <p> 
      <DeleteModal />
    </p>
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

const weekday = [];
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun",];

const selectWeekDays = day => {
  console.log("day", day);
  let wD = weekday;
  let index = wD.findIndex(d => d === day);
  if (index > -1) {
    wD.splice(index, 1);
  } else {
    wD.push(day);
  }

  const dayElement = document.getElementById(day);
  dayElement.classList.toggle("selected-day");

  
  console.log("wD", weekday);
};

const selectedWeekdays = days => {
  let index = weekday.findIndex(d => days.value === d);

  console.log(index, "index");
 
  if (index > -1) {
    console.log(days, "INSIE INDEX COLOR");
  }
  console.log(days);
  return (
    <Avatar
      id={days}
      onClick={() => selectWeekDays(days)}
      className="days"
      key={days}
    >
      {days}
    </Avatar>
  );
};



function GetForms() {
  const [Loading, setLoading] = useState(false);
  const [chars_left, setCharLeft] = useState(0)
  const [max_char, setMaxChar] = useState(0)
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
                id="value"
                rows={4}
                className='text-area'
                maxLength="1800"
                onChange={handleWordCount}
              />
              <p className='mt-2 float-end'><span className='text-danger'>{chars_left}</span> - 1800 </p>
              <div className='mt-3'>
                <label htmlFor="">Days of the week *</label>
                <br />
                <div className='d-flex flex-row w-100'>
                  {weekDays.map((days, index) => selectedWeekdays(days))}
                </div>
              </div>

              <div className='row'>
                <div className='col-md-6'>
                  <div className='mt-3'>
                    <label htmlFor="">Business Timings *</label>
                    <br />
                    <TimePicker 
                    placeholder='Start Time'
                    renderExtraFooter={() => (
                      <div className='timePickerHeader'>
                        <div>HH</div>
                        <div>MM</div>
                      </div> 
                    )} 
                    className='upload-image mt-2 timepicker-range' 
                    onChange={onChange} 
                    defaultValue={moment('00:00', 'HH:mm')}
                    format="HH:mm"
                    suffixIcon={<ClockCircleFilled />}
                    showNow={false}
                    allowClear={false}
                    value={moment(startSelectedTime, "HH:mm")}
                    onSelect={(value) => {
                      const timeString = moment(value).format("HH:mm");
                      setStartSelectedTime(timeString)
                    }}
                  />
                  
                 <TimePicker 
                    placeholder='End Time'
                    renderExtraFooter={() => (
                      <div className='timePickerHeader'>
                        <div>HH</div>
                        <div>MM</div>
                      </div> 
                    )} 
                    className='upload-image mt-2 ms-3 timepicker-range' 
                    onChange={onChange} 
                    defaultValue={moment('00:00', 'HH:mm')}
                    format="HH:mm"
                    suffixIcon={<ClockCircleFilled />}
                    showNow={false}
                    allowClear={false}
                    value={moment(endSelectedTime, "HH:mm")}
                    onSelect={(value) => {
                      const timeString = moment(value).format("HH:mm");
                      setEndSelectedTime(timeString)
                    }}
                  />
                  </div>
                </div>

                <div className='col-md-6'>
                  <div className='mt-3'>
                    <label htmlFor="">Break Timings *</label>
                    <br />
                    <TimePicker 
                    placeholder='Start Time'
                    renderExtraFooter={() => (
                      <div className='timePickerHeader'>
                        <div>HH</div>
                        <div>MM</div>
                      </div> 
                    )} 
                    className='upload-image mt-2  timepicker-range' 
                    onChange={onChange} 
                    defaultValue={moment('00:00', 'HH:mm')}
                    format="HH:mm"
                    suffixIcon={<ClockCircleFilled />}
                    showNow={false}
                    allowClear={false}
                    value={moment(start1SelectedTime, "HH:mm")}
                    onSelect={(value) => {
                      const timeString = moment(value).format("HH:mm");
                      setStart1SelectedTime(timeString)
                    }}
                  />
                 <TimePicker 
                    placeholder='End Time'
                    renderExtraFooter={() => (
                      <div className='timePickerHeader'>
                        <div>HH</div>
                        <div>MM</div>
                      </div> 
                    )} 
                    className='upload-image mt-2 ms-3 timepicker-range' 
                    onChange={onChange} 
                    defaultValue={moment('00:00', 'HH:mm')}
                    format="HH:mm"
                    suffixIcon={<ClockCircleFilled />}
                    showNow={false}
                    allowClear={false}
                    value={moment(end1SelectedTime, "HH:mm")}
                    onSelect={(value) => {
                      const timeString = moment(value).format("HH:mm");
                      setEnd1SelectedTime(timeString)
                    }}
                  />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-12 col-md-6'>
                  <div className='mt-5'>
                  <Button className='col-12 grey-color mt-1' variant='outlined' endIcon={<AddIcon />} onClick={showModal}>
                    <Typography style={{textTransform: 'capitalize', fontSize: 12}} className='color-holidays'>Holidays </Typography>
                  </Button>
          
                  <Modal className='modal-radius' centered visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                  <div className="site-calendar-demo-card">
                      <Calendar fullscreen={false} onPanelChange={onPanelChange} />
                      
                    </div>
                    <Form.Item
                        name="name"
                        className='place mt-3'
                        rules={[
                          {
                            required: true,
                            message: 'Please input your name!',
                          },
                        ]}
                      >
                        <Input  placeholder=' Enter Holiday Name'  className='name' />
                      </Form.Item>
                      <Form.Item>
                        <Button size="small" className='btn-add col-2' type="primary" htmlType="submit" style={{fontSize: 12, textTransform: 'capitalize'}}>Add</Button>
                        <Button onClick={handleCancel} size="small" className='btn-cancel col-2 float-end'  style={{fontSize: 12, textTransform: 'capitalize'}}>Cancel</Button>
                      </Form.Item>
                  </Modal>
                  </div>
                </div>
                <div className='col-12 col-md-6'>
                  <div className='mt-4'>
                    <label htmlFor="">Tax Percentage</label>
                    <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'please input your percentage!'
                      },

                      {
                        pattern: new RegExp(/(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/i),
                        message: 'please input valid percentage!'
                      }
                    ]}
                  >
                    <Input onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                            }
                                        }} suffix={<PercentageOutlined />} className='grey-color mt-2' />
                    </Form.Item>

                  </div>
                </div>
              </div>
         </div>
         </div>
          </div>
        </div>
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
          className="week-days font-size week-btns"
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
              <div className='row animal-row'>
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
        className="week-days font-size week-btns"
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
        <div className='row animal-row'>
            {AnimalProduct.map((products, index) => selectedProduct(products))}
          </div>

    </div>
    </div>
    </div>
    </>

  )

}

function handleChange(value) {
  console.log(`selected ${value}`);
}


function TeamMembers() {
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    dispatch(getStates()).then((response) => {
      if(response.payload.status === 200) {

      }
    })
  }, [])

  const stateChange = (value) => {
    if(value) {
      let id = states.filter((state) => state.name === value)[0].id
      dispatch(getCities(id)).then(response => {
        if(response.payload.status === 200) {
         
        }
      })
    }
  }

 const zipcodeChange = (value) => {
  if(value) {
    let zipcode = cities.filter((zip) => zip.zipcode === value).zipcode
    dispatch(getZipCode(zipcode)).then(response => {
      if(response.payload.status === 200) {
         
      } 
    })
  }
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
                   
                      <Select  className='state-city form-select' defaultValue="Select City" onChange={zipcodeChange}>
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
    dispatch(getStates()).then((response) => {
      if(response.payload.status === 200) {

      }
    })
  }, [])

  const stateChange = (value) => {
    if(value) {
      let id = states.filter((state) => state.name === value)[0].id
      dispatch(getCities(id)).then(response => {
        if(response.payload.status === 200) {
         
        }
      })
    }
  }

 const zipcodeChange = (value) => {
  if(value) {
    let zipcode = cities.filter((zip) => zip.zipcode === value).zipcode
    dispatch(getZipCode(zipcode)).then(response => {
      if(response.payload.status === 200) {
         
      } 
    })
  }
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
                   
                      <Select  className='state-city form-select' defaultValue="Select City" onChange={zipcodeChange}>
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
        <GetForms />
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


export default function CharityAccount() {
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
                                 <div className='ms-3 mt-5'>
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
                                  <Button className='logout position' startIcon={<i className="fas fa-sign-out-alt"></i>}>
                                  <Typography style={{textTransform: 'capitalize', fontSize: 18}}> Logout </Typography>
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

            {activeStep < steps.length - 1 &&  (
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

              {/* <div className='steps steps-content'>
              <Button type='primary' className='col-4 col-radius'>{steps[current].cage}</Button>
                          <Button type='primary ms-3' className='col-4 col-radius bg-colors'>{steps[current].dogfood}</Button>

                          <Button type='primary' className='col-4 col-radius bg-colors mt-3'>{steps[current].royalcabin}</Button>
                          <Button type='primary ms-3' className='col-4 col-radius'>{steps[current].sojos}</Button>
                      
                          <Button type='primary' className='col-4 col-radius mt-3'>{steps[current].buffelo}</Button>
                          <Button type='primary ms-3' className='col-4 col-radius bg-colors'>{steps[current].CatLitter}</Button>

                          <Button type='primary' className='col-4 col-radius bg-colors mt-3'>{steps[current].Active}</Button>
                          <Button type='primary ms-3' className='col-4 col-radius bg-colors'>{steps[current].pethouse}</Button>
              </div> */}
     
               
                </div>
                </div>
            </motion.div>
        </>
    )
}
