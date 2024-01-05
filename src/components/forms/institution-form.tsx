"use client";
import { useForm, type FieldValues } from "react-hook-form";

export default function InsititutionForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
    setError
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
  
    const response = await fetch("/api/institutions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const responseData = await response.json()
    if (!response.ok) {
      alert(responseData.error)
      return
    }
    if (responseData.errors) {
      const errors = responseData.errors
      for (const key in errors) {
        // Use the key to set error for that specific field
        setError(key, {
          type: "server",
          message: errors[key],
        });
      }
    }
    if (response.ok) {
      reset()
    }
  };
  return (
    <form
      className="w-full max-w-xl flex flex-col space-y-3 my-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Institution Name */}
      <label className="form-control">
        <input
          {...register("name", {
            required: "Institution name is required",
          })}
          type="text"
          placeholder="Institution Name"
          className="input input-bordered w-full"
        />
        {errors.name && (
          <div className="label">
            <span className="label-text-alt text-red-600">{`${errors.name.message}`}</span>
          </div>
        )}
      </label>

      {/* Short Name */}
      <label className="form-control">
        <input
          {...register("shortName", {
            required: "Short name is required",
            maxLength: {
              value: 24,
              message: "Short name must be less than 24 characters",
            },
          })}
          className="input input-bordered w-full"
          type="text"
          placeholder="Short Name"
        />
        {errors.shortName && (
          <div className="label">
            <span className="label-text-alt text-red-600">{`${errors.shortName.message}`}</span>
          </div>
        )}
      </label>

      {/* Address */}
      <label className="form-control">
        <input
          {...register("address", {
            required: "Address is required",
          })}
          className="input input-bordered w-full"
          type="text"
          placeholder="Address"
        />
        {errors.address && (
          <div className="label">
            <span className="label-text-alt text-red-600">{`${errors.address.message}`}</span>
          </div>
        )}
      </label>

      {/* City */}
      <label className="form-control">
        <input
          {...register("city", {
            required: "City is required",
          })}
          className="input input-bordered w-full"
          type="text"
          placeholder="City"
        />
        {errors.city && (
          <div className="label">
            <span className="label-text-alt text-red-600">{`${errors.city.message}`}</span>
          </div>
        )}
      </label>

      {/* Province */}
      <label className="form-control">
        <input
          {...register("province", {
            required: "Province is required",
          })}
          className="input input-bordered w-full"
          type="text"
          placeholder="Province"
        />
        {errors.province && (
          <div className="label">
            <span className="label-text-alt text-red-600">{`${errors.province.message}`}</span>
          </div>
        )}
      </label>

      {/* Region */}
      <label className="form-control">
        <input
          {...register("region", {
            required: "Region is required",
          })}
          className="input input-bordered w-full"
          type="text"
          placeholder="Region"
        />
        {errors.region && (
          <div className="label">
            <span className="label-text-alt text-red-600">{`${errors.region.message}`}</span>
          </div>
        )}
      </label>

      {/* Phone */}
      <label className="form-control">
        <input
          {...register("phone", {
            required: "Phone is required",
            pattern: {
              value: /^[0-9]*$/,
              message: "Phone should only contain numbers",
            }
          })}
          className="input input-bordered w-full"
          type="text"
          placeholder="Phone"
        />
        {errors.phone && (
          <div className="label">
            <span className="label-text-alt text-red-600">{`${errors.phone.message}`}</span>
          </div>
        )}
      </label>

      <label className="form-control">
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: "Please fill a valid email address",
            },
          })}
          className="input input-bordered w-full"
          type="email"
          placeholder="Email"
        />
        {errors.email && (
          <div className="label">
            <span className="label-text-alt text-red-600">{`${errors.email.message}`}</span>
          </div>
        )}
      </label>

      {/* Period Type */}
      <label className="form-control">
        <select {...register("periodType", {
          required: "Period Type is required",
        })} className="select select-bordered">
          <option value="">Select Period Type</option>
          <option value="Semestral">Semestral</option>
          <option value="Trimestral">Trimestral</option>
        </select>
        {errors.periodType && (
          <div className="label">
            <span className="label-text-alt text-red-600">{`${errors.periodType.message}`}</span>
          </div>
        )}
      </label>

      <label className="form-control">
        <textarea
          className="textarea input-bordered w-full"
          rows={8}
          {...register("customLetterhead")}
        ></textarea>
        {errors.customLetterhead && (
          <div className="label">
            <span className="label-text-alt text-red-600">
              {`${errors.customLetterhead.message}`}
            </span>
          </div>
        )}
      </label>

      <button type="submit" disabled={isSubmitting} className="btn btn-primary">
        Save Basic Info
      </button>
    </form>
  );
}
