'use strict';

// Counts from the camera-ready main-results table, ordered P / S / I.
const results = {
  strawberry: [[10, 6, 10], [12, 8, 10], [19, 12, 14]],
  apple: [[5, 4, 5], [6, 4, 4], [14, 8, 7]],
  banana: [[16, 12, 14], [17, 12, 14], [24, 18, 23]],
  potato: [[15, 12, 11], [9, 7, 9], [19, 12, 16]]
};
const metrics = {
  progress: { index: 0, description: 'Progress: the knife reaches a valid pre-cut state and establishes initial contact with the food.' },
  success: { index: 1, description: 'Success: the cut fully traverses the food, producing separable halves with a safe termination.' },
  integrity: { index: 2, description: 'Integrity: the food remains in acceptable condition, apart from the intended cut.' }
};
let metric = 'success';
const foodSelect = document.querySelector('#food-select');
const metricButtons = [...document.querySelectorAll('[data-metric]')];
function updateResults() {
  const food = foodSelect.value;
  const entries = food === 'all' ? Object.values(results) : [results[food]];
  const total = food === 'all' ? 100 : 25;
  const counts = [0, 1, 2].map(regime => entries.reduce((sum, row) => sum + row[regime][metrics[metric].index], 0));
  document.querySelectorAll('.bar-row').forEach((row, i) => {
    const percentage = Math.round(counts[i] / total * 100);
    row.querySelector('.bar-fill').style.width = `${percentage}%`;
    row.querySelector('.bar-value').textContent = `${percentage}%`;
    row.querySelector('.bar-count').textContent = `${counts[i]} / ${total}`;
  });
  document.querySelector('.bars').setAttribute('aria-label', `${metric} by training regime for ${food === 'all' ? 'all four foods' : food}`);
  document.querySelector('#metric-description').textContent = metrics[metric].description;
  const change = Math.round((counts[2] - counts[1]) / total * 100);
  document.querySelector('#result-summary').textContent = `Sim + Real improves ${metric} by ${change} percentage points over Real-only ${food === 'all' ? 'across all four foods' : `for ${food}`}.`;
  metricButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.metric === metric)));
}
metricButtons.forEach(button => button.addEventListener('click', () => { metric = button.dataset.metric; updateResults(); }));
foodSelect.addEventListener('change', updateResults);
document.querySelector('.metric-controls').hidden = false;
document.querySelector('.food-control').hidden = false;

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const demos = [...document.querySelectorAll('.demo-video')];
const motionToggle = document.querySelector('#motion-toggle');
let demosPaused = reducedMotion.matches;
function syncDemos() {
  motionToggle.textContent = demosPaused ? 'Play demos' : 'Pause demos';
  motionToggle.setAttribute('aria-pressed', String(demosPaused));
  demos.forEach(video => {
    if (demosPaused || document.hidden) video.pause();
    else if (video.dataset.visible === 'true') video.play().catch(() => { video.controls = true; });
  });
}
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  const video = entry.target;
  video.dataset.visible = String(entry.isIntersecting);
  if (entry.isIntersecting && !demosPaused && !document.hidden) video.play().catch(() => { video.controls = true; });
  else video.pause();
}), { threshold: 0.15 });
demos.forEach(video => observer.observe(video));
motionToggle.hidden = false;
motionToggle.addEventListener('click', () => { demosPaused = !demosPaused; syncDemos(); });
reducedMotion.addEventListener('change', () => { demosPaused = reducedMotion.matches; syncDemos(); });
document.addEventListener('visibilitychange', syncDemos);
syncDemos();

const paperVideo = document.querySelector('#paper-video');
document.querySelectorAll('[data-time]').forEach(button => button.addEventListener('click', () => {
  const seekAndPlay = () => { paperVideo.currentTime = Number(button.dataset.time); paperVideo.play().catch(() => {}); };
  if (paperVideo.readyState >= 1) seekAndPlay();
  else { paperVideo.addEventListener('loadedmetadata', seekAndPlay, { once: true }); paperVideo.load(); }
  paperVideo.focus();
}));
document.querySelector('.video-chapters').hidden = false;

const figureDialog = document.querySelector('#figure-dialog');
document.querySelectorAll('.figure-zoom').forEach(link => link.addEventListener('click', event => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  const source = link.querySelector('img');
  const image = document.querySelector('#enlarged-figure');
  image.src = link.href;
  image.alt = source.alt;
  document.querySelector('#figure-caption').textContent = link.closest('figure').querySelector('figcaption').textContent;
  figureDialog.showModal();
}));
document.querySelector('#close-figure').addEventListener('click', () => figureDialog.close());
figureDialog.addEventListener('click', event => {
  if (event.target !== figureDialog) return;
  const bounds = figureDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) figureDialog.close();
});
