import { Buffer } from 'Buffer';
import axios from 'axios';
export const urlBase = "https://api.repuestosangel.net/api/";
export const urlBaseAsset = "https://api.repuestosangel.net/";
export function http(){
    let token = "";
    if(localStorage.getItem('token') != null){
        //console.log(localStorage.getItem('token'));
        token = Buffer.from(localStorage.getItem('token'),'base64').toString('ascii');
        //console.log(token);
    }
    const interceptor = axios.create({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        }, 
        timeout: 15000
    });
    axios.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, function (error) {
        console.log(error);
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        if(error.response.status==401){
            localStorage.clear();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    });
    return interceptor;
}
export function httpAsset(){
    let token = "";
    if(localStorage.getItem('token') != null){
        //console.log(localStorage.getItem('token'));
        token = Buffer.from(localStorage.getItem('token'),'base64').toString('ascii');
        //console.log(token);
    }
    const interceptor = axios.create({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer '+token
        }, 
        timeout: 15000
    });
    axios.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, function (error) {
        console.log(error);
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        if(error.response.status==401){
            localStorage.clear();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    });
    return interceptor;
}