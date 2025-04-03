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