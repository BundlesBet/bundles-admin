// Required URLs
export const urls = {
  admin: "/admin",
  connectWallet: "/",
  dashboard: "/dashboard",
};

export const api = async (AxiosObj: object) => {
  try {
    const data = await AxiosObj;
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};
