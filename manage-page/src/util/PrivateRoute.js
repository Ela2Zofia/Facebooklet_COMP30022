import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PrivateRoute = ({component: Component, ...rest}) => {
  
 const user = useSelector(state => state.user)
  return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            user ?
                <Component />
            : <Redirect to="/test" />
        )} />
    );
};

export default PrivateRoute;