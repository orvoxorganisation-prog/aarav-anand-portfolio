// Ping IndexNow (Bing, Yandex, Seznam, Naver, ChatGPT-search index, etc.)
// with all site URLs. Google does NOT use IndexNow.
//
// Run after a deploy:  node scripts/indexnow.mjs
//
// The key below is public by design — it is also served at /<key>.txt
const KEY = "7df8f91163ed490caf000030ccee1ac246a97c4780db42b6bb5c285990ce5502";
const HOST = "aarav-anand-portfolio.vercel.app";

const paths = ["/", "/about.html", "/projects.html", "/experience.html", "/skills.html", "/contact.html"];
const urlList = paths.map((p) => `https://${HOST}${p}`);

const body = {
  host: HOST,
  key: KEY,
  keyLocation: `https://${HOST}/${KEY}.txt`,
  urlList,
};

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});

console.log("IndexNow status:", res.status, res.statusText);
console.log(await res.text());
// 200 = accepted · 202 = accepted, validation pending · 4xx = check key file
