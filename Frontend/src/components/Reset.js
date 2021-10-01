import React from "react";
import { Link, Redirect } from "react-router-dom";
import PubSub from 'pubsub-js'

class Reset extends React.Component {
    state = {
        email: '',
        code:'',
        password1: '',
        password2: '',
        isSuccess: false

    }

    componentDidMount() {
        this.token = PubSub.subscribe("email sent", (_,stateObj)=>{
            this.setState(stateObj)
        })
    }

    componentWillUnmount(){
        PubSub.unsubscribe(this.token)
    }


    saveCode = ( event ) => {
        this.setState( { code: event.target.value } );
    }

    savePassword1 = ( event ) => {
        this.setState( { password1: event.target.value } );
    }

    savePassword2 = ( event ) => {
        this.setState( { password2: event.target.value } );
    }


    validate = ( code, password1, password2 ) => {
        if ( code === '' ) {
            alert( "Please enter your verification code" );
        } else if ( code === '1' ) {
            alert( "Please enter your email" );
        } else if ( password1 === '' ) {
            alert( "Please enter your password" );
        } else if ( password1.length < 6 || password1.length > 20 ) {
            alert( "Use 6-20 characters for your password" )
        } else if ( password2 !== password1 ) {
            alert( "Those passwords didn’t match. Try again." );
        } else {
            return true;
        }
        return false;
    }

    handleSubmit = ( event ) => {
        event.preventDefault();
        let {email, code, password1, password2 } = this.state;
        if ( this.validate( code, password1, password2 ) ) {
            fetch("/api/reset", {
                    method: 'POST',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify( {  email: email, code: code, password: password1 } ),
                }
            ).then( response => {
                return response.json();
            } ).then( response => {
                if ( response.isCorrect ) {
                    alert( "Reset success" );
                    this.setState( { isSuccess: true } )
                }
                else {
                    alert( "The verification code is wrong" );
                }
            } );
        }

    }

    render() {

        if ( this.state.isSuccess ) {
            return <Redirect to="/login" />
        }
        else {
            return (
                <div className="formContainerWrap">
                    <div id="formContainer" className="dwo">
                        <div className="formRight">
                            <form id="reset" onSubmit={ this.handleSubmit } >
                                <header>
                                    <h1>Reset Password</h1>
                                </header>

                                <section>

                                    <label>
                                        <p>Verification Code</p>
                                        <input onChange={ this.saveCode } type="text" name="Code" placeholder=" " />
                                        <div className="border"></div>
                                    </label>

                                    <label>
                                        <p>Password</p>
                                        <input onChange={ this.savePassword1 } type="password" name="Password" placeholder=" " />
                                        <div className="border"></div>
                                    </label>

                                    <label>
                                        <p>Comfirm Password</p>
                                        <input onChange={ this.savePassword2 } type="password" name="Confirm_Password" placeholder=" " />
                                        <div className="border"></div>
                                    </label>
                                    <button type="submit">Submit</button>
                                </section>

                                <footer>
                                    <Link className="router" to="/login">Back</Link>
                                </footer>
                            </form>
                        </div>
                    </div>
                </div>

            )
        }
    }
}

export default Reset