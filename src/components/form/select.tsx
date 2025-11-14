type Props = {
  label: string;
  name: string;
  options: Array<string>;
  defaultSelected?: string;
};
export default function Select({
  label,
  name,
  options,
  defaultSelected,
}: Props) {
  return (
    <div className="flex flex-col mb-4">
      <label className="flex flex-col">{label}</label>
      <select
        name={name}
        className="border border-gray-600 p-2 rounded"
        defaultValue={defaultSelected}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
