export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { texto } = req.body;

  const adress = "https://api.groq.com/openai/v1/chat/completions";
  const apiKey = process.env.my_key_groq_site;

  const prompt = `Você é um designer web premiado e Programador. 
                    Crie uma landing page COMPLETA e VISUALMENTE IMPRESSIONANTE para o negócio descrito.

                        Regras de resposta:
                        - Responda SOMENTE com HTML e CSS puros
                        - Não use crases, markdown ou explicações
                        - Não use tags <img>

                        Identidade visual (capriche e surpreenda):
                        - Invente uma paleta de cores única que combine com a essência do negócio
                        - Escolha uma Google Font marcante via @import
                        - Use emojis grandes no lugar de imagens
                        - Use CSS moderno: gradientes, sombras, animações sutis, layout generoso, tipografia forte

                        Estrutura da página:
                        - Header com nome do negócio e menu
                        - Hero impactante com título, subtítulo e botão CTA
                        - Seção de diferenciais com emojis
                        - Depoimento de cliente
                        - Footer com contato

                    Todo o conteúdo em português, criativo e específico para o negócio.`;

  try {
    const response = await fetch(adress, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "meta-llama/llama-prompt-guard-2-86m",
        messages: [
          {
            role: "user",
            content: texto,
          },
          {
            role: "system",
            content: prompt,
          },
        ],
      }),
    });

    const dados = await response.json();

    res.status(200).json(dados);
  } catch (error) {
    res.status(500).json({ error: "Erro ao consultar a API" });
  }
}
