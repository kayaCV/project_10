import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';


export default class CourseDetail extends Component {

    constructor() {
        super();
        this.state = {
          course: {
              user:{
              }
          },
        }
    }

  fetchCourse = () => {
    this.props.context.data.getSingleCourse(this.props.match.params.id)
      .then(responseData => {
        this.setState({ course: responseData})
      })
      .catch(err => {
        console.log('Error fetching and parsing data')
      })
  }

  componentDidMount() {
      this.fetchCourse();
  }


    render() {
        const {course} = this.state;
    
        const user = course.user;

// add rendering logic so that the "Update Course" and "Delete Course" buttons only display if: 
// There's an authenticated user.
// And the authenticated user's ID matches that of the user who owns the course.


    return (
        <div>
            <div className="actions--bar">
                <div className="bounds">
                    <div className="grid-100">
                      {
                        this.props.context.authenticatedUser && this.props.context.authenticatedUser.id === this.state.course.user.id ?
                        <React.Fragment>
                            <span>
                                <Link className="button" to={`/courses/${this.props.match.params.id}/update`}>Update Course</Link>
                                <Link className="button" onClick={() => this.props.context.data.courseDelete(this.props.match.params.id, this.props.context.authenticatedUser.emailAddress, this.props.context.authUserPassword).then( () => this.props.history.push('/'))} to="#">Delete Course</Link>
                            </span>
                        </React.Fragment> : <React.Fragment></React.Fragment>
                      }
                        
                        <Link className="button button-secondary" to="/">Return to List</Link>
                    </div>
                </div>
            </div>
            <div className="bounds course--detail">
                <div className="grid-66">
                    <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <h3 className="course--title">{course.title}</h3>
                        <p>By {user.firstName} {user.lastName}</p>
                    </div>
                    <div className="course--description">
                        <ReactMarkdown source={course.description} />
                    </div>
                </div>
                <div className="grid-25 grid-right">
                    <div className="course--stats">
                        <ul className="course--stats--list">
                            <li className="course--stats--list--item">
                                <h4>Estimated Time</h4>
                                <h3>{course.estimatedTime}</h3>
                            </li>
                            <li className="course--stats--list--item">
                                <h4>Materials Needed</h4>
                                <ul>
                                    <ReactMarkdown source={course.materialsNeeded} />
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      )
    }

    deleteCourse() {
        this.props.context.data
            .courseDelete(this.props.match.params.id, this.props.context.authenticatedUser.emailAddress, this.props.context.authUserPassword)
            .then( () => this.props.history.push('/'))
    }
};

