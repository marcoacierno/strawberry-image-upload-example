const UIElements = {
  loading: null,
  noAvatars: null,
  avatarsGridContainer: null,
};

let AVATARS_GRID = null;
let AVATAR_TEMPLATE = null;

window.addEventListener("load", () => {
  UIElements.loading = document.querySelector(".js-loading-avatars");
  UIElements.noAvatars = document.querySelector(".js-nothing-uploaded");
  UIElements.avatarsGridContainer = document.querySelector(
    ".js-avatars-grid-container"
  );
  AVATARS_GRID = document.querySelector(".js-avatars-grid");
  AVATAR_TEMPLATE = document.querySelector("#js-single-avatar-template");

  loadAvatars();
});

const loadAvatars = () => {
  hideAllExcept("loading");

  fetch("/graphql/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `{
        avatars {
          path
        }
      }`,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      const data = res.data;
      const avatars = data.avatars;

      if (avatars.length === 0) {
        hideAllExcept("noAvatars");
      } else {
        hideAllExcept("avatarsGridContainer");
        showResults(avatars);
      }
    });
};

const showResults = (avatars) => {
  const fragment = new DocumentFragment();

  for (const avatar of avatars) {
    appendNewAvatar(avatar, fragment);
  }

  AVATARS_GRID.appendChild(fragment);
};

window.appendNewAvatar = (avatar, destination = null) => {
  if (destination === null) {
    // hack :)
    hideAllExcept("avatarsGridContainer");
  }

  destination = destination || AVATARS_GRID;

  const clone = AVATAR_TEMPLATE.content.cloneNode(true);
  clone.firstElementChild.style.backgroundImage = `url(${avatar.path})`;
  destination.insertBefore(clone, destination.firstElementChild);
};

const hideAllExcept = (exclude) => {
  for (const [key, element] of Object.entries(UIElements)) {
    if (key === exclude) {
      element.classList.remove("hidden");
      continue;
    }

    element.classList.add("hidden");
  }
};
