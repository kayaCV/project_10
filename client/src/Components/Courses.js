import React, { Component } from 'react';
import Course from './Course'


class Courses extends Component {
    render() {
    const courses = this.props.coursesList;
    console.log(this.props.coursesList);
    let allCourses = courses.map(course => 
      <Course 
        id={ course.id } 
        title={course.title}
        description={ course.description}
        estimateTime={ course.estimateTime}
        key={course.id}
      />
  );
    return(


        <div className="bounds">
                {allCourses}
                <div className="grid-33"><a className="course--module course--add--module" href="create-course.html">
                <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>New Course</h3>
          </a></div>
        </div>
    
    )

}
    
};

export default Courses;        
