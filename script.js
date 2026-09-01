document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page || 'overview';

  const TRASH_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>';

  /* ================= Shared: sidebar ================= */
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    const backdrop = document.getElementById('backdrop');
    const toggleBtn = document.getElementById('sidebarToggle');

    const openSidebar = () => {
      sidebar.classList.add('is-open');
      backdrop.classList.add('is-visible');
      document.body.style.overflow = 'hidden';
    };

    const closeSidebar = () => {
      sidebar.classList.remove('is-open');
      backdrop.classList.remove('is-visible');
      document.body.style.overflow = '';
    };

    const handleToggle = () => {
      if (window.innerWidth <= 900) {
        if (sidebar.classList.contains('is-open')) {
          closeSidebar();
        } else {
          openSidebar();
        }
      } else {
        document.body.classList.toggle('sb-collapsed');
      }
    };

    toggleBtn.addEventListener('click', handleToggle);
    backdrop.addEventListener('click', closeSidebar);

    const hamburger = document.getElementById('hamburger');
    if (hamburger) hamburger.addEventListener('click', handleToggle);

    window.addEventListener('resize', () => {
      if (window.innerWidth <= 900) {
        document.body.classList.remove('sb-collapsed');
      } else {
        closeSidebar();
      }
    });

    document.querySelectorAll('.nav-toggle-wrap').forEach((wrap) => {
      const btn = wrap.querySelector('.nav-toggle');
      if (btn) {
        const key = 'banyan_nav_' + (btn.getAttribute('data-label') || wrap.querySelector('a')?.getAttribute('href') || '');
        if (localStorage.getItem(key) === 'open') {
          btn.setAttribute('aria-expanded', 'true');
        }
        // Always open the group that contains the current page
        if (wrap.querySelector('.nav-sub__link.is-active')) {
          btn.setAttribute('aria-expanded', 'true');
        }
      }
      wrap.addEventListener('click', (e) => {
        if (e.target.closest('.nav-sub')) return;
        const btn = wrap.querySelector('.nav-toggle');
        if (!btn) return;
        const wasOpen = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!wasOpen));
        const key = 'banyan_nav_' + (btn.getAttribute('data-label') || wrap.querySelector('a')?.getAttribute('href') || '');
        try { localStorage.setItem(key, !wasOpen ? 'open' : 'closed'); } catch (e) {}
      });
    });

    const signOut = document.getElementById('signOut');
    if (signOut) {
      signOut.addEventListener('click', () => {
        try {
          localStorage.removeItem('banyan_signed_in');
        } catch (e) {}
        window.location.href = 'login.html';
      });
    }
  }

  /* ================= Login page ================= */
  if (page === 'login') {
    const form = document.getElementById('loginForm');
    const err = document.getElementById('loginError');
    const btn = document.getElementById('loginBtn');
    const pass = document.getElementById('loginPassword');
    const toggle = document.getElementById('togglePassword');

    toggle.addEventListener('click', () => {
      const show = pass.type === 'password';
      pass.type = show ? 'text' : 'password';
      toggle.classList.toggle('is-visible', show);
      toggle.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    });

    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      if (!email || !pass.value) {
        err.textContent = 'Please enter your email and password.';
        err.classList.add('is-visible');
        return;
      }
      if (pass.value !== '12345678') {
        err.textContent = 'Incorrect password. Please try again.';
        err.classList.add('is-visible');
        return;
      }
      err.classList.remove('is-visible');
      btn.textContent = 'Signing in…';
      btn.disabled = true;
      try {
        localStorage.setItem('banyan_signed_in', '1');
      } catch (e) {}
      window.location.href = 'index.html';
    });
  }

  /* ================= Shared: calendar ================= */
  const calBody = document.getElementById('calBody');
  if (calBody) {
    const KIND_COLORS = {
      viewing: '#3b82f6',
      checkin: '#16a34a',
      checkout: '#dc2626',
      contract: '#f97316',
      other: '#8b5cf6'
    };

    const KIND_LABELS = {
      viewing: 'Viewing',
      checkin: 'Check-in',
      checkout: 'Check-out',
      contract: 'Contract',
      other: 'Other'
    };

    const today = new Date();
    const OVERVIEW_EVENTS = (() => {
      const byOffset = {
        [-4]: [
          { time: '9:00 AM', title: '5a Check-in', address: '123 Maple St', kind: 'checkin' },
          { time: '4:00 PM', title: 'Viewing', address: '234 Palm St', kind: 'viewing' }
        ],
        [-3]: [
          { time: '11:00 AM', title: 'Viewing', address: '456 Oak Ave', kind: 'viewing' }
        ],
        [-2]: [
          { time: '9:00 AM', title: '5a Check-in', address: '123 Maple St', kind: 'checkin' },
          { time: '2:00 PM', title: 'Contract signing', address: '789 Pine Rd', kind: 'contract' }
        ],
        [-1]: [
          { time: '10:00 AM', title: 'Viewing', address: '456 Oak Ave', kind: 'viewing' },
          { time: '2:00 PM', title: 'Contract signing', address: '789 Pine Rd', kind: 'contract' }
        ],
        [0]: [
          { time: '9:00 AM', title: '5a Check-in', address: '123 Maple St', kind: 'checkin' },
          { time: '11:00 AM', title: '5a Check-out', address: '321 Cedar Ln', kind: 'checkout' },
          { time: '4:00 PM', title: 'Listing photoshoot', address: '555 Beach Rd', kind: 'other' }
        ]
      };
      const out = {};
      for (const off in byOffset) {
        const d = new Date(today);
        d.setDate(d.getDate() + Number(off));
        out[toKey(d)] = byOffset[off];
      }
      return out;
    })();

    const AVAIL_EVENTS = {};

    const EVENTS = page === 'availability' ? AVAIL_EVENTS : OVERVIEW_EVENTS;

    const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const todayKey = toKey(today);

    function toKey(d) {
      return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
    }

    function pad(n) {
      return String(n).padStart(2, '0');
    }

    const state = { date: new Date(), view: 'month', filter: 'all' };
    const activeView = document.querySelector('.seg__btn.is-active');
    if (activeView) state.view = activeView.dataset.view;

    const calMonthEl = document.getElementById('calMonth');
    const todayLabel = document.getElementById('todayLabel');
    const dashDate = document.getElementById('dashDate');
    const calPicker = document.getElementById('calPicker');
    const calTodayBtn = document.getElementById('calToday');
    const calFilter = document.getElementById('calFilter');

    function dotColor(e) {
      return KIND_COLORS[e.kind] || '#8a8f98';
    }

    function matchesFilter(e) {
      return state.filter === 'all' || e.kind === state.filter;
    }

    function filteredByDay(key) {
      return (EVENTS[key] || []).filter(matchesFilter);
    }

    function allEvents() {
      const out = [];
      for (const key in EVENTS) {
        EVENTS[key].forEach((e) => {
          if (matchesFilter(e)) out.push({ key: key, time: e.time, title: e.title, address: e.address, kind: e.kind });
        });
      }
      return out;
    }

    function daysInMonth(year, month) {
      return new Date(year, month + 1, 0).getDate();
    }

    function firstWeekday(year, month) {
      return new Date(year, month, 1).getDay();
    }

    function addDays(d, n) {
      const out = new Date(d);
      out.setDate(out.getDate() + n);
      return out;
    }

    function startOfWeek(d) {
      return addDays(d, -d.getDay());
    }

    function hourLabel(h) {
      if (h === 0) return '12 AM';
      if (h < 12) return h + ' AM';
      if (h === 12) return '12 PM';
      return (h - 12) + ' PM';
    }

    function hourOf(time) {
      const m = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
      if (!m) return -1;
      let h = parseInt(m[1], 10);
      if (m[3].toUpperCase() === 'PM' && h < 12) h += 12;
      if (m[3].toUpperCase() === 'AM' && h === 12) h = 0;
      return h;
    }

    function timeToMinutes(time) {
      const m = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
      if (!m) return 0;
      let h = parseInt(m[1], 10);
      if (m[3].toUpperCase() === 'PM' && h < 12) h += 12;
      if (m[3].toUpperCase() === 'AM' && h === 12) h = 0;
      return h * 60 + parseInt(m[2], 10);
    }

    function escapeHtml(str) {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    }

    function monthLabel(d) {
      return MONTHS[d.getMonth()] + ' ' + d.getFullYear();
    }

    function render() {
      calMonthEl.textContent = monthLabel(state.date);
      if (todayLabel) {
        todayLabel.innerHTML = 'Today · <b>' + WEEKDAYS[today.getDay()] + ', ' + MONTHS[today.getMonth()].slice(0, 3) + ' ' + today.getDate() + '</b>';
      }
      if (dashDate) {
        dashDate.textContent = WEEKDAYS[today.getDay()] + ', ' + MONTHS[today.getMonth()].slice(0, 3) + ' ' + today.getDate() + ', ' + today.getFullYear();
      }
      if (state.view === 'week') calBody.innerHTML = renderWeek();
      else if (state.view === 'list') calBody.innerHTML = renderList();
      else calBody.innerHTML = renderMonth();
    }

    /* ---- Month view ---- */
    function monthIndicator(key) {
      const list = filteredByDay(key);
      if (!list.length) return '';
      const dots = list
        .slice(0, 4)
        .map((e) => '<span class="cal-m__dot" style="background:' + dotColor(e) + '"></span>')
        .join('');
      const more = list.length > 4 ? '<span class="cal-m__more">+' + (list.length - 4) + '</span>' : '';
      return '<span class="cal-m__indicator">' + dots + more + '</span>';
    }

    function renderMonth() {
      const y = state.date.getFullYear();
      const m = state.date.getMonth();
      const total = daysInMonth(y, m);
      const lead = firstWeekday(y, m);
      const prevTotal = daysInMonth(y, m - 1);
      const cells = [];

      for (let i = lead - 1; i >= 0; i--) {
        const d = new Date(y, m - 1, prevTotal - i);
        const key = toKey(d);
        cells.push('<div class="cal-m__cell is-outside" data-key="' + key + '"><span class="cal-m__num">' + (prevTotal - i) + '</span></div>');
      }

      for (let d = 1; d <= total; d++) {
        const key = toKey(new Date(y, m, d));
        const isToday = key === todayKey ? ' is-today' : '';
        cells.push(
          '<div class="cal-m__cell' + isToday + '" data-key="' + key + '"><span class="cal-m__num' + isToday + '">' + d + '</span>' + monthIndicator(key) + '</div>'
        );
      }

      const trailing = (7 - (cells.length % 7)) % 7;
      for (let d = 1; d <= trailing; d++) {
        const key = toKey(new Date(y, m + 1, d));
        cells.push('<div class="cal-m__cell is-outside" data-key="' + key + '"><span class="cal-m__num">' + d + '</span></div>');
      }

      const dows = WEEKDAYS.map((d) => '<div class="cal-m__dow">' + d + '</div>').join('');
      return '<div class="cal-m__grid">' + dows + cells.join('') + '</div>';
    }

    /* ---- Week view (hour grid) ---- */
    function weekEventHtml(e, key, idx) {
      return (
        '<button type="button" class="cal-wg__event cal-wg__event--' + e.kind + '" data-key="' + key + '" data-event="' + idx + '" title="' + escapeHtml(e.title) + '">' +
        '<span class="cal-wg__event-time">' + escapeHtml(e.time) + '</span>' +
        '<span class="cal-wg__event-name">' + escapeHtml(e.title) + '</span>' +
        '<span class="cal-wg__event-addr">' + escapeHtml(e.address || '') + '</span>' +
        '</button>'
      );
    }

    function renderWeek() {
      const weekStart = startOfWeek(state.date);
      const parts = [];
      parts.push('<div class="cal-wg__corner cal-wg__header"></div>');

      for (let i = 0; i < 7; i++) {
        const d = addDays(weekStart, i);
        const key = toKey(d);
        const isToday = key === todayKey;
        parts.push(
          '<div class="cal-wg__header' + (isToday ? ' is-today-col' : '') + '" data-key="' + key + '">' +
          '<span class="cal-wg__dow">' + WEEKDAYS[d.getDay()] + '</span>' +
          '<span class="cal-wg__num' + (isToday ? ' is-today' : '') + '">' + d.getDate() + '</span>' +
          '</div>'
        );
      }

      for (let h = 8; h <= 20; h++) {
        parts.push(
          '<div class="cal-wg__time' + (h % 2 === 0 ? ' has-label' : '') + '"><span>' + (h % 2 === 0 ? hourLabel(h) : '') + '</span></div>'
        );
        for (let i = 0; i < 7; i++) {
          const d = addDays(weekStart, i);
          const key = toKey(d);
          const isToday = key === todayKey;
          const evts = filteredByDay(key).filter((e) => hourOf(e.time) === h);
          const inner = evts.map((e, idx) => weekEventHtml(e, key, idx)).join('');
          parts.push(
            '<div class="cal-wg__cell' + (isToday ? ' is-today-col' : '') + '" data-key="' + key + '" data-hour="' + h + '">' + inner + '</div>'
          );
        }
      }

      return '<div class="cal-wg">' + parts.join('') + '</div>';
    }

    /* ---- List view ---- */
    let listEvents = [];
    function renderList() {
      const y = state.date.getFullYear();
      const m = state.date.getMonth();
      listEvents = allEvents()
        .filter((e) => {
          const p = e.key.split('-');
          return Number(p[0]) === y && Number(p[1]) - 1 === m;
        })
        .sort((a, b) => {
          if (a.key !== b.key) return a.key.localeCompare(b.key);
          return timeToMinutes(a.time) - timeToMinutes(b.time);
        });

      if (!listEvents.length) {
        return '<p class="cal-l__empty">No events in ' + monthLabel(state.date) + '.</p>';
      }

      return (
        '<div class="cal-l">' +
        listEvents
          .map((e, i) => {
            const p = e.key.split('-');
            const d = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
            return (
              '<div class="cal-l__row" data-key="' + e.key + '" data-event="' + i + '">' +
              '<span class="cal-l__dot" style="background:' + dotColor(e) + '"></span>' +
              '<div class="cal-l__info">' +
              '<p class="cal-l__name">' + escapeHtml(e.title) + '</p>' +
              '<p class="cal-l__addr">' + escapeHtml(e.address || '') + '</p>' +
              '</div>' +
              '<span class="cal-l__date">' + WEEKDAYS[d.getDay()] + ', ' + MONTHS[d.getMonth()].slice(0, 3) + ' ' + d.getDate() + ' · ' + escapeHtml(e.time) + '</span>' +
              '</div>'
            );
          })
          .join('') +
        '</div>'
      );
    }

    /* ---- Modal ---- */
    const dayModal = document.getElementById('dayModal');
    const dayModalTitle = document.getElementById('dayModalTitle');
    const dayModalBody = document.getElementById('dayModalBody');
    const dayModalClose = document.getElementById('dayModalClose');

    function dayLabel(key) {
      const p = key.split('-');
      const d = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
      return WEEKDAYS[d.getDay()] + ', ' + MONTHS[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
    }

    function showModal(title, html) {
      dayModalTitle.textContent = title;
      dayModalBody.innerHTML = html;
      dayModal.hidden = false;
      dayModalClose.focus();
      document.body.style.overflow = 'hidden';
    }

    function openDayModal(key) {
      const list = filteredByDay(key);
      if (!list.length) {
        showModal(dayLabel(key), '<p class="modal__empty">No events scheduled.</p>');
      } else {
        showModal(
          dayLabel(key),
          list
            .map((e) => {
              return (
                '<div class="modal-event">' +
                '<span class="modal-event__dot" style="background:' + dotColor(e) + '"></span>' +
                '<div>' +
                '<p class="modal-event__title">' + escapeHtml(e.title) + '</p>' +
                '<p class="modal-event__meta">' + escapeHtml(e.time) + (e.address ? ' · ' + escapeHtml(e.address) : '') + '</p>' +
                '</div>' +
                '</div>'
              );
            })
            .join('')
        );
      }
    }

    function openEventModal(e, key) {
      showModal(
        escapeHtml(e.title),
        '<div class="modal-event">' +
        '<span class="modal-event__dot" style="background:' + dotColor(e) + '"></span>' +
        '<div>' +
        '<p class="modal-event__title">' + escapeHtml(e.title) + '</p>' +
        '<p class="modal-event__meta">' + escapeHtml(dayLabel(key)) + ' · ' + escapeHtml(e.time) + '</p>' +
        (e.address ? '<p class="modal-event__meta">' + escapeHtml(e.address) + '</p>' : '') +
        '<p class="modal-event__badge">' + escapeHtml(KIND_LABELS[e.kind] || e.kind) + '</p>' +
        '</div>' +
        '</div>'
      );
    }

    function closeDayModal() {
      dayModal.hidden = true;
      document.body.style.overflow = '';
    }

    calBody.addEventListener('click', (ev) => {
      const evt = ev.target.closest('.cal-wg__event, .cal-l__row');
      if (evt) {
        const key = evt.dataset.key;
        if (evt.classList.contains('cal-wg__event')) {
          const list = filteredByDay(key);
          const e = list[Number(evt.dataset.event)];
          if (e) openEventModal(e, key);
        } else {
          const e = listEvents[Number(evt.dataset.event)];
          if (e) openEventModal(e, e.key);
        }
        return;
      }
      const cell = ev.target.closest('.cal-m__cell');
      if (cell && cell.dataset.key) openDayModal(cell.dataset.key);
    });

    dayModalClose.addEventListener('click', closeDayModal);
    dayModal.addEventListener('click', (ev) => {
      if (ev.target === dayModal) closeDayModal();
    });
    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape' && !dayModal.hidden) closeDayModal();
    });

    document.getElementById('prevMonth').addEventListener('click', () => {
      shiftDate(-1);
    });
    document.getElementById('nextMonth').addEventListener('click', () => {
      shiftDate(1);
    });

    function shiftDate(dir) {
      if (state.view === 'week') {
        state.date = addDays(state.date, dir * 7);
      } else {
        const y = state.date.getFullYear();
        const m = state.date.getMonth() + dir;
        const day = Math.min(state.date.getDate(), daysInMonth(y, m));
        state.date = new Date(y, m, day);
      }
      render();
    }

    if (calTodayBtn) {
      calTodayBtn.addEventListener('click', () => {
        state.date = new Date(today);
        render();
      });
    }

    if (calFilter) {
      calFilter.addEventListener('change', () => {
        state.filter = calFilter.value;
        render();
      });
    }

    document.querySelectorAll('.seg__btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.seg__btn').forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        state.view = btn.dataset.view;
        render();
      });
    });

    /* ---- Month/year selector popover ---- */
    let pickerYear = state.date.getFullYear();
    function buildPicker() {
      if (!calPicker) return;
      calPicker.innerHTML =
        '<div class="cal-picker__head">' +
        '<button type="button" class="icon-btn cal-picker__nav" data-nav="-1" aria-label="Previous year"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg></button>' +
        '<span class="cal-picker__year">' + pickerYear + '</span>' +
        '<button type="button" class="icon-btn cal-picker__nav" data-nav="1" aria-label="Next year"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></button>' +
        '</div>' +
        '<div class="cal-picker__grid">' +
        MONTHS.map((mn, i) =>
          '<button type="button" class="cal-picker__mon' + (i === state.date.getMonth() && pickerYear === state.date.getFullYear() ? ' is-active' : '') + '" data-mon="' + i + '">' + mn.slice(0, 3) + '</button>'
        ).join('') +
        '</div>';
      calPicker.hidden = false;
    }

    if (calPicker && calMonthEl && calMonthEl.tagName === 'BUTTON') {
      calMonthEl.addEventListener('click', (ev) => {
        ev.stopPropagation();
        if (!calPicker.hidden) {
          calPicker.hidden = true;
          return;
        }
        pickerYear = state.date.getFullYear();
        buildPicker();
      });

      calPicker.addEventListener('click', (ev) => {
        const t = ev.target.closest('button');
        if (!t) return;
        if (t.dataset.nav) {
          pickerYear += Number(t.dataset.nav);
          buildPicker();
        } else if (t.dataset.mon !== undefined) {
          const m = Number(t.dataset.mon);
          state.date = new Date(pickerYear, m, Math.min(state.date.getDate(), daysInMonth(pickerYear, m)));
          calPicker.hidden = true;
          render();
        }
      });

      document.addEventListener('click', (ev) => {
        if (!calPicker.hidden && !ev.target.closest('.cal-head')) calPicker.hidden = true;
      });
    }

    render();
  }

  /* ================= Overview only ================= */
  if (page === 'overview') {
    const headerCalBtn = document.getElementById('headerCalendarBtn');
    if (headerCalBtn) {
      headerCalBtn.addEventListener('click', () => {
        const cal = document.getElementById('calendarSection');
        if (cal) cal.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }

  /* ================= Availability only ================= */
  if (page === 'availability') {
    const tabs = document.querySelectorAll('.filter-tab');
    const list = document.getElementById('leaseEvents');
    const count = document.getElementById('leaseCount');
    const emptyMsg = list.querySelector('.avail-empty');

    const update = (filter) => {
      let visible = 0;
      list.querySelectorAll('.avail-item').forEach((row) => {
        const days = parseInt(row.dataset.days, 10);
        const show =
          filter === 'all' ||
          (filter === 'expired' ? days < 0 : days >= 0 && days <= parseInt(filter, 10));
        row.style.display = show ? '' : 'none';
        if (show) visible += 1;
      });
      emptyMsg.hidden = visible !== 0;
      count.textContent = visible;
    };

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('is-active'));
        tab.classList.add('is-active');
        update(tab.dataset.filter);
      });
    });

    update('all');
  }

  /* ================= Supply Overview only ================= */
  if (page === 'supply') {
    document.querySelectorAll('.supply-area').forEach((item) => {
      const head = item.querySelector('.supply-area__head');
      if (!head || head.tagName !== 'BUTTON') return;
      head.addEventListener('click', () => {
        const open = head.getAttribute('aria-expanded') === 'true';
        head.setAttribute('aria-expanded', String(!open));
        item.classList.toggle('is-open', !open);
      });
    });
  }

  /* ================= Client Inbox only ================= */
  if (page === 'client-inbox') {
    const body = document.getElementById('inboxBody');
    const empty = document.getElementById('inboxEmpty');
    const countEl = document.getElementById('inboxCount');
    const searchInput = document.getElementById('inboxSearch');
    const rows = Array.from(body.querySelectorAll('.inbox-row'));

    const summaryMap = {
      overdue: '.inbox-card--overdue .inbox-card__num',
      high: '.inbox-card--high .inbox-card__num',
      newLead: '.inbox-card--new .inbox-card__num',
      viewing: '.inbox-card--viewing .inbox-card__num',
      shortlist: '.inbox-card--shortlist .inbox-card__num'
    };

    function matches(row, query, journey, interest, objective, agent) {
      if (journey !== 'all' && row.dataset.journey !== journey) return false;
      if (objective !== 'all' && row.dataset.objective !== objective) return false;
      if (interest === 'none') {
        if (row.dataset.interest) return false;
      } else if (interest !== 'all' && row.dataset.interest !== interest) {
        return false;
      }
      if (agent === 'none') {
        if (row.dataset.agent) return false;
      } else if (agent !== 'all' && row.dataset.agent !== agent) {
        return false;
      }
      if (query && !row.dataset.query.toLowerCase().includes(query)) return false;
      return true;
    }

    function render() {
      const query = searchInput.value.trim().toLowerCase();
      const journey = document.getElementById('journeySelect').value;
      const interest = document.getElementById('interestSelect').value;
      const objective = document.getElementById('objectiveSelect').value;
      const agent = document.getElementById('agentSelect').value;
      const counts = { overdue: 0, high: 0, newLead: 0, viewing: 0, shortlist: 0 };
      let visible = 0;

      rows.forEach((row) => {
        const show = matches(row, query, journey, interest, objective, agent);
        row.style.display = show ? '' : 'none';
        if (show) {
          visible += 1;
          if (row.dataset.attention === 'Follow-up Overdue') counts.overdue += 1;
          if (row.dataset.priority === 'high') counts.high += 1;
          if (row.dataset.journey === 'New') counts.newLead += 1;
          if (row.dataset.journey === 'Viewing') counts.viewing += 1;
          if (row.dataset.journey === 'Shortlist Active') counts.shortlist += 1;
        }
      });

      for (const key in counts) {
        const el = document.querySelector(summaryMap[key]);
        if (el) el.textContent = counts[key];
      }

      empty.hidden = visible !== 0;
      countEl.textContent = visible;
    }

    searchInput.addEventListener('input', render);
    ['journeySelect', 'interestSelect', 'objectiveSelect', 'agentSelect'].forEach((id) => {
      document.getElementById(id).addEventListener('change', render);
    });
    document.getElementById('inboxFilterBtn').addEventListener('click', render);
    document.getElementById('inboxResetBtn').addEventListener('click', () => {
      searchInput.value = '';
      document.getElementById('journeySelect').value = 'all';
      document.getElementById('interestSelect').value = 'all';
      document.getElementById('objectiveSelect').value = 'all';
      document.getElementById('agentSelect').value = 'all';
      render();
    });

    render();
  }

  /* ================= Opportunities only ================= */
  if (page === 'opportunities') {
    const body = document.getElementById('oppBody');
    const empty = document.getElementById('oppEmpty');
    const countEl = document.getElementById('oppCount');
    const searchInput = document.getElementById('oppSearch');
    const rows = Array.from(body.querySelectorAll('.opp-row'));

    let filtered = [];

    function matches(row, query, priority, pipeline, agent) {
      if (priority !== 'all' && row.dataset.priority !== priority) return false;
      if (pipeline !== 'all' && row.dataset.pipeline !== pipeline) return false;
      if (agent === 'none') {
        if (row.dataset.agent) return false;
      } else if (agent !== 'all' && row.dataset.agent !== agent) {
        return false;
      }
      if (query && !row.dataset.query.toLowerCase().includes(query)) return false;
      return true;
    }

    function applyFilters() {
      const query = searchInput.value.trim().toLowerCase();
      const priority = document.getElementById('prioritySelect').value;
      const pipeline = document.getElementById('pipelineSelect').value;
      const agent = document.getElementById('agentSelect').value;

      filtered = rows.filter((row) => matches(row, query, priority, pipeline, agent));
      render();
    }

    function render() {
      rows.forEach((row) => {
        row.style.display = filtered.includes(row) ? '' : 'none';
      });

      empty.hidden = filtered.length !== 0;
      countEl.textContent = filtered.length;
    }

    searchInput.addEventListener('input', applyFilters);
    ['prioritySelect', 'pipelineSelect', 'agentSelect'].forEach((id) => {
      document.getElementById(id).addEventListener('change', applyFilters);
    });
    document.getElementById('oppFilterBtn').addEventListener('click', applyFilters);
    document.getElementById('oppResetBtn').addEventListener('click', () => {
      searchInput.value = '';
      document.getElementById('prioritySelect').value = 'all';
      document.getElementById('pipelineSelect').value = 'all';
      document.getElementById('agentSelect').value = 'all';
      applyFilters();
    });

    applyFilters();
  }

  /* ================= Shortlist pages ================= */
  const SL_AVAILABLE = [
    { name: '2-Bedroom Tropical Villa with Private Pool — Nyuh Kuning, Ubud', area: 'Ubud', price: 35000000 },
    { name: '2-Story Villa with Garden — Nyuh Kuning, Ubud', area: 'Ubud', price: 35500000 },
    { name: '3 Bedroom Villa with Stunning Rice Field & Sunrise Views in Nyuh Kuning, Ubud', area: 'Ubud', price: 18600000 },
    { name: '3-Bedroom Eco-Luxury Home in Taman Petanu Eco Neighborhood', area: 'Ubud', price: 35770028 },
    { name: '3-Bedroom Family Villa with Private Pool & Garden - Singakerta, 5 Mins to Nyuh Kuning, Ubud', area: 'Ubud', price: 450000000 },
    { name: '4-Bedroom Family Villa Near Green School — Pool, Garden & Community Living', area: 'Ubud', price: 127877851 },
    { name: '6BR Luxury Villa with Basketball Court, Pool & Rice Field Views — Ubud', area: 'Ubud', price: 165000000 },
    { name: 'A Bright & Contemporary 2-Bedroom Villa in Ubud', area: 'Ubud', price: 55000000 },
    { name: 'A Private 2 bedroom Villa Sanctuary in Pejeng — Contemporary Living Amid the Natural Beauty of Bali', area: 'Ubud', price: 390000000 },
    { name: 'A Striking Contemporary Villa with Panoramic Rice Field Views in Abiansemal, Bali', area: 'Ubud', price: 66000000 },
    { name: 'A Thoughtfully Designed 3-Bedroom Eco Villa in a Private Green Community — Sibang, Bali - 3 mins walk from Green School', area: 'Ubud', price: 49183789 },
    { name: 'Affordable 2BR Private Pool Villa in Nyuh Kuning – Long Term Rental Family Home', area: 'Ubud', price: 19800000 },
    { name: 'Alke Villa', area: 'Ubud', price: 35000000 },
    { name: 'Bambu Nest GS', area: 'Ubud', price: 89000000 },
    { name: 'Betawi', area: 'Ubud', price: 12000000 },
    { name: 'Blue Swing Villa 1', area: 'Ubud', price: 27000000 },
    { name: 'Blue Swing Villa 2', area: 'Ubud', price: 27000000 },
    { name: 'Butterfly Bungalow', area: 'Ubud', price: 15000000 },
    { name: 'Cala Villa', area: 'Ubud', price: 12000000 },
    { name: 'Casa Yemi', area: 'Ubud', price: 33000000 },
    { name: 'Casabelle Villa', area: 'Ubud', price: 51866541 },
    { name: 'Charming 3-Bedroom Traditional Balinese Villa with Tropical Garden — 5 mins from Green School', area: 'Ubud', price: 310000000 },
    { name: 'Charming Joglo House with Direct Rice Field Views and Lush Private Garden in Ubud, Bali', area: 'Ubud', price: 35500000 },
    { name: 'Charming Villa in Nyuh Kuning — 2 Bedrooms + Studio', area: 'Ubud', price: 28000000 },
    { name: 'Damai Eco Villa', area: 'Ubud', price: 18000000 },
    { name: 'Emerald Lotus Villa', area: 'Ubud', price: 76900000 },
    { name: 'Immersive Jungle Retreat with River Views in Nyuh Kuning, Ubud', area: 'Ubud', price: 30000000 },
    { name: 'Jambul Room downstairs 1', area: 'Ubud', price: 10000000 },
    { name: 'Jambul Room downstairs 2', area: 'Ubud', price: 10000000 },
    { name: 'Jambul Room upstairs', area: 'Ubud', price: 9000000 },
    { name: 'Jasmine Apartment', area: 'Ubud', price: 6500000 },
    { name: 'Jasmine Eco Villa', area: 'Ubud', price: 13500000 },
    { name: 'Joglo Sunrise Villa', area: 'Ubud', price: 20000000 },
    { name: 'Kasa Apartment', area: 'Ubud', price: 9500000 },
    { name: 'Lamitampa 1', area: 'Ubud', price: 16500000 },
    { name: 'Lamitampa 2', area: 'Ubud', price: 15500000 },
    { name: 'Lamitampa 3', area: 'Ubud', price: 18600000 },
    { name: 'Loft New York', area: 'Ubud', price: 74300000 },
    { name: 'Miami Villa', area: 'Ubud', price: 134000000 },
    { name: 'Modern 2-Bedroom Villa for Rent in Ubud, Bali — Private Pool', area: 'Ubud', price: 45000000 },
    { name: 'Morning Light House GS', area: 'Ubud', price: 112000000 },
    { name: 'Nora House', area: 'Ubud', price: 15000000 },
    { name: 'Peaceful Villa Space with Garden Access in the Heart of Nyuh Kuning, Ubud', area: 'Ubud', price: 29000000 },
    { name: 'Pengkolan Villa', area: 'Ubud', price: 45000000 },
    { name: 'Rejeki 3 – Full House', area: 'Ubud', price: 22000000 },
    { name: 'Rejeki Cozy Studio', area: 'Ubud', price: 6500000 },
    { name: 'Rumah Baliku', area: 'Ubud', price: 17500000 },
    { name: 'Rumah Gerbang Biru Downstairs', area: 'Ubud', price: 22000000 },
    { name: 'Rumah Gerbang Biru Upstairs', area: 'Ubud', price: 22000000 },
    { name: 'Rumah Kelusa Asri', area: 'Ubud', price: 6000000 }
  ];

  function initShortlistPage(shortlists, copyPath) {
    const availListEl = document.getElementById('slAvailList');
    const onListEl = document.getElementById('slOnList');
    const pillsEl = document.getElementById('slPills');
    const availEmpty = document.getElementById('slAvailEmpty');
    const availCountEl = document.getElementById('slAvailCount');
    const onCountEl = document.getElementById('slOnCount');
    const pageCountEl = document.getElementById('slCount');

    const AVAILABLE = SL_AVAILABLE;

    const state = { active: Object.keys(shortlists)[0], interest: 'rent', min: '', max: '', query: '' };

    function activeList() {
      return shortlists[state.active].items;
    }

    function inShortlist(name) {
      return activeList().some((it) => it.name === name);
    }

    function fmtPrice(v) {
      return 'IDR ' + Number(v).toLocaleString('en-US');
    }

    function renderPills() {
      pillsEl.innerHTML = '';
      Object.keys(shortlists).forEach((id) => {
        const sl = shortlists[id];
        const pill = document.createElement('button');
        pill.type = 'button';
        pill.className = 'sl-pill' + (id === state.active ? ' is-active' : '');
        pill.dataset.sl = id;
        const name = document.createElement('span');
        name.className = 'sl-pill__name';
        name.textContent = sl.name;
        const count = document.createElement('span');
        count.className = 'sl-pill__count';
        count.textContent = '· ' + sl.items.length;
        const live = document.createElement('span');
        live.className = 'sl-live';
        live.textContent = '✓ Live';
        pill.append(name, count);
        if (sl.live) pill.appendChild(live);
        pillsEl.appendChild(pill);
      });
    }

    function renderAvail() {
      availListEl.innerHTML = '';
      let visible = 0;
      AVAILABLE.forEach((a) => {
        if (state.interest !== 'rent') return;
        if (state.min && a.price < Number(state.min)) return;
        if (state.max && a.price > Number(state.max)) return;
        if (state.query && a.name.toLowerCase().indexOf(state.query) === -1) return;
        visible += 1;

        const li = document.createElement('li');
        li.className = 'sl-item';
        li.dataset.name = a.name;

        const text = document.createElement('div');
        text.className = 'sl-item__text';
        const name = document.createElement('p');
        name.className = 'sl-item__name';
        name.textContent = a.name;
        const meta = document.createElement('p');
        meta.className = 'sl-item__meta';
        meta.textContent = a.area + ' · ' + fmtPrice(a.price);
        text.append(name, meta);

        if (inShortlist(a.name)) {
          const tag = document.createElement('span');
          tag.className = 'sl-on-tag';
          tag.textContent = '✓ On shortlist';
          li.append(text, tag);
        } else {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'btn btn-ghost sl-add';
          btn.textContent = '+ Add';
          li.append(text, btn);
        }
        availListEl.appendChild(li);
      });
      if (availCountEl) availCountEl.textContent = visible;
      if (availEmpty) availEmpty.hidden = visible !== 0;
    }

    function renderOnList() {
      onListEl.innerHTML = '';
      const items = activeList();
      items.forEach((it, i) => {
        const li = document.createElement('li');
        li.className = 'sl-on-item';
        li.dataset.name = it.name;

        const top = document.createElement('div');
        top.className = 'sl-on-item__top';
        const name = document.createElement('span');
        name.className = 'sl-on-item__name';
        if (it.fav) {
          const fav = document.createElement('span');
          fav.className = 'sl-fav';
          fav.textContent = '♥';
          name.appendChild(fav);
          name.appendChild(document.createTextNode(' '));
        }
        name.appendChild(document.createTextNode(it.name));
        const ctrl = document.createElement('div');
        ctrl.className = 'sl-on-item__ctrl';
        const up = document.createElement('button');
        up.type = 'button';
        up.className = 'sl-move';
        up.dataset.dir = 'up';
        up.setAttribute('aria-label', 'Move up');
        up.textContent = '↑';
        up.disabled = i === 0;
        const down = document.createElement('button');
        down.type = 'button';
        down.className = 'sl-move';
        down.dataset.dir = 'down';
        down.setAttribute('aria-label', 'Move down');
        down.textContent = '↓';
        down.disabled = i === items.length - 1;
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'sl-remove';
        remove.setAttribute('aria-label', 'Remove');
        remove.innerHTML = TRASH_ICON;
        ctrl.append(up, down, remove);
        top.append(name, ctrl);

        const meta = document.createElement('p');
        meta.className = 'sl-item__meta';
        meta.textContent = it.area + ' · ' + fmtPrice(it.price);

        const note = document.createElement('input');
        note.type = 'text';
        note.className = 'sl-note';
        note.placeholder = 'Internal note (never shown to the client)…';
        note.setAttribute('aria-label', 'Internal note');

        li.append(top, meta, note);
        onListEl.appendChild(li);
      });
      if (onCountEl) onCountEl.textContent = items.length + ' shown to the client';
      if (pageCountEl) pageCountEl.textContent = items.length;
    }

    function renderAll() {
      renderPills();
      renderAvail();
      renderOnList();
    }

    pillsEl && pillsEl.addEventListener('click', (ev) => {
      const pill = ev.target.closest('.sl-pill');
      if (!pill) return;
      state.active = pill.dataset.sl;
      renderAll();
    });

    availListEl && availListEl.addEventListener('click', (ev) => {
      const btn = ev.target.closest('.sl-add');
      if (!btn) return;
      const li = ev.target.closest('.sl-item');
      const src = AVAILABLE.find((a) => a.name === li.dataset.name);
      if (src) activeList().unshift({ name: src.name, area: src.area, price: src.price });
      renderAll();
    });

    onListEl && onListEl.addEventListener('click', (ev) => {
      const move = ev.target.closest('.sl-move');
      const remove = ev.target.closest('.sl-remove');
      const items = activeList();
      const li = ev.target.closest('.sl-on-item');
      if (!li) return;
      const idx = items.findIndex((it) => it.name === li.dataset.name);
      if (idx === -1) return;
      if (remove) {
        items.splice(idx, 1);
      } else if (move) {
        const to = move.dataset.dir === 'up' ? idx - 1 : idx + 1;
        if (to < 0 || to >= items.length) return;
        const tmp = items[idx];
        items[idx] = items[to];
        items[to] = tmp;
      } else {
        return;
      }
      renderAll();
    });

    document.querySelectorAll('#slInterest .sl-pill').forEach((pill) => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('#slInterest .sl-pill').forEach((p) => p.classList.remove('is-active'));
        pill.classList.add('is-active');
        state.interest = pill.dataset.interest;
        renderAvail();
      });
    });

    const slSearch = document.getElementById('slSearch');
    slSearch && slSearch.addEventListener('input', () => {
      state.query = slSearch.value.trim().toLowerCase();
      renderAvail();
    });

    const slApplyBtn = document.getElementById('slApplyBtn');
    slApplyBtn && slApplyBtn.addEventListener('click', () => {
      state.min = document.getElementById('slMin').value;
      state.max = document.getElementById('slMax').value;
      renderAvail();
    });

    const slNewBtn = document.getElementById('slNewBtn');
    slNewBtn && slNewBtn.addEventListener('click', () => {
      const nameInput = document.getElementById('slNewName');
      const name = nameInput.value.trim() || 'New shortlist';
      const id = 'shl_' + Math.random().toString(36).slice(2, 12);
      shortlists[id] = { name: name, live: false, items: [] };
      state.active = id;
      nameInput.value = '';
      renderAll();
    });

    const slRenameBtn = document.getElementById('slRenameBtn');
    slRenameBtn && slRenameBtn.addEventListener('click', () => {
      const input = document.getElementById('slRenameInput');
      const name = input.value.trim();
      if (!name) return;
      shortlists[state.active].name = name;
      input.value = '';
      renderPills();
    });

    const copyLink = () => {
      const btn = document.getElementById('slCopyBtn');
      if (!btn) return;
      const fallback = () => {
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = 'Copy link'; }, 1500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(copyPath).then(fallback, fallback);
      } else {
        fallback();
      }
    };

    const slCopyBtn = document.getElementById('slCopyBtn');
    slCopyBtn && slCopyBtn.addEventListener('click', copyLink);
    const slShareBtn = document.getElementById('slShareBtn');
    slShareBtn && slShareBtn.addEventListener('click', (ev) => {
      ev.preventDefault();
      copyLink();
    });

    const slArchiveBtn = document.getElementById('slArchiveBtn');
    slArchiveBtn && slArchiveBtn.addEventListener('click', (ev) => {
      const btn = ev.currentTarget;
      btn.textContent = 'Archived';
      btn.classList.add('is-archived');
      btn.disabled = true;
    });

    renderAll();
  }

  const TEST_SHORTLISTS = {
    'shl_c7e9e512': {
      name: 'test',
      live: true,
      items: [
        { name: '2-Bedroom Tropical Villa with Private Pool — Nyuh Kuning, Ubud', area: 'Ubud', price: 35000000 },
        { name: '2-Story Villa with Garden — Nyuh Kuning, Ubud', area: 'Ubud', price: 35500000, fav: true },
        { name: '3 Bedroom Villa with Stunning Rice Field & Sunrise Views in Nyuh Kuning, Ubud', area: 'Ubud', price: 18600000 }
      ]
    }
  };

  const LEAD_SHORTLISTS = {
    'shl_prop_f0621564': {
      name: 'Untitled shortlist',
      live: true,
      items: [
        { name: '** 1 Bedroom exclusive Villa**', area: 'Ubud', price: 3487577751, fav: true },
        { name: '** 2 Bedroom Off Plan Boutique Villa in Sayan**', area: 'Ubud', price: 3550000000 },
        { name: '** 3-Bedroom Tropical Villa with Private Pool in Peliatan**', area: 'Ubud', price: 2800000000 },
        { name: '** Brand New 2 Bedroom Villa in Singakerta**', area: 'Ubud', price: 4749500000 },
        { name: '**1 Bedroom Modern Tropical Villa in Bingin**', area: 'Bukit', price: 4024128175 },
        { name: '**1 Bedroom Villa in Uluwatu Walking Distance to The Istana**', area: 'Bukit', price: 3450000000 },
        { name: '**1 Bedroom Villa with Rooftop Ocean Views in Nunggalan (offplan)**', area: 'Bukit', price: 3831000000 },
        { name: '**12.25 Are Freehold Land in Petulu – Rare Jungle & River View Pink-Zone Plot Near Central Ubud**', area: 'Ubud', price: 7064580573 },
        { name: '**12.3 are Keliki - 12.3 are Leasehold Land in Keliki with Beautiful Green Views**', area: 'Ubud', price: 1488300000 },
        { name: '**15 are Singakerta Warung Tipat - Flexible 15 Are Land for Leasehold in Singakerta**', area: 'Ubud', price: 2437500000 },
        { name: '**3 Bedroom Ubud River Escape Near Nyuh Kuning **', area: 'Ubud', price: 19000000000 },
        { name: '**2 Bedroom Eco-Retreat in Lodtunduh with Stunning Rice Field Views**', area: 'Ubud', price: 1100000000 },
        { name: '**2 Bedroom Modern Tropical Villa in Bingin (off plan) **', area: 'Bukit', price: 6528030150 },
        { name: '**2 Bedroom Villa Next to Nyang Nyang Beach**', area: 'Bukit', price: 5186654092 },
        { name: '2-Bedroom Tropical Villa with Private Pool — Nyuh Kuning, Ubud', area: 'Ubud', price: 35000000 },
        { name: '2-Story Villa with Garden — Nyuh Kuning, Ubud', area: 'Ubud', price: 35500000, fav: true }
      ]
    }
  };

  const UMAR_SHORTLISTS = {
    'shl_0464325f': {
      name: 'Untitled shortlist',
      live: true,
      items: [
        { name: '2-Story Villa with Garden — Nyuh Kuning, Ubud', area: 'Ubud', price: 35500000, fav: true },
        { name: '2-Bedroom Tropical Villa with Private Pool — Nyuh Kuning, Ubud', area: 'Ubud', price: 35000000 },
        { name: '3 Bedroom Villa with Stunning Rice Field & Sunrise Views in Nyuh Kuning, Ubud', area: 'Ubud', price: 18600000 },
        { name: '1 Bedroom exclusive Villa', area: 'Ubud', price: 3487577751 },
        { name: '2 Bedroom Off Plan Boutique Villa in Sayan', area: 'Ubud', price: 3550000000 },
        { name: '3-Bedroom Tropical Villa with Private Pool in Peliatan', area: 'Ubud', price: 2800000000 },
        { name: 'Brand New 2 Bedroom Villa in Singakerta', area: 'Ubud', price: 4749500000 },
        { name: '1 Bedroom Modern Tropical Villa in Bingin', area: 'Bukit', price: 4024128175 },
        { name: '1 Bedroom Villa in Uluwatu Walking Distance to The Istana', area: 'Bukit', price: 3450000000 },
        { name: '1 Bedroom Villa with Rooftop Ocean Views in Nunggalan (offplan)', area: 'Bukit', price: 3831000000 },
        { name: '12.25 Are Freehold Land in Petulu – Rare Jungle & River View Pink-Zone Plot Near Central Ubud', area: 'Ubud', price: 7064580573 },
        { name: '12.3 are Keliki - 12.3 are Leasehold Land in Keliki with Beautiful Green Views', area: 'Ubud', price: 1488300000 },
        { name: '15 are Singakerta Warung Tipat - Flexible 15 Are Land for Leasehold in Singakerta', area: 'Ubud', price: 2437500000 }
      ]
    }
  };

  function initUnnamedShortlistPage() {
    const pillsEl = document.getElementById('slPills');
    const emptyEl = document.getElementById('slEmptyState');
    const nameInput = document.getElementById('slNewName');
    const newBtn = document.getElementById('slNewBtn');
    const shortlists = {};

    function renderPills() {
      pillsEl.innerHTML = '';
      const keys = Object.keys(shortlists);
      pillsEl.hidden = keys.length === 0;
      keys.forEach((id) => {
        const sl = shortlists[id];
        const pill = document.createElement('button');
        pill.type = 'button';
        pill.className = 'sl-pill is-active';
        pill.dataset.sl = id;
        const name = document.createElement('span');
        name.className = 'sl-pill__name';
        name.textContent = sl.name;
        const count = document.createElement('span');
        count.className = 'sl-pill__count';
        count.textContent = '· ' + sl.items.length;
        pill.append(name, count);
        pillsEl.appendChild(pill);
      });
      emptyEl.hidden = keys.length !== 0;
    }

    newBtn.addEventListener('click', () => {
      const name = nameInput.value.trim() || 'New shortlist';
      const id = 'shl_' + Math.random().toString(36).slice(2, 12);
      shortlists[id] = { name: name, live: false, items: [] };
      nameInput.value = '';
      renderPills();
    });

    renderPills();
  }

  /* ================= Live Shortlist workspace (shortlist.html) ================= */
  function initLiveShortlist() {
    const SHARE_URL = 'https://banyan-oms-staging.umarbilalpersonal.workers.dev/shortlists/shr_08ce91493868fc48e0a7ccbbaceeb28b';

    const matchListEl = document.getElementById('lwMatchList');
    const matchEmpty = document.getElementById('lwMatchEmpty');
    const matchCountEl = document.getElementById('lwMatchCount');
    const sortSel = document.getElementById('lwSortSel');
    const onListEl = document.getElementById('slOnList');
    const onCountEl = document.getElementById('slOnCount');
    const pillsEl = document.getElementById('slPills');

    const shortlists = {
      'shl_9516005c5b3549fd': {
        name: 'test',
        live: true,
        items: [
          { name: '2-Bedroom Tropical Villa with Private Pool — Nyuh Kuning, Ubud', area: 'Ubud', price: 35000000 },
          { name: '2-Story Villa with Garden — Nyuh Kuning, Ubud', area: 'Ubud', price: 35500000, fav: true },
          { name: '3 Bedroom Villa with Stunning Rice Field & Sunrise Views in Nyuh Kuning, Ubud', area: 'Ubud', price: 18600000, fav: true },
          { name: '3-Bedroom Family Villa with Private Pool & Garden - Singakerta, 5 Mins to Nyuh Kuning, Ubud', area: 'Ubud', price: 450000000 },
          { name: '3-Bedroom Eco-Luxury Home in Taman Petanu Eco Neighborhood', area: 'Ubud', price: 35770028 }
        ]
      }
    };

    const state = {
      active: Object.keys(shortlists)[0],
      interest: 'rent',
      min: '',
      max: '',
      bedMin: '',
      bedMax: '',
      query: '',
      sort: 'default',
      view: 'list'
    };

    function activeItems() {
      return shortlists[state.active].items;
    }

    function inShortlist(name) {
      return activeItems().some((it) => it.name === name);
    }

    function aiScore(name) {
      let h = 0;
      for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
      return 58 + (h % 40);
    }

    function fmtPrice(v) {
      return 'IDR ' + Number(v).toLocaleString('en-US');
    }

    function bedsOf(name) {
      const m = name.match(/(\d+)\s*-?\s*(?:bedrooms?|\bbr\b|bed)/i);
      return m ? Number(m[1]) : null;
    }

    function filteredMatches() {
      const list = SL_AVAILABLE.filter((a) => {
        if (state.interest !== 'all' && state.interest !== 'rent') return false;
        if (state.min && a.price < Number(state.min)) return false;
        if (state.max && a.price > Number(state.max)) return false;
        if (state.bedMin || state.bedMax) {
          const beds = bedsOf(a.name);
          if (beds === null) return false;
          if (state.bedMin && beds < Number(state.bedMin)) return false;
          if (state.bedMax && beds > Number(state.bedMax)) return false;
        }
        if (state.query && a.name.toLowerCase().indexOf(state.query) === -1) return false;
        return true;
      });
      if (state.sort === 'price-asc') list.sort((a, b) => a.price - b.price);
      else if (state.sort === 'price-desc') list.sort((a, b) => b.price - a.price);
      else if (state.sort === 'fit') list.sort((a, b) => aiScore(b.name) - aiScore(a.name));
      return list;
    }

    function updateFilterCount() {
      let n = 1;
      if (state.min) n += 1;
      if (state.max) n += 1;
      if (state.bedMin) n += 1;
      if (state.bedMax) n += 1;
      if (state.query) n += 1;
      document.getElementById('lwActiveFilters').textContent = n + ' active filter' + (n === 1 ? '' : 's');
    }

    function renderPills() {
      pillsEl.innerHTML = '';
      Object.keys(shortlists).forEach((id) => {
        const sl = shortlists[id];
        const pill = document.createElement('button');
        pill.type = 'button';
        pill.className = 'sl-pill' + (id === state.active ? ' is-active' : '');
        pill.dataset.sl = id;
        const name = document.createElement('span');
        name.className = 'sl-pill__name';
        name.textContent = sl.name;
        const count = document.createElement('span');
        count.className = 'sl-pill__count';
        count.textContent = '· ' + sl.items.length;
        pill.append(name, count);
        if (sl.live) {
          const live = document.createElement('span');
          live.className = 'sl-live';
          live.textContent = '✓ Live';
          pill.appendChild(live);
        }
        pillsEl.appendChild(pill);
      });
    }

    function renderMatches() {
      matchListEl.innerHTML = '';
      const all = filteredMatches();

      all.forEach((a) => {
        const li = document.createElement('li');
        li.className = 'lw-match';

        const thumb = document.createElement('div');
        thumb.className = 'lw-match__thumb';
        thumb.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>';

        const body = document.createElement('div');
        body.className = 'lw-match__body';
        const nm = document.createElement('p');
        nm.className = 'lw-match__name';
        nm.textContent = a.name;
        const meta = document.createElement('p');
        meta.className = 'lw-match__meta';
        meta.textContent = a.area + ' · ' + fmtPrice(a.price);
        body.append(nm, meta);

        const side = document.createElement('div');
        side.className = 'lw-match__side';
        const sc = document.createElement('span');
        sc.className = 'lw-score';
        sc.appendChild(document.createTextNode(String(aiScore(a.name))));
        const scLbl = document.createElement('small');
        scLbl.textContent = 'AI Fit';
        sc.appendChild(scLbl);

        if (inShortlist(a.name)) {
          const tag = document.createElement('button');
          tag.type = 'button';
          tag.className = 'lw-addbtn';
          tag.disabled = true;
          tag.textContent = '✓ On shortlist';
          side.append(sc, tag);
        } else {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'lw-addbtn';
          btn.textContent = '+ Add';
          btn.dataset.name = a.name;
          side.append(sc, btn);
        }

        li.append(thumb, body, side);
        matchListEl.appendChild(li);
      });

      matchCountEl.textContent = all.length;
      matchEmpty.hidden = all.length !== 0;
      matchListEl.classList.toggle('is-grid', state.view === 'grid');
    }

    function renderOnList() {
      onListEl.innerHTML = '';
      const items = activeItems();

      items.forEach((it, i) => {
        const li = document.createElement('li');
        li.className = 'lw-builditem';
        li.draggable = true;
        li.dataset.name = it.name;

        const top = document.createElement('div');
        top.className = 'lw-builditem__top';

        const drag = document.createElement('span');
        drag.className = 'lw-drag';
        drag.setAttribute('aria-hidden', 'true');
        drag.title = 'Drag to reorder';
        drag.innerHTML = '<svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor"><circle cx="2" cy="2" r="1.5"/><circle cx="8" cy="2" r="1.5"/><circle cx="2" cy="8" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="2" cy="14" r="1.5"/><circle cx="8" cy="14" r="1.5"/></svg>';

        const num = document.createElement('span');
        num.className = 'lw-num';

        const info = document.createElement('div');
        info.className = 'lw-builditem__info';
        const nm = document.createElement('p');
        nm.className = 'lw-builditem__name';
        if (it.fav) {
          const fav = document.createElement('span');
          fav.className = 'lw-fav';
          fav.textContent = '♥';
          nm.appendChild(fav);
        }
        nm.appendChild(document.createTextNode(it.name));
        const meta = document.createElement('p');
        meta.className = 'lw-builditem__meta';
        meta.textContent = it.area + ' · ' + fmtPrice(it.price);
        info.append(nm, meta);

        const ctrl = document.createElement('div');
        ctrl.className = 'lw-builditem__ctrl';
        const up = document.createElement('button');
        up.type = 'button';
        up.className = 'lw-movebtn';
        up.dataset.dir = 'up';
        up.setAttribute('aria-label', 'Move up');
        up.textContent = '↑';
        up.disabled = i === 0;
        const down = document.createElement('button');
        down.type = 'button';
        down.className = 'lw-movebtn';
        down.dataset.dir = 'down';
        down.setAttribute('aria-label', 'Move down');
        down.textContent = '↓';
        down.disabled = i === items.length - 1;
        const del = document.createElement('button');
        del.type = 'button';
        del.className = 'lw-delbtn';
        del.setAttribute('aria-label', 'Remove from shortlist');
        del.innerHTML = TRASH_ICON;
        ctrl.append(up, down, del);

        top.append(drag, num, info, ctrl);
        li.appendChild(top);

        const noteWrap = document.createElement('div');
        noteWrap.className = 'lw-note';
        const note = document.createElement('input');
        note.type = 'text';
        note.className = 'sl-input lw-note-input';
        note.placeholder = 'Internal note (never shown to the client)…';
        note.setAttribute('aria-label', 'Internal note');
        note.value = it.note || '';
        noteWrap.appendChild(note);
        li.appendChild(noteWrap);

        onListEl.appendChild(li);
      });

      onCountEl.textContent = items.length + ' shown to the client';
    }

    function renderAll() {
      renderPills();
      renderMatches();
      renderOnList();
      updateFilterCount();
    }

    /* --- Review matches interactions --- */
    matchListEl.addEventListener('click', (ev) => {
      const btn = ev.target.closest('.lw-addbtn');
      if (!btn || btn.disabled) return;
      const src = SL_AVAILABLE.find((a) => a.name === btn.dataset.name);
      if (src && !inShortlist(src.name)) {
        activeItems().unshift({ name: src.name, area: src.area, price: src.price });
        renderAll();
      }
    });

    sortSel.addEventListener('change', () => {
      state.sort = sortSel.value;
      renderMatches();
    });

    document.querySelectorAll('.lw-toggle__btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.view = btn.dataset.view;
        document.querySelectorAll('.lw-toggle__btn').forEach((b) => {
          const active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-pressed', String(active));
        });
        renderMatches();
      });
    });

    /* --- Build shortlist interactions --- */
    onListEl.addEventListener('click', (ev) => {
      const move = ev.target.closest('.lw-movebtn');
      const del = ev.target.closest('.lw-delbtn');
      if (!move && !del) return;
      const li = ev.target.closest('.lw-builditem');
      if (!li) return;
      const items = activeItems();
      const idx = items.findIndex((it) => it.name === li.dataset.name);
      if (idx === -1) return;
      if (del) {
        items.splice(idx, 1);
      } else {
        const to = move.dataset.dir === 'up' ? idx - 1 : idx + 1;
        if (to < 0 || to >= items.length) return;
        const tmp = items[idx];
        items[idx] = items[to];
        items[to] = tmp;
      }
      renderAll();
    });

    onListEl.addEventListener('input', (ev) => {
      if (!ev.target.classList.contains('lw-note-input')) return;
      const li = ev.target.closest('.lw-builditem');
      if (!li) return;
      const it = activeItems().find((x) => x.name === li.dataset.name);
      if (it) it.note = ev.target.value;
    });

    let dragName = null;

    onListEl.addEventListener('dragstart', (ev) => {
      const li = ev.target.closest('.lw-builditem');
      if (!li) return;
      dragName = li.dataset.name;
      li.classList.add('is-dragging');
      ev.dataTransfer.effectAllowed = 'move';
      try { ev.dataTransfer.setData('text/plain', dragName); } catch (e) {}
    });

    onListEl.addEventListener('dragend', () => {
      onListEl.querySelectorAll('.lw-builditem').forEach((el) => el.classList.remove('is-dragging', 'is-drop-target'));
    });

    onListEl.addEventListener('dragover', (ev) => {
      if (!dragName) return;
      ev.preventDefault();
      ev.dataTransfer.dropEffect = 'move';
      onListEl.querySelectorAll('.lw-builditem').forEach((el) => el.classList.remove('is-drop-target'));
      const li = ev.target.closest('.lw-builditem');
      if (li && li.dataset.name !== dragName) li.classList.add('is-drop-target');
    });

    onListEl.addEventListener('drop', (ev) => {
      if (!dragName) return;
      ev.preventDefault();
      const items = activeItems();
      const from = items.findIndex((it) => it.name === dragName);
      if (from === -1) { dragName = null; return; }
      const li = ev.target.closest('.lw-builditem');
      let to;
      if (li && li.dataset.name !== dragName) {
        const rect = li.getBoundingClientRect();
        const after = ev.clientY > rect.top + rect.height / 2;
        to = items.findIndex((it) => it.name === li.dataset.name);
        if (to === -1) { dragName = null; return; }
        if (after) to += 1;
        if (from < to) to -= 1;
      } else {
        to = items.length - 1;
      }
      if (to === from) { dragName = null; return; }
      const moved = items.splice(from, 1)[0];
      items.splice(to, 0, moved);
      dragName = null;
      renderAll();
    });

    const notesBtn = document.getElementById('lwNotesBtn');
    const clientNote = document.getElementById('lwClientNote');
    notesBtn.addEventListener('click', () => {
      clientNote.hidden = !clientNote.hidden;
      notesBtn.textContent = clientNote.hidden ? '+ Add notes to client (optional)' : '− Hide notes to client';
      if (!clientNote.hidden) clientNote.focus();
    });

    /* --- Requirements form --- */
    document.querySelectorAll('#slInterest .lw-pill').forEach((pill) => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('#slInterest .lw-pill').forEach((p) => p.classList.remove('is-active'));
        pill.classList.add('is-active');
        state.interest = pill.dataset.interest;
        renderMatches();
        updateFilterCount();
      });
    });

    const minInput = document.getElementById('slMin');
    const maxInput = document.getElementById('slMax');
    const bedMinInput = document.getElementById('lwBedMin');
    const bedMaxInput = document.getElementById('lwBedMax');
    const searchInput = document.getElementById('slSearch');

    [minInput, maxInput].forEach((input) => {
      input.addEventListener('input', () => {
        state.min = minInput.value;
        state.max = maxInput.value;
        renderMatches();
        updateFilterCount();
      });
    });

    [bedMinInput, bedMaxInput].forEach((input) => {
      input.addEventListener('input', () => {
        state.bedMin = bedMinInput.value;
        state.bedMax = bedMaxInput.value;
        renderMatches();
        updateFilterCount();
      });
    });

    searchInput.addEventListener('input', () => {
      state.query = searchInput.value.trim().toLowerCase();
      renderMatches();
      updateFilterCount();
    });

    document.getElementById('lwResetBtn').addEventListener('click', () => {
      state.interest = 'rent';
      state.min = '';
      state.max = '';
      state.bedMin = '';
      state.bedMax = '';
      state.query = '';
      minInput.value = '';
      maxInput.value = '';
      bedMinInput.value = '';
      bedMaxInput.value = '';
      searchInput.value = '';
      document.querySelectorAll('#slInterest .lw-pill').forEach((p) => {
        p.classList.toggle('is-active', p.dataset.interest === 'rent');
      });
      renderMatches();
      updateFilterCount();
    });

    const filterFields = document.getElementById('lwFilterFields');
    const filterToggle = document.getElementById('lwFilterToggle');
    if (filterFields && filterToggle) {
      filterToggle.addEventListener('click', () => {
        const isHidden = filterFields.hasAttribute('hidden');
        if (isHidden) {
          filterFields.removeAttribute('hidden');
        } else {
          filterFields.setAttribute('hidden', '');
        }
        filterToggle.setAttribute('aria-expanded', String(isHidden));
      });
    }

    /* --- Curate tools --- */
    function flashTool(btn, msg) {
      if (btn.dataset.busy) return;
      btn.dataset.busy = '1';
      btn.classList.add('is-busy');
      const label = btn.querySelector('b');
      const orig = label.textContent;
      label.textContent = msg;
      setTimeout(() => {
        label.textContent = orig;
        btn.classList.remove('is-busy');
        delete btn.dataset.busy;
      }, 1200);
    }

    document.getElementById('lwRulesBtn').addEventListener('click', function () {
      const candidates = SL_AVAILABLE
        .filter((a) => !inShortlist(a.name))
        .sort((a, b) => aiScore(b.name) - aiScore(a.name))
        .slice(0, 3);
      if (!candidates.length) { flashTool(this, 'No new matches'); return; }
      candidates.forEach((c) => activeItems().push({ name: c.name, area: c.area, price: c.price }));
      renderAll();
      flashTool(this, 'Added ✓');
    });

    document.getElementById('lwAiBtn').addEventListener('click', function () {
      const candidates = SL_AVAILABLE
        .filter((a) => !inShortlist(a.name))
        .sort((a, b) => aiScore(b.name) - aiScore(a.name))
        .slice(0, 2);
      if (!candidates.length) { flashTool(this, 'No new matches'); return; }
      candidates.forEach((c) => activeItems().push({ name: c.name, area: c.area, price: c.price }));
      renderAll();
      flashTool(this, 'Added ✓');
    });

    document.getElementById('lwFitBtn').addEventListener('click', function () {
      activeItems().sort((a, b) => aiScore(b.name) - aiScore(a.name));
      renderAll();
      flashTool(this, 'Sorted ✓');
    });

    /* --- Shortlist picker --- */
    pillsEl.addEventListener('click', (ev) => {
      const pill = ev.target.closest('.sl-pill');
      if (!pill) return;
      state.active = pill.dataset.sl;
      renderAll();
    });

    document.getElementById('slNewBtn').addEventListener('click', () => {
      const nameInput = document.getElementById('slNewName');
      const name = nameInput.value.trim() || 'New shortlist';
      const id = 'shl_' + Math.random().toString(36).slice(2, 12);
      shortlists[id] = { name: name, live: false, items: [] };
      state.active = id;
      nameInput.value = '';
      renderAll();
    });

    /* --- Share card --- */
    const copyBtn = document.getElementById('slCopyBtn');
    copyBtn.addEventListener('click', () => {
      const fallback = () => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => { copyBtn.textContent = 'Copy link'; }, 1500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(SHARE_URL).then(fallback, fallback);
      } else {
        fallback();
      }
    });

    const archiveBtn = document.getElementById('slArchiveBtn');
    archiveBtn.addEventListener('click', () => {
      if (!window.confirm('Archive this shortlist? The client link stops opening — nothing is deleted.')) return;
      archiveBtn.textContent = 'Archived';
      archiveBtn.disabled = true;
      document.getElementById('lwArchiveNote').hidden = false;
      const status = document.querySelector('.lw-linkstatus');
      if (status) status.textContent = 'Archived';
    });

    /* --- Engagement --- */
    const remindBtn = document.getElementById('lwRemindBtn');
    remindBtn.addEventListener('click', () => {
      remindBtn.textContent = 'Reminder sent ✓';
      remindBtn.disabled = true;
      setTimeout(() => {
        remindBtn.textContent = 'Send reminder';
        remindBtn.disabled = false;
      }, 1800);
    });

    renderAll();
  }

  if (page === 'shortlist') {
    initLiveShortlist();
  }
  if (page === 'shortlist-test') {
    initShortlistPage(TEST_SHORTLISTS, '/shortlists/shr_7f74d07fa982b8e4e8c47526d419cf00');
  }
  if (page === 'shortlist-lead') {
    initShortlistPage(LEAD_SHORTLISTS, '/shortlists/shr_a140143c11f2359fb1298e61082096e1');
  }
  if (page === 'shortlist-unnamed' || page === 'shortlist-umar') {
    initUnnamedShortlistPage();
  }

  /* ================= Listings only ================= */
  if (page === 'listings') {
    const grid = document.getElementById('listingsGrid');
    const empty = document.getElementById('listEmpty');
    const countEl = document.getElementById('listingsCount');
    const tableWrap = document.getElementById('listingsTable');
    const tableBody = document.getElementById('listTableBody');
    const pagination = document.querySelector('.list-pagination');
    const cards = Array.from(grid.querySelectorAll('.list-card'));

    cards.forEach((card) => {
      const health = parseInt(card.dataset.health, 10) || 0;
      const filled = Math.round(health / 20);
      const stars = '\u2605'.repeat(filled) + '\u2606'.repeat(5 - filled);
      const el = card.querySelector('.list-stars');
      if (el) el.textContent = stars;
    });

    let state = { category: 'all', stage: 'all', area: 'all', query: '', status: 'all', marketing: 'all', sort: 'recent' };
    let view = 'cards';

    const STAGE_LABELS = { inbox: 'Inbox', enrich: 'Enrich', review: 'Review', live: 'Live', closed: 'Closed' };
    const STATUS_LABELS = {
      available: 'Available',
      negotiation: 'Under Negotiation',
      request: 'Upon Request',
      rented: 'Rented',
      sold: 'Sold',
      archived: 'Archived'
    };

    function formatPrice(v) {
      if (!v || Number(v) === 0) return '';
      return 'IDR ' + Number(v).toLocaleString('en-US');
    }

    function formatDate(iso) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const d = new Date(iso + 'T00:00:00');
      return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
    }

    function buildRow(card) {
      const tr = document.createElement('tr');
      tr.className = 'list-row';
      if (card.dataset.detail) {
        tr.dataset.detail = card.dataset.detail;
        tr.title = 'Open listing detail';
      }

      const id = document.createElement('td');
      id.className = 'list-table__id';
      id.textContent = card.dataset.id;

      const name = document.createElement('td');
      name.className = 'list-table__name';
      name.textContent = card.dataset.name;

      const loc = document.createElement('td');
      loc.className = 'list-table__loc';
      loc.textContent = card.dataset.location || 'No area mapped';
      if (!card.dataset.location) loc.classList.add('list-table__loc--none');

      const stage = document.createElement('td');
      const stageBadge = document.createElement('span');
      stageBadge.className = 'stage-badge';
      stageBadge.textContent = STAGE_LABELS[card.dataset.stage] || card.dataset.stage;
      stage.appendChild(stageBadge);

      const status = document.createElement('td');
      const statusBadge = document.createElement('span');
      const stKey = card.dataset.status || 'available';
      statusBadge.className = 'status-badge status-badge--' + stKey;
      statusBadge.textContent = STATUS_LABELS[stKey] || 'Available';
      status.appendChild(statusBadge);

      const price = document.createElement('td');
      price.className = 'list-table__price';
      const priceText = formatPrice(card.dataset.price);
      price.textContent = priceText || '—';
      if (!priceText) price.classList.add('list-table__muted');

      const health = document.createElement('td');
      health.className = 'list-table__health';
      const h = parseInt(card.dataset.health, 10) || 0;
      const filled = Math.round(h / 20);
      const stars = document.createElement('span');
      stars.className = 'list-stars';
      stars.textContent = '\u2605'.repeat(filled) + '\u2606'.repeat(5 - filled);
      const hpct = document.createElement('b');
      hpct.textContent = h + '%';
      health.append(stars, hpct);

      const updated = document.createElement('td');
      updated.className = 'list-table__updated';
      updated.textContent = formatDate(card.dataset.updated);

      tr.append(id, name, loc, stage, status, price, health, updated);
      return tr;
    }

    function matches(card) {
      if (state.category !== 'all' && card.dataset.category !== state.category) return false;
      if (state.stage !== 'all' && card.dataset.stage !== state.stage) return false;
      if (state.status !== 'all' && card.dataset.status !== state.status) return false;
      if (state.marketing !== 'all' && card.dataset.marketing !== state.marketing) return false;
      if (state.area !== 'all') {
        const hasArea = !!card.dataset.location;
        if (state.area === 'unmapped' && hasArea) return false;
        if (state.area !== 'unmapped' && card.dataset.location !== state.area) return false;
      }
      if (state.query) {
        const hay = (card.dataset.name + ' ' + card.dataset.id + ' ' + card.dataset.location).toLowerCase();
        if (!hay.includes(state.query)) return false;
      }
      return true;
    }

    function sortCards(a, b) {
      if (state.sort === 'price-asc') return Number(a.dataset.price) - Number(b.dataset.price);
      if (state.sort === 'price-desc') return Number(b.dataset.price) - Number(a.dataset.price);
      if (state.sort === 'recent') return b.dataset.updated.localeCompare(a.dataset.updated);
      return a.dataset.name.localeCompare(b.dataset.name);
    }

    grid.classList.add('is-anim');
    tableWrap.classList.add('is-anim');

    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let revealIO = null;

    function setupReveal() {
      const items = Array.from(document.querySelectorAll('.listings-grid .list-card, .listings-table .list-row'));
      items.forEach((el) => {
        el.classList.remove('is-in');
        el.style.setProperty('--pop-delay', '0ms');
      });
      if (revealIO) {
        revealIO.disconnect();
        revealIO = null;
      }
      if (reduceMotion || !('IntersectionObserver' in window)) {
        items.forEach((el) => el.classList.add('is-in'));
        return;
      }
      const stagger = (el) => {
        const siblings = Array.from(el.parentElement.querySelectorAll('.list-card, .list-row'));
        const idx = siblings.indexOf(el);
        return el.classList.contains('list-row') ? Math.min(idx * 35, 350) : (idx % 2) * 100;
      };
      revealIO = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.style.setProperty('--pop-delay', stagger(el) + 'ms');
          el.classList.add('is-in');
          revealIO.unobserve(el);
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -24px 0px' });
      items.forEach((el) => revealIO.observe(el));
    }

    function render() {
      const visible = cards.filter(matches).sort(sortCards);
      if (view === 'table') {
        tableBody.innerHTML = '';
        visible.forEach((c) => tableBody.appendChild(buildRow(c)));
        grid.hidden = true;
        tableWrap.hidden = false;
      } else {
        grid.innerHTML = '';
        visible.forEach((c) => grid.appendChild(c));
        grid.hidden = false;
        tableWrap.hidden = true;
      }
      empty.hidden = visible.length !== 0;
      if (pagination) pagination.hidden = visible.length === 0;
      setupReveal();
    }

    document.querySelectorAll('.view-link').forEach((link) => {
      link.addEventListener('click', () => {
        view = link.dataset.view;
        document.querySelectorAll('.view-link').forEach((l) => {
          const active = l === link;
          l.classList.toggle('is-active', active);
          l.setAttribute('aria-pressed', String(active));
        });
        render();
      });
    });

    const tabs = Array.from(document.querySelectorAll('#catTabs .cat-tab'));
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('is-active'));
        tab.classList.add('is-active');
        if (tab.dataset.category !== undefined) {
          state.category = tab.dataset.category;
          state.stage = 'all';
        } else {
          state.stage = tab.dataset.stage;
          state.category = 'all';
        }
        render();
      });
    });

    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => {
      state.query = searchInput.value.trim().toLowerCase();
      render();
    });

    document.getElementById('statusSelect').addEventListener('change', (e) => {
      state.status = e.target.value;
      render();
    });

    document.getElementById('areaSelect').addEventListener('change', (e) => {
      state.area = e.target.value;
      render();
    });

    document.getElementById('marketingSelect').addEventListener('change', (e) => {
      state.marketing = e.target.value;
      render();
    });

    document.getElementById('sortSelect').addEventListener('change', (e) => {
      state.sort = e.target.value;
      render();
    });

    document.getElementById('filterBtn').addEventListener('click', render);

    document.getElementById('resetBtn').addEventListener('click', () => {
      state = { category: 'all', stage: 'all', area: 'all', query: '', status: 'all', marketing: 'all', sort: 'recent' };
      searchInput.value = '';
      document.getElementById('statusSelect').value = 'all';
      document.getElementById('areaSelect').value = 'all';
      document.getElementById('marketingSelect').value = 'all';
      document.getElementById('sortSelect').value = 'recent';
      document.querySelectorAll('#catTabs .cat-tab').forEach((t) => {
        t.classList.toggle('is-active', t.dataset.category === 'all');
      });
      render();
    });

    function bindCardMenus() {
      const wraps = Array.from(document.querySelectorAll('.list-card__menu-wrap'));
      function closeMenus(except) {
        wraps.forEach((wrap) => {
          if (wrap === except) return;
          wrap.classList.remove('is-open');
          const b = wrap.querySelector('.list-card__menu');
          if (b) b.setAttribute('aria-expanded', 'false');
        });
      }
      wraps.forEach((wrap) => {
        const btn = wrap.querySelector('.list-card__menu');
        const items = Array.from(wrap.querySelectorAll('.list-card__dropdown button'));
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const willOpen = !wrap.classList.contains('is-open');
          closeMenus();
          if (willOpen) {
            wrap.classList.add('is-open');
            btn.setAttribute('aria-expanded', 'true');
          }
        });
        items.forEach((item) => {
          item.addEventListener('click', (e) => {
            e.stopPropagation();
            wrap.classList.remove('is-open');
            btn.setAttribute('aria-expanded', 'false');
            if (item.textContent.trim() === 'View listing') {
              const card = wrap.closest('.list-card');
              if (card && card.dataset.detail) window.location.href = card.dataset.detail;
            }
          });
        });
      });
      document.addEventListener('click', () => closeMenus());
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenus();
      });
    }
    bindCardMenus();

    function openDetail(href) {
      if (href) window.location.href = href;
    }

    grid.addEventListener('click', (e) => {
      const card = e.target.closest('.list-card');
      if (card && card.dataset.detail) openDetail(card.dataset.detail);
    });
    grid.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const card = e.target.closest('.list-card');
      if (card && card.dataset.detail) {
        e.preventDefault();
        openDetail(card.dataset.detail);
      }
    });

    tableBody.addEventListener('click', (e) => {
      const row = e.target.closest('.list-row');
      if (row && row.dataset.detail) openDetail(row.dataset.detail);
    });

    render();
  }

  /* ================= Listing detail only ================= */
  if (page === 'listing-detail') {
    document.querySelectorAll('.detail-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.detail-tab').forEach((t) => t.classList.remove('is-active'));
        tab.classList.add('is-active');
      });
    });

    const tasksToggle = document.getElementById('tasksToggle');
    const tasksCard = document.getElementById('tasksCard');
    if (tasksToggle && tasksCard) {
      tasksToggle.addEventListener('click', () => {
        const open = tasksCard.classList.toggle('is-open');
        tasksToggle.setAttribute('aria-expanded', String(open));
      });
    }

    const saveState = document.getElementById('saveState');
    const closingReason = document.getElementById('closingReason');
    const saveBtn = document.getElementById('saveChangesBtn');
    if (saveState && closingReason) {
      closingReason.addEventListener('input', () => {
        saveState.hidden = false;
        saveState.textContent = closingReason.value.trim() ? '● Unsaved changes' : '✓ All changes saved';
      });
    }
    if (saveBtn && saveState) {
      saveBtn.addEventListener('click', () => {
        saveState.hidden = false;
        saveState.textContent = '✓ All changes saved';
      });
    }

    const closeListingBtn = document.getElementById('closeListingBtn');
    if (closeListingBtn) {
      closeListingBtn.addEventListener('click', () => {
        closeListingBtn.textContent = 'Listing closed';
        closeListingBtn.disabled = true;
        saveState.hidden = false;
        saveState.textContent = '✓ All changes saved';
      });
    }
  }
});
