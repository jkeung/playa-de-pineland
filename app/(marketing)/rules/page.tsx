import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beach Volleyball Rules | Playa de Pineland",
  description:
    "Quick reference for beach doubles rules — AVP rules condensed for new visitors and indoor crossover players.",
};

export default function RulesPage() {
  return (
    <div className="pt-[42px] pb-[60px]">
      <div className="container">
        <div className="mb-6 flex justify-between items-end gap-[18px] flex-wrap">
          <div>
            <h2 className="m-0 mb-2 text-[clamp(1.5rem,3vw,2.7rem)] text-[color:var(--ocean-dark)] tracking-[-0.03em] dark:text-heading-dark">Beach Volleyball Rules</h2>
            <p className="m-0 text-[color:var(--muted)] max-w-[640px] leading-[1.7]">
              Quick-reference guide for beach doubles (AVP rules, condensed).
              Whether you&rsquo;re brand new or crossing over from indoor, this
              covers everything you need to know before stepping on the sand.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-[18px] max-md:grid-cols-1">
          <section className="card py-7 px-6 max-md:py-[22px] max-md:px-[18px]">
            <h3 className="m-0 mb-4 text-[1.15rem] text-[color:var(--ocean-dark)] font-bold dark:text-[color:var(--heading-dark)]">The Basics</h3>
            <ul className="rules-list">
              <li>2 vs 2 — no substitutions</li>
              <li>Rally scoring (point on every serve)</li>
              <li>Sets played to 21 points (cap at 23)</li>
              <li>Deciding 3rd set played to 15 (cap at 17)</li>
              <li>Must win by 2 points</li>
              <li>Switch sides every 7 points (every 5 in the 3rd set)</li>
              <li>Coin toss determines first serve or side choice</li>
            </ul>
          </section>

          <section className="card py-7 px-6 max-md:py-[22px] max-md:px-[18px]">
            <h3 className="m-0 mb-4 text-[1.15rem] text-[color:var(--ocean-dark)] font-bold dark:text-[color:var(--heading-dark)]">Hitting &amp; Ball Handling</h3>
            <ul className="rules-list">
              <li>3 contacts allowed per side</li>
              <li>A block counts as the first touch</li>
              <li>
                No open-hand tips or dinks — use knuckle, roll shot, or poke
                instead
              </li>
              <li>
                Sets must be clean — no lifts, carries, or double-contacts
              </li>
              <li>
                Exception: double-contact is allowed on the first team contact
                from a hard-driven ball
              </li>
              <li>Setting over the net must travel square to your shoulders</li>
            </ul>
          </section>

          <section className="card py-7 px-6 max-md:py-[22px] max-md:px-[18px]">
            <h3 className="m-0 mb-4 text-[1.15rem] text-[color:var(--ocean-dark)] font-bold dark:text-[color:var(--heading-dark)]">Serving</h3>
            <ul className="rules-list">
              <li>Serve from behind the endline</li>
              <li>One toss per serve attempt</li>
              <li>Let serves (net contact) are in play</li>
            </ul>
          </section>

          <section className="card py-7 px-6 max-md:py-[22px] max-md:px-[18px]">
            <h3 className="m-0 mb-4 text-[1.15rem] text-[color:var(--ocean-dark)] font-bold dark:text-[color:var(--heading-dark)]">Net Play</h3>
            <ul className="rules-list">
              <li>
                No centerline violation — you can cross under the net as long as
                you don&rsquo;t interfere with the opponent
              </li>
              <li>Touching the net during play is a fault</li>
              <li>A block counts as a touch (3 contacts total, not 4)</li>
            </ul>
          </section>

          <section className="card py-7 px-6 max-md:py-[22px] max-md:px-[18px]">
            <h3 className="m-0 mb-4 text-[1.15rem] text-[color:var(--ocean-dark)] font-bold dark:text-[color:var(--heading-dark)]">Court Etiquette</h3>
            <ul className="rules-list">
              <li>Players call their own lines — in or out</li>
              <li>
                Hand signals behind the back to communicate serving strategy
                with your partner
              </li>
            </ul>
          </section>

          <section className="rules-section--house card col-span-full border-t-[3px] border-t-[var(--sunset)] py-7 px-6 max-md:py-[22px] max-md:px-[18px]">
            <h3 className="m-0 mb-4 text-[1.15rem] text-[color:var(--ocean-dark)] font-bold dark:text-[color:var(--heading-dark)]">Playa de Pineland House Rules</h3>
            <ul className="rules-list">
              <li>Have fun — this is the beach, not the Olympics</li>
              <li>Be supportive — hype up good plays, yours and theirs</li>
              <li>Welcome newcomers — everyone started somewhere</li>
              <li>Rotate in — share the court and mix up teams</li>
              <li>Call your own fouls honestly — integrity over winning</li>
              <li>Keep it lighthearted — trash talk is fine, bad vibes are not</li>
              <li>Clean up after yourself — leave the court better than you found it</li>
              <li>Respect the neighbors — keep music and noise reasonable</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
