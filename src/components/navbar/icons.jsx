const ChevronDownIcon = ({ fill, size, width = 24, height = 24, ...props }) => {
  return (
    <svg
      fill="none"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
};

const TagUserIcon = ({ fill, size, width = 24, height = 24, ...props }) => {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18 18.86h-.76c-.8 0-1.56.31-2.12.87l-1.71 1.69c-.78.77-2.05.77-2.83 0l-1.71-1.69c-.56-.56-1.33-.87-2.12-.87H6c-1.66 0-3-1.33-3-2.97V4.98c0-1.64 1.34-2.97 3-2.97h12c1.66 0 3 1.33 3 2.97v10.91c0 1.63-1.34 2.97-3 2.97Z"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M12 10a2.33 2.33 0 1 0 0-4.66A2.33 2.33 0 0 0 12 10ZM16 15.66c0-1.8-1.79-3.26-4-3.26s-4 1.46-4 3.26"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

const ServerIcon = ({ fill, size, width = 24, height = 24, ...props }) => {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19.32 10H4.69c-1.48 0-2.68-1.21-2.68-2.68V4.69c0-1.48 1.21-2.68 2.68-2.68h14.63C20.8 2.01 22 3.22 22 4.69v2.63C22 8.79 20.79 10 19.32 10ZM19.32 22H4.69c-1.48 0-2.68-1.21-2.68-2.68v-2.63c0-1.48 1.21-2.68 2.68-2.68h14.63c1.48 0 2.68 1.21 2.68 2.68v2.63c0 1.47-1.21 2.68-2.68 2.68ZM6 5v2M10 5v2M6 17v2M10 17v2M14 6h4M14 18h4"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

const FlashIcon = ({ fill, size, width = 24, height = 24, ...props }) => {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.09 13.28h3.09v7.2c0 1.68.91 2.02 2.02.76l7.57-8.6c.93-1.05.54-1.92-.87-1.92h-3.09v-7.2c0-1.68-.91-2.02-2.02-.76l-7.57 8.6c-.92 1.06-.53 1.92.87 1.92Z"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
};

const ActivityIcon = ({ fill, size, width = 24, height = 24, ...props }) => {
  return (
    <svg
      data-name="Iconly/Curved/Activity"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      >
        <path d="M6.918 14.854l2.993-3.889 3.414 2.68 2.929-3.78" />
        <path d="M19.668 2.35a1.922 1.922 0 11-1.922 1.922 1.921 1.921 0 011.922-1.922z" />
        <path d="M20.756 9.269a20.809 20.809 0 01.194 3.034c0 6.938-2.312 9.25-9.25 9.25s-9.25-2.312-9.25-9.25 2.313-9.25 9.25-9.25a20.931 20.931 0 012.983.187" />
      </g>
    </svg>
  );
};

const ScaleIcon = ({ fill, size, width = 24, height = 24, ...props }) => {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7ZM18 6 6 18"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M18 10V6h-4M6 14v4h4"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

const Article = ({ fill, size, width = 24, height = 24, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        opacity={0.4}
        d="M15.48 3H7.52C4.07 3 2 5.06 2 8.52v7.95C2 19.94 4.07 22 7.52 22h7.95c3.46 0 5.52-2.06 5.52-5.52V8.52C21 5.06 18.93 3 15.48 3Z"
        fill={fill}
      />
      <path
        d="M21.02 2.98c-1.79-1.8-3.54-1.84-5.38 0L14.51 4.1c-.1.1-.13.24-.09.37.7 2.45 2.66 4.41 5.11 5.11.03.01.08.01.11.01.1 0 .2-.04.27-.11l1.11-1.12c.91-.91 1.36-1.78 1.36-2.67 0-.9-.45-1.79-1.36-2.71ZM17.86 10.42c-.27-.13-.53-.26-.77-.41-.2-.12-.4-.25-.59-.39-.16-.1-.34-.25-.52-.4-.02-.01-.08-.06-.16-.14-.31-.25-.64-.59-.95-.96-.02-.02-.08-.08-.13-.17-.1-.11-.25-.3-.38-.51-.11-.14-.24-.34-.36-.55-.15-.25-.28-.5-.4-.76-.13-.28-.23-.54-.32-.79L7.9 10.72c-.35.35-.69 1.01-.76 1.5l-.43 2.98c-.09.63.08 1.22.47 1.61.33.33.78.5 1.28.5.11 0 .22-.01.33-.02l2.97-.42c.49-.07 1.15-.4 1.5-.76l5.38-5.38c-.25-.08-.5-.19-.78-.31Z"
        fill={fill}
      />
    </svg>
  );
};

export const Troll = ({ fill, size, width = 60, height = 60, ...props }) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 1024.000000 1024.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,1024.000000) scale(0.100000,-0.100000)"
        fill={fill}
        stroke="none"
      >
        <path
          d="M4910 10230 c-485 -61 -854 -284 -1044 -631 -44 -80 -79 -167 -96
-238 -9 -38 -16 -51 -27 -47 -7 3 -65 11 -127 17 -129 13 -226 4 -320 -32 -93
-34 -154 -90 -221 -201 -11 -18 -40 -43 -65 -56 -43 -22 -53 -23 -195 -19
-130 4 -184 11 -410 56 -382 77 -503 78 -521 6 -27 -108 219 -347 502 -488
256 -128 518 -171 724 -117 91 23 359 121 534 195 60 25 110 44 111 43 1 -2
10 -39 20 -83 30 -141 94 -316 175 -480 128 -261 239 -416 425 -594 204 -194
402 -297 634 -331 146 -22 314 3 477 71 169 70 389 247 537 429 197 244 362
580 437 890 13 52 24 96 25 97 1 2 72 -26 159 -62 206 -85 385 -149 488 -176
324 -85 786 78 1094 385 140 140 169 a222 92 262 -50 26 -205 13 -438 -36 -264
-55 -370 -70 -498 -70 -144 0 -178 16 -244 117 -105 159 -264 220 -514 194
-62 -6 -119 -14 -127 -17 -11 -4 -21 18 -41 81 -134 428 -497 721 -1011 816
-127 23 -417 33 -535 19z"
        />
        <path
          d="M3565 8479 c-157 -67 -396 -149 -480 -164 -60 -12 -123 -16 -188 -13
l-99 4 -71 -76 c-317 -337 -548 -816 -636 -1320 -61 -347 -57 -759 10 -1150
75 -434 251 -944 490 -1421 151 -302 206 -377 318 -432 61 -30 73 -32 166 -32
90 0 106 3 159 29 176 87 263 276 210 456 -9 30 -47 112 -86 182 -91 166 -205
414 -283 613 -160 407 -240 773 -252 1145 -12 378 51 695 197 995 64 131 159
281 170 268 16 -19 730 -2930 730 -2977 0 -45 -5 -55 -68 -135 -333 -422 -627
-977 -782 -1481 -251 -815 -247 -1676 12 -2480 49 -152 105 -247 193 -328 318
-291 828 -173 988 228 57 145 59 276 6 448 -65 209 -106 400 -131 602 -16 135
-16 485 0 620 54 444 206 875 449 1277 114 189 271 401 381 516 l46 47 108 0
107 0 76 -87 c339 -387 602 -886 724 -1368 130 -516 116 -1012 -46 -1560 -71
-243 -68 -373 13 -543 51 -107 168 -224 274 -275 258 -124 549 -70 735 135 69
77 115 165 158 308 116 379 168 677 186 1060 42 891 -221 1795 -754 2590 -57
85 -144 206 -193 269 l-89 114 5 51 c4 55 720 2956 732 2969 10 12 110 -146
169 -266 273 -563 265 -1264 -24 -2059 -76 -209 -129 -328 -279 -622 l-131
-260 0 -101 c0 -93 2 -105 32 -166 39 -80 111 -150 191 -187 50 -23 70 -27
157 -27 88 0 107 3 157 27 120 56 161 111 328 448 304 609 466 1133 526 1693
22 210 15 595 -16 791 -49 319 -155 643 -296 903 -94 173 -277 425 -383 528
l-42 40 -98 -3 c-141 -5 -241 17 -496 110 -121 44 -227 84 -236 89 -13 6 -19
-3 -33 -49 -130 -418 -382 -818 -667 -1058 -365 -308 -741 -398 -1125 -269
-476 159 -921 686 -1120 1328 -10 31 -20 57 -23 56 -3 0 -37 -14 -76 -30z"
        />
      </g>
    </svg>
  );
};

export const Mail = ({ fill, size, height, width, ...props }) => {
  return (
    <svg
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M12 20.5H7c-3 0-5-1.5-5-5v-7c0-3.5 2-5 5-5h10c3 0 5 1.5 5 5v3" />
        <path d="M17 9l-3.13 2.5a3.166 3.166 0 01-3.75 0L7 9M19.21 14.77l-3.539 3.54a1.232 1.232 0 00-.3.59l-.19 1.35a.635.635 0 00.76.76l1.35-.19a1.189 1.189 0 00.59-.3l3.54-3.54a1.365 1.365 0 000-2.22 1.361 1.361 0 00-2.211.01zM18.7 15.28a3.185 3.185 0 002.22 2.22" />
      </g>
    </svg>
  );
};

export const Logout = ({ fill, size, height, width, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={fill}

      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-log-out"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1={21} y1={12} x2={9} y2={12} />
    </svg>
  );
};

export const UserIcon = ({
  fill = 'currentColor',
  filled,
  size,
  height,
  width,
  label,
  ...props
}) => {
  return (
    <svg
      data-name="Iconly/Curved/Profile"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size || width || 24}
      height={size || height || 24}
      {...props}
    >
      <g
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      >
        <path
          data-name="Stroke 1"
          d="M11.845 21.662C8.153 21.662 5 21.088 5 18.787s3.133-4.425 6.845-4.425c3.692 0 6.845 2.1 6.845 4.4s-3.134 2.9-6.845 2.9z"
        />
        <path
          data-name="Stroke 3"
          d="M11.837 11.174a4.372 4.372 0 10-.031 0z"
        />
      </g>
    </svg>
  );
}


export const icons = {
  chevron: <ChevronDownIcon fill="currentColor" size={16} />,
  scale: <ScaleIcon fill="var(--nextui-colors-warning)" size={30} />,
  activity: <ActivityIcon fill="var(--nextui-colors-secondary)" size={30} />,
  flash: <FlashIcon fill="var(--nextui-colors-primary)" size={30} />,
  server: <ServerIcon fill="var(--nextui-colors-success)" size={30} />,
  user: <TagUserIcon fill="var(--nextui-colors-error)" size={30} />,
  article: <Article fill="var(--nextui-colors-error)" size={30} />,
  troll: <Troll fill="var(--nextui-colors-trollcolor)" size={30} />,
  mail: <Troll fill="var(--nextui-colors-trollcolor)" size={30} />,
  logout: <Logout fill="var(--nextui-colors-primary)" size={30} />,
  userIcon:<UserIcon fill="var(--nextui-colors-primary)" size={30} />,
};
