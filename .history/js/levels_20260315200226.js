'use strict';

/**
 * CodeQuest Levels — HTML Learning Course
 * Each level has:
 *   - lesson: Teaching content (HTML string)
 *   - description: Challenge description
 *   - smallHint: Gentle guidance (no answer)
 *   - fullHint: Complete code example (penalized)
 *   - validate(doc, code): Validation function
 */

const LEVELS = [
  {
    id: 1,
    xp: 100,
    badge: '🏷️',
    chapter: 'HTML Basics',
    title: 'Your First Tag',
    lesson: `
      <p><strong>Headings</strong> are titles for web pages. HTML has 6 levels: <span class="code-inline">&lt;h1&gt;</span> (biggest) to <span class="code-inline">&lt;h6&gt;</span> (smallest).</p>
      <p>A heading needs: opening tag <span class="code-inline">&lt;h1&gt;</span>, then your text, then closing tag <span class="code-inline">&lt;/h1&gt;</span></p>
    `,
    description: 'Create a big heading that says exactly <span class="code-inline">Hello, World!</span>',
    smallHint: 'Use h1 tag. Don\'t forget: opening and closing tags!',
    fullHint: '&lt;h1&gt;Hello, World!&lt;/h1&gt;',
    startCode: '',
    validate(doc, code) {
      return code.includes('<h1>') && code.includes('</h1>') &&
             doc.querySelector('h1') !== null && 
             doc.querySelector('h1').textContent.trim() === 'Hello, World!';
    }
  },

  {
    id: 2,
    xp: 100,
    badge: '📝',
    chapter: 'HTML Basics',
    title: 'Tell Your Story',
    description: 'Write a paragraph using the <span class="code-inline">&lt;p&gt;</span> tag. Any text inside works!',
    tip: 'The &lt;p&gt; tag wraps a paragraph. Everything between the opening and closing tags becomes your text.',
    hint: '&lt;p&gt;I love learning to code!&lt;/p&gt;',
    startCode: '',
    validate(doc, code) {
      return code.includes('<p>') && code.includes('</p>') &&
             doc.querySelector('p') !== null && 
             doc.querySelector('p').textContent.trim().length > 0;
    }
  },

  {
    id: 3,
    xp: 150,
    badge: '💪',
    chapter: 'HTML Basics',
    title: 'Make it Bold',
    description: 'Make the word <span class="code-inline">Important</span> appear bold on the page.',
    tip: '&lt;strong&gt; adds semantic importance AND bold styling. &lt;b&gt; also works — both are correct!',
    hint: '&lt;strong&gt;Important&lt;/strong&gt;',
    startCode: '',
    validate(doc, code) {
      const hasOpen = code.includes('<strong>') || code.includes('<b>');
      const hasClose = code.includes('</strong>') || code.includes('</b>');
      const el = doc.querySelector('strong, b');
      return hasOpen && hasClose && el !== null && el.textContent.trim() === 'Important';
    }
  },

  {
    id: 4,
    xp: 150,
    badge: '🔗',
    chapter: 'Links & Media',
    title: 'Go Places',
    description: 'Create a link that says <span class="code-inline">Click here</span> and points to <span class="code-inline">https://google.com</span>',
    tip: 'The <strong>href</strong> attribute tells the browser where to go. The text between &lt;a&gt; tags is the clickable label.',
    hint: '&lt;a href="https://google.com"&gt;Click here&lt;/a&gt;',
    startCode: '',
    validate(doc, code) {
      const el = doc.querySelector('a');
      const href = el ? el.getAttribute('href') : '';
      return (
        code.includes('<a') && code.includes('</a>') &&
        el !== null &&
        el.textContent.trim() === 'Click here' &&
        href.includes('google.com')
      );
    }
  },

  {
    id: 5,
    xp: 175,
    badge: '🖼️',
    chapter: 'Links & Media',
    title: 'Picture This',
    description: 'Add an image to the page. Use any URL as the <span class="code-inline">src</span> value.',
    tip: '&lt;img&gt; is a self-closing tag — it does not need a closing tag. Always add an alt attribute for accessibility.',
    hint: '&lt;img src="https://picsum.photos/200" alt="A random photo"&gt;',
    startCode: '',
    validate(doc, code) {
      const el = doc.querySelector('img');
      const src = el ? el.getAttribute('src') : null;
      return code.includes('<img') && code.includes('src=') &&
             el !== null && src !== null && src.trim().length > 0;
    }
  },

  {
    id: 6,
    xp: 175,
    badge: '📋',
    chapter: 'Lists & Structure',
    title: 'Make a List',
    description: 'Create an unordered list with <strong>at least 3 items</strong> inside it.',
    tip: '&lt;ul&gt; is the unordered list container. Each item goes inside a &lt;li&gt; tag. Try ol for numbered lists!',
    hint: '&lt;ul&gt;&lt;li&gt;Apples&lt;/li&gt;&lt;li&gt;Bananas&lt;/li&gt;&lt;li&gt;Cherries&lt;/li&gt;&lt;/ul&gt;',
    startCode: '',
    validate(doc, code) {
      const ul = doc.querySelector('ul');
      if (!ul || !code.includes('<ul>') || !code.includes('</ul>')) return false;
      const liCount = ul.querySelectorAll('li').length;
      return liCount >= 3 && code.match(/<li>/g) && code.match(/<\/li>/g);
    }
  },

  {
    id: 7,
    xp: 200,
    badge: '🎮',
    chapter: 'Interactivity',
    title: 'Push the Button',
    description: 'Create a button that says exactly <span class="code-inline">Click Me!</span>',
    tip: 'The &lt;button&gt; element creates a clickable button. It usually triggers JavaScript — but first you have to build it!',
    hint: '&lt;button&gt;Click Me!&lt;/button&gt;',
    startCode: '',
    validate(doc, code) {
      const el = doc.querySelector('button');
      return code.includes('<button>') && code.includes('</button>') &&
             el !== null && el.textContent.trim() === 'Click Me!';
    }
  },

  {
    id: 8,
    xp: 200,
    badge: '⌨️',
    chapter: 'Interactivity',
    title: 'Get Input',
    description: 'Create a text input whose placeholder says <span class="code-inline">Enter your name</span>',
    tip: 'The <strong>placeholder</strong> attribute shows faded hint text before the user starts typing.',
    hint: '&lt;input type="text" placeholder="Enter your name"&gt;',
    startCode: '',
    validate(doc, code) {
      const el = doc.querySelector('input');
      return code.includes('<input') && code.includes('placeholder="Enter your name"') &&
             el !== null && el.getAttribute('placeholder') === 'Enter your name';
    }
  },

  {
    id: 9,
    xp: 250,
    badge: '🏗️',
    chapter: 'Building Pages',
    title: 'Heading + Story',
    description: 'Create a page with a heading that says <span class="code-inline">My Page</span> AND a paragraph with any text below it.',
    tip: 'HTML flows top to bottom. Put the h1 first, then the p underneath — the order you write them is the order they appear.',
    hint: 'Write &lt;h1&gt;My Page&lt;/h1&gt; then &lt;p&gt;your text here&lt;/p&gt;',
    startCode: '',
    validate(doc, code) {
      const h1 = doc.querySelector('h1');
      const p  = doc.querySelector('p');
      return (
        code.includes('<h1>') && code.includes('</h1>') &&
        code.includes('<p>') && code.includes('</p>') &&
        h1 !== null && h1.textContent.trim() === 'My Page' &&
        p  !== null && p.textContent.trim().length > 0
      );
    }
  },

  {
    id: 10,
    xp: 300,
    badge: '👑',
    chapter: 'Boss Level',
    title: 'Profile Card',
    description:
      'Build a profile card containing:<br>' +
      '• An <span class="code-inline">h2</span> heading with your name<br>' +
      '• A <span class="code-inline">p</span> paragraph describing yourself<br>' +
      '• A <span class="code-inline">ul</span> list with at least 2 hobbies',
    tip: 'HTML is all about combining elements to build real pages. You already know all the pieces!',
    hint: 'Combine &lt;h2&gt;, &lt;p&gt;, and &lt;ul&gt;&lt;li&gt; tags together',
    startCode: '',
    validate(doc, code) {
      const h2  = doc.querySelector('h2');
      const p   = doc.querySelector('p');
      const ul  = doc.querySelector('ul');
      const lis = ul ? ul.querySelectorAll('li') : [];
      return (
        code.includes('<h2>') && code.includes('</h2>') &&
        code.includes('<p>') && code.includes('</p>') &&
        code.includes('<ul>') && code.includes('</ul>') &&
        h2 !== null && h2.textContent.trim().length > 0 &&
        p  !== null && p.textContent.trim().length  > 0 &&
        lis.length >= 2
      );
    }
  }
];
