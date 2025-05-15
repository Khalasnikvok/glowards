import React from 'react';
import { Navigate } from 'react-router-dom';
import { useIdContext } from '../contexts/IdContext';

const ProtectedRoute = ({ element: Component }) => {
    const { data } = useIdContext();

    return data?.ffId ? <Component /> : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
