import { Input } from "../components/input/InputComponent";
import { Button } from "../components/ui/Button";

export function Signin() {
  return (
    <div className="h-screen w-screen bg-slate-200 flex justify-center items-center">
      <div className="bg-white rounded min-w-48 flex flex-col gap-2">
        <h1 className="flex justify-center m-2 text-2xl font-semibold ">
          Signin
        </h1>
        <div className="flex flex-col gap-4 m-4">
          <Input placeholder="Username" onChange={() => {}} />
          <Input placeholder="Password" onChange={() => {}} />
        </div>
        <div className="flex justify-center m-2 mb-5">
          <Button variant="primary" text="Signin" size="md" />
        </div>
      </div>
    </div>
  );
}
