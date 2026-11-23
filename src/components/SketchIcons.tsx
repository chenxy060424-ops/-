import React from 'react';

interface IconProps {
  className?: string;
}

export const SketchArrowRight: React.FC<IconProps> = ({
  className = 'w-4 h-4',
}) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
    <path
      d="M3.5 10.4 C7.5 9.6, 11.8 9.8, 16 10.1"
      stroke="currentColor"
      strokeWidth="1.55"
      strokeLinecap="round"
    />
    <path
      d="M11.6 5.6 C13.2 7.4, 15 8.9, 16.5 10.1 C14.8 11.4, 13.1 13, 11.7 14.6"
      stroke="currentColor"
      strokeWidth="1.55"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SketchArrowLeft: React.FC<IconProps> = ({
  className = 'w-4 h-4',
}) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
    <path
      d="M16.5 10.2 C12.4 9.7, 8 9.9, 4 10.3"
      stroke="currentColor"
      strokeWidth="1.55"
      strokeLinecap="round"
    />
    <path
      d="M8.5 5.6 C6.8 7.3, 5.1 8.8, 3.6 10.2 C5.2 11.5, 6.9 13.1, 8.4 14.7"
      stroke="currentColor"
      strokeWidth="1.55"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SketchChevronUp: React.FC<IconProps> = ({
  className = 'w-3.5 h-3.5',
}) => (
  <svg viewBox="0 0 18 18" fill="none" className={className} aria-hidden="true">
    <path
      d="M4.2 11.5 C6 9.3, 7.6 7.4, 9.1 5.8 C10.6 7.5, 12.2 9.4, 13.8 11.4"
      stroke="currentColor"
      strokeWidth="1.55"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SketchChevronDown: React.FC<IconProps> = ({
  className = 'w-3.5 h-3.5',
}) => (
  <svg viewBox="0 0 18 18" fill="none" className={className} aria-hidden="true">
    <path
      d="M4.2 6.5 C6 8.7, 7.6 10.6, 9.1 12.2 C10.6 10.5, 12.2 8.6, 13.8 6.6"
      stroke="currentColor"
      strokeWidth="1.55"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SketchPencil: React.FC<IconProps> = ({
  className = 'w-3.5 h-3.5',
}) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
    <path
      d="M4.2 15.8 L5 12.2 L13.4 3.8 C14.1 3.2, 15.1 3.3, 15.9 4.1 C16.7 4.9, 16.8 5.9, 16.1 6.6 L7.8 15 Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.8 5.5 L14.4 8.1"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
    />
  </svg>
);

export const SketchPaperPlane: React.FC<IconProps> = ({
  className = 'w-4 h-4',
}) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
    <path
      d="M3 9.4 L16.8 3.6 L12.4 16.5 L9.3 11.4 Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.3 11.4 L16.4 3.9"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
    />
  </svg>
);

export const SketchCopy: React.FC<IconProps> = ({
  className = 'w-4 h-4',
}) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
    <path
      d="M7.5 6.8 C7.4 5.2, 8 4.2, 9.6 4.2 L14.6 4.3 C15.8 4.3, 16.3 5, 16.3 6.2 L16.2 12.4 C16.2 13.6, 15.5 14.1, 14.3 14.1"
      stroke="currentColor"
      strokeWidth="1.45"
      strokeLinecap="round"
    />
    <path
      d="M4.3 8.2 C4.2 7.2, 4.9 6.6, 6 6.6 L12 6.7 C13 6.7, 13.6 7.3, 13.6 8.3 L13.5 15 C13.5 16, 12.8 16.5, 11.8 16.5 L5.9 16.4 C4.8 16.4, 4.3 15.8, 4.3 14.8 Z"
      stroke="currentColor"
      strokeWidth="1.45"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SketchCheck: React.FC<IconProps> = ({
  className = 'w-4 h-4',
}) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
    <path
      d="M4.2 10.6 C5.8 12.2, 7.1 13.7, 8.2 14.8 C10.3 11.6, 13 8, 16.2 5.2"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SketchBookmark: React.FC<IconProps> = ({
  className = 'w-4 h-4',
}) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
    <path
      d="M5.6 4.4 C5.6 3.7, 6.2 3.3, 7 3.3 L13 3.4 C13.8 3.4, 14.4 3.9, 14.4 4.7 L14.3 16.5 C12.7 15, 11.3 13.7, 10 12.8 C8.7 13.7, 7.3 15, 5.7 16.5 Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SketchRetry: React.FC<IconProps> = ({
  className = 'w-3.5 h-3.5',
}) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
    <path
      d="M15.8 8.4 C15.1 5.4, 12.5 3.6, 9.6 3.8 C6.1 4, 3.8 6.8, 4 10.3 C4.2 13.8, 6.9 16.2, 10.4 16.1 C12.8 16, 14.7 14.7, 15.6 12.8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M12.4 8.6 L16.1 8.8 L16.2 5.1"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SketchTrash: React.FC<IconProps> = ({
  className = 'w-4 h-4',
}) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
    <path
      d="M4.2 6.2 L15.8 6 M7.8 5.8 C7.8 4.4, 8.6 3.8, 10 3.8 C11.4 3.8, 12.2 4.4, 12.2 5.8"
      stroke="currentColor"
      strokeWidth="1.45"
      strokeLinecap="round"
    />
    <path
      d="M5.6 6.5 L6.4 15.5 C6.5 16.2, 7.1 16.6, 8 16.6 L12 16.6 C12.9 16.6, 13.5 16.2, 13.6 15.5 L14.4 6.5"
      stroke="currentColor"
      strokeWidth="1.45"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.7 9.2 L8.9 13.6 M11.3 9.2 L11.1 13.6"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * 场景与入口的手绘小图案（钥匙、笔记本、问号硬币、小树洞云、小书本）
 */
export const SketchCategoryDoodle: React.FC<{
  category: '租房' | '实习' | '兼职' | '沟通习惯';
  className?: string;
}> = ({ category, className = 'w-5 h-5' }) => {
  if (category === '租房') {
    // Little sketchy key
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M8.5 13.5 C6 13.5, 4.2 11.7, 4.3 9.2 C4.4 6.8, 6.2 5.2, 8.6 5.3 C11 5.4, 12.7 7.1, 12.6 9.4 C12.5 11.7, 10.9 13.5, 8.5 13.5 Z"
          fill="#C6D0BC"
          fillOpacity="0.6"
          stroke="#292622"
          strokeWidth="1.45"
          strokeLinecap="round"
        />
        <path
          d="M12.5 9.6 L19.6 9.9 M16.4 10 L16.3 13 M19.1 10 L19 12.6"
          stroke="#292622"
          strokeWidth="1.45"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (category === '实习') {
    // Little sketchy notepad / badge
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M6.2 5.5 L17.6 5.3 L17.2 18.6 L5.9 18.8 Z"
          fill="#C6D0BC"
          fillOpacity="0.55"
          stroke="#292622"
          strokeWidth="1.45"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 9.6 L14.8 9.5 M9 12.8 L14.4 12.7 M9 15.8 L12.6 15.7"
          stroke="#292622"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (category === '兼职') {
    // Little coin with a question/caution mark
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M12 4.2 C16.6 4, 19.6 7.3, 19.4 12.1 C19.2 16.8, 16 19.6, 11.7 19.4 C7.1 19.2, 4.3 16, 4.5 11.7 C4.7 7.2, 7.6 4.4, 12 4.2 Z"
          fill="#C6D0BC"
          fillOpacity="0.55"
          stroke="#292622"
          strokeWidth="1.45"
          strokeLinecap="round"
        />
        <path
          d="M10.2 9.4 C10.4 8, 13.7 7.8, 13.8 9.6 C13.9 10.9, 12 11.4, 12 12.8"
          stroke="#292622"
          strokeWidth="1.45"
          strokeLinecap="round"
        />
        <circle cx="12" cy="15.3" r="0.9" fill="#292622" />
      </svg>
    );
  }
  // 沟通习惯: little hand-drawn chat wave
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M5 7.5 C5 5.8, 6.6 5.2, 12 5.2 C17.4 5.2, 19 6, 19 10.6 C19 15.2, 17.2 15.8, 12 15.8 L8.5 15.8 L5.6 18.4 L6.2 15 C5.2 14.1, 5 12.4, 5 7.5 Z"
        fill="#C6D0BC"
        fillOpacity="0.55"
        stroke="#292622"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const SketchBookDoodle: React.FC<IconProps> = ({
  className = 'w-5 h-5',
}) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M4.5 7 C7 6, 10 6.4, 12 8 C14 6.4, 17 6, 19.5 7 L19 17.5 C16.6 16.7, 14 17, 12 18.5 C10 17, 7.4 16.7, 5 17.5 Z"
      fill="#C6D0BC"
      fillOpacity="0.5"
      stroke="#292622"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 8 L12 18.5"
      stroke="#292622"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
  </svg>
);

export const SketchCloudDoodle: React.FC<IconProps> = ({
  className = 'w-5 h-5',
}) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M7.2 16.5 C4.8 16.5, 3.6 14.9, 3.8 13 C4 11.4, 5.2 10.3, 6.7 10.2 C7.3 7.7, 9.5 6.3, 12 6.5 C14.6 6.7, 16.3 8.4, 16.6 10.6 C18.5 10.8, 19.8 12.1, 19.7 13.8 C19.6 15.5, 18.2 16.6, 16.2 16.6 Z"
      fill="#C6D0BC"
      fillOpacity="0.5"
      stroke="#292622"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
