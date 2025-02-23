import { useRef } from "react";
import axios from "axios";
import { Input } from "../components/input/InputComponent";
import { Button } from "../components/ui/Button";
import { BACKEND_URL } from "../config";
import { useNavigate, Link } from "react-router-dom";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    await axios.post(BACKEND_URL + "/api/v1/signup", {
      username,
      password,
    });
    alert("SignedUp Succesfully!");
    navigate("/signin");
  }

  return (
    <div className="h-screen w-screen bg-slate-200 flex justify-center items-center">
      <div className="bg-white rounded min-w-48 flex flex-col gap-2">
        <h1 className="flex justify-center m-2 text-2xl font-semibold ">
          Sign Up
        </h1>
        <div className="flex flex-col gap-4 m-4">
          <Input ref={usernameRef} placeholder="Username" />
          <Input ref={passwordRef} placeholder="Password" type="password" />

          <Link
            to="/signin"
            className="text-indigo-600 text-center 
           text-sm underline"
          >
            Already Have an Account?
          </Link>
        </div>
        <div className="flex justify-center m-2 mb-5">
          <Button onClick={signup} variant="primary" text="Sign Up" size="md" />
        </div>
      </div>
    </div>
  );
}
