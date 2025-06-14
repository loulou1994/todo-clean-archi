interface CookieOptions {
    domain?: string;
    encode?: (val: string) => string;
    expires?: Date;
    httpOnly?: boolean;
    maxAge?: number;
    path?: string;
    sameSite?: boolean | 'lax' | 'strict' | 'none';
    secure?: boolean;
  }

export interface CookieContext {
  getCookie: (name: string) => string | null;
  setCookie: (name: string, value: string, options: CookieOptions) => void;
  getHeader: (name: string) => string | null;
}