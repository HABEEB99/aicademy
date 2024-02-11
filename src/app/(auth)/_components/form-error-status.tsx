import { AlertTriangle } from "lucide-react";

interface IFormErrorStatus {
  message: string | undefined;
}

export const FormErrorStatus: React.FC<IFormErrorStatus> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="w-full h-12 px-4 animate-pulse flex items-center space-x-3 bg-red-200 text-red-500 rounded-sm">
      <AlertTriangle className="w-4 h-4" />
      <span>{message}</span>
    </div>
  );
};
