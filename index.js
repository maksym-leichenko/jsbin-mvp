const ids = ['html', 'css', 'js', 'output'];
const elements = ids.reduce((acc, id) => ({ ...acc, [id]: document.getElementById(id) }), {});

const editors = {
  html: CodeMirror.fromTextArea(elements.html, {
    lineNumbers: true,
    mode: "htmlmixed",
    highlightLine: true,
  }),
  css: CodeMirror.fromTextArea(elements.css, {
    lineNumbers: true,
    mode: "css",
    highlightLine: true,
  }),
  js: CodeMirror.fromTextArea(elements.js, {
    lineNumbers: true,
    mode: "javascript",
    highlightLine: true,
  })
}
const editorsArr = Object.values(editors);

editorsArr.forEach(editor => {
  editor.on('change', onChangeHandler);
});

let timerId = null;
function onChangeHandler() {
  if (timerId) {
    clearTimeout(timerId);
  }
  timerId = setTimeout(render, 1000);
}

function render() {
  let html = editors.html.getValue();
  html = html.replace('</head>', `<style>${editors.css.getValue()}</style></head>`);
  html = html.replace('</body>', `<script>${editors.js.getValue()}</script></body>`);
  const iframeElement = document.createElement('iframe');
  iframeElement.attributes.sandbox = "allow-modals allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts";
  iframeElement.attributes.frameborder = "0";
  iframeElement.attributes.allow = "geolocation; midi; camera; microphone; speaker;";
  iframeElement.src = "about:blank";
  elements.output.innerHTML = '';
  elements.output.append(iframeElement);
  iframeElement.contentWindow.document.open();
  iframeElement.contentWindow.document.write(html);
  iframeElement.contentWindow.document.close();

}

function setDefaultValues() {
  editors.html.setValue(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin2</title>
</head>
<body>
</body>
</html>`);

  editors.css.setValue(`body {
  background: red;
}`);

  editors.js.setValue(`
const a = 1;
console.log(a);
`);
}

setDefaultValues();
render();
