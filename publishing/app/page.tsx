import { Component as InfiniteGridHero } from "@/components/ui/the-infinite-grid";

const commitmentPoints = [
  "When someone pays for what you have to offer, they are much more likely to use it, put it into action, and change something real in their life.",
  "When they get better, they can show and inspire others. The good will keeps moving outward.",
  "You stop relying only on a social platform for distribution and start owning the relationship through email, a members area, or a dedicated community.",
  "The people you help tell others, who can learn from you as well. What you teach gets passed on, and your impact compounds.",
];

const whatIDo = [
  "Build the website",
  "Shape the product, program, or system",
  "Create the assets",
  "Build the marketing",
  "Set up the platforms",
  "Manage the launch pieces",
];

const whatYouDo = [
  "Tell the audience about it",
  "Appear in any video assets for the product or marketing",
  "Choose how hands-on you want to be",
  "Optionally help shape the product and help people get the result",
];

const examples = [
  {
    title: "The chiropractor",
    copy: "A chiropractor wanted to help more struggling chiropractors build their clinics. He built a product as a way to multiply himself. The result: he helped over 10,000 chiropractors start their practices, and at its peak the business was bringing in over $3,000,000.",
  },
  {
    title: "The celebrity",
    copy: "A celebrity wanted to help people manage their money better and get out of debt. He partnered with a financial advisor to create a product that helped almost a million people get on the path to financial security.",
  },
  {
    title: "The rapper",
    copy: "A famous rapper wanted to give his audience something they could actually use, rather than just a t-shirt or clothing line. He created a cologne line that gave fans a sense of confidence whenever they wore it, first selling it at shows and eventually advertising it to cold audiences who simply wanted a good scent.",
  },
  {
    title: "The manifestation coach",
    copy: "A manifestation coach wanted to help more people learn to create the life they wanted. She put what she knew into a short digital product teaching the method, which led to thousands of women using it to change their lives.",
  },
  {
    title: "The trainer",
    copy: "A female personal trainer wanted to help more women get into shape. She created a virtual bootcamp that over 30,000 women entered, with many seeing incredible results.",
  },
];

export default function Home() {
  return (
    <main>
      <InfiniteGridHero />

      <div className="post-hero-gradient">
        <section className="section intro grid-band" id="problem">
          <div className="section-kicker">The Opportunity</div>
          <div className="two-column">
            <h2>Most people's audiences are just kind of there.</h2>
            <div className="section-copy narrative-copy">
              <p>
                Sure, you post every once in a while. But what are you really
                giving them of value?
              </p>
              <p>
                Chances are, the fact that people chose to follow you in the first
                place is because they got some type of initial value. Maybe it was
                entertainment. Maybe it was inspiration. Maybe it was knowledge.
              </p>
              <p>
                But by posting a video, there is no skin in the game. They can
                watch it, but there is no guarantee they can use it to better
                their lives or the lives of others.
              </p>
            </div>
          </div>
        </section>

        <section className="section impact-section grid-band">
          <div className="section-heading">
            <div className="section-kicker">The Shift</div>
            <h2>This is where having a structured program comes into play.</h2>
            <p>
              By organizing your best information into a super valuable product,
              you can actually have a real effect on your audience.
            </p>
          </div>
          <div className="impact-grid">
            <article>
              <span>01</span>
              <h3>Help them change</h3>
              <p>
                Whether it is helping them get into shape, get out of a slump, or
                learn a skill, structure gives people a clearer path to a result.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Move beyond content</h3>
              <p>
                Free content is surrounded by thousands of other pieces of content.
                A program gives people a focused place to act on what you know.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Multiply yourself</h3>
              <p>
                You can have a much greater effect on the world when your best
                information is organized, repeatable, and able to help people at scale.
              </p>
            </article>
          </div>
        </section>

        <section className="section model grid-band" id="why">
          <div className="section-heading">
            <div className="section-kicker">Why This Works</div>
            <h2>Commitment turns attention into action.</h2>
            <p>
              When someone actually chooses to invest in what you have to offer,
              they are far more likely to use it, share it, and let it change how
              they show up in the world.
            </p>
          </div>
          <ol className="process-list">
            {commitmentPoints.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="section low-lift grid-band" id="roles">
          <div className="section-heading">
            <div className="section-kicker">How It Works</div>
            <h2>I handle the build. You decide how involved you want to be.</h2>
            <p>
              The goal is to make the impact real without forcing you to become a
              full-time operator unless that is the role you want.
            </p>
          </div>
          <div className="split-panel">
            <div>
              <h3>What I do</h3>
              <p className="panel-lead">
                Everything needed to turn the idea into a working product people
                can buy, use, and get value from.
              </p>
              <ul className="clean-list two-up">
                {whatIDo.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>What you do</h3>
              <p className="panel-lead">
                As much or as little as you want. The bare minimum is simple:
                tell the audience about it and show up in the core assets.
              </p>
              <ul className="clean-list">
                {whatYouDo.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section proof grid-band" id="possible">
          <div className="section-heading compact">
            <div className="section-kicker">What&apos;s Possible</div>
            <h2>Products can multiply the good you already create.</h2>
            <p>
              These are the kinds of outcomes that become possible when someone
              with trust turns what they know, represent, or believe into
              something people can actually use.
            </p>
          </div>
          <div className="example-grid">
            {examples.map((example) => (
              <article className="example-card" key={example.title}>
                <h3>{example.title}</h3>
                <p>{example.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="final-cta section grid-band" id="call">
          <div>
            <div className="section-kicker">Start The Conversation</div>
            <h2>If you want to change the world, this is for you.</h2>
            <p>
              Sound like something you are interested in? Book a call below and
              we can talk through what kind of product, program, or platform would
              create the most impact for your audience.
            </p>
            <button className="button primary unavailable-button" type="button" disabled>
              Temporarily unavailable
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
