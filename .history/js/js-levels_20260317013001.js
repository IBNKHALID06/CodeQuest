// ═══════════════════════════════════════════════════════════════════════════
// JAVASCRIPT TRACK — 15 Levels
// Learn JavaScript by writing functions & code with real-time validation
// ═══════════════════════════════════════════════════════════════════════════

const JS_LEVELS = [
  {
    id: 1, xp: 150, badge: '📝', chapter: 'JS Basics', title: 'Declare a Variable',
    lesson: '<p>Variables store data. Declare with <span class="code-inline">let</span>, <span class="code-inline">const</span>, or <span class="code-inline">var</span>.</p><p>Example:<br><span class="code-inline">let name = "Alice";</span><br><span class="code-inline">const age = 25;</span></p><p>Use <span class="code-inline">const</span> by default (safer), <span class="code-inline">let</span> if you need to reassign.</p>',
    description: 'Declare a variable called "message" with the value "Hello, JavaScript!"',
    smallHint: 'Use: let message = "Hello, JavaScript!";',
    fullHint: 'let message = "Hello, JavaScript!";',
    startCode: '',
    validate(code, globalContext) {
      try {
        const test = new Function(code + '; return typeof message !== "undefined" && message.includes("Hello");');
        return test();
      } catch (e) {
        return false;
      }
    }
  },

  {
    id: 2, xp: 150, badge: '🔢', chapter: 'JS Basics', title: 'Data Types',
    lesson: '<p><strong>Data types:</strong> string, number, boolean, array, object</p><p>Examples:<br>&quot;text&quot; (string)<br>42 (number)<br>true/false (boolean)<br>[1,2,3] (array)<br>{name: "Bob"} (object)</p>',
    description: 'Create variables for: a string, a number, and a boolean.',
    smallHint: 'let name = "John"; let age = 30; let isActive = true;',
    fullHint: 'let name = "John";\nlet age = 30;\nlet isActive = true;',
    startCode: '',
    validate(code) {
      try {
        const test = new Function(code + '; return typeof name === "string" && typeof age === "number" && typeof isActive === "boolean";');
        return test();
      } catch (e) {
        return false;
      }
    }
  },

  {
    id: 3, xp: 150, badge: '➕', chapter: 'Operators', title: 'Arithmetic Operators',
    lesson: '<p><strong>Operators:</strong> + (add), - (subtract), * (multiply), / (divide), % (modulo)</p><p>Examples:<br>5 + 3 = 8<br>10 - 2 = 8<br>4 * 3 = 12<br>10 / 2 = 5<br>10 % 3 = 1</p>',
    description: 'Create a variable called "result" that equals 7 + 5.',
    smallHint: 'let result = 7 + 5;',
    fullHint: 'let result = 7 + 5;',
    startCode: '',
    validate(code) {
      try {
        const test = new Function(code + '; return result === 12;');
        return test();
      } catch (e) {
        return false;
      }
    }
  },

  {
    id: 4, xp: 150, badge: '⚖️', chapter: 'Operators', title: 'Comparison Operators',
    lesson: '<p><strong>Comparisons:</strong> == (equal), === (strict equal), != (not equal), >, <, >=, <=</p><p>Examples:<br>5 > 3 = true<br>5 === "5" = false (strict checks type)<br>5 == "5" = true</p>',
    description: 'Create a variable "isGreater" that checks if 10 is greater than 5.',
    smallHint: 'let isGreater = 10 > 5;',
    fullHint: 'let isGreater = 10 > 5;',
    startCode: '',
    validate(code) {
      try {
        const test = new Function(code + '; return isGreater === true;');
        return test();
      } catch (e) {
        return false;
      }
    }
  },

  {
    id: 5, xp: 175, badge: '🎯', chapter: 'Conditionals', title: 'If Statement',
    lesson: '<p>Execute code based on conditions using <span class="code-inline">if</span>, <span class="code-inline">else if</span>, <span class="code-inline">else</span>.</p><p>Example:<br><span class="code-inline">if (age >= 18) { console.log("Adult"); } else { console.log("Minor"); }</span></p>',
    description: 'Write an if statement: if x is 10, set result to "correct", else "wrong".',
    smallHint: 'let x = 10; let result; if (x === 10) { result = "correct"; } else { result = "wrong"; }',
    fullHint: 'let x = 10;\nlet result;\nif (x === 10) {\n  result = "correct";\n} else {\n  result = "wrong";\n}',
    startCode: 'let x = 10;\nlet result;',
    validate(code) {
      try {
        const test = new Function(code + '; return result === "correct";');
        return test();
      } catch (e) {
        return false;
      }
    }
  },

  {
    id: 6, xp: 175, badge: '🔄', chapter: 'Loops', title: 'For Loop',
    lesson: '<p><strong>For loops</strong> repeat code a set number of times.</p><p>Syntax:<br><span class="code-inline">for (let i = 0; i < 5; i++) { console.log(i); }</span></p><p>This logs 0, 1, 2, 3, 4</p>',
    description: 'Write a for loop that counts from 0 to 4 and stores sum in a "total" variable.',
    smallHint: 'let total = 0; for (let i = 0; i < 5; i++) { total += i; }',
    fullHint: 'let total = 0;\nfor (let i = 0; i < 5; i++) {\n  total += i;\n}',
    startCode: 'let total = 0;',
    validate(code) {
      try {
        const test = new Function(code + '; return total === 10;'); // 0+1+2+3+4 = 10
        return test();
      } catch (e) {
        return false;
      }
    }
  },

  {
    id: 7, xp: 200, badge: '📦', chapter: 'Loops', title: 'While Loop',
    lesson: '<p><strong>While loops</strong> repeat as long as a condition is true.</p><p>Syntax:<br><span class="code-inline">let i = 0; while (i < 5) { console.log(i); i++; }</span></p><p>⚠️ Be careful not to create infinite loops!</p>',
    description: 'Write a while loop that multiplies a number start at 2, multiply by 2 five times.',
    smallHint: 'let num = 2; let count = 0; while (count < 5) { num *= 2; count++; }',
    fullHint: 'let num = 2;\nlet count = 0;\nwhile (count < 5) {\n  num *= 2;\n  count++;\n}',
    startCode: 'let num = 2;\nlet count = 0;',
    validate(code) {
      try {
        const test = new Function(code + '; return num === 64;'); // 2 * 2^5 = 64
        return test();
      } catch (e) {
        return false;
      }
    }
  },

  {
    id: 8, xp: 200, badge: '⚙️', chapter: 'Functions', title: 'Write a Function',
    lesson: '<p><strong>Functions</strong> are reusable blocks of code.</p><p>Syntax:<br><span class="code-inline">function add(a, b) { return a + b; }</span></p><p>Call it: <span class="code-inline">add(5, 3);</span> returns 8</p>',
    description: 'Write a function called "multiply" that takes two numbers and returns their product.',
    smallHint: 'function multiply(a, b) { return a * b; }',
    fullHint: 'function multiply(a, b) {\n  return a * b;\n}',
    startCode: '',
    validate(code) {
      try {
        const test = new Function(code + '; return multiply(4, 5) === 20;');
        return test();
      } catch (e) {
        return false;
      }
    }
  },

  {
    id: 9, xp: 200, badge: '🎯', chapter: 'Functions', title: 'Arrow Functions',
    lesson: '<p><strong>Arrow functions</strong> are a shorter way to write functions (ES6).</p><p>Syntax:<br><span class="code-inline">const add = (a, b) => a + b;</span></p><p>Equivalent to:<br><span class="code-inline">function add(a, b) { return a + b; }</span></p>',
    description: 'Write an arrow function called "square" that returns the square of a number.',
    smallHint: 'const square = (x) => x * x;',
    fullHint: 'const square = (x) => x * x;',
    startCode: '',
    validate(code) {
      try {
        const test = new Function(code + '; return square(5) === 25;');
        return test();
      } catch (e) {
        return false;
      }
    }
  },

  {
    id: 10, xp: 225, badge: '📚', chapter: 'Arrays', title: 'Array Basics',
    lesson: '<p><strong>Arrays</strong> store multiple values.</p><p>Syntax: <span class="code-inline">let arr = [1, 2, 3, 4, 5];</span></p><p>Access: <span class="code-inline">arr[0]</span> = 1 (0-indexed!)<br>Length: <span class="code-inline">arr.length</span> = 5</p>',
    description: 'Create an array of 5 numbers: [10, 20, 30, 40, 50].',
    smallHint: 'let numbers = [10, 20, 30, 40, 50];',
    fullHint: 'let numbers = [10, 20, 30, 40, 50];',
    startCode: '',
    validate(code) {
      try {
        const test = new Function(code + '; return numbers.length === 5 && numbers[0] === 10 && numbers[4] === 50;');
        return test();
      } catch (e) {
        return false;
      }
    }
  },

  {
    id: 11, xp: 225, badge: '🔍', chapter: 'Arrays', title: 'Array Methods',
    lesson: '<p><strong>Array methods:</strong> push, pop, map, filter, forEach</p><p>Examples:<br><span class="code-inline">arr.push(6);</span> adds 6<br><span class="code-inline">arr.map(x => x * 2);</span> doubles each (returns new array)<br><span class="code-inline">arr.filter(x => x > 5);</span> keeps numbers > 5</p>',
    description: 'Use .map() to double all numbers in [1, 2, 3, 4]. Store result in "doubled".',
    smallHint: 'let doubled = [1, 2, 3, 4].map(x => x * 2);',
    fullHint: 'let doubled = [1, 2, 3, 4].map(x => x * 2);',
    startCode: '',
    validate(code) {
      try {
        const test = new Function(code + '; return doubled.length === 4 && doubled[0] === 2 && doubled[3] === 8;');
        return test();
      } catch (e) {
        return false;
      }
    }
  },

  {
    id: 12, xp: 250, badge: '🎁', chapter: 'Objects', title: 'Object Basics',
    lesson: '<p><strong>Objects</strong> store key-value pairs.</p><p>Syntax:<br><span class="code-inline">let person = { name: "Alice", age: 30 };</span></p><p>Access: <span class="code-inline">person.name</span> or <span class="code-inline">person["name"]</span></p>',
    description: 'Create an object "car" with properties: make, model, year.',
    smallHint: 'let car = { make: "Toyota", model: "Camry", year: 2020 };',
    fullHint: 'let car = {\n  make: "Toyota",\n  model: "Camry",\n  year: 2020\n};',
    startCode: '',
    validate(code) {
      try {
        const test = new Function(code + '; return car.make !== undefined && car.model !== undefined && car.year !== undefined;');
        return test();
      } catch (e) {
        return false;
      }
    }
  },

  {
    id: 13, xp: 250, badge: '🔗', chapter: 'DOM', title: 'Select DOM Elements',
    lesson: '<p><strong>DOM</strong> = Document Object Model (the page structure).</p><p>Select elements:<br><span class="code-inline">document.getElementById("id")</span><br><span class="code-inline">document.querySelector(".class")</span><br><span class="code-inline">document.querySelectorAll("h1")</span></p>',
    description: 'Select the element with id="demo" and store in a variable.',
    smallHint: 'let element = document.getElementById("demo");',
    fullHint: 'let element = document.getElementById("demo");',
    startCode: '',
    validate(code) {
      return code.includes('getElementById') && code.includes('demo');
    }
  },

  {
    id: 14, xp: 275, badge: '📝', chapter: 'DOM', title: 'Change DOM Content',
    lesson: '<p>Modify DOM content with <span class="code-inline">.textContent</span> and <span class="code-inline">.innerHTML</span>.</p><p>Example:<br><span class="code-inline">document.getElementById("title").textContent = "New Title";</span></p><p><strong>textContent:</strong> Plain text<br><strong>innerHTML:</strong> HTML tags allowed</p>',
    description: 'Set the text of element with id="msg" to "Hello, DOM!"',
    smallHint: 'document.getElementById("msg").textContent = "Hello, DOM!";',
    fullHint: 'document.getElementById("msg").textContent = "Hello, DOM!";',
    startCode: '',
    validate(code) {
      return code.includes('getElementById') && code.includes('msg') &&
             (code.includes('textContent') || code.includes('innerHTML')) &&
             code.includes('Hello, DOM!');
    }
  },

  {
    id: 15, xp: 300, badge: '👑', chapter: 'Boss Level', title: 'Interactive Function',
    lesson: '<p>Combine everything: variables, functions, arrays, DOM.</p><p>Build a function that:<br>✓ Takes user input<br>✓ Processes it (calculate, filter, transform)<br>✓ Updates the DOM<br>✓ Returns a result</p>',
    description: 'Create a function that filters an array and returns only numbers > 10.',
    smallHint: 'function filterBig(arr) { return arr.filter(x => x > 10); }',
    fullHint: 'function filterBig(arr) {\n  return arr.filter(x => x > 10);\n}',
    startCode: '',
    validate(code) {
      try {
        const test = new Function(code + '; return filterBig([5, 15, 8, 20, 3, 12]).length === 3 && filterBig([5, 15, 8, 20, 3, 12])[0] === 15;');
        return test();
      } catch (e) {
        return false;
      }
    }
  }
];
