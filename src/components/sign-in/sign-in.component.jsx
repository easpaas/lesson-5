import React, {useState} from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

function SignIn (props) {
  const [formData, setFormData] = useState({
    email: '', 
    password: '', 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setFormData({ email: '', password: '' })
    } catch (error) {
      console.log(error)
    }
  };

  const handleChange = (e) => {
    e.persist();
    const {value, name} = e.target;
    setFormData({ 
      ...formData,
      [name]: value 
    });
  };

  return (
    <div className='sign-in'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput 
          name="email"
          type="email"
          value={formData.email} 
          handleChange={handleChange} 
          label='Email' 
          required 
        />
        <FormInput 
          name="password" 
          type="password"
          value={formData.password} 
          handleChange={handleChange} 
          label='Password' 
          required 
        />
        <div className='buttons'>
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton  type="button" onClick={signInWithGoogle} isGoogleSignIn>Sign In With Google</CustomButton>
        </div>
      </form>
    </div>
  )
}


export default SignIn;