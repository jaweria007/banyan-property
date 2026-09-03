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
  /* Opportunities is rendered by the rebuilt block at the end of this file. */

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

  /* shortlist.html is rendered by the rebuilt Shortlist Builder at the end of this file. */
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

      // Safety net: never leave a card stuck at opacity 0 if the observer
      // does not fire (e.g. the container was hidden when we started watching).
      const watched = items;
      window.setTimeout(() => {
        watched.forEach((el) => {
          if (el.isConnected && !el.classList.contains('is-in')) el.classList.add('is-in');
        });
      }, 900);
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

    /* ---- Collapsible filter bar (client feedback: it takes a lot of space) ---- */
    const toolbar = document.getElementById('listingsToolbar');
    const filtersToggle = document.getElementById('filtersToggle');
    if (toolbar && filtersToggle) {
      const toggleLabel = filtersToggle.querySelector('.btn-filters-toggle__label');
      const applyFiltersVisibility = (open) => {
        toolbar.classList.toggle('is-collapsed', !open);
        filtersToggle.setAttribute('aria-expanded', String(open));
        if (toggleLabel) toggleLabel.textContent = open ? 'Hide filters' : 'Show filters';
      };
      let filtersOpen = true;
      try {
        filtersOpen = localStorage.getItem('banyan_listings_filters') !== 'closed';
      } catch (e) {}
      applyFiltersVisibility(filtersOpen);
      filtersToggle.addEventListener('click', () => {
        filtersOpen = !filtersOpen;
        applyFiltersVisibility(filtersOpen);
        try {
          localStorage.setItem('banyan_listings_filters', filtersOpen ? 'open' : 'closed');
        } catch (e) {}
      });
    }

    /* ---- Advanced search drawer (right-hand panel) ---- */
    const drawer = document.getElementById('advSearch');
    const drawerBackdrop = document.getElementById('advBackdrop');
    const advBtn = document.getElementById('filterBtn');
    if (drawer && advBtn) {
      const advCount = document.getElementById('advCount');
      const openDrawer = () => {
        drawer.classList.add('is-open');
        drawer.setAttribute('aria-hidden', 'false');
        advBtn.setAttribute('aria-expanded', 'true');
        if (drawerBackdrop) drawerBackdrop.hidden = false;
        document.body.style.overflow = 'hidden';
        const first = drawer.querySelector('input, select, button');
        if (first) first.focus();
      };
      const closeDrawer = () => {
        drawer.classList.remove('is-open');
        drawer.setAttribute('aria-hidden', 'true');
        advBtn.setAttribute('aria-expanded', 'false');
        if (drawerBackdrop) drawerBackdrop.hidden = true;
        document.body.style.overflow = '';
        advBtn.focus();
      };

      advBtn.addEventListener('click', openDrawer);
      if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);
      const advClose = document.getElementById('advClose');
      if (advClose) advClose.addEventListener('click', closeDrawer);
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeDrawer();
      });

      /* Nested locations: a secondary location must belong to its primary.
         Mirrors the Website CMS tag hierarchy. */
      const SECONDARY_LOCATIONS = {
        Ubud: ['Nyuh Kuning', 'Penestanan', 'Sayan', 'Pengosekan', 'Tegallalang', 'Mas', 'Kedewatan'],
        Canggu: ['Berawa', 'Batu Bolong', 'Pererenan', 'Echo Beach', 'Umalas', 'Tumbak Bayuh'],
        Uluwatu: ['Bingin', 'Padang Padang', 'Balangan', 'Pecatu', 'Nyang Nyang'],
        Seminyak: ['Petitenget', 'Oberoi', 'Kerobokan', 'Batu Belig'],
        Sanur: ['Sindhu', 'Semawang', 'Padang Galak', 'Mertasari']
      };
      const primarySel = document.getElementById('advLocPrimary');
      const secondarySel = document.getElementById('advLocSecondary');
      if (primarySel && secondarySel) {
        primarySel.addEventListener('change', () => {
          const list = SECONDARY_LOCATIONS[primarySel.value] || [];
          secondarySel.innerHTML = '';
          if (!list.length) {
            secondarySel.disabled = true;
            secondarySel.appendChild(new Option('Select a primary location first', ''));
            return;
          }
          secondarySel.disabled = false;
          secondarySel.appendChild(new Option('Any in ' + primarySel.value, ''));
          list.forEach((name) => secondarySel.appendChild(new Option(name, name)));
        });
      }

      const advInputs = () => Array.from(drawer.querySelectorAll('[data-adv], [data-adv-group] input'));

      const refreshAdvCount = () => {
        const n = advInputs().filter((el) => (el.type === 'checkbox' ? el.checked : String(el.value || '') !== '')).length;
        if (!advCount) return;
        advCount.hidden = n === 0;
        advCount.textContent = String(n);
      };
      drawer.addEventListener('change', refreshAdvCount);
      drawer.addEventListener('input', refreshAdvCount);

      const advClear = document.getElementById('advClear');
      if (advClear) {
        advClear.addEventListener('click', () => {
          advInputs().forEach((el) => {
            if (el.type === 'checkbox') el.checked = false;
            else el.value = '';
          });
          if (secondarySel) {
            secondarySel.innerHTML = '';
            secondarySel.disabled = true;
            secondarySel.appendChild(new Option('Select a primary location first', ''));
          }
          refreshAdvCount();
        });
      }

      const advApply = document.getElementById('advApply');
      if (advApply) {
        advApply.addEventListener('click', () => {
          const typeEl = drawer.querySelector('[data-adv="type"]');
          if (typeEl) state.category = typeEl.value || 'all';
          const locEl = drawer.querySelector('[data-adv="locPrimary"]');
          if (locEl) state.area = locEl.value || 'all';
          render();
          closeDrawer();
        });
      }
    }

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
    const DETAIL_PANEL = {
      'Overview': 'panelOverview',
      'Content': 'panelContent',
      'Media': 'panelMedia',
      'Operations': 'panelOperations'
    };

    document.querySelectorAll('.detail-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.detail-tab').forEach((t) => t.classList.remove('is-active'));
        tab.classList.add('is-active');
        const target = DETAIL_PANEL[tab.dataset.tab];
        Object.values(DETAIL_PANEL).forEach((id) => {
          const el = document.getElementById(id);
          if (el) el.hidden = id !== target;
        });
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

/* ============================================================
   My Work + Relationships — client feedback (26–27 Aug)
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;

  const STATUS_LABEL = {
    inbox: 'Inbox',
    todo: 'To Do',
    progress: 'In Progress',
    waiting: 'Waiting',
    done: 'Done'
  };
  const STATUS_ORDER = ['inbox', 'todo', 'progress', 'waiting', 'done'];
  const TODAY = new Date('2026-09-01T00:00:00');

  const fmtDue = (iso) => {
    if (!iso) return '—';
    const d = new Date(iso + 'T00:00:00');
    if (d.getTime() === TODAY.getTime()) return 'Today';
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  };
  const dueClass = (iso) => {
    if (!iso) return '';
    const d = new Date(iso + 'T00:00:00');
    if (d < TODAY) return 'is-overdue';
    if (d.getTime() === TODAY.getTime()) return 'is-today';
    return '';
  };

  /* ================= My Work ================= */
  if (page === 'my-work') {
    const board = document.getElementById('taskBoard');
    const list = document.getElementById('taskList');
    const listBody = document.getElementById('taskListBody');
    const listEmpty = document.getElementById('taskListEmpty');
    if (!board) return;

    // Status is the single source of truth. The board column a card sits in
    // and its Status field must always agree.
    const tasks = Array.from(board.querySelectorAll('.task-card')).map((el) => ({
      id: el.dataset.task,
      desc: el.querySelector('.task-card__desc').textContent.trim(),
      status: el.dataset.status,
      assignee: el.dataset.assignee,
      due: el.dataset.due,
      hub: el.dataset.hub,
      href: el.querySelector('.record-pill').getAttribute('href'),
      el
    }));
    const byId = (id) => tasks.find((t) => t.id === id);

    const filters = { q: '', hub: 'all', assignee: 'all', due: 'all', queue: 'all' };

    const matches = (t) => {
      if (filters.q && !t.desc.toLowerCase().includes(filters.q)) return false;
      if (filters.hub !== 'all' && t.hub !== filters.hub) return false;
      if (filters.assignee !== 'all' && t.assignee !== filters.assignee) return false;
      const d = t.due ? new Date(t.due + 'T00:00:00') : null;
      if (filters.due === 'overdue' && !(d && d < TODAY && t.status !== 'done')) return false;
      if (filters.due === 'today' && !(d && d.getTime() === TODAY.getTime())) return false;
      if (filters.due === 'week') {
        const wk = new Date(TODAY); wk.setDate(wk.getDate() + 7);
        if (!(d && d >= TODAY && d <= wk)) return false;
      }
      if (filters.queue === 'todo' && t.status !== 'todo') return false;
      if (filters.queue === 'progress' && t.status !== 'progress') return false;
      if (filters.queue === 'waiting' && t.status !== 'waiting') return false;
      if (filters.queue === 'today' && !(d && d.getTime() === TODAY.getTime())) return false;
      if (filters.queue === 'overdue' && !(d && d < TODAY && t.status !== 'done')) return false;
      return true;
    };

    /* ---- Board rendering: each card lives in the column matching its status ---- */
    function renderBoard() {
      STATUS_ORDER.forEach((status) => {
        const col = board.querySelector('.board-col[data-status="' + status + '"]');
        const body = col.querySelector('.board-col__body');
        const mine = tasks.filter((t) => t.status === status && matches(t));
        body.innerHTML = '';
        mine.forEach((t) => {
          t.el.dataset.status = t.status;
          t.el.classList.toggle('is-done', t.status === 'done');
          body.appendChild(t.el);
        });
        col.querySelector('.board-col__count').textContent = String(mine.length);
      });
    }

    /* ---- List rendering: four columns, pill at the end of the description ---- */
    function renderList() {
      const rows = tasks.filter(matches).slice().sort(sortList);
      listBody.innerHTML = '';
      rows.forEach((t) => {
        const tr = document.createElement('tr');
        tr.dataset.task = t.id;

        const tdDesc = document.createElement('td');
        const wrap = document.createElement('div');
        wrap.className = 'task-desc-cell';
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'task-desc-link';
        btn.textContent = t.desc;
        // Task Description = edit task (never a link to the record)
        btn.addEventListener('click', () => openTask(t.id));
        const pill = document.createElement('a');
        pill.className = 'record-pill';
        pill.href = t.href;
        pill.textContent = t.hub;
        pill.title = 'Open linked record';
        wrap.append(btn, pill);
        tdDesc.appendChild(wrap);

        const tdStatus = document.createElement('td');
        tdStatus.appendChild(makeSelect(STATUS_ORDER.map((s) => [s, STATUS_LABEL[s]]), t.status, (v) => {
          t.status = v;
          renderBoard();
          refreshStats();
        }));

        const tdAssignee = document.createElement('td');
        tdAssignee.appendChild(makeSelect(
          ['Unassigned', 'Ratna', 'Berry', 'Andries', 'Kashif'].map((n) => [n, n]),
          t.assignee,
          (v) => {
            t.assignee = v;
            const chip = t.el.querySelector('.task-chip');
            chip.textContent = v;
            chip.classList.toggle('task-chip--unassigned', v === 'Unassigned');
          }
        ));

        const tdDue = document.createElement('td');
        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.className = 'inline-edit';
        dateInput.value = t.due || '';
        dateInput.addEventListener('change', () => {
          t.due = dateInput.value;
          const due = t.el.querySelector('.task-due');
          due.textContent = fmtDue(t.due);
          due.className = 'task-due ' + dueClass(t.due);
          refreshStats();
        });
        tdDue.appendChild(dateInput);

        tr.append(tdDesc, tdStatus, tdAssignee, tdDue);
        listBody.appendChild(tr);
      });
      listEmpty.hidden = rows.length !== 0;
    }

    function makeSelect(options, value, onChange) {
      const sel = document.createElement('select');
      sel.className = 'inline-edit';
      options.forEach(([v, label]) => {
        const o = new Option(label, v);
        if (v === value) o.selected = true;
        sel.appendChild(o);
      });
      sel.addEventListener('change', () => onChange(sel.value));
      return sel;
    }

    let sortKey = 'due';
    let sortDir = 1;
    function sortList(a, b) {
      let r = 0;
      if (sortKey === 'desc') r = a.desc.localeCompare(b.desc);
      else if (sortKey === 'status') r = STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status);
      else if (sortKey === 'assignee') r = a.assignee.localeCompare(b.assignee);
      else r = String(a.due).localeCompare(String(b.due));
      return r * sortDir;
    }

    list.querySelectorAll('.th-sort').forEach((th) => {
      th.addEventListener('click', () => {
        const key = th.dataset.sort;
        sortDir = sortKey === key ? -sortDir : 1;
        sortKey = key;
        list.querySelectorAll('.th-sort').forEach((o) => o.classList.remove('is-asc', 'is-desc'));
        th.classList.add(sortDir === 1 ? 'is-asc' : 'is-desc');
        renderList();
      });
    });

    function refreshStats() {
      const open = tasks.filter((t) => t.status !== 'done');
      const count = (fn) => String(open.filter(fn).length);
      const set = (q, v) => {
        const el = document.querySelector('.queue-stat[data-queue="' + q + '"] .queue-stat__value');
        if (el) el.textContent = v;
      };
      set('all', String(open.length));
      set('todo', count((t) => t.status === 'todo'));
      set('progress', count((t) => t.status === 'progress'));
      set('waiting', count((t) => t.status === 'waiting'));
      set('today', count((t) => t.due && new Date(t.due + 'T00:00:00').getTime() === TODAY.getTime()));
      set('overdue', count((t) => t.due && new Date(t.due + 'T00:00:00') < TODAY));
    }

    function renderAll() {
      renderBoard();
      renderList();
      refreshStats();
    }

    /* ---- View toggle ---- */
    document.querySelectorAll('[data-workview]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const v = btn.dataset.workview;
        document.querySelectorAll('[data-workview]').forEach((b) => {
          const on = b === btn;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-pressed', String(on));
        });
        board.hidden = v !== 'board';
        list.hidden = v !== 'list';
      });
    });

    /* ---- Filters ---- */
    const bind = (id, key) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input', () => {
        filters[key] = el.type === 'search' ? el.value.trim().toLowerCase() : el.value;
        renderAll();
      });
      el.addEventListener('change', () => {
        filters[key] = el.type === 'search' ? el.value.trim().toLowerCase() : el.value;
        renderAll();
      });
    };
    bind('taskSearch', 'q');
    bind('taskHub', 'hub');
    bind('taskAssignee', 'assignee');
    bind('taskDue', 'due');

    document.querySelectorAll('.queue-stat[data-queue]').forEach((tile) => {
      tile.addEventListener('click', () => {
        const q = tile.dataset.queue;
        filters.queue = filters.queue === q && q !== 'all' ? 'all' : q;
        document.querySelectorAll('.queue-stat[data-queue]').forEach((t) => {
          t.classList.toggle('is-active', t.dataset.queue === filters.queue);
        });
        renderAll();
      });
    });

    /* ---- Drag and drop: dropping a card sets its Status ---- */
    let dragging = null;
    board.addEventListener('dragstart', (e) => {
      const card = e.target.closest('.task-card');
      if (!card) return;
      dragging = card;
      card.classList.add('is-dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', card.dataset.task);
    });
    board.addEventListener('dragend', () => {
      if (dragging) dragging.classList.remove('is-dragging');
      dragging = null;
      board.querySelectorAll('.board-col').forEach((c) => c.classList.remove('is-dropping'));
    });
    board.querySelectorAll('.board-col').forEach((col) => {
      col.addEventListener('dragover', (e) => {
        e.preventDefault();
        col.classList.add('is-dropping');
      });
      col.addEventListener('dragleave', () => col.classList.remove('is-dropping'));
      col.addEventListener('drop', (e) => {
        e.preventDefault();
        col.classList.remove('is-dropping');
        const id = e.dataTransfer.getData('text/plain');
        const t = byId(id);
        if (!t) return;
        t.status = col.dataset.status;   // status follows the column
        renderAll();
      });
    });

    /* ---- Task detail drawer ---- */
    const drawer = document.getElementById('taskDrawer');
    const backdrop = document.getElementById('taskBackdrop');
    let current = null;

    function openTask(id) {
      const t = byId(id);
      if (!t) return;
      current = t;
      document.getElementById('tdDesc').value = t.desc;
      document.getElementById('tdStatus').value = t.status;
      document.getElementById('tdAssignee').value = t.assignee;
      document.getElementById('tdDue').value = t.due || '';
      document.getElementById('tdLinkCurrent').innerHTML =
        'Currently linked to <a href="' + t.href + '">' + t.hub + ' record</a>';
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      backdrop.hidden = false;
      document.getElementById('tdDesc').focus();
    }

    function closeTask() {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      backdrop.hidden = true;
      current = null;
    }

    // Clicking the card opens the task — but never the linked record by accident
    board.addEventListener('click', (e) => {
      if (e.target.closest('.record-pill')) return;
      const card = e.target.closest('.task-card');
      if (card) openTask(card.dataset.task);
    });
    board.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const card = e.target.closest('.task-card');
      if (!card) return;
      e.preventDefault();
      openTask(card.dataset.task);
    });

    backdrop.addEventListener('click', closeTask);
    document.getElementById('taskDrawerClose').addEventListener('click', closeTask);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeTask();
    });

    document.getElementById('tdSave').addEventListener('click', () => {
      if (!current) return;
      current.desc = document.getElementById('tdDesc').value.trim() || current.desc;
      current.status = document.getElementById('tdStatus').value;
      current.assignee = document.getElementById('tdAssignee').value;
      current.due = document.getElementById('tdDue').value;

      current.el.querySelector('.task-card__desc').textContent = current.desc;
      const chip = current.el.querySelector('.task-chip');
      chip.textContent = current.assignee;
      chip.classList.toggle('task-chip--unassigned', current.assignee === 'Unassigned');
      const due = current.el.querySelector('.task-due');
      due.textContent = fmtDue(current.due);
      due.className = 'task-due ' + dueClass(current.due);

      renderAll();
      closeTask();
    });

    document.getElementById('tdDelete').addEventListener('click', () => {
      if (!current) return;
      const i = tasks.indexOf(current);
      if (i > -1) tasks.splice(i, 1);
      current.el.remove();
      renderAll();
      closeTask();
    });

    const newBtn = document.getElementById('newTaskBtn');
    if (newBtn) {
      newBtn.addEventListener('click', () => {
        const id = 'new-' + Date.now();
        const el = document.createElement('article');
        el.className = 'task-card';
        el.draggable = true;
        el.tabIndex = 0;
        el.dataset.task = id;
        el.innerHTML =
          '<p class="task-card__desc">New task</p>' +
          '<div class="task-card__meta">' +
          '<span class="task-chip task-chip--unassigned">Unassigned</span>' +
          '<span class="task-due">—</span>' +
          '<a href="opportunities.html" class="record-pill">Sales</a>' +
          '</div>';
        const t = { id, desc: 'New task', status: 'inbox', assignee: 'Unassigned', due: '', hub: 'Sales', href: 'opportunities.html', el };
        tasks.unshift(t);
        renderAll();
        openTask(id);
      });
    }

    renderAll();
  }

  /* ================= Relationships ================= */
  if (page === 'relationships') {
    const grid = document.getElementById('relGrid');
    const list = document.getElementById('relList');
    const listBody = document.getElementById('relListBody');
    const listEmpty = document.getElementById('relListEmpty');
    const gridEmpty = document.getElementById('relEmpty');
    if (!grid) return;

    const TYPE_LABEL = {
      buyer: 'Buyer',
      tenant: 'Tenant',
      landlord: 'Landlord',
      developer: 'Property Developer',
      broker: 'Broker & Partner',
      contractor: 'Contractor'
    };

    const cards = Array.from(grid.querySelectorAll('.rel-card')).map((el) => ({
      el,
      type: el.dataset.reltype,
      name: el.dataset.name,
      company: el.querySelector('.rel-card__company').textContent.trim(),
      actions: parseInt(el.dataset.actions, 10) || 0,
      last: el.dataset.last,
      contacts: el.querySelector('.rel-fact dd').textContent.trim(),
      id: el.querySelector('.rel-id').textContent.trim(),
      wa: el.querySelector('.rel-wa').textContent.trim(),
      waNum: el.querySelector('.rel-wa').dataset.wa,
      actionText: el.querySelectorAll('.rel-fact dd')[2].textContent.trim(),
      actionDot: el.querySelector('.action-dot').className
    }));

    const state = { q: '', type: 'all', sort: 'recent' };

    const matches = (c) => {
      if (state.type !== 'all' && c.type !== state.type) return false;
      if (state.q) {
        const hay = (c.name + ' ' + c.company + ' ' + c.wa + ' ' + c.id).toLowerCase();
        if (!hay.includes(state.q)) return false;
      }
      return true;
    };

    const sortFn = (a, b) => {
      if (state.sort === 'name') return a.name.localeCompare(b.name);
      if (state.sort === 'actions') return b.actions - a.actions;
      if (state.sort === 'type') return TYPE_LABEL[a.type].localeCompare(TYPE_LABEL[b.type]);
      return String(b.last).localeCompare(String(a.last));
    };

    function render() {
      const visible = cards.filter(matches).slice().sort(sortFn);

      grid.innerHTML = '';
      visible.forEach((c) => grid.appendChild(c.el));
      gridEmpty.hidden = visible.length !== 0 || !list.hidden;

      listBody.innerHTML = '';
      visible.forEach((c) => {
        const tr = document.createElement('tr');
        tr.innerHTML =
          '<td><strong>' + c.name + '</strong>' + (c.company && c.company !== '—' ? '<br><span class="field-hint">' + c.company + '</span>' : '') + '</td>' +
          '<td><span class="rel-type rel-type--' + c.type + '">' + TYPE_LABEL[c.type] + '</span></td>' +
          '<td>' + c.contacts + '</td>' +
          '<td>' + new Date(c.last + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + '</td>' +
          '<td><span class="status-pill"><span class="' + c.actionDot + '"></span>' + c.actionText + '</span></td>' +
          '<td><span class="rel-wa" data-wa="' + c.waNum + '">' + c.wa + '</span></td>' +
          '<td><span class="rel-id">' + c.id + '</span></td>';
        tr.style.cursor = 'pointer';
        tr.addEventListener('click', (e) => {
          if (e.target.closest('.rel-wa')) return;
          window.location.href = '#';
        });
        listBody.appendChild(tr);
      });
      listEmpty.hidden = visible.length !== 0;
    }

    document.querySelectorAll('[data-relview]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const v = btn.dataset.relview;
        document.querySelectorAll('[data-relview]').forEach((b) => {
          const on = b === btn;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-pressed', String(on));
        });
        grid.hidden = v !== 'cards';
        list.hidden = v !== 'list';
        // Sort by belongs to the List view
        document.getElementById('relSortWrap').hidden = v !== 'list';
        render();
      });
    });

    const search = document.getElementById('relSearch');
    search.addEventListener('input', () => {
      state.q = search.value.trim().toLowerCase();
      render();
    });

    const typeSel = document.getElementById('relType');
    typeSel.addEventListener('change', () => {
      state.type = typeSel.value;
      syncTiles();
      render();
    });

    const sortSel = document.getElementById('relSort');
    sortSel.addEventListener('change', () => {
      state.sort = sortSel.value;
      render();
    });

    function syncTiles() {
      document.querySelectorAll('.queue-stat[data-reltype]').forEach((t) => {
        t.classList.toggle('is-active', t.dataset.reltype === state.type);
      });
    }

    // Metrics double as quick filters
    document.querySelectorAll('.queue-stat[data-reltype]').forEach((tile) => {
      tile.addEventListener('click', () => {
        state.type = tile.dataset.reltype;
        typeSel.value = state.type;
        syncTiles();
        render();
      });
    });

    // The number itself opens WhatsApp — no separate Contact button
    document.addEventListener('click', (e) => {
      const wa = e.target.closest('.rel-wa');
      if (!wa) return;
      e.preventDefault();
      e.stopPropagation();
      window.open('https://wa.me/' + wa.dataset.wa, '_blank', 'noopener');
    });

    render();
  }
});

/* ============================================================
   Opportunities — rebuilt from client feedback (26–27 Aug)
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  if (document.body.dataset.page !== 'opportunities') return;

  const body = document.getElementById('oppBody');
  const empty = document.getElementById('oppEmpty');
  if (!body) return;

  /* The five action states. Overdue / Needs Action / No Action / Triage are
     system-derived from the tasks on the Opportunity; only Waiting is set by
     the agent, and a Waiting item must carry a Next Follow-Up date — once that
     date passes it becomes Needs Action. */
  const ACTION = {
    overdue: { label: 'Overdue', dot: 'red', rank: 0 },
    needs:   { label: 'Needs Action', dot: 'orange', rank: 1 },
    triage:  { label: 'Triage', dot: 'yellow', rank: 2 },
    waiting: { label: 'Waiting', dot: 'green', rank: 3 },
    none:    { label: 'No Action', dot: 'none', rank: 4 }
  };

  const STAGES = ['New', 'In Contact', 'Viewing', 'Negotiation', 'Closed'];
  const TODAY = new Date('2026-09-01T00:00:00');

  const OPPS = [
    { name: 'Umar Hassan',    phone: '+62 856-7890-1234', email: 'umar@example.com',   action: 'needs',   followUp: '',           stage: 'In Contact',  type: 'Villa',      channel: 'Website',  priority: 'High', agent: 'Ratna',      updated: '2026-08-30', shortlist: 'edit',   href: 'shortlist.html' },
    { name: 'Sarah Wilson',   phone: '+62 811-9988-7766', email: 'sarah@example.com',  action: 'waiting', followUp: '2026-09-05', stage: 'Viewing',     type: 'Rent',       channel: 'Referral', priority: 'High', agent: 'Berry',      updated: '2026-08-29', shortlist: 'edit',   href: 'shortlist.html' },
    { name: 'M. Samo',        phone: '+62 812-3456-7890', email: '',                   action: 'overdue', followUp: '',           stage: 'In Contact',  type: 'Rent',       channel: 'WhatsApp', priority: 'High', agent: 'Ratna',      updated: '2026-08-22', shortlist: 'edit',   href: 'shortlist.html' },
    { name: 'Andries de Vos', phone: '+62 877-1234-0099', email: 'andries@example.com',action: 'needs',   followUp: '',           stage: 'Negotiation', type: 'Villa',      channel: 'Referral', priority: 'High', agent: 'Andries',    updated: '2026-08-28', shortlist: 'edit',   href: 'shortlist.html' },
    { name: 'Putu Widiana',   phone: '+62 813-5566-7788', email: '',                   action: 'triage',  followUp: '',           stage: 'New',         type: 'Land',       channel: 'Scout',    priority: 'Med',  agent: 'Unassigned', updated: '2026-09-01', shortlist: 'create', href: 'shortlist.html' },
    { name: 'Jenna Clark',    phone: '+62 819-2233-4455', email: 'jenna@example.com',  action: 'needs',   followUp: '',           stage: 'New',         type: 'Rent',       channel: 'Website',  priority: 'Med',  agent: 'Berry',      updated: '2026-08-31', shortlist: 'create', href: 'shortlist.html' },
    { name: 'Kadek Aryani',   phone: '+62 878-6655-4433', email: '',                   action: 'waiting', followUp: '2026-09-09', stage: 'Viewing',     type: 'Commercial', channel: 'Walk-in',  priority: 'Med',  agent: 'Kashif',     updated: '2026-08-27', shortlist: 'edit',   href: 'shortlist.html' },
    { name: 'Tom Bradley',    phone: '+62 815-7788-9900', email: 'tom@example.com',    action: 'overdue', followUp: '',           stage: 'Negotiation', type: 'Villa',      channel: 'Website',  priority: 'High', agent: 'Andries',    updated: '2026-08-18', shortlist: 'edit',   href: 'shortlist.html' },
    { name: 'Nina Petrova',   phone: '+62 821-4455-6677', email: 'nina@example.com',   action: 'none',    followUp: '',           stage: 'Closed',      type: 'Rent',       channel: 'Referral', priority: 'Low',  agent: 'Ratna',      updated: '2026-08-15', shortlist: 'edit',   href: 'shortlist.html' },
    { name: 'Wayan Adnyana',  phone: '+62 877-1234-0099', email: '',                   action: 'triage',  followUp: '',           stage: 'New',         type: 'Land',       channel: 'Scout',    priority: 'Low',  agent: 'Unassigned', updated: '2026-09-01', shortlist: 'create', href: 'shortlist.html' },
    { name: 'Grace Lim',      phone: '+62 816-3322-1100', email: 'grace@example.com',  action: 'needs',   followUp: '',           stage: 'In Contact',  type: 'Villa',      channel: 'WhatsApp', priority: 'Med',  agent: 'Berry',      updated: '2026-08-30', shortlist: 'create', href: 'shortlist.html' },
    { name: 'Made Sujana',    phone: '+62 817-4433-2211', email: '',                   action: 'waiting', followUp: '2026-09-12', stage: 'In Contact',  type: 'Commercial', channel: 'Walk-in',  priority: 'Low',  agent: 'Kashif',     updated: '2026-08-26', shortlist: 'create', href: 'shortlist.html' },
    { name: 'Oliver Hart',    phone: '+62 812-9090-1212', email: 'oliver@example.com', action: 'overdue', followUp: '',           stage: 'Viewing',     type: 'Rent',       channel: 'Website',  priority: 'Med',  agent: 'Ratna',      updated: '2026-08-14', shortlist: 'edit',   href: 'shortlist.html' },
    { name: 'Ayu Lestari',    phone: '+62 813-1111-2222', email: '',                   action: 'none',    followUp: '',           stage: 'Closed',      type: 'Rent',       channel: 'Referral', priority: 'Low',  agent: 'Berry',      updated: '2026-08-11', shortlist: 'edit',   href: 'shortlist.html' },
    { name: 'Daniel Chen',    phone: '+62 818-5544-3322', email: 'daniel@example.com', action: 'needs',   followUp: '',           stage: 'New',         type: 'Villa',      channel: 'Website',  priority: 'High', agent: 'Andries',    updated: '2026-08-31', shortlist: 'create', href: 'shortlist.html' },
    { name: 'Rina Kusuma',    phone: '+62 819-7766-5544', email: '',                   action: 'waiting', followUp: '2026-09-03', stage: 'Negotiation', type: 'Land',       channel: 'WhatsApp', priority: 'Med',  agent: 'Kashif',     updated: '2026-08-25', shortlist: 'edit',   href: 'shortlist.html' }
  ];

  // A Waiting item whose follow-up date has passed becomes Needs Action
  OPPS.forEach((o) => {
    if (o.action === 'waiting' && o.followUp && new Date(o.followUp + 'T00:00:00') < TODAY) {
      o.action = 'needs';
    }
  });

  const state = { q: '', channel: 'all', action: 'all' };
  let sortKey = 'shortlist';
  let sortDir = 1;

  const fmtDate = (iso) =>
    new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  const matches = (o) => {
    if (state.channel !== 'all' && o.channel !== state.channel) return false;
    if (state.action !== 'all' && o.action !== state.action) return false;
    if (state.q) {
      const hay = (o.name + ' ' + o.phone + ' ' + o.email).toLowerCase();
      if (!hay.includes(state.q)) return false;
    }
    return true;
  };

  const compare = (a, b) => {
    let r = 0;
    switch (sortKey) {
      case 'name':    r = a.name.localeCompare(b.name); break;
      case 'action':  r = ACTION[a.action].rank - ACTION[b.action].rank; break;
      case 'stage':   r = STAGES.indexOf(a.stage) - STAGES.indexOf(b.stage); break;
      case 'type':    r = a.type.localeCompare(b.type); break;
      case 'channel': r = a.channel.localeCompare(b.channel); break;
      case 'priority': {
        const p = { High: 0, Med: 1, Low: 2 };
        r = p[a.priority] - p[b.priority];
        break;
      }
      case 'agent':   r = a.agent.localeCompare(b.agent); break;
      case 'updated': r = b.updated.localeCompare(a.updated); break;
      // Shortlist sorts Edit-first by default so live shortlists surface
      default:        r = (a.shortlist === 'edit' ? 0 : 1) - (b.shortlist === 'edit' ? 0 : 1);
    }
    return r * sortDir;
  };

  function render() {
    const rows = OPPS.filter(matches).slice().sort(compare);
    body.innerHTML = '';

    rows.forEach((o) => {
      const tr = document.createElement('tr');
      const a = ACTION[o.action];
      const waitingHint = o.action === 'waiting' && o.followUp
        ? ' <span class="field-hint">· follow up ' + fmtDate(o.followUp) + '</span>'
        : '';

      tr.innerHTML =
        '<td><div class="opp-client"><span class="opp-avatar">' + o.name.charAt(0) + '</span>' +
          '<div><span class="opp-name">' + o.name + '</span>' +
          '<span class="field-hint opp-phone-sub">' + o.phone + '</span></div></div></td>' +
        '<td><span class="status-pill"><span class="action-dot action-dot--' + a.dot + '"></span>' + a.label + waitingHint + '</span></td>' +
        '<td><span class="opp-chip opp-chip--stage">' + o.stage + '</span></td>' +
        '<td>' + o.type + '</td>' +
        '<td>' + o.channel + '</td>' +
        '<td><span class="opp-chip opp-chip--' + o.priority.toLowerCase() + '">' + o.priority + '</span></td>' +
        '<td>' + (o.agent === 'Unassigned' ? '<span class="field-hint">Unassigned</span>' : o.agent) + '</td>' +
        '<td class="opp-date">' + fmtDate(o.updated) + '</td>' +
        '<td><a href="' + o.href + '" class="btn-shortlist btn-shortlist--' + o.shortlist + '">' +
          (o.shortlist === 'edit' ? 'Edit' : 'Create') + '</a></td>' +
        '<td><a href="profile.html" class="icon-action" title="Edit requirements" aria-label="Edit requirements">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg></a></td>';

      body.appendChild(tr);
    });

    empty.hidden = rows.length !== 0;
    document.getElementById('oppCount').textContent = String(rows.length);
    refreshCounts();
  }

  function refreshCounts() {
    const set = (key, n) => {
      const el = document.querySelector('.queue-stat[data-action="' + key + '"] .queue-stat__value');
      if (el) el.textContent = String(n);
    };
    set('all', OPPS.length);
    Object.keys(ACTION).forEach((k) => set(k, OPPS.filter((o) => o.action === k).length));
  }

  document.querySelectorAll('.th-sort').forEach((th) => {
    th.addEventListener('click', () => {
      const key = th.dataset.sort;
      sortDir = sortKey === key ? -sortDir : 1;
      sortKey = key;
      document.querySelectorAll('.th-sort').forEach((o) => o.classList.remove('is-asc', 'is-desc'));
      th.classList.add(sortDir === 1 ? 'is-asc' : 'is-desc');
      render();
    });
  });

  document.querySelectorAll('.queue-stat[data-action]').forEach((tile) => {
    tile.addEventListener('click', () => {
      state.action = tile.dataset.action;
      document.querySelectorAll('.queue-stat[data-action]').forEach((t) => {
        t.classList.toggle('is-active', t.dataset.action === state.action);
      });
      render();
    });
  });

  const search = document.getElementById('oppSearch');
  search.addEventListener('input', () => {
    state.q = search.value.trim().toLowerCase();
    render();
  });

  const channel = document.getElementById('channelSelect');
  channel.addEventListener('change', () => {
    state.channel = channel.value;
    render();
  });

  document.getElementById('oppResetBtn').addEventListener('click', () => {
    state.q = '';
    state.channel = 'all';
    state.action = 'all';
    search.value = '';
    channel.value = 'all';
    document.querySelectorAll('.queue-stat[data-action]').forEach((t) => {
      t.classList.toggle('is-active', t.dataset.action === 'all');
    });
    render();
  });

  /* ---- New Opportunity drawer ---- */
  const drawer = document.getElementById('oppDrawer');
  const backdrop = document.getElementById('oppBackdrop');
  const openDrawer = () => {
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    backdrop.hidden = false;
    document.body.style.overflow = 'hidden';
    document.getElementById('noName').focus();
  };
  const closeDrawer = () => {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    backdrop.hidden = true;
    document.body.style.overflow = '';
  };

  document.getElementById('newOppBtn').addEventListener('click', (e) => {
    e.preventDefault();
    openDrawer();
  });
  backdrop.addEventListener('click', closeDrawer);
  document.getElementById('oppDrawerClose').addEventListener('click', closeDrawer);
  document.getElementById('noCancel').addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeDrawer();
  });

  document.getElementById('noSave').addEventListener('click', () => {
    const name = document.getElementById('noName').value.trim();
    if (!name) {
      document.getElementById('noName').focus();
      return;
    }
    OPPS.unshift({
      name,
      phone: document.getElementById('noPhone').value.trim(),
      email: document.getElementById('noEmail').value.trim(),
      action: 'needs',
      followUp: '',
      stage: 'New',
      type: document.getElementById('noType').value,
      channel: document.getElementById('noChannel').value,
      priority: 'Med',
      agent: 'Unassigned',
      updated: '2026-09-01',
      shortlist: 'create',
      href: 'shortlist.html'
    });
    drawer.querySelectorAll('input, textarea').forEach((el) => {
      if (el.type === 'checkbox') el.checked = false;
      else el.value = '';
    });
    render();
    closeDrawer();
  });

  render();
});

/* ============================================================
   Shortlist Builder — Search Criteria → Selection → Draft

   A search does not just "generate options". Once its results are added, the
   search keeps listening: anything that enters the portfolio later turns up in
   Selection on its own, flagged NEW, for the agent to review.
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  if (document.body.dataset.page !== 'shortlist') return;
  const criteriaList = document.getElementById('sbCriteriaList');
  if (!criteriaList) return;

  const el = (i) => document.getElementById(i);
  const IDR = (n) => 'IDR ' + (n / 1000000).toFixed(0) + 'm';
  const TODAY = '2026-09-02';

  /* ---- Every location Banyan covers, nested under its primary ---- */
  const LOCATIONS = {
    Ubud: ['Nyuh Kuning', 'Penestanan', 'Sayan', 'Pengosekan', 'Tegallalang', 'Mas',
           'Kedewatan', 'Singakerta', 'Lodtunduh', 'Peliatan', 'Petulu', 'Sibang', 'Pejeng', 'Abiansemal'],
    'Tanah Lot – Canggu': ['Berawa', 'Batu Bolong', 'Pererenan', 'Echo Beach', 'Umalas', 'Tumbak Bayuh', 'Seseh'],
    Bukit: ['Bingin', 'Padang Padang', 'Balangan', 'Pecatu', 'Nyang Nyang', 'Uluwatu', 'Jimbaran', 'Nusa Dua'],
    Seminyak: ['Petitenget', 'Oberoi', 'Kerobokan', 'Batu Belig'],
    Sanur: ['Sindhu', 'Semawang', 'Padang Galak', 'Mertasari'],
    'Central Bali': ['Kintamani', 'Bedugul', 'Munduk', 'Jatiluwih'],
    'East Bali': ['Amed', 'Candidasa', 'Sidemen'],
    'North Bali': ['Lovina', 'Pemuteran', 'Singaraja'],
    'West Bali': ['Medewi', 'Balian', 'Pekutatan'],
    'Nusa & Gili Islands': ['Nusa Penida', 'Nusa Lembongan', 'Nusa Ceningan', 'Gili Air', 'Gili Meno', 'Gili Trawangan'],
    'Denpasar & Reno': ['Renon', 'Sanur Kaja', 'Sesetan']
  };
  // the ones agents reach for most, shown without opening the full list
  const POPULAR = ['Nyuh Kuning', 'Singakerta', 'Sibang', 'Penestanan', 'Pejeng', 'Abiansemal', 'Kedewatan'];
  const ALL_LOCATIONS = Object.values(LOCATIONS).flat();

  /* ---- The portfolio the searches run against ---- */
  const PROPERTIES = [
    { id: 'p1',  name: '3-Bedroom Family Villa with Private Pool & Garden', area: 'Singakerta', primary: 'Ubud', price: 32000000, beds: 3, baths: 3, pool: 'Private Pool', view: 'Rice Field View', access: 'Car Access', added: '2026-08-29', coBroker: false },
    { id: 'p2',  name: '2-Story Villa with Garden', area: 'Nyuh Kuning', primary: 'Ubud', price: 35500000, beds: 3, baths: 2, pool: 'Shared', view: 'Garden View', access: 'Car Access', added: '2026-08-12', coBroker: false },
    { id: 'p3',  name: '3-Bedroom Eco-Luxury Home, Taman Petanu', area: 'Pejeng', primary: 'Ubud', price: 35770000, beds: 3, baths: 3, pool: 'Private Pool', view: 'Jungle View', access: 'Car Access', added: '2026-08-30', coBroker: true },
    { id: 'p4',  name: '4-Bedroom Family Villa Near Green School', area: 'Sibang', primary: 'Ubud', price: 47000000, beds: 4, baths: 4, pool: 'Large Private Pool', view: 'Garden & Pool View', access: 'Car Access', added: '2026-07-30', coBroker: false },
    { id: 'p5',  name: 'Bright & Contemporary 2-Bedroom Villa', area: 'Penestanan', primary: 'Ubud', price: 22000000, beds: 2, baths: 2, pool: 'Private Pool', view: 'Rice Field View', access: 'Motorbike Access', added: '2026-08-05', coBroker: false },
    { id: 'p6',  name: '3BR Villa with Rice Field & Sunrise Views', area: 'Nyuh Kuning', primary: 'Ubud', price: 18600000, beds: 3, baths: 2, pool: 'Shared', view: 'Rice Field View', access: 'Car Access', added: '2026-08-31', coBroker: false },
    { id: 'p7',  name: 'Affordable 2BR Private Pool Villa', area: 'Nyuh Kuning', primary: 'Ubud', price: 19800000, beds: 2, baths: 2, pool: 'Private Pool', view: 'Garden View', access: 'Car Access', added: '2026-06-18', coBroker: false },
    { id: 'p8',  name: 'Private 2-Bedroom Villa Sanctuary in Pejeng', area: 'Pejeng', primary: 'Ubud', price: 24000000, beds: 2, baths: 2, pool: 'Private Pool', view: 'Jungle View', access: 'Car Access', added: '2026-08-30', coBroker: true },
    { id: 'p9',  name: '6BR Luxury Villa with Basketball Court & Pool', area: 'Kedewatan', primary: 'Ubud', price: 165000000, beds: 6, baths: 6, pool: 'Large Private Pool', view: 'Rice Field View', access: 'Car Access', added: '2026-05-20', coBroker: false },
    { id: 'p10', name: 'Thoughtfully Designed 3BR Eco Villa, Sibang', area: 'Sibang', primary: 'Ubud', price: 29000000, beds: 3, baths: 3, pool: 'Shared', view: 'Garden View', access: 'Car Access', added: '2026-08-31', coBroker: false },
    { id: 'p11', name: 'Alke Villa — Quiet Lane, Walk to Centre', area: 'Penestanan', primary: 'Ubud', price: 35000000, beds: 3, baths: 2, pool: 'Private Pool', view: 'Garden & Pool View', access: 'Walking Access only', added: '2026-08-30', coBroker: false },
    { id: 'p12', name: 'Bambu Nest — Green School Community', area: 'Sibang', primary: 'Ubud', price: 41000000, beds: 4, baths: 3, pool: 'Shared', view: 'Jungle View', access: 'Car Access', added: '2026-07-11', coBroker: false },
    { id: 'p13', name: 'Contemporary Villa, Panoramic Rice Field Views', area: 'Abiansemal', primary: 'Ubud', price: 26000000, beds: 2, baths: 2, pool: 'Private Pool', view: 'Rice Field View', access: 'Car Access', added: '2026-08-08', coBroker: false },
    { id: 'p14', name: '2-Bedroom Tropical Villa with Private Pool', area: 'Nyuh Kuning', primary: 'Ubud', price: 35000000, beds: 2, baths: 2, pool: 'Private Pool', view: 'Garden View', access: 'Car Access', added: '2026-04-02', coBroker: false }
  ];

  const CRITERIA = [
    { id: 'c1', name: '3BR Ubud Family Home', lastChecked: '2026-08-27', live: false,
      priceMin: 20000000, priceMax: 50000000,
      locations: ['Nyuh Kuning', 'Singakerta', 'Sibang', 'Penestanan', 'Pejeng', 'Abiansemal', 'Kedewatan'],
      bedsMin: 3, access: 'Car Access', excludeCoBroker: true, open: true },
    { id: 'c2', name: 'More Affordable Option', lastChecked: '2026-08-27', live: false,
      priceMin: 12000000, priceMax: 25000000,
      locations: ['Nyuh Kuning', 'Penestanan', 'Pejeng', 'Abiansemal'],
      bedsMin: 2, access: '', excludeCoBroker: false, open: false }
  ];

  /* selection = the staging area the searches feed.
     Each entry remembers which search surfaced it and whether it is unreviewed. */
  const state = {
    selection: [],   // [{ id, from, isNew }]
    selected: [],    // draft, in client-facing order
    rejected: [],    // excluded from this shortlist for good
    notes: {},
    published: false,
    url: '',
    selFilter: 'all'
  };

  const propById = (id) => PROPERTIES.find((p) => p.id === id);
  const inSelection = (id) => state.selection.some((s) => s.id === id);

  const matchesCriteria = (p, c) => {
    if (p.price < c.priceMin || p.price > c.priceMax) return false;
    if (c.locations.length && !c.locations.includes(p.area)) return false;
    if (c.bedsMin && p.beds < c.bedsMin) return false;
    if (c.access && p.access !== c.access) return false;
    if (c.excludeCoBroker && p.coBroker) return false;
    return true;
  };
  const matchesFor = (c) => PROPERTIES.filter((p) => matchesCriteria(p, c));
  const newFor = (c) => matchesFor(c).filter((p) => p.added > c.lastChecked && !state.rejected.includes(p.id));

  const fmtDate = (iso) =>
    new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

  /* A live search keeps feeding Selection on its own */
  function syncLiveSearches() {
    CRITERIA.filter((c) => c.live).forEach((c) => {
      matchesFor(c).forEach((p) => {
        if (state.rejected.includes(p.id) || inSelection(p.id)) return;
        state.selection.push({ id: p.id, from: c.id, isNew: p.added > c.lastChecked });
      });
    });
  }

  /* ================= Step 1 — criteria ================= */
  function renderCriteria() {
    criteriaList.innerHTML = '';

    CRITERIA.forEach((c) => {
      const total = matchesFor(c).length;
      const fresh = newFor(c).length;
      const unreviewed = state.selection.filter((s) => s.from === c.id && s.isNew).length;

      const card = document.createElement('article');
      card.className = 'sb-criteria' + (c.open ? ' is-open' : '');
      card.dataset.criteria = c.id;

      const summary =
        IDR(c.priceMin) + '–' + IDR(c.priceMax) + ' · ' +
        (c.locations.length
          ? (c.locations.length > 3
              ? c.locations.slice(0, 2).join('/') + ' +' + (c.locations.length - 2)
              : c.locations.join('/'))
          : 'Any location') +
        ' · ' + c.bedsMin + '+ bedrooms';

      // a search nobody has narrowed yet matches almost everything, which is
      // true but unhelpful — say so rather than letting the number puzzle
      const untouched = !c.locations.length && c.bedsMin <= 1 && !c.access;

      // The match count is the headline, and stays visible whether or not
      // there are new ones — the button never replaces it.
      const hint = (!c.live && untouched)
        ? '<p class="sb-warn">No criteria set yet — this matches almost the whole portfolio. Narrow it down first.</p>'
        : '';

      const action = c.live
        ? '<div class="sb-liveline">' +
            '<span class="sb-listening"><span class="sb-newpill__dot"></span>Listening — new matches go to Selection</span>' +
            (unreviewed
              ? '<button type="button" class="btn btn-primary sb-goreview" data-gen="' + c.id + '">' +
                  'Review ' + unreviewed + ' new in Selection →</button>'
              : '<button type="button" class="btn btn-ghost sb-goreview" data-gen="' + c.id + '">Open Selection</button>') +
          '</div>'
        : '<button type="button" class="btn btn-primary sb-addall" data-gen="' + c.id + '">' +
            'Add ' + total + ' Matching Results to Selection</button>';

      card.innerHTML =
        '<header class="sb-criteria__head">' +
          '<div class="sb-criteria__left">' +
            '<button type="button" class="sb-criteria__toggle" aria-expanded="' + c.open + '">' +
              '<span class="sb-criteria__chev"></span>' +
            '</button>' +
            // click the name to rename it — no separate dialog
            '<input type="text" class="sb-criteria__name" data-rename value="' +
              c.name.replace(/"/g, '&quot;') + '" aria-label="Search name">' +
            '<span class="sb-criteria__tools">' +
              '<button type="button" class="sb-tool" data-dup title="Duplicate this search">Duplicate</button>' +
              '<button type="button" class="sb-tool sb-tool--danger" data-del title="Delete this search">Delete</button>' +
            '</span>' +
          '</div>' +
          '<div class="sb-criteria__meta">' +
            // the collapsed row has to say where this search stands on its own
            (c.live
              ? '<span class="sb-state sb-state--live"><span class="sb-newpill__dot"></span>Listening</span>'
              : '<span class="sb-state sb-state--idle">Not added yet</span>') +
            '<span class="sb-matchcount"><strong>' + total + '</strong> matches</span>' +
            '<span class="sb-hint">Last checked ' + fmtDate(c.lastChecked) + '</span>' +
            (c.live
              ? (unreviewed
                  ? '<button type="button" class="sb-newbadge sb-newbadge--btn sb-goreview" data-gen="' + c.id +
                      '">' + unreviewed + ' to review →</button>'
                  : '')
              : (fresh ? '<span class="sb-newbadge">+' + fresh + ' NEW when added</span>' : '')) +
          '</div>' +
        '</header>' +

        '<div class="sb-criteria__body">' +
          '<div class="drawer-row drawer-row--2">' +
            '<label class="field"><span class="field__label">Price from (IDR/year)</span>' +
              '<input type="number" class="input-field" data-f="priceMin" value="' + c.priceMin + '"></label>' +
            '<label class="field"><span class="field__label">Price to (IDR/year)</span>' +
              '<input type="number" class="input-field" data-f="priceMax" value="' + c.priceMax + '"></label>' +
          '</div>' +
          '<div class="drawer-row drawer-row--2">' +
            '<label class="field"><span class="field__label">Bedrooms (minimum)</span>' +
              '<input type="number" class="input-field" data-f="bedsMin" value="' + c.bedsMin + '"></label>' +
            '<label class="field"><span class="field__label">Road access</span>' +
              '<select class="select-field" data-f="access">' +
                '<option value="">Any</option>' +
                ['Car Access', 'Motorbike Access', 'Walking Access only']
                  .map((a) => '<option value="' + a + '"' + (c.access === a ? ' selected' : '') + '>' + a + '</option>').join('') +
              '</select></label>' +
          '</div>' +

          // popular locations up front, every location one click away
          '<div class="field"><span class="field__label">Locations</span>' +
            '<div class="tagset">' +
              POPULAR.map((l) => '<label class="tag-check"><input type="checkbox" data-loc="' + l + '"' +
                (c.locations.includes(l) ? ' checked' : '') + '><span>' + l + '</span></label>').join('') +
              c.locations.filter((l) => !POPULAR.includes(l)).map((l) =>
                '<label class="tag-check"><input type="checkbox" data-loc="' + l + '" checked><span>' + l + '</span></label>').join('') +
            '</div>' +
            '<details class="sb-alllocs">' +
              '<summary class="drawer-more__summary">All locations <span class="field-hint">(' + ALL_LOCATIONS.length + ')</span></summary>' +
              '<label class="field sb-locsearch"><span class="sr-only">Search locations</span>' +
                '<input type="search" class="input-field" data-locsearch placeholder="Search a location…"></label>' +
              '<div class="sb-locgroups">' +
                Object.entries(LOCATIONS).map(([primary, subs]) =>
                  '<section class="sb-locgroup" data-primary="' + primary + '">' +
                    '<h4 class="sb-h4">' + primary + '</h4>' +
                    '<div class="tagset">' +
                      subs.map((sub) => '<label class="tag-check" data-locname="' + sub.toLowerCase() + '">' +
                        '<input type="checkbox" data-loc="' + sub + '"' +
                        (c.locations.includes(sub) ? ' checked' : '') + '><span>' + sub + '</span></label>').join('') +
                    '</div>' +
                  '</section>').join('') +
              '</div>' +
            '</details>' +
          '</div>' +

          '<details class="drawer-more">' +
            '<summary class="drawer-more__summary">Advanced criteria</summary>' +
            '<div class="sb-adv">' +
              '<h4 class="sb-h4">For rent</h4>' +
              '<div class="drawer-row drawer-row--2">' +
                '<label class="field"><span class="field__label">Available from</span><input type="date" class="input-field"></label>' +
                '<label class="field"><span class="field__label">Minimum rental period</span>' +
                  '<select class="select-field"><option>Any</option><option>3 months</option><option>6 months</option><option>12 months</option></select></label>' +
              '</div>' +
              '<div class="drawer-row drawer-row--2">' +
                '<label class="field"><span class="field__label">Distance to key point</span><input type="text" class="input-field" placeholder="e.g. 10 min to Green School"></label>' +
                '<label class="field"><span class="field__label">Pets</span>' +
                  '<select class="select-field"><option>Any</option><option>Pet Friendly</option><option>Cat Only</option><option>Case by Case</option></select></label>' +
              '</div>' +
              '<div class="drawer-row drawer-row--3">' +
                '<label class="field"><span class="field__label">Kitchen</span>' +
                  '<select class="select-field"><option>Any</option><option>Enclosed Kitchen</option><option>Open Kitchen</option><option>Semi-Outdoor Kitchen</option></select></label>' +
                '<label class="field"><span class="field__label">Living room</span>' +
                  '<select class="select-field"><option>Any</option><option>Enclosed</option><option>Semi-Open</option><option>Open</option></select></label>' +
                '<label class="field"><span class="field__label">Pool</span>' +
                  '<select class="select-field"><option>Any</option><option>Large Private Pool</option><option>Private Pool</option><option>Shared</option></select></label>' +
              '</div>' +
              '<div class="drawer-row drawer-row--2">' +
                '<label class="field"><span class="field__label">View</span>' +
                  '<select class="select-field"><option>Any</option><option>Rice Field View</option><option>Jungle View</option><option>Garden View</option><option>Ocean View</option></select></label>' +
                '<label class="field"><span class="field__label">Garden</span>' +
                  '<select class="select-field"><option>Any</option><option>Private garden</option><option>Shared garden</option><option>None</option></select></label>' +
              '</div>' +

              '<h4 class="sb-h4">For buy</h4>' +
              '<div class="drawer-row drawer-row--2">' +
                '<label class="field"><span class="field__label">Tenure</span>' +
                  '<select class="select-field"><option>Any</option><option>Leasehold</option><option>Freehold</option></select></label>' +
                '<label class="field"><span class="field__label">Lease duration (years min)</span><input type="number" class="input-field" placeholder="Any"></label>' +
              '</div>' +
              '<div class="drawer-row drawer-row--3">' +
                '<label class="field"><span class="field__label">Lease extension</span>' +
                  '<select class="select-field"><option>Any</option><option>Yes</option><option>No</option></select></label>' +
                '<label class="field"><span class="field__label">Zoning</span>' +
                  '<select class="select-field"><option>Any</option><option>Residential</option><option>Tourism</option><option>Green belt</option></select></label>' +
                '<label class="field"><span class="field__label">Building status</span>' +
                  '<select class="select-field"><option>Any</option><option>Built</option><option>Under construction</option><option>Off plan</option></select></label>' +
              '</div>' +
              '<label class="field"><span class="field__label">Building permits</span>' +
                '<select class="select-field"><option>Any</option><option>PBG / SLF in place</option><option>In progress</option><option>None</option></select></label>' +
            '</div>' +
          '</details>' +

          '<div class="sb-internal">' +
            '<h4 class="sb-h4">Internal</h4>' +
            '<label class="tag-check tag-check--wide"><input type="checkbox" data-f="excludeCoBroker"' +
              (c.excludeCoBroker ? ' checked' : '') + '><span>Exclude co-broker listings</span></label>' +
          '</div>' +

          '<div class="sb-criteria__foot">' +
            '<div><p class="sb-hint">' + summary + '</p>' + hint + '</div>' +
            action +
          '</div>' +
        '</div>';

      criteriaList.appendChild(card);
    });
  }

  /* ================= Cards ================= */
  function propCard(p, mode, entry) {
    const inDraft = state.selected.includes(p.id);
    const notes = state.notes[p.id] || { like: '', consider: '' };
    const pos = state.selected.indexOf(p.id);
    const isNew = entry && entry.isNew;

    const thumb =
      '<div class="sb-card__thumb" aria-hidden="true">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>' +
        '<span>Cover photo</span>' +
      '</div>';

    const facts =
      '<ul class="sb-card__facts">' +
        '<li><strong>' + IDR(p.price) + '</strong> / year</li>' +
        '<li>' + p.beds + ' bed · ' + p.baths + ' bath</li>' +
        '<li>' + p.area + ', ' + p.primary + '</li>' +
      '</ul>' +
      '<div class="sb-card__tags">' +
        '<span class="sb-tag">' + p.pool + '</span>' +
        '<span class="sb-tag">' + p.view + '</span>' +
        '<span class="sb-tag">' + p.access + '</span>' +
      '</div>';

    if (mode === 'draft') {
      return '<article class="sb-card sb-card--draft" data-prop="' + p.id + '">' +
        thumb +
        '<div class="sb-card__body">' +
          '<span class="sb-card__pos">' + (pos + 1) + '</span>' +
          '<h3 class="sb-card__title">' + p.name + '</h3>' +
          facts +
          '<label class="field"><span class="field__label">Why we like it</span>' +
            '<textarea class="input-field input-field--area" rows="2" data-note="like" placeholder="What makes this one worth seeing?">' + notes.like + '</textarea></label>' +
          '<label class="field"><span class="field__label">Things to consider</span>' +
            '<textarea class="input-field input-field--area" rows="2" data-note="consider" placeholder="Be honest — it builds trust.">' + notes.consider + '</textarea></label>' +
          '<div class="sb-card__actions">' +
            '<button type="button" class="btn btn-ghost sb-move" data-move="up" ' + (pos === 0 ? 'disabled' : '') + '>↑ Move up</button>' +
            '<button type="button" class="btn btn-ghost sb-move" data-move="down" ' + (pos === state.selected.length - 1 ? 'disabled' : '') + '>↓ Move down</button>' +
            '<button type="button" class="btn btn-ghost sb-remove">Remove</button>' +
          '</div>' +
        '</div>' +
      '</article>';
    }

    return '<article class="sb-card' + (isNew ? ' is-new' : '') + '" data-prop="' + p.id + '">' +
      (isNew ? '<span class="sb-newflag">NEW</span>' : '') +
      thumb +
      '<div class="sb-card__body">' +
        '<h3 class="sb-card__title">' + p.name + '</h3>' +
        facts +
        '<div class="sb-card__actions">' +
          '<button type="button" class="btn ' + (inDraft ? 'btn-ghost' : 'btn-primary') + ' sb-add"' + (inDraft ? ' disabled' : '') + '>' +
            (inDraft ? '✓ On shortlist' : '♡ Add to shortlist') + '</button>' +
          '<button type="button" class="btn btn-ghost sb-reject">Not for client</button>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  /* ================= Step 2 — selection ================= */
  function renderSelection() {
    const wrap = el('sbOptions');
    let list = state.selection.filter((s) => !state.rejected.includes(s.id));
    if (state.selFilter === 'new') list = list.filter((s) => s.isNew);
    // unreviewed first, so what needs attention is at the top
    list = list.slice().sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));

    wrap.innerHTML = list.map((s) => propCard(propById(s.id), 'select', s)).join('');
    el('sbOptionsEmpty').hidden = list.length !== 0;
    el('sbOptionsEmpty').textContent = state.selection.length
      ? 'Nothing left to review here.'
      : 'Nothing yet. Add a search’s matching results from Search Criteria.';

    const newCount = state.selection.filter((s) => s.isNew && !state.rejected.includes(s.id)).length;
    el('sbOptionCount').textContent = String(state.selection.filter((s) => !state.rejected.includes(s.id)).length);
    el('sbNewStat').hidden = newCount === 0;
    el('sbNewStatNum').textContent = String(newCount);
    el('sbMarkSeen').hidden = newCount === 0;
    el('sbSelFilter').hidden = newCount === 0;

    const rejWrap = el('sbRejectedWrap');
    rejWrap.hidden = state.rejected.length === 0;
    el('sbRejectedCount').textContent = String(state.rejected.length);
    el('sbRejectedList').innerHTML = state.rejected.map((id) =>
      '<li><span>' + propById(id).name + '</span><button type="button" class="sb-undo" data-undo="' + id + '">Undo</button></li>').join('');
  }

  /* ================= Step 3 — draft ================= */
  function renderDraft() {
    el('sbDraft').innerHTML = state.selected.map((id) => propCard(propById(id), 'draft')).join('');
    el('sbDraftEmpty').hidden = state.selected.length !== 0;
    el('sbPublish').hidden = false;   // always reachable, so Publish is never hidden
    const empty = state.selected.length === 0;
    el('sbPublishBtn').disabled = empty;
    el('sbPreview').classList.toggle('is-disabled', empty);
    el('sbPublishHint').textContent = empty
      ? 'Add at least one property before publishing.'
      : 'The client gets a link — no account needed.';
  }

  function refreshHeader() {
    const inSel = state.selection.filter((s) => !state.rejected.includes(s.id));
    const newCount = inSel.filter((s) => s.isNew).length;

    el('sbCount').textContent = String(state.selected.length);
    el('sbSelCount').textContent = String(inSel.length);
    el('sbDraftCount').textContent = String(state.selected.length);

    el('sbSelNew').hidden = newCount === 0;
    el('sbSelNew').textContent = '+' + newCount + ' NEW';

    const pill = el('sbNewPill');
    pill.hidden = newCount === 0;
    el('sbNewCount').textContent = String(newCount);
  }

  function renderAll() {
    syncLiveSearches();
    renderCriteria();
    renderSelection();
    renderDraft();
    refreshHeader();
  }

  /* ================= Steps ================= */
  function goto(step) {
    ['criteria', 'selection', 'draft'].forEach((s) => {
      el('step' + s.charAt(0).toUpperCase() + s.slice(1)).hidden = s !== step;
      const btn = document.querySelector('.sb-step[data-step="' + s + '"]');
      if (btn) btn.classList.toggle('is-active', s === step);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  document.querySelectorAll('.sb-step').forEach((b) =>
    b.addEventListener('click', () => goto(b.dataset.step)));
  document.querySelectorAll('[data-goto]').forEach((b) =>
    b.addEventListener('click', () => goto(b.dataset.goto)));
  el('sbCounter').addEventListener('click', () => goto('draft'));
  el('sbNewPill').addEventListener('click', () => goto('selection'));
  el('sbPublishTop').addEventListener('click', () => {
    goto('draft');
    window.setTimeout(() => el('sbPublish').scrollIntoView({ behavior: 'smooth', block: 'center' }), 350);
  });

  /* ================= Criteria interactions ================= */
  criteriaList.addEventListener('click', (e) => {
    const toggle = e.target.closest('.sb-criteria__toggle');
    if (toggle) {
      const card = toggle.closest('.sb-criteria');
      const c = CRITERIA.find((x) => x.id === card.dataset.criteria);
      c.open = !c.open;
      card.classList.toggle('is-open', c.open);
      toggle.setAttribute('aria-expanded', String(c.open));
      return;
    }

    // First add: everything matching moves into Selection, and the search goes live
    const add = e.target.closest('.sb-addall');
    if (add) {
      const c = CRITERIA.find((x) => x.id === add.dataset.gen);
      matchesFor(c).forEach((p) => {
        if (state.rejected.includes(p.id) || inSelection(p.id)) return;
        state.selection.push({ id: p.id, from: c.id, isNew: p.added > c.lastChecked });
      });
      c.live = true;
      renderAll();
      goto('selection');
      return;
    }

    const dup = e.target.closest('[data-dup]');
    if (dup) {
      const card = dup.closest('.sb-criteria');
      const c = CRITERIA.find((x) => x.id === card.dataset.criteria);
      const copy = Object.assign({}, c, {
        id: 'c' + Date.now(), name: c.name + ' (copy)',
        live: false, open: true, locations: c.locations.slice()
      });
      CRITERIA.splice(CRITERIA.indexOf(c) + 1, 0, copy);
      renderCriteria();
      return;
    }

    const del = e.target.closest('[data-del]');
    if (del) {
      const card = del.closest('.sb-criteria');
      const c = CRITERIA.find((x) => x.id === card.dataset.criteria);
      // whatever this search put in Selection stays; only the search goes
      CRITERIA.splice(CRITERIA.indexOf(c), 1);
      state.selection.forEach((sel) => { if (sel.from === c.id) sel.from = null; });
      renderAll();
      return;
    }

    const go = e.target.closest('.sb-goreview');
    if (go) {
      state.selFilter = 'all';
      renderAll();
      goto('selection');
    }
  });

  criteriaList.addEventListener('input', (e) => {
    if (e.target.dataset.rename !== undefined) {
      const card = e.target.closest('.sb-criteria');
      const c = CRITERIA.find((x) => x.id === card.dataset.criteria);
      c.name = e.target.value;
      return;
    }
    if (e.target.dataset.locsearch === undefined) return;
    // filter the full location list as the agent types
    const q = e.target.value.trim().toLowerCase();
    const root = e.target.closest('.sb-alllocs');
    root.querySelectorAll('.sb-locgroup').forEach((group) => {
      let any = false;
      group.querySelectorAll('[data-locname]').forEach((chip) => {
        const hit = !q || chip.dataset.locname.includes(q);
        chip.hidden = !hit;
        if (hit) any = true;
      });
      group.hidden = !any;
    });
  });

  criteriaList.addEventListener('change', (e) => {
    const card = e.target.closest('.sb-criteria');
    if (!card) return;
    const c = CRITERIA.find((x) => x.id === card.dataset.criteria);

    const f = e.target.dataset.f;
    if (f === 'excludeCoBroker') c.excludeCoBroker = e.target.checked;
    else if (f === 'bedsMin') c.bedsMin = parseInt(e.target.value, 10) || 0;
    else if (f === 'priceMin' || f === 'priceMax') c[f] = parseInt(e.target.value, 10) || 0;
    else if (f === 'access') c.access = e.target.value;

    if (e.target.dataset.loc) {
      const loc = e.target.dataset.loc;
      if (e.target.checked) {
        if (!c.locations.includes(loc)) c.locations.push(loc);
      } else {
        c.locations = c.locations.filter((l) => l !== loc);
      }
      // the same location can appear in both the popular row and the full list
      card.querySelectorAll('[data-loc="' + loc + '"]').forEach((box) => {
        box.checked = e.target.checked;
      });
    }

    const total = matchesFor(c).length;
    const countEl = card.querySelector('.sb-matchcount strong');
    if (countEl) countEl.textContent = String(total);
    const addBtn = card.querySelector('.sb-addall');
    if (addBtn) addBtn.textContent = 'Add ' + total + ' Matching Results to Selection';
  });

  el('sbAddCriteria').addEventListener('click', () => {
    CRITERIA.forEach((c) => (c.open = false));
    CRITERIA.push({
      id: 'c' + Date.now(), name: 'Untitled search',
      lastChecked: TODAY, live: false, priceMin: 10000000, priceMax: 100000000,
      locations: [], bedsMin: 1, access: '', excludeCoBroker: false, open: true
    });
    renderCriteria();
    // land straight in the name field so it gets a real name
    const fresh = criteriaList.lastElementChild.querySelector('[data-rename]');
    if (fresh) { fresh.focus(); fresh.select(); }
  });

  /* ================= Selection interactions ================= */
  const clearNew = (id) => {
    const entry = state.selection.find((s) => s.id === id);
    if (entry) entry.isNew = false;
  };

  el('sbOptions').addEventListener('click', (e) => {
    const card = e.target.closest('.sb-card');
    if (!card) return;
    const id = card.dataset.prop;

    if (e.target.closest('.sb-add')) {
      if (!state.selected.includes(id)) state.selected.push(id);
      clearNew(id);
      renderAll();
    }
    if (e.target.closest('.sb-reject')) {
      if (!state.rejected.includes(id)) state.rejected.push(id);
      state.selected = state.selected.filter((s) => s !== id);
      clearNew(id);
      renderAll();
    }
  });

  el('sbRejectedList').addEventListener('click', (e) => {
    const undo = e.target.closest('.sb-undo');
    if (!undo) return;
    state.rejected = state.rejected.filter((id) => id !== undo.dataset.undo);
    renderAll();
  });

  el('sbMarkSeen').addEventListener('click', () => {
    state.selection.forEach((s) => (s.isNew = false));
    CRITERIA.forEach((c) => { if (c.live) c.lastChecked = TODAY; });
    state.selFilter = 'all';
    document.querySelectorAll('[data-selfilter]').forEach((b) =>
      b.classList.toggle('is-active', b.dataset.selfilter === 'all'));
    renderAll();
  });

  document.querySelectorAll('[data-selfilter]').forEach((b) =>
    b.addEventListener('click', () => {
      state.selFilter = b.dataset.selfilter;
      document.querySelectorAll('[data-selfilter]').forEach((o) =>
        o.classList.toggle('is-active', o === b));
      renderSelection();
    }));

  /* ================= Draft interactions ================= */
  const draftWrap = el('sbDraft');

  draftWrap.addEventListener('click', (e) => {
    const card = e.target.closest('.sb-card');
    if (!card) return;
    const id = card.dataset.prop;
    const i = state.selected.indexOf(id);

    const move = e.target.closest('.sb-move');
    if (move) {
      const j = move.dataset.move === 'up' ? i - 1 : i + 1;
      if (j < 0 || j >= state.selected.length) return;
      state.selected[i] = state.selected[j];
      state.selected[j] = id;
      renderAll();
      return;
    }
    // Remove sends it back to Selection; it is not a rejection
    if (e.target.closest('.sb-remove')) {
      state.selected.splice(i, 1);
      renderAll();
    }
  });

  draftWrap.addEventListener('input', (e) => {
    const note = e.target.dataset.note;
    if (!note) return;
    const id = e.target.closest('.sb-card').dataset.prop;
    state.notes[id] = state.notes[id] || { like: '', consider: '' };
    state.notes[id][note] = e.target.value;
  });

  /* ================= Publish ================= */
  el('sbPublishBtn').addEventListener('click', () => {
    const name = el('sbName').value.trim();
    if (!name) {
      el('sbName').focus();
      return;
    }
    state.published = true;
    state.url = 'banyan.properties/s/' + Math.random().toString(36).slice(2, 7);

    el('sbUrl').textContent = state.url;
    el('sbPublishDraft').hidden = true;
    el('sbPublishLive').hidden = false;

    const status = el('sbStatus');
    status.dataset.state = 'published';
    status.textContent = 'Published';
    el('sbPublishTop').textContent = 'Published — open link';
  });

  el('sbCopy').addEventListener('click', () => {
    const btn = el('sbCopy');
    const done = () => {
      btn.textContent = 'Copied';
      window.setTimeout(() => (btn.textContent = 'Copy link'), 1600);
    };
    if (navigator.clipboard) navigator.clipboard.writeText('https://' + state.url).then(done, done);
    else done();
  });

  renderAll();
});

/* ============================================================
   Client-facing shortlist — mobile first, no account needed
   Client feedback (26–27 Aug), points 12 & 13
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  if (page !== 'client-shortlist' && page !== 'client-property') return;

  const AGENT = 'Berry';

  const SHORTLIST = [
    {
      id: 'p1',
      name: '3-Bedroom Family Villa with Private Pool & Garden',
      loc: 'Singakerta, Ubud',
      price: 'IDR 32m', per: '/ year',
      beds: 3, baths: 3, land: '750 m²', build: '210 m²',
      tags: ['Private pool', 'Rice field view', 'Car access', 'Pet friendly'],
      like: 'A quiet lane five minutes from Nyuh Kuning, with a genuinely private pool and a garden big enough for children to play in. The living area opens fully to the garden, which is rare at this price.',
      consider: 'The kitchen is semi-outdoor, so it needs a little more cleaning in the wet season. The road in narrows for the last 50 metres.'
    },
    {
      id: 'p2',
      name: '2-Story Villa with Garden — Nyuh Kuning',
      loc: 'Nyuh Kuning, Ubud',
      price: 'IDR 36m', per: '/ year',
      beds: 3, baths: 2, land: '500 m²', build: '180 m²',
      tags: ['Shared pool', 'Garden view', 'Car access'],
      like: 'Walking distance to the Monkey Forest and the village warungs. Upstairs bedrooms catch the breeze, so you can leave the air conditioning off most evenings.',
      consider: 'The pool is shared with two other villas in the compound. There is no dedicated study.'
    },
    {
      id: 'p3',
      name: '3-Bedroom Eco-Luxury Home, Taman Petanu',
      loc: 'Pejeng, Ubud',
      price: 'IDR 36m', per: '/ year',
      beds: 3, baths: 3, land: '640 m²', build: '195 m²',
      tags: ['Private pool', 'Jungle view', 'Car access', 'Solar'],
      like: 'Built to a proper eco spec — solar hot water, natural cross-ventilation and a river valley view from the main terrace. The community is friendly and mostly long-stay families.',
      consider: 'Fifteen minutes from central Ubud, so you will want a car. Mosquitoes near the valley in the evening.'
    },
    {
      id: 'p4',
      name: '4-Bedroom Family Villa Near Green School',
      loc: 'Sibang, Bali',
      price: 'IDR 47m', per: '/ year',
      beds: 4, baths: 4, land: '900 m²', build: '260 m²',
      tags: ['Large private pool', 'Garden & pool view', 'Car access', 'Pet friendly'],
      like: 'Three minutes from Green School and inside a small community of similar families. The largest garden of anything on your list, with a 12-metre pool.',
      consider: 'The furthest from Ubud centre, and the highest price on your shortlist.'
    },
    {
      id: 'p5',
      name: 'Bright & Contemporary 2-Bedroom Villa',
      loc: 'Penestanan, Ubud',
      price: 'IDR 22m', per: '/ year',
      beds: 2, baths: 2, land: '400 m²', build: '140 m²',
      tags: ['Private pool', 'Rice field view', 'Motorbike access'],
      like: 'The best value on your list. Recently renovated, very light, and the rice field view at the back is uninterrupted.',
      consider: 'Motorbike access only — the last stretch is a footpath, so no car to the door. Two bedrooms rather than three.'
    }
  ];

  /* ---- Per-viewer state, kept on this device only ---- */
  const KEY = 'banyan_cs_state';
  const load = () => {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || {};
    } catch (e) {
      return {};
    }
  };
  const store = Object.assign({ favs: [], rejected: [], questions: [], who: '' }, load());
  const save = () => {
    try {
      localStorage.setItem(KEY, JSON.stringify(store));
    } catch (e) {}
  };

  const byId = (id) => SHORTLIST.find((p) => p.id === id);

  const toast = (msg) => {
    const el = document.getElementById('csToast');
    if (!el) return;
    el.textContent = msg;
    el.hidden = false;
    el.classList.add('is-in');
    window.clearTimeout(el._t);
    el._t = window.setTimeout(() => {
      el.classList.remove('is-in');
      window.setTimeout(() => (el.hidden = true), 300);
    }, 2600);
  };

  /* ---- Shared drawer helpers ---- */
  function drawer(panelId, backdropId) {
    const panel = document.getElementById(panelId);
    const backdrop = document.getElementById(backdropId);
    if (!panel) return null;
    return {
      panel,
      open() {
        panel.classList.add('is-open');
        panel.setAttribute('aria-hidden', 'false');
        if (backdrop) backdrop.hidden = false;
        document.body.style.overflow = 'hidden';
      },
      close() {
        panel.classList.remove('is-open');
        panel.setAttribute('aria-hidden', 'true');
        if (backdrop) backdrop.hidden = true;
        document.body.style.overflow = '';
      }
    };
  }

  const ask = drawer('csAskPanel', 'csAskBackdrop');
  let askingId = null;

  function wireAsk(nameFor) {
    if (!ask) return;
    document.getElementById('csAskClose').addEventListener('click', ask.close);
    document.getElementById('csAskCancel').addEventListener('click', ask.close);
    const bd = document.getElementById('csAskBackdrop');
    if (bd) bd.addEventListener('click', ask.close);

    document.getElementById('csAskSend').addEventListener('click', () => {
      const text = document.getElementById('csAskText').value.trim();
      if (!text) {
        document.getElementById('csAskText').focus();
        return;
      }
      store.questions.push({ id: askingId, name: nameFor(askingId), text });
      save();
      document.getElementById('csAskText').value = '';
      ask.close();
      toast('Question sent to ' + AGENT);
      if (page === 'client-shortlist') render();
    });
  }

  function openAsk(id, name) {
    askingId = id;
    document.getElementById('csAskProp').textContent = name;
    ask.open();
    document.getElementById('csAskText').focus();
  }

  /* ================= Shortlist page ================= */
  if (page === 'client-shortlist') {
    const list = document.getElementById('csList');

    function card(p) {
      const fav = store.favs.includes(p.id);
      const asked = store.questions.filter((q) => q.id === p.id).length;

      return '<article class="cs-card" data-prop="' + p.id + '">' +
        '<a class="cs-card__link" href="client-property.html?p=' + p.id + '">' +
          '<div class="cs-card__photo">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>' +
            '<span>Cover photo</span>' +
          '</div>' +
          '<div class="cs-card__body">' +
            '<h2 class="cs-card__name">' + p.name + '</h2>' +
            '<p class="cs-card__loc">' + p.loc + '</p>' +
            '<p class="cs-card__price">' + p.price + ' <small>' + p.per + '</small></p>' +
            '<ul class="cs-card__specs"><li>' + p.beds + ' bed</li><li>' + p.baths + ' bath</li>' +
              '<li>' + p.land + ' land</li><li>' + p.build + ' building</li></ul>' +
            '<div class="cs-card__notes">' +
              '<p class="cs-mini"><strong>Why we like it</strong> ' + p.like + '</p>' +
              '<p class="cs-mini cs-mini--muted"><strong>Things to consider</strong> ' + p.consider + '</p>' +
            '</div>' +
          '</div>' +
        '</a>' +

        '<button type="button" class="cs-heart' + (fav ? ' is-on' : '') + '" data-fav="' + p.id + '" aria-pressed="' + fav + '" aria-label="Favourite">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>' +
        '</button>' +

        '<div class="cs-card__actions">' +
          '<button type="button" class="cs-act' + (fav ? ' is-on' : '') + '" data-fav="' + p.id + '">' +
            (fav ? '♥ Favourited' : '♡ Favourite') + '</button>' +
          '<button type="button" class="cs-act" data-ask="' + p.id + '">' +
            'Ask a question' + (asked ? ' (' + asked + ')' : '') + '</button>' +
          '<button type="button" class="cs-act cs-act--no" data-no="' + p.id + '">Not for me</button>' +
        '</div>' +
      '</article>';
    }

    function render() {
      const visible = SHORTLIST.filter((p) => !store.rejected.includes(p.id));
      list.innerHTML = visible.map(card).join('');

      if (store.rejected.length) {
        list.insertAdjacentHTML('beforeend',
          '<details class="cs-hidden"><summary>Hidden by you · ' + store.rejected.length + '</summary>' +
          '<ul>' + store.rejected.map((id) =>
            '<li><span>' + byId(id).name + '</span><button type="button" class="sb-undo" data-show="' + id + '">Show again</button></li>'
          ).join('') + '</ul></details>');
      }

      const favs = store.favs.map(byId).filter(Boolean);
      document.getElementById('csFavCount').textContent = String(favs.length);
      document.getElementById('csFavNames').textContent = favs.length
        ? favs.map((p) => p.name.split('—')[0].trim()).join(' · ')
        : 'Nothing saved yet — tap ♡ on a property.';
      document.getElementById('csFavBar').classList.toggle('is-active', favs.length > 0);
    }

    list.addEventListener('click', (e) => {
      const favBtn = e.target.closest('[data-fav]');
      if (favBtn) {
        e.preventDefault();
        const id = favBtn.dataset.fav;
        const i = store.favs.indexOf(id);
        if (i > -1) store.favs.splice(i, 1);
        else store.favs.push(id);
        save();
        render();
        return;
      }

      const askBtn = e.target.closest('[data-ask]');
      if (askBtn) {
        e.preventDefault();
        openAsk(askBtn.dataset.ask, byId(askBtn.dataset.ask).name);
        return;
      }

      const noBtn = e.target.closest('[data-no]');
      if (noBtn) {
        e.preventDefault();
        const id = noBtn.dataset.no;
        if (!store.rejected.includes(id)) store.rejected.push(id);
        store.favs = store.favs.filter((f) => f !== id);
        save();
        render();
        return;
      }

      const showBtn = e.target.closest('[data-show]');
      if (showBtn) {
        e.preventDefault();
        store.rejected = store.rejected.filter((id) => id !== showBtn.dataset.show);
        save();
        render();
      }
    });

    /* ---- Message the agent: favourites + questions attach themselves ---- */
    const msg = drawer('csMsgPanel', 'csMsgBackdrop');
    document.getElementById('csMessageBtn').addEventListener('click', () => {
      const favs = store.favs.map(byId).filter(Boolean);
      document.getElementById('csMsgFavs').innerHTML = favs.length
        ? favs.map((p) => '<li>' + p.name + '</li>').join('')
        : '<li class="cs-attached__none">None yet</li>';
      document.getElementById('csMsgQs').innerHTML = store.questions.length
        ? store.questions.map((q) => '<li><strong>' + q.name + '</strong><br>' + q.text + '</li>').join('')
        : '<li class="cs-attached__none">None yet</li>';
      msg.open();
    });
    document.getElementById('csMsgClose').addEventListener('click', msg.close);
    document.getElementById('csMsgCancel').addEventListener('click', msg.close);
    document.getElementById('csMsgBackdrop').addEventListener('click', msg.close);
    document.getElementById('csMsgSend').addEventListener('click', () => {
      msg.close();
      document.getElementById('csMsgText').value = '';
      toast('Sent to ' + AGENT + ' — he will reply on WhatsApp.');
    });

    /* ---- Share ---- */
    document.getElementById('csShare').addEventListener('click', async () => {
      const data = { title: 'Ubud Family Homes — Banyan', url: location.href };
      if (navigator.share) {
        try {
          await navigator.share(data);
          return;
        } catch (e) {
          if (e && e.name === 'AbortError') return;
        }
      }
      if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(location.href);
          toast('Link copied');
          return;
        } catch (e) {}
      }
      toast(location.href);
    });

    /* ---- Who's looking (kept deliberately quiet) ---- */
    const whoInput = document.getElementById('csWhoName');
    whoInput.value = store.who || '';
    document.getElementById('csWhoSave').addEventListener('click', () => {
      store.who = whoInput.value.trim();
      save();
      toast(store.who ? 'Thanks, ' + store.who : 'Saved');
    });

    wireAsk((id) => byId(id).name);
    render();
  }

  /* ================= Property detail page ================= */
  if (page === 'client-property') {
    const id = new URLSearchParams(location.search).get('p') || 'p1';
    const p = byId(id) || SHORTLIST[0];

    document.title = p.name + ' — Banyan shortlist';
    document.getElementById('cpTitle').textContent = p.name;
    document.getElementById('cpLoc').textContent = p.loc;
    document.getElementById('cpPrice').textContent = p.price;
    document.getElementById('cpLike').textContent = p.like;
    document.getElementById('cpConsider').textContent = p.consider;

    document.getElementById('cpSpecs').innerHTML = [
      ['Bedrooms', p.beds],
      ['Bathrooms', p.baths],
      ['Land', p.land],
      ['Building', p.build]
    ].map(([k, v]) => '<div class="cs-spec"><dt>' + k + '</dt><dd>' + v + '</dd></div>').join('');

    document.getElementById('cpFeatures').innerHTML =
      p.tags.map((t) => '<span class="cs-feature">' + t + '</span>').join('');

    const favBtn = document.getElementById('cpFav');
    const syncFav = () => {
      const on = store.favs.includes(p.id);
      favBtn.classList.toggle('is-on', on);
      favBtn.querySelector('.cs-fav__label').textContent = on ? 'Favourited' : 'Favourite';
    };
    favBtn.addEventListener('click', () => {
      const i = store.favs.indexOf(p.id);
      if (i > -1) store.favs.splice(i, 1);
      else store.favs.push(p.id);
      save();
      syncFav();
    });
    syncFav();

    document.getElementById('cpAsk').addEventListener('click', () => openAsk(p.id, p.name));
    wireAsk(() => p.name);
  }
});

/* ============================================================
   Opportunity page — Requirements / Shortlist / Contract / History
   Tasks are a layer across the record, not a tab.
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  if (document.body.dataset.page !== 'profile') return;
  const tabs = Array.from(document.querySelectorAll('.op-tab'));
  if (!tabs.length) return;

  const PANEL = {
    requirements: 'tabRequirements',
    shortlist: 'tabShortlist',
    contract: 'tabContract',
    history: 'tabHistory'
  };

  const show = (key) => {
    tabs.forEach((t) => {
      const on = t.dataset.tab === key;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', String(on));
    });
    Object.entries(PANEL).forEach(([k, id]) => {
      document.getElementById(id).hidden = k !== key;
    });
    try {
      history.replaceState(null, '', '#' + key);
    } catch (e) {}
  };

  tabs.forEach((t) => t.addEventListener('click', () => show(t.dataset.tab)));

  const initial = (location.hash || '').replace('#', '');
  if (PANEL[initial]) show(initial);

  /* ---- [+ Action] dropdown replaces the old permanent buttons ---- */
  const actionBtn = document.getElementById('opActionBtn');
  const actionList = document.getElementById('opActionList');

  const closeMenu = () => {
    actionList.hidden = true;
    actionBtn.setAttribute('aria-expanded', 'false');
  };

  actionBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = actionList.hidden;
    actionList.hidden = !open;
    actionBtn.setAttribute('aria-expanded', String(open));
  });

  document.addEventListener('click', closeMenu);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---- Task modal, on the right, collapses again once created ---- */
  const drawer = document.getElementById('opTaskDrawer');
  const backdrop = document.getElementById('opTaskBackdrop');

  const openTask = (title) => {
    document.getElementById('opTaskTitle').textContent = title;
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    backdrop.hidden = false;
    document.body.style.overflow = 'hidden';
    document.getElementById('opTaskDesc').focus();
  };
  const closeTask = () => {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    backdrop.hidden = true;
    document.body.style.overflow = '';
  };

  const toast = (msg) => {
    const el = document.getElementById('opToast');
    el.textContent = msg;
    el.hidden = false;
    el.classList.add('is-in');
    window.clearTimeout(el._t);
    el._t = window.setTimeout(() => {
      el.classList.remove('is-in');
      window.setTimeout(() => (el.hidden = true), 300);
    }, 2400);
  };

  const TITLES = {
    task: 'Create task',
    viewing: 'Log viewing',
    offer: 'Record offer',
    contract: 'Generate contract',
    waiting: 'Mark as waiting'
  };

  actionList.querySelectorAll('[data-action]').forEach((item) => {
    item.addEventListener('click', () => {
      const kind = item.dataset.action;
      closeMenu();
      // Waiting must carry a follow-up date, so it opens the task form too
      openTask(TITLES[kind] || 'Action');
      const hint = document.querySelector('#opTaskBody .field-hint');
      if (hint) {
        hint.innerHTML = kind === 'waiting'
          ? 'A waiting item needs a <strong>Next Follow-Up Date</strong> — once it passes, this Opportunity flips to Needs Action.'
          : 'Linked to <strong>Umar Hassan</strong> · this task appears in My Work and drives the Action status.';
      }
    });
  });

  backdrop.addEventListener('click', closeTask);
  document.getElementById('opTaskClose').addEventListener('click', closeTask);
  document.getElementById('opTaskCancel').addEventListener('click', closeTask);
  document.getElementById('opTaskSave').addEventListener('click', () => {
    closeTask();
    toast('Task created and added to My Work');
  });
});

/* ============================================================
   Listing detail — Content / Media / Operations behaviour
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  if (document.body.dataset.page !== 'listing-detail') return;

  /* ---- Nested primary / secondary location ---- */
  const SECONDARY = {
    Ubud: ['Nyuh Kuning', 'Penestanan', 'Sayan', 'Pengosekan', 'Tegallalang', 'Mas', 'Kedewatan', 'Singakerta'],
    Canggu: ['Berawa', 'Batu Bolong', 'Pererenan', 'Echo Beach', 'Umalas', 'Tumbak Bayuh'],
    Uluwatu: ['Bingin', 'Padang Padang', 'Balangan', 'Pecatu', 'Nyang Nyang'],
    Seminyak: ['Petitenget', 'Oberoi', 'Kerobokan', 'Batu Belig'],
    Sanur: ['Sindhu', 'Semawang', 'Padang Galak', 'Mertasari']
  };

  const primary = document.getElementById('ldLocPrimary');
  const secondary = document.getElementById('ldLocSecondary');
  if (primary && secondary) {
    const fillSecondary = (keep) => {
      const list = SECONDARY[primary.value] || [];
      secondary.innerHTML = '';
      secondary.appendChild(new Option('Not set', ''));
      list.forEach((n) => secondary.appendChild(new Option(n, n)));
      if (keep && list.includes(keep)) secondary.value = keep;
    };
    fillSecondary('Singakerta');
    primary.addEventListener('change', () => fillSecondary());
  }

  /* ---- Pricing: primary price + currency drive the IDR display price ---- */
  const FX = { USD: 16250, EUR: 17600, AUD: 10650, IDR: 1 };
  const priceEl = document.getElementById('ldPrimaryPrice');
  const curEl = document.getElementById('ldCurrency');
  const idrEl = document.getElementById('ldIdrPrice');
  const fxNote = document.getElementById('ldFxNote');

  const recalcPrice = () => {
    if (!priceEl || !curEl || !idrEl) return;
    const raw = Number(String(priceEl.value).replace(/[^0-9.]/g, '')) || 0;
    const rate = FX[curEl.value] || 1;
    idrEl.value = 'IDR ' + Math.round(raw * rate).toLocaleString('en-US');
    fxNote.textContent = curEl.value === 'IDR'
      ? 'Priced directly in IDR.'
      : 'Converted at 1 ' + curEl.value + ' = IDR ' + rate.toLocaleString('en-US') + ' · FX updated weekly.';
  };
  if (priceEl) {
    priceEl.addEventListener('input', recalcPrice);
    curEl.addEventListener('change', recalcPrice);
    recalcPrice();
  }

  /* ---- Lease duration is calculated, never typed ---- */
  const leaseEnd = document.getElementById('ldLeaseEnd');
  const leaseDur = document.getElementById('ldLeaseDuration');
  const recalcLease = () => {
    if (!leaseEnd || !leaseDur) return;
    if (!leaseEnd.value) {
      leaseDur.value = '—';
      return;
    }
    const end = new Date(leaseEnd.value + 'T00:00:00');
    const now = new Date('2026-09-01T00:00:00');
    let months = (end.getFullYear() - now.getFullYear()) * 12 + (end.getMonth() - now.getMonth());
    if (end.getDate() < now.getDate()) months -= 1;
    if (months < 0) {
      leaseDur.value = 'Expired';
      return;
    }
    leaseDur.value = '~' + Math.floor(months / 12) + '.' + (months % 12) + ' years';
  };
  if (leaseEnd) {
    leaseEnd.addEventListener('change', recalcLease);
    recalcLease();
  }

  /* ---- Inclusions only apply to rentals ---- */
  const typeSel = document.getElementById('ldType');
  const inclusions = document.getElementById('ldInclusions');
  const leaseBlock = document.getElementById('ldLeaseBlock');
  const syncType = () => {
    if (!typeSel) return;
    const isRent = typeSel.value === 'rent';
    if (inclusions) inclusions.hidden = !isRent;
    if (leaseBlock) leaseBlock.hidden = isRent;
  };
  if (typeSel) {
    typeSel.addEventListener('change', syncType);
    syncType();
  }

  /* ---- Operations: reveal the secondary fields on a row ---- */
  document.querySelectorAll('.ld-expand').forEach((btn) => {
    btn.addEventListener('click', () => {
      const row = btn.closest('tr');
      const more = row.nextElementSibling;
      if (!more || !more.classList.contains('ld-more')) return;
      more.hidden = !more.hidden;
      btn.textContent = more.hidden ? '▾' : '▴';
    });
  });

  /* ---- Media: add more YouTube videos ---- */
  const addVideo = document.getElementById('ldAddVideo');
  const videoList = document.getElementById('ldVideoList');
  if (addVideo && videoList) {
    addVideo.addEventListener('click', () => {
      const row = document.createElement('div');
      row.className = 'op-listitem';
      row.innerHTML =
        '<input type="url" class="input-field" placeholder="https://youtube.com/watch?v=…">' +
        '<button type="button" class="btn btn-ghost ld-video-remove">Remove</button>';
      videoList.appendChild(row);
      row.querySelector('input').focus();
    });
    videoList.addEventListener('click', (e) => {
      if (e.target.closest('.ld-video-remove')) e.target.closest('.op-listitem').remove();
    });
  }

  /* ---- WhatsApp numbers are clickable wherever they appear ---- */
  document.addEventListener('click', (e) => {
    const wa = e.target.closest('.rel-wa');
    if (!wa || !wa.dataset.wa) return;
    e.preventDefault();
    window.open('https://wa.me/' + wa.dataset.wa, '_blank', 'noopener');
  });
});

/* ============================================================
   Relationship detail — "a relationship workspace, not a
   database dump" (client feedback, Relationships point 12)
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  if (document.body.dataset.page !== 'relationship-detail') return;

  const TYPE_LABEL = {
    buyer: 'Buyer',
    tenant: 'Tenant',
    landlord: 'Landlord',
    developer: 'Property Developer',
    broker: 'Broker & Partner',
    contractor: 'Contractor'
  };

  /* The same six relationships as the card view, with the deeper detail
     the card cannot carry. Activity metrics match the card exactly. */
  const PEOPLE = {
    'REL-00072': {
      name: 'Maria Santos', company: 'Santos Family Holdings', type: 'landlord',
      wa: '6281234567890', waLabel: '+62 812-3456-7890', email: 'maria@santosholdings.com',
      agent: 'Ratna', contacts: 8, last: '26 Aug 2026', action: { dot: 'red', text: '2 open tasks' },
      address: 'Jl. Raya Singakerta, Ubud', language: 'Indonesian, English',
      verified: '12 Feb 2026', since: '04 Nov 2024',
      activity: [['Listings', 4], ['Enquiries', 12], ['Viewings', 7], ['Bookings', 3]],
      broker: null,
      tasks: [
        { t: 'Chase owner for lease extension documents', who: 'Kashif', due: 'due 5 Sep', urgent: false },
        { t: 'Confirm 2027 pricing for the Singakerta villa', who: 'Ratna', due: 'overdue 30 Aug', urgent: true }
      ],
      history: [
        ['26 Aug · 14:10', 'Ratna', 'Called about the 2027 renewal — wants to hold price'],
        ['21 Aug · 09:30', 'System', 'Booking confirmed — Sarah Wilson, 12 months'],
        ['14 Aug · 16:05', 'Berry', 'Viewing logged — 3-Bedroom Family Villa, Singakerta'],
        ['02 Aug · 11:20', 'Ratna', 'New listing added to the portfolio'],
        ['04 Nov · 2024', 'System', 'Relationship created from a website enquiry']
      ],
      notes: [['Ratna · 26 Aug', 'Prefers WhatsApp voice notes over calls. Slow to reply on weekends.']],
      connections: [
        ['Listing', '3-Bedroom Family Villa, Singakerta', 'listing-detail.html'],
        ['Listing', 'Spacious Luxury Villa with Guest House', 'listing-detail.html'],
        ['Booking', 'Sarah Wilson · Oct 2026 – Oct 2027', '#'],
        ['Contract', 'Rental agreement — signed 28 Aug', '#']
      ],
      docs: [['Contract documents', '#'], ['Property certificates', '#']],
      firstTouch: [['Source', 'Website'], ['Campaign', '—'], ['Landing page', '/villas-for-rent'], ['First seen', '04 Nov 2024']],
      lifecycle: [['Last website visit', '18 Aug 2026'], ['Last enquiry', '—'], ['Last transaction', '28 Aug 2026'], ['Last activity', '26 Aug 2026']]
    },

    'REL-00124': {
      name: 'Umar Hassan', company: '', type: 'buyer',
      wa: '6285678901234', waLabel: '+62 856-7890-1234', email: 'umar@example.com',
      agent: 'Ratna', contacts: 5, last: '24 Aug 2026', action: { dot: 'green', text: '1 waiting' },
      address: 'Currently in Singapore', language: 'English, Urdu',
      verified: '18 Aug 2026', since: '17 Aug 2026',
      activity: [['Shortlists', 3], ['Viewings', 2], ['Contracts', 1]],
      broker: { name: 'Wayan Adnyana', meta: 'Bali Estate Partners · REL-00009' },
      tasks: [
        { t: 'Follow up after Tuesday’s viewing', who: 'Ratna', due: 'waiting until 5 Sep', urgent: false }
      ],
      history: [
        ['02 Sep · 16:35', 'Client', 'Asked: “Is the pool private?”'],
        ['02 Sep · 16:32', 'Client', 'Favourited “3BR Villa — Nyuh Kuning”'],
        ['28 Aug · 14:20', 'System', 'Shortlist published — Ubud Family Homes'],
        ['26 Aug · 15:30', 'Ratna', 'Viewing logged — 3-Bedroom Family Villa, Singakerta'],
        ['18 Aug · 09:02', 'System', 'Stage changed New → In Contact'],
        ['17 Aug · 18:44', 'System', 'Relationship created from a website enquiry']
      ],
      notes: [['Ratna · 24 Aug', 'Decisive once he has seen a place in person. Partner is the one to convince on the garden.']],
      connections: [
        ['Opportunity', 'Umar Hassan — Villa, In Contact', 'profile.html'],
        ['Shortlist', 'Umar — Ubud Family Homes (published)', 'shortlist.html'],
        ['Contract', 'Rental agreement — draft v2', '#']
      ],
      docs: [['Contract documents', '#']],
      firstTouch: [['Source', 'Referral'], ['Campaign', '—'], ['Landing page', '/villas-for-rent/ubud'], ['First seen', '17 Aug 2026']],
      lifecycle: [['Last website visit', '02 Sep 2026'], ['Last enquiry', '17 Aug 2026'], ['Last transaction', '—'], ['Last activity', '02 Sep 2026']]
    },

    'REL-00318': {
      name: 'Sarah Wilson', company: '', type: 'tenant',
      wa: '6281199887766', waLabel: '+62 811-9988-7766', email: 'sarah.wilson@example.com',
      agent: 'Berry', contacts: 11, last: '27 Aug 2026', action: { dot: 'none', text: 'No action' },
      address: 'Nyuh Kuning, Ubud', language: 'English',
      verified: '03 Mar 2026', since: '11 Jan 2026',
      activity: [['Shortlists', 1], ['Viewings', 3], ['Contracts', 1]],
      broker: null,
      tasks: [],
      history: [
        ['27 Aug · 10:15', 'Berry', 'Move-in date confirmed for 1 October'],
        ['21 Aug · 10:00', 'Berry', 'Viewing logged — 2-Story Villa with Garden'],
        ['12 Aug · 13:40', 'System', 'Contract signed — 12 months'],
        ['11 Jan · 2026', 'System', 'Relationship created from a walk-in']
      ],
      notes: [['Berry · 27 Aug', 'Two cats — only show pet-friendly properties.']],
      connections: [
        ['Booking', 'Singakerta villa · Oct 2026 – Oct 2027', '#'],
        ['Contract', 'Rental agreement — signed 12 Aug', '#']
      ],
      docs: [['Contract documents', '#'], ['Move-in inspection', '#']],
      firstTouch: [['Source', 'Walk-in'], ['Campaign', '—'], ['Landing page', '—'], ['First seen', '11 Jan 2026']],
      lifecycle: [['Last website visit', '20 Aug 2026'], ['Last enquiry', '11 Jan 2026'], ['Last transaction', '12 Aug 2026'], ['Last activity', '27 Aug 2026']]
    },

    'REL-00009': {
      name: 'Wayan Adnyana', company: 'Bali Estate Partners', type: 'broker',
      wa: '6287712340099', waLabel: '+62 877-1234-0099', email: 'wayan@baliestatepartners.com',
      agent: 'Andries', contacts: 6, last: '21 Aug 2026', action: { dot: 'red', text: '1 open task' },
      address: 'Seminyak, Bali', language: 'Indonesian, English',
      verified: '09 Jun 2025', since: '22 Mar 2023',
      activity: [['Listings', 9], ['Listings in Shortlists', 5], ['Viewings', 4], ['Contracts', 2]],
      broker: null,
      tasks: [
        { t: 'Agree co-broker split on the Pejeng villa', who: 'Andries', due: 'due 8 Sep', urgent: false }
      ],
      history: [
        ['21 Aug · 11:45', 'Andries', 'Sent three new co-broker listings'],
        ['08 Aug · 15:10', 'System', 'Contract signed — co-broker commission 4%'],
        ['22 Mar · 2023', 'System', 'Relationship created — partner agreement']
      ],
      notes: [['Andries · 21 Aug', 'Reliable on paperwork. Always confirm the split in writing before viewings.']],
      connections: [
        ['Listing', '3-Bedroom Eco-Luxury Home, Taman Petanu', 'listing-detail.html'],
        ['Relationship', 'Umar Hassan — referred buyer', 'relationship-detail.html?id=REL-00124']
      ],
      docs: [['Partner agreement', '#']],
      firstTouch: [['Source', 'Partner introduction'], ['Campaign', '—'], ['Landing page', '—'], ['First seen', '22 Mar 2023']],
      lifecycle: [['Last website visit', '—'], ['Last enquiry', '—'], ['Last transaction', '08 Aug 2026'], ['Last activity', '21 Aug 2026']]
    },

    'REL-00201': {
      name: 'Putu Widiana', company: 'Nusa Development', type: 'developer',
      wa: '6281355667788', waLabel: '+62 813-5566-7788', email: 'putu@nusadevelopment.co.id',
      agent: 'Unassigned', contacts: 3, last: '14 Aug 2026', action: { dot: 'none', text: 'No action' },
      address: 'Denpasar, Bali', language: 'Indonesian',
      verified: '—', since: '30 Jul 2026',
      activity: [],
      broker: null,
      tasks: [],
      history: [
        ['14 Aug · 09:00', 'System', 'Land parcel submitted for review'],
        ['30 Jul · 2026', 'System', 'Relationship created by a Scout']
      ],
      notes: [],
      connections: [['Opportunity', 'Putu Widiana — Land, Triage', 'opportunities.html']],
      docs: [],
      firstTouch: [['Source', 'Scout'], ['Campaign', '—'], ['Landing page', '—'], ['First seen', '30 Jul 2026']],
      lifecycle: [['Last website visit', '—'], ['Last enquiry', '30 Jul 2026'], ['Last transaction', '—'], ['Last activity', '14 Aug 2026']]
    },

    'REL-00455': {
      name: 'Made Sujana', company: 'Made Renovations', type: 'contractor',
      wa: '6281744332211', waLabel: '+62 817-4433-2211', email: 'made@maderenovations.id',
      agent: 'Kashif', contacts: 14, last: '29 Aug 2026', action: { dot: 'green', text: '1 waiting' },
      address: 'Gianyar, Bali', language: 'Indonesian',
      verified: '15 Apr 2025', since: '08 Sep 2024',
      activity: [],
      broker: null,
      tasks: [
        { t: 'Quote for the guest house water pressure fix', who: 'Kashif', due: 'waiting until 4 Sep', urgent: false }
      ],
      history: [
        ['29 Aug · 08:20', 'Kashif', 'Asked for a quote on the water pressure issue'],
        ['18 Aug · 14:00', 'System', 'Pool pump service completed — rated 4/5'],
        ['08 Sep · 2024', 'System', 'Relationship created — preferred contractor']
      ],
      notes: [['Kashif · 18 Aug', 'Good on plumbing and pools. Slower on anything electrical.']],
      connections: [['Listing', 'Spacious Luxury Villa with Guest House', 'listing-detail.html']],
      docs: [['Maintenance records', '#']],
      firstTouch: [['Source', 'Referral'], ['Campaign', '—'], ['Landing page', '—'], ['First seen', '08 Sep 2024']],
      lifecycle: [['Last website visit', '—'], ['Last enquiry', '—'], ['Last transaction', '18 Aug 2026'], ['Last activity', '29 Aug 2026']]
    }
  };

  const id = new URLSearchParams(location.search).get('id') || 'REL-00124';
  const p = PEOPLE[id] || PEOPLE['REL-00124'];

  const el = (i) => document.getElementById(i);
  const kv = (rows) => rows.map(([k, v]) => '<div class="rd-kvrow"><dt>' + k + '</dt><dd>' + v + '</dd></div>').join('');

  document.title = 'Banyan · ' + p.name;

  /* ---- Header ---- */
  el('rdName').textContent = p.name;
  el('rdType').textContent = TYPE_LABEL[p.type];
  el('rdType').className = 'rel-type rel-type--' + p.type;
  el('rdId').textContent = id;
  el('rdCompany').textContent = p.company || '';
  el('rdCompany').hidden = !p.company;
  el('rdWa').dataset.wa = p.wa;
  el('rdWaLabel').textContent = p.waLabel;
  el('rdEmail').textContent = p.email;
  el('rdEmail').href = 'mailto:' + p.email;
  el('rdAgent').textContent = p.agent;
  el('rdTaskLink').textContent = p.name;

  /* ---- The card's four facts, repeated so the two views agree ---- */
  el('rdFacts').innerHTML =
    '<div class="rd-fact"><span class="rd-fact__label">Relationship type</span>' +
      '<span class="rd-fact__value">' + TYPE_LABEL[p.type] + '</span></div>' +
    '<div class="rd-fact"><span class="rd-fact__label">Contacts</span>' +
      '<span class="rd-fact__value">' + p.contacts + '</span></div>' +
    '<div class="rd-fact"><span class="rd-fact__label">Last contacted</span>' +
      '<span class="rd-fact__value">' + p.last + '</span></div>' +
    '<div class="rd-fact"><span class="rd-fact__label">Actions</span>' +
      '<span class="rd-fact__value"><span class="action-dot action-dot--' + p.action.dot + '"></span>' +
      p.action.text + '</span></div>';

  /* ---- Open tasks ---- */
  el('rdTasks').innerHTML = p.tasks.map((t) =>
    '<li class="op-listitem"><div><strong>' + t.t + '</strong>' +
    '<span class="field-hint">' + t.who + '</span></div>' +
    '<span class="op-when' + (t.urgent ? ' is-overdue' : '') + '">' + t.due + '</span></li>'
  ).join('');
  el('rdTasksEmpty').hidden = p.tasks.length !== 0;

  /* ---- Activity history, written for people rather than machines ---- */
  el('rdHistory').innerHTML = p.history.map(([when, who, what]) => {
    const cls = who === 'Client' ? ' op-tl__who--client' : (who === 'System' ? ' op-tl__who--system' : '');
    return '<li class="op-tl"><span class="op-tl__when">' + when + '</span>' +
      '<span class="op-tl__who' + cls + '">' + who + '</span>' +
      '<p class="op-tl__what">' + what + '</p></li>';
  }).join('');

  /* ---- Notes ---- */
  const notes = p.notes.slice();
  const paintNotes = () => {
    el('rdNotes').innerHTML = notes.length
      ? notes.map(([who, text]) =>
          '<li class="op-listitem"><div><strong>' + text + '</strong>' +
          '<span class="field-hint">' + who + '</span></div></li>').join('')
      : '<li class="op-listitem"><span class="field-hint">No notes yet.</span></li>';
  };
  paintNotes();

  el('rdAddNote').addEventListener('click', () => {
    const box = el('rdNoteText');
    const text = box.value.trim();
    if (!text) {
      box.focus();
      return;
    }
    notes.unshift(['You · today', text]);
    box.value = '';
    paintNotes();
  });

  /* ---- Connections: named records, no raw IDs ---- */
  el('rdConnections').innerHTML = p.connections.map(([kind, label, href]) =>
    '<li class="op-listitem"><div><strong>' + label + '</strong>' +
    '<span class="field-hint">' + kind + '</span></div>' +
    '<a href="' + href + '" class="btn btn-ghost">Open</a></li>'
  ).join('') || '<li class="op-listitem"><span class="field-hint">No connected records yet.</span></li>';

  /* ---- Side column ---- */
  el('rdContact').innerHTML = kv([
    ['WhatsApp', p.waLabel],
    ['Email', p.email],
    ['Location', p.address],
    ['Language', p.language],
    ['Verified', p.verified],
    ['Relationship since', p.since]
  ]);

  if (p.broker) {
    el('rdBrokerCard').hidden = false;
    el('rdBrokerName').textContent = p.broker.name;
    el('rdBrokerMeta').textContent = p.broker.meta;
    const relId = (p.broker.meta.match(/REL-\d+/) || [])[0];
    if (relId) el('rdBrokerLink').href = 'relationship-detail.html?id=' + relId;
  }

  el('rdActivity').innerHTML = p.activity.length
    ? kv(p.activity)
    : '<p class="field-hint">No property activity recorded for this relationship type.</p>';

  el('rdDocs').innerHTML = p.docs.length
    ? p.docs.map(([label, href]) =>
        '<li class="op-listitem"><div><strong>' + label + '</strong></div>' +
        '<a href="' + href + '" class="btn btn-ghost" target="_blank" rel="noopener">Open folder ↗</a></li>').join('')
    : '<li class="op-listitem"><span class="field-hint">No documents yet.</span></li>';

  /* ---- Deeper CRM ---- */
  el('rdFirstTouch').innerHTML = kv(p.firstTouch);
  el('rdLifecycle').innerHTML = kv(p.lifecycle);

  /* ---- Create task ---- */
  const drawer = el('rdTaskDrawer');
  const backdrop = el('rdTaskBackdrop');
  const openTask = () => {
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    backdrop.hidden = false;
    document.body.style.overflow = 'hidden';
    el('rdTaskDesc').focus();
  };
  const closeTask = () => {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    backdrop.hidden = true;
    document.body.style.overflow = '';
  };
  el('rdNewTask').addEventListener('click', openTask);
  backdrop.addEventListener('click', closeTask);
  el('rdTaskClose').addEventListener('click', closeTask);
  el('rdTaskCancel').addEventListener('click', closeTask);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeTask();
  });
  el('rdTaskSave').addEventListener('click', () => {
    closeTask();
    const t = el('rdToast');
    t.textContent = 'Task created and added to My Work';
    t.hidden = false;
    t.classList.add('is-in');
    window.setTimeout(() => {
      t.classList.remove('is-in');
      window.setTimeout(() => (t.hidden = true), 300);
    }, 2400);
  });

  /* ---- WhatsApp number is the contact action, here too ---- */
  document.addEventListener('click', (e) => {
    const wa = e.target.closest('.rel-wa');
    if (!wa || !wa.dataset.wa) return;
    e.preventDefault();
    window.open('https://wa.me/' + wa.dataset.wa, '_blank', 'noopener');
  });
});

/* ============================================================
   Reporting, Marketing and Settings pages
   Built from the staging app, in the OMS theme, with the
   in-page section strip dropped as the client asked.
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  if (!page) return;

  /* ---------- small shared helpers ---------- */
  const el = (i) => document.getElementById(i);

  const toast = (id, msg) => {
    const t = el(id);
    if (!t) return;
    t.textContent = msg;
    t.hidden = false;
    t.classList.add('is-in');
    window.clearTimeout(t._t);
    t._t = window.setTimeout(() => {
      t.classList.remove('is-in');
      window.setTimeout(() => (t.hidden = true), 300);
    }, 2400);
  };

  // Tab groups: data-<key>tab on the buttons, panels named by id
  const tabs = (attr, panels) => {
    const btns = Array.from(document.querySelectorAll('[data-' + attr + ']'));
    if (!btns.length) return;
    btns.forEach((b) => b.addEventListener('click', () => {
      const key = b.dataset[attr.replace(/-([a-z])/g, (m, c) => c.toUpperCase())];
      btns.forEach((o) => {
        const on = o === b;
        o.classList.toggle('is-active', on);
        o.setAttribute('aria-selected', String(on));
      });
      Object.entries(panels).forEach(([k, id]) => {
        const p = el(id);
        if (p) p.hidden = k !== key;
      });
    }));
  };

  const drawer = (panelId, backdropId) => {
    const panel = el(panelId);
    const backdrop = el(backdropId);
    if (!panel) return null;
    const api = {
      open() {
        panel.classList.add('is-open');
        panel.setAttribute('aria-hidden', 'false');
        if (backdrop) backdrop.hidden = false;
        document.body.style.overflow = 'hidden';
      },
      close() {
        panel.classList.remove('is-open');
        panel.setAttribute('aria-hidden', 'true');
        if (backdrop) backdrop.hidden = true;
        document.body.style.overflow = '';
      }
    };
    if (backdrop) backdrop.addEventListener('click', api.close);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && panel.classList.contains('is-open')) api.close();
    });
    return api;
  };

  // Sortable table headers, shared by every list on these pages
  const sortable = (root, rows, render, initial) => {
    let key = initial;
    let dir = 1;
    root.querySelectorAll('.th-sort').forEach((th) => {
      th.addEventListener('click', () => {
        dir = key === th.dataset.sort ? -dir : 1;
        key = th.dataset.sort;
        root.querySelectorAll('.th-sort').forEach((o) => o.classList.remove('is-asc', 'is-desc'));
        th.classList.add(dir === 1 ? 'is-asc' : 'is-desc');
        render();
      });
    });
    return {
      apply(list) {
        return list.slice().sort((a, b) => {
          const x = a[key], y = b[key];
          const r = (typeof x === 'number' && typeof y === 'number')
            ? x - y
            : String(x).localeCompare(String(y));
          return r * dir;
        });
      }
    };
  };

  /* ================= Growth Dashboard ================= */
  if (page === 'reporting-growth') {
    const STAGES = [
      { key: 'acquisition', label: 'Acquisition' },
      { key: 'activation',  label: 'Activation' },
      { key: 'retention',   label: 'Retention' },
      { key: 'conversion',  label: 'Conversion' },
      { key: 'referral',    label: 'Referral' }
    ];

    // Each period returns its own numbers, so the filter visibly drives everything
    const DATA = {
      today:   { acquisition: [42, 51], activation: [6, 9], retention: [2, 1], conversion: [1, 0], referral: [0, 1] },
      week:    { acquisition: [318, 296], activation: [44, 39], retention: [11, 14], conversion: [4, 6], referral: [3, 2] },
      month:   { acquisition: [1284, 1109], activation: [172, 148], retention: [46, 52], conversion: [18, 21], referral: [9, 7] },
      quarter: { acquisition: [3760, 3402], activation: [498, 455], retention: [141, 138], conversion: [57, 61], referral: [24, 19] },
      year:    { acquisition: [14208, 11930], activation: [1874, 1602], retention: [520, 498], conversion: [212, 188], referral: [88, 61] },
      custom:  { acquisition: [0, 0], activation: [0, 0], retention: [0, 0], conversion: [0, 0], referral: [0, 0] }
    };

    const KPIS = [
      ['New Relationships', 'activation'], ['Property Enquiries', 'activation'],
      ['Saved Website Searches', 'activation'], ['Live Shortlists Created', 'activation'],
      ['Community Members', 'activation'], ['Newsletter Subscribers', 'activation'],
      ['Website Visitors', 'acquisition'], ['Organic Visitors', 'acquisition'],
      ['Returning Website Visitors', 'retention'], ['Repeat Enquiries', 'retention'],
      ['Rental Opportunities', 'conversion'], ['Rental Listings Won', 'conversion'],
      ['Rentals Closed', 'conversion'], ['Average Days to Lease', 'conversion'],
      ['Referred Enquiries', 'referral'], ['Co-broker Deals', 'referral']
    ];

    let period = (new URLSearchParams(location.search).get('period')) || 'month';
    if (!DATA[period]) period = 'month';

    const LABEL = { today: 'Today', week: 'This Week', month: 'This Month',
                    quarter: 'This Quarter', year: 'This Year', custom: 'a custom range' };

    const pct = (cur, prev) => {
      if (!prev) return cur ? '—' : '—';
      const v = ((cur - prev) / prev) * 100;
      return (v > 0 ? '+' : '') + v.toFixed(1) + '%';
    };
    const trend = (cur, prev) => (cur === prev ? 'Flat' : cur > prev ? 'Up' : 'Down');

    // A KPI's numbers derive from its stage, so card and row always agree
    const kpiNumbers = (stage, i) => {
      const [c, p] = DATA[period][stage];
      const share = 0.18 + ((i * 7) % 11) / 40;
      return [Math.round(c * share), Math.round(p * share)];
    };

    function renderFunnel() {
      el('growthFunnel').innerHTML = STAGES.map((s) => {
        const [cur, prev] = DATA[period][s.key];
        const t = trend(cur, prev);
        return '<article class="rp-card">' +
          '<header class="rp-card__head"><h2>' + s.label + '</h2>' +
            '<span class="rp-live">Live</span></header>' +
          '<dl class="rp-card__rows">' +
            '<div><dt>Current period</dt><dd>' + cur.toLocaleString('en-US') + '</dd></div>' +
            '<div><dt>Previous period</dt><dd>' + prev.toLocaleString('en-US') + '</dd></div>' +
            '<div><dt>% change</dt><dd class="rp-' + t.toLowerCase() + '">' + pct(cur, prev) + '</dd></div>' +
            '<div><dt>Trend</dt><dd class="rp-' + t.toLowerCase() + '">' + t + '</dd></div>' +
          '</dl></article>';
      }).join('');
    }

    let sorter;
    function renderKpis() {
      const rows = KPIS.map(([name, stage], i) => {
        const [current, previous] = kpiNumbers(stage, i);
        return { kpi: name, stage, current, previous,
                 change: previous ? ((current - previous) / previous) * 100 : 0,
                 trend: trend(current, previous) };
      });
      const list = sorter ? sorter.apply(rows) : rows;
      el('kpiBody').innerHTML = list.map((r) =>
        '<tr class="rp-kpirow"><td><strong>' + r.kpi + '</strong></td>' +
        '<td><span class="opp-chip opp-chip--stage">' + r.stage + '</span></td>' +
        '<td class="rp-num">' + r.current.toLocaleString('en-US') + '</td>' +
        '<td class="rp-num rp-muted">' + r.previous.toLocaleString('en-US') + '</td>' +
        '<td class="rp-num rp-' + r.trend.toLowerCase() + '">' + pct(r.current, r.previous) + '</td>' +
        '<td class="rp-' + r.trend.toLowerCase() + '">' + r.trend + '</td>' +
        '<td class="rp-muted">on read</td></tr>').join('');
      el('kpiEmpty').hidden = list.length !== 0;
    }

    sorter = sortable(document.querySelector('.rp-kpi'), null, renderKpis, 'kpi');

    function apply() {
      document.querySelectorAll('#growthPeriod .seg__btn').forEach((b) =>
        b.classList.toggle('is-active', b.dataset.period === period));
      el('growthPeriodNote').innerHTML = 'Showing <strong>' + LABEL[period] + '</strong> · the URL keeps your selection.';
      el('growthCustom').hidden = period !== 'custom';
      renderFunnel();
      renderKpis();
      try {
        history.replaceState(null, '', '?period=' + period);
      } catch (e) {}
    }

    document.querySelectorAll('#growthPeriod .seg__btn').forEach((b) =>
      b.addEventListener('click', () => {
        period = b.dataset.period;
        apply();
      }));

    apply();
  }

  /* ================= Community Dashboard ================= */
  if (page === 'reporting-community') {
    const COMMUNITIES = [
      { name: 'Banyan Ubud Rentals',      platform: 'WhatsApp', members: 1284, weekly: 52,  monthly: 214, snapshot: '2 Sep 2026' },
      { name: 'Bali Long Stay',           platform: 'Telegram', members: 968,  weekly: 41,  monthly: 168, snapshot: '2 Sep 2026' },
      { name: 'Ubud Villas & Land',       platform: 'Facebook', members: 742,  weekly: 18,  monthly: 96,  snapshot: '2 Sep 2026' },
      { name: 'Canggu Housing',           platform: 'WhatsApp', members: 611,  weekly: 27,  monthly: 88,  snapshot: '2 Sep 2026' },
      { name: 'Green School Families',    platform: 'WhatsApp', members: 438,  weekly: 12,  monthly: 51,  snapshot: '2 Sep 2026' },
      { name: 'Bali Property Investors',  platform: 'Telegram', members: 396,  weekly: 19,  monthly: 62,  snapshot: '2 Sep 2026' },
      { name: 'Uluwatu Rentals',          platform: 'Facebook', members: 214,  weekly: 8,   monthly: 33,  snapshot: '2 Sep 2026' },
      { name: 'Sanur Community',          platform: 'WhatsApp', members: 159,  weekly: 9,   monthly: 30,  snapshot: '2 Sep 2026' },
      { name: 'Bali Co-brokers',          platform: 'Telegram', members: 0,    weekly: 0,   monthly: 0,   snapshot: '' }
    ];

    let platform = 'all';
    let sorter;

    function render() {
      const rows = COMMUNITIES.filter((c) => platform === 'all' || c.platform === platform);
      const list = sorter ? sorter.apply(rows) : rows;
      el('cdBody').innerHTML = list.map((c) =>
        '<tr><td><strong>' + c.name + '</strong></td>' +
        '<td>' + c.platform + '</td>' +
        '<td class="rp-num">' + (c.snapshot ? c.members.toLocaleString('en-US') : '<span class="rp-muted">awaiting sync</span>') + '</td>' +
        '<td class="rp-num ' + (c.weekly ? 'rp-up' : 'rp-muted') + '">' + (c.snapshot ? (c.weekly ? '+' + c.weekly : '0') : '—') + '</td>' +
        '<td class="rp-num ' + (c.monthly ? 'rp-up' : 'rp-muted') + '">' + (c.snapshot ? (c.monthly ? '+' + c.monthly : '0') : '—') + '</td>' +
        '<td class="rp-muted">' + (c.snapshot || 'never') + '</td></tr>').join('');
      el('cdEmpty').hidden = list.length !== 0;
      el('cdCount').textContent = COMMUNITIES.length + ' configured · ' +
        COMMUNITIES.filter((c) => c.snapshot).length + ' with a snapshot';
    }

    sorter = sortable(document.querySelector('.data-table'), null, render, 'members');
    el('cdPlatform').addEventListener('change', (e) => {
      platform = e.target.value;
      render();
    });
    el('cdSync').addEventListener('click', () => {
      el('cdSyncState').textContent = 'Syncing…';
      window.setTimeout(() => (el('cdSyncState').textContent = 'Synced just now'), 1200);
    });
    render();
  }

  /* ================= Website Dashboard (PostHog) ================= */
  if (page === 'reporting-website') {
    const KEY = 'banyan_posthog_url';
    let url = '';
    try {
      url = localStorage.getItem(KEY) || '';
    } catch (e) {}

    const paint = () => {
      const on = !!url;
      el('wdEmbed').hidden = !on;
      el('wdEmpty').hidden = on;
      el('wdUrlLabel').textContent = url || '—';
      el('wdOpenPosthog').href = url || '#';
      el('wdConfigure').textContent = on ? 'Change connection' : 'Configure';
      if (on) el('wdShared').value = url;
    };

    el('wdSave').addEventListener('click', () => {
      const v = el('wdShared').value.trim();
      if (!v) {
        el('wdShared').focus();
        return;
      }
      url = v;
      try {
        localStorage.setItem(KEY, url);
      } catch (e) {}
      paint();
    });

    el('wdConfigure').addEventListener('click', () => {
      el('wdEmpty').hidden = false;
      el('wdShared').focus();
    });

    paint();
  }

  /* ================= Scouts ================= */
  if (page === 'marketing-scouts') {
    tabs('sctab', { campaigns: 'scCampaigns', quarantine: 'scQuarantine', groups: 'scGroups' });

    const GROUPS = [
      { name: 'Bali Property Agents', platform: 'WhatsApp', members: 892, messages: 214, status: 'Active' },
      { name: 'Ubud Villas For Rent', platform: 'WhatsApp', members: 654, messages: 168, status: 'Active' },
      { name: 'Bali Land & Villa Deals', platform: 'Telegram', members: 1204, messages: 96, status: 'Active' },
      { name: 'Canggu Rentals Network', platform: 'Facebook', members: 431, messages: 42, status: 'Paused' },
      { name: 'Bali Co-broker Exchange', platform: 'Telegram', members: 318, messages: 61, status: 'Active' }
    ];

    const CAMPAIGNS = [
      { name: 'Rental Listings', category: 'Rental Listing', review: 2, paused: false,
        stats: { listened: 214, relevant: 96, into: 31, qualified: 12 } },
      { name: 'Rental Leads', category: 'Rental Lead', review: 0, paused: false,
        stats: { listened: 168, relevant: 71, into: 24, qualified: 9 } },
      { name: 'Sale Listings', category: 'Sale Listing', review: 1, paused: false,
        stats: { listened: 96, relevant: 38, into: 14, qualified: 4 } },
      { name: 'Buyer Leads', category: 'Buyer Lead', review: 0, paused: true,
        stats: { listened: 0, relevant: 0, into: 0, qualified: 0 } }
    ];

    const QUARANTINE = [
      { msg: 'Villa for rent Ubud 3BR call me 0812…', reasons: ['Duplicate', 'No price'], platform: 'WhatsApp', at: '2 Sep, 09:14' },
      { msg: 'URGENT!!! best deal land seminyak DM fast', reasons: ['Spam signals'], platform: 'Telegram', at: '2 Sep, 08:40' },
      { msg: 'Anyone know a good notary in Denpasar?', reasons: ['Off topic'], platform: 'WhatsApp', at: '1 Sep, 17:22' }
    ];

    const pctOf = (n, total) => (total ? Math.round((n / total) * 100) : 0) + '%';

    function renderCampaigns() {
      el('scCampaignList').innerHTML = CAMPAIGNS.map((c, i) => {
        const s = c.stats;
        return '<article class="sc-card' + (c.paused ? ' is-paused' : '') + '" data-camp="' + i + '">' +
          '<header class="sc-card__head">' +
            '<div><h2 class="sc-card__name">' + c.name + '</h2>' +
              '<span class="opp-chip opp-chip--stage">' + c.category + '</span></div>' +
            '<span class="sc-state">' + (c.paused ? 'Paused' : 'Listening') + '</span>' +
          '</header>' +

          '<div class="sc-review">' +
            '<div><span class="sc-review__num' + (c.review ? ' is-waiting' : '') + '">' + c.review + '</span>' +
              '<span class="sc-review__label">waiting for review</span></div>' +
            (c.review
              ? '<a href="opportunities.html" class="btn btn-primary">Review items →</a>'
              : '<span class="field-hint">Nothing to review</span>') +
          '</div>' +

          '<div class="sc-stats">' +
            '<p class="sc-stats__title">Last 24h · all monitored groups</p>' +
            '<dl class="sc-stats__rows">' +
              '<div><dt>Messages listened</dt><dd>' + s.listened + '</dd></div>' +
              '<div><dt>Relevant (passed Guard)</dt><dd>' + s.relevant + ' <span class="rp-muted">' + pctOf(s.relevant, s.listened) + '</span></dd></div>' +
              '<div><dt>Into ' + c.category + '</dt><dd>' + s.into + ' <span class="rp-muted">' + pctOf(s.into, s.listened) + '</span></dd></div>' +
              '<div><dt>Qualified to Opportunity / Listing</dt><dd>' + s.qualified + ' <span class="rp-muted">' + pctOf(s.qualified, s.listened) + '</span></dd></div>' +
            '</dl>' +
          '</div>' +

          '<footer class="sc-card__foot">' +
            '<span class="field-hint">Real-time · 5 fields</span>' +
            '<div class="sc-card__actions">' +
              '<button type="button" class="btn btn-ghost sc-settings">Edit settings</button>' +
              '<button type="button" class="btn btn-ghost sc-pause">' + (c.paused ? 'Resume' : 'Pause') + '</button>' +
            '</div>' +
          '</footer>' +
        '</article>';
      }).join('');
    }

    el('scCampaignList').addEventListener('click', (e) => {
      const card = e.target.closest('.sc-card');
      if (!card) return;
      const c = CAMPAIGNS[Number(card.dataset.camp)];
      if (e.target.closest('.sc-pause')) {
        c.paused = !c.paused;
        renderCampaigns();
        toast('scToast', c.name + (c.paused ? ' paused' : ' resumed'));
      }
      if (e.target.closest('.sc-settings')) toast('scToast', 'Campaign settings open in the real OMS');
    });

    let qPlatform = 'all';
    function renderQuarantine() {
      const rows = QUARANTINE.filter((q) => qPlatform === 'all' || q.platform === qPlatform);
      el('scQBody').innerHTML = rows.map((q, i) =>
        '<tr><td class="sc-msg">' + q.msg + '</td>' +
        '<td>' + q.reasons.map((r) => '<span class="sb-tag">' + r + '</span>').join(' ') + '</td>' +
        '<td>' + q.platform + '</td>' +
        '<td class="rp-muted">' + q.at + '</td>' +
        '<td class="sc-qactions"><button type="button" class="btn btn-ghost" data-q="release" data-i="' + i + '">Release</button>' +
        '<button type="button" class="btn btn-ghost" data-q="discard" data-i="' + i + '">Discard</button></td></tr>').join('');
      el('scQEmpty').hidden = rows.length !== 0;
      el('scQCount').textContent = String(QUARANTINE.length);
    }

    el('scQBody').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-q]');
      if (!btn) return;
      const i = Number(btn.dataset.i);
      const name = QUARANTINE[i].msg.slice(0, 28) + '…';
      QUARANTINE.splice(i, 1);
      renderQuarantine();
      toast('scToast', btn.dataset.q === 'release' ? 'Released for review — ' + name : 'Discarded — ' + name);
    });
    el('scQPlatform').addEventListener('change', (e) => {
      qPlatform = e.target.value;
      renderQuarantine();
    });

    let gSorter;
    function renderGroups() {
      const list = gSorter ? gSorter.apply(GROUPS) : GROUPS;
      el('scGBody').innerHTML = list.map((g, i) =>
        '<tr><td><strong>' + g.name + '</strong></td>' +
        '<td>' + g.platform + '</td>' +
        '<td class="rp-num">' + g.members.toLocaleString('en-US') + '</td>' +
        '<td class="rp-num">' + g.messages + '</td>' +
        '<td><span class="status-pill"><span class="action-dot action-dot--' +
          (g.status === 'Active' ? 'green' : 'none') + '"></span>' + g.status + '</span></td>' +
        '<td><button type="button" class="btn btn-ghost sc-gtoggle" data-g="' + i + '">' +
          (g.status === 'Active' ? 'Pause' : 'Resume') + '</button></td></tr>').join('');
      el('scGEmpty').hidden = list.length !== 0;
    }
    gSorter = sortable(el('scGroups'), null, renderGroups, 'name');
    el('scGBody').addEventListener('click', (e) => {
      const btn = e.target.closest('.sc-gtoggle');
      if (!btn) return;
      const g = GROUPS[Number(btn.dataset.g)];
      g.status = g.status === 'Active' ? 'Paused' : 'Active';
      renderGroups();
    });

    // Create campaign
    const d = drawer('scDrawer', 'scBackdrop');
    el('scGroupPick').innerHTML = GROUPS.map((g) =>
      '<label class="tag-check"><input type="checkbox" checked><span>' + g.name + '</span></label>').join('');
    el('scNewCampaign').addEventListener('click', () => {
      d.open();
      el('scName').focus();
    });
    el('scClose').addEventListener('click', d.close);
    el('scCancel').addEventListener('click', d.close);
    el('scSave').addEventListener('click', () => {
      const name = el('scName').value.trim();
      if (!name) {
        el('scName').focus();
        return;
      }
      CAMPAIGNS.unshift({ name, category: el('scCategory').value, review: 0, paused: false,
                          stats: { listened: 0, relevant: 0, into: 0, qualified: 0 } });
      el('scName').value = '';
      renderCampaigns();
      d.close();
      toast('scToast', 'Campaign created — listening starts on the next sync');
    });

    renderCampaigns();
    renderQuarantine();
    renderGroups();
  }

  /* ================= Publishers ================= */
  if (page === 'marketing-publishers') {
    tabs('pbtab', { campaigns: 'pbCampaigns', channels: 'pbChannels' });

    const CHANNELS = [
      { type: 'Facebook Page', mech: 'Graph API', label: 'Banyan Bali — main page', status: 'Connected' },
      { type: 'Instagram', mech: 'Graph API', label: '@banyan.properties', status: 'Connected' },
      { type: 'WhatsApp Groups', mech: 'VPS session', label: 'Agent broadcast', status: 'Needs re-auth' },
      { type: 'Telegram', mech: 'VPS session', label: 'Bali Property Investors', status: 'Connected' },
      { type: 'Facebook Groups', mech: 'VPS session', label: 'Ubud Villas & Land', status: 'Disconnected' }
    ];

    const CAMPAIGNS = [
      { name: 'September rice-field villas', bucket: 'Rentals — Ubud', week: 3, listing: 'BUY-1301 · Spacious Luxury Villa', channels: 4, status: 'Sending' },
      { name: 'Green School family homes', bucket: 'Rentals — Sibang', week: 3, listing: 'BUY-1186 · Brand New 2BR Villa', channels: 3, status: 'Scheduled' },
      { name: 'Freehold land — Petulu', bucket: 'Land', week: 4, listing: 'LAND-1280 · 12.25 Are Freehold', channels: 2, status: 'Scheduled' },
      { name: 'Uluwatu ocean views', bucket: 'Sales — Bukit', week: 2, listing: 'BUY-1195 · 1BR Rooftop Ocean Views', channels: 5, status: 'Sent' },
      { name: 'August long-stay push', bucket: 'Rentals — Ubud', week: 1, listing: '', channels: 4, status: 'Sent' },
      { name: 'Commercial — Canggu', bucket: 'Commercial', week: '', listing: '', channels: 0, status: 'Draft' }
    ];

    const state = { q: '', status: 'all' };
    let sorter;

    const statusClass = (s) => ({
      Sending: 'amber', Scheduled: 'blue', Sent: 'green', Draft: 'none'
    })[s] || 'none';

    function renderCampaigns() {
      const rows = CAMPAIGNS.filter((c) => {
        if (state.status !== 'all' && c.status !== state.status) return false;
        if (state.q && !(c.name + ' ' + c.bucket).toLowerCase().includes(state.q)) return false;
        return true;
      });
      const list = sorter ? sorter.apply(rows) : rows;
      el('pbBody').innerHTML = list.map((c) =>
        '<tr><td><strong>' + c.name + '</strong></td>' +
        '<td>' + c.bucket + '</td>' +
        '<td class="rp-num">' + (c.week || '<span class="rp-muted">—</span>') + '</td>' +
        '<td>' + (c.listing || '<span class="rp-muted">—</span>') + '</td>' +
        '<td class="rp-num">' + c.channels + '</td>' +
        '<td><span class="status-pill"><span class="action-dot action-dot--' + statusClass(c.status) + '"></span>' + c.status + '</span></td>' +
        '<td><button type="button" class="icon-action" aria-label="Edit campaign">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>' +
        '</button></td></tr>').join('');
      el('pbEmpty').hidden = list.length !== 0;
    }

    function renderChannels() {
      el('pbChBody').innerHTML = CHANNELS.map((c, i) =>
        '<tr><td><strong>' + c.type + '</strong></td>' +
        '<td>' + c.mech + '</td>' +
        '<td class="rp-muted">' + c.label + '</td>' +
        '<td><span class="status-pill"><span class="action-dot action-dot--' +
          (c.status === 'Connected' ? 'green' : c.status === 'Needs re-auth' ? 'orange' : 'red') +
          '"></span>' + c.status + '</span></td>' +
        '<td>' + (c.status === 'Connected'
          ? '<span class="rp-muted">Not needed</span>'
          : '<button type="button" class="btn btn-ghost pb-reauth" data-c="' + i + '">Re-authenticate</button>') +
        '</td></tr>').join('');
      el('pbChEmpty').hidden = CHANNELS.length !== 0;
    }

    el('pbChBody').addEventListener('click', (e) => {
      const btn = e.target.closest('.pb-reauth');
      if (!btn) return;
      CHANNELS[Number(btn.dataset.c)].status = 'Connected';
      renderChannels();
      toast('pbToast', 'Channel reconnected');
    });

    sorter = sortable(el('pbCampaigns'), null, renderCampaigns, 'name');

    el('pbSearch').addEventListener('input', (e) => {
      state.q = e.target.value.trim().toLowerCase();
      renderCampaigns();
    });
    document.querySelectorAll('[data-pbstatus]').forEach((t) =>
      t.addEventListener('click', () => {
        state.status = t.dataset.pbstatus;
        document.querySelectorAll('[data-pbstatus]').forEach((o) =>
          o.classList.toggle('is-active', o.dataset.pbstatus === state.status));
        renderCampaigns();
      }));

    // The one button changes meaning with the tab
    const d = drawer('pbDrawer', 'pbBackdrop');
    let mode = 'campaign';
    document.querySelectorAll('[data-pbtab]').forEach((b) =>
      b.addEventListener('click', () => {
        mode = b.dataset.pbtab === 'channels' ? 'channel' : 'campaign';
        el('pbNewLabel').textContent = mode === 'channel' ? 'Add channel' : 'Create campaign';
      }));

    // Staging offers every listing here; these are real entries from the portfolio
    const LISTINGS = [
      'BUY-1301 · Spacious Luxury Villa with Separate Guest House in Singakerta',
      'BUY-1241 · 1 Bedroom exclusive Villa',
      'BUY-1212 · 2 Bedroom Off Plan Boutique Villa in Sayan',
      'BUY-1186 · Brand New 2 Bedroom Villa in Singakerta',
      'BUY-1192 · 1 Bedroom Modern Tropical Villa in Bingin',
      'BUY-1193 · 2 Bedroom Modern Tropical Villa in Bingin (off plan)',
      'BUY-1199 · 2 Bedroom Villa Next to Nyang Nyang Beach',
      'BUY-1221 · 3 Bedroom Ubud River Escape near Nyuh Kuning',
      'BUY-1229 · 2 Story Villa in Nyuh Kuning with 6 Years Lease',
      'BUY-1237 · 2 bedrooms sanctuary in Pejeng',
      'LAND-1252 · 4 Are Singakerta — 4 are land in central Singakerta',
      'LAND-1259 · 18 are Yellow Zone Land in Sayan',
      'LAND-1261 · 24.5 Are Pink Zone Land in Sayan'
    ];
    const listingSel = el('pbListing');
    listingSel.appendChild(new Option('—', ''));
    LISTINGS.forEach((l) => listingSel.appendChild(new Option(l, l)));

    const CHANNEL_TYPES = ['Facebook Page', 'Instagram', 'Telegram', 'WhatsApp Groups', 'Facebook Groups', 'TikTok'];
    el('pbChannelPick').innerHTML = CHANNEL_TYPES.map((t) =>
      '<label class="tag-check"><input type="checkbox"><span>' + t + '</span></label>').join('');

    el('pbNew').addEventListener('click', () => {
      const isCh = mode === 'channel';
      el('pbDrawerTitle').textContent = isCh ? 'Add channel' : 'Create campaign';
      el('pbFormCampaign').hidden = isCh;
      el('pbFormChannel').hidden = !isCh;
      d.open();
    });
    el('pbClose').addEventListener('click', d.close);
    el('pbCancel').addEventListener('click', d.close);
    el('pbSave').addEventListener('click', () => {
      if (mode === 'channel') {
        CHANNELS.unshift({ type: el('pbChType').value, mech: el('pbChMech').value,
                           label: el('pbChLabel').value.trim() || '—',
                           status: el('pbChMech').value === 'Graph API' ? 'Connected' : 'Needs re-auth' });
        el('pbChLabel').value = '';
        renderChannels();
        toast('pbToast', 'Channel added');
      } else {
        const name = el('pbName').value.trim();
        if (!name) {
          el('pbName').focus();
          return;
        }
        CAMPAIGNS.unshift({ name, bucket: el('pbBucket').value.trim() || '—',
                            week: el('pbWeek').value, listing: el('pbListing').value.trim(),
                            channels: 0, status: 'Draft' });
        el('pbName').value = '';
        el('pbBucket').value = '';
        el('pbListing').value = '';
        renderCampaigns();
        toast('pbToast', 'Campaign created as a draft');
      }
      d.close();
    });

    renderCampaigns();
    renderChannels();
  }

  /* ================= Blog ================= */
  if (page === 'marketing-blog') {
    let blogSeq = 240;
    const ARTICLES = [
      { id: 'BLOG-0231', featured: true,  title: 'What a long-term rental in Ubud actually costs in 2026', category: 'Renting guide', author: 'Ratna', status: 'Published', date: '2026-08-28' },
      { id: 'BLOG-0230', featured: true,  title: 'Leasehold vs freehold: what foreigners can really buy', category: 'Buying guide', author: 'Andries', status: 'Published', date: '2026-08-21' },
      { id: 'BLOG-0229', featured: false, title: 'Living near Green School — the honest version', category: 'Living in Bali', author: 'Berry', status: 'Published', date: '2026-08-14' },
      { id: 'BLOG-0228', featured: true,  title: 'Ubud market update — Q3 2026', category: 'Market update', author: 'Andries', status: 'Published', date: '2026-08-02' },
      { id: 'BLOG-0227', featured: false, title: 'Five villages worth considering instead of central Ubud', category: 'Living in Bali', author: 'Ratna', status: 'Scheduled', date: '2026-09-08' },
      { id: 'BLOG-0226', featured: false, title: 'How our shortlists work', category: 'Renting guide', author: 'Berry', status: 'Scheduled', date: '2026-09-15' },
      { id: 'BLOG-0225', featured: false, title: 'Zoning explained without the jargon', category: 'Buying guide', author: 'Andries', status: 'In review', date: '2026-09-01' },
      { id: 'BLOG-0224', featured: false, title: 'What a good notary does for you', category: 'Buying guide', author: 'Kashif', status: 'In review', date: '2026-08-30' },
      { id: 'BLOG-0223', featured: false, title: 'Bringing pets to Bali', category: 'Living in Bali', author: 'Ratna', status: 'Draft', date: '2026-08-27' },
      { id: 'BLOG-0222', featured: false, title: 'The Banyan community groups', category: 'Community', author: 'Berry', status: 'Draft', date: '2026-08-19' },
      { id: 'BLOG-0221', featured: false, title: 'Wet season and what it means for your villa', category: 'Living in Bali', author: 'Kashif', status: 'Draft', date: '2026-08-11' },
      { id: 'BLOG-0220', featured: false, title: 'Rice field views: which ones are protected', category: 'Market update', author: 'Andries', status: 'Draft', date: '2026-07-29' }
    ];

    const state = { q: '', status: 'all', category: 'all', author: 'all' };
    let sorter;

    const cls = (s) => ({ Published: 'green', Scheduled: 'blue', 'In review': 'amber', Draft: 'none' })[s] || 'none';

    function render() {
      const rows = ARTICLES.filter((a) => {
        if (state.status !== 'all' && a.status !== state.status) return false;
        if (state.category !== 'all' && a.category !== state.category) return false;
        if (state.author !== 'all' && a.author !== state.author) return false;
        if (state.q && !(a.title + ' ' + a.author).toLowerCase().includes(state.q)) return false;
        return true;
      });
      const list = sorter ? sorter.apply(rows) : rows;
      el('blBody').innerHTML = list.map((a, i) =>
        '<tr><td><code class="ws-slug">' + a.id + '</code></td>' +
        '<td><strong>' + a.title + '</strong></td>' +
        '<td>' + a.category + '</td>' +
        '<td>' + a.author + '</td>' +
        '<td><span class="status-pill"><span class="action-dot action-dot--' + cls(a.status) + '"></span>' + a.status + '</span></td>' +
        '<td><button type="button" class="bl-star' + (a.featured ? ' is-on' : '') + '" data-bl="' + a.id + '" aria-pressed="' + a.featured + '" aria-label="Feature this article">' +
          (a.featured ? '★' : '☆') + '</button></td>' +
        '<td class="rp-muted">' + new Date(a.date + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + '</td>' +
        '<td><button type="button" class="icon-action" aria-label="Edit article">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>' +
        '</button></td></tr>').join('');
      el('blEmpty').hidden = list.length !== 0;
    }

    sorter = sortable(document.querySelector('.data-table'), null, render, 'date');

    el('blSearch').addEventListener('input', (e) => {
      state.q = e.target.value.trim().toLowerCase();
      render();
    });
    ['blCategory', 'blAuthor'].forEach((id) =>
      el(id).addEventListener('change', (e) => {
        state[id === 'blCategory' ? 'category' : 'author'] = e.target.value;
        render();
      }));
    document.querySelectorAll('[data-blstatus]').forEach((t) =>
      t.addEventListener('click', () => {
        state.status = t.dataset.blstatus;
        document.querySelectorAll('[data-blstatus]').forEach((o) =>
          o.classList.toggle('is-active', o.dataset.blstatus === state.status));
        render();
      }));
    el('blBody').addEventListener('click', (e) => {
      const star = e.target.closest('.bl-star');
      if (!star) return;
      const a = ARTICLES.find((x) => x.id === star.dataset.bl);
      a.featured = !a.featured;
      render();
    });

    el('blNew').addEventListener('click', () => {
      ARTICLES.unshift({ id: 'BLOG-0' + (++blogSeq), featured: false, title: 'Untitled article',
                         category: 'Living in Bali', author: 'Ratna',
                         status: 'Draft', date: '2026-09-02' });
      state.status = 'all';
      document.querySelectorAll('[data-blstatus]').forEach((o) =>
        o.classList.toggle('is-active', o.dataset.blstatus === 'all'));
      render();
    });

    render();
  }

  /* ================= Website Settings ================= */
  if (page === 'website-settings') {
    tabs('wstab', { navigation: 'wsNavigation', content: 'wsContent', seo: 'wsSeo' });

    /* --- Navigation ---
       These are the public website's menu and filter pages, not the OMS nav:
       every row is a real URL on banyan.properties. Staging holds 299 of them;
       this is a representative sample of the same shapes. */
    const AREAS = {
      Ubud: ['Penestanan & Sayan', 'Nyuh Kuning', 'Titi Batu Area', 'Mas', 'Pengosekan', 'Tegallalang'],
      Bukit: ['Bingin', 'Padang Padang', 'Pecatu', 'Balangan'],
      'Central Bali': ['Abiansemal', 'Sibang', 'Pejeng'],
      'Nusa & Gili Islands': ['Nusa Penida', 'Nusa Lembongan', 'Gili Air, Meno & Trawangan'],
      'Tanah Lot – Canggu': ['Berawa', 'Pererenan', 'Umalas']
    };
    const FEATURES = [
      'Any', 'Banyan Selection', 'Newly Listed', 'Hot Deal', 'Luxury',
      'Family Friendly', 'Large Garden', 'Large Pool', 'Managed Property',
      '10min from Green School', '10min from Yoga Barn', '10min from Ubud Palace',
      '25min from Green School'
    ];
    const TENURE = ['Freehold', 'Leasehold', 'Long Lease Above 40 Years', 'Off Plan', 'Orange Zone'];
    const slugify = (t) => t.toLowerCase()
      .replace(/&/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    const NAVITEMS = [];
    ['Buy', 'Rent', 'Land', 'Commercial'].forEach((cat) => {
      const base = '/' + cat.toLowerCase();
      NAVITEMS.push({ category: cat, type: 'Landing', primary: cat, secondary: '—', slug: base, sort: 1 });
      [1, 2, 3, 4, 5].forEach((n) => NAVITEMS.push({
        category: cat, type: 'Filter', primary: 'Bedrooms', secondary: String(n),
        slug: base + '/bedrooms/' + n, sort: n
      }));
      FEATURES.forEach((f, i) => NAVITEMS.push({
        category: cat, type: 'Filter', primary: f, secondary: '—',
        slug: base + '/' + slugify(f), sort: i + 1
      }));
      if (cat === 'Buy' || cat === 'Land') TENURE.forEach((t, i) => NAVITEMS.push({
        category: cat, type: 'Filter', primary: t, secondary: '—',
        slug: base + '/' + slugify(t), sort: i + 1
      }));
      Object.entries(AREAS).forEach(([area, subs], ai) => {
        NAVITEMS.push({ category: cat, type: 'Area', primary: area, secondary: '—',
                        slug: base + '/' + slugify(area), sort: ai + 1 });
        subs.forEach((sub, si) => NAVITEMS.push({
          category: cat, type: 'Area', primary: area, secondary: sub,
          slug: base + '/' + slugify(area) + '/' + slugify(sub),
          sort: Number((ai + 1) + '.' + (si + 1))
        }));
      });
    });
    [['Top Main Nav', 'Buy', '/buy', 1], ['Top Main Nav', 'Rent', '/rent', 2],
     ['Top Main Nav', 'Land', '/land', 3], ['Top Main Nav', 'Commercial', '/commercial', 4],
     ['Top Left Nav', 'Advanced Search', '/advanced-search', 1],
     ['Top Right Nav', 'Bali Guides', '/bali-guides', 1],
     ['Top Right Nav', 'About', '/about-banyan-properties', 2],
     ['Footer', 'Relocate to Bali', '/bali-guides/relocate-to-bali', 1],
     ['Footer', "Buyer's Advisory", '/bali-guides/buyers-advisory', 2],
     ['Footer', 'About Banyan', '/about-banyan-properties', 3]
    ].forEach(([cat, label, slug, sort]) => NAVITEMS.push({
      category: cat, type: 'Page', primary: label, secondary: '—', slug, sort
    }));

    const navState = { q: '', category: 'all' };
    let navSorter;

    function renderNav() {
      const rows = NAVITEMS.filter((n) => {
        if (navState.category !== 'all' && n.category !== navState.category) return false;
        if (navState.q && !(n.primary + ' ' + n.secondary + ' ' + n.slug).toLowerCase().includes(navState.q)) return false;
        return true;
      });
      const list = navSorter ? navSorter.apply(rows) : rows;
      el('wsNavBody').innerHTML = list.map((n) =>
        '<tr><td>' + n.category + '</td><td>' + n.type + '</td>' +
        '<td><strong>' + n.primary + '</strong></td><td>' + n.secondary + '</td>' +
        '<td><code class="ws-slug">' + n.slug + '</code></td>' +
        '<td class="rp-num">' + n.sort + '</td>' +
        '<td><button type="button" class="icon-action" aria-label="Edit nav item">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>' +
        '</button></td></tr>').join('');
      el('wsNavEmpty').hidden = list.length !== 0;
      el('wsNavCount').textContent = String(list.length);
    }

    navSorter = sortable(el('wsNavigation'), null, renderNav, 'primary');
    el('wsNavSearch').addEventListener('input', (e) => {
      navState.q = e.target.value.trim().toLowerCase();
      renderNav();
    });
    el('wsNavCategory').addEventListener('change', (e) => {
      navState.category = e.target.value;
      renderNav();
    });
    el('wsNavAdd').addEventListener('click', () => {
      NAVITEMS.unshift({ category: 'Top Main Nav', type: 'Page', primary: 'New item',
                         secondary: '—', slug: '/new-item', sort: 0 });
      renderNav();
      toast('wsToast', 'Nav item added — edit it to finish');
    });

    /* --- Site content: price sliders --- */
    const SLIDERS = [
      ['Rent — Ubud (IDR/year)', '10,000,000', '500,000,000'],
      ['Rent — Canggu (IDR/year)', '15,000,000', '800,000,000'],
      ['Buy — Villa (USD)', '90,000', '3,500,000'],
      ['Buy — Land (IDR/are)', '150,000,000', '2,500,000,000'],
      ['Commercial (IDR/year)', '50,000,000', '1,200,000,000'],
      ['Bedrooms', '1', '8']
    ];
    el('wsSliders').innerHTML = SLIDERS.map(([label, min, max]) =>
      '<div class="ws-slider"><span class="ws-slider__label">' + label + '</span>' +
      '<label class="field"><span class="field__label">Min</span><input type="text" class="input-field" value="' + min + '"></label>' +
      '<label class="field"><span class="field__label">Max</span><input type="text" class="input-field" value="' + max + '"></label></div>').join('');

    /* --- Site content: text blocks, grouped by the page they appear on.
       Keys mirror the staging Site Content tab so the wiring is one-to-one. --- */
    const SERVICES = ['Villas for Rent', 'Villas for Sale', 'Lands for Sale',
                      'Commercial for Sale', 'Real Estate Advisory', 'Management'];
    const REGIONS = ['Ubud', 'the Canggu, Kuta, Tanah Lot corridor', 'the Bukit area (Uluwatu, Nusa Dua, Jimbaran)',
                     'Sanur', 'Central Bali (Kintamani, Bedugul, Munduk, Jatiluwih)',
                     'East Bali (Amed, Candidasa, Sidemen)', 'North Bali (Lovina, Pemuteran, Singaraja)',
                     'West Bali (Medewi, Balian, Pekutatan)', 'Denpasar & Reno',
                     'the Nusa Islands (Lembongan, Ceningan, Penida)'];

    const TEXT = {
      'Homepage': [
        ['Hero | Title', 'Villas in Bali, handled by people who live here'],
        ['Hero | Subtitle', 'Long-term rentals and property sales across Ubud and beyond.'],
        ['Link to Marketplace Button | Button', 'Browse properties']
      ],
      'Homepage Section 2': [
        ['Properties Listed | Small cap description', '400+ properties listed'],
        ['Happy Clients | Small cap description', '1,200+ happy clients'],
        ['Years in Bali | Small cap description', '8 years in Bali'],
        ['Languages Spoken | Small cap description', '5 languages spoken'],
        ['Contact Us Button | Button', 'Talk to us'],
        ['Link to Marketplace Button | Button', 'See what is available']
      ],
      'Homepage Section 3 — Our Services': SERVICES.reduce((acc, sv) => {
        acc.push(['Our Services ' + sv + ' | Title', sv]);
        acc.push(['Our Services ' + sv + ' | Description',
                  'What we do for ' + sv.toLowerCase() + ', in plain terms.']);
        return acc;
      }, []),
      'Homepage Section 4 — Latest Blogs': [
        ['Latest Blogs | Title', 'From the blog'],
        ['Latest Blogs | Description', 'What we have learned living and working here.'],
        ['Explore other articles | Button', 'Read the blog']
      ],
      'About Us': [
        ['Top section | Small cap description', 'Who we are'],
        ['About Banyan | Title', 'About Banyan'],
        ['About Banyan | Description', 'Villa rentals and property sales in Ubud, Bali.'],
        ['Body | Long text with paragraphs',
         'We have been finding homes in Bali since 2018 — first for friends, then for everyone they sent our way.'],
        ['Contact us | Long text with paragraphs',
         'Come and see us in Nyuh Kuning, or send a message. We answer.'],
        ['Contact Us Button | Button', 'Get in touch']
      ],
      'Marketplace — Why choose': REGIONS.map((r) =>
        ['Why choose ' + r + '?', 'What makes ' + r.replace(/^the /, '') + ' worth considering.']),
      'Footer': [
        ['About Banyan | Title', 'Banyan Properties'],
        ['About Banyan | Description', 'Villa rentals and property sales in Ubud, Bali.'],
        ['Explore other articles | Button', 'Read the blog']
      ]
    };

    function renderText(filter) {
      const q = (filter || '').toLowerCase();
      let any = false;
      el('wsTextGroups').innerHTML = Object.entries(TEXT).map(([group, rows]) => {
        const shown = rows.filter(([k, v]) => !q || (k + ' ' + v).toLowerCase().includes(q));
        if (!shown.length) return '';
        any = true;
        return '<section class="ws-textgroup"><h3 class="sb-h4">' + group + '</h3>' +
          shown.map(([k, v]) =>
            '<label class="field"><span class="field__label">' + k + '</span>' +
            (v.length > 60
              ? '<textarea class="input-field input-field--area" rows="2">' + v + '</textarea>'
              : '<input type="text" class="input-field" value="' + v.replace(/"/g, '&quot;') + '">') +
            '</label>').join('') +
          '</section>';
      }).join('');
      el('wsTextEmpty').hidden = any;
    }

    el('wsTextSearch').addEventListener('input', (e) => renderText(e.target.value.trim()));

    ['wsSaveSliders', 'wsSaveText', 'wsSaveSeo'].forEach((id) =>
      el(id).addEventListener('click', () => toast('wsToast', 'Saved')));

    /* --- Site content: website images (read-only reference, as in staging) --- */
    const IMG_BASE = 'https://banyan-images.morning-truth-a68a.workers.dev';
    const IMAGES = [
      ['All Listing Images', 'Banyan image watermark', IMG_BASE + '/drive/1qex9xSpyVYK629fiskPFGSNCvIcS7kH9?sz=w1200'],
      ['Header/Footer', 'Banyan Properties logo', IMG_BASE + '/drive/1jOc7Sqn6IZP7U-OTeqL4dEVxZRkZxANB?sz=w1200'],
      ['Homepage', 'Main cover video 1 — Balinese farmer walking in rice field', IMG_BASE + '/static/videos/1OepxWoRccWKB-I72cASAhmBAHAR0UrpV.mp4'],
      ['Homepage', 'Main cover video 2 — Villa pool at sunrise', IMG_BASE + '/static/videos/2Kpr8YkTccWKB-I72cASAhmBAHAR0Urqk.mp4'],
      ['Homepage', 'Section 2 background', IMG_BASE + '/drive/1Bq7XsPvYK629fiskPFGSNCvIcS7kH9a?sz=w1600'],
      ['Our Services', 'Villas for Rent card', IMG_BASE + '/drive/1Cd8YtQwZL730gjtlQGHTOdWJdT8lI0b?sz=w1200'],
      ['Our Services', 'Villas for Sale card', IMG_BASE + '/drive/1De9ZuRxAM841hkumRHIUPeXKeU9mJ1c?sz=w1200'],
      ['Our Services', 'Lands for Sale card', IMG_BASE + '/drive/1EfA0vSyBN952iluvSIJVQfYLfV0nK2d?sz=w1200'],
      ['About Us', 'Team photo', IMG_BASE + '/drive/1FgB1wTzCO063jmvwTJKWRgZMgW1oL3e?sz=w1600'],
      ['Marketplace', 'Ubud region cover', IMG_BASE + '/drive/1GhC2xU0DP174knwxUKLXShANhX2pM4f?sz=w1200']
    ];
    el('wsImgBody').innerHTML = IMAGES.map(([section, label, url]) =>
      '<tr><td>' + section + '</td><td><strong>' + label + '</strong></td>' +
      '<td><a href="' + url + '" target="_blank" rel="noopener" class="ws-slug ws-imgurl">' + url + '</a></td></tr>').join('');
    el('wsImgCount').textContent = String(IMAGES.length);

    renderNav();
    renderText('');
  }

  /* ================= User Management ================= */
  if (page === 'settings-users') {
    const HUBS = ['home', 'listings', 'sales', 'relationships', 'marketing', 'settings', 'reporting'];
    const LEVELS = ['none', 'view', 'edit', 'full'];

    const USERS = [
      { email: 'umarbilalpersonal@gmail.com', role: 'super_admin',
        access: { home: 'full', listings: 'full', sales: 'full', relationships: 'full', marketing: 'full', settings: 'full', reporting: 'full' } },
      { email: 'andries@banyan.com', role: 'super_admin',
        access: { home: 'full', listings: 'full', sales: 'full', relationships: 'full', marketing: 'full', settings: 'full', reporting: 'full' } },
      { email: 'ratna@banyan.com', role: 'agent',
        access: { home: 'view', listings: 'edit', sales: 'full', relationships: 'edit', marketing: 'view', settings: 'none', reporting: 'view' } },
      { email: 'berry@banyan.com', role: 'agent',
        access: { home: 'view', listings: 'edit', sales: 'full', relationships: 'edit', marketing: 'view', settings: 'none', reporting: 'view' } },
      { email: 'kashif@banyan.com', role: 'ops',
        access: { home: 'view', listings: 'edit', sales: 'view', relationships: 'edit', marketing: 'none', settings: 'none', reporting: 'none' } },
      { email: 'made@banyan.com', role: 'agent',
        access: { home: 'view', listings: 'view', sales: 'view', relationships: 'view', marketing: 'none', settings: 'none', reporting: 'none' } },
      { email: 'ketut@banyan.com', role: 'invited',
        access: { home: 'none', listings: 'none', sales: 'none', relationships: 'none', marketing: 'none', settings: 'none', reporting: 'none' } }
    ];

    const SESSIONS = [
      ['ratna@banyan.com', 'Chrome on macOS · Ubud', 'Active now'],
      ['kashif@banyan.com', 'Safari on iPhone · Gianyar', '2 hours ago'],
      ['andries@banyan.com', 'Chrome on Windows · Amsterdam', 'Yesterday']
    ];

    let q = '';
    let sorter;

    // super_admin bypasses per-hub access, so its selects are disabled
    const accessCell = (u, hub) =>
      '<td><select class="inline-edit um-access" data-email="' + u.email + '" data-hub="' + hub + '"' +
      (u.role === 'super_admin' ? ' disabled' : '') + '>' +
      LEVELS.map((l) => '<option value="' + l + '"' +
        ((u.role === 'super_admin' ? 'full' : u.access[hub]) === l ? ' selected' : '') +
        '>' + l + '</option>').join('') + '</select></td>';

    function render() {
      const rows = USERS.filter((u) => !q || u.email.toLowerCase().includes(q));
      const list = sorter ? sorter.apply(rows) : rows;
      el('umBody').innerHTML = list.map((u) =>
        '<tr><td><strong>' + u.email + '</strong></td>' +
        '<td><span class="opp-chip opp-chip--' + (u.role === 'super_admin' ? 'high' : u.role === 'invited' ? 'med' : 'stage') + '">' + u.role + '</span></td>' +
        HUBS.map((h) => accessCell(u, h)).join('') + '</tr>').join('');
      el('umEmpty').hidden = list.length !== 0;
      el('umCount').textContent = String(USERS.length);
    }

    el('umSessions').innerHTML = SESSIONS.map(([who, where, when]) =>
      '<li class="op-listitem"><div><strong>' + who + '</strong><span class="field-hint">' + where + '</span></div>' +
      '<div class="op-listitem__actions"><span class="op-when">' + when + '</span>' +
      '<button type="button" class="btn btn-ghost">Revoke</button></div></li>').join('');

    sorter = sortable(document.querySelector('.um-table'), null, render, 'email');
    el('umSearch').addEventListener('input', (e) => {
      q = e.target.value.trim().toLowerCase();
      render();
    });

    el('umBody').addEventListener('change', (e) => {
      const sel = e.target.closest('.um-access');
      if (!sel) return;
      const u = USERS.find((x) => x.email === sel.dataset.email);
      if (u) u.access[sel.dataset.hub] = sel.value;
    });

    el('umInvite').addEventListener('click', () => {
      const email = el('umEmail').value.trim();
      const pass = el('umPass').value.trim();
      if (!email || !pass) {
        (email ? el('umPass') : el('umEmail')).focus();
        return;
      }
      USERS.push({ email, role: 'invited',
        access: HUBS.reduce((a, h) => { a[h] = 'none'; return a; }, {}) });
      el('umEmail').value = '';
      el('umPass').value = '';
      render();
      toast('umToast', 'Invited ' + email + ' — grant hub access in the table');
    });

    el('umSaveAccess').addEventListener('click', () => toast('umToast', 'Access saved'));
    el('umRevokeAll').addEventListener('click', () => {
      el('umSessions').innerHTML = '<li class="op-listitem"><span class="field-hint">Only your own session is open.</span></li>';
      toast('umToast', 'All other sessions revoked');
    });

    render();
  }

  /* ================= OMS Settings ================= */
  if (page === 'settings-oms') {
    tabs('ostab', {
      system: 'osSystem', sales: 'osSales', communities: 'osCommunities',
      backups: 'osBackups', logs: 'osLogs'
    });

    const rowList = (items) => items.map(([label, note]) =>
      '<li class="op-listitem"><div><strong>' + label + '</strong>' +
      (note ? '<span class="field-hint">' + note + '</span>' : '') + '</div>' +
      '<div class="op-listitem__actions"><button type="button" class="btn btn-ghost">Rename</button>' +
      '<button type="button" class="btn btn-ghost">Remove</button></div></li>').join('');

    el('osInterests').innerHTML = rowList([
      ['rent', 'Searches the rental inventory'],
      ['sale', 'Searches villas for sale'],
      ['land', 'Searches land listings'],
      ['commercial', 'Searches commercial listings']
    ]);

    el('osObjectives').innerHTML = rowList([
      ['Family & Lifestyle', ''], ['Investor (Passive Income)', ''], ['Retiree', ''],
      ['Property Developer', ''], ['Land Banker', ''], ['Fix & Flip', ''],
      ['Fix & Live', ''], ['Collector (No ROI)', '']
    ]);

    el('osStages').innerHTML = ['New', 'Qualified', 'Requirements Defined', 'Shortlist Active',
      'Viewing', 'Negotiation', 'Contracts', 'Closed', 'Lost'].map((s, i) =>
      '<li class="op-listitem"><div><strong>' + s + '</strong>' +
      '<span class="field-hint">Position ' + (i + 1) + '</span></div>' +
      '<div class="op-listitem__actions"><button type="button" class="btn btn-ghost">Rename</button>' +
      '<button type="button" class="btn btn-ghost">Remove</button></div></li>').join('');

    el('osTransactions').innerHTML = rowList([
      ['Rental agreement', 'Document package: rental'],
      ['Sale — leasehold', 'Document package: leasehold-sale'],
      ['Sale — freehold', 'Document package: freehold-sale'],
      ['Land sale', 'Document package: land'],
      ['Management agreement', 'Document package: management']
    ]);

    el('osEvents').innerHTML = [
      ['shortlist_published', 'Shortlist published', 'Shortlist'],
      ['shortlist_viewed', 'Client opened the shortlist', 'Shortlist'],
      ['favorite_added', 'Client favourited a property', 'Shortlist'],
      ['viewing_logged', 'Viewing logged', 'Viewings'],
      ['offer_made', 'Offer made', 'Offers'],
      ['offer_accepted', 'Offer accepted', 'Offers'],
      ['stage_changed', 'Stage changed', 'System'],
      ['task_created', 'Task created', 'Tasks']
    ].map(([t, l, c]) =>
      '<tr><td><code class="ws-slug">' + t + '</code></td><td>' + l + '</td>' +
      '<td><span class="opp-chip opp-chip--stage">' + c + '</span></td></tr>').join('');

    el('osClauses').innerHTML = rowList([
      ['Rental — standard library', '9 clauses'],
      ['Leasehold sale — standard library', '14 clauses'],
      ['Freehold sale — standard library', '12 clauses'],
      ['Deposit and settlement', 'Clause · used by 3 libraries'],
      ['Early termination', 'Clause · used by 2 libraries']
    ]);

    el('osTemplates').innerHTML = rowList([
      ['3BR Ubud family home', 'IDR 20m–50m · Ubud · 3+ bedrooms · car access'],
      ['Budget long-stay', 'IDR 10m–25m · any area · 2+ bedrooms'],
      ['Freehold land, Ubud', 'Land · freehold · Ubud'],
      ['Investor villa', 'Sale · pool · 3+ bedrooms · managed']
    ]);

    el('osNotify').innerHTML = [
      ['shortlist_published', 'email', 'Client', true],
      ['favorite_added', 'in_app', 'Assigned agent', true],
      ['offer_accepted', 'whatsapp', 'Assigned agent', true],
      ['task_overdue', 'in_app', 'Assignee', true],
      ['lease_expiring', 'email', 'Ops', false]
    ].map(([e, ch, who, on]) =>
      '<tr><td><code class="ws-slug">' + e + '</code></td><td>' + ch + '</td><td>' + who + '</td>' +
      '<td><label class="tag-check"><input type="checkbox"' + (on ? ' checked' : '') + '><span>' +
      (on ? 'On' : 'Off') + '</span></label></td></tr>').join('');

    el('osAutomation').innerHTML = [
      ['Shortlist search finds new matches', 'Create a task for the agent, due in 48h', true],
      ['Shortlist stays in draft', 'Create a task for the agent, due in 48h', true],
      ['Opportunity created by a Scout', 'Set Action status to Triage', true],
      ['Waiting follow-up date passes', 'Set Action status to Needs Action', true],
      ['Lease expires within 90 days', 'Notify Ops', false]
    ].map(([t, a, on]) =>
      '<tr><td>' + t + '</td><td>' + a + '</td>' +
      '<td><label class="tag-check"><input type="checkbox"' + (on ? ' checked' : '') + '><span>' +
      (on ? 'On' : 'Off') + '</span></label></td></tr>').join('');

    el('osCommBody').innerHTML = [
      [1, 'Banyan Ubud Rentals', 'WhatsApp', 'https://chat.whatsapp.com/BanyanUbud', 'WhatsApp API', true],
      [2, 'Bali Long Stay', 'Telegram', 'https://t.me/balilongstay', 'Telegram API', true],
      [3, 'Ubud Villas & Land', 'Other', 'https://facebook.com/groups/ubudvillas', 'Manual', true],
      [4, 'Green School Families', 'WhatsApp', 'https://chat.whatsapp.com/GSFamilies', 'WhatsApp API', true],
      [5, 'Bali Co-brokers', 'Telegram', 'https://t.me/balicobrokers', 'Manual', false]
    ].map(([pos, name, platform, link, source, on]) =>
      '<tr><td class="rp-num">' + pos + '</td><td><strong>' + name + '</strong></td>' +
      '<td><select class="inline-edit">' +
        ['WhatsApp', 'Telegram', 'Other'].map((p) =>
          '<option' + (p === platform ? ' selected' : '') + '>' + p + '</option>').join('') +
      '</select></td>' +
      '<td><a href="' + link + '" target="_blank" rel="noopener" class="ws-slug ws-imgurl">' + link + '</a></td>' +
      '<td>' + source + '</td>' +
      '<td><label class="tag-check"><input type="checkbox"' + (on ? ' checked' : '') + '><span>Enabled</span></label></td></tr>').join('');

    el('osBackupBody').innerHTML = [
      ['2 Sep 2026, 02:00', '02:04', '48,210', '412 MB', 'Complete'],
      ['1 Sep 2026, 02:00', '02:04', '47,986', '409 MB', 'Complete'],
      ['31 Aug 2026, 02:00', '02:03', '47,802', '407 MB', 'Complete'],
      ['30 Aug 2026, 14:22', '14:26', '47,744', '406 MB', 'Complete']
    ].map(([started, finished, rows, size, status]) =>
      '<tr><td>' + started + '</td><td>' + finished + '</td><td class="rp-num">' + rows + '</td>' +
      '<td class="rp-num">' + size + '</td>' +
      '<td><span class="status-pill"><span class="action-dot action-dot--green"></span>' + status + '</span></td></tr>').join('');

    const TABLES = ['parties', 'opportunities', 'proposals', 'proposal_versions', 'shortlists',
      'shortlist_items', 'favorites', 'contracts', 'offers', 'tasks', 'viewings',
      'viewing_listings', 'master_listings', 'submissions'];
    el('osTables').innerHTML = TABLES.map((t) =>
      '<a class="tag-check os-csv" href="#" download>' + t + '.csv</a>').join('');
    el('osTableCount').textContent = TABLES.length + ' tables';

    const LOGS = [
      ['2 Sep, 09:14', 'Info', 'sync', 'Community snapshot completed — 8 communities'],
      ['2 Sep, 04:00', 'Info', 'sync', 'Nightly Airtable import — 12 listings updated'],
      ['2 Sep, 02:00', 'Info', 'backup', 'Nightly backup complete (412 MB, 14 tables)'],
      ['1 Sep, 22:41', 'Warn', 'publisher', 'WhatsApp Groups session expired — re-authentication needed'],
      ['1 Sep, 18:03', 'Error', 'scout', 'Facebook Groups collector timed out after 30s'],
      ['1 Sep, 12:20', 'Info', 'auth', 'ketut@banyan.com invited by andries@banyan.com'],
      ['1 Sep, 09:00', 'Warn', 'fx', 'Exchange rate refresh returned stale data — kept previous']
    ];
    let level = 'all';
    function renderLogs() {
      const rows = LOGS.filter((l) => level === 'all' || l[1] === level);
      el('osLogBody').innerHTML = rows.map(([when, lv, src, msg]) =>
        '<tr><td class="rp-muted">' + when + '</td>' +
        '<td><span class="status-pill"><span class="action-dot action-dot--' +
          (lv === 'Error' ? 'red' : lv === 'Warn' ? 'orange' : 'none') + '"></span>' + lv + '</span></td>' +
        '<td><code class="ws-slug">' + src + '</code></td><td>' + msg + '</td></tr>').join('');
      el('osLogEmpty').hidden = rows.length !== 0;
      el('osLogCount').textContent = String(rows.length);
    }
    document.querySelectorAll('#osLogLevels .seg__btn').forEach((b) =>
      b.addEventListener('click', () => {
        level = b.dataset.loglevel;
        document.querySelectorAll('#osLogLevels .seg__btn').forEach((o) =>
          o.classList.toggle('is-active', o.dataset.loglevel === level));
        renderLogs();
      }));
    renderLogs();

    document.querySelectorAll('[data-os-save]').forEach((b) =>
      b.addEventListener('click', () => toast('osToast', 'Saved')));
    document.querySelectorAll('[data-os-add]').forEach((b) =>
      b.addEventListener('click', () => toast('osToast', 'Add ' + b.dataset.osAdd + ' — opens an editor in the real OMS')));
    el('osBackupNow').addEventListener('click', () => toast('osToast', 'Backup started — exporting 14 tables'));
    el('osLogCsv').addEventListener('click', () => toast('osToast', 'Log CSV downloaded'));
    el('osAddCommunity').addEventListener('click', () => toast('osToast', 'Add community — opens an editor in the real OMS'));
  }
});
