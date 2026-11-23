import React from 'react';

interface SketchProps {
  className?: string;
}

/**
 * 随性的手绘墨线波浪分割线
 */
export const SketchWaveDivider: React.FC<SketchProps & { seed?: number }> = ({
  className = '',
  seed = 0,
}) => {
  const paths = [
    'M2 4 C68 1.5, 140 6.5, 218 3 C265 1.2, 296 4.8, 318 3.2',
    'M2 3.5 C85 6.2, 165 1.4, 244 4.5 C280 5.8, 302 2.2, 318 3.6',
    'M2 2.8 C54 5.5, 128 1.8, 198 4.2 C250 5.8, 290 2.5, 318 3.4',
  ];
  return (
    <svg
      viewBox="0 0 320 8"
      fill="none"
      preserveAspectRatio="none"
      className={`w-full h-2 pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <path
        d={paths[seed % paths.length]}
        stroke="#292622"
        strokeOpacity="0.22"
        strokeWidth="1.2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

/**
 * 灰绿马克笔轻扫高亮底纹
 */
export const SageBrushMark: React.FC<SketchProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 200 22"
    fill="none"
    preserveAspectRatio="none"
    className={`pointer-events-none ${className}`}
    aria-hidden="true"
  >
    <path
      d="M4 13 C46 7, 138 6, 195 11 C198 14, 194 19, 184 18 C132 15, 58 17, 9 19 C3 19, 1 15, 4 13 Z"
      fill="#C6D0BC"
      fillOpacity="0.76"
    />
  </svg>
);

/**
 * 有机水彩墨晕（放在小猫或树洞背景处，增加柔和层次）
 */
export const SageWatercolorWash: React.FC<SketchProps> = ({
  className = '',
}) => (
  <svg
    viewBox="0 0 180 110"
    fill="none"
    className={`pointer-events-none ${className}`}
    aria-hidden="true"
  >
    <path
      d="M36 32 C68 10, 126 14, 152 38 C176 60, 166 94, 122 98 C78 102, 24 92, 16 66 C10 48, 20 42, 36 32 Z"
      fill="#C6D0BC"
      fillOpacity="0.34"
    />
  </svg>
);

/**
 * 手绘小回形针（别在推荐情景或便签纸角上）
 */
export const SketchPaperclip: React.FC<SketchProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 38"
    fill="none"
    className={`pointer-events-none ${className}`}
    aria-hidden="true"
  >
    <path
      d="M8 14 L8 27 C8 32, 16 32, 16 26.5 L16 8.5 C16 3.5, 6 3.5, 6 9 L6 23 C6 26.2, 11.8 26.5, 11.8 23 L11.8 11.5"
      stroke="#292622"
      strokeOpacity="0.72"
      strokeWidth="1.45"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * 迷你猫爪小印章（用于练习反馈与结果页点缀）
 */
export const SketchPawStamp: React.FC<SketchProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={`pointer-events-none ${className}`}
    aria-hidden="true"
  >
    <path
      d="M8.5 16.5 C8 13.8, 10 12.2, 12 12.2 C14 12.2, 16 13.8, 15.5 16.5 C15 18.2, 9 18.2, 8.5 16.5 Z"
      fill="#C6D0BC"
      stroke="#292622"
      strokeWidth="1.2"
    />
    <circle cx="7.2" cy="10.2" r="1.4" fill="#C6D0BC" stroke="#292622" strokeWidth="1.15" />
    <circle cx="10.4" cy="8.2" r="1.4" fill="#C6D0BC" stroke="#292622" strokeWidth="1.15" />
    <circle cx="13.8" cy="8.2" r="1.4" fill="#C6D0BC" stroke="#292622" strokeWidth="1.15" />
    <circle cx="16.8" cy="10.4" r="1.4" fill="#C6D0BC" stroke="#292622" strokeWidth="1.15" />
  </svg>
);

/**
 * 树洞夜空小月牙与星点（安静点缀）
 */
export const SketchMoonStars: React.FC<SketchProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 120 40"
    fill="none"
    className={`pointer-events-none ${className}`}
    aria-hidden="true"
  >
    <path
      d="M24 12 C18 14, 17 23, 24 27 C17 28, 12 22, 13 16 C14 10, 19 9, 24 12 Z"
      fill="#C6D0BC"
      fillOpacity="0.6"
      stroke="#292622"
      strokeOpacity="0.5"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M62 11 L62.4 16 M60 13.5 L64.8 13.3"
      stroke="#292622"
      strokeOpacity="0.38"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M98 20 L98.3 24.5 M96.2 22.3 L100.5 22.1"
      stroke="#292622"
      strokeOpacity="0.32"
      strokeWidth="1.15"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * 陪练轮次手绘进度珠（3颗手绘小圆点）
 */
export const SketchProgressBeads: React.FC<{
  current: number;
  total: number;
}> = ({ current, total }) => (
  <div
    className="flex items-center gap-1.5"
    aria-label={`第 ${current} 轮，共 ${total} 轮`}
  >
    {Array.from({ length: total }).map((_, idx) => {
      const round = idx + 1;
      const done = round < current;
      const active = round === current;
      return (
        <React.Fragment key={round}>
          <span className="relative w-3.5 h-3.5 inline-flex items-center justify-center">
            <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
              <path
                d="M8 2 C11.8 1.8, 14.2 4.5, 14 8.2 C13.8 11.8, 11.2 14.2, 7.8 14 C4.2 13.8, 1.8 11.2, 2 7.8 C2.2 4.4, 4.6 2.2, 8 2 Z"
                fill={active ? '#C6D0BC' : done ? '#292622' : 'transparent'}
                fillOpacity={active ? 0.95 : done ? 0.78 : 0}
                stroke="#292622"
                strokeOpacity={active || done ? 0.9 : 0.35}
                strokeWidth="1.25"
              />
            </svg>
          </span>
          {round < total && (
            <span className="w-3 h-[1.2px] bg-[#292622]/25 rounded-full" />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

/**
 * 不拘谨的手绘不规则方框外壳
 */
interface SketchPaperBoxProps {
  children: React.ReactNode;
  className?: string;
  fillClass?: string;
  tilt?: 'left' | 'right' | 'none';
  variant?: 'note' | 'dashed' | 'offset';
  showTape?: boolean;
  showClip?: boolean;
}

export const SketchPaperBox: React.FC<SketchPaperBoxProps> = ({
  children,
  className = '',
  fillClass = 'bg-[#FAF8F3]/88',
  tilt = 'none',
  variant = 'note',
  showTape = false,
  showClip = false,
}) => {
  const tiltClass =
    tilt === 'left'
      ? '-rotate-[0.65deg]'
      : tilt === 'right'
        ? 'rotate-[0.55deg]'
        : '';

  const outlinePath =
    variant === 'offset'
      ? 'M8 5 C88 2.5, 210 3.5, 311 6 C316 7, 317 34, 316 96 C315 148, 316 178, 311 193 C232 197, 108 196, 9 194 C4 192, 3.5 142, 4 94 C4.5 42, 3.5 9, 8 5 Z'
      : 'M7 6 C92 3, 224 4.5, 312 5.5 C316 9, 317 56, 315 118 C316 160, 315 186, 310 194 C216 196, 96 195, 8 193 C4 186, 3.5 130, 4.5 76 C4 34, 4.5 11, 7 6 Z';

  return (
    <div className={`relative ${tiltClass} ${className}`}>
      {variant === 'offset' && (
        <div
          aria-hidden="true"
          className="absolute inset-0 translate-x-[4px] translate-y-[4px] bg-[#C6D0BC]/48 rounded-[22px_16px_24px_14px/16px_22px_14px_20px] pointer-events-none"
        />
      )}

      {showTape && (
        <svg
          viewBox="0 0 56 18"
          fill="none"
          aria-hidden="true"
          className="absolute -top-2.5 left-6 w-12 h-4 z-10 pointer-events-none -rotate-3"
        >
          <path
            d="M3 4 L52 2 L54 14 L2 16 Z"
            fill="#C6D0BC"
            fillOpacity="0.9"
            stroke="#292622"
            strokeWidth="1.15"
            strokeOpacity="0.55"
          />
        </svg>
      )}

      {showClip && (
        <SketchPaperclip className="absolute -top-3.5 right-4 w-5 h-8 z-10 rotate-6" />
      )}

      <div
        className={`relative rounded-[20px_15px_22px_14px/14px_20px_15px_22px] ${fillClass}`}
      >
        <svg
          viewBox="0 0 320 200"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <path
            d={outlinePath}
            stroke="#292622"
            strokeOpacity={variant === 'dashed' ? '0.48' : '0.78'}
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={variant === 'dashed' ? '5 4' : undefined}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className="relative z-[1]">{children}</div>
      </div>
    </div>
  );
};

/**
 * 手绘对话气泡（左侧对方 / 右侧自己）
 */
interface SketchBubbleProps {
  children: React.ReactNode;
  side?: 'left' | 'right';
  className?: string;
}

export const SketchSpeechBubble: React.FC<SketchBubbleProps> = ({
  children,
  side = 'left',
  className = '',
}) => {
  const isLeft = side === 'left';
  return (
    <div
      className={`relative ${
        isLeft ? 'mr-3 -rotate-[0.35deg]' : 'ml-5 rotate-[0.35deg]'
      } ${className}`}
    >
      <div
        className={`relative px-4 py-3.5 ${
          isLeft
            ? 'bg-[#FAF8F3]/92 rounded-[22px_18px_20px_10px/16px_22px_18px_20px]'
            : 'bg-[#C6D0BC]/56 rounded-[18px_22px_10px_20px/20px_16px_22px_18px]'
        }`}
      >
        <svg
          viewBox="0 0 320 140"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <path
            d={
              isLeft
                ? 'M10 6 C96 2.5, 232 3.5, 310 7 C316 14, 317 64, 314 128 C312 134, 240 136, 134 135 C76 135, 36 135, 18 134 C8 133, 4 124, 5 104 C4 62, 5 16, 10 6 Z'
                : 'M10 7 C92 3, 224 3.5, 310 6 C315 16, 316 64, 315 112 C315 128, 308 134, 294 134 C216 135, 92 135, 14 133 C6 130, 4 114, 5 72 C4.5 34, 5 13, 10 7 Z'
            }
            stroke="#292622"
            strokeOpacity={isLeft ? '0.82' : '0.58'}
            strokeWidth="1.4"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <svg
          viewBox="0 0 20 16"
          fill="none"
          aria-hidden="true"
          className={`absolute -bottom-[11px] w-5 h-4 pointer-events-none ${
            isLeft ? 'left-5' : 'right-5 -scale-x-100'
          }`}
        >
          <path
            d="M4 1 C5 7, 3 11, 1 14 C7 11, 12 7, 16 1"
            fill={isLeft ? '#FAF8F3' : '#DDE3D5'}
            stroke="#292622"
            strokeOpacity={isLeft ? '0.82' : '0.58'}
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="relative z-[1]">{children}</div>
      </div>
    </div>
  );
};

/**
 * 创意手绘感主按钮
 */
interface SketchButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  tone?: 'sage' | 'paper';
}

export const SketchPillButton: React.FC<SketchButtonProps> = ({
  children,
  tone = 'sage',
  className = '',
  disabled,
  ...rest
}) => {
  return (
    <button
      {...rest}
      disabled={disabled}
      className={`group relative inline-flex items-center justify-center min-h-[48px] px-6 py-3 cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed active:translate-y-[1px] transition-transform ${className}`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 translate-x-[2.5px] translate-y-[2.5px] rounded-[26px_20px_24px_18px/20px_26px_18px_24px] transition-transform group-hover:translate-x-[3.5px] group-hover:translate-y-[3.5px] ${
          tone === 'sage' ? 'bg-[#C6D0BC]' : 'bg-[#FAF8F3]'
        }`}
      />
      <svg
        viewBox="0 0 240 52"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <path
          d="M18 4 C76 1.8, 168 2.2, 222 4.5 C235 6, 238 18, 237 27 C236 39, 231 47, 217 48 C154 50, 78 49, 21 47.5 C7 46, 3 36, 3.5 25 C4 13, 8 5.5, 18 4 Z"
          stroke="#292622"
          strokeWidth="1.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span className="relative z-[1] inline-flex items-center justify-center gap-2 text-[15px] font-semibold text-[#292622]">
        {children}
      </span>
    </button>
  );
};

/**
 * 序号小圆圈
 */
export const SketchNumberBadge: React.FC<{ num: string; className?: string }> = ({
  num,
  className = '',
}) => (
  <span
    className={`relative inline-flex items-center justify-center w-7 h-7 text-[12px] font-medium text-[#292622] tabular-nums shrink-0 ${className}`}
  >
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    >
      <path
        d="M16 3 C23 2.5, 29 8, 29 16 C29 24, 23.5 29, 15.5 29 C7.5 29, 3 23, 3.5 15.5 C4 8, 9 3.5, 16 3 Z"
        fill="#C6D0BC"
        fillOpacity="0.48"
        stroke="#292622"
        strokeOpacity="0.7"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
    <span className="relative z-[1]">{num}</span>
  </span>
);
