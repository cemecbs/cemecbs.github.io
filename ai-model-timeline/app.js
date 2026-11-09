/**
 * Frontier AI Timeline Application Logic
 * Implements interactive canvas rendering, multi-view layouts (Capability Graph,
 * Lab Swimlanes, Milestone Stream), search/filter state, pan/zoom, and
 * WCAG 1.4.13 accessible hover flyouts with intelligent viewport collision avoidance.
 */

(function () {
  // Retrieve models dataset from global or module export
  const DATA = (typeof window !== 'undefined' && window.FRONTIER_AI_DATA) 
    ? window.FRONTIER_AI_DATA 
    : (typeof globalThis !== 'undefined' && globalThis.FRONTIER_AI_DATA)
      ? globalThis.FRONTIER_AI_DATA
      : {};

  const LABS = DATA.LABS || {};
  const FRONTIER_MODELS = DATA.FRONTIER_MODELS || [];

  // Global Timeline State
  const state = {
    models: FRONTIER_MODELS,
    filteredModels: [...FRONTIER_MODELS],
    activeView: 'graph', // 'graph' | 'swimlane' | 'stream'
    selectedLab: 'all',
    selectedCategory: 'all',
    searchQuery: '',
    zoomLevel: 1.0,
    minZoom: 0.65,
    maxZoom: 2.2,
    pinnedModelId: null,
    activeHoverModelId: null,
    flyoutHideTimeout: null,
    isDragging: false,
    dragStartX: 0,
    scrollStartX: 0
  };

  // Date Boundaries for Timeline Mapping (Oct 2022 - Dec 2026)
  const TIMELINE_START = new Date('2022-10-01T00:00:00Z').getTime();
  const TIMELINE_END = new Date('2026-11-30T23:59:59Z').getTime();
  const TOTAL_DURATION_MS = TIMELINE_END - TIMELINE_START;
  const BASE_CANVAS_WIDTH = 2600;

  // DOM Elements Cache
  const DOM = {
    canvasContainer: document.getElementById('timelineCanvasContainer'),
    canvasContent: document.getElementById('timelineCanvasContent'),
    axisHeader: document.getElementById('timelineAxisHeader'),
    yAxis: document.getElementById('timelineYAxis'),
    curvesSvg: document.getElementById('timelineCurvesSvg'),
    nodesLayer: document.getElementById('timelineNodesLayer'),
    searchInput: document.getElementById('searchInput'),
    searchClearBtn: document.getElementById('searchClearBtn'),
    viewBtnGraph: document.getElementById('viewBtnGraph'),
    viewBtnSwimlane: document.getElementById('viewBtnSwimlane'),
    viewBtnStream: document.getElementById('viewBtnStream'),
    zoomInBtn: document.getElementById('zoomInBtn'),
    zoomOutBtn: document.getElementById('zoomOutBtn'),
    zoomResetBtn: document.getElementById('zoomResetBtn'),
    labPillsContainer: document.getElementById('labPillsContainer'),
    categoryPillsContainer: document.getElementById('categoryPillsContainer'),
    statVisibleModels: document.getElementById('statVisibleModels'),
    statLabsCount: document.getElementById('statLabsCount'),

    // Flyout Popover Elements
    flyout: document.getElementById('modelFlyout'),
    flyoutLabBadge: document.getElementById('flyoutLabBadge'),
    flyoutLabName: document.getElementById('flyoutLabName'),
    flyoutModelTitle: document.getElementById('flyoutModelTitle'),
    flyoutDate: document.getElementById('flyoutDate'),
    flyoutRelativeDate: document.getElementById('flyoutRelativeDate'),
    flyoutPinBtn: document.getElementById('flyoutPinBtn'),
    flyoutCloseBtn: document.getElementById('flyoutCloseBtn'),
    flyoutSummary: document.getElementById('flyoutSummary'),
    flyoutArch: document.getElementById('flyoutArch'),
    flyoutContext: document.getElementById('flyoutContext'),
    flyoutLicense: document.getElementById('flyoutLicense'),
    flyoutParadigm: document.getElementById('flyoutParadigm'),
    flyoutModalitiesStrip: document.getElementById('flyoutModalitiesStrip'),
    flyoutBreakthroughsList: document.getElementById('flyoutBreakthroughsList'),
    flyoutBenchmarksRow: document.getElementById('flyoutBenchmarksRow'),
    flyoutCategoryNote: document.getElementById('flyoutCategoryNote'),
    flyoutCompareBtn: document.getElementById('flyoutCompareBtn'),

    // Comparison Modal Elements
    compareModal: document.getElementById('compareModal'),
    compareModalCloseBtn: document.getElementById('compareModalCloseBtn'),
    compareSelectA: document.getElementById('compareSelectA'),
    compareSelectB: document.getElementById('compareSelectB'),
    compareColNameA: document.getElementById('compareColNameA'),
    compareColNameB: document.getElementById('compareColNameB'),
    compareTableBody: document.getElementById('compareTableBody')
  };

  /**
   * Initialize application listeners and initial render
   */
  function init() {
    renderFilterPills();
    renderTimelineHeaders();
    applyFiltersAndRender();
    setupEventListeners();
    populateCompareSelectors();
  }

  /**
   * Render Lab and Category filter buttons with dynamic counts
   */
  function renderFilterPills() {
    // Lab Pills
    const labCounts = { all: state.models.length };
    Object.keys(LABS).forEach(key => labCounts[key] = 0);
    state.models.forEach(m => {
      if (labCounts[m.lab] !== undefined) labCounts[m.lab]++;
    });

    let labHtml = `<span class="filter-label">Labs:</span>`;
    labHtml += `
      <button type="button" class="pill-btn ${state.selectedLab === 'all' ? 'active' : ''}" data-lab="all">
        <span>All Labs</span>
        <span class="pill-count">${labCounts.all}</span>
      </button>
    `;

    Object.values(LABS).forEach(lab => {
      const isActive = state.selectedLab === lab.id;
      labHtml += `
        <button 
          type="button" 
          class="pill-btn ${isActive ? 'active' : ''}" 
          data-lab="${lab.id}"
          style="--pill-color: ${lab.color}; --pill-glow: ${lab.glow};"
        >
          <span class="pill-dot"></span>
          <span>${lab.name}</span>
          <span class="pill-count">${labCounts[lab.id]}</span>
        </button>
      `;
    });
    DOM.labPillsContainer.innerHTML = labHtml;

    // Category Pills
    const categories = [
      { id: 'all', label: 'All Paradigms' },
      { id: 'flagship', label: 'Flagship Frontier' },
      { id: 'reasoning', label: 'Reasoning / Thinking' },
      { id: 'multimodal', label: 'Omni / Multimodal' },
      { id: 'open-weights', label: 'Open Weights' },
      { id: 'efficient', label: 'Lightweight / Distilled' }
    ];

    let catHtml = `<span class="filter-label">Paradigm:</span>`;
    categories.forEach(cat => {
      const isActive = state.selectedCategory === cat.id;
      catHtml += `
        <button type="button" class="pill-btn ${isActive ? 'active' : ''}" data-category="${cat.id}">
          <span>${cat.label}</span>
        </button>
      `;
    });
    DOM.categoryPillsContainer.innerHTML = catHtml;
  }

  /**
   * Render Year Bands & Month Grid Ticks along the Time Axis
   */
  function renderTimelineHeaders() {
    DOM.axisHeader.innerHTML = '';
    const currentWidth = BASE_CANVAS_WIDTH * state.zoomLevel;
    DOM.canvasContent.style.minWidth = `${currentWidth}px`;

    const years = [
      { year: 2022, start: '2022-10-01', end: '2022-12-31', sub: 'The Spark (ChatGPT)' },
      { year: 2023, start: '2023-01-01', end: '2023-12-31', sub: 'GPT-4 & Open Source Explosion' },
      { year: 2024, start: '2024-01-01', end: '2024-12-31', sub: 'Omni & Reasoning Revolution' },
      { year: 2025, start: '2025-01-01', end: '2025-12-31', sub: 'Hybrid Thinking & Trillion MoEs' },
      { year: 2026, start: '2026-01-01', end: '2026-11-30', sub: 'World Models & Autonomous Agents' }
    ];

    years.forEach(y => {
      const startMs = new Date(`${y.start}T00:00:00Z`).getTime();
      const endMs = new Date(`${y.end}T23:59:59Z`).getTime();
      const leftPx = ((startMs - TIMELINE_START) / TOTAL_DURATION_MS) * currentWidth;
      const widthPx = ((endMs - startMs) / TOTAL_DURATION_MS) * currentWidth;

      const band = document.createElement('div');
      band.className = 'year-band';
      band.style.left = `${leftPx}px`;
      band.style.width = `${widthPx}px`;
      band.innerHTML = `
        <span class="year-band-title">${y.year}</span>
        <span class="year-band-sub">${y.sub}</span>
      `;
      DOM.axisHeader.appendChild(band);
    });

    // Month sub-ticks
    const months = [
      '2022-11', '2023-01', '2023-04', '2023-07', '2023-10',
      '2024-01', '2024-04', '2024-07', '2024-10',
      '2025-01', '2025-04', '2025-07', '2025-10',
      '2026-01', '2026-04', '2026-07', '2026-10'
    ];

    months.forEach(m => {
      const monthDate = new Date(`${m}-01T00:00:00Z`).getTime();
      if (monthDate >= TIMELINE_START && monthDate <= TIMELINE_END) {
        const leftPx = ((monthDate - TIMELINE_START) / TOTAL_DURATION_MS) * currentWidth;
        const tick = document.createElement('div');
        tick.className = 'month-tick';
        tick.style.left = `${leftPx}px`;
        const dateObj = new Date(`${m}-01T00:00:00Z`);
        tick.textContent = dateObj.toLocaleDateString('en-US', { month: 'short' });
        DOM.axisHeader.appendChild(tick);
      }
    });
  }

  /**
   * Filter models based on search query, selected lab, and selected category
   */
  function applyFiltersAndRender() {
    const query = state.searchQuery.toLowerCase().trim();

    state.filteredModels = state.models.filter(m => {
      // Lab filter
      if (state.selectedLab !== 'all' && m.lab !== state.selectedLab) return false;

      // Category filter
      if (state.selectedCategory !== 'all') {
        if (state.selectedCategory === 'open-weights' && !m.isOpenWeights) return false;
        if (state.selectedCategory === 'reasoning' && m.category !== 'reasoning') return false;
        if (state.selectedCategory === 'multimodal' && m.category !== 'multimodal') return false;
        if (state.selectedCategory === 'flagship' && m.category !== 'flagship') return false;
        if (state.selectedCategory === 'efficient' && m.category !== 'efficient') return false;
      }

      // Search query filter
      if (query) {
        const searchBlob = `
          ${m.name} ${m.shortName} ${m.lab} ${LABS[m.lab]?.name || ''} 
          ${m.architecture} ${m.summary} ${m.trainingParadigm} 
          ${m.license} ${m.contextWindow} ${m.breakthroughs.join(' ')}
        `.toLowerCase();
        if (!searchBlob.includes(query)) return false;
      }

      return true;
    });

    // Update Stats Counter
    DOM.statVisibleModels.textContent = state.filteredModels.length;
    const uniqueLabs = new Set(state.filteredModels.map(m => m.lab));
    DOM.statLabsCount.textContent = uniqueLabs.size;

    // Render current view mode
    if (state.activeView === 'graph') {
      renderGraphView();
    } else if (state.activeView === 'swimlane') {
      renderSwimlaneView();
    } else if (state.activeView === 'stream') {
      renderStreamView();
    }
  }

  /**
   * Convert release date to linear X pixel position
   */
  function getXForDate(dateStr) {
    const dateMs = new Date(`${dateStr}T12:00:00Z`).getTime();
    const currentWidth = BASE_CANVAS_WIDTH * state.zoomLevel;
    const clampedMs = Math.max(TIMELINE_START, Math.min(TIMELINE_END, dateMs));
    return ((clampedMs - TIMELINE_START) / TOTAL_DURATION_MS) * currentWidth;
  }

  /**
   * Convert Elo/Capability rating to Y pixel position (1000 - 1550 range)
   */
  function getYForElo(elo) {
    const minElo = 1020;
    const maxElo = 1560;
    const canvasHeight = 560;
    const topPadding = 90;
    const bottomPadding = 50;
    const effectiveHeight = canvasHeight - topPadding - bottomPadding;

    const normalized = Math.max(0, Math.min(1, (elo - minElo) / (maxElo - minElo)));
    return canvasHeight - bottomPadding - (normalized * effectiveHeight);
  }

  /**
   * Render Capability Graph View (Default: 2D scatter/milestone plot with capability Y-axis)
   */
  function renderGraphView() {
    DOM.yAxis.style.display = 'flex';
    DOM.axisHeader.style.display = 'flex';
    DOM.curvesSvg.style.display = 'block';
    DOM.nodesLayer.innerHTML = '';
    DOM.curvesSvg.innerHTML = '';

    const currentWidth = BASE_CANVAS_WIDTH * state.zoomLevel;
    DOM.canvasContent.style.minWidth = `${currentWidth}px`;
    DOM.canvasContent.style.height = '560px';

    // Group models by lab to draw trendline curves
    const labPaths = {};
    Object.keys(LABS).forEach(labId => labPaths[labId] = []);

    state.filteredModels.forEach(model => {
      const x = getXForDate(model.releaseDate);
      const y = getYForElo(model.eloIndex);
      labPaths[model.lab]?.push({ x, y, model });

      // Create Milestone Node
      const nodeEl = createMilestoneNode(model, x, y);
      DOM.nodesLayer.appendChild(nodeEl);
    });

    // Render SVG connector curves per lab
    Object.entries(labPaths).forEach(([labId, points]) => {
      if (points.length < 2) return;
      points.sort((a, b) => a.x - b.x);

      let pathD = `M ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const cx1 = prev.x + (curr.x - prev.x) * 0.45;
        const cy1 = prev.y;
        const cx2 = prev.x + (curr.x - prev.x) * 0.55;
        const cy2 = curr.y;
        pathD += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${curr.x} ${curr.y}`;
      }

      const labInfo = LABS[labId];
      const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      pathEl.setAttribute('d', pathD);
      pathEl.setAttribute('fill', 'none');
      pathEl.setAttribute('stroke', labInfo.color);
      pathEl.setAttribute('stroke-width', '2.5');
      pathEl.setAttribute('stroke-opacity', '0.45');
      pathEl.setAttribute('stroke-dasharray', '4 3');
      DOM.curvesSvg.appendChild(pathEl);
    });
  }

  /**
   * Render Swimlane View (Horizontal tracks per lab)
   */
  function renderSwimlaneView() {
    DOM.yAxis.style.display = 'none';
    DOM.axisHeader.style.display = 'flex';
    DOM.curvesSvg.style.display = 'none';
    DOM.nodesLayer.innerHTML = '';

    const activeLabs = Object.values(LABS).filter(l => 
      state.selectedLab === 'all' || state.selectedLab === l.id
    );

    const trackHeight = 78;
    const totalHeight = 52 + (activeLabs.length * trackHeight) + 30;
    DOM.canvasContent.style.height = `${Math.max(560, totalHeight)}px`;

    const layoutEl = document.createElement('div');
    layoutEl.className = 'swimlane-layout';
    layoutEl.style.marginTop = '52px';

    activeLabs.forEach((lab) => {
      const trackEl = document.createElement('div');
      trackEl.className = 'swimlane-track';
      trackEl.style.height = `${trackHeight}px`;

      const labelCol = document.createElement('div');
      labelCol.className = 'swimlane-label-col';
      labelCol.innerHTML = `
        <span class="swimlane-lab-dot" style="--track-color: ${lab.color}; --track-glow: ${lab.glow};"></span>
        <span class="swimlane-lab-name">${lab.name}</span>
      `;

      const laneEl = document.createElement('div');
      laneEl.className = 'swimlane-nodes-lane';

      // Filter models belonging to this lab
      const labModels = state.filteredModels.filter(m => m.lab === lab.id);
      labModels.forEach(model => {
        const x = getXForDate(model.releaseDate);
        const y = trackHeight / 2;
        const nodeEl = createMilestoneNode(model, x, y);
        laneEl.appendChild(nodeEl);
      });

      trackEl.appendChild(labelCol);
      trackEl.appendChild(laneEl);
      layoutEl.appendChild(trackEl);
    });

    DOM.nodesLayer.appendChild(layoutEl);
  }

  /**
   * Render Milestone Stream View (Vertical chronological cards)
   */
  function renderStreamView() {
    DOM.yAxis.style.display = 'none';
    DOM.axisHeader.style.display = 'none';
    DOM.curvesSvg.style.display = 'none';
    DOM.nodesLayer.innerHTML = '';
    DOM.canvasContent.style.minWidth = '100%';
    DOM.canvasContent.style.height = 'auto';

    const sortedModels = [...state.filteredModels].sort((a, b) => 
      new Date(a.releaseDate) - new Date(b.releaseDate)
    );

    const container = document.createElement('div');
    container.className = 'stream-cards-layout';

    const spine = document.createElement('div');
    spine.className = 'stream-spine';
    container.appendChild(spine);

    sortedModels.forEach(model => {
      const labInfo = LABS[model.lab] || LABS.openai;
      const rowEl = document.createElement('div');
      rowEl.className = 'stream-card-row';

      const pin = document.createElement('div');
      pin.className = 'stream-node-pin';
      pin.style.setProperty('--node-color', labInfo.color);
      pin.style.setProperty('--node-glow', labInfo.glow);

      const card = document.createElement('article');
      card.className = 'stream-card-content';
      card.style.setProperty('--node-color', labInfo.color);
      card.style.setProperty('--node-glow', labInfo.glow);
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `${model.name} release card`);

      card.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
          <span style="font-size: 0.72rem; font-weight: 700; color: ${labInfo.color}; text-transform: uppercase;">
            ${labInfo.name}
          </span>
          <span style="font-size: 0.7rem; font-family: var(--font-mono); color: var(--text-muted);">
            ${model.dateFormatted}
          </span>
        </div>
        <h3 style="font-size: 1.05rem; font-weight: 700; color: #fff; margin-bottom: 0.35rem;">
          ${model.name}
        </h3>
        <p style="font-size: 0.8rem; color: #cbd5e1; margin-bottom: 0.6rem; line-height: 1.45;">
          ${model.summary}
        </p>
        <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
          <span class="modality-pill" style="color: #38bdf8;">${model.contextWindow}</span>
          ${model.isOpenWeights ? '<span class="node-badge-open">Open Weights</span>' : ''}
          ${model.category === 'reasoning' ? '<span class="node-badge-reasoning">Reasoning</span>' : ''}
        </div>
      `;

      // Connect flyout on hover or focus
      card.addEventListener('mouseenter', () => showFlyoutForModel(model, card));
      card.addEventListener('mouseleave', () => scheduleFlyoutHide());
      card.addEventListener('focus', () => showFlyoutForModel(model, card));
      card.addEventListener('blur', () => scheduleFlyoutHide());
      card.addEventListener('click', () => pinFlyoutForModel(model, card));

      rowEl.appendChild(pin);
      rowEl.appendChild(card);
      container.appendChild(rowEl);
    });

    DOM.nodesLayer.appendChild(container);
  }

  /**
   * Create an interactive DOM node for a milestone model
   */
  function createMilestoneNode(model, x, y) {
    const labInfo = LABS[model.lab] || LABS.openai;
    const node = document.createElement('div');
    node.className = 'model-milestone-node';
    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
    node.style.setProperty('--node-color', labInfo.color);
    node.style.setProperty('--node-glow', labInfo.glow);
    node.setAttribute('tabindex', '0');
    node.setAttribute('role', 'button');
    node.setAttribute('aria-label', `${model.name}, released ${model.dateFormatted} by ${labInfo.name}`);
    node.dataset.modelId = model.id;

    // Beacon & Label pill
    node.innerHTML = `
      <div class="node-beacon"></div>
      <div class="node-label-pill">
        <span class="node-label-name">${model.shortName || model.name}</span>
        <span class="node-label-date">${model.dateFormatted.split(',')[0]}</span>
        ${model.isOpenWeights ? '<span class="node-badge-open">Open</span>' : ''}
        ${model.category === 'reasoning' ? '<span class="node-badge-reasoning">o1/R1</span>' : ''}
      </div>
    `;

    // Connector stem in graph mode
    if (state.activeView === 'graph') {
      const stem = document.createElement('div');
      stem.className = 'node-stem';
      stem.style.height = `${560 - y - 30}px`;
      stem.style.top = '10px';
      node.appendChild(stem);
    }

    // Hover and Focus Handlers (WCAG 1.4.13 compliant)
    node.addEventListener('mouseenter', () => {
      cancelFlyoutHide();
      showFlyoutForModel(model, node);
    });

    node.addEventListener('mouseleave', () => {
      scheduleFlyoutHide();
    });

    node.addEventListener('focus', () => {
      cancelFlyoutHide();
      showFlyoutForModel(model, node);
    });

    node.addEventListener('blur', () => {
      scheduleFlyoutHide();
    });

    node.addEventListener('click', (e) => {
      e.stopPropagation();
      pinFlyoutForModel(model, node);
    });

    return node;
  }

  /**
   * Show Flyout with model details & compute optimal viewport positioning
   */
  function showFlyoutForModel(model, anchorElement) {
    if (state.pinnedModelId && state.pinnedModelId !== model.id) {
      // A different model is explicitly pinned; don't auto-switch unless clicked
      return;
    }

    state.activeHoverModelId = model.id;
    const labInfo = LABS[model.lab] || LABS.openai;

    // Update Flyout Content
    DOM.flyout.style.setProperty('--flyout-border', labInfo.border || labInfo.color);
    DOM.flyout.style.setProperty('--flyout-glow', labInfo.glow);
    DOM.flyout.style.setProperty('--flyout-lab-color', labInfo.color);

    DOM.flyoutLabName.textContent = labInfo.name;
    DOM.flyoutModelTitle.textContent = model.name;
    DOM.flyoutDate.textContent = model.dateFormatted;
    DOM.flyoutRelativeDate.textContent = calculateRelativeTime(model.releaseDate);
    DOM.flyoutSummary.textContent = model.summary;
    DOM.flyoutArch.textContent = model.architecture;
    DOM.flyoutContext.textContent = model.contextWindow;
    DOM.flyoutLicense.textContent = model.license;
    DOM.flyoutParadigm.textContent = model.trainingParadigm;
    DOM.flyoutCategoryNote.textContent = `${model.category.toUpperCase()} • ${model.isOpenWeights ? 'Open Weights' : 'Closed API'}`;

    // Modalities
    DOM.flyoutModalitiesStrip.innerHTML = model.modalities.map(m => 
      `<span class="modality-pill">${m}</span>`
    ).join('');

    // Breakthroughs
    DOM.flyoutBreakthroughsList.innerHTML = model.breakthroughs.map(b => 
      `<li class="breakthrough-item">${b}</li>`
    ).join('');

    // Benchmarks
    let benchHtml = '';
    if (model.benchmarks.arenaElo) {
      benchHtml += `<div class="bench-badge"><span class="bench-name">Arena Elo</span><span class="bench-score">${model.benchmarks.arenaElo}</span></div>`;
    }
    if (model.benchmarks.mmlu) {
      benchHtml += `<div class="bench-badge"><span class="bench-name">MMLU</span><span class="bench-score">${model.benchmarks.mmlu}</span></div>`;
    }
    if (model.benchmarks.swebench) {
      benchHtml += `<div class="bench-badge"><span class="bench-name">SWE-bench</span><span class="bench-score" style="color: #10b981;">${model.benchmarks.swebench}</span></div>`;
    }
    if (model.benchmarks.secBenchPro) {
      benchHtml += `<div class="bench-badge"><span class="bench-name">SEC-bench</span><span class="bench-score" style="color: #a855f7;">${model.benchmarks.secBenchPro}</span></div>`;
    }
    if (model.benchmarks.math) {
      benchHtml += `<div class="bench-badge"><span class="bench-name">Math/AIME</span><span class="bench-score" style="color: #f59e0b;">${model.benchmarks.math}</span></div>`;
    }
    // Any additional named benchmarks (label -> score) not covered above
    if (model.benchmarks.extra) {
      Object.entries(model.benchmarks.extra).forEach(([name, score]) => {
        benchHtml += `<div class="bench-badge"><span class="bench-name">${name}</span><span class="bench-score" style="color: #38bdf8;">${score}</span></div>`;
      });
    }
    DOM.flyoutBenchmarksRow.innerHTML = benchHtml;

    // Pin button state
    if (state.pinnedModelId === model.id) {
      DOM.flyoutPinBtn.classList.add('is-active');
      DOM.flyout.classList.add('is-pinned');
    } else {
      DOM.flyoutPinBtn.classList.remove('is-active');
      DOM.flyout.classList.remove('is-pinned');
    }

    // Position Flyout using getBoundingClientRect with Collision Flipping (position-aware)
    positionFlyoutRelativeToAnchor(anchorElement);

    // Reveal Flyout
    DOM.flyout.classList.add('is-visible');
    DOM.flyout.setAttribute('aria-hidden', 'false');
  }

  /**
   * Calculate optimal fixed position & prevent viewport clipping
   */
  function positionFlyoutRelativeToAnchor(anchorElement) {
    const anchorRect = anchorElement.getBoundingClientRect();
    const flyoutRect = DOM.flyout.getBoundingClientRect();
    const flyoutWidth = flyoutRect.width || 440;
    const flyoutHeight = flyoutRect.height || 480;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const margin = 16;

    // Horizontal calculation: Center over anchor, clamp within viewport
    let left = anchorRect.left + (anchorRect.width / 2) - (flyoutWidth / 2);
    left = Math.max(margin, Math.min(viewportWidth - flyoutWidth - margin, left));

    // Calculate arrow offset relative to flyout
    const anchorCenterScreen = anchorRect.left + (anchorRect.width / 2);
    const arrowLeft = Math.max(20, Math.min(flyoutWidth - 20, anchorCenterScreen - left));
    DOM.flyout.style.setProperty('--arrow-left', `${arrowLeft}px`);

    // Vertical placement: prefer above the anchor, flip to below if insufficient space
    const spaceAbove = anchorRect.top;
    const spaceBelow = viewportHeight - anchorRect.bottom;
    let top;
    let placement = 'top';

    if (spaceAbove >= flyoutHeight + 14) {
      // Fits above anchor
      top = anchorRect.top - flyoutHeight - 12;
      placement = 'top';
    } else if (spaceBelow >= flyoutHeight + 14) {
      // Fits below anchor
      top = anchorRect.bottom + 12;
      placement = 'bottom';
    } else {
      // Center vertically on screen if tight
      top = Math.max(margin, (viewportHeight - flyoutHeight) / 2);
      placement = spaceBelow > spaceAbove ? 'bottom' : 'top';
    }

    DOM.flyout.setAttribute('data-placement', placement);
    DOM.flyout.style.left = `${Math.round(left)}px`;
    DOM.flyout.style.top = `${Math.round(top)}px`;
  }

  /**
   * Schedule flyout dismissal with hover grace period (WCAG 1.4.13 Hoverable requirement)
   */
  function scheduleFlyoutHide() {
    if (state.pinnedModelId) return; // Do not auto-close if pinned

    cancelFlyoutHide();
    state.flyoutHideTimeout = setTimeout(() => {
      hideFlyout();
    }, 220); // 220ms buffer allows moving pointer into flyout without closing
  }

  /**
   * Cancel any pending flyout hide timer
   */
  function cancelFlyoutHide() {
    if (state.flyoutHideTimeout) {
      clearTimeout(state.flyoutHideTimeout);
      state.flyoutHideTimeout = null;
    }
  }

  /**
   * Close and hide the flyout
   */
  function hideFlyout(force = false) {
    if (state.pinnedModelId && !force) return;

    state.activeHoverModelId = null;
    state.pinnedModelId = null;
    DOM.flyout.classList.remove('is-visible', 'is-pinned');
    DOM.flyout.setAttribute('aria-hidden', 'true');
    DOM.flyoutPinBtn.classList.remove('is-active');

    document.querySelectorAll('.model-milestone-node.is-active').forEach(node => {
      node.classList.remove('is-active');
    });
  }

  /**
   * Toggle Pinning of Flyout
   */
  function pinFlyoutForModel(model, anchorElement) {
    if (state.pinnedModelId === model.id) {
      // Unpin
      hideFlyout(true);
    } else {
      state.pinnedModelId = model.id;
      showFlyoutForModel(model, anchorElement);
      DOM.flyout.classList.add('is-pinned');
      DOM.flyoutPinBtn.classList.add('is-active');
    }
  }

  /**
   * Human-readable relative date string
   */
  function calculateRelativeTime(dateStr) {
    const releaseTime = new Date(`${dateStr}T00:00:00Z`).getTime();
    const now = new Date('2026-11-09T12:00:00Z').getTime(); // Present reference time
    const diffMonths = Math.round((now - releaseTime) / (1000 * 60 * 60 * 24 * 30.4));

    if (diffMonths <= 0) return 'Recent Release';
    if (diffMonths < 12) return `${diffMonths} mo${diffMonths > 1 ? 's' : ''} ago`;
    const years = (diffMonths / 12).toFixed(1);
    return `${years} yrs ago`;
  }

  /**
   * Jump timeline viewport directly to a specific year
   */
  function jumpToYear(year) {
    const targetDate = `${year}-01-01`;
    const x = getXForDate(targetDate);
    const containerWidth = DOM.canvasContainer.clientWidth;
    DOM.canvasContainer.scrollTo({
      left: Math.max(0, x - (containerWidth / 4)),
      behavior: 'smooth'
    });
  }

  /**
   * Comparison Tool Logic: Populates selectors & renders comparison rows
   */
  function populateCompareSelectors() {
    const optionsHtml = state.models.map(m => 
      `<option value="${m.id}">${m.name} (${m.year})</option>`
    ).join('');

    DOM.compareSelectA.innerHTML = optionsHtml;
    DOM.compareSelectB.innerHTML = optionsHtml;

    // Defaults: Claude 3.5 Sonnet vs OpenAI o1
    DOM.compareSelectA.value = 'claude-35-sonnet-v1';
    DOM.compareSelectB.value = 'openai-o1-preview';
    renderComparisonTable();
  }

  function openComparisonModal(preselectModelId = null) {
    if (preselectModelId) {
      DOM.compareSelectA.value = preselectModelId;
      // Pick another interesting frontier model
      if (DOM.compareSelectB.value === preselectModelId) {
        DOM.compareSelectB.value = preselectModelId === 'gpt-4o' ? 'claude-35-sonnet-v1' : 'gpt-4o';
      }
    }
    renderComparisonTable();
    DOM.compareModal.classList.add('is-open');
    DOM.compareModal.setAttribute('aria-hidden', 'false');
  }

  function closeComparisonModal() {
    DOM.compareModal.classList.remove('is-open');
    DOM.compareModal.setAttribute('aria-hidden', 'true');
  }

  function formatBenchmarks(b) {
    return Object.entries(b).flatMap(([k, v]) =>
      k === 'extra' ? Object.entries(v).map(([n, s]) => `${n}: ${s}`) : [`${k.toUpperCase()}: ${v}`]
    ).join(' | ');
  }

  function renderComparisonTable() {
    const modelA = state.models.find(m => m.id === DOM.compareSelectA.value) || state.models[0];
    const modelB = state.models.find(m => m.id === DOM.compareSelectB.value) || state.models[1];

    DOM.compareColNameA.textContent = modelA.name;
    DOM.compareColNameB.textContent = modelB.name;

    const rows = [
      { label: 'Research Lab', valA: LABS[modelA.lab]?.name, valB: LABS[modelB.lab]?.name },
      { label: 'Release Date', valA: modelA.dateFormatted, valB: modelB.dateFormatted },
      { label: 'Context Window', valA: modelA.contextWindow, valB: modelB.contextWindow },
      { label: 'Arena Elo (LMSYS)', valA: modelA.benchmarks.arenaElo || 'N/A', valB: modelB.benchmarks.arenaElo || 'N/A' },
      { label: 'Architecture', valA: modelA.architecture, valB: modelB.architecture },
      { label: 'License / Availability', valA: modelA.license, valB: modelB.license },
      { label: 'Training Paradigm', valA: modelA.trainingParadigm, valB: modelB.trainingParadigm },
      { label: 'Modalities', valA: modelA.modalities.join(', '), valB: modelB.modalities.join(', ') },
      { label: 'Key Benchmarks', 
        valA: formatBenchmarks(modelA.benchmarks), 
        valB: formatBenchmarks(modelB.benchmarks) 
      },
      { label: 'Defining Breakthrough', valA: modelA.breakthroughs[0] || '', valB: modelB.breakthroughs[0] || '' }
    ];

    DOM.compareTableBody.innerHTML = rows.map(r => `
      <tr>
        <td>${r.label}</td>
        <td style="color: #fff; font-weight: 500;">${r.valA}</td>
        <td style="color: #fff; font-weight: 500;">${r.valB}</td>
      </tr>
    `).join('');
  }

  /**
   * Setup Global Interactive Event Listeners
   */
  function setupEventListeners() {
    // WCAG 1.4.13: Mouse entering flyout preserves it open so user can select/read/copy
    DOM.flyout.addEventListener('mouseenter', () => cancelFlyoutHide());
    DOM.flyout.addEventListener('mouseleave', () => scheduleFlyoutHide());

    // Flyout Actions
    DOM.flyoutCloseBtn.addEventListener('click', () => hideFlyout(true));
    DOM.flyoutPinBtn.addEventListener('click', () => {
      if (state.pinnedModelId) {
        hideFlyout(true);
      } else if (state.activeHoverModelId) {
        state.pinnedModelId = state.activeHoverModelId;
        DOM.flyoutPinBtn.classList.add('is-active');
        DOM.flyout.classList.add('is-pinned');
      }
    });

    DOM.flyoutCompareBtn.addEventListener('click', () => {
      openComparisonModal(state.activeHoverModelId || state.pinnedModelId);
    });

    // Modal Close Listeners
    DOM.compareModalCloseBtn.addEventListener('click', closeComparisonModal);
    DOM.compareModal.addEventListener('click', (e) => {
      if (e.target === DOM.compareModal) closeComparisonModal();
    });
    DOM.compareSelectA.addEventListener('change', renderComparisonTable);
    DOM.compareSelectB.addEventListener('change', renderComparisonTable);

    // Keyboard Shortcuts: Escape to dismiss, "/" to search, "P" to pin
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (DOM.compareModal.classList.contains('is-open')) {
          closeComparisonModal();
        } else {
          hideFlyout(true);
        }
      } else if (e.key === '/' && document.activeElement !== DOM.searchInput) {
        e.preventDefault();
        DOM.searchInput.focus();
      } else if ((e.key === 'p' || e.key === 'P') && state.activeHoverModelId && !DOM.compareModal.classList.contains('is-open')) {
        const activeNode = document.querySelector(`[data-model-id="${state.activeHoverModelId}"]`);
        if (activeNode) {
          const model = state.models.find(m => m.id === state.activeHoverModelId);
          if (model) pinFlyoutForModel(model, activeNode);
        }
      }
    });

    // Search Input
    DOM.searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      DOM.searchClearBtn.style.display = state.searchQuery ? 'block' : 'none';
      applyFiltersAndRender();
    });

    DOM.searchClearBtn.addEventListener('click', () => {
      DOM.searchInput.value = '';
      state.searchQuery = '';
      DOM.searchClearBtn.style.display = 'none';
      DOM.searchInput.focus();
      applyFiltersAndRender();
    });

    // View Switchers
    const viewBtns = [DOM.viewBtnGraph, DOM.viewBtnSwimlane, DOM.viewBtnStream];
    viewBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        viewBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        state.activeView = btn.dataset.view;
        hideFlyout(true);
        renderTimelineHeaders();
        applyFiltersAndRender();
      });
    });

    // Lab Filter Pills
    DOM.labPillsContainer.addEventListener('click', (e) => {
      const pill = e.target.closest('.pill-btn');
      if (!pill) return;
      DOM.labPillsContainer.querySelectorAll('.pill-btn').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.selectedLab = pill.dataset.lab;
      hideFlyout(true);
      applyFiltersAndRender();
    });

    // Category Filter Pills
    DOM.categoryPillsContainer.addEventListener('click', (e) => {
      const pill = e.target.closest('.pill-btn');
      if (!pill) return;
      DOM.categoryPillsContainer.querySelectorAll('.pill-btn').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.selectedCategory = pill.dataset.category;
      hideFlyout(true);
      applyFiltersAndRender();
    });

    // Zoom Controls
    DOM.zoomInBtn.addEventListener('click', () => {
      state.zoomLevel = Math.min(state.maxZoom, state.zoomLevel + 0.2);
      hideFlyout(true);
      renderTimelineHeaders();
      applyFiltersAndRender();
    });

    DOM.zoomOutBtn.addEventListener('click', () => {
      state.zoomLevel = Math.max(state.minZoom, state.zoomLevel - 0.2);
      hideFlyout(true);
      renderTimelineHeaders();
      applyFiltersAndRender();
    });

    DOM.zoomResetBtn.addEventListener('click', () => {
      state.zoomLevel = 1.0;
      hideFlyout(true);
      renderTimelineHeaders();
      applyFiltersAndRender();
    });

    // Year Jump Buttons
    document.querySelectorAll('.year-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        jumpToYear(btn.dataset.year);
      });
    });

    // Mouse Drag to Pan Timeline Canvas
    DOM.canvasContainer.addEventListener('mousedown', (e) => {
      if (e.target.closest('.model-milestone-node') || e.target.closest('.model-flyout-card')) return;
      state.isDragging = true;
      DOM.canvasContainer.classList.add('is-dragging');
      state.dragStartX = e.pageX - DOM.canvasContainer.offsetLeft;
      state.scrollStartX = DOM.canvasContainer.scrollLeft;
    });

    window.addEventListener('mousemove', (e) => {
      if (!state.isDragging) return;
      e.preventDefault();
      const x = e.pageX - DOM.canvasContainer.offsetLeft;
      const walk = (x - state.dragStartX) * 1.5;
      DOM.canvasContainer.scrollLeft = state.scrollStartX - walk;
    });

    window.addEventListener('mouseup', () => {
      if (state.isDragging) {
        state.isDragging = false;
        DOM.canvasContainer.classList.remove('is-dragging');
      }
    });

    // Scroll sync for sticky headers / repositioning flyout if pinned
    DOM.canvasContainer.addEventListener('scroll', () => {
      if (state.pinnedModelId) {
        const activeNode = document.querySelector(`[data-model-id="${state.pinnedModelId}"]`);
        if (activeNode) positionFlyoutRelativeToAnchor(activeNode);
      }
    });

    window.addEventListener('resize', () => {
      if (state.pinnedModelId) {
        const activeNode = document.querySelector(`[data-model-id="${state.pinnedModelId}"]`);
        if (activeNode) positionFlyoutRelativeToAnchor(activeNode);
      }
    });
  }

  // Start application on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
