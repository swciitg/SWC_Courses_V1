import axios from "axios";


const BASEAPI = "http://localhost:8080/courses/api";;

const API = axios.create({
    baseURL: `${BASEAPI}`,
    withCredentials: true,
});

// TODO: Change login user endpoint

export const loginUser = () => API.get("/auth/azureadoauth2/callback");
export const fetchUser = () => API.get("/current_user");


// USER ROUTES

export const getCoursesTakenByUser = (id) => API.get(`/users/coursestaken/${id}`);
export const getCoursesTeachByUser = (id) => API.get(`/users/coursesteach/${id}`);

//COURSES ROUTES


export const getAllCourses = () => API.get("/courses/");
export const getCoursesBySearch = () => API.get("/courses/search"); //by searching
export const getCoursesByBranch = (branch) => API.get("/courses/"+branch); // courses of specific branch
export const getCoursesByTopic = (topic) => API.get("/courses/topic/"+topic); // courses of specific topic
export const getCourseById = (id) => API.get("/courses/"+id); // courses by id
export const getSubscribersById = (id) => API.get(`/courses/${id}/subscribers`); // subscribers of course by id

export const postEnrol = (id,data) => API.post(`/courses/${id}/enrol`,data); 
export const postCourse = (newForm) => API.post("/courses/postcourse", newForm);
export const postSubtopic = (id,data) => API.post(`/courses/${id}/addsubtopics`,data);
export const addresource = (id,data) => API.post(`/courses/${id}/addresources`,data);

export const updateCourse = (id, updatedForm) => API.put(`/courses/${id}/updatecourse`, updatedForm);
export const updateSubtopic = (id, updatedForm) => API.put(`/courses/${id}/updatesubtopics`, updatedForm);


export const deleteCourse = (id) => API.delete(`/courses/${id}/deletecourse`);
export const deletesubtopic = (id) => API.delete(`/courses/${id}/deletesubtopics`);
export const deleteresource = (id) => API.delete(`/courses/${id}/deleteresources`);



// VIDEO ROUTES

// export const getCourseVideos = (id) => API.get(`/video/${id}/video`);

// export const postVideo = (id,data) => API.post(`/video/${id}/`,data); 
