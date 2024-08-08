import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { FaExclamationCircle } from 'react-icons/fa';

export default function LogIn() {
  const loginSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'password must be at-least 6 character')
      .required('Enter your password '),
    email: Yup.string().email('Invalid email').required('Enter your email'),
  });
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={loginSchema}
      onSubmit={(values) => {
        // same shape as initial values
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <div className="py-5">
          <h2 className="mt-1 text-center text-3xl font-bold text-primary">
            Sign in to your account
          </h2>

          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <Form action="#" method="POST" className="space-y-2">
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
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="/"
                      className="font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {touched.password && errors.password && (
                  <>
                    <div
                      className="flex gap-2 items-center p-1 mt-1 mb-4 text-sm text-red-800 rounded-lg  dark:text-red-400"
                      role="alert"
                    >
                      <FaExclamationCircle />
                      <div className="alert-warning font-medium">
                        {errors.password}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-amber-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </Form>

            <p className="text-center mt-2 text-sm text-gray-500">
              If Not Registered?{'    '}
              <Link
                to="/register"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Register !
              </Link>
            </p>
          </div>
        </div>
      )}
    </Formik>
  );
}
