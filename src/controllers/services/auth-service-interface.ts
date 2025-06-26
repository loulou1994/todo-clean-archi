export interface IAuthService {
    createSesssion: () => void;
    validateSession: () => void;
    deleteSession: () => void;
}