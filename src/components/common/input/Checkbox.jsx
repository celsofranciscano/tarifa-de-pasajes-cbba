'use client';

const CheckBox = ({ checked, onChange }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-zinc-300 border border-zinc-300 rounded-full peer-focus:ring-2 peer-focus:ring-zinc-300 peer-checked:bg-blue-500 peer-checked:border-transparent peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-1 after:w-5 after:h-5 after:bg-white after:border after:border-zinc-300 after:rounded-full after:transition-all"></div>
    </label>
  );
};

export default CheckBox;
