import re
from pathlib import Path


class SuggestedVersionsUpdater:
    def __init__(self, html_file):
        self.html_file = Path(html_file)

        if not self.html_file.exists():
            raise FileNotFoundError(f"HTML file not found: {html_file}")

        self.html_content = self.html_file.read_text(encoding="utf-8")

    def load_suggestions(self, suggestions_file):
        suggestions_path = Path(suggestions_file)

        if not suggestions_path.exists():
            raise FileNotFoundError("suggestions.txt not found")

        raw = suggestions_path.read_text(encoding="utf-8")
        blocks = [b.strip() for b in raw.split('---') if b.strip()]

        suggestions = []

        for i, block in enumerate(blocks, 1):
            lines = block.splitlines()
            title = lines[0].strip()
            content = "\n".join(lines[1:]).strip()

            # Escape for JavaScript template literal
            content = (
                content
                .replace('\\', '\\\\')
                .replace('`', '\\`')
            )

            word_count = len(content.split())

            suggestions.append({
                "id": i,
                "title": title,
                "content": content,
                "wordCount": word_count
            })

        return suggestions

    def build_js_array(self, suggestions):
        items = []

        for s in suggestions:
            items.append(f"""
    {{
        id: {s['id']},
        name: "{s['title']}",
        content: `{s['content']}`,
        note: "Loaded from suggestions.txt",
        wordCount: {s['wordCount']}
    }}""")

        js_code = "const SUGGESTED_VERSIONS = [\n" + ",".join(items) + "\n];"
        return js_code

    def replace_js_in_html(self, new_js):
        pattern = r'const\s+SUGGESTED_VERSIONS\s*=\s*\[.*?\];'

        if not re.search(pattern, self.html_content, flags=re.DOTALL):
            raise ValueError("SUGGESTED_VERSIONS not found inside HTML <script>")

        self.html_content = re.sub(
            pattern,
            new_js,
            self.html_content,
            flags=re.DOTALL
        )

    def save(self, output_file=None):
        if output_file is None:
            output_file = self.html_file.parent / f"updated_{self.html_file.name}"

        Path(output_file).write_text(self.html_content, encoding="utf-8")
        return output_file


# ==========================
# MAIN EXECUTION
# ==========================
def main():
    print("🛠 Updating SUGGESTED_VERSIONS inside HTML\n")

    html_file = input("Enter HTML filename (e.g. hotel.html): ").strip()
    if not html_file:
        html_file = "hotel.html"

    suggestions_file = input("Enter suggestions filename (default: suggestions.txt): ").strip()
    if not suggestions_file:
        suggestions_file = "suggestions.txt"

    try:
        updater = SuggestedVersionsUpdater(html_file)
        suggestions = updater.load_suggestions(suggestions_file)
        new_js = updater.build_js_array(suggestions)
        updater.replace_js_in_html(new_js)

        output = updater.save()
        print(f"\n✅ Done!")
        print(f"✔ {len(suggestions)} suggested versions inserted")
        print(f"📄 Output file: {output}")

    except Exception as e:
        print(f"\n❌ Error: {e}")


if __name__ == "__main__":
    main()
