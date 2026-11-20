/* =========================================================
   ✏️ EDIT THESE THREE THINGS — that's all you need to change
   ========================================================= */

// 1) Your video. Paste a YouTube link (any format works),
//    a Google Drive share link, or a path to an .mp4 in this repo (e.g. "video.mp4").
const VIDEO_URL = "video.mp4";
const VIDEO_POSTER = "poster.jpg"; // thumbnail shown before the video plays (only for .mp4 files)

// 2) Your survey link (Google Forms, Microsoft Forms, Qualtrics, etc.)
const SURVEY_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdIVcKUz2O7327CQDC8O4qlbAgSI5ex4Cux5YwlPK6LM2U3GQ/viewform";

// 3) Team member names (leave the list empty [] to hide the team section)
const TEAM = ["Amaro", "Jonathan", "Angel", "Malhar"];

/* ========================================================= */

// ----- Video -----
function buildVideo(url) {
  const wrap = document.getElementById("videoWrap");
  if (!url) {
    wrap.innerHTML = `
      <div class="video-placeholder">
        <div>
          <div class="play">▶</div>
          <p>Video coming soon</p>
        </div>
      </div>`;
    return;
  }

  // YouTube: watch?v=, youtu.be/, shorts/, embed/
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) {
    wrap.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0"
      title="Our project video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen loading="lazy"></iframe>`;
    return;
  }

  // Google Drive: /file/d/<id>/
  const drive = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
  if (drive) {
    wrap.innerHTML = `<iframe src="https://drive.google.com/file/d/${drive[1]}/preview"
      title="Our project video" allow="autoplay" allowfullscreen loading="lazy"></iframe>`;
    return;
  }

  // Vimeo
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) {
    wrap.innerHTML = `<iframe src="https://player.vimeo.com/video/${vimeo[1]}"
      title="Our project video" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
    return;
  }

  // Anything else: treat as a direct video file
  const poster = typeof VIDEO_POSTER !== "undefined" && VIDEO_POSTER ? ` poster="${VIDEO_POSTER}"` : "";
  wrap.innerHTML = `<video src="${url}"${poster} controls preload="metadata" playsinline></video>`;
}

// ----- Survey -----
function setupSurvey(url) {
  const btn = document.getElementById("surveyBtn");
  if (url) {
    btn.href = url;
  } else {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      btn.textContent = "Survey link coming soon";
    });
  }
}

// ----- Team -----
function buildTeam(names) {
  const list = document.getElementById("teamList");
  if (!names.length) {
    list.closest(".team").remove();
    return;
  }
  list.innerHTML = names.map((n) => `<li>${n}</li>`).join("");
}

// ----- Demo live counter in the hero card -----
function startDemoCounter() {
  const TOTAL = 120; // pretend garage capacity
  let open = 42;
  const countEl = document.getElementById("spotCount");
  const fillEl = document.getElementById("spotFill");

  function render() {
    countEl.textContent = open;
    const pct = (open / TOTAL) * 100;
    fillEl.style.width = pct + "%";
    fillEl.style.background = pct < 15 ? "#d64545" : pct < 35 ? "#e0a106" : "#1f9d55";
  }

  render();
  setInterval(() => {
    // a car enters or leaves
    open += Math.random() < 0.55 ? -1 : 1;
    open = Math.max(3, Math.min(TOTAL, open));
    render();
  }, 2500);
}

// ----- Nav shadow on scroll -----
function setupNav() {
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// ----- Fade-in on scroll -----
function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((el) => io.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  buildVideo(VIDEO_URL);
  setupSurvey(SURVEY_URL);
  buildTeam(TEAM);
  startDemoCounter();
  setupNav();
  setupReveal();
  document.getElementById("year").textContent = new Date().getFullYear();
});
