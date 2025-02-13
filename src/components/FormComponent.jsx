import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useRef } from "react";
import { FileParser } from "../utils/FileParser";
import UserServices from "../services/UserServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function FormComponent() {
  const navigate = useNavigate();
  const KB = 1024;
  const MB = KB * 1024;
  const VALID_TYPES = ["image/jpg", "image/jpeg", "image/png"];
  let imageInputRef = useRef();
  let firstNameInputRef = useRef();

  useEffect(() => {
    firstNameInputRef.current.focus();
  }, []);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      birthDate: "",
      avatar: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .matches(
          /^[A-Z][a-zA-Z-]+$/,
          "First name must start with a capital letter and contain only letters and hyphens"
        )
        .required("First Name is required"),
      lastName: Yup.string()
        .matches(
          /^[A-Z][a-zA-Z-]+$/,
          "Last name must start with a capital letter and contain only letters and hyphens"
        )
        .required("Last name is required"),
      email: Yup.string()
        .email("Not valid email")
        .required("Email is required"),
      password: Yup.string().min(8).required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
      gender: Yup.string().required("Gender is required"),
      birthDate: Yup.string().required("Birth date is required"),
      avatar: Yup.mixed()
        .required("Avatar image is required")
        .test(
          "fileSize",
          "Image size must be under 1MB",
          (value) => value.size < 2 * MB
        )
        .test(
          "fileType",
          "Valid image extensions are jpg, jpeg and png",
          (value) => VALID_TYPES.includes(value.type)
        ),
    }),
    onSubmit: (values) => {
      FileParser(values.avatar)
        .then((res) => {
          console.log({ ...values, avatar: res });
          // UserServices.register({ ...values, avatar: res })
          //   .then((res) => {
          //     console.log(res);
          //     toast.success("Successufull registration");
          //     navigate("/login");
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //     toast.error(err.message);
          //   });
        })
        .catch((err) => {
          console.log(err);
        });

      formik.resetForm();
      console.imageInputRef;
      imageInputRef.current.value = "";
    },
  });

  const showErrors = (name) =>
    formik.errors[name] && formik.touched[name] && formik.errors[name];

  return (
    <form
      className="w-[500px] flex flex-col gap-[10px] border border-slate-200 p-[20px] rounded-md"
      onSubmit={formik.handleSubmit}
    >
      {/* firstName */}
      <div className="flex flex-col">
        <label
          htmlFor="firstName"
          className={`text-xs ${showErrors("firstName") ? "text-red-600" : ""}`}
        >
          {showErrors("firstName") ? showErrors("firstName") : "First Name"}
        </label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="First Name"
          ref={firstNameInputRef}
          className="rounded-md outline-none px-[16px] py-[8px]"
          value={formik.values.firstName}
          onChange={formik.handleChange}
        />
      </div>
      {/* lastName */}
      <div className="flex flex-col">
        <label
          htmlFor="lastName"
          className={`text-xs ${showErrors("lastName") ? "text-red-600" : ""}`}
        >
          {showErrors("lastName") ? showErrors("lastName") : "Last Name"}
        </label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Last Name"
          className="rounded-md outline-none px-[16px] py-[8px]"
          value={formik.values.lastName}
          onChange={formik.handleChange}
        />
      </div>
      {/* email */}
      <div className="flex flex-col">
        <label
          htmlFor="email"
          className={`text-xs ${showErrors("email") ? "text-red-600" : ""}`}
        >
          {showErrors("email") ? showErrors("email") : "Email"}
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="rounded-md outline-none px-[16px] py-[8px]"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
      </div>
      {/* password */}
      <div className="flex flex-col">
        <label
          htmlFor="password"
          className={`text-xs ${showErrors("password") ? "text-red-600" : ""}`}
        >
          {showErrors("password") ? showErrors("password") : "Password"}
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="rounded-md outline-none px-[16px] py-[8px]"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
      </div>
      {/* confirmPassword */}
      <div className="flex flex-col">
        <label
          htmlFor="confirmPassword"
          className={`text-xs ${
            showErrors("confirmPassword") ? "text-red-600" : ""
          }`}
        >
          {showErrors("confirmPassword")
            ? showErrors("confirmPassword")
            : "Confirm Password"}
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm Password"
          className="rounded-md outline-none px-[16px] py-[8px]"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
        />
      </div>
      {/* gender */}
      <div className="flex flex-col">
        <label
          htmlFor="gender"
          className={`text-xs ${showErrors("gender") ? "text-red-600" : ""}`}
        >
          {showErrors("gender") ? showErrors("gender") : "Gender"}
        </label>
        <select
          name="gender"
          id="gender"
          className="rounded-md outline-none px-[16px] py-[8px]"
          value={formik.values.gender}
          onChange={formik.handleChange}
        >
          <option value="" defaultChecked>
            Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      {/* birthDate */}
      <div className="flex flex-col">
        <label
          htmlFor="birthDate"
          className={`text-xs ${showErrors("birthDate") ? "text-red-600" : ""}`}
        >
          {showErrors("birthDate") ? showErrors("birthDate") : "Birth Date"}
        </label>
        <input
          type="date"
          name="birthDate"
          id="birthDate"
          placeholder="Birth Date"
          className="rounded-md outline-none px-[16px] py-[8px]"
          value={formik.values.birthDate}
          onChange={formik.handleChange}
        />
      </div>
      {/* avatar */}
      <div className="flex flex-col">
        <label
          htmlFor="avatar"
          className={`text-xs ${showErrors("avatar") ? "text-red-600" : ""}`}
        >
          {showErrors("avatar") ? showErrors("avatar") : "Avatar"}
        </label>
        <input
          type="file"
          name="avatar"
          id="avatar"
          placeholder="Avatar"
          ref={imageInputRef}
          accept="image/jpeg, image/jpg, image/png"
          className="rounded-md outline-none px-[16px] py-[8px]"
          onChange={(e) =>
            formik.setFieldValue(e.target.name, e.target.files[0])
          }
        />
      </div>
      <button
        type="submit"
        className="bg-orange-600 rounded-md px-[16px] py-[8px] text-white hover:bg-orange-700 transition-all duration-300"
      >
        Register
      </button>
    </form>
  );
}

export default FormComponent;
