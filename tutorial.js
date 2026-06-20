const steps = [
  {
    badge: "Superpower 1",
    title: "Byblos gives webpages memory.",
    subheader: "So you can organize the internet however you want.",
    points: [
      "Click the ⭐️ rating button on the bar below.",
      "See the ⭐️ badges? Your rating is now attached to this page.",
      "Come back tomorrow or next year.  It will still be there.",
      "Now webpages can be sorted and filtered by whatever you care about.",
    ]
  },
  {
    badge: "Superpower 2",
    title: "Now the internet is queryable by your criteria.",
    subheader: "Google indexes webpages.  Byblos indexes what people thought about them.",
    points: [
      "Show me the restaurants all three of us hearted.",
      "Show me the pages Alice and I chatted on last month, but not Bob.",
      "Show me the pages with keyword countertops, sorted by lead time.",
      "Show me the Airbnb listings I flamed, sorted by distance to the festival.",
      "All because webpages now remember what you and others thought about them."
    ]
  },
  {
    badge: "Superpower 3",
    title: "You are inside someone else's browsing session.",
    subheader: "You can inherit or continue a browsing session instead of starting from scratch.",
    points: [
      "If you imported a workspace, the tree on the right was built by someone else.",
      "The tree is a navigable record of how someone explored the internet.",
      "You can see what they thought about each page as they navigated.",
      "Click nodes to revisit pages and see what they left on them.",
      "Byblos remembers not only what you thought about a page, but how you got there."
    ]
  },
  {
    badge: "Superpower 4",
    title: "Browsing is now multiplayer.",
    subheader: "Every webpage becomes a collaborative workspace.",
    points: [
      "Share your entire browsing session with a single string of text.",
      "See where other people went, what they found, and what they thought about it.",
      "Continue one of their branches.  Point each other in new directions.",
      "Talk to each other directly on the webpages themselves.",
      "Stop sharing links.  Share the whole browsing session as one collaborative, living document."
    ]
  },
  {
    badge: "Relax, it's easy",
    title: "You do NOT need to change how you browse.",
    subheader: "Many pages do not need to be remembered or shared.  So don't.",
    points: [
      [
        "Click demote ",
        { icon: "assets/cedar-128.png", alt: "the tree icon" },
        " in the annotation bar below."
      ],
      "Notice the red outline around this page.",
      "Notice the promotion bar below.",
      "Red outline + promotion bar = Chrome tab.",
      "You have demoted the Byblos tab to a Chrome tab."
    ]
  },
  {
    badge: "Chrome is a click away",
    title: "Chrome tabs behave exactly as you expect.",
    subheader: "Browse like it's 1995 if you want.",
    points: [
      "Some pages are disposable.",
      "Doomscrolling.  News articles.  Random searches.  Rabbit holes.",
      "Some pages you don't want to share.",
      "Use Chrome tabs for these pages.",
      "Chrome tabs remember nothing about pages.",
    ]
  },
  {
    badge: "But when you need more than a browser",
    title: "Byblos superpowers are opt-in with one click.",
    subheader: "Just promote the pages that matter.",
    points: [
      "Click the <em>Promote</em> button below.",
      "Notice the green outline around this page.",
      "Notice the annotation bar below.",
      "Green outline + annotation bar = Byblos tab.",
      "You have promoted the Chrome tab back into a Byblos tab.",
      "Notice your rating ⭐️ is back."
    ]
  },
  {
    badge: "No catches",
    title: "Switch any tab whenever you want.",
    subheader: "Superpowers come and go with one click.",
    points: [
      "Disposable page in a Byblos tab?  Demote it.",
      "Important page in a Chrome tab?  Promote it.",
      "Byblos superpowers return.",
      "Use Chrome tabs when you want.",
      "Use Byblos tabs when it helps."
    ]
  },
];

const title = document.querySelector("#tutorial-step-title");
const points = document.querySelector("#tutorial-points");
const badge = document.querySelector("#tutorial-badge");
const mode = document.querySelector("#tutorial-mode");
const next = document.querySelector("#next-step");
const prev = document.querySelector("#prev-step");
const dotsContainer = document.querySelector(".step-dots");
const modal = document.querySelector("#tutorial-modal");
const openButtons = Array.from(document.querySelectorAll("[data-open-tutorial]"));
const closeButtons = Array.from(document.querySelectorAll("[data-close-tutorial]"));
let currentStep = 0;
let returnFocusTo = null;
let dots = [];

function buildDots() {
  dots = steps.map((_, index) => {
    const dot = document.createElement("button");
    dot.className = "dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Step ${index + 1}`);
    dot.addEventListener("click", () => renderStep(index));
    return dot;
  });

  dotsContainer.replaceChildren(...dots);
}

function buildPointContent(point) {
  if (!Array.isArray(point)) {
    return [document.createTextNode(point)];
  }

  return point.map((part) => {
    if (typeof part === "string") {
      return document.createTextNode(part);
    }

    const link = document.createElement("a");
    link.className = "tutorial-link";
    link.href = part.href;
    link.textContent = part.text;
    return link;
  });
}

function renderStep(index) {
  currentStep = (index + steps.length) % steps.length;
  const step = steps[currentStep];

  if (step.titleParts) {
    title.replaceChildren(
      ...step.titleParts.map((part) => {
        if (typeof part === "string") {
          return document.createTextNode(part);
        }

        const icon = document.createElement("img");
        icon.className = "tutorial-inline-icon";
        icon.src = part.icon;
        icon.alt = part.alt;
        return icon;
      })
    );
  } else {
    title.textContent = step.title;
  }

  badge.textContent = step.badge;
  mode.textContent = step.mode || "";
  mode.hidden = !step.mode;
  points.replaceChildren(
    ...step.points.map((point) => {
      const item = document.createElement("li");
      item.replaceChildren(...buildPointContent(point));
      return item;
    })
  );

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === currentStep);
  });

  prev.disabled = currentStep === 0;
  next.textContent = currentStep === steps.length - 1 ? "Restart" : "Next";
}

next.addEventListener("click", () => {
  renderStep(currentStep === steps.length - 1 ? 0 : currentStep + 1);
});

prev.addEventListener("click", () => {
  renderStep(currentStep - 1);
});

function openTutorial(event) {
  returnFocusTo = event.currentTarget;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  renderStep(currentStep);
  next.focus();
}

function closeTutorial() {
  modal.hidden = true;
  document.body.classList.remove("modal-open");

  if (returnFocusTo) {
    returnFocusTo.focus();
  }
}

openButtons.forEach((button) => {
  button.addEventListener("click", openTutorial);
});

closeButtons.forEach((button) => {
  button.addEventListener("click", closeTutorial);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) {
    closeTutorial();
  }
});

buildDots();
renderStep(0);
