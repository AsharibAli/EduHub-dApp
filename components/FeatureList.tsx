import React from "react";

type FeatureItem = {
  title: string;
  description?: string;
  items?: string[];
};

type FeatureListProps = {
  features: FeatureItem[];
  columns?: 1 | 2 | 3 | 4;
  className?: string;
};

const FeatureList: React.FC<FeatureListProps> = ({
  features,
  columns = 2,
  className = "",
}) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6 my-6 ${className}`}>
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow p-5 border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-teal-600 mb-2">
            {feature.title}
          </h3>

          {feature.description && (
            <p className="text-gray-700 mb-2">{feature.description}</p>
          )}

          {feature.items && (
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {feature.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default FeatureList;
