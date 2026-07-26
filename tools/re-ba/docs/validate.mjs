import { JSDOM } from "jsdom";
import fs from "fs";

const html = fs.readFileSync(new URL("../knowledge-zoom-navigator-re-ba.html", import.meta.url), "utf-8");
const dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable" });
const { window } = dom;

function wait(ms){ return new Promise(r=>setTimeout(r,ms)); }

let fails = 0;
function assert(cond, label){
  if(cond){ console.log("PASS -", label); }
  else { console.log("FAIL -", label); fails++; }
}

await wait(200);
const doc = window.document;

assert(doc.querySelectorAll(".card").length === 8, "Ebene 1 zeigt 8 Kontinent-Karten");
assert(doc.querySelector(".target-chip") !== null, "Ziel-Zettel-Chip vorhanden");
assert(doc.querySelector(".level-item.active").textContent.includes("Welt"), "Sidebar zeigt Welt als aktive Ebene");

// Klick auf ersten Kontinent -> Ebene 2
window.selectContinent(0);
await wait(50);
assert(doc.querySelectorAll(".card").length === 2, "Ebene 2 zeigt 2 Länder-Karten");
assert(doc.querySelector(".breadcrumb").textContent.includes("Grundlagen"), "Breadcrumb zeigt Kontinent-Titel");

// Weiter zu Land -> Stadt -> Haus
window.selectLand(0);
await wait(50);
assert(doc.querySelectorAll(".card").length === 2, "Ebene 3 zeigt 2 Städte-Karten");

window.selectCity(0);
await wait(50);
assert(doc.querySelectorAll(".card").length >= 1, "Ebene 4 zeigt Haus-Karte(n)");

window.selectHouse(0);
await wait(50);
assert(doc.querySelector(".zettel-detail") !== null, "Ebene 5 zeigt Zettel-Detailansicht");
assert(doc.querySelector(".zettel-id-badge").textContent.includes("0101"), "Zettel-ID 0101 korrekt angezeigt");

// Trainer-Modus zeigt Trainer-Hinweis
window.setMode("trainer");
await wait(50);
assert(doc.querySelector(".trainer-note") !== null, "Trainer-Hinweis erscheint im Trainer-Modus");

window.setMode("teilnehmer");
await wait(50);
assert(doc.querySelector(".trainer-note") === null, "Trainer-Hinweis verschwindet im Teilnehmer-Modus");

// Wissensnetz
window.setMode("wissensnetz");
await wait(50);
assert(doc.querySelectorAll(".net-node").length === 8, "Wissensnetz zeigt 8 Kontinent-Knoten");

// Start zurücksetzen
window.startOver();
window.setMode("teilnehmer");
await wait(50);
assert(doc.querySelectorAll(".card").length === 8, "Start setzt zurück auf Ebene 1 mit 8 Karten");

// Footer / K-Kriterien Stichprobe
const bodyStyle = window.getComputedStyle(doc.body);
assert(parseInt(bodyStyle.fontSize) >= 18, "Basis-Schriftgröße >= 18px (K5)");
assert(doc.querySelector("footer") !== null, "Footer vorhanden");
assert(doc.body.innerHTML.includes("Michaela Kühn"), "Name im Footer vorhanden");
assert(doc.querySelectorAll(".footer-links button").length === 4, "Footer enthält 4 Dokumenten-Links");

console.log("\n" + (fails===0 ? "ALLE TESTS BESTANDEN" : fails + " TEST(S) FEHLGESCHLAGEN"));
process.exit(fails===0 ? 0 : 1);
