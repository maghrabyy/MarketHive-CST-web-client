import { Navigate } from 'react-router-dom';
import { auth } from '../../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import { Spin } from 'antd';

export default function ProtectedRoute({ children }) {
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  onAuthStateChanged(auth, () => {
    setIsAuthLoading(false);
  });

  return isAuthLoading ? (
    <div className="h-full absolute left-1/2 flex flex-col justify-center">
      <Spin size="large" className="self-stretch " />
    </div>
  ) : auth.currentUser !== null ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}