import React, { Component } from 'react';


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
        console.log(responseData)
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
        console.log(course);
        // const id = this.props.match.params.id;   

        const user = course.user;
        let materials;
        if(course.materialsNeeded) {
            console.log(course.materialsNeeded)
            let materialsList = course.materialsNeeded.split('*').filter(liItem=>liItem!=='');
            materials = materialsList.map( material => <li key={materialsList.indexOf(material)}>{material}</li>);
            console.log(materials)
        } //else {

    // }

    return (
        <div>
            <div className="actions--bar">
                <div className="bounds">
                    <div className="grid-100"><span><a className="button" href={`/courses/${this.props.match.params.id}/update`}>Update Course</a><a className="button" onClick={this.deleteCourse} href="*">Delete Course</a></span><a className="button button-secondary" href="/">Return to List</a></div>
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
                        <p>{course.description}</p>
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
                                    {materials}
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
        const {id} = this.props.context.match.params;
        const {emailAddress, password} = this.props.context.authenticatedUser;

        this.props.context.data.courseDelete(id, {emailAddress, password})//, this.state.user.emailAddress, this.state.user.password)
            .then(errors => {
                if(errors.length) {
                    console.log(errors);
                    this.setState({errors})
                } else {
                    // this.props.history.push('/');
                    console.log("no errors");
                }
            })
            .catch(err => {
                console.log(err);
            })
        

        // const {context} = this.props;
        // context.data.courseDelete(context.match.params.id, context.authenticatedUser.emailAddress, context.authenticatedUser.password)
        //     .then(errors => {
        //         if(errors.length) {
        //             console.log(errors);
        //             this.setState({errors})
        //         } else {
        //             // this.props.history.push('/');
        //             console.log("no errors");
        //         }
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
    }





};

