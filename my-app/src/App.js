import { RouterProvider, redirect } from "react-router-dom";
import router from "./routes/routes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { validateUser } from "./utils/Slices/authSlice";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(validateUser())
      .unwrap()
      .then((originalPromiseResult) => {
        console.log("Validation successful", originalPromiseResult);
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log("Validation failed", rejectedValueOrSerializedError);
        localStorage.clear();
      });
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
