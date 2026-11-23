import React from 'react';
import { NavTab } from '../types/zhixian';

interface BottomNavProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

/**
 * 首页：简约手绘小屋（几笔自然弯曲墨线）
 */
const SketchHomeIcon: React.FC = () => (
  <svg viewBox="0 0 26 24" fill="none" className="w-[23px] h-[21px]" aria-hidden="true">
    <path
      d="M4.2 11.4 C7 8.8, 10.2 6.2, 13.1 4.2 C16.1 6.4, 19 8.9, 21.8 11.2"
      stroke="#292622"
      strokeWidth="1.55"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.8 10.4 C6.9 13.8, 7.1 17.2, 7.2 19.6 C10.8 19.8, 15.2 19.7, 18.8 19.5 C19 17.1, 19.1 13.6, 19.2 10.3"
      stroke="#292622"
      strokeWidth="1.55"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11 19.6 C10.9 17, 11.2 14.5, 13 14.4 C14.8 14.3, 15.1 16.9, 15 19.6"
      stroke="#292622"
      strokeWidth="1.45"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * 陪练：简约手绘对话气泡（几笔歪歪的圆润气泡+小句点）
 */
const SketchPracticeIcon: React.FC = () => (
  <svg viewBox="0 0 26 24" fill="none" className="w-[23px] h-[21px]" aria-hidden="true">
    <path
      d="M5 10.8 C4.9 6.5, 7.8 4.8, 13.1 4.9 C18.5 5, 21.1 6.8, 21 11 C20.9 15.2, 18.2 16.6, 13.2 16.6 C11.5 16.6, 10 16.5, 9 16.4 L5.8 19.4 L6.5 15.6 C5.4 14.5, 5.1 12.8, 5 10.8 Z"
      stroke="#292622"
      strokeWidth="1.55"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.6 10.6 C11.8 10.4, 14.2 10.5, 16.4 10.6 M9.8 13.3 C11.5 13.2, 13.1 13.2, 14.4 13.3"
      stroke="#292622"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * 科普：简约手绘翻开小书页
 */
const SketchScienceIcon: React.FC = () => (
  <svg viewBox="0 0 26 24" fill="none" className="w-[23px] h-[21px]" aria-hidden="true">
    <path
      d="M4.6 6.8 C7.3 5.8, 10.4 6.2, 13 7.8 C15.6 6.2, 18.7 5.8, 21.4 6.8 C21.2 10.6, 21 14.5, 20.8 18.2 C18.2 17.3, 15.5 17.6, 13 19 C10.5 17.6, 7.8 17.3, 5.2 18.2 C5 14.5, 4.8 10.6, 4.6 6.8 Z"
      stroke="#292622"
      strokeWidth="1.55"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13 7.8 C13 11.4, 13 15.2, 13 18.8"
      stroke="#292622"
      strokeWidth="1.35"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * 我的：简约手绘猫咪简笔头像
 */
const SketchProfileIcon: React.FC = () => (
  <svg viewBox="0 0 26 24" fill="none" className="w-[23px] h-[21px]" aria-hidden="true">
    <path
      d="M6.4 12.2 C6 9, 6.2 6, 7.7 5.3 C8.9 4.8, 10.3 6.7, 11.1 8.1 C12.3 7.7, 13.7 7.7, 14.9 8.1 C15.7 6.7, 17.1 4.8, 18.3 5.3 C19.8 6, 20 9, 19.6 12.2 C19.1 16.5, 16.8 18.8, 13 18.8 C9.2 18.8, 6.9 16.5, 6.4 12.2 Z"
      stroke="#292622"
      strokeWidth="1.55"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="10.4" cy="12.3" r="0.95" fill="#292622" />
    <circle cx="15.6" cy="12.3" r="0.95" fill="#292622" />
    <path
      d="M12.2 14.6 C12.7 15.2, 13.3 15.2, 13.8 14.6"
      stroke="#292622"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);

const NAV_ITEMS: { id: NavTab; label: string; Icon: React.FC }[] = [
  { id: 'home', label: '首页', Icon: SketchHomeIcon },
  { id: 'practice', label: '陪练', Icon: SketchPracticeIcon },
  { id: 'science', label: '科普', Icon: SketchScienceIcon },
  { id: 'profile', label: '我的', Icon: SketchProfileIcon },
];

export const MobileBottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
}) => {
  return (
    <nav
      aria-label="底部导航"
      className="shrink-0 bg-[#F3F0E7] pt-1 pb-2 safe-bottom"
    >
      {/* Subtle hand-drawn faint top horizon line */}
      <svg
        viewBox="0 0 360 6"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="w-full h-1.5 mb-0.5 pointer-events-none"
      >
        <path
          d="M14 3.2 C96 2, 232 4.1, 346 2.8"
          stroke="#292622"
          strokeOpacity="0.16"
          strokeWidth="1.15"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="grid grid-cols-4 items-center px-3">
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelectTab(id)}
              aria-current={isActive ? 'page' : undefined}
              className="relative min-h-[56px] flex flex-col items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-[#292622] group"
            >
              {/* Active state: loose hand-drawn vertical oval loop with sage wash (like grug. reference) */}
              {isActive && (
                <svg
                  viewBox="0 0 64 56"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  className="absolute inset-x-1.5 inset-y-0.5 w-[calc(100%-12px)] h-[calc(100%-4px)] pointer-events-none"
                >
                  <path
                    d="M32 3.5 C48 3, 59 12, 59.5 28 C60 44, 48 52.5, 31.5 52.5 C15 52.5, 5 43.5, 4.5 28.5 C4 13, 15.5 4, 32 3.5 Z"
                    fill="#C6D0BC"
                    fillOpacity="0.58"
                    stroke="#292622"
                    strokeWidth="1.35"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              )}

              <span
                className={`relative z-[1] flex flex-col items-center justify-center gap-0.5 transition-opacity ${
                  isActive ? 'opacity-100' : 'opacity-72 group-hover:opacity-100'
                }`}
              >
                <Icon />
                <span className="font-hand text-[15px] leading-none text-[#292622] tracking-wide">
                  {label}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
