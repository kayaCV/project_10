 import React, { Component } from 'react';
 import Form from './Form';

 export default class UpdateCourse extends Component {

  state = {
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '',
      errors: [],
  }

  fetchCourse = () => {
    this.props.context.data.getSingleCourse(this.props.match.params.id)
      .then(responseData => {
        const {title, description,estimatetime, materialsNeeded} = responseData;
        this.setState({ 
          title,
          description,
          estimatetime, 
          materialsNeeded,
          firstName: responseData.user.firstName,
          lastName: responseData.user.lastName
        })
      })
      .catch(err => {
        console.log('Error fetching and parsing data')
      })
  }
  
  componentDidMount() {
    this.fetchCourse();
}



  render() {
    // const { context } = this.props;
    const {
        title, 
        description,
        estimatedTime, 
        materialsNeeded,
        firstName,
        lastName,
        errors,
      } = this.state;
      


    return (
        <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Update Course"
            elements={() => (
              <React.Fragment>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                  <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." value={title} onChange={this.change}></input>
                </div>
                <p>By {firstName} {lastName}</p>
              </div>
              <div className="course--description">
                <div><textarea id="description" name="description" className="" placeholder="Course description..."  value={description}  onChange={this.change}></textarea></div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" value={estimatedTime}  onChange={this.change}></input></div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value={materialsNeeded || ''} onChange={this.change}></textarea></div>
                  </li>
                </ul>
              </div>
            </div>

              </React.Fragment>
            )} />
        </div>
      </div>
    )
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
      title,
      description,
      estimatedTime,
      materialsNeeded,
  } = this.state;
  const {emailAddress} = context.authenticatedUser;
  const password = context.authUserPassword;

  // Create course
  const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
  };
  const {id} = this.props.match.params;

  context.data.updateCourses(id,course, emailAddress, password)
    .then( errors => {
      if (errors.length) {       
        this.setState({ errors });
      } else {
          this.props.history.push(`/courses/${id}`);        
      }
    })
    .catch((err) => {
      console.log(err);
      this.props.history.push('/error');
    });

}
  cancel = () => {
    this.props.history.push(`/courses/${this.props.match.params.id}`);
  }

}

