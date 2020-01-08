
import React, {Component} from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  // Redirect
} from 'react-router-dom';
import './styles/global.css';
// import Course from './Components/Course'
import Header from './Components/Header';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import CreateCourse from './Components/CreateCourse';
import UpdateCourse from './Components/UpdateCourse';
import UserSignIn from './Components/UserSignIn';
import UserSignUp from './Components/UserSignUp';
import UserSignOut from './Components/UserSignOut';
import NotFound from './Components/NotFound';
import Authenticated from './Components/Authenticated';

import withContext from './Context';
import PrivateRoute from './PrivateRoute';

const UserSignUpWithContext = withContext(UserSignUp);
const AuthWithContext = withContext(Authenticated);
const UserSignInWithContext = withContext(UserSignIn);
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UserSignOutWithContext = withContext(UserSignOut);


export default class App extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     courses: [],
  //   }
  // }

  // fetchCourses = (query) => {
  //   this.setState({
  //     loading: true
  //   })
  //   let url = `http://localhost:5000/api/${query}`;
  //   fetch(url)
  //     .then(response => response.json())
  //     .then(responseData => {
  //       this.setState({ courses: responseData})
  //       console.log(responseData)
  //     })
  //     .catch(err => {
  //       console.log('Error fetching and parsing data')
  //     })
  // }

  componentDidMount() {
    // let path = window.location.pathname;
    // console.log(path)

    // if(path === "/") {
    //   this.fetchCourses('courses');
    //   console.log("/ path")
    // } else if(path.startsWith("/courses/")) {
    //   this.fetchCourses('courses/' + path.slice(9));
    //   console.log("courses path")
    // }

    // this.setState({
    //   loading: false
    // })
  }
  
  render() {

    return (
      <BrowserRouter>
        <div>
          <HeaderWithContext />


                 


          <Switch>
            {/* <Route exact path="/courses" render={ () => <Redirect to={`/`} />} /> */}
            <Route exact path="/" component={CoursesWithContext} />} />
            <PrivateRoute path="/authenticated" component={AuthWithContext} />
            <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
            <Route path="/courses/:id/update" component={UpdateCourse} />
            <Route exact path="/courses/:id" component={CourseDetailWithContext} /> } />
            <Route path="/signin" component={UserSignInWithContext} />
            <Route path="/signup" component={UserSignUpWithContext} />
            <Route path="/signout" component={UserSignOutWithContext} />
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


