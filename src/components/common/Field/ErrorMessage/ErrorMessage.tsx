import { FieldError } from "react-hook-form";

function ErrorMessage({ error }: { error: FieldError | undefined }) {
  if (!error) return null;

  return <p className="mt-1 text-sm text-button-error">{error.message}</p>;
}

export default ErrorMessage;
