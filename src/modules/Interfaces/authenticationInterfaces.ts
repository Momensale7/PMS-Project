
export interface RegisterFormInputs {
    userName: string;
    email: string;
    country: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    profileImage?: FileList;
  }
 
  export interface VerifyFormInputs {
    email: string;
    code: string;
  }
  export interface LocationState {
    email?: string;
  }
  
  export interface pattern {
   value: RegExp;
   message: string;
 }
 export interface AuthContextProviderProps {
   children: React.ReactNode;
 }
 export interface UserTokenPayload {
   userId: number;
   userName: string;
   userEmail: string;
   userGroup: string;
   roles: string[];
   iat: number; 
   exp: number; 
 }
 export interface AuthContextType {
   loginData: UserTokenPayload | null;
   saveLoginData: () => void;
   role: string;
 }
 
 export interface ChangePassProps {
   onClose: () => void;
   show: boolean;
 }
 
 export interface FormValues {
   oldPassword: string;
   newPassword: string;
   confirmNewPassword: string;
 }