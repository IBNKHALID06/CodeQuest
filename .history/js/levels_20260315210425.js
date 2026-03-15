'use strict';

/**
 * CodeQuest — 15-Level HTML Learning Course
 * Teaches HTML fundamentals progressively with lessons
 */

const LEVELS = [
  {
    id: 1, xp: 100, badge: '🏷️', chapter: 'HTML Basics', title: 'Your First Tag',
    lesson: '<p><strong>Headings</strong> are titles. HTML has 6 levels: <span class="code-inline">&lt;h1&gt;</span> to <span class="code-inline">&lt;h6&gt;</span>. h1 is biggest.</p><p>Format: <span class="code-inline">&lt;h1&gt;Your text&lt;/h1&gt;</span></p>',
    description: 'Create a big heading that says exactly <span class="code-inline">Hello, World!</span>',
    smallHint: 'Use the h1 tag with opening and closing brackets.',
    fullHint: '&lt;h1&gt;Hello, World!&lt;/h1&gt;',
    startCode: '',
    validate(doc, code) {
      return code.includes('<h1>') && code.includes('</h1>') &&
             doc.querySelector('h1')?.textContent.trim() === 'Hello, World!';
    }
  },

  {
    id: 2, xp: 100, badge: '📝', chapter: 'HTML Basics', title: 'Tell Your Story',
    lesson: '<p><strong>Paragraphs</strong> are text blocks. Use <span class="code-inline">&lt;p&gt;</span> to wrap text.</p><p>Browsers add space before and after each paragraph automatically.</p>',
    description: 'Write a paragraph. Any text inside the <span class="code-inline">&lt;p&gt;</span> tag works!',
    smallHint: 'Same pattern: opening tag, text, closing tag.',
    fullHint: '&lt;p&gt;I am learning HTML!&lt;/p&gt;',
    startCode: '',
    validate(doc, code) {
      return code.includes('<p>') && code.includes('</p>') &&
             doc.querySelector('p')?.textContent.trim().length > 0;
    }
  },

  {
    id: 3, xp: 150, badge: '💪', chapter: 'Text Formatting', title: 'Make it Bold',
    lesson: '<p><span class="code-inline">&lt;strong&gt;</span> makes text <strong>bold</strong> AND semantic (important).</p><p><span class="code-inline">&lt;b&gt;</span> just makes it bold visually.</p><p>Both work for this challenge!</p>',
    description: 'Make the word <span class="code-inline">Important</span> appear bold.',
    smallHint: 'Wrap the word with &lt;strong&gt; or &lt;b&gt; tags.',
    fullHint: '&lt;strong&gt;Important&lt;/strong&gt;',
    startCode: '',
    validate(doc, code) {
      const hasOpen = code.includes('<strong>') || code.includes('<b>');
      const hasClose = code.includes('</strong>') || code.includes('</b>');
      const el = doc.querySelector('strong, b');
      return hasOpen && hasClose && el?.textContent.trim() === 'Important';
    }
  },

  {
    id: 4, xp: 150, badge: '🎨', chapter: 'Text Formatting', title: 'Make it Italic',
    lesson: '<p><span class="code-inline">&lt;em&gt;</span> (emphasis) makes text <em>italic</em> AND semantic.</p><p><span class="code-inline">&lt;i&gt;</span> just makes it italic visually.</p><p>Use <span class="code-inline">&lt;em&gt;</span> for meaning, <span class="code-inline">&lt;i&gt;</span> for pure styling.</p>',
    description: 'Make the word <span class="code-inline">Awesome</span> appear italic.',
    smallHint: 'Wrap with &lt;em&gt; or &lt;i&gt; tags.',
    fullHint: '&lt;em&gt;Awesome&lt;/em&gt;',
    startCode: '',
    validate(doc, code) {
      const hasOpen = code.includes('<em>') || code.includes('<i>');
      const hasClose = code.includes('</em>') || code.includes('</i>');
      const el = doc.querySelector('em, i');
      return hasOpen && hasClose && el?.textContent.trim() === 'Awesome';
    }
  },

  {
    id: 5, xp: 175, badge: '🔗', chapter: 'Links & Navigation', title: 'Create a Link',
    lesson: '<p><strong>Links</strong> connect the web! The &lt;a&gt; tag makes clickable text.</p><p>The <span class="code-inline">href</span> attribute tells where to go: <span class="code-inline">&lt;a href="url"&gt;Text&lt;/a&gt;</span></p><p>Users see and click the text between the tags.</p>',
    description: 'Create a link saying <span class="code-inline">Click here</span> pointing to <span class="code-inline">https://google.com</span>',
    smallHint: 'href goes in the opening tag: &lt;a href="..."&gt;text&lt;/a&gt;',
    fullHint: '&lt;a href="https://google.com"&gt;Click here&lt;/a&gt;',
    startCode: '',
    validate(doc, code) {
      const el = doc.querySelector('a');
      const href = el?.getAttribute('href') || '';
      return code.includes('<a') && code.includes('</a>') &&
             el?.textContent.trim() === 'Click here' &&
             href.includes('google.com');
    }
  },

  {
    id: 6, xp: 175, badge: '🖼️', chapter: 'Media & Images', title: 'Add an Image',
    lesson: '<p>The <span class="code-inline">&lt;img&gt;</span> tag adds images.</p><p>It\'s <strong>self-closing</strong> (no closing tag needed!).</p><p><span class="code-inline">src</span> = image URL<br><span class="code-inline">alt</span> = description for accessibility</p><p>Format: <span class="code-inline">&lt;img src="url" alt="description"&gt;</span></p>',
    description: 'Add an image with any src URL. Include an alt attribute!',
    smallHint: 'Self-closing: &lt;img src="..." alt="..."&gt; (no closing &lt;/img&gt;)',
    fullHint: '&lt;img src="https://picsum.photos/200" alt="Random photo"&gt;',
    startCode: '',
    validate(doc, code) {
      const el = doc.querySelector('img');
      const src = el?.getAttribute('src');
      const alt = el?.getAttribute('alt');
      return code.includes('<img') && code.includes('src=') && code.includes('alt=') &&
             src && src.trim().length > 0 && alt && alt.trim().length > 0;
    }
  },

  {
    id: 7, xp: 200, badge: '📋', chapter: 'Lists', title: 'Unordered List',
    lesson: '<p><span class="code-inline">&lt;ul&gt;</span> = <strong>unordered</strong> list (bullets).</p><p>Each item uses <span class="code-inline">&lt;li&gt;</span>.</p><p>Structure:<br><span class="code-inline">&lt;ul&gt;</span><br><span class="code-inline">&nbsp;&nbsp;&lt;li&gt;Item 1&lt;/li&gt;</span><br><span class="code-inline">&nbsp;&nbsp;&lt;li&gt;Item 2&lt;/li&gt;</span><br><span class="code-inline">&lt;/ul&gt;</span></p>',
    description: 'Create an unordered list with <strong>at least 3 items</strong>.',
    smallHint: '&lt;ul&gt; wrapper, &lt;li&gt; for each item. Remember closing tags!',
    fullHint: '&lt;ul&gt;&lt;li&gt;Item 1&lt;/li&gt;&lt;li&gt;Item 2&lt;/li&gt;&lt;li&gt;Item 3&lt;/li&gt;&lt;/ul&gt;',
    startCode: '',
    validate(doc, code) {
      const ul = doc.querySelector('ul');
      if (!ul || !code.includes('<ul>') || !code.includes('</ul>')) return false;
      const liCount = ul.querySelectorAll('li').length;
      return liCount >= 3 && code.match(/<li>/g) && code.match(/<\/li>/g);
    }
  },

  {
    id: 8, xp: 200, badge: '#️⃣', chapter: 'Lists', title: 'Ordered List',
    lesson: '<p><span class="code-inline">&lt;ol&gt;</span> = <strong>ordered</strong> list (numbered).</p><p>Same structure as &lt;ul&gt;, but the browser numbers items automatically.</p><p>Use ol for: recipes, steps, rankings.<br>Use ul for: shopping lists, features, choices.</p>',
    description: 'Create an ordered list with <strong>at least 2 items</strong>.',
    smallHint: '&lt;ol&gt; instead of &lt;ul&gt;. Items still use &lt;li&gt;.',
    fullHint: '&lt;ol&gt;&lt;li&gt;First&lt;/li&gt;&lt;li&gt;Second&lt;/li&gt;&lt;/ol&gt;',
    startCode: '',
    validate(doc, code) {
      const ol = doc.querySelector('ol');
      if (!ol || !code.includes('<ol>') || !code.includes('</ol>')) return false;
      const liCount = ol.querySelectorAll('li').length;
      return liCount >= 2 && code.match(/<li>/g) && code.match(/<\/li>/g);
    }
  },

  {
    id: 9, xp: 200, badge: '⚙️', chapter: 'Interactivity', title: 'Add a Button',
    lesson: '<p>The <span class="code-inline">&lt;button&gt;</span> creates a clickable button.</p><p>By itself it just sits there, but with JavaScript you can make it do things!</p><p>Users see the text between tags and can click the button.</p>',
    description: 'Create a button that says exactly <span class="code-inline">Click Me!</span>',
    smallHint: 'Simple: &lt;button&gt;Your text&lt;/button&gt;',
    fullHint: '&lt;button&gt;Click Me!&lt;/button&gt;',
    startCode: '',
    validate(doc, code) {
      const el = doc.querySelector('button');
      return code.includes('<button>') && code.includes('</button>') &&
             el?.textContent.trim() === 'Click Me!';
    }
  },

  {
    id: 10, xp: 225, badge: '⌨️', chapter: 'Forms', title: 'Text Input Field',
    lesson: '<p>The <span class="code-inline">&lt;input&gt;</span> tag lets users type text.</p><p>It\'s <strong>self-closing</strong> (no closing tag!).</p><p><span class="code-inline">type="text"</span> = text input<br><span class="code-inline">placeholder</span> = hint text shown before typing</p>',
    description: 'Create a text input with placeholder <span class="code-inline">Enter your name</span>',
    smallHint: 'Self-closing: &lt;input type="text" placeholder="..."&gt;',
    fullHint: '&lt;input type="text" placeholder="Enter your name"&gt;',
    startCode: '',
    validate(doc, code) {
      const el = doc.querySelector('input[type="text"]');
      const placeholder = el?.getAttribute('placeholder');
      return code.includes('<input') && code.includes('type="text"') &&
             code.includes('placeholder="Enter your name"') &&
             el && placeholder === 'Enter your name';
    }
  },

  {
    id: 11, xp: 225, badge: '🏠', chapter: 'Structure', title: 'Semantic Structure',
    lesson: '<p>Web pages need <strong>structure</strong>. Semantic tags tell browsers what each section means:</p><p><span class="code-inline">&lt;header&gt;</span> = top (logo, title)<br><span class="code-inline">&lt;main&gt;</span> = primary content<br><span class="code-inline">&lt;footer&gt;</span> = bottom (copyright, links)</p><p>These help both humans and screen readers understand your page.</p>',
    description: 'Create a header, main, and footer section (can be empty).',
    smallHint: 'Three wrapping tags: &lt;header&gt;&lt;/header&gt;, &lt;main&gt;&lt;/main&gt;, &lt;footer&gt;&lt;/footer&gt;',
    fullHint: '&lt;header&gt;&lt;/header&gt;&lt;main&gt;&lt;/main&gt;&lt;footer&gt;&lt;/footer&gt;',
    startCode: '',
    validate(doc, code) {
      return code.includes('<header>') && code.includes('</header>') &&
             code.includes('<main>') && code.includes('</main>') &&
             code.includes('<footer>') && code.includes('</footer>') &&
             doc.querySelector('header') && doc.querySelector('main') && doc.querySelector('footer');
    }
  },

  {
    id: 12, xp: 250, badge: '📦', chapter: 'Structure', title: 'Container (Div)',
    lesson: '<p><span class="code-inline">&lt;div&gt;</span> is a <strong>generic container</strong>.</p><p>It has no special meaning — just a wrapper for grouping content and styling.</p><p>You\'ll use divs everywhere! They\'re essential for layout and organization.</p><p>Example: <span class="code-inline">&lt;div&gt;&lt;h1&gt;Title&lt;/h1&gt;&lt;p&gt;Text&lt;/p&gt;&lt;/div&gt;</span></p>',
    description: 'Create a div containing an h1 heading and a paragraph inside it.',
    smallHint: 'Put &lt;h1&gt; and &lt;p&gt; inside a &lt;div&gt; wrapper.',
    fullHint: '&lt;div&gt;&lt;h1&gt;My Title&lt;/h1&gt;&lt;p&gt;My content&lt;/p&gt;&lt;/div&gt;',
    startCode: '',
    validate(doc, code) {
      const div = doc.querySelector('div');
      const h1 = div?.querySelector('h1');
      const p = div?.querySelector('p');
      return code.includes('<div>') && code.includes('</div>') &&
             code.includes('<h1>') && code.includes('</h1>') &&
             code.includes('<p>') && code.includes('</p>') &&
             h1 && h1.textContent.trim().length > 0 &&
             p && p.textContent.trim().length > 0;
    }
  },

  {
    id: 13, xp: 250, badge: '📄', chapter: 'Building', title: 'Simple Page',
    lesson: '<p>A real page structure combines what you\'ve learned:</p><p>✓ <span class="code-inline">&lt;header&gt;</span> with title<br>✓ <span class="code-inline">&lt;main&gt;</span> with content (h1, p, lists, etc.)<br>✓ <span class="code-inline">&lt;footer&gt;</span> with links/copyright</p><p>Structure first, content second, then CSS styling!</p>',
    description: 'Build a page with: header + h1 with your name, main + paragraph, footer + any text',
    smallHint: 'Use header/main/footer sections. Put h1 in header, p in main, text in footer.',
    fullHint: '&lt;header&gt;&lt;h1&gt;Sarah&lt;/h1&gt;&lt;/header&gt;&lt;main&gt;&lt;p&gt;About me&lt;/p&gt;&lt;/main&gt;&lt;footer&gt;© 2026&lt;/footer&gt;',
    startCode: '',
    validate(doc, code) {
      const header = doc.querySelector('header');
      const main = doc.querySelector('main');
      const footer = doc.querySelector('footer');
      const h1 = header?.querySelector('h1');
      const p = main?.querySelector('p');
      return code.includes('<header>') && code.includes('</header>') &&
             code.includes('<main>') && code.includes('</main>') &&
             code.includes('<footer>') && code.includes('</footer>') &&
             h1 && h1.textContent.trim().length > 0 &&
             p && p.textContent.trim().length > 0 &&
             footer && footer.textContent.trim().length > 0;
    }
  },

  {
    id: 14, xp: 300, badge: '🎯', chapter: 'Advanced', title: 'Attributes & Classes',
    lesson: '<p><strong>Attributes</strong> give HTML elements extra information:</p><p><span class="code-inline">href</span> tells links where to go<br><span class="code-inline">src</span> tells images where the file is<br><span class="code-inline">alt</span> describes images for accessibility<br><span class="code-inline">placeholder</span> hints at input fields</p><p>The <span class="code-inline">class</span> attribute is special — it groups elements so CSS can style them together. No two elements need class names to match, but when they do, they share the same styling!</p><p><span class="code-inline">class</span> goes in the opening tag: <span class="code-inline">&lt;tag class="name"&gt;content&lt;/tag&gt;</span></p>',
    description: 'Create a paragraph with the class <span class="code-inline">intro</span>',
    smallHint: 'Add class="intro" as an attribute inside the opening &lt;p&gt; tag.',
    fullHint: '&lt;p class="intro"&gt;Welcome to my website!&lt;/p&gt;',
    startCode: '',
    validate(doc, code) {
      const p = doc.querySelector('p.intro');
      return code.includes('class="intro"') && code.includes('<p') && code.includes('</p>') &&
             p && p.textContent.trim().length > 0;
    }
  },

  {
    id: 15, xp: 300, badge: '👑', chapter: 'Boss Level', title: 'Complete Profile Card',
    lesson: '<p>You\'ve learned: structure, formatting, links, images, lists, buttons, inputs, and attributes!</p><p>Time to combine everything into a real profile card:</p><p>✓ h2 heading (name)<br>✓ Paragraph (bio)<br>✓ List (skills/hobbies)<br>✓ Link (GitHub/portfolio)<br>✓ Image (photo)</p><p>This is real web development!</p>',
    description: `Build a complete profile card with:
      <br>• An &lt;h2&gt; heading with your name
      <br>• A paragraph describing yourself
      <br>• A list with 3+ hobbies or skills
      <br>• A link (GitHub, portfolio, etc.)
      <br>• An image (photo or avatar)`,
    smallHint: 'Combine h2, p, ul/li, a, and img. Wrap in a div for organization.',
    fullHint: '&lt;div&gt;&lt;h2&gt;John&lt;/h2&gt;&lt;p&gt;Web developer&lt;/p&gt;&lt;ul&gt;&lt;li&gt;Code&lt;/li&gt;&lt;li&gt;design&lt;/li&gt;&lt;/ul&gt;&lt;a href="..."&gt;GitHub&lt;/a&gt;&lt;img src="..." alt="me"&gt;&lt;/div&gt;',
    startCode: '',
    validate(doc, code) {
      const h2 = doc.querySelector('h2');
      const p = doc.querySelector('p');
      const ul = doc.querySelector('ul');
      const li = ul?.querySelectorAll('li') || [];
      const a = doc.querySelector('a');
      const img = doc.querySelector('img');
      const imgSrc = img?.getAttribute('src');
      
      return code.includes('<h2>') && code.includes('</h2>') &&
             code.includes('<p>') && code.includes('</p>') &&
             code.includes('<ul>') && code.includes('</ul>') &&
             h2 && h2.textContent.trim().length > 0 &&
             p && p.textContent.trim().length > 0 &&
             li.length >= 3 &&
             a && a.textContent.trim().length > 0 &&
             img && imgSrc && imgSrc.trim().length > 0;
    }
  },

  {
    id: 16, xp: 250, badge: '📋', chapter: 'Forms', title: 'Build a Form',
    lesson: '<p>A <span class="code-inline">&lt;form&gt;</span> collects user input. It wraps input fields and buttons.</p><p><span class="code-inline">&lt;label&gt;</span> describes inputs for accessibility.<br><span class="code-inline">&lt;input&gt;</span> accepts user data (we saw this before!).<br><span class="code-inline">&lt;button&gt;</span> submits the form.</p><p>Structure:<br><span class="code-inline">&lt;form&gt;</span><br><span class="code-inline">&nbsp;&nbsp;&lt;label&gt;Name:&lt;/label&gt;</span><br><span class="code-inline">&nbsp;&nbsp;&lt;input type="text"&gt;</span><br><span class="code-inline">&nbsp;&nbsp;&lt;button&gt;Submit&lt;/button&gt;</span><br><span class="code-inline">&lt;/form&gt;</span></p>',
    description: 'Create a form with: a label "Email:", an input field, and a Submit button.',
    smallHint: 'Use &lt;form&gt; wrapper, &lt;label&gt;, &lt;input&gt;, and &lt;button&gt;.',
    fullHint: '&lt;form&gt;&lt;label&gt;Email:&lt;/label&gt;&lt;input type="email"&gt;&lt;button&gt;Submit&lt;/button&gt;&lt;/form&gt;',
    startCode: '',
    validate(doc, code) {
      const form = doc.querySelector('form');
      const label = form?.querySelector('label');
      const input = form?.querySelector('input');
      const btn = form?.querySelector('button');
      return code.includes('<form>') && code.includes('</form>') &&
             code.includes('<label>') && code.includes('</label>') &&
             code.includes('<input') && code.includes('<button>') && code.includes('</button>') &&
             label && label.textContent.includes('Email') &&
             input && btn && btn.textContent.trim() === 'Submit';
    }
  },

  {
    id: 17, xp: 275, badge: '📝', chapter: 'Forms', title: 'Textarea & Dropdowns',
    lesson: '<p><span class="code-inline">&lt;textarea&gt;</span> is for multi-line text input (longer messages, comments).</p><p><span class="code-inline">&lt;select&gt;</span> creates a dropdown menu.<br><span class="code-inline">&lt;option&gt;</span> defines each choice in the dropdown.</p><p>Textarea: <span class="code-inline">&lt;textarea rows="5"&gt;&lt;/textarea&gt;</span><br><br>Dropdown:<br><span class="code-inline">&lt;select&gt;&lt;option&gt;Choice 1&lt;/option&gt;&lt;option&gt;Choice 2&lt;/option&gt;&lt;/select&gt;</span></p>',
    description: 'Create a textarea and a select dropdown with 2+ options.',
    smallHint: '&lt;textarea&gt;&lt;/textarea&gt; for text, &lt;select&gt; with &lt;option&gt; tags inside.',
    fullHint: '&lt;textarea rows="5"&gt;&lt;/textarea&gt;&lt;select&gt;&lt;option&gt;Option 1&lt;/option&gt;&lt;option&gt;Option 2&lt;/option&gt;&lt;/select&gt;',
    startCode: '',
    validate(doc, code) {
      const textarea = doc.querySelector('textarea');
      const select = doc.querySelector('select');
      const options = select?.querySelectorAll('option') || [];
      return code.includes('<textarea') && code.includes('</textarea>') &&
             code.includes('<select>') && code.includes('</select>') &&
             code.match(/<option>/g) && code.match(/<\/option>/g) &&
             textarea && select && options.length >= 2;
    }
  },

  {
    id: 18, xp: 300, badge: '📊', chapter: 'Data & Structure', title: 'Create a Table',
    lesson: '<p><span class="code-inline">&lt;table&gt;</span> displays structured data in rows and columns.</p><p><span class="code-inline">&lt;tr&gt;</span> = table row<br><span class="code-inline">&lt;th&gt;</span> = table header (bold, semantic)<br><span class="code-inline">&lt;td&gt;</span> = table data (regular cell)</p><p>Structure:<br><span class="code-inline">&lt;table&gt;</span><br><span class="code-inline">&nbsp;&nbsp;&lt;tr&gt;&lt;th&gt;Name&lt;/th&gt;&lt;th&gt;Age&lt;/th&gt;&lt;/tr&gt;</span><br><span class="code-inline">&nbsp;&nbsp;&lt;tr&gt;&lt;td&gt;Alice&lt;/td&gt;&lt;td&gt;25&lt;/td&gt;&lt;/tr&gt;</span><br><span class="code-inline">&lt;/table&gt;</span></p>',
    description: 'Create a table with: a header row (2+ columns) and 2+ data rows.',
    smallHint: 'Use &lt;table&gt;, &lt;tr&gt; for rows, &lt;th&gt; for headers, &lt;td&gt; for data.',
    fullHint: '&lt;table&gt;&lt;tr&gt;&lt;th&gt;Name&lt;/th&gt;&lt;th&gt;City&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;Alice&lt;/td&gt;&lt;td&gt;NYC&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;Bob&lt;/td&gt;&lt;td&gt;LA&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;',
    startCode: '',
    validate(doc, code) {
      const table = doc.querySelector('table');
      const rows = table?.querySelectorAll('tr') || [];
      const headers = table?.querySelectorAll('th') || [];
      const cells = table?.querySelectorAll('td') || [];
      // Must have at least 3 rows (1 header + 2 data rows)
      // Must have at least 2 headers AND at least 4+ cells (2 per data row minimum)
      return rows.length >= 3 && headers.length >= 2 && cells.length >= 4 &&
             code.includes('<table>') && code.includes('</table>') &&
             code.includes('<tr>') && code.includes('</tr>') &&
             code.includes('<th>') && code.includes('</th>') &&
             code.includes('<td>') && code.includes('</td>');
    }
  },

  {
    id: 19, xp: 300, badge: '🔗', chapter: 'Advanced', title: 'Comments & Linking',
    lesson: '<p><span class="code-inline">&lt;!-- comment --&gt;</span> = HTML comment (browsers ignore it).</p><p>Use comments to document your code!</p><p><span class="code-inline">&lt;link&gt;</span> (in &lt;head&gt;) connects CSS files:<br><span class="code-inline">&lt;link rel="stylesheet" href="style.css"&gt;</span></p><p><span class="code-inline">&lt;script&gt;</span> (usually at end of &lt;body&gt;) loads JavaScript:<br><span class="code-inline">&lt;script src="app.js"&gt;&lt;/script&gt;</span></p><p>HTML is the skeleton, CSS is the style, JavaScript is the behavior!</p>',
    description: 'Create: an HTML comment, a link to "styles.css", and a script tag to "main.js"',
    smallHint: 'Comment: &lt;!-- text --&gt;<br>Link: &lt;link rel="stylesheet" href="..."&gt;<br>Script: &lt;script src="..."&gt;&lt;/script&gt;',
    fullHint: '&lt;!-- This is a comment --&gt;&lt;link rel="stylesheet" href="styles.css"&gt;&lt;script src="main.js"&gt;&lt;/script&gt;',
    startCode: '',
    validate(doc, code) {
      return code.includes('<!--') && code.includes('-->') &&
             code.includes('href="styles.css"') &&
             code.includes('src="main.js"') &&
             code.includes('<link') && code.includes('<script') && code.includes('</script>');
    }
  }
];

