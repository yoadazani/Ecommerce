import * as Yup from 'yup'


export const loginSchema = Yup.object().shape({
    email: Yup
        .string()
        .email('Invalid email')
        .required('Email is required'),
    password: Yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/^[a-zA-Z0-9]*$/, 'Only letters and numbers are allowed')
        .required('Password is required'),
})
