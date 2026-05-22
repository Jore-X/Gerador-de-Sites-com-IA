async function gerarCodigo() {
  const textUser = document.querySelector(".textUser").value;
  const response = await fetch("/api/gerarSite", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ texto: textUser }),
  });

  const dados = await response.json();
  console.log(dados);
  const result = dados.choices[0].message.content;

  const spaceCode = document.querySelector(".code-block");
  const spaceSite = document.querySelector(".site-block");

  spaceCode.textContent = result;
  spaceSite.srcdoc = result;
}
