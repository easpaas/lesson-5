import React, { useEffect, useRef } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';


import HomePage from './pages/home/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component.jsx';

import SignInAndSignUpPage from './pages/signinsignup/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { selectCollectionsForPreview } from './redux/shop/shop.selectors';

function App(props) {
  // firebase related
  const unsubscribeFromAuth = useRef(null);

  useEffect(() => {
    const { setCurrentUser, collectionsArray } = props;
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
      addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({ title, items })));
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
  collectionsArray: selectCollectionsForPreview
});

// sends out a dispatch to set the current user 
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
