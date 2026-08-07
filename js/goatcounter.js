/* GoatCounter: tracks all pages that load this script. Display counter is optional (home page). */
(function() {
  function siteBase() {
    if (typeof GC_COUNT_URL !== 'string' || !GC_COUNT_URL) {
      return '';
    }
    return GC_COUNT_URL.replace(/\/count\/?$/, '');
  }

  function fetchTotalCount(el) {
    var base = siteBase();
    if (!base || !el) {
      return;
    }
    fetch(base + '/counter/TOTAL.json')
      .then(function(res) {
        if (!res.ok) { throw new Error('counter'); }
        return res.json();
      })
      .then(function(data) {
        if (data.count) {
          el.textContent = data.count;
        }
      })
      .catch(function() {
        el.textContent = '\u2014';
      });
  }

  window.initGoatCounterTrack = function() {
    if (!siteBase()) {
      return;
    }
    if (document.querySelector('script[data-goatcounter]')) {
      return;
    }
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://gc.zgo.at/count.js';
    script.setAttribute('data-goatcounter', GC_COUNT_URL);
    document.body.appendChild(script);
  };

  window.initGoatCounterDisplay = function(totalId, dashId) {
    var el = totalId ? document.getElementById(totalId) : null;
    var dash = dashId ? document.getElementById(dashId) : null;
    var base = siteBase();

    if (!base) {
      if (el) { el.textContent = '\u2014'; }
      return;
    }

    if (dash) {
      dash.href = base;
      dash.style.display = 'inline';
    }

    initGoatCounterTrack();

    function refresh() {
      fetchTotalCount(el);
    }

    refresh();
    setTimeout(refresh, 2500);
  };
})();
