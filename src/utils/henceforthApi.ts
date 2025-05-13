// import { workload } from '@/assets/images/workload.png';
import { GlobalContext } from "@/context/Provider";
import React from "react";
import _superagent, { search } from "superagent";
const SuperagentPromise = require("superagent-promise");
const superagent = SuperagentPromise(_superagent, global.Promise);

// export const API_ROOT = "https://staging.techraize.com:3001/";
// export const BUCKET_ROOT = "https://raizestag.blob.core.windows.net";


export const API_ROOT = "https://goodcitizennestjs-1.onrender.com/";
export const BUCKET_ROOT = "https://raizeprod.blob.core.windows.net";

const API_FILE_ROOT_MEDIUM = `${BUCKET_ROOT}/medium/`;
const API_FILE_ROOT_ORIGINAL = `${BUCKET_ROOT}/original/`;
const API_FILE_ROOT_SMALL = `${BUCKET_ROOT}/small/`;
const API_FILE_ROOT_AUDIO = `${BUCKET_ROOT}/audio/`;
const API_FILE_ROOT_VIDEO = `${BUCKET_ROOT}/video/`;
const API_FILE_ROOT_DOCUMENTS = `${BUCKET_ROOT}/documents/`;
const API_FILE_ROOT_DB_BACKUP = `${BUCKET_ROOT}/backup/`;
const API_FILE_ROOT_DOCS = `${BUCKET_ROOT}/docs/`;

const encode = encodeURIComponent;
const responseBody = (res: any) => res.body;

let token: any = null;
const tokenPlugin = (req: any) => {
  if (token) {
    req.set("Authorization", `Bearer ${token}`);
  }
};

const requests = {
  del: (url: string) =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  delMultiple: (url: string, body: any) =>
    superagent
      .del(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  get: (url: string) =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url: string, body: any) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  patch: (url: string, body: any) =>
    superagent
      .patch(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  post: (url: string, body: any) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  file: (url: string, key: string, file: any) =>
    superagent
      .post(`${API_ROOT}${url}`)
      .attach(key, file)
      .use(tokenPlugin)
      .then(responseBody),
};
const SuperAdmin = {
  login: (info: any) => requests.post("admin/login", info),
  setupCompProfile: (info: any) => requests.post("admin/company", info),
};

const Users = {
  list: (q?: any) => requests.get(`admin/usersList${q ? `?${q}` : ""}`),
  details: (id: any) => requests.get(`admin/user/detail/${id}`),
};
const Drivers = {
  list: (q?: any) => requests.get(`admin/driverList${q ? `?${q}` : ""}`),
  details: (id:string,q?: any) => requests.get(`admin/driver-ride/List/${id}${q ? `?${q}` : ""}`),
};
const Auth = {
  login: (info: any) => requests.post("user/login", info),
  signUp: (info: any) => requests.post("user/signUp", info),
  socialLogin: (info: any) => requests.post("login", info),
  addDoc: (info: any) => requests.post("user/ids", info),
  editDoc: (id: string, info: any) => requests.put(`user/ids/${id}`, info),
  getDoc: () => requests.get(`user/ids`),
  checkEmail: (value: string) =>
    requests.get(`user/email/exist?email=${value}`),
  delDoc: (id: string) => requests.del(`user/ids/${id}`),
  logout: () => requests.put("user/logout", {}),
  changePassword: (info: any) => requests.put("user/change/password", info),
  profile: () => requests.get(`user/profile`),
  forgotPassword: (value: any) => requests.put("user/forget/password", value),
  resendOtp: (value: any) => requests.post("user/resend/email/otp", value),
  resendOtpPhone: (value: any) => requests.put("user/resend/phone/otp", value),
  verifyOtp: (info: any) => requests.post("user/otp/verify", info),
  verifyEmail: (info: any) => requests.post("user/verify/email", info),
  verifyPhone: (info: any) => requests.post("user/verify/phone", info),
  resetPassword: (info: any) => requests.put("user/reset/password", info),
  edit: (info: any) => requests.put("user/profile", info),
};

const Common = {
  uploadFile: (key: string, file: any) =>
    requests.file(`uploads/file`, key, file),
  uploadFileMultiple: (key: string, file: any) =>
    requests.file(`Upload/do_spaces_file_upload_multiple`, key, file),
  dbBackup: () => requests.post(`admin/db/backup`, {}),
  listing: (q?: string) => requests.get(`user/homepage${q ? "?" + q : ""}`),
};

const FILES = {
  audio: (filename: string) =>
    filename?.startsWith("http")
      ? filename
      : `${API_FILE_ROOT_AUDIO}${filename}`,
  video: (filename: string) =>
    filename?.startsWith("http")
      ? filename
      : `${API_FILE_ROOT_VIDEO}${filename}`,
  imageOriginal: (filename: string, alt: any) =>
    filename
      ? filename?.startsWith("http")
        ? filename
        : `${API_FILE_ROOT_ORIGINAL}${filename}`
      : alt,
  imageMedium: (filename: string, alt: any) =>
    filename
      ? filename?.startsWith("http")
        ? filename
        : `${API_FILE_ROOT_MEDIUM}${filename}`
      : alt,
  imageSmall: (filename: string, alt?: any) =>
    filename
      ? filename?.startsWith("http")
        ? filename
        : `${API_FILE_ROOT_SMALL}${filename}`
      : alt,
};

const henceforthApi = {
  Auth,
  Users,
  Drivers,
  API_ROOT,
  API_FILE_ROOT_DB_BACKUP,
  API_FILE_ROOT_SMALL,
  API_FILE_ROOT_MEDIUM,
  API_FILE_ROOT_DOCS,
  API_FILE_ROOT_ORIGINAL,
  API_FILE_ROOT_VIDEO,
  API_FILE_ROOT_DOCUMENTS,
  SuperAdmin,
  Common,
  BUCKET_ROOT,
  FILES,
  token,
  encode,
  setToken: (_token?: string) => {
    token = _token;
  },
};

export default henceforthApi;
