type Props = {
  label: string;
  name: string;
  rows?: number;
  defaultValue?: string;
};

export default function TextArea({
  label,
  name,
  rows = 4,
  defaultValue,
}: Props) {
  return (
    <div className="flex flex-col mb-4">
      <label>{label}</label>
      <textarea
        className="border border-gray-600 p-2 rounded"
        name={name}
        rows={rows}
        defaultValue={defaultValue}
      />
    </div>
  );
}
