import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export function isTokenValid() {
  const token = Cookies.get('jwt_token');
  // console.log(token)
  if (!token) {
    return false;
  }

  try {
    const decoded = jwtDecode(token); // Use jwtDecode directly
    const currentTime = Date.now() / 1000;
    // console.log("currentTime",decoded.exp,currentTime)
    return decoded.exp > currentTime;
  } catch (error) {
    console.error('Invalid token:', error);
    return false;
  }
}

export function signOut() {
  Cookies.remove('jwt_token');
}
