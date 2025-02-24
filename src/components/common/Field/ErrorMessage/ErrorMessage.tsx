import { FieldError } from "react-hook-form";

function ErrorMessage({ error }: { error: FieldError | undefined }) {
  if (!error) return null;

  return <p className="text-button-error mt-1 text-sm">{error.message}</p>;
}

export default ErrorMessage;
