import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({component: Component, restricted,...rest}) => {
  
  return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /login page
        <Route {...rest} render={props => (
            restricted ?
                <Component />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;