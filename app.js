const problemCatalog = window.problemCatalog || [];

const groupOrder = [
  "哈希",
  "前缀和",
  "双指针",
  "滑动窗口",
  "单调队列",
  "子串",
  "普通数组",
  "矩阵",
  "链表",
  "二叉树",
  "图论",
  "回溯",
  "二分查找",
  "栈",
  "堆",
  "贪心算法",
  "动态规划",
  "多维动态规划",
  "中心扩展",
  "技巧"
];

const state = {
  current: Number(localStorage.getItem("hot100.current") || 1),
  filter: "all",
  query: "",
  mastered: new Set(JSON.parse(localStorage.getItem("hot100.mastered") || "[]"))
};

const elements = {
  list: document.getElementById("problemList"),
  search: document.getElementById("searchInput"),
  filters: [...document.querySelectorAll(".filter")],
  progress: document.getElementById("progressCount"),
  topic: document.getElementById("topicBadge"),
  index: document.getElementById("problemIndex"),
  title: document.getElementById("problemTitle"),
  subtitle: document.getElementById("problemSubtitle"),
  difficulty: document.getElementById("difficultyPill"),
  pending: document.getElementById("pendingBanner"),
  method: document.getElementById("methodText"),
  goal: document.getElementById("goalText"),
  complexity: document.getElementById("complexityText"),
  description: document.getElementById("descriptionText"),
  example: document.getElementById("exampleBlock"),
  thought: document.getElementById("thoughtText"),
  diagramSection: document.getElementById("diagramSection"),
  diagramFigure: document.getElementById("diagramFigure"),
  diagramImage: document.getElementById("diagramImage"),
  autoDiagram: document.getElementById("autoDiagram"),
  explanation: document.getElementById("explanationBlock"),
  code: document.getElementById("codeBlock"),
  copy: document.getElementById("copyButton"),
  copyStatus: document.getElementById("copyStatus"),
  master: document.getElementById("masterButton"),
  notes: document.getElementById("notesInput"),
  prev: document.getElementById("prevButton"),
  next: document.getElementById("nextButton"),
  card: document.querySelector(".card-shell")
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderInline(value) {
  return escapeHtml(value).replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
}

function highlightJava(code) {
  return code.split("\n").map(highlightJavaLine).join("\n");
}

function highlightJavaLine(line) {
  const commentIndex = line.indexOf("//");
  const source = commentIndex >= 0 ? line.slice(0, commentIndex) : line;
  const comment = commentIndex >= 0 ? line.slice(commentIndex) : "";

  return highlightJavaSource(source) +
    (comment ? `<span class="code-comment">${escapeHtml(comment)}</span>` : "");
}

function highlightJavaSource(source) {
  const strings = [];
  let html = escapeHtml(source).replace(/(&quot;.*?&quot;|&#039;.*?&#039;)/g, (match) => {
    const token = `\uE000${String.fromCharCode(65 + strings.length)}\uE001`;
    strings.push([token, `<span class="code-string">${match}</span>`]);
    return token;
  });

  html = html.replace(/\b(class|public|private|protected|return|if|else|for|while|new|import|continue|void|int|long|double|boolean|char|null|true|false|extends|this|super|break|do)\b/g, '<span class="code-keyword">$1</span>');
  html = html.replace(/\b(String|StringBuilder|List|ArrayList|LinkedList|HashMap|HashSet|LinkedHashMap|PriorityQueue|Queue|Deque|ArrayDeque|Stack|Map|Set|Arrays|Collections|Math|Integer|Long|TreeNode|ListNode|Node)\b/g, '<span class="code-type">$1</span>');
  html = html.replace(/\b(\d+)\b/g, '<span class="code-number">$1</span>');

  strings.forEach(([token, value]) => {
    html = html.replaceAll(token, value);
  });

  return html;
}

function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

function currentProblem() {
  return problemCatalog.find((problem) => problem.id === state.current) || problemCatalog[0];
}

function filteredProblems() {
  const query = state.query.trim().toLowerCase();

  return problemCatalog.filter((problem) => {
    const matchesQuery = !query ||
      problem.title.toLowerCase().includes(query) ||
      problem.english.toLowerCase().includes(query) ||
      problem.topic.toLowerCase().includes(query) ||
      problem.group.toLowerCase().includes(query);

    const matchesFilter =
      state.filter === "all" ||
      (state.filter === "mastered" && state.mastered.has(problem.id)) ||
      problem.difficulty === state.filter;

    return matchesQuery && matchesFilter;
  });
}

function groupProblems(problems) {
  const groups = new Map();
  problems.forEach((problem) => {
    const key = problem.group || "其他";
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key).push(problem);
  });

  return [...groups.entries()].sort((a, b) => {
    const ai = groupOrder.indexOf(a[0]);
    const bi = groupOrder.indexOf(b[0]);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });
}

function renderList() {
  const groups = groupProblems(filteredProblems());

  if (groups.length === 0) {
    elements.list.innerHTML = `
      <div class="empty-list">
        <strong>没有匹配的题目</strong>
        <span>换个关键词或筛选条件试试。</span>
      </div>
    `;
    return;
  }

  elements.list.innerHTML = groups.map(([group, problems]) => `
    <section class="problem-group">
      <button class="group-header" type="button" data-group="${escapeHtml(group)}">
        <span>${escapeHtml(group)}</span>
        <strong>${problems.length}</strong>
      </button>
      <div class="group-items">
        ${problems.map(renderProblemItem).join("")}
      </div>
    </section>
  `).join("");
}

function renderProblemItem(problem) {
  const active = problem.id === state.current ? " active" : "";
  const mastered = state.mastered.has(problem.id) ? " mastered" : "";
  const statusText = state.mastered.has(problem.id) ? "已掌握" : "未学";

  return `
    <button class="problem-item${active}${mastered}" type="button" data-id="${problem.id}">
      <span class="number-badge">${problem.id}</span>
      <span>
        <span class="item-title">${escapeHtml(problem.title)}</span>
        <span class="item-topic">${escapeHtml(problem.topic)} · ${escapeHtml(problem.difficulty)}</span>
      </span>
      <span class="status-pill">${statusText}</span>
    </button>
  `;
}

function buildAutoDiagram(problem) {
  const title = escapeHtml(problem.method);
  const goal = escapeHtml(problem.goal);
  const commonHeader = `
    <div class="diagram-caption">
      <strong>${escapeHtml(problem.group)} · ${title}</strong>
      <span>${goal}</span>
    </div>
  `;

  const templates = {
    "哈希": () => `
      ${commonHeader}
      <div class="hash-diagram">
        <div class="data-row"><span>输入</span><b>当前元素</b><b>目标关系</b></div>
        <div class="diagram-arrow">查找 / 记录</div>
        <div class="map-box">
          <p><span>key</span><strong>数字 / 状态</strong></p>
          <p><span>value</span><strong>下标 / 次数 / 分组</strong></p>
        </div>
        <div class="result-box">快速判断是否已经见过</div>
      </div>
    `,
    "前缀和": () => `
      ${commonHeader}
      <div class="hash-diagram">
        <div class="data-row"><span>当前位置</span><b>prefixSum</b><b>prefixSum - k</b></div>
        <div class="diagram-arrow">去 HashMap 里查</div>
        <div class="map-box">
          <p><span>key</span><strong>历史前缀和</strong></p>
          <p><span>value</span><strong>出现次数</strong></p>
        </div>
        <div class="result-box">中间这一段就是目标和</div>
      </div>
    `,
    "双指针": () => `
      ${commonHeader}
      <div class="pointer-line">
        <span class="pointer-tag left">left</span>
        <div class="cell active"></div><div class="cell"></div><div class="cell"></div><div class="cell focus"></div><div class="cell"></div><div class="cell active"></div>
        <span class="pointer-tag right">right</span>
      </div>
      <div class="diagram-note">先明确两个指针各自负责什么，再看哪一边移动。</div>
    `,
    "滑动窗口": () => `
      ${commonHeader}
      <div class="window-diagram">
        <span>L</span>
        <div class="outside"></div><div class="inside"></div><div class="inside"></div><div class="inside"></div><div class="outside"></div>
        <span>R</span>
      </div>
      <div class="diagram-note">窗口内始终维护一个条件；右边扩张，左边修正。</div>
    `,
    "单调队列": () => `
      ${commonHeader}
      <div class="stack-diagram">
        <div>队头：当前最大值</div><div>候选下标 3</div><div>候选下标 2</div><div>队尾：新元素进来前先清小值</div>
      </div>
      <div class="diagram-note">队头踢过期元素，队尾踢比新元素小的元素。</div>
    `,
    "子串": () => `
      ${commonHeader}
      <div class="window-diagram">
        <span>start</span>
        <div class="outside"></div><div class="inside"></div><div class="inside"></div><div class="inside"></div><div class="outside"></div>
        <span>end</span>
      </div>
      <div class="diagram-note">子串题先抓连续区间，再决定用窗口、前缀和或队列。</div>
    `,
    "普通数组": () => `
      ${commonHeader}
      <div class="array-diagram">
        <div>历史信息</div><div>当前元素</div><div>更新答案</div>
      </div>
      <div class="diagram-note">数组题重点看每次遍历保留了什么状态。</div>
    `,
    "矩阵": () => `
      ${commonHeader}
      <div class="matrix-diagram">
        ${Array.from({ length: 16 }, (_, i) => `<span class="${i === 0 || i === 3 || i === 12 || i === 15 ? "edge" : ""}"></span>`).join("")}
      </div>
      <div class="diagram-note">先定上下左右边界，再决定行列如何推进。</div>
    `,
    "链表": () => `
      ${commonHeader}
      <div class="list-diagram">
        <span>prev</span><b>1</b><i></i><span>cur</span><b>2</b><i></i><span>next</span><b>3</b>
      </div>
      <div class="diagram-note">改指针前先保存 next，再调整 prev / cur 的指向。</div>
    `,
    "二叉树": () => `
      ${commonHeader}
      <div class="tree-diagram">
        <div class="tree-node root">当前节点</div>
        <div class="tree-branches"><span></span><span></span></div>
        <div class="tree-level">
          <div class="tree-node">左子树返回值</div>
          <div class="tree-node">右子树返回值</div>
        </div>
      </div>
      <div class="diagram-note">树题先问递归函数返回什么，再看当前节点怎么合并左右结果。</div>
    `,
    "图论": () => `
      ${commonHeader}
      <div class="graph-diagram">
        <span>A</span><i></i><span>B</span><i></i><span>C</span>
        <em>visited</em>
      </div>
      <div class="diagram-note">先标记访问，再决定 DFS 走到底或 BFS 分层扩散。</div>
    `,
    "回溯": () => `
      ${commonHeader}
      <div class="backtrack-diagram">
        <div class="choice root">path</div>
        <div class="choice-row"><div class="choice">选择 A</div><div class="choice">选择 B</div><div class="choice">选择 C</div></div>
        <div class="choice-row lower"><div>递归</div><div>撤销选择</div><div>换下一个</div></div>
      </div>
      <div class="diagram-note">回溯永远看三步：做选择、递归、撤销选择。</div>
    `,
    "二分查找": () => `
      ${commonHeader}
      <div class="binary-diagram">
        <span>L</span><div></div><div></div><div class="mid">mid</div><div></div><div></div><span>R</span>
      </div>
      <div class="diagram-note">二分题重点是区间定义，以及 mid 判断后丢掉哪一半。</div>
    `,
    "栈": () => `
      ${commonHeader}
      <div class="stack-diagram">
        <div>top</div><div>候选 3</div><div>候选 2</div><div>候选 1</div>
      </div>
      <div class="diagram-note">先看栈里存值还是下标；出栈通常就是结算答案。</div>
    `,
    "堆": () => `
      ${commonHeader}
      <div class="heap-diagram">
        <div class="heap-node root">堆顶</div>
        <div class="heap-row"><div class="heap-node">候选</div><div class="heap-node">候选</div></div>
      </div>
      <div class="diagram-note">堆顶代表当前最优候选；固定大小堆常用于 Top K。</div>
    `,
    "贪心算法": () => `
      ${commonHeader}
      <div class="greedy-diagram">
        <div class="bar"><span style="width: 68%"></span></div>
        <div class="greedy-labels"><b>当前选择</b><b>维护最优边界</b></div>
      </div>
      <div class="diagram-note">贪心题先找局部选择，再看它维护了什么全局信息。</div>
    `,
    "动态规划": () => `
      ${commonHeader}
      <div class="dp-diagram one-d">
        <span>dp[0]</span><span>dp[1]</span><span class="from">dp[i-1]</span><span class="from">dp[i-2]</span><span class="target">dp[i]</span>
      </div>
      <div class="diagram-note">DP 先定义状态，再看当前状态从哪些旧状态转移过来。</div>
    `,
    "多维动态规划": () => `
      ${commonHeader}
      <div class="dp-grid">
        ${Array.from({ length: 16 }, (_, i) => `<span class="${i === 10 ? "target" : i === 6 || i === 9 || i === 5 ? "from" : ""}"></span>`).join("")}
      </div>
      <div class="diagram-note">二维 DP 看清 dp[i][j] 依赖上、左、左上还是其他状态。</div>
    `,
    "中心扩展": () => `
      ${commonHeader}
      <div class="window-diagram">
        <span>L</span>
        <div class="outside"></div><div class="inside"></div><div class="inside"></div><div class="inside"></div><div class="outside"></div>
        <span>R</span>
      </div>
      <div class="diagram-note">枚举中心后向两边扩展；同时考虑单中心和双中心。</div>
    `,
    "技巧": () => `
      ${commonHeader}
      <div class="trick-diagram">
        <div>不变量</div><i>→</i><div>一次遍历</div><i>→</i><div>答案</div>
      </div>
      <div class="diagram-note">技巧题不要背代码，先抓住不变量为什么一直成立。</div>
    `
  };

  const template = templates[problem.group] || templates["普通数组"];
  return template();
}

function renderDetail() {
  const problem = currentProblem();
  const mastered = state.mastered.has(problem.id);

  document.title = `${problem.id}. ${problem.title} - Hot 100 题卡`;
  localStorage.setItem("hot100.current", String(problem.id));

  elements.topic.textContent = `${problem.group} · ${problem.topic}`;
  elements.index.textContent = `Hot 100 第 ${problem.id} 题`;
  elements.title.textContent = problem.title;
  elements.subtitle.textContent = problem.english;

  elements.difficulty.textContent = problem.difficulty;
  elements.difficulty.className = `difficulty-pill difficulty-${problem.difficulty}`;
  elements.pending.hidden = true;

  elements.method.textContent = problem.method;
  elements.goal.textContent = problem.goal;
  elements.complexity.textContent = problem.complexity;
  elements.description.innerHTML = renderInline(problem.description);
  elements.example.textContent = problem.example;
  elements.thought.innerHTML = renderInline(problem.thought);

  if (problem.diagram) {
    elements.diagramSection.hidden = false;
    elements.diagramFigure.hidden = false;
    elements.autoDiagram.hidden = true;
    elements.diagramImage.src = problem.diagram;
    elements.diagramImage.alt = problem.diagramAlt || `${problem.title} 图解`;
  } else {
    elements.diagramSection.hidden = false;
    elements.diagramFigure.hidden = true;
    elements.autoDiagram.hidden = false;
    elements.autoDiagram.innerHTML = buildAutoDiagram(problem);
    elements.diagramImage.removeAttribute("src");
    elements.diagramImage.alt = "";
  }

  elements.explanation.innerHTML = problem.explanation.map((line) => `<p>${renderInline(line)}</p>`).join("");
  elements.code.innerHTML = highlightJava(problem.code);
  elements.master.textContent = mastered ? "已掌握" : "标记掌握";
  elements.master.classList.toggle("active", mastered);
  elements.prev.disabled = problem.id === 1;
  elements.next.disabled = problem.id === problemCatalog.length;
  elements.notes.value = localStorage.getItem(`hot100.notes.${problem.id}`) || "";
  elements.copyStatus.textContent = "";
}

function renderProgress() {
  elements.progress.textContent = String(state.mastered.size);
}

function render() {
  renderProgress();
  renderList();
  renderDetail();
}

function scrollToCard() {
  requestAnimationFrame(() => {
    elements.card.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
}

function selectProblem(id, shouldScroll = true) {
  state.current = Math.min(Math.max(id, 1), problemCatalog.length);
  render();

  if (shouldScroll) {
    scrollToCard();
  }
}

elements.list.addEventListener("click", (event) => {
  const button = event.target.closest(".problem-item");
  if (!button) {
    return;
  }
  selectProblem(Number(button.dataset.id));
});

elements.search.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderList();
});

elements.filters.forEach((button) => {
  button.addEventListener("click", () => {
    state.filter = button.dataset.filter;
    elements.filters.forEach((item) => item.classList.toggle("active", item === button));
    renderList();
  });
});

elements.copy.addEventListener("click", async () => {
  const problem = currentProblem();

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(problem.code);
    } else {
      fallbackCopy(problem.code);
    }
    elements.copyStatus.textContent = "已复制";
  } catch (error) {
    fallbackCopy(problem.code);
    elements.copyStatus.textContent = "已复制";
  }

  window.setTimeout(() => {
    elements.copyStatus.textContent = "";
  }, 1400);
});

elements.master.addEventListener("click", () => {
  const problem = currentProblem();

  if (state.mastered.has(problem.id)) {
    state.mastered.delete(problem.id);
  } else {
    state.mastered.add(problem.id);
  }

  localStorage.setItem("hot100.mastered", JSON.stringify([...state.mastered]));
  render();
});

elements.notes.addEventListener("input", () => {
  const problem = currentProblem();
  localStorage.setItem(`hot100.notes.${problem.id}`, elements.notes.value);
});

elements.prev.addEventListener("click", () => selectProblem(state.current - 1, false));
elements.next.addEventListener("click", () => selectProblem(state.current + 1, false));

document.addEventListener("keydown", (event) => {
  if (event.target.matches("input, textarea")) {
    return;
  }

  if (event.key === "ArrowLeft") {
    selectProblem(state.current - 1);
  }

  if (event.key === "ArrowRight") {
    selectProblem(state.current + 1);
  }
});

render();
