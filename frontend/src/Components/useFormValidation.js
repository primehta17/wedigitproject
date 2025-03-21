import { useState } from "react";

const useFormValidation = (formData) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Valid email is required.";
    if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone number must be 10 digits.";
    if (
      !formData.claim_amount ||
      formData.claim_amount < 100 ||
      formData.claim_amount > 1000000
    )
      newErrors.claim_amount = "Claim amount must be between 100 and 1,000,000.";
    if (!formData.claim_description.trim())
      newErrors.claim_description = "Claim description is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validateForm };
};

export default useFormValidation;
