import { type ReactNode } from "react";

type CardProps = {
  image?: string;
  title?: string;
  body?: string;
  footer?: ReactNode;
};

export default function Card({ image, title, body, footer }: CardProps) {
  return (
    <div
      className="bg-bg-input border border-border-subtle overflow-hidden"
      style={{
        borderRadius: "12px",
        padding: "var(--space-5)",
      }}
    >
      {image && (
        <div
          className="w-full bg-bg-canvas"
          style={{
            height: "200px",
            margin: "calc(var(--space-5) * -1)",
            marginBottom: "var(--space-5)",
          }}
        >
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {title && (
        <h3 className="text-text-primary font-semibold text-base mt-0 mb-2">
          {title}
        </h3>
      )}

      {body && <p className="text-text-secondary text-sm m-0">{body}</p>}

      {footer && <div className="mt-4">{footer}</div>}
    </div>
  );
}
