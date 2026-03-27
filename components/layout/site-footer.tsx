'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { CallToActionButton } from '@/components/shared/call-to-action-button';

// --- Inlined SVG path data for logo (from svg-0tcrrv7e40) ---
const LOGO_SVG_PATHS = {
  p33248900: "M9.69324 1.65233V11.1858L2.71394 15.3629V5.67384L0 7.23787L0.0735775 7.28412V18.575L1.22768 19.2667L12.6069 12.6153V0.0273288L12.5606 0L9.69324 1.65233Z",
  p164f400: "M12.8634 12.3672L4.17707 7.25679L11.4864 3.24369L19.8427 8.0262V8.38567L22.7101 6.73334L11.3224 0L0 6.76067V19.1847L2.63826 20.7634V9.56501L10.1494 13.9712L12.8634 12.4072V12.3672Z",
  p29578200: "M4.11821 2.68661C4.71103 2.28719 5.451 2.08748 6.34233 2.08748C7.33037 2.08748 8.13551 2.33134 8.75356 2.81905C9.37371 3.30676 9.81306 3.98367 10.0695 4.84977L12.3063 4.23383C11.8942 2.93887 11.1795 1.9088 10.162 1.1457C9.14246 0.3826 7.86853 0 6.34233 0C5.01585 0 3.88066 0.290104 2.93677 0.870311C1.99288 1.45052 1.26552 2.25986 0.758894 3.29625C0.252264 4.33263 0 5.53719 0 6.90572C0 8.27426 0.254366 9.47671 0.758894 10.5152C1.26552 11.5516 1.99078 12.3609 2.93677 12.9411C3.88276 13.5213 5.01795 13.8114 6.34233 13.8114C7.87063 13.8114 9.14457 13.4288 10.162 12.6658C11.1816 11.9027 11.8963 10.8726 12.3063 9.57762L10.0695 8.96168C9.81096 9.82148 9.37371 10.4963 8.75356 10.9861C8.13341 11.478 7.33037 11.7219 6.34233 11.7219C5.4531 11.7219 4.70892 11.5222 4.114 11.1227C3.51908 10.7233 3.07131 10.1641 2.7749 9.44308C2.47639 8.72203 2.32923 7.87694 2.32923 6.90572C2.33554 5.93661 2.4869 5.09153 2.78541 4.36837C3.08393 3.64732 3.52749 3.08813 4.12031 2.68871L4.11821 2.68661Z",
  p25a63f40: "M2.21782 0H0V13.534H2.21782V0Z",
  pfbeab80: "M7.57212 0.723156C6.85107 0.241753 5.97445 0 4.94437 0C3.96895 0 3.10915 0.220731 2.36708 0.662193C1.625 1.10365 1.04479 1.72591 0.626455 2.52684C0.208117 3.32778 0 4.27167 0 5.35851C0 6.36546 0.212321 7.25469 0.639067 8.0283C1.06581 8.80191 1.65863 9.40524 2.41963 9.8425C3.18063 10.2777 4.06355 10.4963 5.0705 10.4963C6.07746 10.4963 6.90362 10.2482 7.69826 9.75C8.49289 9.25178 9.0815 8.55595 9.462 7.66041L7.27151 6.99822C7.05709 7.4586 6.75226 7.80967 6.35495 8.05142C5.95973 8.29318 5.48884 8.4151 4.94227 8.4151C4.09508 8.4151 3.45181 8.13971 3.00825 7.58684C2.66138 7.15378 2.45327 6.57778 2.37759 5.86514H9.57131C9.6575 4.67529 9.52507 3.64101 9.1761 2.76229C8.82714 1.88567 8.29107 1.20456 7.57002 0.723156H7.57212ZM5.03477 1.94243C5.83991 1.94243 6.42853 2.19049 6.80272 2.68871C7.06759 3.04188 7.23997 3.54431 7.31986 4.18968H2.43435C2.53525 3.61578 2.72655 3.14699 3.01035 2.78541C3.45181 2.22413 4.12662 1.94243 5.03477 1.94243Z",
  p157f1500: "M8.38987 1.84994C8.06403 1.19405 7.56581 0.721055 6.89311 0.433053C6.2204 0.145052 5.44259 0 4.55966 0C3.38664 0 2.45537 0.254366 1.76585 0.7652C1.07422 1.27393 0.607536 1.94874 0.361579 2.78962L2.38599 3.42448C2.55206 2.91575 2.84217 2.55627 3.26051 2.34816C3.67884 2.14004 4.1098 2.03493 4.55757 2.03493C5.29964 2.03493 5.82729 2.1968 6.14052 2.52264C6.4012 2.79382 6.54835 3.19114 6.58829 3.71038C6.18887 3.76924 5.79576 3.826 5.41737 3.88066C4.78881 3.96895 4.20439 4.06565 3.66833 4.17076C3.13017 4.27587 2.66348 4.39149 2.26407 4.52183C1.73641 4.70052 1.30756 4.92755 0.975417 5.20715C0.64327 5.48674 0.397312 5.81889 0.239647 6.20149C0.0798802 6.58619 0 7.01714 0 7.49434C0 8.04091 0.128229 8.54124 0.382595 8.99531C0.636962 9.44939 1.01325 9.81307 1.51148 10.0864C2.00759 10.3596 2.61513 10.4963 3.33409 10.4963C4.22962 10.4963 4.97801 10.3281 5.57503 9.99386C6.03541 9.73739 6.45165 9.3653 6.82163 8.87969V10.2188H8.76406V4.114C8.76406 3.68516 8.74515 3.28784 8.70941 2.92206C8.67157 2.55627 8.56436 2.1989 8.38777 1.84994H8.38987ZM6.34444 7.08021C6.27086 7.30724 6.12791 7.549 5.91559 7.80757C5.70326 8.06614 5.41947 8.28266 5.0642 8.46135C4.70893 8.64004 4.27797 8.72833 3.77555 8.72833C3.42448 8.72833 3.13228 8.67367 2.89683 8.56226C2.66138 8.45084 2.4806 8.30369 2.35867 8.11659C2.23674 7.9295 2.17367 7.71297 2.17367 7.46701C2.17367 7.25259 2.22202 7.06549 2.31662 6.90572C2.41122 6.74596 2.54787 6.60511 2.72655 6.48318C2.90524 6.36125 3.12176 6.25404 3.38033 6.16155C3.64311 6.07536 3.94793 5.99757 4.29269 5.9261C4.63535 5.85463 5.04738 5.78105 5.52668 5.70116C5.8315 5.65071 6.18047 5.59395 6.56307 5.53299C6.55886 5.70116 6.55255 5.89246 6.54414 6.11109C6.52943 6.47688 6.46215 6.80061 6.34653 7.08231L6.34444 7.08021Z",
  p2d484200: "M8.82083 2.52264C8.68629 2.09379 8.47817 1.68807 8.19437 1.30757C7.91268 0.92707 7.53218 0.613842 7.05288 0.367885C6.57357 0.121928 5.96604 0 5.23027 0C4.2969 0 3.51277 0.203913 2.8737 0.61174C2.53104 0.830369 2.23463 1.09104 1.98027 1.39166V0.283797H0V10.2272H2.24725V5.11675C2.24725 4.50922 2.31452 4.011 2.44906 3.61999C2.5836 3.23108 2.76439 2.92416 2.98722 2.69922C3.21006 2.47429 3.46232 2.31662 3.73771 2.22413C4.0131 2.13163 4.29269 2.08538 4.57649 2.08538C5.10414 2.08538 5.52248 2.1989 5.8336 2.42594C6.14473 2.65298 6.37597 2.94308 6.53363 3.29625C6.6913 3.64942 6.7901 4.0152 6.83215 4.3957C6.87419 4.7762 6.89732 5.12306 6.89732 5.43629V10.223H9.14457V4.67109C9.14457 4.43144 9.12354 4.12031 9.0836 3.73561C9.04366 3.35301 8.95537 2.94518 8.82083 2.51633V2.52264Z",
  p27204200: "M9.40104 6.9774C9.02684 6.71463 8.63794 6.50861 8.23221 6.36146C7.82649 6.2143 7.46281 6.09868 7.13697 6.01249L4.76148 5.3503C4.46087 5.27042 4.16446 5.17161 3.87225 5.05179C3.58005 4.93196 3.33619 4.77009 3.14069 4.56408C2.94518 4.35806 2.84638 4.09318 2.84638 3.76734C2.84638 3.42469 2.962 3.12197 3.19114 2.8655C3.42028 2.60693 3.72509 2.40932 4.10349 2.27058C4.47978 2.13183 4.88971 2.06666 5.33328 2.07297C5.78735 2.08558 6.21621 2.17808 6.61773 2.34836C7.01925 2.52074 7.3598 2.7709 7.63939 3.09884C7.91898 3.42679 8.10818 3.8241 8.20488 4.29079L10.5888 3.87666C10.3912 3.06101 10.0548 2.36307 9.57551 1.78707C9.09621 1.21107 8.50129 0.769608 7.78865 0.464789C7.076 0.15997 6.26665 0.00650931 5.3585 0.000202712C4.46297 -0.00610389 3.64732 0.134744 2.91365 0.422745C2.17998 0.710746 1.59767 1.1459 1.16462 1.72611C0.731567 2.30632 0.515041 3.02317 0.515041 3.87666C0.515041 4.45897 0.611737 4.94878 0.805139 5.3461C0.998542 5.74131 1.24661 6.06715 1.55142 6.32152C1.85414 6.57588 2.17788 6.77559 2.51844 6.92064C2.85899 7.06569 3.17643 7.17921 3.47073 7.2654L6.89521 8.27866C7.14117 8.35224 7.3577 8.44053 7.5448 8.54144C7.73189 8.64234 7.88535 8.75376 8.00517 8.87779C8.125 9.00182 8.21539 9.14057 8.27636 9.29613C8.33732 9.45379 8.36885 9.62197 8.36885 9.80696C8.36885 10.219 8.23852 10.5659 7.97785 10.8476C7.71718 11.1292 7.37872 11.3437 6.96038 11.4929C6.54205 11.6401 6.09848 11.7137 5.62549 11.7137C4.82665 11.7137 4.12241 11.4992 3.51277 11.0683C2.90103 10.6394 2.49742 10.0319 2.30191 9.24567L0 9.59464C0.134541 10.4607 0.451973 11.207 0.952296 11.8356C1.45262 12.4641 2.09169 12.9476 2.8674 13.2861C3.64311 13.6246 4.51763 13.7927 5.48674 13.7927C6.16785 13.7927 6.81953 13.7065 7.44389 13.5342C8.06614 13.3618 8.62112 13.1053 9.10462 12.7606C9.58813 12.4158 9.97493 11.9848 10.2608 11.4677C10.5467 10.9485 10.6897 10.3451 10.6897 9.6577C10.6897 8.97029 10.5678 8.44894 10.326 8.01799C10.0842 7.58914 9.77523 7.24228 9.40104 6.9774Z",
  p2ad29300: "M4.0131 0H1.80368V2.76229H0V4.50291H1.80368V8.64634C1.80368 9.21184 1.80999 9.71847 1.8226 10.1662C1.83522 10.614 1.95505 11.0534 2.18208 11.4822C2.44065 11.9552 2.81694 12.3 3.31517 12.5186C3.81339 12.7372 4.37468 12.8528 5.00534 12.8676C5.63389 12.8823 6.27716 12.8297 6.93515 12.7057V10.8452C6.315 10.9377 5.76212 10.9609 5.27862 10.9188C4.79511 10.8768 4.43985 10.6708 4.21912 10.3029C4.10349 10.1137 4.04042 9.86772 4.02991 9.56711C4.0194 9.26649 4.0152 8.91753 4.0152 8.51811V4.50501H6.93305V2.76439H4.0152V0.00210185L4.0131 0Z",
  p234fdc80: "M8.38988 1.84994C8.06404 1.19405 7.56582 0.721055 6.89311 0.433053C6.22041 0.145052 5.44259 0 4.55966 0C3.38664 0 2.45537 0.254366 1.76585 0.7652C1.07422 1.27393 0.607536 1.94874 0.361579 2.78962L2.38599 3.42448C2.55206 2.91575 2.84217 2.55627 3.26051 2.34816C3.67884 2.14004 4.1098 2.03493 4.55757 2.03493C5.29964 2.03493 5.82729 2.1968 6.14052 2.52264C6.40119 2.79382 6.54835 3.19114 6.58829 3.71038C6.18887 3.76924 5.79576 3.826 5.41737 3.88066C4.78881 3.96895 4.20439 4.06565 3.66833 4.17076C3.13017 4.27587 2.66348 4.39149 2.26407 4.52183C1.73641 4.70052 1.30756 4.92755 0.975417 5.20715C0.64327 5.48674 0.399415 5.81889 0.239647 6.20149C0.0798802 6.58619 0 7.01714 0 7.49434C0 8.04091 0.128229 8.54124 0.382595 8.99531C0.636961 9.44939 1.01326 9.81307 1.50938 10.0864C2.0076 10.3596 2.61513 10.4963 3.33198 10.4963C4.22752 10.4963 4.9759 10.3281 5.57293 9.99386C6.03331 9.73739 6.44954 9.3653 6.81953 8.87969V10.2188H8.76196V4.114C8.76196 3.68516 8.74305 3.28784 8.70731 2.92206C8.66947 2.55627 8.56225 2.1989 8.38567 1.84994H8.38988ZM6.34444 7.08021C6.27086 7.30724 6.12791 7.549 5.91559 7.80757C5.70326 8.06614 5.41947 8.28266 5.0642 8.46135C4.70893 8.64004 4.27797 8.72833 3.77555 8.72833C3.42658 8.72833 3.13228 8.67367 2.89683 8.56226C2.66138 8.45084 2.4806 8.30369 2.35867 8.11659C2.23674 7.9295 2.17367 7.71297 2.17367 7.46701C2.17367 7.25259 2.22202 7.06549 2.31662 6.90572C2.41122 6.74596 2.54787 6.60511 2.72655 6.48318C2.90524 6.36125 3.12176 6.25404 3.38033 6.16155C3.64311 6.07536 3.94793 5.99757 4.29269 5.9261C4.63535 5.85463 5.04738 5.78105 5.52668 5.70116C5.8315 5.65071 6.18047 5.59395 6.56307 5.53299C6.55886 5.70116 6.55255 5.89246 6.54414 6.11109C6.52943 6.47688 6.46215 6.80061 6.34653 7.08231L6.34444 7.08021Z",
  p3ffe2d00: "M4.69001 0.00722592C4.37678 0.0282479 4.07196 0.0871099 3.77345 0.181709C3.47494 0.276308 3.20375 0.406644 2.9578 0.572718C2.66979 0.751405 2.42174 0.97634 2.21573 1.24963C2.12323 1.37366 2.03914 1.50399 1.96136 1.64063V0.0492701H0V9.99267H2.22834V4.93899C2.22834 4.55849 2.27458 4.20321 2.36708 3.87527C2.45958 3.54733 2.60252 3.25302 2.79592 2.99655C2.98932 2.73798 3.23949 2.52776 3.54641 2.36169C3.85333 2.1767 4.19809 2.06948 4.58279 2.04005C4.96539 2.00852 5.30595 2.03795 5.60026 2.12204V0.0513727C5.30595 0.00302213 5.00113 -0.0116934 4.6879 0.00932857L4.69001 0.00722592Z",
  p370d8700: "M6.93094 4.50291V2.76229H4.01309V0H1.80368V2.76229H0V4.50291H1.80368V8.64635C1.80368 9.21184 1.80999 9.71847 1.8226 10.1662C1.83522 10.614 1.95505 11.0534 2.18208 11.4822C2.44065 11.9552 2.81694 12.3 3.31516 12.5186C3.81338 12.7372 4.37468 12.8528 5.00534 12.8676C5.63389 12.8823 6.27716 12.8297 6.93515 12.7057V10.8452C6.315 10.9377 5.76212 10.9609 5.27862 10.9188C4.79511 10.8768 4.43985 10.6708 4.21912 10.3029C4.10349 10.1137 4.04042 9.86772 4.02991 9.56711C4.0194 9.26649 4.0152 8.91753 4.0152 8.51811V4.50501H6.93305L6.93094 4.50291Z",
} as const;

// --- Inlined copyright SVG paths (from svg-auy6aseo9h) ---
const COPYRIGHT_SVG_PATHS = {
  // Circle outline
  p17b05b00: "M5.99997 0C2.69129 0 0 2.69132 0 6C0 9.30868 2.69129 12 5.99997 12C9.30865 12 12.0001 9.30868 12.0001 6C12.0001 2.69132 9.30865 0 5.99997 0ZM5.99997 11.0836C3.1929 11.0836 0.906813 8.79745 0.906813 5.99037C0.906813 3.1833 3.1929 0.897128 5.99997 0.897128C8.80704 0.897128 11.0932 3.1833 11.0932 5.99037C11.0932 8.79745 8.80704 11.0836 5.99997 11.0836Z",
  // "c" inside circle
  p3eabe880: "M7.80409 7.77521C7.63046 8.00672 7.40864 8.19 7.1289 8.32505C6.84916 8.4601 6.52116 8.52762 6.1353 8.52762C5.64334 8.52762 5.23818 8.41188 4.9102 8.19002C4.58223 7.96815 4.34106 7.65946 4.17708 7.27361C4.01309 6.88776 3.93592 6.46331 3.93592 6.00029C3.93592 5.53727 4.01309 5.0839 4.17708 4.70769C4.34106 4.33148 4.58222 4.02281 4.90055 3.81059C5.21888 3.58873 5.62402 3.48262 6.10634 3.48262C6.66582 3.48262 7.10956 3.62732 7.43753 3.90706C7.7655 4.1868 7.95853 4.54372 8.02606 4.96816H9.19322C9.16428 4.44726 9.00032 3.99388 8.73022 3.60803C8.46012 3.22217 8.09356 2.92312 7.64018 2.7109C7.18681 2.49868 6.67547 2.39258 6.10634 2.39258C5.5372 2.39258 5.04532 2.4987 4.62089 2.70127C4.19645 2.90384 3.83956 3.17394 3.55982 3.51156C3.28007 3.84918 3.06782 4.21574 2.92313 4.63053C2.78808 5.04532 2.71094 5.46977 2.71094 5.90385V6.13535C2.71094 6.55014 2.77843 6.96494 2.92313 7.37973C3.06782 7.79452 3.27042 8.17072 3.55016 8.51799C3.8299 8.86526 4.18679 9.13536 4.61123 9.33793C5.03567 9.5405 5.54687 9.64659 6.12565 9.64659C6.70443 9.64659 7.21567 9.54049 7.67869 9.31862C8.14171 9.1064 8.5083 8.79772 8.79769 8.41187C9.07743 8.02601 9.23176 7.563 9.26069 7.03245H8.09353C8.05495 7.32184 7.95853 7.58228 7.7849 7.80414L7.80409 7.77521Z",
} as const;

const footerColumns = [
  {
    heading: 'Contact',
    links: [
      { label: 'About Us', path: '/company/about' },
      { label: 'How It Works', path: '/products/hardened-images' },
      { label: 'Events', path: '/resources/events' },
    ],
  },
  {
    heading: 'Solutions',
    links: [
      { label: 'Enhance SCA', path: '/solutions/software-composition-analysis' },
      { label: 'FIPS Compliance', path: '/solutions/fips-compliance' },
      { label: 'Vulnerability', path: '/solutions/vulnerability-remediation' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { label: 'Contact Us', path: '/company/contact' },
      { label: 'Careers', path: '/company/careers' },
      { label: 'Newsroom', path: '/resources/newsroom' },
      { label: 'Legal', path: '#' },
    ],
  },
  {
    heading: 'Members of',
    links: [
      { label: 'OpenSSF', path: '#' },
      { label: 'Linux Foundation', path: '#' },
      { label: 'Cloud Native', path: '#' },
    ],
  },
];

const badges = ['Docker Verified', 'ISO Certified', 'SOC 2 Compliant'];

const socials = [
  { label: 'X', abbr: 'X' },
  { label: 'LinkedIn', abbr: 'Li' },
  { label: 'GitHub', abbr: 'Gh' },
];

function CleanStartLogo() {
  return (
    <div className="relative w-[126px] h-[26px] shrink-0">
      <div className="absolute inset-0">
        <svg className="absolute" style={{ left: '8.34%', top: '25.9%', width: '12.61px', height: '19.27px' }} fill="none" viewBox="0 0 12.6069 19.2667">
          <path d={LOGO_SVG_PATHS.p33248900} fill="#2CC1EB" />
        </svg>
        <svg className="absolute" style={{ left: '0.29%', top: '0', width: '22.71px', height: '20.76px' }} fill="none" viewBox="0 0 22.7101 20.7634">
          <path d={LOGO_SVG_PATHS.p164f400} fill="white" />
        </svg>
        <svg className="absolute" style={{ left: '23.22%', top: '23.84%', width: '12.31px', height: '13.81px' }} fill="none" viewBox="0 0 12.3063 13.8115">
          <path d={LOGO_SVG_PATHS.p29578200} fill="white" />
        </svg>
        <svg className="absolute" style={{ left: '34.74%', top: '23.84%', width: '2.22px', height: '13.53px' }} fill="none" viewBox="0 0 2.21782 13.534">
          <path d={LOGO_SVG_PATHS.p25a63f40} fill="white" />
        </svg>
        <svg className="absolute" style={{ left: '38.25%', top: '36.59%', width: '9.60px', height: '10.50px' }} fill="none" viewBox="0 0 9.59681 10.4963">
          <path d={LOGO_SVG_PATHS.pfbeab80} fill="white" />
        </svg>
        <svg className="absolute" style={{ left: '46.9%', top: '36.59%', width: '8.76px', height: '10.50px' }} fill="none" viewBox="0 0 8.76406 10.4963">
          <path d={LOGO_SVG_PATHS.p157f1500} fill="white" />
        </svg>
        <svg className="absolute" style={{ left: '55.74%', top: '36.55%', width: '9.14px', height: '10.23px' }} fill="none" viewBox="0 0 9.14457 10.2272">
          <path d={LOGO_SVG_PATHS.p2d484200} fill="white" />
        </svg>
        <svg className="absolute" style={{ left: '64.44%', top: '23.92%', width: '10.69px', height: '13.79px' }} fill="none" viewBox="0 0 10.6897 13.7927">
          <path d={LOGO_SVG_PATHS.p27204200} fill="white" />
        </svg>
        <svg className="absolute" style={{ left: '73.63%', top: '27.03%', width: '6.94px', height: '12.87px' }} fill="none" viewBox="0 0 6.93515 12.87">
          <path d={LOGO_SVG_PATHS.p2ad29300} fill="white" />
        </svg>
        <svg className="absolute" style={{ left: '80.4%', top: '36.59%', width: '8.76px', height: '10.50px' }} fill="none" viewBox="0 0 8.76196 10.4963">
          <path d={LOGO_SVG_PATHS.p234fdc80} fill="white" />
        </svg>
        <svg className="absolute" style={{ left: '89.25%', top: '37.46%', width: '5.60px', height: '9.99px' }} fill="none" viewBox="0 0 5.60026 9.99267">
          <path d={LOGO_SVG_PATHS.p3ffe2d00} fill="white" />
        </svg>
        <svg className="absolute" style={{ left: '94.21%', top: '27.02%', width: '6.94px', height: '12.87px' }} fill="none" viewBox="0 0 6.93515 12.87">
          <path d={LOGO_SVG_PATHS.p370d8700} fill="white" />
        </svg>
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-gradient-to-b from-[#056bf1] via-[#0342a0] to-[#022b6b] relative pt-12 md:pt-[100px] pb-8 md:pb-[50px]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[50px]">
        {/* CTA Banner with overlapping mascot */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          {/* CTA Card wrapper — overflow visible for bird */}
          <div className="relative">
            {/* Kubr Bird Mascot — sits flush on card top edge, no gap */}
            <motion.div
              className="hidden md:block absolute left-[50px] lg:left-[100px] w-[280px] lg:w-[400px] h-[280px] lg:h-[400px] z-10 pointer-events-none"
              style={{ bottom: 'calc(100% - 145px)' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              <img
                src="/Footer/Image (Kubr Bird Mascot).png"
                alt="Kubr - CleanStart mascot"
                className="w-full h-full object-contain"
                style={{ filter: 'drop-shadow(0px 12px 80px rgba(0,0,0,0.35))' }}
              />
            </motion.div>

            {/* CTA Card — light cyan background */}
            <div className="bg-[#cdf5fe] border border-white/15 rounded-[15px] md:rounded-[24px] p-8 md:p-12 lg:p-14 min-h-[250px] md:min-h-[321px] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              {/* Left — Title */}
              <div className="flex flex-col gap-4 max-w-[550px]">
                <h2 className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-black leading-[1.2] tracking-[-0.02em]">
                  Ready to Secure Your Container Infrastructure?
                </h2>
              </div>

              {/* Right — Description + CTA */}
              <div className="flex flex-col gap-6 max-w-[450px] shrink-0">
                <p className="font-['Google_Sans',sans-serif] font-normal text-[14px] md:text-[15px] text-black/60 leading-[1.6]">
                  Start with zero-CVE hardened images. Deploy faster with confidence knowing your containers are secured from the ground up.
                </p>
                <div>
                  <CallToActionButton label="Book a Demo" variant="dark" size="md" href="/book-demo" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Divider - Strong separation between CTA and Footer */}
        <div className="h-[2px] bg-white/25 mt-[80px] md:mt-[120px] mb-[80px] md:mb-[100px]" />

        {/* Footer Links */}
        <motion.div
          className="flex flex-col md:flex-row flex-wrap gap-8 md:gap-0 md:justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          {/* Brand column */}
          <div className="max-w-full md:max-w-[285px]">
            <Link href="/">
              <CleanStartLogo />
            </Link>
            <p className="font-['Google_Sans',sans-serif] font-normal text-[14px] text-white/90 mt-6 md:mt-[50px] leading-normal">
              Hardened container images with zero known vulnerabilities. Secure by design, built for speed.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 md:flex gap-8 md:gap-12 lg:gap-0 lg:justify-between flex-1 lg:ml-16">
          {footerColumns.map((col, i) => (
            <motion.div
              key={col.heading}
              className="flex flex-col gap-[20px]"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.06, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              <h4 className="font-['Google_Sans',sans-serif] font-semibold text-[14px] text-white uppercase tracking-wide mb-4">
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-[12px]">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.path}
                      className="font-['Google_Sans',sans-serif] font-normal text-[14px] text-white hover:text-white/70 transition-colors no-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-white/15 mt-8 md:mt-[50px] mb-6 md:mb-[30px]" />

        {/* Awards row */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-[24px] mb-6 md:mb-[30px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="font-['Google_Sans',sans-serif] font-semibold text-[13px] text-white/40 tracking-[-0.3px]">
            Awarded with
          </span>
          <div className="flex flex-wrap gap-[12px]">
            {badges.map((badge) => (
              <span
                key={badge}
                className="relative bg-white/6 rounded-[12px] px-[16px] py-[13px] font-['Google_Sans',sans-serif] font-normal text-[12px] text-white/50"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 border border-white/8 rounded-[12px] pointer-events-none"
                />
                {badge}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-white/15 mb-4 md:mb-[25px]" />

        {/* Bottom bar */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Copyright */}
          <div className="flex items-center gap-[6px]">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d={COPYRIGHT_SVG_PATHS.p17b05b00} fill="white" fillOpacity="0.5" />
              <path d={COPYRIGHT_SVG_PATHS.p3eabe880} fill="white" fillOpacity="0.5" />
            </svg>
            <span className="font-['Google_Sans',sans-serif] font-normal text-[12px] text-white/50">
              2026 CleanStart. All rights reserved.
            </span>
          </div>

          {/* Legal links */}
          <div className="flex gap-[24px]">
            {['Privacy Policy', 'Terms of Service', 'Security'].map((link) => (
              <a
                key={link}
                href="#"
                className="font-['Google_Sans',sans-serif] font-normal text-[12px] text-white/50 hover:text-white/70 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex gap-[12px]">
            {socials.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="bg-white/10 w-[32px] h-[32px] rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <span className="font-['Google_Sans',sans-serif] font-semibold text-[10px] text-white/60">
                  {s.abbr}
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
