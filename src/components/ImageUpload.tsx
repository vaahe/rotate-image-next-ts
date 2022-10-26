import React, { useState } from 'react';
import DragDropInput from './DragDropInput';

const ImageUpload = () => {
  const [errorMsg, setErrorMsg] = useState<string>('');

  return (
    <div id='upload-section'>
      <form className='upload-form'>
        <DragDropInput setErrorMsg={setErrorMsg} />
        <span className={errorMsg ? 'error' : 'default'}>{errorMsg}</span>
        <div id='upload-link'>
        </div>
      </form>
    </div>
  )
}

export default ImageUpload;