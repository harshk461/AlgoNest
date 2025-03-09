export default function Wrapper({ children }) {
  return (
    <div
      className="flex-1 p-4 rounded-xl border-[1px] border-secondary
     flex flex-col gap-4 h-fit"
    >
      {children}
    </div>
  );
}
