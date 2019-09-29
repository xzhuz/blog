/* eslint-disable react/destructuring-assignment */
import marked from 'marked';
import hljs from 'highlight.js/lib/highlight';
import 'highlight.js/styles/github.css';

const languages = [
  'cpp',
  'xml',
  'bash',
  'css',
  'md',
  'http',
  'java',
  'js',
  'javascript',
  'json',
  'less',
  'makefile',
  'nginx',
  'php',
  'python',
  'scss',
  'sql',
  'stylus',
];
hljs.registerLanguage('cpp', require('highlight.js/lib/languages/cpp'));
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'));
hljs.registerLanguage('css', require('highlight.js/lib/languages/css'));
hljs.registerLanguage('md', require('highlight.js/lib/languages/markdown'));
hljs.registerLanguage('http', require('highlight.js/lib/languages/http'));
hljs.registerLanguage('java', require('highlight.js/lib/languages/java'));
hljs.registerLanguage('js', require('highlight.js/lib/languages/javascript'));
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
hljs.registerLanguage('json', require('highlight.js/lib/languages/json'));
hljs.registerLanguage('less', require('highlight.js/lib/languages/less'));
hljs.registerLanguage('makefile', require('highlight.js/lib/languages/makefile'));
hljs.registerLanguage('nginx', require('highlight.js/lib/languages/nginx'));
hljs.registerLanguage('php', require('highlight.js/lib/languages/php'));
hljs.registerLanguage('python', require('highlight.js/lib/languages/python'));
hljs.registerLanguage('scss', require('highlight.js/lib/languages/scss'));
hljs.registerLanguage('sql', require('highlight.js/lib/languages/sql'));
hljs.registerLanguage('stylus', require('highlight.js/lib/languages/stylus'));

hljs.configure({
  classPrefix: 'hljs-',
});
hljs.initHighlighting();
const renderer = new marked.Renderer();

function generateId(size) {
  const chars = `ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz`;
  const len = size | 8;
  let id = ``;
  for (let i = 0; i < len; i += 1) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

renderer.heading = (text, level) => {
  const id = generateId();
  return `<h${level} id="${id}">${text}</h${level}>`;
};

renderer.link = (href, title, text) => `<a href="${href}" target="_blank">${text}</a>`;

renderer.image = (href, title, text) => {
  function getImgWithUrlHtml(textArr) {
    return `<img src=${href} alt=${textArr[2]}><br>
            ${textArr[1]}<a href="${textArr[3]}" target="_blank">${textArr[2]}</a>`;
  }

  const reg = /([^]*)\[([^]*)\]\(([^]*)\)/;
  const isContainUrl = reg.test(text);
  const imgHtml = `<img src=${href} alt=${text}><br>
                ${text}`;
  return `<p style="text-align: center;">
            ${isContainUrl ? getImgWithUrlHtml(text.match(reg)) : imgHtml}
          </p>`;
};

renderer.blockquote = text => {
  const textArr = text
    .trim()
    .replace('<p>', '')
    .replace('</p>', '')
    .split('<br>');
  const context = [];
  textArr.map(arr => context.push(`<p>${arr}</p>`));

  return `<blockquote>${context.join('')}</blockquote>`;
};

renderer.code = (text, lang) => {
  const len = text.split('\n').length;
  const lineHeight = (len + 1) * 22;
  return `<pre class="prettyprint" style="height: ${lineHeight}px; position: relative; overflow-y: hidden;overflow-x: auto;padding: 0 16px 6px 44px;background-color: #f6f8fa;border: none;">
        <code class="language-${lang}" style="position: unset;" >${getCode(text, lang)}</code>
        <ul class="pre-numbering" style="position: absolute;width: 36px;background-color: #eef0f4; top: 0;
  left: 0;
  margin: 0;
  padding: 8px 0;
  list-style: none;
  text-align: center;
  line-height: 3px;
  height: 100%;
  ">
            ${getList(len)}
        </ul>
    </pre>`;
};

function getList(len) {
  let arr = '';
  for (let i = 1; i <= len; i += 1) {
    arr += `<li style=" padding: 0 4px;
                list-style: none;
                margin: 0;
                font-size: 12px;
                line-height: 22px;
                color: #6a737d;"
            >${i}</li>`;
  }
  return arr;
}

function getCode(code, lang) {
  if (!~languages.indexOf(lang)) {
    return hljs.highlightAuto(code).value;
  }
  return hljs.highlight(lang, code).value;
}

marked.setOptions({
  renderer,
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: true,
  smartLists: true,
  smartypants: true,
  highlight(code, lang) {
    if (!~languages.indexOf(lang)) {
      return hljs.highlightAuto(code).value;
    }
    return hljs.highlight(lang, code).value;
  },
});

export function markdown(str) {
  return str ? marked(str) : '';
}
