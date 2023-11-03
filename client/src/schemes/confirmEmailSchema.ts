import * as Yup from 'yup'


export const confirmEmailSchema = Yup.object().shape({
    email: Yup
        .string()
        .email('Invalid email')
        .required('Email is required'),
    pinCode: Yup
        .number()
        .required()
})
