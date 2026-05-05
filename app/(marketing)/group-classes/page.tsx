import type { Metadata } from "next";
import Link from "next/link";
import Schedule from "@/components/Schedule";

export const metadata: Metadata = {
  title: "Group Classes | Playa de Pineland",
  description:
    "Learn more about Playa de Pineland group beach volleyball classes, skill levels, class format, and what to expect on the sand.",
};

const classFormats = [
  {
    name: "For Beginners",
    tag: "Beginner",
    levelClass: "beginner",
    headline: "Build your foundation and improve fundamentals.",
    description:
      "Are you new to sand volleyball, or looking to build a rock-solid foundation? This is where your journey to competitive play begins.",
    overview:
      "Our Beginner program is crafted to instill the core skills and confidence you need to thrive on the sand. You will learn the fundamental techniques that are essential for success, setting you up for rapid improvement.",
    mastery: [
      {
        title: "Consistent Passing",
        copy: "Develop a reliable platform for precise serve receive and ball control, ensuring every rally starts strong.",
      },
      {
        title: "Accurate Setting",
        copy: "Learn proper hand shape and soft touch to deliver hittable sets for your partner, even in challenging conditions and out-of-system play.",
      },
      {
        title: "Effective Serving",
        copy: "Master the mechanics of getting your serve over with consistency, then progress to strategic placement and the ability to change from float to topspin.",
      },
      {
        title: "Efficient Movement in Sand",
        copy: "Understand how to move effectively on unstable sand, including proper split-stepping, shuffling, and safe diving techniques.",
      },
      {
        title: "Basic Hitting & Offensive Flow",
        copy: "Practice your hitting approach and arm swing to confidently get the ball over the net with control.",
      },
      {
        title: "Foundational Communication",
        copy: "Learn essential verbal cues for seamless partner play.",
      },
    ],
    approach:
      "We focus on high repetition and clear, concise instruction with plenty of individual feedback. Drills are designed to build confidence and muscle memory, making complex movements feel natural. You will gain a deeper understanding of why each technique is vital for your game, from platform formation to effective court coverage.",
    logistics: [
      "Player Count: Ideal for 12-16 players, ensuring plenty of individual touches and personalized coaching.",
      "Setup: Drills utilize 2-4 courts or designated areas for concurrent small group work, maximizing your practice time.",
      "Goals: By the end, you will be consistently performing core skills, understanding basic doubles strategy, and ready to advance your game.",
    ],
    quickFit: "New players or players rebuilding core beach volleyball fundamentals.",
    quickFocus: "Passing, setting, serving, movement, communication, and controlled offensive flow.",
    quickGroup: "Ideal for 12-16 players.",
  },
  {
    name: "For Intermediate Players",
    tag: "Intermediate",
    levelClass: "intermediate",
    headline: "Refine, strategize, dominate.",
    description:
      "You have the fundamentals down. Now it is time to elevate your strategy, precision, and court dominance.",
    overview:
      "Our Intermediate program pushes you beyond basic mechanics, focusing on executing skills under pressure, reading your opponents, and integrating advanced defensive and offensive systems. This series is perfect for players with a solid volleyball background, including high school sports experience, who are ready to compete at a higher level.",
    mastery: [
      {
        title: "Enhanced Ball Control & Setting",
        copy: "Achieve precise setting to specific zones, master jump sets, and control difficult passes for seamless offensive transitions.",
      },
      {
        title: "Strategic Serving",
        copy: "Develop powerful topspin or float serves aimed at specific zones and seams to disrupt opponents.",
      },
      {
        title: "Versatile Attacking Arsenal",
        copy: "Expand your hitting repertoire beyond power, mastering sharp cut shots, controlled roll shots, and deceptive tips.",
      },
      {
        title: "Cohesive Defensive Positioning",
        copy: "Learn to read attackers, anticipate shots, and work in sync with your partner for stronger court coverage.",
      },
      {
        title: "Strategic Blocking & Peeling",
        copy: "Understand when to commit to a block, how to peel off the net to defend tips, and how to funnel shots to your partner.",
      },
      {
        title: "Fast Transition Offense",
        copy: "Convert defensive digs into aggressive, game-winning attacks with speed and precision.",
      },
      {
        title: "Advanced Game IQ",
        copy: "Develop the ability to read opponents' tendencies, make quick decisions under pressure, and implement advanced offensive and defensive systems.",
      },
    ],
    approach:
      "We emphasize accuracy under pressure, game-like scenario training, and nuanced decision-making. You will focus on fluid transitions between skills, enhancing your ability to anticipate plays and adapt on the fly. We will challenge you to increase intensity, refine your technique, and develop your strategic mindset.",
    logistics: [
      "Player Count: Ideal for 8-12 players, allowing for focused 2v2 drills and specialized coaching attention.",
      "Setup: Utilizes 2 full courts or designated half-courts, enabling dynamic, role-specific drills and higher intensity play.",
      "Goals: By the end, you will be executing complex plays with precision, consistently out-strategizing opponents, and playing cohesive, high-level sand doubles.",
    ],
    quickFit: "Players with solid fundamentals who are ready for faster, more strategic doubles.",
    quickFocus: "Pressure reps, advanced ball control, attacking range, defense, blocking, and transition offense.",
    quickGroup: "Ideal for 8-12 players.",
  },
];

const expectations = [
  "Small groups capped for useful feedback and high-touch reps.",
  "Warm-up, focused skill work, competitive drills, and live play.",
  "Skill-matched sessions whenever possible so the pace feels right.",
  "Bring water, sunscreen, and athletic clothes that can get sandy.",
];

const sessionFlow = [
  { label: "Warm-Up", copy: "Movement prep, ball control, and touches to get comfortable on sand." },
  { label: "Skill Block", copy: "A focused theme like passing, setting, serving, shots, or defensive reads." },
  { label: "Competitive Reps", copy: "Small-sided drills and wash scoring that make the skill show up under pressure." },
  { label: "Play", copy: "Guided games with coaching cues, rotations, and quick feedback between rallies." },
];

export default function GroupClassesPage() {
  return (
    <>
      <section className="pt-[58px] pb-[26px] max-md:pt-10">
        <div className="container">
          <div className="py-8 max-md:py-2">
            <span className="inline-flex items-center gap-2 py-[10px] px-[14px] rounded-full bg-[rgba(248,250,244,0.7)] border border-[rgba(8,57,72,0.08)] text-[color:var(--ocean-dark)] font-bold text-[0.9rem] shadow-[0_8px_20px_rgba(8,57,72,0.06)] dark:bg-[rgba(30,35,40,0.7)] dark:border-[rgba(255,255,255,0.06)] dark:text-heading-dark">
              Group beach volleyball classes
            </span>
            <h1 className="text-[clamp(2.7rem,5.6vw,5rem)] leading-[0.98] mt-[18px] mb-4 tracking-[-0.04em] text-[color:var(--ocean-dark)] dark:text-heading-dark">
              Elevate your game with sand doubles training.
            </h1>
            <p className="text-[1.08rem] leading-[1.8] text-[color:var(--muted)] max-w-[680px] mb-7">
              Our group training series is designed to develop your beach
              volleyball game whether you are just starting out or preparing for
              more competitive play. Each class blends skill development,
              doubles strategy, and sand-specific athletic movement so you can
              build confidence, improve decision-making, and perform better on
              the beach.
            </p>
            <p className="text-[1.02rem] leading-[1.75] text-[color:var(--muted)] max-w-[680px] mb-7">
              We focus on the unique demands of sand doubles: explosive movement,
              agility, core stability, shoulder resilience, and the endurance
              needed to compete on unstable sand.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link className="btn btn-primary" href="/portal/book?focus=Group%20Clinic">
                Find a Class
              </Link>
              <Link className="btn btn-secondary" href="#class-calendar">
                View Calendar
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-[12px] pb-[22px]">
        <div className="container">
          <div className="grid grid-cols-2 gap-[18px] max-md:grid-cols-1">
            {classFormats.map((format) => (
              <article className="card" key={`${format.name}-summary`}>
                <div className={`mb-5 h-1.5 rounded-full schedule-cell--${format.levelClass}`} />
                <div className="flex items-start justify-between gap-4 mb-4 max-sm:flex-col">
                  <div>
                    <span className={`schedule-level schedule-level--${format.levelClass} !mb-3 !mt-0 !text-[0.72rem]`}>
                      {format.tag}
                    </span>
                    <h2 className="m-0 text-[1.28rem] text-[color:var(--ocean-dark)] dark:text-heading-dark">
                      {format.headline}
                    </h2>
                  </div>
                </div>
                <dl className="m-0 grid gap-3">
                  <div>
                    <dt className="text-[0.78rem] font-extrabold uppercase tracking-[0.08em] text-[color:var(--ocean-dark)] dark:text-heading-dark">
                      Best for
                    </dt>
                    <dd className="m-0 mt-1 text-[0.94rem] leading-[1.65] text-[color:var(--muted)]">
                      {format.quickFit}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.78rem] font-extrabold uppercase tracking-[0.08em] text-[color:var(--ocean-dark)] dark:text-heading-dark">
                      Focus
                    </dt>
                    <dd className="m-0 mt-1 text-[0.94rem] leading-[1.65] text-[color:var(--muted)]">
                      {format.quickFocus}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.78rem] font-extrabold uppercase tracking-[0.08em] text-[color:var(--ocean-dark)] dark:text-heading-dark">
                      Group size
                    </dt>
                    <dd className="m-0 mt-1 text-[0.94rem] leading-[1.65] text-[color:var(--muted)]">
                      {format.quickGroup}
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-[34px] pb-[22px]">
        <div className="container">
          <div className="mb-6">
            <h2 className="m-0 mb-2 text-[clamp(1.5rem,3vw,2.7rem)] text-[color:var(--ocean-dark)] tracking-[-0.03em] dark:text-heading-dark">
              Pick the right class
            </h2>
            <p className="m-0 text-[color:var(--muted)] max-w-[680px] leading-[1.7]">
              Each session is grouped by level so the drills, pace, and
              competition fit the players on court.
            </p>
          </div>

          <div className="grid gap-[18px]">
            {classFormats.map((format) => (
              <article className="card" key={format.name}>
                <div className={`mb-5 h-1.5 rounded-full schedule-cell--${format.levelClass}`} />
                <div className="grid grid-cols-[0.38fr_0.62fr] gap-7 items-start max-lg:grid-cols-1">
                  <div>
                    <span className={`schedule-level schedule-level--${format.levelClass} !mb-4 !mt-0 !text-[0.72rem]`}>
                      {format.tag}
                    </span>
                    <h3 className="m-0 mb-[8px] text-[color:var(--ocean-dark)] text-[1.35rem] dark:text-heading-dark">
                      {format.name}
                    </h3>
                    <p className="m-0 mb-3 text-[1.02rem] font-bold text-[color:var(--ocean-dark)] leading-[1.55] dark:text-heading-dark">
                      {format.headline}
                    </p>
                    <p className="m-0 mb-4 text-[color:var(--muted)] leading-[1.75] text-[0.96rem]">
                      {format.description}
                    </p>
                    <p className="m-0 text-[color:var(--muted)] leading-[1.75] text-[0.96rem]">
                      {format.overview}
                    </p>
                  </div>

                  <div>
                    <h4 className="m-0 mb-3 text-[0.9rem] font-extrabold uppercase tracking-[0.08em] text-[color:var(--ocean-dark)] dark:text-heading-dark">
                      What You&apos;ll Master
                    </h4>
                    <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
                      {format.mastery.map((item) => (
                        <div
                          className="rounded-[18px] border border-[rgba(8,57,72,0.08)] bg-[rgba(255,255,255,0.34)] p-4 dark:border-[rgba(255,255,255,0.07)] dark:bg-[rgba(255,255,255,0.04)]"
                          key={item.title}
                        >
                          <strong className="block mb-1 text-[0.95rem] text-[color:var(--ocean-dark)] dark:text-heading-dark">
                            {item.title}
                          </strong>
                          <span className="text-[0.9rem] leading-[1.6] text-[color:var(--muted)]">
                            {item.copy}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 grid grid-cols-[0.9fr_1.1fr] gap-5 max-md:grid-cols-1">
                      <div>
                        <h4 className="m-0 mb-2 text-[0.9rem] font-extrabold uppercase tracking-[0.08em] text-[color:var(--ocean-dark)] dark:text-heading-dark">
                          Our Approach
                        </h4>
                        <p className="m-0 text-[color:var(--muted)] leading-[1.7] text-[0.95rem]">
                          {format.approach}
                        </p>
                      </div>
                      <div>
                        <h4 className="m-0 mb-2 text-[0.9rem] font-extrabold uppercase tracking-[0.08em] text-[color:var(--ocean-dark)] dark:text-heading-dark">
                          Logistics
                        </h4>
                        <ul className="rules-list">
                          {format.logistics.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-[42px] pb-[22px]">
        <div className="container grid grid-cols-[0.9fr_1.1fr] gap-[18px] items-start max-lg:grid-cols-1">
          <div>
            <h2 className="m-0 mb-2 text-[clamp(1.5rem,3vw,2.7rem)] text-[color:var(--ocean-dark)] tracking-[-0.03em] dark:text-heading-dark">
              What to expect
            </h2>
            <p className="m-0 text-[color:var(--muted)] max-w-[620px] leading-[1.7]">
              Classes are structured enough to improve a specific skill and
              flexible enough to match the group in front of the coach.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-[18px] max-sm:grid-cols-1">
            {sessionFlow.map((item) => (
              <article className="card" key={item.label}>
                <h3 className="m-0 mb-[10px] text-[color:var(--ocean-dark)] text-[1.08rem] dark:text-heading-dark">
                  {item.label}
                </h3>
                <p className="m-0 text-[color:var(--muted)] leading-[1.7] text-[0.95rem]">
                  {item.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-[42px] pb-[22px]">
        <div className="container">
          <div className="card bg-[linear-gradient(180deg,rgba(255,255,255,0.62),rgba(255,255,255,0.4)),linear-gradient(135deg,rgba(255,138,91,0.1),rgba(30,107,72,0.1))] dark:bg-[linear-gradient(180deg,rgba(30,35,40,0.66),rgba(30,35,40,0.42)),linear-gradient(135deg,rgba(255,138,91,0.06),rgba(30,107,72,0.08))]">
            <div className="grid grid-cols-[0.85fr_1.15fr] gap-7 items-start max-lg:grid-cols-1">
              <div>
                <h2 className="m-0 mb-2 text-[clamp(1.5rem,3vw,2.4rem)] text-[color:var(--ocean-dark)] tracking-[-0.03em] dark:text-heading-dark">
                  Good to know before class
                </h2>
                <p className="m-0 text-[color:var(--muted)] leading-[1.7]">
                  The goal is simple: leave with cleaner habits, more confidence,
                  and a better feel for doubles on sand.
                </p>
              </div>
              <ul className="rules-list grid grid-cols-2 gap-x-6 gap-y-0 max-sm:grid-cols-1">
                {expectations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div id="class-calendar">
        <Schedule />
      </div>
    </>
  );
}
