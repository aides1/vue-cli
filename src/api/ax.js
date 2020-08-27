import * as ax from "./instrance";
import config from "../../config/config.js";
var URL = config.apiUrl;
// 获取公众号相关信息
export const getMovieList = params => {
  return ax.g(URL + "/getMovieList", params);
};
