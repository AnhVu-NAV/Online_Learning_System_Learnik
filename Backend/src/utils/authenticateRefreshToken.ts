import jwt from 'jsonwebtoken';
import config from '../config/config';

const authenticateRefreshToken = (refreshToken: string) => {
  return jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET);
};

export default authenticateRefreshToken