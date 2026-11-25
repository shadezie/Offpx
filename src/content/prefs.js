/**
 * Persisted preferences: unit, theme, which edge the panel docks to, which
 * sections are folded, and whether the first-run steps have been seen.
 *
 * One storage key, loaded once when the tool is armed, written back with a
 * short debounce.
 */
(() => {
  const DT = (window.__offpx = window.__offpx || {});

  const KEY = 'offpx.prefs';
  // Where preferences lived before the rename. Read when nothing is stored
  // under the new key, so nobody loses their theme or units.
  const LEGACY_KEY = 'designtool.prefs';
  const DEFAULTS = {
    unit: 'px',
    theme: 'dark',
    /** 'right' or 'left': the edge the panel docks to */
    side: 'right',
    /** { [sectionTitle]: true } for each section the user has folded */
    folds: {},
    /** true once a measurement has been kept, or the steps were dismissed */
    onboarded: false,
    /** {cls, w, h}: the stage size last used. cls is a device class or 'fit' */
    device: null,
  };

  let state = { ...DEFAULTS };
  let timer = 0;

  function save() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      try {
        chrome.storage?.local?.set({ [KEY]: state });
      } catch {
        // Storage is unavailable in some sandboxed frames. Preferences still
        // work for the session, they just do not survive a reload.
      }
    }, 250);
  }

  DT.prefs = {
    get(key) {
      return state[key];
    },

    set(key, value) {
      state[key] = value;
      save();
    },

    async load() {
      try {
        const stored = await chrome.storage?.local?.get([KEY, LEGACY_KEY]);
        const saved = stored?.[KEY] || stored?.[LEGACY_KEY];
        if (saved) state = { ...DEFAULTS, ...saved };
      } catch {
        // Keep the defaults.
      }
      return state;
    },
  };
})();
