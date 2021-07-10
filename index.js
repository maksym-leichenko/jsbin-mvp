const textarea = ['html', 'css', 'js'];
const textareaElements = textarea.reduce((acc, id) => ({ ...acc, [id]: document.getElementById(id) }), {});
const textareaElementsArray = Object.values(textareaElements);

textareaElements.css.value = `body {
  background: red;
}`;
textareaElements.js.value = `console.log(window.location.href);`;
textareaElements.html.value = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin2</title>
</head>
<body>
</body>
</html>`;


const iframeElement = document.querySelector('iframe');

textareaElementsArray.forEach(el => {
  el.addEventListener('input', render);
});

function render() {
  let html = textareaElements.html.value;
  html = html.replace('</head>', `<style>${textareaElements.css.value}</style></head>`);
  html = html.replace('</body>', `<script>${textareaElements.js.value}</script></body>`);
  iframeElement.src = "about:blank";
  iframeElement.contentWindow.document.open();
  iframeElement.contentWindow.document.write(html);
  iframeElement.contentWindow.document.close();
}

render();
