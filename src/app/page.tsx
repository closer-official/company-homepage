import fs from "node:fs";
import path from "node:path";

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
    </>
  );
}
