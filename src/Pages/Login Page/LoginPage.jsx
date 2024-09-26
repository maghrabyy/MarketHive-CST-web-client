import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { FaExclamationCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from 'antd';
import { authErrors } from '../../util/authErrors';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import welcomeLoginImg from '../../assets/login-welcome.png';
import marketHiveLogo from '../../assets/MHLogo.png';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();
  const loginSchema = Yup.object().shape({
    password: Yup.string().required('Enter your password '),
    email: Yup.string().email('Invalid email').required('Enter your email'),
  });
  return (
    <div className="login-page min-h-screen grid grid-cols-12 items-center md:px-12 px-4 gap-4 bg-pattern">
      <div className="image col-span-7 hidden md:block">
        <img
          src={welcomeLoginImg}
          alt="welcome back"
          className="max-h-[630px]"
        />
      </div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={loginSchema}
        onSubmit={async ({ email, password }) => {
          setIsLoading(true);
          try {
            await signInWithEmailAndPassword(auth, email, password);
            const customerDoc = await getDoc(
              doc(db, 'Customers', auth.currentUser.uid),
            );
            if (customerDoc.exists()) {
              navigate('/');
            } else {
              setAuthError('Unauthorized Access.');
              signOut(auth);
              setIsLoading(false);
            }
          } catch (error) {
            setAuthError(
              authErrors[error.code] ?? 'Unable to login, try again later.',
            );
            setIsLoading(false);
          }
        }}
      >
        {({ errors, touched }) => (
          <div className="flex flex-col bg-white gap-4 md:col-span-5 col-span-12 shadow-md rounded-md border border-gray-100 px-5 py-8">
            <img
              src={marketHiveLogo}
              alt="Market Hive logo"
              className="w-40 self-center"
            />
            <div className="welcome-text">
              <h4 className="font-bold text-xl">Welcome Back,</h4>
              <h2 className="mt-1 text-xl md:text-3xl font-bold text-primary">
                Sign in to your account
              </h2>
            </div>
            <div>
              {authError && (
                <div className="auth-error bg-red-500 rounded-md mb-2 p-2 text-white text-center">
                  {authError}
                </div>
              )}
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
                  <Button
                    type="primary w-full"
                    htmlType="submit"
                    loading={isLoading}
                  >
                    Sign In
                  </Button>
                </div>
              </Form>
              <p className="text-center mt-2 text-sm text-gray-500">
                Dont have an account?{'    '}
                <Link
                  to="/register"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}
