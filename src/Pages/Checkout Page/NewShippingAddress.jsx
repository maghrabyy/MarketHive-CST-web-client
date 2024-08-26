import { Field, Form, Formik } from 'formik';
import { Button, Card } from 'antd';
import { FaExclamationCircle, FaEdit } from 'react-icons/fa';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import * as Yup from 'yup';
import { useState } from 'react';
import deliveryAddress from '../../assets/Delivery-address.svg';
import PaymentNoon from './PaymentMethod';

function NewShippingAddress({ customerAddress }) {
  const [address, setAddress] = useState(customerAddress || null);
  const [editing, setEditing] = useState(!address);
  const [update, setUpdate] = useState(false);

  const checkoutSchema = Yup.object().shape({
    city: Yup.string().required('Required'),
    streetAddress: Yup.string().required('Required'),
    buildingNumber: Yup.string().required('Required'),
    floor: Yup.string().required('Required'),
    aptNumber: Yup.string().required('Required'),
  });

  const onSubmit = async (values, action) => {
    const washingtonRef = doc(db, 'Customers', `${auth.currentUser.uid}`);
    await updateDoc(washingtonRef, {
      address: {
        city: values.city,
        streetAddress: values.streetAddress,
        buildingNumber: values.buildingNumber,
        floor: values.floor,
        aptNumber: values.aptNumber,
        nearestLandmark: values.nearestLandmark,
      },
    });
    setAddress(values);
    setEditing(false);
    action.resetForm();
  };

  return (
    <div className="flex justify-center items-center  min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full flex flex-col md:flex-row">
        <div className="hidden md:flex items-center justify-center w-full md:w-1/2">
          <img
            src={deliveryAddress}
            alt="Add Address Illustration"
            className="w-3/4 h-auto"
          />
        </div>
        <div className="w-full md:w-1/2 p-4">
          {editing ? (
            <h2 className="text-2xl font-semibold text-center text-primary mb-6">
              {address
                ? 'Update Your Shipping Address'
                : 'Enter a new shipping address'}
            </h2>
          ) : (
            ''
          )}

          {editing ? (
            <>
              <Formik
                initialValues={
                  address || {
                    city: '',
                    streetAddress: '',
                    buildingNumber: '',
                    floor: '',
                    aptNumber: '',
                    nearestLandmark: '',
                  }
                }
                validationSchema={checkoutSchema}
                onSubmit={onSubmit}
              >
                {({ errors, touched }) => (
                  <Form className="space-y-4">
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <Field
                        type="text"
                        id="city"
                        name="city"
                        placeholder="City"
                        className={`block w-full p-2 rounded-md border ${
                          errors.city && touched.city
                            ? 'border-red-500'
                            : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-primary`}
                      />
                      {errors.city && touched.city && (
                        <div className="flex items-center text-red-500 text-sm mt-1">
                          <FaExclamationCircle className="mr-1" />
                          {errors.city}
                        </div>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="streetAddress"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Street Address
                      </label>
                      <Field
                        type="text"
                        id="streetAddress"
                        name="streetAddress"
                        placeholder="Street Address"
                        className={`block w-full p-2 rounded-md border ${
                          errors.streetAddress && touched.streetAddress
                            ? 'border-red-500'
                            : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-primary`}
                      />
                      {errors.streetAddress && touched.streetAddress && (
                        <div className="flex items-center text-red-500 text-sm mt-1">
                          <FaExclamationCircle className="mr-1" />
                          {errors.streetAddress}
                        </div>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="buildingNumber"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Building Number
                      </label>
                      <Field
                        id="buildingNumber"
                        type="text"
                        name="buildingNumber"
                        placeholder="Building Number"
                        className={`block w-full p-2 rounded-md border ${
                          errors.buildingNumber && touched.buildingNumber
                            ? 'border-red-500'
                            : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-primary`}
                      />
                      {errors.buildingNumber && touched.buildingNumber && (
                        <div className="flex items-center text-red-500 text-sm mt-1">
                          <FaExclamationCircle className="mr-1" />
                          {errors.buildingNumber}
                        </div>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="floor"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Floor
                      </label>
                      <Field
                        type="text"
                        id="floor"
                        name="floor"
                        placeholder="Floor"
                        className={`block w-full p-2 rounded-md border ${
                          errors.floor && touched.floor
                            ? 'border-red-500'
                            : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-primary`}
                      />
                      {errors.floor && touched.floor && (
                        <div className="flex items-center text-red-500 text-sm mt-1">
                          <FaExclamationCircle className="mr-1" />
                          {errors.floor}
                        </div>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="aptNumber"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Apt Number
                      </label>
                      <Field
                        id="aptNumber"
                        type="text"
                        name="aptNumber"
                        placeholder="Apt Number"
                        className={`block w-full p-2 rounded-md border ${
                          errors.aptNumber && touched.aptNumber
                            ? 'border-red-500'
                            : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-primary`}
                      />
                      {errors.aptNumber && touched.aptNumber && (
                        <div className="flex items-center text-red-500 text-sm mt-1">
                          <FaExclamationCircle className="mr-1" />
                          {errors.aptNumber}
                        </div>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="nearestLandmark"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nearest Landmark (Optional)
                      </label>
                      <Field
                        type="text"
                        id="nearestLandmark"
                        name="nearestLandmark"
                        placeholder="Nearest Landmark"
                        className="block w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <Button
                      type="primary"
                      htmlType="submit"
                      className="w-full mt-4"
                    >
                      {update ? 'Update Address' : 'Add Address'}
                    </Button>
                  </Form>
                )}
              </Formik>
            </>
          ) : (
            <>
              <Card
                title="Shipping Address"
                bordered={false}
                className="w-full shadow-md "
                extra={
                  <Button
                    type="primary"
                    onClick={() => {
                      setEditing(true);
                      setUpdate(true);
                    }}
                    icon={<FaEdit />}
                  >
                    Edit
                  </Button>
                }
              >
                <p>
                  <strong>City:</strong> {address.city}
                </p>
                <p>
                  <strong>Street Address:</strong> {address.streetAddress}
                </p>
                <p>
                  <strong>Building Number:</strong> {address.buildingNumber}
                </p>
                <p>
                  <strong>Floor:</strong> {address.floor}
                </p>
                <p>
                  <strong>Apt Number:</strong> {address.aptNumber}
                </p>
                {address.nearestLandmark && (
                  <p>
                    <strong>Nearest Landmark:</strong> {address.nearestLandmark}
                  </p>
                )}
              </Card>

              <PaymentNoon />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewShippingAddress;
