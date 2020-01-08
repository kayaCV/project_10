import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext();

export class Provider extends Component {

    state = {
        authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
        authUserPassword: Cookies.getJSON('userPassword') || null 
    };

    constructor() {
        super();
        this.data = new Data();
    }


    render() {
        const { authenticatedUser, authUserPassword } = this.state;
        const value = {
          authenticatedUser,
          authUserPassword,
          data: this.data,
          actions: {
            signIn: this.signIn,
            signOut: this.signOut
          },
        };
        return (
            <Context.Provider value={value}>
              {this.props.children}
            </Context.Provider>  
          );
    }



    signIn = async (emailAddress, password) => {
        const user = await this.data.getUser(emailAddress, password);
        console.log(this.state.authenticatedUser, "before if");
        if (user !== null) {
          console.log(this.state.authenticatedUser, "before setstate")
          this.setState(() => {
            return {
              authenticatedUser: user,
              authUserPassword: password 
            };
          }); 
       
          console.log(this.state.authenticatedUser, "after this.setstate");
          Cookies.set('authUserPassword', JSON.stringify(password), {expires: 1});
          Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1});
        }
        return user;
    }

    signOut = () => {
        this.setState({ 
          authenticatedUser: null,
          authUserPassword: null  
        });
        Cookies.remove('authenticatedUser');
        Cookies.remove('authUserPassword'); 
    }




}
export const Consumer = Context.Consumer;


export default function withContext(Component) {
    return function ContextComponent(props) {
      return (
        <Context.Consumer>
          {context => <Component {...props} context={context} />}
        </Context.Consumer>
      );
    }
  }