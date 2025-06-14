import { type CorsOptions } from "cors";

const _whiteList = ["*"];

export const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    console.log(origin)
    if (origin) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
};
