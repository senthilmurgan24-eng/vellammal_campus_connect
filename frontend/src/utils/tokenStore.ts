let memoryAccessToken: string | null = null;
let memoryRefreshToken: string | null = null;

const ACCESS_KEY = 'vcc_session_access';
const REFRESH_KEY = 'vcc_session_refresh';

const safeSession = typeof window !== 'undefined' ? window.sessionStorage : null;

export const tokenStore = {
  setTokens(accessToken: string, refreshToken?: string) {
    memoryAccessToken = accessToken;
    if (refreshToken) memoryRefreshToken = refreshToken;
    if (safeSession) {
      safeSession.setItem(ACCESS_KEY, accessToken);
      if (refreshToken) safeSession.setItem(REFRESH_KEY, refreshToken);
    }
  },
  getAccessToken(): string | null {
    if (memoryAccessToken) return memoryAccessToken;
    if (safeSession) memoryAccessToken = safeSession.getItem(ACCESS_KEY);
    return memoryAccessToken;
  },
  getRefreshToken(): string | null {
    if (memoryRefreshToken) return memoryRefreshToken;
    if (safeSession) memoryRefreshToken = safeSession.getItem(REFRESH_KEY);
    return memoryRefreshToken;
  },
  clear() {
    memoryAccessToken = null;
    memoryRefreshToken = null;
    safeSession?.removeItem(ACCESS_KEY);
    safeSession?.removeItem(REFRESH_KEY);
  }
};
