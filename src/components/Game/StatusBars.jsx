import { hunger, hygiene, energy, happiness } from "../../assets/assetsPreLoad";

export default function StatusBars({ icon, num, color = 'blue', max = 100, label,  }) {
  const percent = (num / max) * 100;

  const bars = {
    hunger,
    hygiene,
    energy,
    happiness,
  }

  

  return (
   <div className="flex flex-row items-center w-50 mb-5 gap-4">
  {/* Icon */}
  <div className="w-7 h-6 flex items-center justify-center rounded-full bg-amber-50">
    <img src={bars[icon]} className="w-4 h-4" alt={icon} />
  </div>

  {/* Bar container */}
  <div className="relative w-full h-7 rounded-full overflow-hidden bg-yellow-50">
    {/* Filled bar */}
    <div
      className={`absolute top-0 left-0 h-full ${color} transition-all duration-300 ease-in-out`}
      style={{ width: `${percent}%` }}
    />

    {/* Percentage text overlay */}
    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-black">
      {Math.round(percent)}%
    </div>
  </div>
</div>

  );
}