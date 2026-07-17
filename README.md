# HV Limpezas — Website

Site institucional (brochura) da **HV Limpezas** — limpeza de vidros, fachadas, painéis solares, softwash, capoto, impermeabilização e higienização de estofos. Empresas e particulares. Mozelos, Santa Maria da Feira.

Site estático (HTML/CSS/JS, sem build), alojado em **GitHub Pages**.
Produção: https://hvlimpezas.pt/

## Estrutura
```
index.html            Página principal (hero, serviços, resultados, sobre, galeria, avaliações, contactos+mapa)
privacidade.html      Política de Privacidade (RGPD / Lei 58/2019)
cookies.html          Política de Cookies
termos.html           Termos + identificação legal (DL 7/2004), RAL/CICAP, Livro de Reclamações
404.html              Página de erro (caminhos absolutos /HV_Limpezas/)
robots.txt / sitemap.xml
assets/css/styles.css
assets/js/main.js
assets/fonts/         Sora + Inter (self-hosted, sem pedidos externos — RGPD)
assets/img/           Fotos otimizadas (webp) + logótipo transparente + OG
assets/icons/         Favicons
fotos-originais/      Originais (não publicados — .gitignore)
```

## Pré-visualização local
```
python3 -m http.server 8093
# abrir http://localhost:8093/HV_Limpezas/  (servido a partir da pasta-mãe Websites/)
```

## Conformidade (UE / ASAE)
- Aviso "(Chamada para a rede móvel nacional)" junto ao telefone (DL 59/2021).
- Livro de Reclamações eletrónico em todas as páginas (DL 156/2005).
- RAL: CICAP + consumidor.gov.pt (Lei 144/2015); sem link ODR (plataforma extinta em 07/2025).
- Identificação legal no site (DL 7/2004 art. 10.º) — ver placeholders abaixo.
- Mapa Google carregado só após consentimento (banner de cookies); fontes self-hosted; sem tracking.

## ⚠️ A preencher antes da divulgação (dados do cliente)
1. **Identificação legal** (footer de todas as páginas + `termos.html`): forma jurídica/denominação, NIF/NIPC — e, se for sociedade, conservatória + n.º de matrícula + capital social. Procurar por `class="ph"` e pelos comentários `PLACEHOLDER`.
2. **Email** — confirmar a grafia exata de `limpezas_h.v@hotmail.com`.
3. **Horário** — atualizar em `index.html` (secção contactos, comentário `PLACEHOLDER: confirmar horário`).
4. **Pin do mapa** — afinar as coordenadas em `index.html` (`#map data-map-src`) com o pin exato do Google.

## Cache-busting
Ao alterar CSS/JS, incrementar `?v=N` em `styles.css?v=N` e `main.js?v=N` em todas as páginas.
