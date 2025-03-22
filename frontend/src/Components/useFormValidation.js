import { useState } from 'react';

const useFormValidation = (formData) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits.';
    }

    if (!formData.claim_amount.trim()) {
      newErrors.claim_amount = 'Claim amount is required.';
    } else if (isNaN(formData.claim_amount) || Number(formData.claim_amount) <= 0) {
      newErrors.claim_amount = 'Claim amount must be a positive number.';
    } else if (Number(formData.claim_amount) < 100 || Number(formData.claim_amount) > 1000000) {
      newErrors.claim_amount = 'Claim amount must be between 100 and 1,000,000.';
    }

    if (!formData.claim_description.trim()) {
      newErrors.claim_description = 'Claim description is required.';
    }

    if (!formData.document) {
      newErrors.document = 'Document is required.';
    } else {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(formData.document.type)) {
        newErrors.document = 'Only PDF or Word documents are allowed.';
      }
      const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
      if (formData.document.size > maxSizeInBytes) {
        newErrors.document = 'File size must be less than 2MB.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validateForm };
};

export default useFormValidation;
