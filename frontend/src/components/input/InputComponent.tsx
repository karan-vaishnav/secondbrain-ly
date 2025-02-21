export function Input({
  onChange,
  placeholder,
}: {
  placeholder: string;
  onChange: () => void;
}) {
  return (
    <div className="rounded border shadow-md">
      <input
        placeholder={placeholder}
        type={"text"}
        className="px-4 py-2"
        onChange={onChange}
      ></input>
    </div>
  );
}
