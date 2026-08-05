# Scan — mercado brasileiro

Leia primeiro `modes/scan.md` e execute o mesmo fluxo, aplicando este overlay.

1. Use `templates/portals.brazil.example.yml` como referência inicial.
2. Para Gupy, prefira o MCP oficial de candidatos
   (`https://candidates.mcp.api.gupy.io/mcp`) quando ele estiver configurado.
   A API REST de vagas exige autenticação; não contorne login, token, CAPTCHA,
   rate limit ou área privada. Use busca pública como fallback.
3. Priorize páginas oficiais das empresas e APIs públicas de ATS. Trate
   agregadores como descoberta, confirmando a vaga na fonte oficial.
4. Reconheça títulos em português e inglês e normalize localidades brasileiras.
5. Não descarte uma vaga só por omitir salário ou modalidade contratual; marque
   ambos como desconhecidos para confirmação.
6. Nunca candidate automaticamente. O scan apenas descobre e prioriza vagas.

## LGPD e minimização

Colete somente dados necessários para avaliar a vaga. Não armazene CPF, RG,
data de nascimento, filiação, laudos, biometria, foto ou documentos sensíveis.
Não copie dados de terceiros além do mínimo profissional necessário. Explique a
finalidade de qualquer dado novo e respeite pedidos de acesso/correção/remoção.
