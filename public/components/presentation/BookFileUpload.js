// BookFileUpload
import React, {PropTypes} from 'react'
import Dropzone from 'react-dropzone'
import Loading from '../Loading'
import LogOnRender from '../hoc/LogOnRender'
const styleFileDropText = {
  textAlign: 'center',
  marginTop: '90px',
  padding: '10px'
}
let BookFileUpload = ({ isBeingUploaded, onDrop }) => {
  return (
    <div className="uploadNewBook">
      <h2>Upload a New book</h2>
      <div style={{marginTop: '15px'}}>
        {isBeingUploaded ? <Loading text="Uploading book" /> : ''}
        <Dropzone onDrop={onDrop}>
          <div style={styleFileDropText}>Drop a SINGLE file in hurr.</div>
        </Dropzone>
      </div>
    </div>
  )
}


BookFileUpload.propTypes = {
  isBeingUploaded: PropTypes.bool,
  onDrop: PropTypes.func
}
BookFileUpload = LogOnRender(BookFileUpload)
export default BookFileUpload