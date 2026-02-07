interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  color: "purple" | "teal";
}

export default function TestimonialCard({ quote, author, role, color }: TestimonialCardProps) {
  const borderColor = color === "purple" ? "border-l-primary" : "border-l-accent";
  const bgGradient = color === "purple" 
    ? "from-purple-50 to-white" 
    : "from-teal-50 to-white";

  return (
    <div className={`bg-gradient-to-br ${bgGradient} rounded-2xl p-6 border-l-4 ${borderColor} shadow-sm`}>
      <div className="text-4xl text-gray-300 mb-4">"</div>
      <p className="text-gray-700 mb-6 leading-relaxed">{quote}</p>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
          color === "purple" ? "bg-primary" : "bg-accent"
        }`}>
          {author.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{author}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
}
