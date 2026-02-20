import { useNavigate } from "react-router-dom";

interface MenuCardProps {
  id: string;
  slug: string;
  name: string;
  category: string;
  image: string;
  description?: string;
  isNew?: boolean;
  index: number;
  variant?: "a" | "b";
}

const MenuCard = ({
  id,
  slug,
  name,
  category,
  image,
  description,
  isNew = false,
  index,
  variant = "a",
}: MenuCardProps) => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const v = searchParams.get("v");
  const productUrl = v ? `/product/${slug}?v=${v}` : `/product/${slug}`;

  return (
    <div
      onClick={() => navigate(productUrl)}
      className="menu-card group opacity-0 animate-fade-in-up cursor-pointer"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {variant === "a" ? (
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={name}
            className="menu-card-image group-hover:scale-105"
            loading="lazy"
          />
        </div>
      ) : null}
      <div className="p-4">
        <h3 className="font-heading text-3xl font-bold text-card-foreground leading-tight">
          {name}
        </h3>
        {variant === "b" && description && (
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default MenuCard;
