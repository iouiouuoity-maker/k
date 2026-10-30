# QYZYLORDA TIME MAP

Жоба сайты «AI-репортер: туған өлкемнің шежіресі» зерттеу жұмысына негізделген. GitHub Pages көпбетті статикалық сайтты береді, ал бөлек Cloudflare Worker генеративті Workers AI-ды шақырады. API кілті браузерде сақталмайды.

## GitHub Pages сайты

1. Репозиторий ашып, осы бума ішіндегі файлдарды репозиторийдің түбіріне жүктеңіз.
2. GitHub → **Settings → Pages** → **Deploy from a branch** → `main` және `/ (root)` таңдаңыз.
3. Сайт URL-і мысалы `https://USERNAME.github.io/REPOSITORY/` болады.

## Жеке Cloudflare Worker

1. Cloudflare аккаунтына кіріп, Workers AI қосыңыз. Қазіргі тегін Workers AI квотасы тәулігіне 10 000 Neurons; шектен асқан сұраулар күндік квота жаңарғанша орындалмайды.
2. Терминалда `cd worker`, сосын `npx wrangler login` және `npx wrangler deploy` орындаңыз. `wrangler.toml` ішіндегі `YOUR_GITHUB_USERNAME` мәнін GitHub username-ге ауыстырыңыз.
3. Сайт репозиторийі `https://USERNAME.github.io/REPOSITORY/` болса, браузер Origin әдетте `https://USERNAME.github.io` болады. CORS-қа репозиторий жолын емес, осы origin-ді дәл жазыңыз. Өз доменіңіз болса, `ALLOWED_ORIGIN`-ге соны қойыңыз.
4. Deploy нәтижесінде берілген `https://qyzylorda-time-map-ai.<subdomain>.workers.dev` URL-ін сайттың `ai.js` файлындағы `AI_API_URL` деген жалғыз жолға енгізіп, GitHub-қа қайта жүктеңіз. URL-ге `/` эссе қоюдың қажеті жоқ. Интерфейсте Worker баптауы көрсетілмейді.
5. Сайтты Pages арқылы ашып, AI бөліміне қазақша сұрақ қойып тексеріңіз. Worker-де `AI` binding және `@cf/meta/llama-3.1-8b-instruct` моделі бар; жеке API кілті қажет емес.

## Құрылымы

- `index.html` — басты бет; `map.html` — карта мен 20 жазбалы дерекқор; `stories.html` — репортаж конструкторы; `quest.html` — 3 деңгейдегі 30 тест; `lab.html` — AI зертхана.
- `styles.css`, `pages.css`, `app.js`, `map.js`, `quest.js`, `stories.js`, `ai.js` — сайт модульдері.
- `worker/worker.js`, `worker/wrangler.toml` — бөлек AI Worker.
- `assets/` — кітап жобасының иллюстрациялары мен нысандар фотосуреттері.

Картадағы кейбір координаттар нысандардың жуық орналасуын көрсету үшін берілген. Тарихи деректерді сабақта қолданар алдында ресми не ғылыми дереккөзбен тексеріңіз. Worker AI жауабы оқу көмекшісі ғана; ол кітапхана/мұрағат деректерін автоматты түрде іздемейді.


## Алты жеке бет
Жеке кабинет (`index.html`), карта (`map.html`), репортаж студиясы (`stories.html`), тапсырмалар (`quest.html`), AI зертхана (`lab.html`), зерттеу дәптері (`notebook.html`).
Жазбалар, репортаждар және тест нәтижелері localStorage арқылы осы браузерде сақталады. Бұл серверлік аккаунт жүйесі емес; басқа құрылғыға автоматты синхрондалмайды. Жұмыстарды TXT түрінде жүктеуге болады.
