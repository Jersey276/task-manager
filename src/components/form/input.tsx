type Props = {
  label: string;
  name: string;
  type: string;
  defaultValue?: string;
};
export default function FormInput({ label, name, type, defaultValue }: Props) {
  return (
    <div className="flex flex-col mb-4">
      <label>{label}</label>
      <input
        className="border border-gray-600 p-2 rounded"
        type={type}
        name={name}
        defaultValue={defaultValue}
      />
    </div>
  );
}
