import { pattern } from "../../Interfaces/authenticationInterfaces";

export const EMAIL_VALIDATION :{required:string,pattern:pattern} = {
    required: 'email is required',
    pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Invalid email format",
    }
}
export const PASSWORD_VALIDATION :{required:string,pattern:pattern} =
{
    required: 'password is required',
    pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        message: "Must be 6+ chars, 1 uppercase, 1 lowercase, 1 digit & 1 special char",
    }
}
export const OTP_VALIDATION : {required:string} =
{
    required: 'OTP is required',
}
export const CONFIRM_PASS_VALIDATION = (password: string): { required: string; validate: (value: string) => true | string } => (
    {
        required: 'Confirm Password is required',
        validate: (value: string) => value === password || 'Passwords do not match'
    })


export const REQUIRED_VALIDATION = (INPUT:string):{required:string} => (
    {
        required: `${INPUT} is required`,
    })
export const USERNAME_VALIDATION :{required:string; pattern:pattern} = {
    required: 'Username is required',
    pattern: {
        value: /^(?=.*[A-Za-z])[A-Za-z0-9]{3,7}[0-9]$/,
        message: 'Must be 4–8 chars, include letters, and end with numbers.',
    },
};
export const COUNTRY_VALIDATION: {required:string,pattern:pattern} =
{
    required: 'COUNTRY is required',
    pattern: {
        value: /^[a-zA-Z]{2,}$/,
        message: "enter a valid country",
    }
}
export const PHONE_VALIDATION :{required:string,pattern:pattern} =
{
    required: 'Phone is required',
    pattern: {
        value: /^[0-9]{11}$/,
        message: "Invalid phone format",
    }
}