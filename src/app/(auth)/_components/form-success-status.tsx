import { CheckCircle } from "lucide-react";

interface IFormSuccessStatus {
  message: string | undefined;
}

export const FormSuccessStatus: React.FC<IFormSuccessStatus> = ({
  message,
}) => {
  if (!message) return null;

  return (
    <div className="w-full h-12 px-4 animate-pulse flex items-center space-x-3 bg-green-200 text-green-500 rounded-sm">
      <CheckCircle className="w-4 h-4" />
      <span>{message}</span>
    </div>
  );
};
