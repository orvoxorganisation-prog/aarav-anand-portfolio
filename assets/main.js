/* Aarav Anand — Portfolio · shared behaviors */
(function () {
  'use strict';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Loader (home only) ── */
  (function () {
    var loader = document.getElementById('loader');
    if (!loader) return;
    var countEl = document.getElementById('count');
    var bar = document.getElementById('loadbar');
    var words = document.querySelectorAll('.loader-words span');
    function finish() { loader.classList.add('done'); document.body.style.removeProperty('overflow'); }
    if (reduced) { if (countEl) countEl.textContent = '100'; if (bar) bar.style.transform = 'scaleX(1)'; setTimeout(finish, 200); return; }
    document.body.style.overflow = 'hidden';
    var wi = 0;
    function showWord(i) { words.forEach(function (w, idx) { w.style.transition = 'opacity 0.4s ease, transform 0.4s ease'; w.style.opacity = idx === i ? '1' : '0'; w.style.transform = idx === i ? 'translateY(0)' : 'translateY(18px)'; }); }
    if (words.length) showWord(0);
    var wordTimer = setInterval(function () { wi = (wi + 1) % words.length; showWord(wi); }, 600);
    var start = null, DUR = 2000;
    function frame(t) {
      if (start === null) start = t;
      var p = Math.min((t - start) / DUR, 1);
      var n = Math.round(p * 100);
      if (countEl) countEl.textContent = String(n).padStart(3, '0');
      if (bar) bar.style.transform = 'scaleX(' + (n / 100) + ')';
      if (p < 1) requestAnimationFrame(frame);
      else { clearInterval(wordTimer); setTimeout(finish, 320); }
    }
    requestAnimationFrame(frame);
  })();

  /* ── Hero role cycling ── */
  (function () {
    var el = document.getElementById('role');
    if (!el || reduced) return;
    var roles = ['Risk Analyst', 'Finance Student', 'Co-Founder', 'Systems Builder', 'Data Analyst'];
    var i = 0;
    setInterval(function () {
      i = (i + 1) % roles.length;
      el.textContent = roles[i];
      el.classList.remove('anim'); void el.offsetWidth; el.classList.add('anim');
    }, 2400);
  })();

  /* ── Navbar shadow on scroll ── */
  (function () {
    var pill = document.getElementById('navPill');
    if (!pill) return;
    function onScroll() { pill.classList.toggle('scrolled', window.scrollY > 80); }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  })();

  /* ── Reveal on scroll ── */
  (function () {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    if (reduced || !('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    els.forEach(function (e) { io.observe(e); });
  })();

  /* ── Skill bars ── */
  (function () {
    var skills = document.querySelectorAll('.skill');
    if (!skills.length) return;
    if (reduced || !('IntersectionObserver' in window)) { skills.forEach(function (s) { s.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.5 });
    skills.forEach(function (s) { io.observe(s); });
  })();

  /* ── Count-up stats ── */
  (function () {
    var nums = document.querySelectorAll('[data-count]');
    if (!nums.length) return;
    function run(el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var dec = parseInt(el.getAttribute('data-decimals') || '0', 10);
      var suffix = el.getAttribute('data-suffix') || '';
      function fmt(v) { return v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suffix; }
      if (reduced) { el.textContent = fmt(target); return; }
      var start = null, DUR = 1500;
      function frame(t) {
        if (start === null) start = t;
        var p = Math.min((t - start) / DUR, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(target * eased);
        if (p < 1) requestAnimationFrame(frame); else el.textContent = fmt(target);
      }
      requestAnimationFrame(frame);
    }
    if (!('IntersectionObserver' in window)) { nums.forEach(run); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.6 });
    nums.forEach(function (n) { io.observe(n); });
  })();

  /* ── Footer marquee ── */
  (function () {
    var track = document.getElementById('marquee');
    if (!track) return;
    var unit = 'UNDERSTANDING RISK, NOT AVOIDING IT &nbsp;<span class="font-display italic">&#8226;</span>&nbsp; ';
    var html = '';
    for (var i = 0; i < 8; i++) html += '<span>' + unit + '</span>';
    track.innerHTML = html + html;
    if (reduced) return;
    var x = 0, half = 0;
    function measure() { half = track.scrollWidth / 2; }
    measure(); window.addEventListener('resize', measure, { passive: true });
    function tick() { x -= 0.55; if (half && -x >= half) x += half; track.style.transform = 'translateX(' + x + 'px)'; requestAnimationFrame(tick); }
    requestAnimationFrame(tick);
  })();

  /* ── Footer year ── */
  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

  /* ── Background particle network ── */
  (function () {
    var canvas = document.getElementById('bg-canvas');
    if (!canvas || reduced) return;
    var ctx = canvas.getContext('2d');
    var w, h, dpr, points = [];
    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = Math.floor(innerWidth * dpr);
      h = canvas.height = Math.floor(innerHeight * dpr);
      canvas.style.width = innerWidth + 'px'; canvas.style.height = innerHeight + 'px';
      var count = Math.min(58, Math.floor(innerWidth * innerHeight / 24000));
      points = [];
      for (var i = 0; i < count; i++) {
        points.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.18 * dpr, vy: (Math.random() - 0.5) * 0.18 * dpr });
      }
    }
    size();
    var resizeT;
    window.addEventListener('resize', function () { clearTimeout(resizeT); resizeT = setTimeout(size, 200); }, { passive: true });
    var LINK = 130;
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < points.length; i++) {
        var p = points[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.4 * dpr, 0, Math.PI * 2); ctx.fillStyle = 'rgba(137,170,204,0.6)'; ctx.fill();
      }
      for (var a = 0; a < points.length; a++) {
        for (var b = a + 1; b < points.length; b++) {
          var dx = points[a].x - points[b].x, dy = points[a].y - points[b].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK * dpr) {
            ctx.beginPath(); ctx.moveTo(points[a].x, points[a].y); ctx.lineTo(points[b].x, points[b].y);
            ctx.strokeStyle = 'rgba(78,133,191,' + (0.16 * (1 - dist / (LINK * dpr))) + ')';
            ctx.lineWidth = dpr; ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  })();
})();
