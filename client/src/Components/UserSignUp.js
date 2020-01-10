import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';


export default class UserSignUp extends Component {

    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        errors: [],
    }

    render() {
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
            errors,
        } = this.state;

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>
                        <Form
                            cancel={this.cancel}
                            errors={errors}
                            submit={this.submit}
                            submitButtonText="Sign Up"
                            elements={() => (
                                <React.Fragment>
                                 <div>
                                    <input 
                                    id="firstName" 
                                    name="firstName" 
                                    type="text"
                                    value={firstName} 
                                    onChange={this.change} 
                                    placeholder="First Name" />
                                 </div>
                                 <div>
                                    <input 
                                    id="lastName" 
                                    name="lastName" 
                                    type="text"
                                    value={lastName} 
                                    onChange={this.change} 
                                    placeholder="Last Name" />
                                 </div>
                                 <div>
                                    <input 
                                    id="emailAddress" 
                                    name="emailAddress" 
                                    type="text"
                                    value={emailAddress} 
                                    onChange={this.change} 
                                    placeholder="Email Address" />
                                 </div>
                                 <div>
                                    <input 
                                    id="password" 
                                    name="password"
                                    type="password"
                                    value={password} 
                                    onChange={this.change} 
                                    placeholder="Password" />
                                 </div>
                                 <div>
                                    <input 
                                    id="confirmPassword" 
                                    name="confirmPassword"
                                    type="confirmPassword"
                                    value={confirmPassword} 
                                    onChange={this.change} 
                                    placeholder="Confirm Password" />
                                 </div>
                                </React.Fragment>
                                )} />
                            </div>
                    <p>&nbsp;</p>
                    <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
                </div>
            </div>
        );
    }


  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { context } = this.props;
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
    } = this.state;

    // Create user
    const user = {
        firstName,
        lastName,
        emailAddress,
        password,
    };

    if(password === confirmPassword) {
        context.data.createUser(user)
        .then( errors => {
          if (errors.length) {
            this.setState({ errors });
            console.log(errors)
          } else {
              console.log("logged on!!");
            context.actions.signIn(emailAddress, password)
              .then(() => {
                this.props.history.push('/');    
              });
          }
        })
        .catch((err) => {
          console.log(err);
          this.props.history.push('/error');
        });
    } else {
        console.log("Passcode didn't match");
    }
  
  }

  cancel = () => {
   this.props.history.push('/');
  }
}



















// import React, { Component } from 'react';


// class UserSignUp extends Component {

//     state = {
//         name: '',
//         username: '',
//         password: '',
//         errors: [],
//     }

//     render() {
//         const {
//             name,
//             username,
//             password,
//             errors,
//         } = this.state;
        
//         return (
//             <div className="bounds">
//                 <div className="grid-33 centered signin">
//                     <h1>Sign Up</h1>
//                     <div>
//                         <form>
//                             <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" value=""></input></div>
//                             <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" value=""></input></div>
//                             <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value=""></input></div>
//                             <div><input id="password" name="password" type="password" className="" placeholder="Password" value=""></input></div>
//                             <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" value=""></input></div>
//                             <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><button className="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button></div>
//                         </form>
//                     </div>
//                     <p>&nbsp;</p>
//                     <p>Already have a user account? <a href="sign-in.html">Click here</a> to sign in!</p>
//                 </div>
//             </div>
//         )
//     }
// }

// export default UserSignUp;  