import Cookies from "js-cookie";
export const COOKIE_CONFIG = {
  accessToken: "accessToken",
  accessTokenExpiryDuration: 24, //duration in hours

  refreshToken: "refreshToken",
  refreshTokenExpiryDuration: 3 * 24, //duration in hours
};
export const setCookie = ({
  cookieName,
  value,
  expiresIn,
}: {
  cookieName: string;
  value: string;
  expiresIn?: number;
}) => {
  Cookies.set(cookieName, value, { expires: expiresIn });
};

export const removeCookie = (cookieName: string) => Cookies.remove(cookieName);

export const getCookie = (cookieName: string) => Cookies.get(cookieName);

export const clearAllCookies = () => {
  removeCookie(COOKIE_CONFIG.accessToken);
  removeCookie(COOKIE_CONFIG.refreshToken);
};
