const steps = [
  {
    badge: "Step 1",
    title: "You are in a Byblos tab.",
    points: [
      "Notice the green outline around this page.",
      "Notice the annotation bar below.",
      "Green outline + annotation bar = Byblos tab."
    ]
  },
  {
    badge: "Step 2",
    title: "Open a new Chrome tab and visit any page like google.com.",
    points: [
      "Notice the red outline around that page.",
      "Notice the promotion bar below.",
      "Red outline + promotion bar = Chrome tab."
    ]
  },
  {
    badge: "Step 3",
    title: "The purpose of Chrome tabs.",
    points: [
      "Some pages you don't want to remember, keep or share.",
      "Doomscrolling.  News articles.  Random searches.  Rabbit holes.",
      "Use Chrome tabs for these pages."
    ]
  },
  {
    badge: "Step 4",
    title: "The purpose of Byblos tabs.",
    points: [
      "Some pages are worth keeping.",
      "A listing you like.  A thoughtful article.  A funny video.",
      "Use Byblos tabs for these pages."
    ]
  },
  {
    badge: "Step 5",
    title: "Tabs can be switched.",
    points: [
      "Click the demote button in the annotation bar.",
      "The Byblos tab becomes a Chrome tab.",
      "Click promote to switch back."
    ]
  },
  {
    badge: "Step 6",
    title: "Byblos tabs can remember things.",
    points: [
      "Click the ⭐️ rating button on the bar below.",
      "See the ⭐️ badges? Your rating is now attached to this page.",
      "You can sort and filter pages based on the annotations you write."
    ]
  },
  {
    badge: "Step 7",
    title: "Chrome tabs behave as you expect.",
    points: [
      "Do not support annotations.",
      "Navigations are not remembered by Byblos.",
      "Fast, disposable, carefree browsing."
    ]
  },
  {
    badge: "Step 8",
    title: "Byblos tabs visualize your browsing.",
    points: [
      "After this tutorial, click a link in this page.",
      "The new page appears in your tree at the right.",
      "Byblos tabs let you retrace your thread of thought."
    ]
  }
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

function renderStep(index) {
  currentStep = (index + steps.length) % steps.length;
  const step = steps[currentStep];

  title.textContent = step.title;
  badge.textContent = step.badge;
  mode.textContent = step.mode || "";
  mode.hidden = !step.mode;
  points.replaceChildren(
    ...step.points.map((point) => {
      const item = document.createElement("li");
      item.textContent = point;
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
