import axios from "axios";
import qs from "qs";
import config from "../../config/config.js";
import { Toast } from "vant";

// interface

var URI = config.apiDomain;

var ax = axios.create({
  baseURL: URI,
  timeout: 20000,
  headers: {
    // 'Content-Type': 'multipart/form-data' // 文件上传
    // 'Content-Type':'application/x-www-form-urlencoded',
    // 'TOKEN': ''
  }
});

export var itr = (type, url, params) => {
  if (typeof params !== "object") {
    params = {};
  }
  let arg = qs.stringify(params);
  return ax[type](url, arg);
};

var file = axios.create({
  baseURL: URI,
  timeout: 20000,
  headers: {
    "Content-Type": "multipart/form-data" // 文件上传
  }
});

export var fileitr = (type, url, params) => {
  if (typeof params !== "object") {
    params = {};
  }
  // let arg = qs.stringify(params)
  return file[type](url, params);
};

// Ajax API start
export const g = (url, params) => {
  return base("get", url, params);
};

export const p = (url, params, mask, clear, silent) => {
  return base("post", url, params, mask, clear, silent);
};

export const d = (url, params) => {
  return base("delete", url, params);
};

export const u = (url, params) => {
  return base("put", url, params);
};
export const pa = (url, params) => {
  return base("patch", url, params);
};

export const op = (url, params) => {
  return base("options", url, params);
};
// Ajax API end
// file Ajax API start
export const filepost = (url, params, mask, clear, silent) => {
  return filebase("post", url, params, mask, clear, silent);
};
// file Ajax API end

export function base(
  type,
  url,
  params,
  mask = false,
  clear = true,
  silent = false
) {
  return new Promise((resolve, reject) => {
    // Toast.allowMultiple()
    const toast1 = Toast.loading({
      mask: mask,
      message: "加载中...",
      duration: 20000
    });
    itr(type, url, params)
      .then(response => {
        // toast1.clear()
        if (clear) {
          toast1.clear();
        }
        // console.log(response.data.status)
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(response.data);
        }
      })
      .catch(msg => {
        if (!msg.response) {
          Toast({
            // message: '设备通讯失败',
            message: "服务器连接超时",
            duration: 10000
          });
          resolve("err");
        } else {
          Toast({
            message: msg.response.status + ":" + msg.response.statusText,
            duration: 10000
          });
        }
        reject(msg.message);
      });
  });
}

export function filebase(
  type,
  url,
  params,
  mask = false,
  clear = true,
  silent = false
) {
  return new Promise((resolve, reject) => {
    // Toast.allowMultiple()
    const toast1 = Toast.loading({
      mask: mask,
      message: "加载中...",
      duration: 20000
    });
    fileitr(type, url, params)
      .then(response => {
        // toast1.clear()
        if (clear) {
          toast1.clear();
        }
        // console.log(response.data.status)
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(response.data);
        }
      })
      .catch(msg => {
        if (!msg.response) {
          Toast({
            // message: '设备通讯失败',
            message: "服务器连接超时",
            duration: 10000
          });
          resolve("err");
        } else {
          Toast({
            message: msg.response.status + ":" + msg.response.statusText,
            duration: 10000
          });
        }
        reject(msg.message);
      });
  });
}
