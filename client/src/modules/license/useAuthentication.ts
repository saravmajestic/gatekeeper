const useAuthentication = () => {
  const startAuthentication = (
    productId: string,
    deviceId: string,
    accountId: string
  ) => {
    return fetch(`${process.env.REACT_APP_API_URL}authenticate/start`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ productId, deviceId, accountId }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  };
  const authenticate = (
    productId: string,
    deviceId: string,
    accountId: string,
    token: string,
    jobId: string
  ) => {
    return fetch(`${process.env.REACT_APP_API_URL}authenticate/index`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ productId, deviceId, accountId, token, jobId }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  };
  return { authenticate, startAuthentication };
};

export default useAuthentication;
