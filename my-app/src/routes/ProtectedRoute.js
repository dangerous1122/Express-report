import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"; // Corrected UseDispatch to useDispatch
import { validateUser,validateGoogle } from "../utils/Slices/authSlice";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("expr")) {
      const token=localStorage.getItem("expr")
      dispatch(validateUser(token))
        .then((originalPromiseResult) => {
          if(originalPromiseResult.error){
            console.log("Validation failed", originalPromiseResult);
            localStorage.clear();
            console.log('h')
            navigate('/login')
          }
          else{
            console.log("Validation successful", originalPromiseResult);
            setIsValidating(false); 
          }
       
        })
        .catch((rejectedValueOrSerializedError) => {
          console.log("Validation failed", rejectedValueOrSerializedError);
          localStorage.clear();
          console.log('h')
          navigate('/', { state: { from: location }, replace: true }); 
        });
    } else {
      navigate('/login', { state: { from: location }, replace: true });
    }
  }, [dispatch,location.pathname]);


  return children;
};

export default ProtectedRoute;
