import config from './config';


export default class Data {

    
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {    
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  //method to get list of courses
  async getCourses() {
      const response =  await this.api(`/courses`, 'GET');
      if (response.status === 200) {
        return response.json().then(data => data);
      } else {
        throw new Error();
      }
  }

  // method to get single course
  async getSingleCourse(id) {
    const response =  await this.api(`/courses/${id}`, 'GET');
    if (response.status === 200) {
      return response.json().then(data => data);
    } else {
      throw new Error();
    }
  }
  
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    console.log(user)
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }


  //method to create course
  async createCourse(course, emailAddress, password) {
    const response = await this.api('/courses/', 'POST', course, true, {emailAddress, password});
  
    if (response.status === 201) { 
      console.log(response);
      return [];
    } else if (response.status === 400) {
      console.log(response); 
      return response.json(); 
    } else if (response.status === 401) {
      console.log(response);
      return response.json().then(data => {
        return data;//.errors;
      });
    } else if (response.status === 200) {
      console.log(response); 
    } else {
      console.log(response);
      console.log(response.status);
      throw new Error();
    }
  }

  //method to delete course
  async courseDelete(id, emailAddress, password) {
  
      const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {emailAddress, password})
      if (response.status === 204) { 
            console.log(response.status);
            return [];
      } else {
            console.log(response.status);
            throw new Error();
      }
 


  //   console.log(id);
  //   const response = await this.api(`/courses/${id}`, 'DELETE', null, true,  {emailAddress, password});  // {emailAddress,password}
  //   if (response.status === 204) { 
  //     console.log(response.status);
  //     return [];
  //   } else {
  //     console.log(response.status);
  //     throw new Error();
  //   }
  }
}


