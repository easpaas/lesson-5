import React from 'react';

import './form-input.styles.scss';

const FormInput = ({ handleChange, label, error, ...otherProps }) => (
  <div className='group'>
    <input className='form-input' onChange={handleChange} {...otherProps} />
    {
      label ? 
      (
        <div>
          <label className={`${otherProps.value ? 'shrink' : ''} form-input-label`}>
            {label}
          </label>
          <p style={{color: 'red', margin: '0'}}>{error}</p>
        </div>
      )
      :
        null
    }
  </div>
);

export default FormInput;