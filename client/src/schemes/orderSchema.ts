import * as Yup from 'yup'


const payerSchema = Yup.object().shape({
    name: Yup
        .string()
        .required('Name is required'),
    email: Yup
        .string()
        .email('Invalid email')
        .required('Email is required'),
    phone: Yup.string()
        .min(9, "insert minimum 9 digit please")
        .max(10, "insert maximum 10 digit please")
        .required("Phone number is required"),
})

const addressSchema = Yup.object().shape({
    id: Yup.string().required(),
    userId: Yup.string().required(),
    addressLine: Yup.string().required("AddressLine is required"),
    city: Yup.string().required("City is required"),
    zipCode: Yup.string().required("ZipCode is required"),
    country: Yup.string().required("Country is required"),
    createdAt: Yup.date().required(),
    updatedAt: Yup.date().required(),
})

const amountSchema = Yup.object().shape({
    totalPrice: Yup.number().required(),
    currency: Yup.string().required(),
})

const productSchema = Yup.object().shape({
    id: Yup.string().required(),
    userID: Yup.string().required(),
    productID: Yup.string().required(),
    color: Yup.string().required(),
    size: Yup.string().required(),
    quantity: Yup.number().required(),
    isChecked: Yup.boolean().required(),
})

export const orderSchema = Yup.object().shape({
    id: Yup.string().required(),
    status: Yup
        .string()
    // "active" | "unpaid" | "processing" | "shipped" | "canceled" | "delivered"
        .matches(/^(active|unpaid|shipped|canceled|delivered|processing)$/i, 'Invalid status')
        .required(),
    userId: Yup.string().required(),
    payer: payerSchema,
    address: addressSchema,
    amount: amountSchema,
    createdAt: Yup.date().required(),
    updatedAt: Yup.date().required(),
    products: Yup.array().of(productSchema),
})
