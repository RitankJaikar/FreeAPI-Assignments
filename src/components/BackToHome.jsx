import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export const BackToHome = () => {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate("/")} className="mb-6 px-4 py-2">
      ← Back to Home
    </Button>
  );
};
