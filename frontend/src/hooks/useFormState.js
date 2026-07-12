import { useState } from "react";

/**
 * Small helper for uncontrolled-by-name form state:
 * const { formData, handleChange, setFormData } = useFormState({ email: "", password: "" });
 * <input name="email" value={formData.email} onChange={handleChange} />
 */
const useFormState = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const reset = () => setFormData(initialState);

  return { formData, setFormData, handleChange, reset };
};

export default useFormState;
