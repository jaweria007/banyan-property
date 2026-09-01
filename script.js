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
    { name: 'Sarah Wilson',   phone: '+62 811-9988-7766', email: 'sarah@example.com',  action: 'waiting', followUp: '2026-09-05', stage: 'Viewing',     type: 'Rent',       channel: 'Referral', priority: 'High', agent: 'Berry',      updated: '2026-08-29', shortlist: 'edit',   href: 'shortlist-lead.html' },
    { name: 'M. Samo',        phone: '+62 812-3456-7890', email: '',                   action: 'overdue', followUp: '',           stage: 'In Contact',  type: 'Rent',       channel: 'WhatsApp', priority: 'High', agent: 'Ratna',      updated: '2026-08-22', shortlist: 'edit',   href: 'shortlist-test.html' },
    { name: 'Andries de Vos', phone: '+62 877-1234-0099', email: 'andries@example.com',action: 'needs',   followUp: '',           stage: 'Negotiation', type: 'Villa',      channel: 'Referral', priority: 'High', agent: 'Andries',    updated: '2026-08-28', shortlist: 'edit',   href: 'shortlist-umar.html' },
    { name: 'Putu Widiana',   phone: '+62 813-5566-7788', email: '',                   action: 'triage',  followUp: '',           stage: 'New',         type: 'Land',       channel: 'Scout',    priority: 'Med',  agent: 'Unassigned', updated: '2026-09-01', shortlist: 'create', href: 'shortlist-unnamed.html' },
    { name: 'Jenna Clark',    phone: '+62 819-2233-4455', email: 'jenna@example.com',  action: 'needs',   followUp: '',           stage: 'New',         type: 'Rent',       channel: 'Website',  priority: 'Med',  agent: 'Berry',      updated: '2026-08-31', shortlist: 'create', href: 'shortlist-unnamed.html' },
    { name: 'Kadek Aryani',   phone: '+62 878-6655-4433', email: '',                   action: 'waiting', followUp: '2026-09-09', stage: 'Viewing',     type: 'Commercial', channel: 'Walk-in',  priority: 'Med',  agent: 'Kashif',     updated: '2026-08-27', shortlist: 'edit',   href: 'shortlist-unnamed.html' },
    { name: 'Tom Bradley',    phone: '+62 815-7788-9900', email: 'tom@example.com',    action: 'overdue', followUp: '',           stage: 'Negotiation', type: 'Villa',      channel: 'Website',  priority: 'High', agent: 'Andries',    updated: '2026-08-18', shortlist: 'edit',   href: 'shortlist-lead.html' },
    { name: 'Nina Petrova',   phone: '+62 821-4455-6677', email: 'nina@example.com',   action: 'none',    followUp: '',           stage: 'Closed',      type: 'Rent',       channel: 'Referral', priority: 'Low',  agent: 'Ratna',      updated: '2026-08-15', shortlist: 'edit',   href: 'shortlist-test.html' },
    { name: 'Wayan Adnyana',  phone: '+62 877-1234-0099', email: '',                   action: 'triage',  followUp: '',           stage: 'New',         type: 'Land',       channel: 'Scout',    priority: 'Low',  agent: 'Unassigned', updated: '2026-09-01', shortlist: 'create', href: 'shortlist-unnamed.html' },
    { name: 'Grace Lim',      phone: '+62 816-3322-1100', email: 'grace@example.com',  action: 'needs',   followUp: '',           stage: 'In Contact',  type: 'Villa',      channel: 'WhatsApp', priority: 'Med',  agent: 'Berry',      updated: '2026-08-30', shortlist: 'create', href: 'shortlist-unnamed.html' },
    { name: 'Made Sujana',    phone: '+62 817-4433-2211', email: '',                   action: 'waiting', followUp: '2026-09-12', stage: 'In Contact',  type: 'Commercial', channel: 'Walk-in',  priority: 'Low',  agent: 'Kashif',     updated: '2026-08-26', shortlist: 'create', href: 'shortlist-unnamed.html' },
    { name: 'Oliver Hart',    phone: '+62 812-9090-1212', email: 'oliver@example.com', action: 'overdue', followUp: '',           stage: 'Viewing',     type: 'Rent',       channel: 'Website',  priority: 'Med',  agent: 'Ratna',      updated: '2026-08-14', shortlist: 'edit',   href: 'shortlist-umar.html' },
    { name: 'Ayu Lestari',    phone: '+62 813-1111-2222', email: '',                   action: 'none',    followUp: '',           stage: 'Closed',      type: 'Rent',       channel: 'Referral', priority: 'Low',  agent: 'Berry',      updated: '2026-08-11', shortlist: 'edit',   href: 'shortlist-test.html' },
    { name: 'Daniel Chen',    phone: '+62 818-5544-3322', email: 'daniel@example.com', action: 'needs',   followUp: '',           stage: 'New',         type: 'Villa',      channel: 'Website',  priority: 'High', agent: 'Andries',    updated: '2026-08-31', shortlist: 'create', href: 'shortlist-unnamed.html' },
    { name: 'Rina Kusuma',    phone: '+62 819-7766-5544', email: '',                   action: 'waiting', followUp: '2026-09-03', stage: 'Negotiation', type: 'Land',       channel: 'WhatsApp', priority: 'Med',  agent: 'Kashif',     updated: '2026-08-25', shortlist: 'edit',   href: 'shortlist-lead.html' }
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
      href: 'shortlist-unnamed.html'
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
   Rebuilt from client feedback (26–27 Aug)
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  if (document.body.dataset.page !== 'shortlist') return;
  const criteriaList = document.getElementById('sbCriteriaList');
  if (!criteriaList) return;

  const IDR = (n) => 'IDR ' + (n / 1000000).toFixed(0) + 'm';

  /* ---- Portfolio the searches run against ---- */
  const PROPERTIES = [
    { id: 'p1',  name: '3-Bedroom Family Villa with Private Pool & Garden', area: 'Singakerta', primary: 'Ubud', price: 32000000, beds: 3, baths: 3, type: 'rent', pool: 'Private Pool', view: 'Rice Field View', access: 'Car Access', pets: 'Pet Friendly', added: '2026-08-29', coBroker: false },
    { id: 'p2',  name: '2-Story Villa with Garden', area: 'Nyuh Kuning', primary: 'Ubud', price: 35500000, beds: 3, baths: 2, type: 'rent', pool: 'Shared', view: 'Garden View', access: 'Car Access', pets: 'No Pets', added: '2026-08-12', coBroker: false },
    { id: 'p3',  name: '3-Bedroom Eco-Luxury Home, Taman Petanu', area: 'Pejeng', primary: 'Ubud', price: 35770000, beds: 3, baths: 3, type: 'rent', pool: 'Private Pool', view: 'Jungle View', access: 'Car Access', pets: 'Case by Case', added: '2026-08-30', coBroker: true },
    { id: 'p4',  name: '4-Bedroom Family Villa Near Green School', area: 'Sibang', primary: 'Ubud', price: 47000000, beds: 4, baths: 4, type: 'rent', pool: 'Large Private Pool', view: 'Garden & Pool View', access: 'Car Access', pets: 'Pet Friendly', added: '2026-07-30', coBroker: false },
    { id: 'p5',  name: 'Bright & Contemporary 2-Bedroom Villa', area: 'Penestanan', primary: 'Ubud', price: 22000000, beds: 2, baths: 2, type: 'rent', pool: 'Private Pool', view: 'Rice Field View', access: 'Motorbike Access', pets: 'No Pets', added: '2026-08-05', coBroker: false },
    { id: 'p6',  name: '3BR Villa with Rice Field & Sunrise Views', area: 'Nyuh Kuning', primary: 'Ubud', price: 18600000, beds: 3, baths: 2, type: 'rent', pool: 'Shared', view: 'Rice Field View', access: 'Car Access', pets: 'Cat Only', added: '2026-08-31', coBroker: false },
    { id: 'p7',  name: 'Affordable 2BR Private Pool Villa', area: 'Nyuh Kuning', primary: 'Ubud', price: 19800000, beds: 2, baths: 2, type: 'rent', pool: 'Private Pool', view: 'Garden View', access: 'Car Access', pets: 'Pet Friendly', added: '2026-06-18', coBroker: false },
    { id: 'p8',  name: 'Private 2-Bedroom Villa Sanctuary in Pejeng', area: 'Pejeng', primary: 'Ubud', price: 24000000, beds: 2, baths: 2, type: 'rent', pool: 'Private Pool', view: 'Jungle View', access: 'Car Access', pets: 'No Pets', added: '2026-08-30', coBroker: true },
    { id: 'p9',  name: '6BR Luxury Villa with Basketball Court & Pool', area: 'Kedewatan', primary: 'Ubud', price: 165000000, beds: 6, baths: 6, type: 'rent', pool: 'Large Private Pool', view: 'Rice Field View', access: 'Car Access', pets: 'Pet Friendly', added: '2026-05-20', coBroker: false },
    { id: 'p10', name: 'Thoughtfully Designed 3BR Eco Villa, Sibang', area: 'Sibang', primary: 'Ubud', price: 29000000, beds: 3, baths: 3, type: 'rent', pool: 'Shared', view: 'Garden View', access: 'Car Access', pets: 'Pet Friendly', added: '2026-08-31', coBroker: false },
    { id: 'p11', name: 'Alke Villa — Quiet Lane, Walk to Centre', area: 'Penestanan', primary: 'Ubud', price: 35000000, beds: 3, baths: 2, type: 'rent', pool: 'Private Pool', view: 'Garden & Pool View', access: 'Walking Access only', pets: 'No Pets', added: '2026-08-30', coBroker: false },
    { id: 'p12', name: 'Bambu Nest — Green School Community', area: 'Sibang', primary: 'Ubud', price: 41000000, beds: 4, baths: 3, type: 'rent', pool: 'Shared', view: 'Jungle View', access: 'Car Access', pets: 'Pet Friendly', added: '2026-07-11', coBroker: false },
    { id: 'p13', name: 'Contemporary Villa, Panoramic Rice Field Views', area: 'Abiansemal', primary: 'Ubud', price: 26000000, beds: 2, baths: 2, type: 'rent', pool: 'Private Pool', view: 'Rice Field View', access: 'Car Access', pets: 'Case by Case', added: '2026-08-08', coBroker: false },
    { id: 'p14', name: '2-Bedroom Tropical Villa with Private Pool', area: 'Nyuh Kuning', primary: 'Ubud', price: 35000000, beds: 2, baths: 2, type: 'rent', pool: 'Private Pool', view: 'Garden View', access: 'Car Access', pets: 'No Pets', added: '2026-04-02', coBroker: false }
  ];

  /* ---- Saved search criteria for this client ---- */
  const CRITERIA = [
    {
      id: 'c1',
      name: '3BR Ubud Family Home',
      lastChecked: '2026-08-27',
      priceMin: 20000000,
      priceMax: 50000000,
      locations: ['Nyuh Kuning', 'Singakerta', 'Sibang', 'Penestanan', 'Pejeng', 'Abiansemal', 'Kedewatan'],
      bedsMin: 3,
      access: 'Car Access',
      excludeCoBroker: true,
      open: true
    },
    {
      id: 'c2',
      name: 'More Affordable Option',
      lastChecked: '2026-08-27',
      priceMin: 12000000,
      priceMax: 25000000,
      locations: ['Nyuh Kuning', 'Penestanan', 'Pejeng', 'Abiansemal'],
      bedsMin: 2,
      access: '',
      excludeCoBroker: false,
      open: false
    }
  ];

  // Per-shortlist state. "Not for client" is scoped to THIS shortlist only —
  // the same property still appears for other shortlists with the same brief.
  const state = {
    activeCriteria: 'c1',
    selected: [],          // ids on the draft, in client-facing order
    rejected: [],          // ids excluded from this shortlist's searches
    reviewed: {},          // criteriaId -> ids already shown
    notes: {},             // id -> { like, consider }
    published: false,
    url: ''
  };

  const propById = (id) => PROPERTIES.find((p) => p.id === id);

  const matchesCriteria = (p, c) => {
    if (p.price < c.priceMin || p.price > c.priceMax) return false;
    if (c.locations.length && !c.locations.includes(p.area)) return false;
    if (c.bedsMin && p.beds < c.bedsMin) return false;
    if (c.access && p.access !== c.access) return false;
    if (c.excludeCoBroker && p.coBroker) return false;
    return true;
  };

  const matchesFor = (c) => PROPERTIES.filter((p) => matchesCriteria(p, c));

  // "New" = entered the portfolio since this search was last reviewed
  const newMatchesFor = (c) =>
    matchesFor(c).filter((p) => p.added > c.lastChecked && !state.rejected.includes(p.id));

  const fmtDate = (iso) =>
    new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

  /* ================= Step 1 — criteria cards ================= */
  function renderCriteria() {
    criteriaList.innerHTML = '';

    CRITERIA.forEach((c) => {
      const total = matchesFor(c).length;
      const fresh = newMatchesFor(c).length;

      const card = document.createElement('article');
      card.className = 'sb-criteria' + (c.open ? ' is-open' : '');
      card.dataset.criteria = c.id;

      const summary =
        IDR(c.priceMin) + '–' + IDR(c.priceMax) + ' · ' +
        (c.locations.length > 3 ? c.locations.slice(0, 2).join('/') + ' +' + (c.locations.length - 2) : c.locations.join('/')) +
        ' · ' + c.bedsMin + '+ bedrooms';

      card.innerHTML =
        '<header class="sb-criteria__head">' +
          '<button type="button" class="sb-criteria__toggle" aria-expanded="' + c.open + '">' +
            '<span class="sb-criteria__chev"></span>' +
            '<span class="sb-criteria__title">' + c.name + '</span>' +
          '</button>' +
          '<div class="sb-criteria__meta">' +
            '<span class="sb-matchcount"><strong>' + total + '</strong> matches</span>' +
            '<span class="sb-hint">Last checked ' + fmtDate(c.lastChecked) + '</span>' +
            (fresh ? '<span class="sb-newbadge">+' + fresh + ' NEW</span>' : '') +
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

          '<div class="field"><span class="field__label">Locations</span>' +
            '<div class="tagset">' +
              ['Nyuh Kuning', 'Singakerta', 'Sibang', 'Penestanan', 'Pejeng', 'Abiansemal', 'Kedewatan']
                .map((l) => '<label class="tag-check"><input type="checkbox" data-loc="' + l + '"' +
                  (c.locations.includes(l) ? ' checked' : '') + '><span>' + l + '</span></label>').join('') +
            '</div>' +
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
            '<p class="sb-hint">' + summary + '</p>' +
            (fresh
              ? '<button type="button" class="btn btn-primary sb-generate sb-generate--new" data-gen="' + c.id + '">' +
                  '<span class="sb-newpill__dot"></span>Review ' + fresh + ' new options</button>'
              : '<button type="button" class="btn btn-primary sb-generate" data-gen="' + c.id + '">Generate options</button>') +
          '</div>' +
        '</div>';

      criteriaList.appendChild(card);
    });

    refreshHeader();
  }

  /* ================= Step 2 — selection ================= */
  function propCard(p, mode) {
    const inDraft = state.selected.includes(p.id);
    const notes = state.notes[p.id] || { like: '', consider: '' };
    const pos = state.selected.indexOf(p.id);

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
            '<button type="button" class="btn btn-ghost sb-move" data-move="up" ' + (pos === 0 ? 'disabled' : '') + ' aria-label="Move up">↑ Move up</button>' +
            '<button type="button" class="btn btn-ghost sb-move" data-move="down" ' + (pos === state.selected.length - 1 ? 'disabled' : '') + ' aria-label="Move down">↓ Move down</button>' +
            '<button type="button" class="btn btn-ghost sb-remove">Remove</button>' +
          '</div>' +
        '</div>' +
      '</article>';
    }

    return '<article class="sb-card" data-prop="' + p.id + '">' +
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

  function renderSelection() {
    const c = CRITERIA.find((x) => x.id === state.activeCriteria);
    const wrap = document.getElementById('sbOptions');
    const seen = state.reviewed[c.id] || [];

    const options = matchesFor(c).filter(
      (p) => !state.rejected.includes(p.id) && seen.includes(p.id)
    );

    document.getElementById('sbSelectionTitle').textContent = 'Options for “' + c.name + '”';
    document.getElementById('sbOptionCount').textContent = String(options.length);
    wrap.innerHTML = options.map((p) => propCard(p, 'select')).join('');
    document.getElementById('sbOptionsEmpty').hidden = options.length !== 0;

    // Rejected list, with an undo
    const rejWrap = document.getElementById('sbRejectedWrap');
    rejWrap.hidden = state.rejected.length === 0;
    document.getElementById('sbRejectedCount').textContent = String(state.rejected.length);
    document.getElementById('sbRejectedList').innerHTML = state.rejected
      .map((id) => {
        const p = propById(id);
        return '<li><span>' + p.name + '</span><button type="button" class="sb-undo" data-undo="' + id + '">Undo</button></li>';
      })
      .join('');
  }

  /* ================= Step 3 — draft ================= */
  function renderDraft() {
    const wrap = document.getElementById('sbDraft');
    wrap.innerHTML = state.selected.map((id) => propCard(propById(id), 'draft')).join('');
    document.getElementById('sbDraftEmpty').hidden = state.selected.length !== 0;
    document.getElementById('sbPublish').hidden = state.selected.length === 0;
  }

  function refreshHeader() {
    document.getElementById('sbCount').textContent = String(state.selected.length);
    const fresh = CRITERIA.reduce((n, c) => n + newMatchesFor(c).length, 0);
    const pill = document.getElementById('sbNewPill');
    pill.hidden = fresh === 0;
    document.getElementById('sbNewCount').textContent = String(fresh);
  }

  function renderAll() {
    renderSelection();
    renderDraft();
    refreshHeader();
  }

  /* ================= Step navigation ================= */
  function goto(step) {
    ['criteria', 'selection', 'draft'].forEach((s) => {
      document.getElementById('step' + s.charAt(0).toUpperCase() + s.slice(1)).hidden = s !== step;
      const btn = document.querySelector('.sb-step[data-step="' + s + '"]');
      if (btn) btn.classList.toggle('is-active', s === step);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  document.querySelectorAll('.sb-step').forEach((b) =>
    b.addEventListener('click', () => goto(b.dataset.step))
  );
  document.querySelectorAll('[data-goto]').forEach((b) =>
    b.addEventListener('click', () => goto(b.dataset.goto))
  );
  document.getElementById('sbCounter').addEventListener('click', () => goto('draft'));
  document.getElementById('sbNewPill').addEventListener('click', () => goto('criteria'));

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

    const gen = e.target.closest('.sb-generate');
    if (gen) {
      const c = CRITERIA.find((x) => x.id === gen.dataset.gen);
      state.activeCriteria = c.id;
      // Generating reviews the search: everything matching becomes visible,
      // and the "new since" marker moves to today.
      state.reviewed[c.id] = matchesFor(c).map((p) => p.id);
      c.lastChecked = '2026-09-01';
      renderCriteria();
      renderAll();
      goto('selection');
    }
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
    }

    // Live match count without collapsing what the agent is editing
    const total = matchesFor(c).length;
    const countEl = card.querySelector('.sb-matchcount strong');
    if (countEl) countEl.textContent = String(total);
  });

  document.getElementById('sbAddCriteria').addEventListener('click', () => {
    CRITERIA.forEach((c) => (c.open = false));
    CRITERIA.push({
      id: 'c' + (CRITERIA.length + 1),
      name: 'New search ' + (CRITERIA.length + 1),
      lastChecked: '2026-09-01',
      priceMin: 10000000,
      priceMax: 100000000,
      locations: [],
      bedsMin: 1,
      access: '',
      excludeCoBroker: false,
      open: true
    });
    renderCriteria();
  });

  /* ================= Selection interactions ================= */
  document.getElementById('sbOptions').addEventListener('click', (e) => {
    const card = e.target.closest('.sb-card');
    if (!card) return;
    const id = card.dataset.prop;

    if (e.target.closest('.sb-add')) {
      if (!state.selected.includes(id)) state.selected.push(id);
      renderAll();
    }
    // Rejecting is permanent for THIS shortlist — the property does not come
    // back when the same search is generated again.
    if (e.target.closest('.sb-reject')) {
      if (!state.rejected.includes(id)) state.rejected.push(id);
      state.selected = state.selected.filter((s) => s !== id);
      renderAll();
      renderCriteria();
    }
  });

  document.getElementById('sbRejectedList').addEventListener('click', (e) => {
    const undo = e.target.closest('.sb-undo');
    if (!undo) return;
    state.rejected = state.rejected.filter((id) => id !== undo.dataset.undo);
    renderAll();
    renderCriteria();
  });

  /* ================= Draft interactions ================= */
  const draftWrap = document.getElementById('sbDraft');

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

    // Remove returns it to Selection — it is not a rejection
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
  document.getElementById('sbPublishBtn').addEventListener('click', () => {
    const name = document.getElementById('sbName').value.trim();
    if (!name) {
      document.getElementById('sbName').focus();
      return;
    }
    state.published = true;
    state.url = 'banyan.properties/s/' + Math.random().toString(36).slice(2, 7);

    document.getElementById('sbUrl').textContent = state.url;
    document.getElementById('sbPublishDraft').hidden = true;
    document.getElementById('sbPublishLive').hidden = false;

    const status = document.getElementById('sbStatus');
    status.dataset.state = 'published';
    status.textContent = 'Published';
  });

  document.getElementById('sbCopy').addEventListener('click', () => {
    const btn = document.getElementById('sbCopy');
    const done = () => {
      btn.textContent = 'Copied';
      window.setTimeout(() => (btn.textContent = 'Copy link'), 1600);
    };
    if (navigator.clipboard) navigator.clipboard.writeText('https://' + state.url).then(done, done);
    else done();
  });

  renderCriteria();
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
