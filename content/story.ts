export type StoryChapter = { id: string; title: string; paragraphs: string[] };

/** Condensed from the client's "Our Story" page on lavishcars.com. */
export const storyIntro =
  "Every company that does this well started somewhere small. Ours started in Dubai, in 2024, with a single car and a very clear sense of what was missing.";

export const storyChapters: StoryChapter[] = [
  {
    id: "where-it-started",
    title: "Where it all started",
    paragraphs: [
      "LavishCars.com launched in Dubai in 2024. Not with a showroom full of Ferraris, not with fifty people, not with a billboard on Sheikh Zayed Road — but with a single car, one founder, Sir Bilawal Merani, and one clear idea of how a luxury rental should feel.",
      "One car, delivered properly, priced honestly, by someone on the other end of the phone who actually picked up.",
    ],
  },
  {
    id: "the-real-story",
    title: "The real story behind it",
    paragraphs: [
      "Sir Bilawal always wanted to build a platform. Instead of launching straight into one, he spent almost three years running his own rent-a-car business — maintaining the cars himself, checking every price before each booking and making sure every call was answered.",
      "Those years were research. He learned what breaks trust and what builds it, then turned everything he’d learned into a platform. That platform became LavishCars.com.",
    ],
  },
  {
    id: "one-car",
    title: "Why one car was enough",
    paragraphs: [
      "Most rental companies start by building a fleet. LavishCars started by setting a standard: it is better to do one thing well than ten badly. The first car was kept the way an owner keeps their own, delivered on time, every time, with rates made clear before booking.",
      "That created word of mouth no advertising could buy — returning clients, and friends they referred.",
    ],
  },
  {
    id: "when-things-go-wrong",
    title: "What most rental companies never talk about",
    paragraphs: [
      "Every luxury rental provider claims to be “world-class”. Few tell you what happens when something goes wrong. LavishCars doesn’t claim to be perfect. It promises that if something needs fixing, it gets fixed quickly, without making the client feel responsible for the problem.",
    ],
  },
  {
    id: "platform",
    title: "A platform, not a fleet",
    paragraphs: [
      "The goal was never two cars, or ten, or a hundred. It is a marketplace where suppliers list their vehicles and customers rent with complete confidence — built around a real luxury experience, from the first message to handing back the keys.",
      "Suppliers see their business multiply because the platform brings them the demand.",
    ],
  },
  {
    id: "houston",
    title: "From Dubai to the United States",
    paragraphs: [
      "Houston was a natural next step: America is built around driving, and a personal, transparent, delivery-first luxury rental is rarer there than it should be. LavishCars didn’t come to Houston to be the biggest — it came to be the best. Same standard, same delivery model, same honest pricing.",
    ],
  },
  {
    id: "what-never-changed",
    title: "What has never changed",
    paragraphs: [
      "In 2024 it was one car in Dubai. Today it is a platform across countries, growing one market at a time. The reason it exists hasn’t changed: renting a luxury car should feel as good as the car itself, in whichever city you rent it.",
    ],
  },
];
