const TokenAuthentication = async () => {
  const response = await fetch("http://localhost:5000/auth/", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
    },
  });
  const result = await response.json();

  return result.code === 200 ? result : { code: 0 };
};

export default TokenAuthentication;
