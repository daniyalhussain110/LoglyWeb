import React from 'react'
import { Upload, Button } from 'antd'
import { PaperClipOutlined } from '@ant-design/icons';
export default function UploadForm({uploader}) {
    const handleChange = (e) => {
        uploader(e.target.files[0])
    }
  return (
    <>
        <form>
             <Upload accept='image/*' onChange={handleChange} className='img-upload ' name="logo" action="/upload.do" listType="picture">
                <Button  icon={<PaperClipOutlined />} size='medium' className='font-upload'>Upload Image</Button>
            </Upload> 
            {/* <input type="file"  /> */}
        </form>
    </>
  )
}
