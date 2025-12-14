import re
import os
from pathlib import Path
import sys

class WritingTaskEditor:
    def __init__(self, html_file_path):
        """Initialize editor with HTML file path"""
        self.html_file_path = Path(html_file_path)
        if not self.html_file_path.exists():
            print(f"❌ Error: HTML file not found: {html_file_path}")
            return
        
        self.html_content = self.html_file_path.read_text(encoding='utf-8')
        
    def update_situation(self, new_situation):
        """Update the situation section"""
        pattern = r'<h4 style="color: #2c3e50; margin-bottom: 10px;">Situation:</h4>\s*<p>.*?</p>'
        replacement = f'<h4 style="color: #2c3e50; margin-bottom: 10px;">Situation:</h4>\n                    <p>{new_situation}</p>'
        self.html_content = re.sub(pattern, replacement, self.html_content, flags=re.DOTALL)
        print("✓ Situation updated")
        return self
    
    def update_task(self, new_task):
        """Update the task section"""
        pattern = r'<h4 style="color: #2c3e50; margin-top: 15px; margin-bottom: 10px;">Task:</h4>\s*<p>.*?</p>'
        replacement = f'<h4 style="color: #2c3e50; margin-top: 15px; margin-bottom: 10px;">Task:</h4>\n                    <p>{new_task}</p>'
        self.html_content = re.sub(pattern, replacement, self.html_content, flags=re.DOTALL)
        print("✓ Task updated")
        return self
    
    def update_requirements(self, requirements_list):
        """Update the requirements list"""
        # Create requirements list in HTML format
        requirements_html = '<ul style="margin-left: 20px; margin-top: 10px;">\n'
        for req in requirements_list:
            requirements_html += f'                        <li>{req}</li>\n'
        requirements_html += '                    </ul>'
        
        pattern = r'<ul style="margin-left: 20px; margin-top: 10px;">.*?</ul>'
        self.html_content = re.sub(pattern, requirements_html, self.html_content, flags=re.DOTALL)
        print(f"✓ Requirements updated ({len(requirements_list)} requirements)")
        return self
    
    def load_suggestions_from_file(self, suggestions_file_path):
        """Load suggestions from a text file"""
        suggestions_path = Path(suggestions_file_path)
        
        if not suggestions_path.exists():
            print(f"⚠ Warning: Suggestions file not found: {suggestions_file_path}")
            print("Using default suggestions")
            self.suggestions = self.create_default_suggestions()
            return self
        
        # Read suggestions file content
        suggestions_content = suggestions_path.read_text(encoding='utf-8')
        
        # Split suggestions (using "---" as separator)
        suggestions = suggestions_content.strip().split('---')
        
        if len(suggestions) < 3:
            print(f"⚠ Warning: Suggestions file only contains {len(suggestions)} suggestions")
            # Duplicate first suggestion if less than 3
            while len(suggestions) < 3:
                suggestions.append(suggestions[0] if suggestions else "No suggestion available")
        
        # Store suggestions for later use
        self.suggestions = suggestions[:3]
        print(f"✓ Loaded {len(self.suggestions)} suggestions from file")
        return self
    
    def create_default_suggestions(self):
        """Create default suggestions if no file exists"""
        default_suggestions = []
        
        for i in range(1, 4):
            suggestion = f"""Dear Sir/Madam,

I am writing to apply for the position mentioned in your advertisement. As a dedicated student, I believe I have the skills and enthusiasm required for this role.

My experience includes relevant activities that have prepared me well. I am eager to contribute and learn from this opportunity.

Regarding my availability, I can attend an interview at your convenience. Please let me know what time would be suitable.

Thank you for considering my application.

Yours sincerely,
Student Name"""
            default_suggestions.append(suggestion)
        
        return default_suggestions
    
    def add_suggested_versions(self):
        """Add 3 suggested versions to the page"""
        if not hasattr(self, 'suggestions') or len(self.suggestions) < 3:
            print("⚠ Creating default suggestions...")
            self.suggestions = self.create_default_suggestions()
        
        # Create suggestions structure
        suggestions_html = ''
        
        for i, suggestion in enumerate(self.suggestions, 1):
            suggestions_html += f'''
            <div class="comparison-card suggested-card" style="display: {'block' if i==1 else 'none'}" id="suggestionCard{i}">
                <div class="card-title">Suggested Version {i}</div>
                <div class="card-content suggestion-content">
                    {suggestion.strip()}
                </div>
                <div class="card-note">This is suggestion {i} - created based on the requirements</div>
            </div>'''
        
        # Add navigation buttons between suggestions
        navigation_buttons = '''
        <div style="display: flex; justify-content: center; gap: 10px; margin: 15px 0;">
            <button class="btn" style="padding: 8px 15px; background-color: #3498db; color: white;" onclick="showSuggestion(1)">Suggestion 1</button>
            <button class="btn" style="padding: 8px 15px; background-color: #9b59b6; color: white;" onclick="showSuggestion(2)">Suggestion 2</button>
            <button class="btn" style="padding: 8px 15px; background-color: #2ecc71; color: white;" onclick="showSuggestion(3)">Suggestion 3</button>
        </div>
        
        <script>
        function showSuggestion(num) {
            // Hide all cards
            for(let i = 1; i <= 3; i++) {
                const card = document.getElementById('suggestionCard' + i);
                if(card) card.style.display = 'none';
            }
            // Show selected card
            const selectedCard = document.getElementById('suggestionCard' + num);
            if(selectedCard) selectedCard.style.display = 'block';
        }
        </script>
        '''
        
        # Find and replace the original suggestion card
        original_card_pattern = r'<!-- Suggested Version Card -->.*?<div class="card-note">Note: This is an example\. Your writing can be different but should include all requirements\.</div>'
        
        replacement = f'''<!-- Suggested Versions Cards -->
                        <div style="grid-column: span 1;">
                            {suggestions_html}
                            {navigation_buttons}
                        </div>'''
        
        # Use re.DOTALL to make dot match newlines
        self.html_content = re.sub(original_card_pattern, replacement, self.html_content, flags=re.DOTALL)
        print("✓ Added 3 suggestions with navigation buttons")
        return self
    
    def save_html(self, output_file_path=None):
        """Save the modified HTML file"""
        if output_file_path is None:
            output_file_path = self.html_file_path.parent / f"modified_{self.html_file_path.name}"
        
        Path(output_file_path).write_text(self.html_content, encoding='utf-8')
        print(f"✓ Saved modified file to: {output_file_path}")
        return output_file_path
    
    def preview_changes(self):
        """Preview the applied changes"""
        print("\n" + "=" * 60)
        print("📋 Preview of HTML File Changes:")
        print("=" * 60)
        
        # Find updated situation section
        situation_match = re.search(r'<h4 style="color: #2c3e50; margin-bottom: 10px;">Situation:</h4>\s*<p>(.*?)</p>', 
                                   self.html_content, re.DOTALL)
        if situation_match:
            situation_text = situation_match.group(1).strip().replace('<strong>', '').replace('</strong>', '')
            print(f"🔹 New Situation:\n{situation_text[:100]}..." if len(situation_text) > 100 else situation_text)
            print("-" * 40)
        
        # Find updated task section
        task_match = re.search(r'<h4 style="color: #2c3e50; margin-top: 15px; margin-bottom: 10px;">Task:</h4>\s*<p>(.*?)</p>', 
                              self.html_content, re.DOTALL)
        if task_match:
            task_text = task_match.group(1).strip()
            print(f"🔹 New Task:\n{task_text[:100]}..." if len(task_text) > 100 else task_text)
            print("-" * 40)
        
        # Find requirements
        requirements_match = re.search(r'<ul style="margin-left: 20px; margin-top: 10px;">(.*?)</ul>', 
                                      self.html_content, re.DOTALL)
        if requirements_match:
            print("🔹 New Requirements:")
            # Extract list items
            items = re.findall(r'<li>(.*?)</li>', requirements_match.group(1))
            for i, item in enumerate(items, 1):
                print(f"  {i}. {item.strip()}")
        
        # Check if suggestions were added
        if re.search(r'showSuggestion\(', self.html_content):
            print("🔹 ✅ Added 3 suggestions with navigation buttons")
        
        print("=" * 60 + "\n")


def create_sample_suggestions_file(filename="suggestions.txt"):
    """Create a sample suggestions file if it doesn't exist"""
    
    suggestions_content = """Dear Mr. Al-Harthy,

I am writing to apply for the part-time library assistant position at your library in Muscat. I saw your advertisement and I am very interested in this job.

I am in Grade 11 at Al Nahda School. I love books and reading, and I want to work in a library because I enjoy helping people find information. I think it would be a good job for me.

I have some experience with library work. Last year, I helped organize books in my school library. I also volunteered at a community book sale. I am good with computers and I can use library software. I am organized and I pay attention to details.

I am available for an interview any day after 3 PM or on Saturday morning. Please let me know what time is good for you.

Thank you for considering my application.

Yours sincerely,
Salma Al Balushi
---
Dear Library Manager,

I wish to apply for the library assistant position advertised recently. As an avid reader and organized student, I believe I would be an excellent fit for this role.

My qualifications include volunteering at my school library for six months, where I gained experience in cataloging books and assisting visitors. I am proficient with computer systems and have excellent attention to detail.

Regarding interview availability, I am free on weekdays after 2:00 PM and all day on Sundays. I can adjust my schedule to accommodate your convenience.

I am enthusiastic about this opportunity and look forward to discussing how I can contribute to your library team.

Yours faithfully,
Salim Al Balushi
---
To the Library Manager,

I am excited to submit my application for the library assistant position. My passion for literature and commitment to community service make me an ideal candidate.

I have developed strong organizational skills through my school projects and have basic knowledge of library management systems. My communication skills are excellent, both in Arabic and English.

I can attend an interview at any time that suits you between Monday and Thursday. Please feel free to contact me to arrange a suitable time.

Thank you for considering my application. I am eager to bring my skills and enthusiasm to your library.

Sincerely,
Salma Al Balushi
"""
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(suggestions_content)
    
    print(f"📄 Created sample suggestions file: {filename}")
    return filename


def show_menu():
    """Display the main menu"""
    print("\n" + "=" * 60)
    print("🛠️  Writing Task 02 - HTML File Editor")
    print("=" * 60)
    print("\nPlease choose an option:")
    print("1. Use default settings (Museum example)")
    print("2. Enter information manually")
    print("3. View instructions")
    print("4. Create sample suggestions file only")
    print("5. Exit")
    
    choice = input("\nEnter option number (1-5): ").strip()
    return choice


def manual_input_mode():
    """Manual input mode"""
    print("\n📝 Manual Input Mode")
    print("-" * 40)
    
    # Ask for HTML file name
    html_file = input("Enter HTML filename (default: Writing 02.html): ").strip()
    if not html_file:
        html_file = "Writing 02.html"
    
    if not Path(html_file).exists():
        print(f"❌ File {html_file} not found!")
        return
    
    editor = WritingTaskEditor(html_file)
    
    # Ask for new situation
    print("\nEnter new situation (enter 'skip' to keep current):")
    situation = input("> ").strip()
    if situation.lower() != 'skip' and situation:
        editor.update_situation(situation)
    
    # Ask for new task
    print("\nEnter new task (enter 'skip' to keep current):")
    task = input("> ").strip()
    if task.lower() != 'skip' and task:
        editor.update_task(task)
    
    # Ask for new requirements
    print("\nEnter new requirements (one per line, enter 'skip' to finish):")
    requirements = []
    i = 1
    while True:
        req = input(f"Requirement {i}: ").strip()
        if req.lower() == 'skip':
            break
        if req:
            requirements.append(req)
            i += 1
        else:
            break
    
    if requirements:
        editor.update_requirements(requirements)
    
    # Ask for suggestions file
    suggestions_file = input("\nEnter suggestions filename (enter 'default' to use default): ").strip()
    if suggestions_file.lower() == 'default':
        if not Path("suggestions.txt").exists():
            create_sample_suggestions_file()
        suggestions_file = "suggestions.txt"
    
    editor.load_suggestions_from_file(suggestions_file)
    editor.add_suggested_versions()
    
    # Preview changes
    editor.preview_changes()
    
    # Save file
    save_choice = input("\nDo you want to save changes? (yes/no): ").strip().lower()
    if save_choice in ['yes', 'y', '']:
        output_name = input(f"Output filename [default: modified_{html_file}]: ").strip()
        if not output_name:
            output_name = f"modified_{html_file}"
        editor.save_html(output_name)
        print("✅ Done!")
    
    input("\nPress Enter to return to main menu...")


def default_mode():
    """Default settings mode"""
    print("\n🚀 Using default settings...")
    
    # Check if HTML file exists
    html_file = "Writing 02.html"
    if not Path(html_file).exists():
        print(f"❌ File {html_file} not found in current directory!")
        print("Files in current directory:")
        for f in os.listdir('.'):
            if f.endswith('.html'):
                print(f"  - {f}")
        return
    
    # Create suggestions file if it doesn't exist
    if not Path("suggestions.txt").exists():
        create_sample_suggestions_file()
    
    # Initialize editor
    editor = WritingTaskEditor(html_file)
    
    # Update situation (Museum example)
    new_situation = """Imagine that you are <strong>Ahmed/Alia Al Said</strong>. 
    You are a Grade 11 student who wants to volunteer at the local science museum 
    during the summer vacation. The museum needs student volunteers to help with 
    guided tours and science demonstrations."""
    
    # Update task
    new_task = """Write a formal email to the museum director to apply for the 
    volunteer position providing information about:"""
    
    # Update requirements
    new_requirements = [
        "Why you are interested in science and museums",
        "Your relevant skills and experience with public speaking",
        "Your availability during the summer months (June-August)",
        "How you can contribute to the museum's educational programs"
    ]
    
    # Apply modifications
    editor.update_situation(new_situation) \
          .update_task(new_task) \
          .update_requirements(new_requirements) \
          .load_suggestions_from_file("suggestions.txt") \
          .add_suggested_versions()
    
    # Preview changes
    editor.preview_changes()
    
    # Save file
    output_file = "Writing 02_modified.html"
    editor.save_html(output_file)
    
    print(f"\n✅ Done! Created file: {output_file}")
    print("📍 You can open the file in your browser to see the changes.")
    
    input("\nPress Enter to return to main menu...")


def main():
    """Main function"""
    print("\n" + "=" * 60)
    print("🎓 Writing Task Editor - Version 1.0")
    print("=" * 60)
    
    while True:
        choice = show_menu()
        
        if choice == '1':
            default_mode()
        elif choice == '2':
            manual_input_mode()
        elif choice == '3':
            print("""
📖 Instructions:
1. Make sure the HTML file is in the same folder
2. Choose option 1 for Museum example
3. Choose option 2 for manual input
4. You can modify:
   - Situation
   - Task
   - Requirements
   - Add 3 suggestions from a text file

📁 Suggestions File:
- Use '---' to separate suggestions
- Save as .txt file
- Should contain at least 3 suggestions

💡 Tips:
- Backup your original HTML file
- Check the modified file in a browser
- Suggestions should be formal emails
            """)
            input("\nPress Enter to return to main menu...")
        elif choice == '4':
            filename = input("Suggestions filename [default: suggestions.txt]: ").strip()
            if not filename:
                filename = "suggestions.txt"
            create_sample_suggestions_file(filename)
            input("\nPress Enter to return to main menu...")
        elif choice == '5':
            print("\nThank you for using the editor. Goodbye! 👋")
            break
        else:
            print("❌ Invalid choice! Please enter a number from 1 to 5")
            input("\nPress Enter to try again...")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nProgram closed by user.")
    except Exception as e:
        print(f"\n❌ An error occurred: {e}")
        input("Press Enter to exit...")