export default function StatusBars({ icon, num, max = 100, label }) {
  const percent = (num / max) * 100;

  return (
    <div className="flex flex-row items-center w-50 mb-5 gap-4">
      <img
        src={`/src/assets/image/InGame/icons/${icon}.png`}
        className="w-5 h-5 mb-1"
        alt={icon}
      />
      <div className="relative w-full h-7 bg-gray-300 rounded-full overflow-hidden">
        <div
          className="absolute h-full bg-blue-500 transition-all duration-300 ease-in-out"
          style={{ width: `${percent}%` }}
        />
      </div>
      {/* <div className="text-sm mt-1">{Math.round(num)}</div> */}
    </div>
  );
}