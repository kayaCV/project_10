
import React, {Component} from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import './styles/global.css';
// import Course from './Components/Course'
import Header from './Components/Header';
import Courses from './Components/Courses';
// import CourseDetail from './Components/CourseDetail';
import CreateCourse from './Components/CreateCourse';
import UpdateCourse from './Components/UpdateCourse';
import UserSignIn from './Components/UserSignIn';
import UserSignUp from './Components/UserSignUp';
// import UserSignOut from './Components/UserSignOut';
import NotFound from './Components/NotFound';



export default class App extends Component {
  constructor() {
    super();
    this.state = {
      courses: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/courses')
      .then(response => response.json())
      .then(responseData => {
        this.setState({ courses: responseData})
        console.log(responseData)
      })
      .catch(err => {
        console.log('Error fetching and parsing data')
      })
  }
  
  render() {

    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" render={ () => <Redirect to={`/courses`} />} />
            <Route exact path="/courses" render={ (props) => <Courses {...props} coursesList={this.state.courses} />} />
            <Route path="/courses/create" component={CreateCourse} />
            <Route path="/courses/:id/update" component={UpdateCourse} />
            {/* <Route path="//courses/:id" component={CourseDetail} /> */}
            <Route path="/signin" component={UserSignIn} />
            <Route path="/signup" component={UserSignUp} />
            {/* <Route path="/signout" component={UserSignOut} /> */}
            <Route component={NotFound} />
          </Switch>
          {/* <Courses courses={this.state.courses}/> */}
          {/* <CourseDetail /> */}
          {/* <UpdateCourse /> */}
          {/* <CreateCourse /> */}
          {/* <UserSignIn />
          <UserSignUp /> */}
        </div>
      </BrowserRouter>
    );
  }
  
}

// export default App;
