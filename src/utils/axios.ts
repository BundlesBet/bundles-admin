import Axios from "axios";

const axios = Axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.NEXT_PUBLIC_PROD_BASE_URL}/${process.env.NEXT_PUBLIC_VERSION}`
      : `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_VERSION}`,
});

export default axios;
