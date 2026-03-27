const imgImage10 = "/images/figma/a674999a29eed54ef246c53ee3d19db8aeb8b33d.png";

function Container2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Container">
      <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#181818] text-[16px]">Had critical vulnerabilitties</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-[#cdf5fe] relative rounded-[15px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[25px] relative w-full">
          <p className="font-['Sora:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#181818] text-[36px]">95%</p>
          <Container2 />
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-[#cdf5fe] relative rounded-[15px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between leading-[normal] p-[25px] relative text-[#181818] w-full">
          <p className="font-['Sora:SemiBold',sans-serif] font-semibold relative shrink-0 text-[36px]">60%</p>
          <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal relative shrink-0 text-[16px]">Fail to recover after a major cyber attack</p>
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[#cdf5fe] relative rounded-[15px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between leading-[normal] p-[25px] relative text-[#181818] w-full">
          <p className="font-['Sora:SemiBold',sans-serif] font-semibold relative shrink-0 text-[36px]">207days</p>
          <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal relative shrink-0 text-[16px]">{`Average  time to detect a breach`}</p>
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[25px] items-start min-h-px min-w-px relative" data-name="Container">
      <Container1 />
      <Container3 />
      <Container4 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[1340px]">
      <Container />
      <div className="h-[300px] relative shrink-0 w-[303.516px]" data-name="image 10">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-full left-[-48.26%] max-w-none top-0 w-[148.26%]" src={imgImage10} />
        </div>
      </div>
    </div>
  );
}

export default function Section() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-center px-[50px] py-[100px] relative size-full" data-name="Section">
      <Frame />
    </div>
  );
}