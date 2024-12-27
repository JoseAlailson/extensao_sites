document.addEventListener("DOMContentLoaded", () => {
  const saveBtn = document.getElementById("saveBtn");

  saveBtn.addEventListener("click", async () => {
    try {
      // Obtém o nome do arquivo
      const fileNameInput = document.getElementById("filename").value.trim();
      const fileName = fileNameInput ? `${fileNameInput}.txt` : "arquivo_padrao.txt";

      // Obtém o link da aba ativa
      let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const url = tab.url;

      // Obtém a descrição fornecida pelo usuário
      const description = document.getElementById("description").value.trim();

      if (!description) {
        alert("Por favor, insira uma descrição!");
        return;
      }

      // Conteúdo do arquivo
      const content = `Link: ${url}\nDescrição: ${description}\n\n`;
      const blob = new Blob([content], { type: "text/plain" });
      const blobUrl = URL.createObjectURL(blob);

      // Usa a API de downloads do Chrome com o nome especificado
      chrome.downloads.download({
        url: blobUrl,
        filename: fileName,
        conflictAction: "uniquify"
      });

      alert(`Arquivo "${fileName}" salvo com sucesso!`);
    } catch (error) {
      console.error("Erro ao salvar o arquivo:", error);
      alert("Ocorreu um erro ao salvar o arquivo.");
    }
  });
});
