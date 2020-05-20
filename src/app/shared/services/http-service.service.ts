import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import axios from 'axios';
import Qs from 'qs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(public http: HttpClient) { }
  //axios方法
  commonUrl='http://localhost:8080';
  // commonUrl="http://edatyp.natappfree.cc";
  //获取
  get(api, params) {
    return new Promise((resolve, reject) => {
      axios.get(this.commonUrl+api, {
        params: params,
    }).then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          })
    })
}
  //获取（不携带参数）
  getAll(api) {
    return new Promise((resolve, reject) => {
      axios({
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'get',
        url: this.commonUrl+api
    }).then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        })
    })
  }
  //新增
  post(api, params) {
    return new Promise((resolve, reject) => {
      axios({
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        url: this.commonUrl+api,
        data: params
    }).then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
    })
  }
  //编辑
  patch(api, params) {
    return new Promise((resolve, reject) => {
      axios({
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'patch',
        url: this.commonUrl+api,
        data: params
    }).then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
    })
  }
//   //删除
  delete(api, params) {
      return new Promise((resolve, reject) => {
        axios({
          headers: {
            'Content-Type': 'application/json'
        },
          method: 'delete',
          url: this.commonUrl+api,
          data: params
      }).then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          })
      })
  }
  
}
