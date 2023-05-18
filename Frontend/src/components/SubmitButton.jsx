import React from "react";
import { useFormikContext } from "formik";
import { Button } from "antd";

const SubmitButton = ({ className, ...props }) => {
  const { isValid, isSubmitting } = useFormikContext();

  return (
    <Button
      type="primary"
      htmlType="submit"
      className={`${className} ${!isValid ? "is-invalid" : ""}`}
      disabled={!isValid || isSubmitting}
      {...props}
    >
      {isSubmitting ? "Submitting..." : "Submit"}
    </Button>
  );
};

export default SubmitButton;