// Add new talks here. pdf is view-only (embedded, no direct download link).
// youtubeId is the part after "v=" in a YouTube URL.
// externalUrl is for videos hosted on platforms that block embedding (e.g. VuMedi) — rendered as a link out.
const TALKS = [
  {
    title: "Newly Diagnosed Multiple Myeloma: Getting Started",
    date: "2026-08",
    description: "An introduction for patients newly diagnosed with multiple myeloma: what to expect from workup, staging, and the first steps of treatment planning.",
    pdf: "talks/ndmm-getting-started.pdf",
    youtubeId: null,
    externalUrl: null,
  },
  {
    title: "What do Clinical Trial Results Mean?",
    date: null,
    description: "Cancer Research UK's plain-language explainer on how to interpret clinical trial results.",
    pdf: null,
    youtubeId: null,
    externalUrl: "https://www.cancerresearchuk.org/about-cancer/find-a-clinical-trial/clinical-trial-results/what-do-clinical-trial-results-mean-0",
    externalLinkLabel: "Read on Cancer Research UK ↗",
  },
  {
    title: "Understanding Myeloma Basics",
    date: "2026-07",
    description: "An introduction to multiple myeloma for patients and families: what plasma cells are, how myeloma is diagnosed and staged, and what treatment and monitoring look like.",
    pdf: "talks/understanding-myeloma-basics.pdf",
    youtubeId: null,
    externalUrl: null,
  },
  {
    title: "What is Multiple Myeloma?",
    date: null,
    description: "Short overview of multiple myeloma, produced with the CU Division of Hematology.",
    pdf: null,
    youtubeId: "PGsxk5Fek3s",
    externalUrl: null,
  },
  {
    title: "¿Qué es el Mieloma Múltiple?",
    date: null,
    description: "Spanish-language version of the overview above, produced with the CU Division of Hematology.",
    pdf: null,
    youtubeId: "EkhESobeP8I",
    externalUrl: null,
  },
  {
    title: "2026 Best of Hematology: Bispecifics, CAR-T Cells, and Sequencing Strategies in MM",
    date: null,
    description: "Talk for Total Health Oncology on treatment sequencing with bispecifics and CAR-T therapies in multiple myeloma.",
    pdf: null,
    youtubeId: "U8MFdvc4fvU",
    externalUrl: null,
  },
  {
    title: "ASH 2024 Review: Improving Myeloma Care — Utilization of Urine-Free IMWG Response Criteria and Primary IVIG Prophylaxis Considerations",
    date: "2024-12",
    description: "Discusses use of urine-free IMWG response criteria and primary IVIG prophylaxis considerations in myeloma care.",
    pdf: null,
    youtubeId: null,
    externalUrl: "https://www.vumedi.com/video/ash-2024-review-improving-myeloma-care-utilization-of-urine-free-imwg-response-criteria-and-primary/",
  },
  {
    title: "ASH 2024 Review: Steroid-Sparing Regimen for Frail NDMM Patients and Bridging for BCMA CAR-T Treatment",
    date: "2024-12",
    description: "Reviews a steroid-sparing regimen option for frail newly diagnosed myeloma patients and bridging therapy ahead of BCMA CAR-T treatment.",
    pdf: null,
    youtubeId: null,
    externalUrl: "https://www.vumedi.com/video/ash-2024-review-steroid-sparing-regimen-for-frail-ndmm-patients-and-bridging-for-bcma-car-t-treatmen/",
  },
  {
    title: "ASH 2024 Review: Advances in High-Risk Smoldering Multiple Myeloma — Perspectives for Practice",
    date: "2024-12",
    description: "Perspectives on advances in high-risk smoldering multiple myeloma and how they inform clinical practice.",
    pdf: null,
    youtubeId: null,
    externalUrl: "https://www.vumedi.com/video/ash-2024-review-advances-in-high-risk-smm-perspectives-for-practice/",
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
    frame.src = `vendor/pdfjs/web/viewer.html?file=${encodeURIComponent("/" + talk.pdf)}`;
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
  } else if (talk.externalUrl) {
    const link = document.createElement("a");
    link.className = "external-link";
    link.href = talk.externalUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = talk.externalLinkLabel ?? "Watch on VuMedi ↗";
    el.appendChild(link);
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
