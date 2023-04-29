const numTabs = 3;

function pasteTextInEmptyTextArea(text, keyword) {
  const textAreas = document.getElementsByTagName("textarea");
  for (const textArea of textAreas) {
    if (textArea.value.includes(keyword)) {
      textArea.value = textArea.value.replace(keyword, text);
      break;
    }
  }
}

function applyAutoPasteText() {
  const keys = [];
  for (let i = 1; i <= numTabs; i++) {
    keys.push(`autoPasteText${i}`, `keyword${i}`);
  }

  chrome.storage.sync.get(keys, (result) => {
    for (let i = 1; i <= numTabs; i++) {
      if (result[`autoPasteText${i}`] && result[`keyword${i}`]) {
        pasteTextInEmptyTextArea(result[`autoPasteText${i}`], result[`keyword${i}`]);
      }
    }
  });
}

function observeTextAreas() {
  const textAreas = document.getElementsByTagName("textarea");
  const observerConfig = { characterData: true, subtree: true, childList: true };

  for (const textArea of textAreas) {
    const observer = new MutationObserver(() => applyAutoPasteText());
    observer.observe(textArea, observerConfig);
  }
}

observeTextAreas();

