/* ============================================================
   Divizero — main.js
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Loader / Opening ---------- */

  var loader = document.getElementById('loader');
  var loaderLogo = document.getElementById('loaderLogo');
  var loaderBar = document.getElementById('loaderBar');

  var heroEls = [
    document.getElementById('heroEyebrow'),
    document.getElementById('heroHeadline'),
    document.getElementById('heroSub'),
    document.getElementById('heroCta'),
    document.getElementById('heroNote'),
    document.getElementById('heroDecoration'),
  ];

  function showHero() {
    heroEls.forEach(function (el) {
      if (el) el.classList.add('visible');
    });
  }

  function runIntro() {
    if (!loader) { showHero(); return; }

    var startTime = Date.now();
    var MIN_DURATION = 1200; // ms

    // Step 1: ロゴが中央でふわっと定位
    requestAnimationFrame(function () {
      setTimeout(function () {
        if (loaderLogo) loaderLogo.classList.add('visible');
      }, 50);
    });

    function finishLoader() {
      var elapsed = Date.now() - startTime;
      var remaining = Math.max(0, MIN_DURATION - elapsed);

      setTimeout(function () {
        // Step 3: ロゴが上へ退場
        if (loaderLogo) loaderLogo.classList.add('exit');

        setTimeout(function () {
          // Step 4: オーバーレイが上方向にワイプして消える
          if (loader) {
            loader.style.transition = 'transform 0.5s ease';
            loader.style.transform = 'translateY(-100%)';
          }

          // Step 5: ヒーローのコンテンツが順次フェードイン
          setTimeout(function () {
            if (loader) loader.style.display = 'none';
            showHero();
          }, 500);
        }, 400 + 300); // 0.4s visible + 0.3s keep
      }, remaining);
    }

    // ページ読み込み完了 or 最低1.2秒の遅い方
    if (document.readyState === 'complete') {
      finishLoader();
    } else {
      window.addEventListener('load', finishLoader, { once: true });
    }
  }

  // 初回のみ演出を再生
  if (loader) {
    if (sessionStorage.getItem('divizero_visited')) {
      loader.style.display = 'none';
      showHero();
    } else {
      sessionStorage.setItem('divizero_visited', '1');
      runIntro();
    }
  } else {
    showHero();
  }

  /* ---------- Nav: scroll で背景blur + shadow ---------- */

  var siteNav = document.getElementById('siteNav');
  if (siteNav) {
    var onScroll = function () {
      if (window.scrollY > 20) {
        siteNav.classList.add('scrolled');
      } else {
        siteNav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Why: アコーディオン ---------- */

  document.querySelectorAll('[data-why]').forEach(function (point) {
    var head = point.querySelector('.why-head');
    if (!head) return;

    function toggle() {
      var isOpen = point.classList.contains('open');
      // 他を閉じる
      document.querySelectorAll('[data-why].open').forEach(function (p) {
        p.classList.remove('open');
        var h = p.querySelector('.why-head');
        if (h) h.setAttribute('aria-expanded', 'false');
      });
      // 自分をトグル
      if (!isOpen) {
        point.classList.add('open');
        head.setAttribute('aria-expanded', 'true');
      }
    }

    head.addEventListener('click', toggle);
    head.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });

  /* ---------- FAQ: アコーディオン ---------- */

  document.querySelectorAll('[data-faq]').forEach(function (item) {
    var question = item.querySelector('.faq-question');
    if (!question) return;

    function toggle() {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('[data-faq].open').forEach(function (i) {
        i.classList.remove('open');
        var q = i.querySelector('.faq-question');
        if (q) q.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      }
    }

    question.addEventListener('click', toggle);
    question.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });

  /* ---------- IntersectionObserver: スクロールフェードイン ---------- */

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // フォールバック: 全表示
    document.querySelectorAll('.fade-in').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

})();
