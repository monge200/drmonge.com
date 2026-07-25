// Add new talks here. pdf is view-only (embedded, no direct download link).
// youtubeId is the part after "v=" in a YouTube URL.
const TALKS = [
  {
    title: "Understanding Myeloma Basics",
    date: "2026-07",
    description: "An introduction to multiple myeloma for patients and families: what plasma cells are, how myeloma is diagnosed and staged, and what treatment and monitoring look like.",
    pdf: "talks/understanding-myeloma-basics.pdf",
    youtubeId: null,
  },
  {
    title: "What is Multiple Myeloma?",
    date: null,
    description: "Short overview of multiple myeloma, produced with the CU Division of Hematology.",
    pdf: null,
    youtubeId: "PGsxk5Fek3s",
  },
  {
    title: "¿Qué es el Mieloma Múltiple?",
    date: null,
    description: "Spanish-language version of the overview above, produced with the CU Division of Hematology.",
    pdf: null,
    youtubeId: "EkhESobeP8I",
  },
  {
    title: "2026 Best of Hematology: Bispecifics, CAR-T Cells, and Sequencing Strategies in MM",
    date: null,
    description: "Talk for Total Health Oncology on treatment sequencing with bispecifics and CAR-T therapies in multiple myeloma.",
    pdf: null,
    youtubeId: "U8MFdvc4fvU",
  },
];

function renderTalk(talk, index) {
  const el = document.createElement("article");
  el.className = "talk";

  const dateStr = talk.date ? `<span class="meta">${talk.date}</span>` : "";
  el.innerHTML = `
    <h3>${talk.title}</h3>
    ${dateStr}
    <p class="desc">${talk.description ?? ""}</p>
  `;

  if (talk.pdf) {
    const frame = document.createElement("iframe");
    frame.className = "viewer-frame";
    frame.src = `vendor/pdfjs/web/viewer.html?file=${encodeURIComponent(talk.pdf)}`;
    frame.title = `${talk.title} (slides)`;
    frame.loading = "lazy";
    el.appendChild(frame);

    const note = document.createElement("p");
    note.className = "view-note";
    note.textContent = "Slides are for viewing only.";
    el.appendChild(note);
  }

  if (talk.youtubeId) {
    const wrap = document.createElement("div");
    wrap.className = "video-wrap";
    wrap.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${talk.youtubeId}" title="${talk.title} (video)" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
    el.appendChild(wrap);
  } else if (!talk.pdf) {
    const ph = document.createElement("div");
    ph.className = "placeholder";
    ph.textContent = "Coming soon.";
    el.appendChild(ph);
  }

  return el;
}

function render() {
  const list = document.getElementById("talks-list");
  if (TALKS.length === 0) {
    list.innerHTML = '<p class="placeholder">Talks coming soon.</p>';
    return;
  }
  TALKS.forEach((talk, i) => list.appendChild(renderTalk(talk, i)));
}

document.addEventListener("DOMContentLoaded", render);
