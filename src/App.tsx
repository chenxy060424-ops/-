import { useEffect, useRef, useState } from 'react';
import { ArticleDetailView } from './components/ArticleDetailView';
import { MobileBottomNav } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { PracticeListView } from './components/PracticeListView';
import { PracticeResultView } from './components/PracticeResultView';
import { PracticeSessionView } from './components/PracticeSessionView';
import { ProfileSubTab, ProfileView } from './components/ProfileView';
import { ScenarioDetailView } from './components/ScenarioDetailView';
import { ScienceView } from './components/ScienceView';
import { TreeholeView } from './components/TreeholeView';
import { ARTICLES, SCENARIOS } from './data/zhixianData';
import {
  formatChineseDate,
  savePracticeRecord,
} from './services/storageService';
import { NavTab, RoundSubmission } from './types/zhixian';

type AppRoute =
  | { name: 'home' }
  | { name: 'practice-list' }
  | { name: 'scenario-detail'; scenarioId: string }
  | { name: 'practice-session'; scenarioId: string; sessionKey: number }
  | {
      name: 'practice-result';
      scenarioId: string;
      submissions: RoundSubmission[];
    }
  | { name: 'science-list' }
  | { name: 'article-detail'; articleId: string }
  | { name: 'treehole' }
  | { name: 'profile'; subTab: ProfileSubTab };

function getActiveTab(route: AppRoute): NavTab {
  switch (route.name) {
    case 'home':
    case 'treehole':
      return 'home';
    case 'practice-list':
    case 'scenario-detail':
    case 'practice-session':
    case 'practice-result':
      return 'practice';
    case 'science-list':
    case 'article-detail':
      return 'science';
    case 'profile':
      return 'profile';
  }
}

/**
 * 模拟手机顶部状态栏（手绘风格 9:41 + 灵动岛 + 手绘 100 电量）
 */
const SimulatedPhoneStatusBar: React.FC = () => (
  <div
    aria-hidden="true"
    className="hidden min-[460px]:flex items-center justify-between px-6 pt-3 pb-1.5 bg-[#F3F0E7] shrink-0 select-none"
  >
    <span className="font-hand text-[16px] leading-none text-[#292622] tracking-wide w-12">
      9:41
    </span>

    {/* Dynamic Island */}
    <div className="w-[96px] h-[25px] rounded-full bg-[#1C1A17] flex items-center justify-end pr-2.5 shadow-inner">
      <span className="w-2.5 h-2.5 rounded-full bg-[#2E3440] border border-white/10" />
    </div>

    {/* Hand-drawn sketchy 100 battery icon */}
    <div className="w-12 flex justify-end">
      <svg viewBox="0 0 34 18" fill="none" className="w-[29px] h-[15px]">
        <path
          d="M3 4.5 C3 3.4, 3.8 2.8, 5 2.8 L25.5 3 C26.7 3, 27.3 3.7, 27.3 4.8 L27.2 13.2 C27.2 14.3, 26.5 14.9, 25.3 14.9 L4.8 14.8 C3.7 14.8, 3 14.1, 3 13 Z"
          stroke="#292622"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M28.6 6.8 C29.8 6.9, 30.3 7.7, 30.3 9 C30.3 10.3, 29.8 11.1, 28.6 11.2"
          stroke="#292622"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
        <text
          x="15.1"
          y="11.8"
          textAnchor="middle"
          fill="#292622"
          fontSize="7.8"
          fontFamily='"Ma Shan Zheng", sans-serif'
        >
          100
        </text>
      </svg>
    </div>
  </div>
);

export default function App() {
  const [route, setRoute] = useState<AppRoute>({ name: 'home' });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollContainerRef.current?.scrollTo({ top: 0 });
    window.scrollTo({ top: 0 });
  }, [route.name]);

  const handleSelectTab = (tab: NavTab) => {
    if (tab === 'home') setRoute({ name: 'home' });
    else if (tab === 'practice') setRoute({ name: 'practice-list' });
    else if (tab === 'science') setRoute({ name: 'science-list' });
    else if (tab === 'profile')
      setRoute({ name: 'profile', subTab: 'records' });
  };

  const activeTab = getActiveTab(route);
  const hideChrome =
    route.name === 'practice-session' || route.name === 'treehole';

  const currentScenario =
    route.name === 'scenario-detail' ||
    route.name === 'practice-session' ||
    route.name === 'practice-result'
      ? SCENARIOS.find((s) => s.id === route.scenarioId) ?? SCENARIOS[0]
      : null;

  const currentArticle =
    route.name === 'article-detail'
      ? ARTICLES.find((a) => a.id === route.articleId) ?? ARTICLES[0]
      : null;

  const handleExitSession = (
    scenarioId: string,
    submissions: RoundSubmission[]
  ) => {
    if (submissions.length > 0) {
      const scenario = SCENARIOS.find((s) => s.id === scenarioId);
      if (scenario) {
        savePracticeRecord({
          id: `rec-${scenario.id}-${Date.now()}`,
          scenarioId: scenario.id,
          scenarioTitle: scenario.title,
          category: scenario.category,
          completedRounds: submissions.length,
          totalRounds: scenario.rounds.length,
          completedAt: formatChineseDate(new Date()),
          goodTakeaway: submissions[submissions.length - 1].feedback.clearPoints,
          improveTakeaway:
            submissions[submissions.length - 1].feedback.nextToAdd,
          userReplies: submissions.map((s) => ({
            roundNumber: s.roundNumber,
            reply: s.userReply,
          })),
        });
      }
    }
    setRoute({ name: 'scenario-detail', scenarioId });
  };

  return (
    <div className="min-h-[100dvh] bg-[#EAE6DC] min-[460px]:bg-[radial-gradient(circle_at_50%_35%,#F5F2EA_0%,#E5E0D4_100%)] flex flex-col items-center justify-center min-[460px]:py-4 min-[460px]:px-4">
      {/* Realistic Smartphone Frame on >= 460px viewports, native full-bleed on phones */}
      <div className="relative w-full h-[100dvh] min-[460px]:w-[388px] min-[460px]:h-[808px] min-[460px]:max-h-[89dvh] min-[460px]:p-[10px] min-[460px]:rounded-[50px] min-[460px]:bg-gradient-to-b min-[460px]:from-[#3B3833] min-[460px]:via-[#1F1D1A] min-[460px]:to-[#33302B] min-[460px]:shadow-[0_26px_64px_rgba(41,38,34,0.2),inset_0_0_0_1.5px_#C6C0B4]">
        {/* Decorative Side Hardware Buttons */}
        <span
          aria-hidden="true"
          className="hidden min-[460px]:block absolute -left-[2.5px] top-[118px] w-[3px] h-[24px] rounded-l bg-[#6A655D]"
        />
        <span
          aria-hidden="true"
          className="hidden min-[460px]:block absolute -left-[2.5px] top-[156px] w-[3px] h-[44px] rounded-l bg-[#6A655D]"
        />
        <span
          aria-hidden="true"
          className="hidden min-[460px]:block absolute -left-[2.5px] top-[210px] w-[3px] h-[44px] rounded-l bg-[#6A655D]"
        />
        <span
          aria-hidden="true"
          className="hidden min-[460px]:block absolute -right-[2.5px] top-[176px] w-[3px] h-[64px] rounded-r bg-[#6A655D]"
        />

        {/* Inner Phone Display */}
        <div className="w-full h-full paper-grain text-[#292622] flex flex-col overflow-hidden min-[460px]:rounded-[40px] min-[460px]:border min-[460px]:border-[#151412]">
          <SimulatedPhoneStatusBar />

          <main
            key={route.name}
            ref={scrollContainerRef}
            className={`flex-1 animate-gentle ${
              hideChrome ? 'overflow-hidden flex flex-col' : 'overflow-y-auto'
            }`}
          >
            {route.name === 'home' && (
              <HomeView
                onStartPracticeList={() => setRoute({ name: 'practice-list' })}
                onOpenDepositScenario={() =>
                  setRoute({
                    name: 'scenario-detail',
                    scenarioId: 'deposit-return',
                  })
                }
                onOpenScience={() => setRoute({ name: 'science-list' })}
                onOpenTreehole={() => setRoute({ name: 'treehole' })}
              />
            )}

            {route.name === 'practice-list' && (
              <PracticeListView
                onSelectScenario={(scenarioId) =>
                  setRoute({ name: 'scenario-detail', scenarioId })
                }
              />
            )}

            {route.name === 'scenario-detail' && currentScenario && (
              <ScenarioDetailView
                scenario={currentScenario}
                onBack={() => setRoute({ name: 'practice-list' })}
                onStartPractice={() =>
                  setRoute({
                    name: 'practice-session',
                    scenarioId: currentScenario.id,
                    sessionKey: Date.now(),
                  })
                }
              />
            )}

            {route.name === 'practice-session' && currentScenario && (
              <PracticeSessionView
                key={`${currentScenario.id}-${route.sessionKey}`}
                scenario={currentScenario}
                onExit={(submissions) =>
                  handleExitSession(currentScenario.id, submissions)
                }
                onFinish={(submissions) =>
                  setRoute({
                    name: 'practice-result',
                    scenarioId: currentScenario.id,
                    submissions,
                  })
                }
              />
            )}

            {route.name === 'practice-result' && currentScenario && (
              <PracticeResultView
                scenario={currentScenario}
                submissions={route.submissions}
                onRetry={() =>
                  setRoute({
                    name: 'practice-session',
                    scenarioId: currentScenario.id,
                    sessionKey: Date.now(),
                  })
                }
                onGoToProfile={() =>
                  setRoute({ name: 'profile', subTab: 'records' })
                }
                onBackToList={() => setRoute({ name: 'practice-list' })}
              />
            )}

            {route.name === 'science-list' && (
              <ScienceView
                onSelectArticle={(articleId) =>
                  setRoute({ name: 'article-detail', articleId })
                }
              />
            )}

            {route.name === 'article-detail' && currentArticle && (
              <ArticleDetailView
                article={currentArticle}
                onBack={() => setRoute({ name: 'science-list' })}
                onGoToScenario={(scenarioId) =>
                  setRoute({ name: 'scenario-detail', scenarioId })
                }
              />
            )}

            {route.name === 'treehole' && (
              <TreeholeView
                onBack={() => setRoute({ name: 'home' })}
                onGoToMyTreehole={() =>
                  setRoute({ name: 'profile', subTab: 'treehole' })
                }
              />
            )}

            {route.name === 'profile' && (
              <ProfileView
                initialSubTab={route.subTab}
                onGoToPracticeList={() => setRoute({ name: 'practice-list' })}
                onRetryScenario={(scenarioId) =>
                  setRoute({ name: 'scenario-detail', scenarioId })
                }
                onGoToTreehole={() => setRoute({ name: 'treehole' })}
              />
            )}
          </main>

          {!hideChrome && (
            <MobileBottomNav
              activeTab={activeTab}
              onSelectTab={handleSelectTab}
            />
          )}

          {/* Simulated Phone Home Indicator */}
          <div
            aria-hidden="true"
            className="hidden min-[460px]:flex justify-center pt-0.5 pb-2 bg-[#F3F0E7] shrink-0"
          >
            <span className="w-[116px] h-[4px] rounded-full bg-[#292622]/75" />
          </div>
        </div>
      </div>

      {/* Handwritten Exhibition Title below the simulated phone */}
      <div className="hidden min-[460px]:block mt-3 font-hand text-[26px] leading-none text-[#292622] tracking-wider">
        知险。
      </div>
    </div>
  );
}
