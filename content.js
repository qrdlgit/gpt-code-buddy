function pasteTextInEmptyTextArea(text) {
  const textAreas = document.getElementsByTagName("textarea");
  for (const textArea of textAreas) {
    if (textArea.value === "") {
      textArea.value = text;
      break;
    }
  }
}

chrome.storage.sync.get(["autoPasteText"], (result) => {
  if (result.autoPasteText) {
    pasteTextInEmptyTextArea(result.autoPasteText);
  }
});
