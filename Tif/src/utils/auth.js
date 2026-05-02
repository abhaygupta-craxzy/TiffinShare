export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("loginTime");
  window.location.href = "/login";
};