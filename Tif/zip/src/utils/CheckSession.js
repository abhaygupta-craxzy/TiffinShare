export const checkSession = () => {
  const loginTime = localStorage.getItem("loginTime");

  if (!loginTime) return false;

  const now = Date.now();
  const diff = now - loginTime;

  const ONE_HOUR = 60 * 60 * 1000;

  if (diff > ONE_HOUR) {
    localStorage.removeItem("token");
    localStorage.removeItem("loginTime");
    return false;
  }

  return true;
};