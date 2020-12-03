import React, { useEffect, useRef } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';


import HomePage from './pages/HomePage/homepage.component';
import ShopPage from './pages/ShopPage/shop.component';
import Header from './components/header/header.component.jsx';

import SignInAndSignUpPage from './pages/SignInAndSignUpPage/sign-in-and-sign-up.component';
import CheckoutPage from './pages/CheckoutPage/checkout.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

function App(props) {
  // firebase related
  const unsubscribeFromAuth = useRef(null);

  useEffect(() => {
    const { setCurrentUser } = props;
    // firebase related
    unsubscribeFromAuth.current = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      } 
      setCurrentUser(userAuth);
    })

    // return value equates to componentWillUnmount()
    return () => unsubscribeFromAuth.current = null
  });

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route 
          path='/signin' 
          render={() => props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)}
        />
      </Switch>
    </div>
  );
};

// brings in state as props from redux store 
const mapStateToProps = createStructuredSelector({ 
  currentUser: selectCurrentUser,
});

// sends out a dispatch to set the current user 
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
