interface NotFoundProps {
  text?: string;
}

function NotFound({ text = "Not Found" }: NotFoundProps) {
  return (
    <div className="mt-32 flex items-center justify-center">
      <h1 className="text-2xl font-semibold text-text-h">{text}</h1>
    </div>
  );
}

export default NotFound;
