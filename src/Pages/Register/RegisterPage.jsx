import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import { FaExclamationCircle } from 'react-icons/fa';
import * as Yup from 'yup';

export default function Register() {
  const phoneReg = /^01[0125][0-9]{8}$/gm;
  const passReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  const signupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, 'Too Short!')
      .max(10, 'Too Long!')
      .required('Enter your first name'),
    lastName: Yup.string()
      .min(3, 'Too Short!')
      .max(10, 'Too Long!')
      .required('Enter your last name'),
    phone: Yup.string()
      .max(11, 'Too Long!')
      .required('Enter mobile number')
      .matches(phoneReg, 'phone is invaild'),
    email: Yup.string().email('Invalid email').required('Enter your email'),
    password: Yup.string()
      .required('Enter your password')
      .min(6, 'Passwords must be at least 6 characters.')
      .matches(
        passReg,
        'Password must contains uppercase and lowercase letter and number and special character.',
      ),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm your password'),
  });
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        rePassword: '',
      }}
      validationSchema={signupSchema}
      onSubmit={(values) => {
        // same shape as initial values
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <div className="py-5">
          <h2 className="mt-1 text-center text-4xl font-bold text-primary">
            Registration
          </h2>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Form action="#" method="POST" className="space-y-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name
                </label>
                <Field
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {touched.firstName && errors.firstName && (
                  <div
                    className="flex gap-2 items-center p-1 text-sm text-red-800 dark:text-red-400"
                    role="alert"
                  >
                    <FaExclamationCircle />
                    <div className="alert-warning font-medium">
                      {errors.firstName}
                    </div>
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-900"
                >
                  Last name
                </label>

                <Field
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {touched.lastName && errors.lastName && (
                  <div
                    className="flex gap-2 items-center p-1 text-sm text-red-800 rounded-lg  dark:text-red-400"
                    role="alert"
                  >
                    <FaExclamationCircle />

                    <div className="alert-warning font-medium">
                      {errors.lastName}
                    </div>
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mobile number
                </label>

                <Field
                  id="phone"
                  name="phone"
                  type="text"
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {touched.phone && errors.phone && (
                  <div
                    className="flex gap-2 items-center p-1 text-sm text-red-800 rounded-lg  dark:text-red-400"
                    role="alert"
                  >
                    <FaExclamationCircle />
                    <div className="alert-warning font-medium">
                      {errors.phone}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>

                <Field
                  id="email"
                  name="email"
                  type="text"
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {touched.email && errors.email && (
                  <div
                    className="flex gap-2 items-center p-1 text-sm text-red-800 rounded-lg  dark:text-red-400"
                    role="alert"
                  >
                    <FaExclamationCircle />
                    <div className="alert-warning font-medium">
                      {errors.email}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {touched.password && errors.password && (
                  <div
                    className="flex gap-2 items-center p-1 text-sm text-red-800 rounded-lg  dark:text-red-400"
                    role="alert"
                  >
                    <FaExclamationCircle />
                    <div className="alert-warning font-medium">
                      {errors.password}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="rePassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm password
                </label>

                <Field
                  id="rePassword"
                  name="rePassword"
                  type="password"
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {touched.rePassword && errors.rePassword && (
                  <div
                    className="flex gap-2 items-center p-1 text-sm text-red-800 rounded-lg  dark:text-red-400"
                    role="alert"
                  >
                    <FaExclamationCircle />
                    <div className="alert-warning">{errors.rePassword}</div>
                  </div>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register
                </button>
              </div>
            </Form>

            <p className="mt-5 mb-2 text-center text-sm text-gray-500">
              If you have an account,{' '}
              <Link
                to="/login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      )}
    </Formik>
  );
}
