import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import { Steps,message, Layout, Calendar, Form, Card, Upload, Input, Select, Alert, Tooltip, Avatar, TimePicker, InputNumber, Popover, Divider, Modal, Tree,List  } from 'antd';
import { LoadingOutlined, PlusOutlined, PercentageOutlined, CloseOutlined, MailFilled, DownOutlined, ClockCircleFilled, CloseCircleFilled, EditFilled, DeleteFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import rightarrows from '../../../assets/images/rightarrows.png'
import '../../../customcss/custom.css'
import AddIcon from '@mui/icons-material/Add';
import avatar from '../../../assets/images/avatar.png'
import avatar1 from '../../../assets/images/avatar1.png'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from 'react-redux';
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
import { allForm, getTeamMember, uploadProfileImage, uploadSetupWizard } from '../../../store/Actions/setupWizards';

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

      // {
      //   title: "Team Members Added",
      //   desc: "Add Another Member"
      // }, 
      
  ];
}

const animal = [];
const animalName = [];
const teamMembersList=[];


const selectAnimal = animals => {
  console.log(animal)
  console.log("animal", animals,selectedAnimalInfo);
  let SA = animal;
  let index = SA.findIndex(animal => animal === animals.categoryId.name);
  let infoInd = selectedAnimalInfo.findIndex(e=>e === animals._id)
  if (index > -1) {
    console.log("remove")
    selectedAnimalInfo.splice(infoInd,1)
    SA.splice(index, 1);
  } else {
    console.log("add")
    SA.push(animals.categoryId.name);
    selectedAnimalInfo.push(animals._id)
  }

  const dayElement = document.getElementById(animals.categoryId.name);
  dayElement.classList.toggle("selected-day");

  
  console.log("SA", animal,selectedAnimalInfo);
};

const selectedAnimals = animals => {
  let index = animal.findIndex(animal => animals.categoryId.name === animal);

  console.log(index, "index");
 
  if (index > -1) {
    console.log(animals, "INSIE INDEX COLOR");
  }
  console.log(animals);
  return (
        <div className='col-12 font-size col-md-6 mt-2'>
          <Button
          id={animals.categoryId.name}
          onClick={() => selectAnimal(animals)}
          className="week-days font-size week-btns"
          key={animals.categoryId.name}
        >
          {animals.categoryId.name}
        </Button>
      </div>
  );
};


    
function Toggles() {
  
 
  return(
    <>
 {/* <div className='row'>
            <div className='col-12 col-md-12'> */}
              <h6>Animal Info</h6>
              <p>Select the animals you love</p>
              <div className='mt-3'>
                <div className='row animal-row'>
                  {animalName.map((animals, index) => selectedAnimals(animals))}
                </div>
              </div>
         {/* </div>
          </div> */}
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

const weekday = [];
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun",];
var desc ="";
var businessTimeIn="00:00";
var businessTimeOut="00:00";
var breakTimeIn="00:00";
var breakTimeOut="00:00";
var taxPercentage=0;
var holidayList=[];
var selectedAnimalInfo=[]
var selectedAnimalProduct=[]
var employeeArray=[]
let formData = new FormData();

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
      className="week-days"
      key={days}
    >
      {days}
    </Avatar>
  );
};



function GetSteppers() {
  
  const [Loading, setLoading] = useState(false);
  const [chars_left, setCharLeft] = useState(0)
  const [max_char, setMaxChar] = useState(0)
  const [description, setDescription]= useState(desc)
  const [startSelectedTime, setStartSelectedTime] = useState(businessTimeIn)
  const [endSelectedTime, setEndSelectedTime] = useState(businessTimeOut)
  const [start1SelectedTime, setStart1SelectedTime] = useState(breakTimeIn)
  const [end1SelectedTime, setEnd1SelectedTime] = useState(breakTimeOut)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [holidayDate, setHolidayDate] = useState(moment().format().split("T")[0])
  const [holidayName, setHolidayName] = useState('')
  const [holidayDetails,setHolidayDetails] = useState(holidayList)
  const [taxAmount, setTaxAmount] = useState(taxPercentage)
  const [image, setImage] = useState("")
 
  const   handleWordCount = (e) => {
    const charCount = e.target.value.length
    const maxChar = max_char;
    const charLength = charCount - maxChar;
    
    setDescription( e.target.value)
    desc= e.target.value
    setCharLeft(charLength)
  }


  const handleChange = info => {
    console.log(info.file.originFileObj)
    let uri = URL.createObjectURL(info.file.originFileObj)
    
  formData.append('file', {
    uri: info.file.originFileObj,
    name: 'team_member' + moment().unix() + '.jpg', type: 'image/*',
});
    setImage(URL.createObjectURL(info.file.originFileObj))
    // if (info.file.status === 'uploading') {
    //   this.setState({ loading: true });
    //   return;
    // }
    // if (info.file.status === 'done') {
    //   // Get this url from response in real world.
    //   getBase64(info.file.originFileObj, imageUrl =>
    //     this.setState({
    //       imageUrl,
    //       loading: false,
    //     }),
    //   );
    // }
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
  function setHolidatDate(e){
    let d = (moment(e._d).format()).split("T")[0]
    // let date = 
    console.log(d,"date")
    setHolidayDate(d)
  }

  const addHoliday = ()=>{
    console.log(holidayDate,holidayName, holidayDetails.length)
    holidayDetails.push({
      id: holidayDetails.length,
      holi_name:holidayName,
      holi_date:holidayDate
    })
    setHolidayDetails(holidayDetails.concat())
    holidayList.push({
      id: holidayDetails.length,
      holi_name:holidayName,
      holi_date:holidayDate
    })
    setIsModalVisible(false);
  }

  const updateHolidayDetails = (e) =>{
    console.log(e,holidayDetails)
    const key = holidayDetails.findIndex(
      (m) => m.id ===e
    )
    holidayDetails.splice(key,1)
    holidayList.splice(key,1)
  
  }

  return(
    <>
<div className='container-fluid g-0 postions'>
        <div className='row'>
          <div className='col-12 col-md-12'>
            
            <div>
            {/* <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader uploaders text-center"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload> */}
              <Upload
               name="avatar"
               className="avatar-uploader uploaders text-center"
               showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          // fileList={fileList}
          onPreview={(e)=>{console.log(e)}}
          onChange={handleChange}
        >
          {image ? <img src={image} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
            <label htmlFor=""> Description *</label>
            <TextArea 
              rows={4} 
              id='value' 
              className='text-area' 
              maxLength="1800"
              value={description}
              onChange={handleWordCount}
            />
            <p className='mt-2 float-end'><span className='text-danger'>{chars_left}</span> - 1800 </p>
            <div className='mt-5'>
              <label htmlFor="">Days of the week *</label>
              <br />
              <div className='d-flex flex-row'>
                {weekDays.map((days, index) => selectedWeekdays(days))}
              </div>
            </div>

            <div className='row'>
              <div className='col-md-6'>
                <div className='mt-3'>
                  <label htmlFor="">Business Timings *</label>
                  <br />
                  {/* <TimePicker.RangePicker  className='upload-image mt-2 timepicker-range' /> */}
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
                      businessTimeIn=timeString
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
                      businessTimeOut=timeString
                    }}
                  />
                </div>
              </div>

              <div className='col-md-6'>
                <div className='mt-3'>
                  <label htmlFor="">Break Timings *</label>
                  <br />
                  {/* <TimePicker.RangePicker  className='upload-image mt-2 timepicker-range' /> */}
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
                      breakTimeIn=timeString
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
                      breakTimeOut=timeString
                    }}
                  />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-12 col-md-6'>
                <div className='mt-5'>
                  {/* <Link to='/calender'> */}
                  <div style={{backgroundColor:"#f5f5f5", padding:"5px", borderRadius:'5px'}}>
                  <Button style={{display:'flex',flex:1, justifyContent:'center'}}  endIcon={<AddIcon />} onClick={showModal}>
                    <Typography style={{textTransform: 'capitalize', fontSize: 12}} className='color-holidays'>Holidays </Typography>
                  </Button>
                  {
                      holidayDetails.map((item,index)=>{
                        return(
                          <div className="d-flex flex-row" style={{display:"flex",alignItems:'center',  backgroundColor:'#fff', margin:'10px', borderRadius:'10px'}}>
                            <div style={{justifyContent:'center', alignItems:'center', backgroundColor:'#503a9f', padding:'10px',borderRadius:'10px'}} >
                              <Typography style={{textTransform: 'capitalize', fontSize: 12, color:'#fff', textAlign:'center'}} >{moment(item.holi_date).format("D")} </Typography>
                              <Typography style={{textTransform: 'capitalize', fontSize: 10, color:'#fff'}} >{moment(item.holi_date).format("ddd")} </Typography>
                            </div>
                            <div style={{display:'flex', flex:1, justifyContent:"space-between", alignItems:'center'}}>
                            <p style={{marginLeft:'10px',marginTop:'10px'}}>{item.holi_name}</p>
                            <Button  className='col-1' onClick={()=>{updateHolidayDetails(item.id)}}>
                            <CloseCircleFilled />
                              </Button>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>

          
                  <Modal className='modal-radius' centered visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                  <div className="site-calendar-demo-card">
                      <Calendar onSelect={(e)=>(setHolidatDate(e))} fullscreen={false} onPanelChange={onPanelChange} />
                      
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
                        <Input onChange={(e)=>{setHolidayName(e.target.value)}} placeholder=' Enter Holiday Name'  className='name' />
                      </Form.Item>
                      <Form.Item>
                        <Button onClick={addHoliday} size="small" className='btn-add col-2' type="primary" htmlType="submit" style={{fontSize: 12, textTransform: 'capitalize'}}>Add</Button>
                        <Button onClick={handleCancel} size="small" className='btn-cancel col-2 float-end'  style={{fontSize: 12, textTransform: 'capitalize'}}>Cancel</Button>
                      </Form.Item>
                  </Modal>
                  <Button ></Button>
                  {/* </Link> */}
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
                  <Input onChange={(e)=>{ 
                    setTaxAmount(e.target.value)
                    taxPercentage=e.target.value
                  }} onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                            }
                                        }}  suffix={<PercentageOutlined className='percentage' />}  className='grey-color mt-1' />
                  </Form.Item>
                    {/* {message && <span className={`message ${isValidPercentage ? 'success' : 'error'}`}>{message}</span>} */}
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


const product = [];
const AnimalProduct = [];

const selectProduct = products => {
  console.log(product)
  console.log("product", products,selectedAnimalProduct);
  let P = product;
  let index = P.findIndex(pro => pro === products.categoryId.name);
  let infoInd = selectedAnimalProduct.findIndex(e=>e === products._id)

  if (index > -1) {
    console.log("remove")
    selectedAnimalProduct.splice(infoInd,1)
    P.splice(index, 1);
  } else {
    console.log("add")
    P.push(products.categoryId.name);
    selectedAnimalProduct.push(products._id)
  }

  const dayElement = document.getElementById(products.categoryId.name);
  dayElement.classList.toggle("selected-day");
  
  console.log("P", product,selectedAnimalProduct);
};



const selectedProduct = products => {
  let index = product.findIndex(pro => products.categoryId.name === pro);

  console.log(index, "index");
 
  if (index > -1) {
    console.log(products, "INSIE INDEX COLOR");
  }
  console.log(products);
  return (
    <div className='col-12 col-md-6 mt-2'>
      <Button
        id={products.categoryId.name}
        onClick={() => selectProduct(products)}
        className="week-days font-size week-btns"
        key={products.categoryId.name}
      >
        {products.categoryId.name}
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
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const[phoneNo, setPhoneNo] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [zipcode, setZipcode] = useState('')

  const[cities,setCities]= useState([])
  const[states,setStatesList]= useState([])
  const[zipcodes,setZipcodes]= useState([])

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

  useEffect(() => {
    dispatch(getStates()).then((values)=> {
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

  const showModal = (e) => {
    console.log(e)
    setName(e?.name)
setEmail(e?.email)
setPhoneNo(e?.phone)
setState(e?.state)
setCity(e?.city)
setZipcode(e?.zipCode? e.zipCode:"")
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function onSearch(val) {
    console.log('search:', val);
  }
  const listOption=(e) => (
    <div>
     <Button onClick={()=>showModal(e)} style={{display:'flex', alignItems:'center'}}> 
     <EditFilled /> 
     <p style={{margin:'0px', marginLeft:'5px', color:'#000', fontWeight:'300'}}>Edit</p>
     </Button>
     <Button style={{display:'flex', alignItems:'center'}}> 
       <DeleteFilled style={{color:"red"}} /> 
       <p style={{margin:'0px', marginLeft:'5px', color:'#000', fontWeight:'300'}}>Delete</p>
       </Button>
    </div>
  );
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

            <List
          dataSource={teamMembersList}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={<Avatar src={item.image} />}
                title={<a href="https://ant.design">{item.name}</a>}
                description={item.phone}
              />
              {/* <div>Content</div> */}
              <Popover placement="left"  content={listOption(item)}  trigger="click">
              <Button> <MoreVertIcon style={{color:'#000'}} /></Button>
              </Popover>
            </List.Item>
          )}
        />
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
                        message: "Full name should not be less than 3 characters.",
                      },
                      {
                        max: 50,
                        message: "Full name should not be more than 50 characters.",
                      },
                    ]}
                  >
                    <Input value={name}  prefix={<PersonIcon />} onChange={(e)=>setName(e.target.value)} placeholder=' Enter Name'  className='name' />
                  </Form.Item>
                  </div>
                  <div className='col-12 col-md-6 mt-5'>
                  <Form.Item
                    name="email"
                    className='place'
                    rules={[
                      {
                        required: true,
                        message: 'please input your email!'
                      },

                      {
                        pattern: new RegExp(/\S+@\S+\.\S+/),
                        message: 'Email is valid'
                      }
                    ]}
                    
                  >
                    <Input  prefix={<MailFilled />} value={email} onChange={(e)=>setEmail(e.target.value)} placeholder=' Enter Email' className='name' />
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

                      {
                        pattern: new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g),
                        message: 'Phone Number at least 10 Characters'
                      },

                      
                    ]}
                  >
                    <Input maxLength={10} onKeyPress={(event) => {
                                                        if (!/[0-9]/.test(event.key)) {
                                                        event.preventDefault();
                                                        }
                                                    }}  prefix={<PhoneIcon />} value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)} placeholder=' Phone No.' className='name' />
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
                      <Select  
                      className='state-city form-select' 
                      defaultValue="Select State" 
                      onChange={stateChange}
                      showSearch
                      placeholder="Select a person"
                      optionFilterProp="children"
                      onSearch={onSearch}
                      filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                      >
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
                   
                      <Select  
                      className='state-city form-select' 
                      defaultValue="Select City" 
                      onChange={cityChange}
                      showSearch
                      placeholder="Select a person"
                      optionFilterProp="children"
                      onSearch={onSearch}
                      filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                      >
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
                    <Select  
                    className='state-city form-select' 
                    defaultValue="Select ZipCode" 
                    onChange={zipChange}
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    >
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

  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState("")
  const [cancel, setCancel] = useState(false);
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [zipcode, setZipcode] = useState('')

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
          
            <div>
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
                        message: 'please input your email!'
                      },

                      {
                        pattern: new RegExp(/\S+@\S+\.\S+/),
                        message: 'please input valid email!'
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
                    
                      <Button onClick={handleCancel} size="small" className='btn-cancel float-end col-2'  style={{fontSize: 12, textTransform: 'capitalize'}}>
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
          <GetSteppers />
        </>
      );

    case 1:
      return (
        
        <>
          <Toggles />
      
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
          
              <div className='mt-3'>
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
            
                 <div className='card cardes mt-0 mb-3' style={{maxWidth: 450, maxHeight: 74}}>
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



export default function BusinessAccount() {
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(()=>{
    console.log("user")
    allForm().then(res=>{
      console.log(res)
      res.filter(val=>{
        if(val.categoryId.type == 'animal'){
        console.log(val.categoryId.type)
        animalName.push(val)
        }else{
          AnimalProduct.push(val)
        }
      })

    })
    getTeamMember().then(res=>{
     res.forEach(e=>{
       employeeArray.push(e._id)
       teamMembersList.push(e)
       
     })
    })
      },[])
  const isStepOptional = (step) => {
    return step === 0 || step === 1 || step === 2 || step === 3;
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const handleNext = () => {
    
    console.log(activeStep,moment().format().split('T')[0])
    if(activeStep==3){
      console.log(weekday,desc,businessTimeIn,
        businessTimeOut,
        breakTimeIn,
        breakTimeOut,taxPercentage,holidayList,"weekday")
       let params = { 
         businessDetails: {businessInfo:desc,daysOpen:weekday,openHrStart:moment().format().split('T')[0]+"T" +businessTimeIn,openHrEnd:moment().format().split('T')[0]+"T" + businessTimeOut,breakTimeStart:moment().format().split('T')[0]+"T"+breakTimeIn,breakTimeEnd:moment().format().split('T')[0]+"T"+breakTimeOut,holidays:holidayList,taxPercentage:taxPercentage, imageUrl: ''},
         employeeArray: employeeArray,
         selectedAnimalForms:selectedAnimalInfo,
         selectedProductForm: selectedAnimalProduct,
        }
        console.log(params)
        uploadSetupWizard(params)

    }
    setActiveStep(activeStep + 1);
    setSkippedSteps(skippedSteps.filter((skipItem) => skipItem !== activeStep));
   
      // uploadProfileImage(formData)
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
        
        <div>
            <motion.div
             initial={{opacity: 0}}
             animate={{opacity: 1}}
             exit={{opacity: 0}}
            >
               <div className='container-fluid g-0 overflow'>
               <div className='row align-items-center'>
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
                <p className='text-thick text-white' align='left' variant='p'>{step.desc}</p>
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
              // <Link to="/">
                <Button
                      className='mt-5 ms-2 btn-bg col-3'
                  // className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  Finish
                </Button>
              // </Link>
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
        </div>
    )
}
