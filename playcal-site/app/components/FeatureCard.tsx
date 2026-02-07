interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  color: "purple" | "teal";
}

export default function FeatureCard({ icon, title, description, color }: FeatureCardProps) {
  const bgColor = color === "purple" ? "bg-purple-50" : "bg-teal-50";
  const iconBg = color === "purple" ? "bg-purple-100" : "bg-teal-100";
  const textColor = color === "purple" ? "text-primary" : "text-accent";

  return (
    <div className={`${bgColor} rounded-2xl p-6 hover:shadow-lg transition-shadow`}>
      <div className={`${iconBg} ${textColor} w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
