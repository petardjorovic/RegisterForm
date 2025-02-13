import React from "react";
import FormComponent from "../components/FormComponent";

function RegisterPage() {
  return (
    <div className=" bg-neutral-700 py-[20px] flex flex-col gap-[15px] items-center text-slate-400">
      <h2 className="text-2xl font-semibold text-orange-600">Register</h2>
      <FormComponent />
    </div>
  );
}

export default RegisterPage;
