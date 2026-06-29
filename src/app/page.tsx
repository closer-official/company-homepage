import fs from "node:fs";
import path from "node:path";
import Script from "next/script";

function extract(html: string, pattern: RegExp, label: string) {
  const match = html.match(pattern);

  if (!match?.[1]) {
    throw new Error(`${label} could not be extracted from publish/index.html`);
  }

  return match[1];
}

export default function Home() {
  const html = fs.readFileSync(
    path.join(process.cwd(), "publish", "index.html"),
    "utf8",
  );
  const styles = extract(html, /<style>([\s\S]*?)<\/style>/i, "Styles");
  const body = extract(html, /<body>([\s\S]*?)<\/body>/i, "Body").replaceAll(
    'src="src/',
    'src="/src/',
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script id="remaining-slots-script" strategy="afterInteractive">
        {`
          (() => {
            const now = new Date();
            const day = now.getDate();
            const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
            const progress = day / lastDay;
            let slots;

            if (day === 1) {
              slots = 10;
            } else if (progress < 0.25) {
              slots = 10 - Math.floor(progress * 8);
            } else if (progress < 0.6) {
              slots = 7 - Math.floor((progress - 0.25) * 10);
            } else {
              slots = 3 - Math.floor((progress - 0.6) * 5);
            }

            slots = Math.max(1, Math.min(10, slots));
            const label = document.getElementById("remaining-slots");
            const fill = document.getElementById("slots-fill");
            const track = document.querySelector(".slots-track");

            if (label) label.textContent = "残り" + slots + "名";
            if (fill) fill.style.width = (slots * 10) + "%";
            if (track) track.setAttribute("aria-valuenow", String(slots));
          })();
        `}
      </Script>
    </>
  );
}
