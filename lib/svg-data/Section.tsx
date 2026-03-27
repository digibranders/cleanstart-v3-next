function Frame() {
  return <div className="absolute bg-gradient-to-t from-white h-[262px] left-[-1px] to-[rgba(255,255,255,0)] top-[768px] w-[1440px]" />;
}

export default function Section() {
  return (
    <div className="bg-gradient-to-t from-[#06c7f2] relative size-full to-black via-[#066bf1] via-[35%]" data-name="Section">
      <Frame />
    </div>
  );
}