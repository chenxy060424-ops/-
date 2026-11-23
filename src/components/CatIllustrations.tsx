import React from 'react';

interface CatProps {
  className?: string;
}

/**
 * 首页小猫：翻开笔记本（略有抖动感的手绘墨线 + 纸面小涂鸦）
 */
export const CatReadingNotebook: React.FC<CatProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 138 96"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Tiny sketchy sparkle doodle near cat */}
    <path
      d="M111 22 L111.5 29 M108 25.5 L115 25.2"
      stroke="#292622"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeOpacity="0.65"
    />
    <path
      d="M28 31 C29.5 29.5, 31 31.5, 32.5 30"
      stroke="#292622"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeOpacity="0.5"
    />

    {/* Subtle sage wash inside open notebook pages */}
    <path
      d="M37 68 C48 64, 59 66, 67 70 C75 66, 86 64, 97 68 L94 81 C85 78, 75 79, 67 84 C59 79, 49 78, 40 81 Z"
      fill="#C6D0BC"
      fillOpacity="0.65"
    />
    {/* Ground sketch stroke */}
    <path
      d="M21 85 C49 86.5, 86 84, 113 85.5"
      stroke="#292622"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeOpacity="0.4"
    />
    {/* Cat ears & head */}
    <path
      d="M49 38 C46.8 29, 46 21.5, 50 18.5 C53 16.3, 57 22, 60 26.8 C64.2 25.2, 70 25.2, 74.2 26.8 C77.2 22, 81 16.3, 84 18.5 C88 21.5, 87 29, 85 38"
      stroke="#292622"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Inner ear sketch ticks */}
    <path
      d="M51 24 L53 28 M82 24 L80 28"
      stroke="#292622"
      strokeWidth="1.15"
      strokeLinecap="round"
      strokeOpacity="0.55"
    />
    <path
      d="M49 38 C45.8 46, 51 54, 67 55 C83 54, 88 46, 85 38"
      stroke="#292622"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    {/* Quiet downward eyes */}
    <path
      d="M56 39.5 C58 41.5, 61 41.5, 62.5 39.5 M72 39.5 C74 41.5, 77 41.5, 78.5 39.5"
      stroke="#292622"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Tiny nose & mouth */}
    <path d="M65.5 45 L68.5 45 L67 46.8 Z" fill="#292622" />
    <path
      d="M64.5 48 C65.8 49.2, 67 48.8, 67 47.2 C67 48.8, 68.2 49.2, 69.5 48"
      stroke="#292622"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
    {/* Whiskers */}
    <path
      d="M41.5 41 L49.5 42 M40.5 46 L48.5 45 M84.5 42 L92.5 41 M85.5 45 L93.5 46"
      stroke="#292622"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeOpacity="0.72"
    />
    {/* Body & curled tail */}
    <path
      d="M52 53 C47 59, 46 65, 48 69 M82 53 C87 59, 88 65, 86 69"
      stroke="#292622"
      strokeWidth="1.55"
      strokeLinecap="round"
    />
    <path
      d="M89 73 C101 72, 109 65, 106 58.5 C104 53.5, 99 56.5, 100 61.5"
      stroke="#292622"
      strokeWidth="1.55"
      strokeLinecap="round"
    />
    {/* Open notebook */}
    <path
      d="M37 68 C48 64, 59 66, 67 70 C75 66, 86 64, 97 68 L94 81 C85 78, 75 79, 67 84 C59 79, 49 78, 40 81 Z"
      stroke="#292622"
      strokeWidth="1.55"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M67 70 L67 84"
      stroke="#292622"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
    {/* Little paws & scribbles */}
    <path
      d="M46 67 C45 71, 50 73, 52 69 M88 67 C89 71, 84 73, 82 69"
      stroke="#292622"
      strokeWidth="1.45"
      strokeLinecap="round"
    />
    <path
      d="M45 73.5 L58 73.5 M46 77 L56 77 M75 73.5 L87 73.5 M76 77 L85 77"
      stroke="#292622"
      strokeWidth="1.15"
      strokeLinecap="round"
      strokeOpacity="0.6"
    />
  </svg>
);

/**
 * 陪练页小猫：拿笔划重点 + 纸角小感叹涂鸦
 */
export const CatHighlighting: React.FC<CatProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 128 84"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Tiny hand-drawn note spark */}
    <path
      d="M89 28 L90 35 M95 30 L93 36"
      stroke="#292622"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeOpacity="0.6"
    />

    {/* Paper note */}
    <path
      d="M70 43 L111 41 L109 69 L68 71 Z"
      stroke="#292622"
      strokeWidth="1.45"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Sage highlight line */}
    <path
      d="M77 56 L102 55"
      stroke="#C6D0BC"
      strokeWidth="5.2"
      strokeLinecap="round"
    />
    <path
      d="M77 49 L98 48 M77 56 L102 55 M77 63 L93 62"
      stroke="#292622"
      strokeWidth="1.15"
      strokeLinecap="round"
      strokeOpacity="0.7"
    />
    {/* Cat head & ears */}
    <path
      d="M27 36 C25 26, 25 18, 29 16 C32 14, 36 20, 39 25 C43 23, 49 23, 53 25 C56 20, 60 14, 63 16 C67 18, 66 27, 64 36"
      stroke="#292622"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M27 36 C24 44, 30 51, 46 51 C61 51, 66 44, 64 36"
      stroke="#292622"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <circle cx="38" cy="36" r="1.45" fill="#292622" />
    <circle cx="53" cy="36" r="1.45" fill="#292622" />
    <path d="M44.5 40.5 L46.5 40.5 L45.5 42 Z" fill="#292622" />
    <path
      d="M43 44 C44.5 45, 46.5 45, 48 44"
      stroke="#292622"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
    <path
      d="M20 38 L28 39 M20 43 L28 42 M62 39 L69 38 M62 42 L69 43"
      stroke="#292622"
      strokeWidth="1.15"
      strokeLinecap="round"
      strokeOpacity="0.68"
    />
    <path
      d="M30 49 C26 58, 26 66, 29 71 L63 71 C64 64, 63 56, 60 49"
      stroke="#292622"
      strokeWidth="1.55"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Pen */}
    <path
      d="M55 56 C62 55, 68 56, 73 55"
      stroke="#292622"
      strokeWidth="1.45"
      strokeLinecap="round"
    />
    <path
      d="M70 47 L80 60"
      stroke="#292622"
      strokeWidth="1.95"
      strokeLinecap="round"
    />
    <path
      d="M80 60 L83 63"
      stroke="#292622"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * 树洞页小猫：趴着安静休息 + 轻柔手绘 z z
 */
export const CatResting: React.FC<CatProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 156 90"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Tiny hand-drawn Zzz */}
    <path
      d="M74 28 L79.5 27.5 L74.5 33 L80 32.6 M85 21 L92 20.5 L85.5 27.5 L92.5 27"
      stroke="#292622"
      strokeOpacity="0.55"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <ellipse
      cx="78"
      cy="70"
      rx="53"
      ry="10"
      fill="#C6D0BC"
      fillOpacity="0.55"
    />
    <path
      d="M24 73 C49 78, 107 78, 132 72"
      stroke="#292622"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeOpacity="0.4"
    />
    <path
      d="M57 59 C66 42, 92 40, 106 51 C115 58, 117 67, 107 70 C94 73, 66 72, 48 70"
      stroke="#292622"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M37 54 C35 46, 35 40, 38 38 C41 36, 44 41, 47 44 C51 42, 57 42, 61 45 C64 41, 67 37, 70 39 C73 41, 72 47, 70 54"
      stroke="#292622"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M37 54 C35 61, 40 67, 53 67 C65 67, 71 61, 70 54"
      stroke="#292622"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M43 55 C45 57, 48 57, 49 55 M57 55 C59 57, 62 57, 63 55"
      stroke="#292622"
      strokeWidth="1.45"
      strokeLinecap="round"
    />
    <path d="M52 58.5 L54 58.5 L53 60 Z" fill="#292622" />
    <path
      d="M39 67 C36 68, 36 71, 42 71 L54 71"
      stroke="#292622"
      strokeWidth="1.45"
      strokeLinecap="round"
    />
    <path
      d="M110 67 C122 66, 129 59, 125 53 C121 48, 114 52, 115 57"
      stroke="#292622"
      strokeWidth="1.55"
      strokeLinecap="round"
    />
    <path
      d="M30 56 L36 57 M30 60 L36 59.5"
      stroke="#292622"
      strokeWidth="1.15"
      strokeLinecap="round"
      strokeOpacity="0.6"
    />
  </svg>
);

/**
 * 极简手绘弯曲小箭头
 */
export const SketchArrowDownLeft: React.FC<CatProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 36 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M31 4 C22 7, 13 13, 8 22"
      stroke="#292622"
      strokeWidth="1.45"
      strokeLinecap="round"
    />
    <path
      d="M6 15 L7.5 23 L15 20.5"
      stroke="#292622"
      strokeWidth="1.45"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
