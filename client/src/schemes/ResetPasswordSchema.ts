import * as Yup from 'yup'


export const ResetPasswordSchema = Yup.object().shape({
    newPassword: Yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/^[a-zA-Z0-9]*$/, 'Only letters and numbers are allowed')
        .required('Password is required'),
    confirmPassword: Yup
        .string()
        .oneOf([Yup.ref('newPassword')], 'Passwords do not match')
        .required('Confirm password is required')
})
