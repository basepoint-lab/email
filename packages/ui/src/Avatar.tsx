import React from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg";
export type AvatarStatus = "online" | "busy" | "away" | "offline";
export type AvatarColor = "pine" | "citron" | "spring" | "linen" | "charcoal";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  initials?: string;
  src?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  color?: AvatarColor;
  title?: string;
}

const sizeClasses: Record<AvatarSize, { container: string; text: string; status: string }> = {
  xs: { container: "w-5 h-5", text: "text-[9px]", status: "w-1.5 h-1.5" },
  sm: { container: "w-7 h-7", text: "text-[11px]", status: "w-2 h-2" },
  md: { container: "w-9 h-9", text: "text-xs", status: "w-2.5 h-2.5" },
  lg: { container: "w-12 h-12", text: "text-sm", status: "w-3 h-3" },
};

const colorClasses: Record<AvatarColor, string> = {
  pine: "bg-[#003922] text-[#a7ff6d] border-[#002516]",
  citron: "bg-[#a7ff6d] text-[#003922] border-[#8ef74e]",
  spring: "bg-[#8ef74e] text-[#003922] border-[#6FE633]",
  linen: "bg-[#f6ffe8] text-[#003922] border-[#DDE3D9]",
  charcoal: "bg-[#202820] text-[#f6ffe8] border-[#141B14]",
};

const statusClasses: Record<AvatarStatus, string> = {
  online: "bg-[#10b981]",
  busy: "bg-[#ef4444]",
  away: "bg-[#f59e0b]",
  offline: "bg-[#9ca3af]",
};

export function Avatar({
  name,
  initials,
  src,
  size = "md",
  status,
  color = "pine",
  className = "",
  title,
  ...props
}: AvatarProps) {
  const computedInitials =
    initials ||
    name
      .split(" ")
      .map((n) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const cfg = sizeClasses[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full border font-mono font-bold select-none transition-transform hover:scale-105 ${
        cfg.container
      } ${colorClasses[color]} ${className}`}
      title={title || name}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <span className={cfg.text}>{computedInitials}</span>
      )}

      {status && (
        <span
          className={`absolute bottom-0 right-0 rounded-full ring-2 ring-white ${cfg.status} ${statusClasses[status]}`}
        />
      )}
    </div>
  );
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: AvatarSize;
  children: React.ReactNode;
}

export function AvatarGroup({
  max = 4,
  size = "sm",
  children,
  className = "",
  ...props
}: AvatarGroupProps) {
  const childrenArray = React.Children.toArray(children);
  const visible = childrenArray.slice(0, max);
  const excess = childrenArray.length - max;
  const cfg = sizeClasses[size];

  return (
    <div
      className={`inline-flex items-center -space-x-2 overflow-hidden ${className}`}
      {...props}
    >
      {visible}
      {excess > 0 && (
        <div
          className={`relative inline-flex items-center justify-center rounded-full border border-[#E2DDD0] bg-[#f6ffe8] text-[#003922] font-mono font-bold select-none ${cfg.container} ${cfg.text}`}
          title={`${excess} more team members`}
        >
          +{excess}
        </div>
      )}
    </div>
  );
}

export default Avatar;
