const steps = [
  {
    badge: "Superpower 1",
    title: "Byblos can put you inside someone else's browsing session.  Or someone else in yours.",
    subheader: "Explore how someone else browsed the web, and see what they left behind.",
    points: [
      "Look at the tree on the right.  Someone else built it.",
      "The tree is a navigable record of how someone explored the internet.",
      "Click on a node.  You'll visit that webpage.",
      "Click another node.  Follow their investigation, one webpage at a time.",
    ]
  },
  {
    badge: "Superpower 2",
    title: "Byblos makes browsing multiplayer, for humans and agents.",
    subheader: "You're not just exploring someone else's investigation. You can contribute to it.",
    points: [
      "Look at the annotations and chat on the left.  Every webpage has its own conversation.",
      "When you click a node in the tree, Byblos loads the conversation for that webpage.",
      "You can leave your own notes and messages on any page.",
      "To collaborate live, click Share & Permissions and verify a Google account.",
      "Request Silver or Gold permission from the creator to share your contributions with everyone.",
      "You can also launch swarms of agents to browse webpages and chat on them with you.",
      "Click the 🤖 agent button below, connect an API key, give them a prompt, and unleash a swarm."
    ]
  },
  {
    badge: "Superpower 3",
    title: "Byblos gives webpages memory.",
    subheader: "So you can organize the internet however you want.",
    points: [
      "Click the ⭐️ rating button on the bar below.",
      "See the ⭐️ badges? Your rating is now attached to this page.",
      "Come back tomorrow or next year.  It will still be there.",
      "Browse the internet as normal, and webpages remember what you leave on them.",
    ]
  },
  {
    badge: "Superpower 4",
    title: "Byblos lets you query the internet however you want.",
    subheader: "Google indexes webpages.  Byblos indexes what people thought about them.",
    points: [
      "Click Sort/Filter near the upper-left and filter by ⭐️ rating.",
      "See the page you rated ⭐️ appear in the Annotated, Sorted, and Filtered window above.",
      "You can now search webpages by what people thought about them.",
      "Show me the pages with keyword 'countertops', sorted by lead time.",
      "Show me the Airbnb listings I 🔥 flamed, sorted by 💸 cost.",
      "All because webpages now remember what you and others thought about them."
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
      "Some pages you don't want to share or remember.",
      "Use Chrome tabs for these pages.",
      "Chrome tabs remember nothing.  Browsing is private and throwaway as normal.",
    ]
  },
  {
    badge: "But when you need more than a browser",
    title: "Byblos superpowers are opt-in with one click.",
    subheader: "Just promote the pages that matter.",
    points: [
      [
        "Click the ",
        { strong: "Promote" },
        " button below."
      ],
      "Notice the green outline around this page.",
      "Notice the annotation bar below.",
      "Green outline + annotation bar = Byblos tab.",
      "You have promoted the Chrome tab back into a Byblos tab.",
      "Notice your rating ⭐️ is back."
    ]
  }
];

const title = document.querySelector("#tutorial-step-title");
const subheader = document.querySelector("#tutorial-step-subheader");
const points = document.querySelector("#tutorial-points");
const badge = document.querySelector("#tutorial-badge");
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

    if (part.strong) {
      const strong = document.createElement("strong");
      strong.textContent = part.strong;
      return strong;
    }

    if (part.icon) {
      const icon = document.createElement("img");
      icon.className = "tutorial-inline-icon";
      icon.src = part.icon;
      icon.alt = part.alt;
      return icon;
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
  subheader.textContent = step.subheader || "";
  subheader.hidden = !step.subheader;
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
