#!/usr/bin/env python3
"""
Download unique images from CleanStart website pages into separate folders.
Uses concurrent downloads with ThreadPoolExecutor for speed.
"""

import os
import requests
from urllib.parse import unquote, urlparse
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

# Base output directory
BASE_OUTPUT_DIR = "/sessions/zen-intelligent-gates/mnt/public"

# Page data: page_folder_name -> list of unique image URLs
PAGES_DATA = {
    "cleanstart-images": [
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6890aefa59637860b92a5885_Frame%202087327862.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6892eac180a676f6c7aafebe_Frame%202087327862%201%20(1)%201.avif",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/689091aceaa14f15005c3528_Dashboard.avif",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6890964e871971abff582788_Browse%20images%20-%20grid%20view.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68a4ae418fdd6bb861992f8f_how%20it%20works%20-%20Second%20Image.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68a43bce7a42c18ea097da53_mdi_secure-outline.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68a43bc488841856fb631890_dev.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68a43bce9ca1c4b7192e04fb_perforamce.svg",
        "https://cdn.prod.website-files.com/688cb20d0893d821466fe86b/688cb20d0893d821466fe87b_check-line.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68c2679d87b554989be72924_Frame%2079.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68c2679c7c2160513fa5cf2c_Frame%2086.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68c27c6c1403aa78a5665879_Frame%2089.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68c267a0575cbc9ba4d876a6_Frame%2030.svg",
        "https://cdn.prod.website-files.com/688cb20d0893d821466fe86b/688cb20d0893d821466fe88f_Open_Source_Initiative-1%201.webp",
        "https://cdn.prod.website-files.com/688cb20d0893d821466fe86b/688cb20d0893d821466fe883_noun-danger-6405385.svg.svg",
        "https://cdn.prod.website-files.com/67f658bc9c2a9b2bf4940ea7/68766ffb5e88783f7738fa65_Asset%209.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/689207943da69764208c73e6_Asset%2010.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68920794a539280c113363b4_Asset%201.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68920794877158453a873d2b_Asset%202.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6892079405e5a5ecd06fb7f5_Asset%203.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68920794de63dc7bf9d591b0_Asset%206.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/689207941065c3a380bd9ef2_Asset%207.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/689207017c17ef0a583d2768_Asset%204.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68920794eb73df5efbed8a1a_Asset%205.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/689207949569fa3e1bc55ae6_Asset%208.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/689207944a5f38523cf0527f_Asset%209.svg",
    ],
    "software-bill-materials": [
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6890aefa59637860b92a5885_Frame%202087327862.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6892eac180a676f6c7aafebe_Frame%202087327862%201%20(1)%201.avif",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/689091aceaa14f15005c3528_Dashboard.avif",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6890964e871971abff582788_Browse%20images%20-%20grid%20view.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68fb471adb8877e07db44079_Group%201216258773%20(4).png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68ff649b9d02d75f56fb8dd1_Frame%202087327946%20(6).png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68ff649a1362ae2767675641_Frame%202087327948%20(3).png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68ff649802b617b60cfb7518_Frame%202087327946%20(7).png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68ff649897b0ed2bf3de1961_Frame%202087327946%20(8).png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68fb5a2b3f24beaca885f5f5_Group%201216258768.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68f9e7a34749eee592eb2b8d_Group%201216258773.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68f9e7a3052a5af5d7cad4a3_Group%201216258773%20(1).png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68f9e7a2c652f72441daf25d_Group%201216258773%20(2).png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68f9e7a22b4b05dee8a385b8_Group%201216258773%20(3).png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68fa033576e990f8e813ca4a_Group%2048%20(3).png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68e9fd66fce879e7d660be05_tick-circle.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68fa0335dd37a4ace34ed4c7_Group%201216258767.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68ea3e37803952bcf8f0bcc5_check-line.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68fb317e218d570ea818769c_Group%201216258732%20(2).png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68fb317eefebcc27e7f2cc4c_Group%201216258734%20(1).png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68fb317c7ae1032aa598fc88_Group%201216258735%20(1).png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68fb317c0fb4b2efb8733397_Group%201216258736%20(1).png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68faff396b5d7b55005e7fc5_Group%201216258772%20(1).png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68faff3a97c7572fb0ededc5_Group%20228%20(1).png",
    ],
    "cleansight": [
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/69995de7988f9410fbdfda59_Icon%20(12).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/699be6b6d5b98d681003c5dd_Group%201410084165.avif",
        "https://veeraluminium.com/wp-content/uploads/2026/02/Cleansight-hero-secton-vdeo-.gif",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68fb471adb8877e07db44079_Group%201216258773%20(4).png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6999792a11f086a89279fdba_Frame%20(15).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6999792a9fc3d0381ccebec6_image%20213%20%5BVectorized%5D.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6999792a982781470c7abce6_Frame%20(16).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6999792adb0af633bc35948c_image%20215%20%5BVectorized%5D.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/699b4b588f642bd89d91286f_image%20208%20%5BVectorized%5D.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/699b4b58686f7573e1abd554_image%20209%20%5BVectorized%5D.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/699b4b5859a7e89b280a7200_image%20211%20%5BVectorized%5D.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/699b4b580f934b427cf1eacd_image%20212%20%5BVectorized%5D.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/699b563320b6521b71e6acd7_image%20216%20%5BVectorized%5D.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/699b5633b9254eb870528f5e_Container%20(26).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/69a51a1885e0b40737846f6a_CleanSight%20(1).png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/699b5633111cf539e5ee1552_Container%20(25).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/69424e43c2c086e0e8d06b6c_Group%201216258738.svg",
    ],
    "fips": [
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68fb471adb8877e07db44079_Group%201216258773%20(4).png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6942841dd75e26a12bee2a47_Group%201410084147.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6942841dd6dabf7228f73929_Group%201410084146.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6942841d9143d5ea055b7b5e_Group%201410084142.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6942841df43f8fb8ecddff4c_Group%201410084143.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6942841da9272133adb1a568_Group%201410084145.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6891f4760182942c9722dffb_fips-image-2.avif",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6942391c64628e03d59d7c61_Frame%20(10).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/69423ae1241ba4e51fd4ae7d_Frame%202087328325%20(1).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/69423b08679b5871dce1a703_Frame%20(11).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/69423b0a4830e94cdcaec94a_Frame%20(12).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/694288295641241fa904f1df_Frame%202087327946.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6942882909bfb59d8f029b71_Frame%202087327948.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6942882927a2daafe6aa7907_Frame%202087327946-1.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/694288290f80fcf91254413c_Frame%202087327946-2.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/69424e43c2c086e0e8d06b6c_Group%201216258738.svg",
    ],
    "software-composition-analysis": [
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/688cb1df5bbf5068ddce4540_Frame%201216258617.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/688cb1df5bbf5068ddce453f_Frame%201216258613.webp",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6890b3e83db8ab82ac1929a7_open%20source.svg",
        "https://cdn.prod.website-files.com/67f658bc9c2a9b2bf4940ea7/68766ffb5e88783f7738fa62_noun-danger-6405385.svg.svg",
        "https://cdn.prod.website-files.com/67f658bc9c2a9b2bf4940ea7/68766ffb5e88783f7738fa65_Asset%209.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68930115454777c4b897b916_icon.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/688cb1df5bbf5068ddce453e_Group%201216258633.webp",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/688cb1df5bbf5068ddce4541_check-line.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/688cb1df5bbf5068ddce4543_Group%201216258732.webp",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/688cb1df5bbf5068ddce4542_Group%201216258733.webp",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6891ece2b11ad92178cdf9da_Frame%202087327876%202.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/688cb1df5bbf5068ddce4547_default-solid-dark%201.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6891ee3fa8cb4ebd6242e2b2__Vector%2021%202.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/688cb1df5bbf5068ddce4549_Asset%209.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/688cb1df5bbf5068ddce4544_Vector%2021.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/688cb1df5bbf5068ddce4545_Vector%2022.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/688cb1df5bbf5068ddce454a_Group%201216258736%20(1).png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/688cb1df5bbf5068ddce454c_Group%201216258736.png",
    ],
    "vulnerability-remediation": [
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6890aefa59637860b92a5885_Frame%202087327862.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6892eac180a676f6c7aafebe_Frame%202087327862%201%20(1)%201.avif",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/689091aceaa14f15005c3528_Dashboard.avif",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6890964e871971abff582788_Browse%20images%20-%20grid%20view.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68ee30e848913abd5ae7fd10_Group%2048%20(2).png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68f0e199803af583158c8b7e_Frame%202087327946%20(2).png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68f0e199f936c142e24a4b32_Frame%202087327948%20(1).png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68f0e19a1d15a70d56bf553b_Frame%202087327946%20(1).png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68f0e19b10ff100184ca8993_Frame%202087327946.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68e9fd66fce879e7d660be05_tick-circle.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68ee2f2e20d4600cb8a33293_Group%201216258750.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68ec87cd468403e3ee0ec1e3_Group%201216258732%20(1).png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68ec87cd310e7539b5cb2597_Group%201216258734.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68ec87cc6f791a85d9cc530a_Group%201216258736.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68ec87cc6f791a85d9cc52f6_Group%201216258735.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68ec7c6eb04ac11dd07d39ff_Group%201216258751.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/68ec7c6f03f05ee922b904dd_Group%20228.svg",
    ],
    "attack-surface-reduction": [
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6890aefa59637860b92a5885_Frame%202087327862.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695b8950ce09f8c901c71fb2_Component%20115.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695b9e9ebcbd3be3bbcfdc27_Icon%20(6).png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695b9e9c39cd559a1febbdcc_Icon%20(7).png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695ba4290d4025d96c2b5289_Icon%20(9).png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695b9e9a9d46f275ece772a1_Group%201216258784.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695c936b69cdd4ffda70aeba_Group%201410084130%20(1).png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695c936b81de7a16523ba681_Group%201216258836.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695c936adf03b293dbf00ba0_Group%201410084131%20(1).png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695c936a8872d4633f31bfe4_Group%201410084132.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/699007d916a1ac1f56800e5d_Rectangle%204261%20(3).avif",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/699007d9dfc629472234f9c0_Rectangle%204262.avif",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695e053d1a72b7cda2ec573d_Rectangle%204261%20(1).avif",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695e053cc88806137e8420c9_Rectangle%204261%20(2).avif",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695caa352326a77729dc7750_Group%201216258822.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695caa36063c326be955ea4e_Group%201216258823.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695caa36edff1ee361b41673_Group%201216258826.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695cbc70f58c80c30ba7ecd6_Group%201216258832.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695cbb6915a3e0ccc830e113_Vector%20(9).png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695ccb4d5b7c688655abefd4_Container%20(7)%20(1).png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695cbc5efef4cb2bf204ca44_Group%201216258835.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695b7cfb66b4b0b0099dfcce_Group%201410084122%20(1).png",
    ],
    "for-developers": [
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695e42221220d2c88880edc4_Icon%20(4).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695e4222ac67ca371abc7e23_Icon%20(5).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695e4221ac2a686903892278_Icon%20(6).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695e42212066c087f4d05e3f_Icon%20(7).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695e42219656fe1e07579a3d_Icon%20(8).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695e42211fb96eabf39d7b7a_Icon%20(9).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/690b21a67c2f5bed9adc54ff_Group%201410084126.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695f35f9cc414f06a603c834_Frame%202087328320.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695e434114fd881c60780343_Frame%201410084126.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6952920922032ff0da6934cd_Frame%201410084125%20(8).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695291aaf4987c1aaee97383_Frame%201410084125%20(1).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695291b54f4f3cb2223fd0bb_Frame%201410084125%20(2).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/69528f0392d082503c79d9bc_Frame%201410084125.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695f35f8884bd175dbac8440_Container%20(22).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695291b8bb002804b936ce38_Frame%201410084125%20(4).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/69529229caa8583b96d49772_Frame%201410084125%20(9).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695291bc3c7f24af51ecd788_Frame%201410084125%20(6).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695291be1aadf47968903cc1_Frame%201410084125%20(7).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/690c406489bcd2f6cebd0481_Previous.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/690c4064d9cc84a24d8ca4d9_Next.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/690b3046b032a1e51fc70e0f_Quote%20Decoration.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6952cde15b5f2edd6ca09014_Icon%20(13).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6952cf048dc30fb6babd0ddc_Container%20(7).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6952cf275b1c889aa76cce7d_Icon%20(14).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6952cfe81da163ec4728a0af_Group%201410084155.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6952d103153d0ccc1b9fd05b_Icon%20(15).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6952cfe8e29eb99a747b1715_Container%20(8).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6952d307cac3eda6eef11e54_Icon%20(16).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/69529b99d36e4f0e136796c5_Group%201410084154.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6952d418804fe9032a4186cd_Vector%20154.svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/69529dac1f07ca758727913c_Icon%20(8).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/69529f019019b961e8a063e6_Frame%20(14).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/69529f972223ff0e8c68c720_Icon%20(9).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/69529f977eda73311741dbfe_Icon%20(10).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/69529f974b2c2f7ed1fc623d_Icon%20(11).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/69529f9688864d7f5a081cb2_Icon%20(12).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6952be5b42d4c1513b2d7fdf_Container%20(2).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6952c6730b2f8edf12a033d1_Container%20(3).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6952c673e93d8db9260db2c1_Container%20(4).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6952c6738dafd211ca7510bf_Container%20(5).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6952c6731071936b7237b2dd_Container%20(6).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/699561ee5e316ac5a21489e6_Group%201410084151.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/699561ee82724668c18f3e5c_Group%201410084148.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/699561ee5e8eb2c7c6f873e5_Group%201410084149.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/699561eee2fc4b3e04bba21b_Group%201410084147.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6959129836d683b198346e3f_Frame%20(41).svg",
    ],
    "for-ciso": [
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6890aefa59637860b92a5885_Frame%202087327862.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/689091aceaa14f15005c3528_Dashboard.avif",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6890964e871971abff582788_Browse%20images%20-%20grid%20view.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6958cc373e42fad24a8778f6_Container%20(20).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6958cc38ba2de3fdc983bc44_Container%20(21).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6958cc35dcc9865a11092115_Container%20(22).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6958cc38f4225c4a86b36bad_Container%20(23).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6958cc353b97874e0094c420_Container%20(24).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6958cc370e1f3af2cdfcbcf6_Container%20(25).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695b7cfb66b4b0b0099dfcce_Group%201410084122%20(1).png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6958d1e686d166513bbc044e_Group%201216258780.png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695f43f986c00439706c5d72_Simplification%20(6).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695f43f9f4a24a6fbf4c51a9_Simplification%20(7).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695f43f9f929599559eb81dc_Simplification%20(8).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/6959129836d683b198346e3f_Frame%20(41).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695f3db641bd0af05cf22114_Simplification%20(1).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695f3db69369725ef13abf68_Simplification%20(2).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695f3db658f4ccf42fe25fab_Simplification%20(3).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695f3db6a4eb9bc0e5bf4088_Simplification%20(5).svg",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695b67eaae90cac91067f9b8_Container%20(6).png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/69590d19cda1499b341397c8_Container%20(2).png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695b66fd0074f26e62c36aef_Container%20(3).png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695b66fc73edb530d9d6c2a6_Container%20(4).png",
        "https://cdn.prod.website-files.com/688cb1df5bbf5068ddce4492/695b66fc11c73bc0526a6ca0_Container%20(5).png",
    ],
}


def should_skip_url(url):
    """Check if URL should be skipped (tracking pixels, etc.)"""
    skip_patterns = ["px.ads", "linkedin.com/collect"]
    return any(pattern in url for pattern in skip_patterns)


def extract_filename_from_url(url):
    """Extract and decode filename from URL"""
    parsed = urlparse(url)
    # Get the last part of the path
    filename = parsed.path.split('/')[-1]
    # URL decode the filename
    filename = unquote(filename)
    return filename


def download_image(url, output_dir):
    """Download a single image from URL to output directory"""
    if should_skip_url(url):
        return None, "SKIPPED (tracking pixel)"

    try:
        filename = extract_filename_from_url(url)
        filepath = os.path.join(output_dir, filename)

        # Check if file already exists
        if os.path.exists(filepath):
            return filename, "EXISTS"

        # Download the image
        response = requests.get(url, timeout=10)
        response.raise_for_status()

        # Write to file
        with open(filepath, 'wb') as f:
            f.write(response.content)

        return filename, "DOWNLOADED"

    except Exception as e:
        return url, f"ERROR: {str(e)}"


def main():
    """Main function to download all images"""

    print("=" * 80)
    print("CleanStart Website Images Downloader")
    print("=" * 80)

    total_downloaded = 0
    total_skipped = 0
    total_exists = 0
    total_errors = 0

    # Process each page
    for page_folder, urls in PAGES_DATA.items():
        # Create folder for this page
        page_output_dir = os.path.join(BASE_OUTPUT_DIR, page_folder)
        Path(page_output_dir).mkdir(parents=True, exist_ok=True)

        print(f"\nProcessing page: {page_folder}")
        print(f"Output directory: {page_output_dir}")
        print(f"Total images to process: {len(urls)}")

        # Download images concurrently
        with ThreadPoolExecutor(max_workers=5) as executor:
            futures = {
                executor.submit(download_image, url, page_output_dir): url
                for url in urls
            }

            page_downloaded = 0
            page_skipped = 0
            page_exists = 0
            page_errors = 0

            for future in as_completed(futures):
                filename, status = future.result()

                if status == "DOWNLOADED":
                    page_downloaded += 1
                    total_downloaded += 1
                    print(f"  ✓ {filename}")
                elif status == "EXISTS":
                    page_exists += 1
                    total_exists += 1
                    print(f"  - {filename} (already exists)")
                elif status == "SKIPPED (tracking pixel)":
                    page_skipped += 1
                    total_skipped += 1
                    print(f"  ⊘ {filename} (tracking pixel)")
                else:
                    page_errors += 1
                    total_errors += 1
                    print(f"  ✗ {filename}")

        print(f"\n  Page Summary:")
        print(f"    Downloaded: {page_downloaded}")
        print(f"    Already exist: {page_exists}")
        print(f"    Skipped: {page_skipped}")
        print(f"    Errors: {page_errors}")

    # Final summary
    print("\n" + "=" * 80)
    print("FINAL SUMMARY")
    print("=" * 80)
    print(f"Total Downloaded: {total_downloaded}")
    print(f"Total Already Exist: {total_exists}")
    print(f"Total Skipped: {total_skipped}")
    print(f"Total Errors: {total_errors}")
    print(f"Total Processed: {total_downloaded + total_exists + total_skipped + total_errors}")
    print("=" * 80)


if __name__ == "__main__":
    main()
