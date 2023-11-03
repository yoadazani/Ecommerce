import * as Yup from 'yup'


export const registerSchema = Yup.object().shape({
    userName: Yup
        .string()
        .matches(/^[a-zA-Z0-9]*$/, 'Only letters and numbers are allowed')
        .required('Name is required'),
    email: Yup
        .string()
        .email('Invalid email')
        .required('Email is required'),
    phone: Yup
        .string()
        .matches(/^[0-9]*$/, 'Only numbers are allowed')
        .required('Phone is required'),
    password: Yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/^[a-zA-Z0-9]*$/, 'Only letters and numbers are allowed')
        .required('Password is required'),
})
