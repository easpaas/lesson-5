import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

const initState = {
  displayName: '', 
  email: '', 
  password: '', 
  confirmPassword: ''
}

function SignUp() {
  const [formData, setFormData] = useState(initState);

  const handleSubmit = async e => {
    e.preventDefault();
    const { displayName, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      console.log("passwords don't match")
      return;
    }

    try {
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      // firebase method that adds user to firebase db
      createUserProfileDocument(user, { displayName } );
      //reset form state 
      setFormData(initState);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    e.persist();
    const { name, value } = e.target;
    setFormData({ 
      ...formData,
      [name]: value 
    });
  };
  return (
    <div className='sign-up'>
      <h2 className='title'>I do not have a account</h2>
      <span>Sign up with your email and password</span>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='displayName'
          value={formData.displayName}
          handleChange={handleChange}
          label='Display Name'
          required
        />
        <FormInput
          type='email'
          name='email'
          value={formData.email}
          handleChange={handleChange}
          label='Email'
          required
        />
        <FormInput
          type='password'
          name='password'
          value={formData.password}
          handleChange={handleChange}
          label='Password'
          required
        />
        <FormInput
          type='password'
          name='confirmPassword'
          value={formData.confirmPassword}
          handleChange={handleChange}
          label='Confirm Password'
          required
        />
        <CustomButton type='submit'>SIGN UP</CustomButton>
      </form>
    </div>
  )
}

export default SignUp;