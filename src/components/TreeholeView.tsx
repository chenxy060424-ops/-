import React, { useRef, useState } from 'react';
import { CatResting } from './CatIllustrations';
import { SketchArrowLeft, SketchCloudDoodle } from './SketchIcons';
import {
  SageWatercolorWash,
  SketchMoonStars,
  SketchPaperBox,
  SketchPillButton,
} from './SketchPrimitives';
import { addTreeholeEntry } from '../services/storageService';

interface TreeholeViewProps {
  onBack: () => void;
  onGoToMyTreehole: () => void;
}

type TreeholeStep = 'landing' | 'compose' | 'saved';

export const TreeholeView: React.FC<TreeholeViewProps> = ({
  onBack,
  onGoToMyTreehole,
}) => {
  const [step, setStep] = useState<TreeholeStep>('landing');
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSave = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    addTreeholeEntry(trimmed);
    setText('');
    setStep('saved');
  };

  const handleClear = () => {
    setText('');
    textareaRef.current?.focus();
  };

  return (
    <div className="h-full paper-grain flex flex-col">
      <header className="shrink-0 px-5 py-3 flex items-center justify-between">
        <button
          type="button"
          onClick={step === 'compose' ? () => setStep('landing') : onBack}
          className="min-h-[44px] px-2 -ml-2 inline-flex items-center gap-1.5 text-[14px] text-[#615C54] hover:text-[#292622] cursor-pointer"
        >
          <SketchArrowLeft className="w-4 h-4" />
          <span>{step === 'compose' ? '先退一步' : '返回'}</span>
        </button>

        <span className="inline-flex items-center gap-1 text-[12.5px] text-[#615C54]">
          <SketchCloudDoodle className="w-4 h-4" />
          <span>宽慰树洞</span>
        </span>
      </header>

      {step === 'landing' && (
        <main className="flex-1 flex flex-col items-center justify-center px-7 pb-14 text-center">
          <SketchMoonStars className="w-[120px] h-[38px] mb-2" />

          <div className="relative mb-7">
            <SageWatercolorWash className="absolute -inset-x-3 -top-2 w-[178px] h-[104px]" />
            <CatResting className="relative w-[148px] h-[86px]" />
          </div>

          <p className="font-hand text-[27px] leading-[1.6] text-[#292622] mb-10 [text-wrap:balance]">
            如果今天有点累，就先在这里坐一会儿。想说的时候，再慢慢说。
          </p>

          <SketchPillButton
            type="button"
            onClick={() => {
              setStep('compose');
              window.setTimeout(() => textareaRef.current?.focus(), 80);
            }}
            className="w-full"
          >
            <span>写下今天的烦恼</span>
          </SketchPillButton>

          <button
            type="button"
            onClick={onGoToMyTreehole}
            className="mt-5 min-h-[40px] text-[13px] text-[#615C54] hover:text-[#292622] underline underline-offset-4 cursor-pointer"
          >
            查看保存在这台设备的树洞
          </button>
        </main>
      )}

      {step === 'compose' && (
        <main className="flex-1 flex flex-col justify-between px-5 pt-2 pb-6 safe-bottom">
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] text-[#615C54]">
                仅保存在当前设备，不会发送到陪练接口
              </span>
              <CatResting className="w-[72px] h-[42px] shrink-0" />
            </div>

            <SketchPaperBox
              variant="note"
              showTape
              className="flex-1 flex flex-col"
              fillClass="bg-[#FAF8F3]/90 flex-1 flex flex-col"
            >
              <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="可以只写一句。这里不用想好怎么开头。"
                aria-label="写下今天的烦恼"
                className="flex-1 min-h-[220px] w-full bg-transparent stationery-lines px-4 py-3 text-[15px] text-[#292622] placeholder:text-[#615C54]/75 focus:outline-none resize-none"
              />
            </SketchPaperBox>
          </div>

          <div className="pt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={handleClear}
              disabled={!text}
              className="min-h-[46px] px-5 py-2.5 rounded-[20px_14px_22px_16px] bg-transparent hover:bg-[#FAF8F3] disabled:opacity-45 border-[1.3px] border-[#292622]/45 text-[14px] text-[#292622] cursor-pointer"
            >
              清空内容
            </button>
            <SketchPillButton
              type="button"
              onClick={handleSave}
              disabled={!text.trim()}
              className="flex-1"
            >
              <span>留在此设备</span>
            </SketchPillButton>
          </div>
        </main>
      )}

      {step === 'saved' && (
        <main className="flex-1 flex flex-col items-center justify-center px-7 pb-14 text-center">
          <SketchMoonStars className="w-[112px] h-[34px] mb-2" />
          <CatResting className="w-[140px] h-[82px] mb-7" />

          <p className="font-hand text-[27px] leading-[1.6] text-[#292622] mb-10 [text-wrap:balance]">
            写下来就好。等你想处理时，可以再回来。
          </p>

          <div className="w-full space-y-3">
            <SketchPillButton
              type="button"
              onClick={() => setStep('compose')}
              className="w-full"
            >
              <span>再写一句</span>
            </SketchPillButton>
            <button
              type="button"
              onClick={onGoToMyTreehole}
              className="w-full min-h-[46px] px-6 py-2.5 rounded-[20px_14px_22px_16px] bg-transparent hover:bg-[#FAF8F3] border border-[#292622]/45 text-[14px] text-[#292622] cursor-pointer"
            >
              去「我的树洞」看看
            </button>
          </div>
        </main>
      )}
    </div>
  );
};
