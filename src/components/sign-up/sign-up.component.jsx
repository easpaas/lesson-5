import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

function SignUp() {
  const [formData, setFormData] = useState({
    displayName: '', 
    email: '', 
    password: '', 
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      console.log("passwords don't match")
      return;
    }

    try {
      const {user } = await auth.createUserWithEmailAndPassword(formData.email, formData.passowrd);

      createUserProfileDocument(user, formData.displayName );

      setFormData({
        displayName: '', 
        email: '', 
        password: '', 
        confirmPassword: ''
      });
    } catch (error) {
      console.log(error);
    }
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
          onChange={handleChange}
          label='Display Name'
          required
        />
        <FormInput
          type='text'
          name='email'
          value={formData.email}
          onChange={handleChange}
          label='Email'
          required
        />
        <FormInput
          type='text'
          name='password'
          value={formData.password}
          onChange={handleChange}
          label='Password'
          required
        />
        <FormInput
          type='text'
          name='confirmPassword'
          value={formData.confirmPassword}
          onChange={handleChange}
          label='Confirm Password'
          required
        />
        <CustomButton type='submit'>SIGN UP</CustomButton>
      </form>
    </div>
  )
}

export default SignUp;