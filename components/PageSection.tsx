import React from "react";

type PageSectionProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
};

const PageSection: React.FC<PageSectionProps> = ({
  title,
  subtitle,
  children,
  className = "",
}) => {
  return (
    <section className={`mb-8 ${className}`}>
      <h2 className="text-2xl font-semibold text-teal-700 mb-4">{title}</h2>

      {subtitle && <p className="text-gray-700 mb-4">{subtitle}</p>}

      {children}
    </section>
  );
};

export default PageSection;
