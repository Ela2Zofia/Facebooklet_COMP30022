import { Route, Redirect } from 'react-router-dom';


const PublicRoute = ({component: Component, restricted,...rest}) => {
  
  return (

        // Restrict access if there exist a user
        // to prevent multiuser chaos
        <Route {...rest} render={props => (
            restricted ?
                <Component />
            : <Redirect to="/home" />
        )} />
    );
};

export default PublicRoute;