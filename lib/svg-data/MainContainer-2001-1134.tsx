import svgPaths from "./svg-olg443z6ks";
const imgCard = "/images/figma/523d69e15824438a4fbbf34f51fb05a35f7fdf0d.png";
const imgCard1 = "/images/figma/cd141cb5bc524f13a11e1d3e641bff9c5c0aaf62.png";
const imgCard2 = "/images/figma/d77f8a0a1e5bedbff53424b69f5812b4cb560788.png";
const imgCard3 = "/images/figma/891596228f2ccc9edf84581e6b09c7000509f721.png";

function Frame4() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Sora:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#181818] text-[48px] tracking-[-0.9524px] w-[670px] whitespace-pre-wrap">Build securely with CleanStart</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 size-[25px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
        <g id="Frame">
          <path d={svgPaths.p235899c0} id="Vector" stroke="var(--stroke-0, #181818)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Feature() {
  return (
    <div className="col-1 content-stretch flex gap-[5px] items-center justify-self-start relative row-1 self-start shrink-0" data-name="Feature">
      <Frame />
      <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#181818] text-[20px]">Compliance</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0 size-[25px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
        <g id="Frame">
          <path d={svgPaths.p235899c0} id="Vector" stroke="var(--stroke-0, #181818)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Feature1() {
  return (
    <div className="col-2 justify-self-stretch relative row-1 self-start shrink-0" data-name="Feature">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[5px] items-center px-[32px] relative w-full">
          <Frame1 />
          <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#181818] text-[20px]">Faster Deployment</p>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="relative shrink-0 size-[25px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
        <g id="Frame">
          <path d={svgPaths.p235899c0} id="Vector" stroke="var(--stroke-0, #181818)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Feature2() {
  return (
    <div className="col-1 content-stretch flex gap-[5px] items-center justify-self-start relative row-2 self-start shrink-0" data-name="Feature">
      <Frame2 />
      <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#181818] text-[20px]">Simplify Vulnerability Management</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="relative shrink-0 size-[25px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
        <g id="Frame">
          <path d={svgPaths.p235899c0} id="Vector" stroke="var(--stroke-0, #181818)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Feature3() {
  return (
    <div className="col-2 content-stretch flex gap-[5px] items-center justify-end justify-self-stretch relative row-2 self-start shrink-0" data-name="Feature">
      <Frame3 />
      <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#181818] text-[20px]">Attack Surface Reduction</p>
    </div>
  );
}

function FeaturesContainer() {
  return (
    <div className="flex-[1_0_0] gap-x-[50px] gap-y-[25px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(2,fit-content(100%))] min-h-px min-w-px relative" data-name="Features Container">
      <Feature />
      <Feature1 />
      <Feature2 />
      <Feature3 />
    </div>
  );
}

function HeaderContainer() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Header Container">
      <Frame4 />
      <FeaturesContainer />
    </div>
  );
}

function CardDescription() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Card Description">
      <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[16px] text-white w-full whitespace-pre-wrap">{`CleanStart secures your development pipeline by continuously monitoring containers, virtual machines, libraries, `}</p>
    </div>
  );
}

function CardTitleContainer() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Card Title Container">
      <p className="font-['Sora:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[28px] text-white w-[175px] whitespace-pre-wrap">Container Images</p>
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex gap-[5px] items-center relative shrink-0" data-name="Link">
      <p className="font-['Sora:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[16px] text-white">Learn More</p>
      <div className="h-[11.204px] relative shrink-0 w-[12.792px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.7921 11.204">
          <path d={svgPaths.p213cad00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function CardFooter() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="Card Footer">
      <CardTitleContainer />
      <Link />
    </div>
  );
}

function Card() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[15px]" data-name="Card">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[15px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgCard} />
      </div>
      <div className="content-stretch flex flex-col gap-[200px] items-start p-[25px] relative size-full">
        <CardDescription />
        <CardFooter />
      </div>
    </div>
  );
}

function CardDescription1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Card Description">
      <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[16px] text-white w-full whitespace-pre-wrap">Our platform simplifies compliance and vulnerability management, reducing operational complexity</p>
    </div>
  );
}

function CardTitleContainer1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Card Title Container">
      <p className="font-['Sora:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[28px] text-white">VM</p>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[21px] relative shrink-0 w-[63.359px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Sora:SemiBold',sans-serif] font-semibold leading-[21px] left-0 text-[14px] text-white top-0 tracking-[-0.14px]">Sign Up</p>
      </div>
    </div>
  );
}

function ArrowRightRegular() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="ArrowRightRegular">
      <div className="absolute inset-[14.99%_10.05%_14.98%_10%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.7921 11.204">
          <path d={svgPaths.p213cad00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[24px] relative shrink-0 w-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[5.781px] relative size-full">
        <ArrowRightRegular />
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Link">
      <Text />
      <Container />
    </div>
  );
}

function CardFooter1() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="Card Footer">
      <CardTitleContainer1 />
      <Link1 />
    </div>
  );
}

function Card1() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[15px]" data-name="Card">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[15px]">
        <img alt="" className="absolute h-[99.92%] left-0 max-w-none top-[0.04%] w-[100.52%]" src={imgCard1} />
      </div>
      <div className="content-stretch flex flex-col items-start justify-between p-[25px] relative size-full">
        <CardDescription1 />
        <CardFooter1 />
      </div>
    </div>
  );
}

function CardDescription2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Card Description">
      <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[16px] text-white w-full whitespace-pre-wrap">With automated scanning and real-time insights, teams can deploy faster without compromising protection</p>
    </div>
  );
}

function CardTitleContainer2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Card Title Container">
      <p className="font-['Sora:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[28px] text-white">Library</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[21px] relative shrink-0 w-[63.359px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Sora:SemiBold',sans-serif] font-semibold leading-[21px] left-0 text-[14px] text-white top-0 tracking-[-0.14px]">Sign Up</p>
      </div>
    </div>
  );
}

function ArrowRightRegular1() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="ArrowRightRegular">
      <div className="absolute inset-[14.99%_10.05%_14.98%_10%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.7921 11.204">
          <path d={svgPaths.p213cad00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[5.781px] relative size-full">
        <ArrowRightRegular1 />
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Link">
      <Text1 />
      <Container1 />
    </div>
  );
}

function CardFooter2() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="Card Footer">
      <CardTitleContainer2 />
      <Link2 />
    </div>
  );
}

function Card2() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[15px]" data-name="Card">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[15px]">
        <img alt="" className="absolute h-[99.93%] left-[-44.2%] max-w-none top-[0.02%] w-[183.71%]" src={imgCard2} />
      </div>
      <div className="content-stretch flex flex-col items-start justify-between p-[25px] relative size-full">
        <CardDescription2 />
        <CardFooter2 />
      </div>
    </div>
  );
}

function CardDescription3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Card Description">
      <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[16px] text-white w-full whitespace-pre-wrap">Designed for modern enterprises, CleanStart minimizes attack surfaces and enforces security</p>
    </div>
  );
}

function CardTitleContainer3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Card Title Container">
      <p className="font-['Sora:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[28px] text-white">Packages</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[21px] relative shrink-0 w-[63.359px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Sora:SemiBold',sans-serif] font-semibold leading-[21px] left-0 text-[14px] text-white top-0 tracking-[-0.14px]">Sign Up</p>
      </div>
    </div>
  );
}

function ArrowRightRegular2() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="ArrowRightRegular">
      <div className="absolute inset-[14.99%_10.05%_14.98%_10%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.7921 11.204">
          <path d={svgPaths.p213cad00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[24px] relative shrink-0 w-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[5.781px] relative size-full">
        <ArrowRightRegular2 />
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Link">
      <Text2 />
      <Container2 />
    </div>
  );
}

function CardFooter3() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="Card Footer">
      <CardTitleContainer3 />
      <Link3 />
    </div>
  );
}

function Card3() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[15px]" data-name="Card">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[15px] size-full" src={imgCard3} />
      <div className="content-stretch flex flex-col items-start justify-between p-[25px] relative size-full">
        <CardDescription3 />
        <CardFooter3 />
      </div>
    </div>
  );
}

function CardsContainer() {
  return (
    <div className="content-stretch flex gap-[25px] h-[450px] items-center relative shrink-0 w-full" data-name="Cards Container">
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <Card />
      </div>
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <Card1 />
      </div>
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <Card2 />
      </div>
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <Card3 />
      </div>
    </div>
  );
}

export default function MainContainer() {
  return (
    <div className="bg-[#cdf5fe] content-stretch flex flex-col gap-[50px] items-start p-[50px] relative size-full" data-name="Main Container">
      <HeaderContainer />
      <CardsContainer />
    </div>
  );
}