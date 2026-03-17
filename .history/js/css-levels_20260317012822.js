// ═══════════════════════════════════════════════════════════════════════════
// CSS TRACK — 15 Levels
// Learn CSS by styling pre-built HTML with real-time validation
// ═══════════════════════════════════════════════════════════════════════════

const CSS_LEVELS = [
  {
    id: 1, xp: 150, badge: '🎨', chapter: 'CSS Basics', title: 'First Color',
    lesson: '<p><span class="code-inline">color</span> changes text color.</p><p>In CSS, write:<br><span class="code-inline">h1 { color: red; }</span></p><p>This makes all &lt;h1&gt; elements red! Try: red, blue, green, purple, etc.</p>',
    description: 'Style the h1 element to be red.',
    smallHint: 'Use "h1 { color: red; }" to make headings red.',
    fullHint: 'h1 { color: red; }',
    startCode: 'h1 {\n  \n}',
    htmlTarget: '<h1>Hello, CSS!</h1><p>Learn styling here</p>',
    validate(sheet, code) {
      const h1 = document.querySelector('h1');
      if (!h1) return false;
      const color = window.getComputedStyle(h1).color;
      return code.includes('h1') && code.includes('color') && code.includes('red') &&
             (color.includes('255') && !color.includes('0') || color.toLowerCase().includes('red'));
    }
  },

  {
    id: 2, xp: 150, badge: '📝', chapter: 'CSS Basics', title: 'Font Size',
    lesson: '<p><span class="code-inline">font-size</span> changes text size.</p><p>Example:<br><span class="code-inline">p { font-size: 24px; }</span></p><p>Units: px (pixels), em, rem, etc.</p>',
    description: 'Make all paragraphs 20px in size.',
    smallHint: 'Use p { font-size: 20px; }',
    fullHint: 'p { font-size: 20px; }',
    startCode: 'p {\n  \n}',
    htmlTarget: '<h1>Title</h1><p>This is a paragraph</p><p>Another paragraph</p>',
    validate(sheet, code) {
      const p = document.querySelector('p');
      if (!p) return false;
      const size = window.getComputedStyle(p).fontSize;
      return code.includes('p') && code.includes('font-size') && code.includes('20') &&
             parseInt(size) === 20;
    }
  },

  {
    id: 3, xp: 150, badge: '🎯', chapter: 'CSS Basics', title: 'Class Selector',
    lesson: '<p><span class="code-inline">.classname</span> targets elements with class="classname".</p><p>Example:<br><span class="code-inline">.highlight { background-color: yellow; }</span></p><p>Then use in HTML: &lt;p class="highlight"&gt;Highlighted&lt;/p&gt;</p>',
    description: 'Make elements with class="special" have a blue background.',
    smallHint: 'Use .special { background-color: blue; }',
    fullHint: '.special { background-color: blue; }',
    startCode: '.special {\n  \n}',
    htmlTarget: '<p>Normal</p><p class="special">I am special!</p>',
    validate(sheet, code) {
      const special = document.querySelector('.special');
      if (!special) return false;
      const bg = window.getComputedStyle(special).backgroundColor;
      return code.includes('.special') && code.includes('background-color') && code.includes('blue') &&
             (bg.includes('0') && bg.includes('0') && bg.includes('255') || bg.toLowerCase().includes('blue'));
    }
  },

  {
    id: 4, xp: 150, badge: '#️⃣', chapter: 'CSS Basics', title: 'ID Selector',
    lesson: '<p><span class="code-inline">#idname</span> targets element with id="idname".</p><p>Example:<br><span class="code-inline">#main { color: green; }</span></p><p>ID is unique — only one element should have id="main".</p>',
    description: 'Make the element with id="title" have green text.',
    smallHint: 'Use #title { color: green; }',
    fullHint: '#title { color: green; }',
    startCode: '#title {\n  \n}',
    htmlTarget: '<h1 id="title">My Title</h1><p>Some text below</p>',
    validate(sheet, code) {
      const title = document.getElementById('title');
      if (!title) return false;
      const color = window.getComputedStyle(title).color;
      return code.includes('#title') && code.includes('color') && code.includes('green') &&
             (color.includes('0') && color.includes('128') || color.toLowerCase().includes('green'));
    }
  },

  {
    id: 5, xp: 175, badge: '📦', chapter: 'Box Model', title: 'Margin & Padding',
    lesson: '<p><strong>Margin:</strong> Space OUTSIDE an element<br><strong>Padding:</strong> Space INSIDE</p><p>Example:<br><span class="code-inline">div { margin: 20px; padding: 10px; }</span></p><p>Remember: Margin pushes away, Padding pushes in!</p>',
    description: 'Add 15px padding and 10px margin to boxes with class="box".',
    smallHint: 'Use .box { padding: 15px; margin: 10px; }',
    fullHint: '.box { padding: 15px; margin: 10px; }',
    startCode: '.box {\n  \n}',
    htmlTarget: '<div class="box">Box 1</div><div class="box">Box 2</div>',
    validate(sheet, code) {
      const box = document.querySelector('.box');
      if (!box) return false;
      const padding = window.getComputedStyle(box).padding;
      const margin = window.getComputedStyle(box).margin;
      return code.includes('.box') && code.includes('padding') && code.includes('15') &&
             code.includes('margin') && code.includes('10') &&
             parseInt(padding) === 15 && parseInt(margin) === 10;
    }
  },

  {
    id: 6, xp: 175, badge: '🎨', chapter: 'Box Model', title: 'Border Styling',
    lesson: '<p><span class="code-inline">border</span> creates a frame around elements.</p><p>Example:<br><span class="code-inline">div { border: 2px solid black; }</span></p><p>Format: [width] [style] [color]<br>Styles: solid, dashed, dotted, double</p>',
    description: 'Add a 3px solid red border to all divs.',
    smallHint: 'Use div { border: 3px solid red; }',
    fullHint: 'div { border: 3px solid red; }',
    startCode: 'div {\n  \n}',
    htmlTarget: '<div>Box A</div><div>Box B</div>',
    validate(sheet, code) {
      const div = document.querySelector('div');
      if (!div) return false;
      const border = window.getComputedStyle(div).borderWidth;
      return code.includes('div') && code.includes('border') && code.includes('3px') && 
             code.includes('solid') && code.includes('red') &&
             parseInt(border) === 3;
    }
  },

  {
    id: 7, xp: 200, badge: '📱', chapter: 'Flexbox', title: 'Flex Container',
    lesson: '<p><strong>Flexbox</strong> is a powerful layout system.</p><p><span class="code-inline">display: flex;</span> turns a container into a flex layout.</p><p>Then use <span class="code-inline">flex-direction</span>, <span class="code-inline">justify-content</span>, <span class="code-inline">align-items</span> to arrange items.</p>',
    description: 'Make the container use flexbox layout.',
    smallHint: 'Use .container { display: flex; }',
    fullHint: '.container { display: flex; }',
    startCode: '.container {\n  \n}',
    htmlTarget: '<div class="container"><div>Item 1</div><div>Item 2</div><div>Item 3</div></div>',
    validate(sheet, code) {
      const container = document.querySelector('.container');
      if (!container) return false;
      const display = window.getComputedStyle(container).display;
      return code.includes('.container') && code.includes('display') && code.includes('flex') &&
             display === 'flex';
    }
  },

  {
    id: 8, xp: 200, badge: '🎯', chapter: 'Flexbox', title: 'Flex Justify Content',
    lesson: '<p><span class="code-inline">justify-content</span> aligns items horizontally in flexbox.</p><p>Values: flex-start, flex-end, center, space-between, space-around, space-evenly</p><p>Example:<br><span class="code-inline">.flex { justify-content: center; }</span></p>',
    description: 'Center items horizontally using justify-content.',
    smallHint: 'Use .flex { justify-content: center; }',
    fullHint: '.flex { display: flex; justify-content: center; }',
    startCode: '.flex {\n  display: flex;\n  \n}',
    htmlTarget: '<div class="flex"><div>A</div><div>B</div><div>C</div></div>',
    validate(sheet, code) {
      const flex = document.querySelector('.flex');
      if (!flex) return false;
      const justify = window.getComputedStyle(flex).justifyContent;
      return code.includes('.flex') && code.includes('justify-content') && code.includes('center') &&
             justify === 'center';
    }
  },

  {
    id: 9, xp: 200, badge: '⚡', chapter: 'Flexbox', title: 'Flex Direction',
    lesson: '<p><span class="code-inline">flex-direction</span> changes flex layout orientation.</p><p>Values: row (default), column, row-reverse, column-reverse</p><p>Example: <span class="code-inline">.flex { flex-direction: column; }</span></p>',
    description: 'Change flex direction to column (stack vertically).',
    smallHint: 'Use .flex { flex-direction: column; }',
    fullHint: '.flex { display: flex; flex-direction: column; }',
    startCode: '.flex {\n  display: flex;\n  \n}',
    htmlTarget: '<div class="flex"><div>1</div><div>2</div><div>3</div></div>',
    validate(sheet, code) {
      const flex = document.querySelector('.flex');
      if (!flex) return false;
      const direction = window.getComputedStyle(flex).flexDirection;
      return code.includes('.flex') && code.includes('flex-direction') && code.includes('column') &&
             direction === 'column';
    }
  },

  {
    id: 10, xp: 225, badge: '#️⃣', chapter: 'Grid', title: 'CSS Grid Basics',
    lesson: '<p><strong>CSS Grid</strong> creates 2D layouts (rows AND columns).</p><p><span class="code-inline">display: grid;</span> activates grid.</p><p><span class="code-inline">grid-template-columns: 100px 100px;</span> creates 2 columns.</p><p><span class="code-inline">grid-template-rows: 50px 50px;</span> creates 2 rows.</p>',
    description: 'Create a grid with 2 columns and 2 rows (100px each).',
    smallHint: 'Use grid-template-columns and grid-template-rows with 100px values.',
    fullHint: '.grid { display: grid; grid-template-columns: 100px 100px; grid-template-rows: 100px 100px; }',
    startCode: '.grid {\n  display: grid;\n  \n}',
    htmlTarget: '<div class="grid"><div>A</div><div>B</div><div>C</div><div>D</div></div>',
    validate(sheet, code) {
      const grid = document.querySelector('.grid');
      if (!grid) return false;
      const display = window.getComputedStyle(grid).display;
      return code.includes('.grid') && code.includes('display') && code.includes('grid') &&
             code.includes('grid-template-columns') && code.includes('100px') &&
             code.includes('grid-template-rows') &&
             display === 'grid';
    }
  },

  {
    id: 11, xp: 250, badge: '🌐', chapter: 'Positioning', title: 'Absolute Positioning',
    lesson: '<p><span class="code-inline">position: absolute;</span> positions elements freely.</p><p>Use <span class="code-inline">top</span>, <span class="code-inline">right</span>, <span class="code-inline">bottom</span>, <span class="code-inline">left</span> to control placement.</p><p>Requires parent with <span class="code-inline">position: relative;</span></p>',
    description: 'Position the box 50px from top and 50px from left (absolute).',
    smallHint: 'Use position: absolute; top: 50px; left: 50px;',
    fullHint: '.box { position: absolute; top: 50px; left: 50px; }',
    startCode: '.box {\n  \n}',
    htmlTarget: '<div style="position: relative; height: 300px;"><div class="box">Move me!</div></div>',
    validate(sheet, code) {
      const box = document.querySelector('.box');
      if (!box) return false;
      const position = window.getComputedStyle(box).position;
      const top = parseInt(window.getComputedStyle(box).top);
      const left = parseInt(window.getComputedStyle(box).left);
      return code.includes('position') && code.includes('absolute') &&
             code.includes('top') && code.includes('50') &&
             code.includes('left') && position === 'absolute';
    }
  },

  {
    id: 12, xp: 250, badge: '⚙️', chapter: 'Animations', title: 'CSS Transitions',
    lesson: '<p><span class="code-inline">transition</span> smoothly animates property changes.</p><p>Example:<br><span class="code-inline">button { transition: background-color 0.3s; }</span></p><p>Then change color on hover: button:hover { background-color: blue; }</p>',
    description: 'Add a 0.5s transition to the button for all properties.',
    smallHint: 'Use button { transition: all 0.5s; }',
    fullHint: 'button { transition: all 0.5s; }\nbutton:hover { background-color: green; }',
    startCode: 'button {\n  background-color: blue;\n  \n}\nbutton:hover {\n  background-color: green;\n}',
    htmlTarget: '<button>Hover me!</button>',
    validate(sheet, code) {
      const btn = document.querySelector('button');
      if (!btn) return false;
      const transition = window.getComputedStyle(btn).transition;
      return code.includes('button') && code.includes('transition') && code.includes('0.5s') &&
             (code.includes('all') || code.includes('background-color'));
    }
  },

  {
    id: 13, xp: 250, badge: '📱', chapter: 'Responsive', title: 'Media Queries',
    lesson: '<p><span class="code-inline">@media</span> applies styles based on screen size.</p><p>Example:<br><span class="code-inline">@media (max-width: 600px) { body { font-size: 14px; } }</span></p><p>This makes text smaller on phones!</p>',
    description: 'Add a media query for screens smaller than 768px (change color to red).',
    smallHint: '@media (max-width: 768px) { h1 { color: red; } }',
    fullHint: '@media (max-width: 768px) { h1 { color: red; } }',
    startCode: 'h1 { color: blue; }\n\n',
    htmlTarget: '<h1>Responsive Text</h1>',
    validate(sheet, code) {
      return code.includes('@media') && code.includes('max-width') && code.includes('768') &&
             code.includes('h1') && code.includes('color') && code.includes('red');
    }
  },

  {
    id: 14, xp: 275, badge: '🎬', chapter: 'Advanced', title: 'Keyframe Animations',
    lesson: '<p><span class="code-inline">@keyframes</span> create custom animations.</p><p>Example:<br><span class="code-inline">@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }</span></p><p>Then: <span class="code-inline">div { animation: spin 2s; }</span></p>',
    description: 'Create a fadeIn keyframe animation (opacity 0 to 1) and apply it.',
    smallHint: '@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }\n.fade { animation: fadeIn 1s; }',
    fullHint: '@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }\n.fade { animation: fadeIn 1s; }',
    startCode: '@keyframes fadeIn {\n  \n}\n.fade {\n  \n}',
    htmlTarget: '<div class="fade">Fading in...</div>',
    validate(sheet, code) {
      return code.includes('@keyframes') && code.includes('fadeIn') &&
             code.includes('opacity') && code.includes('0') && code.includes('1') &&
             code.includes('animation') && code.includes('fadeIn');
    }
  },

  {
    id: 15, xp: 300, badge: '👑', chapter: 'Boss Level', title: 'Complete Styled Card',
    lesson: '<p>Time to combine everything!</p><p>Build a styled card with:<br>✓ Flexbox layout<br>✓ Border & padding<br>✓ Hover effects<br>✓ Responsive design<br>✓ Color palette</p>',
    description: 'Create a complete card: border, padding, flexbox, hover effect, colors.',
    smallHint: 'Use flexbox, add border, padding, background, and hover transition.',
    fullHint: '.card { display: flex; flex-direction: column; border: 2px solid blue; padding: 20px; margin: 10px; transition: transform 0.3s; }\n.card:hover { transform: scale(1.05); }',
    startCode: '.card {\n  \n}',
    htmlTarget: '<div class="card"><h2>Card Title</h2><p>Card content goes here</p></div>',
    validate(sheet, code) {
      const card = document.querySelector('.card');
      if (!card) return false;
      const display = window.getComputedStyle(card).display;
      return code.includes('.card') && code.includes('display') && code.includes('flex') &&
             code.includes('border') && code.includes('padding') && code.includes('20') &&
             code.includes('transition') && display === 'flex';
    }
  }
];
