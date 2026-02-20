import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Randomizer = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const variant = Math.random() < 0.5 ? "a" : "b";
    navigate(`/?v=${variant}`, { replace: true });
  }, [navigate]);

  return null;
};

export default Randomizer;
