export function Input({ placeholder, ref }: { placeholder: string; ref?:any}) {
  return (
    <div className="rounded border shadow-md">
      <input
      ref={ref}
        placeholder={placeholder}
        type={"text"}
        className="px-4 py-2"
      ></input>
    </div>
  );
}
