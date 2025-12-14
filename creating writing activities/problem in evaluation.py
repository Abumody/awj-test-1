#!/usr/bin/env python3
# coding: utf-8
"""
HTML Page Generator for Writing Tasks
Generates interactive writing pages similar to Writing 02
"""

import os
import json
import sys
import random

def generate_html_page(template_data):
    """
    Generate an HTML page based on the template data
    """
    
    # Prepare data for embedding in HTML
    examples_json = json.dumps(template_data.get("examples", []), indent=4)
    requirements_list = ''.join([f'<li>{req}</li>' for req in template_data.get("requirements", [])])
    
    # Create automatic placeholder text
    requirements = template_data.get("requirements", [])
    min_words = template_data.get("min_words", 100)
    student_name = template_data.get("student_name", "Your Name")
    
    placeholder_parts = []
    placeholder_parts.append("Start writing your response here...")
    placeholder_parts.append("")
    placeholder_parts.append("Remember:")
    placeholder_parts.append(f"• Write at least {min_words} words")
    placeholder_parts.append("• Include all required information")
    placeholder_parts.append("• Use formal language")
    placeholder_parts.append("• Check your grammar")
    placeholder_parts.append("")
    placeholder_parts.append("Example structure:")
    placeholder_parts.append("[Greeting]")
    for req in requirements:
        placeholder_parts.append(f"[{req}]")
    placeholder_parts.append("[Closing]")
    placeholder_parts.append(f"[{student_name}]")
    
    placeholder_text = "\n".join(placeholder_parts)
    
    # Get API keys
    api_keys = template_data.get("api_keys", {})
    deepseek_key = api_keys.get("deepseek", "sk-your-api-key-here")
    gemini_key = api_keys.get("gemini", "AIza-your-gemini-api-key-here")
    together_key = api_keys.get("together", "tg-your-together-api-key-here")
    
    # Get first example content
    examples = template_data.get("examples", [])
    example_content = examples[0]["content"] if examples else "No examples provided"
    
    # Create requirements text for AI prompt
    requirements_text = ""
    if requirements:
        requirements_text = "\n".join([f"{i+1}. {req}" for i, req in enumerate(requirements)])
    
    # Create HTML with embedded data
    html_template = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{template_data.get("title", "Writing Task")}</title>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }}
        
        body {{
            background-color: #f9f9f9;
            color: #333;
            line-height: 1.6;
            padding: 20px;
            min-height: 100vh;
        }}
        
        .container {{
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            overflow: hidden;
        }}
        
        header {{
            background: linear-gradient(135deg, #3498db, #2980b9);
            color: white;
            padding: 25px 40px;
            text-align: center;
        }}
        
        h1 {{
            font-size: 2rem;
            margin-bottom: 10px;
        }}
        
        .subtitle {{
            font-size: 1.1rem;
            opacity: 0.9;
        }}
        
        .student-info {{
            background: #f8f9fa;
            padding: 15px 40px;
            border-bottom: 2px solid #e9ecef;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }}
        
        .main-content {{
            padding: 40px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
        }}
        
        @media (max-width: 1024px) {{
            .main-content {{
                grid-template-columns: 1fr;
            }}
        }}
        
        .prompt-section {{
            background: #f8f9fa;
            border-radius: 10px;
            padding: 25px;
        }}
        
        .requirements {{
            background: #fff8e1;
            border-radius: 8px;
            padding: 15px;
            margin-top: 20px;
            border-left: 4px solid #f39c12;
        }}
        
        .writing-section {{
            display: flex;
            flex-direction: column;
        }}
        
        .word-count {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }}
        
        .word-counter {{
            font-size: 0.9rem;
            color: #666;
        }}
        
        .word-counter.warning {{
            color: #e74c3c;
            font-weight: bold;
        }}
        
        .writing-area {{
            min-height: 300px;
            padding: 15px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 1rem;
            line-height: 1.6;
            resize: vertical;
            font-family: inherit;
        }}
        
        .writing-area:focus {{
            outline: none;
            border-color: #3498db;
        }}
        
        .ai-options {{
            background: #e8f6f3;
            border-radius: 8px;
            padding: 15px;
            margin-top: 20px;
            border-left: 4px solid #1abc9c;
        }}
        
        .actions {{
            display: flex;
            gap: 10px;
            margin-top: 20px;
            flex-wrap: wrap;
        }}
        
        .btn {{
            padding: 12px 20px;
            border: none;
            border-radius: 5px;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            flex: 1;
            min-width: 140px;
        }}
        
        .btn-back {{
            background-color: #3498db;
            color: white;
        }}
        
        .btn-back:hover {{
            background-color: #2980b9;
            transform: translateY(-2px);
        }}
        
        .btn-reset {{
            background-color: #95a5a6;
            color: white;
        }}
        
        .btn-reset:hover {{
            background-color: #7f8c8d;
            transform: translateY(-2px);
        }}
        
        .btn-submit {{
            background-color: #27ae60;
            color: white;
        }}
        
        .btn-submit:hover {{
            background-color: #219653;
            transform: translateY(-2px);
        }}
        
        .btn-suggest {{
            background-color: #9b59b6;
            color: white;
        }}
        
        .btn-suggest:hover {{
            background-color: #8e44ad;
            transform: translateY(-2px);
        }}
        
        .btn-suggest-online {{
            background-color: #e74c3c;
            color: white;
        }}
        
        .btn-suggest-online:hover {{
            background-color: #c0392b;
            transform: translateY(-2px);
        }}
        
        .btn-suggest-online.loading {{
            background-color: #f39c12;
            cursor: not-allowed;
        }}
        
        .feedback-section {{
            display: none;
            margin-top: 30px;
            background: white;
            border-radius: 10px;
            padding: 25px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
            border: 2px solid #3498db;
        }}
        
        .feedback-section.show {{
            display: block;
            animation: fadeIn 0.5s ease;
        }}
        
        @keyframes fadeIn {{
            from {{ opacity: 0; transform: translateY(10px); }}
            to {{ opacity: 1; transform: translateY(0); }}
        }}
        
        .ai-thinking {{
            display: none;
            text-align: center;
            padding: 20px;
            color: #666;
        }}
        
        .ai-thinking.show {{
            display: block;
        }}
        
        .spinner {{
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #3498db;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-right: 10px;
        }}
        
        @keyframes spin {{
            0% {{ transform: rotate(0deg); }}
            100% {{ transform: rotate(360deg); }}
        }}
        
        .score-display {{
            background: linear-gradient(135deg, #27ae60, #219653);
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            margin-bottom: 20px;
        }}
        
        .score-value {{
            font-size: 2.5rem;
            font-weight: bold;
        }}
        
        .feedback-content {{
            margin: 20px 0;
        }}
        
        .feedback-item {{
            background: #f8f9fa;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 15px;
            border-left: 4px solid #3498db;
        }}
        
        .api-status {{
            background: #d4edda;
            border: 1px solid #c3e6cb;
            border-radius: 6px;
            padding: 10px;
            margin-top: 15px;
            font-size: 0.9rem;
            text-align: center;
        }}
        
        .api-status.warning {{
            background: #fff3cd;
            border-color: #ffeaa7;
            color: #856404;
        }}
        
        .criteria-display {{
            background: #e3f2fd;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
            border-left: 4px solid #2196f3;
        }}
        
        .criteria-display h4 {{
            color: #1565c0;
            margin-bottom: 10px;
        }}
        
        .criteria-item {{
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
            font-size: 0.9rem;
        }}
        
        .criteria-marks {{
            font-weight: bold;
            color: #2e7d32;
        }}
        
        .email-format {{
            background: #e8f5e9;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
            border-left: 4px solid #4caf50;
        }}
        
        .email-example {{
            background: white;
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 15px;
            margin-top: 10px;
            font-family: 'Georgia', serif;
            line-height: 1.6;
            font-size: 0.95rem;
        }}
        
        .comparison-section {{
            display: none;
            margin-top: 30px;
            background: white;
            border-radius: 10px;
            padding: 25px;
            border: 2px solid #9b59b6;
        }}
        
        .comparison-section.show {{
            display: block;
            animation: fadeIn 0.5s ease;
        }}
        
        .comparison-title {{
            text-align: center;
            color: #2c3e50;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #eee;
        }}
        
        .comparison-container {{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-top: 20px;
        }}
        
        @media (max-width: 768px) {{
            .comparison-container {{
                grid-template-columns: 1fr;
            }}
        }}
        
        .comparison-card {{
            background: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            border: 1px solid #e0e0e0;
            min-height: 300px;
            display: flex;
            flex-direction: column;
        }}
        
        .card-title {{
            color: white;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 15px;
            text-align: center;
            font-weight: bold;
        }}
        
        .student-card .card-title {{
            background-color: #3498db;
        }}
        
        .suggested-card .card-title {{
            background-color: #9b59b6;
        }}
        
        .card-content {{
            flex: 1;
            padding: 10px;
            background: white;
            border-radius: 5px;
            border: 1px solid #ddd;
            overflow-y: auto;
            line-height: 1.6;
            font-family: 'Georgia', serif;
            white-space: pre-wrap;
        }}
        
        .card-note {{
            margin-top: 10px;
            font-size: 0.85rem;
            color: #666;
            font-style: italic;
        }}
        
        .comparison-actions {{
            display: flex;
            gap: 10px;
            margin-top: 20px;
            justify-content: center;
        }}
        
        .btn-close {{
            background-color: #95a5a6;
            color: white;
            padding: 10px 20px;
        }}
        
        .btn-close:hover {{
            background-color: #7f8c8d;
        }}
        
        .mark-explanation {{
            background: #fff8e1;
            border-radius: 8px;
            padding: 15px;
            margin-top: 20px;
            border-left: 4px solid #f39c12;
        }}
        
        .explanation-points {{
            margin: 10px 0;
            padding-left: 20px;
        }}
        
        .explanation-points li {{
            margin-bottom: 8px;
        }}
        
        .good-example {{
            background: #e8f5e9;
            border-radius: 6px;
            padding: 10px;
            margin: 10px 0;
            border-left: 3px solid #4caf50;
        }}
        
        .version-source {{
            display: inline-block;
            background: #f39c12;
            color: white;
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: bold;
            margin-left: 10px;
        }}
        
        .version-source.ai {{
            background: #e74c3c;
        }}
        
        .version-source.stored {{
            background: #9b59b6;
        }}
        
        .version-status {{
            margin-top: 10px;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.85rem;
            text-align: center;
        }}
        
        .version-status.stored {{
            background: #e8f6f3;
            color: #16a085;
            border: 1px solid #1abc9c;
        }}
        
        .version-status.ai {{
            background: #fdedec;
            color: #c0392b;
            border: 1px solid #e74c3c;
        }}
        
        .version-status.error {{
            background: #fef9e7;
            color: #b7950b;
            border: 1px solid #f39c12;
        }}
        
        .suggested-actions {{
            display: flex;
            gap: 10px;
            margin-top: 15px;
            flex-wrap: wrap;
        }}
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>{template_data.get("title", "Writing Task")}</h1>
            <p class="subtitle">Grade 11, Semester 1 - 2024/2025</p>
            <p class="subtitle" style="font-size: 0.9rem; margin-top: 10px;">✨ Compare your writing with a suggested version</p>
        </header>
        
        <div class="student-info">
            <div class="student-details">
                Student: <strong id="studentName">Loading...</strong>
            </div>
            <div class="student-details">
                Time: <strong id="currentTime">Loading...</strong>
            </div>
        </div>
        
        <div class="main-content">
            <!-- Left: Prompt and Requirements -->
            <div class="prompt-section">
                <h3 style="color: #2c3e50; margin-bottom: 20px;">Writing Task</h3>
                <p style="margin-bottom: 20px; font-size: 1.1rem;">
                    <strong>Complete the following task. Write at least {min_words} words.</strong>
                </p>
                
                <div style="background: #fff; border-radius: 8px; padding: 20px; border: 1px solid #e0e0e0; margin-bottom: 20px;">
                    <h4 style="color: #2c3e50; margin-bottom: 10px;">Situation:</h4>
                    <p>{template_data.get("situation", "")}</p>
                    
                    <h4 style="color: #2c3e50; margin-top: 15px; margin-bottom: 10px;">Task:</h4>
                    <p>{template_data.get("task_description", "")}</p>
                    <ul style="margin-left: 20px; margin-top: 10px;">
                        {requirements_list}
                    </ul>
                    <p style="margin-top: 10px;"><em>Your writing should be clear and well-organised. Write at least {min_words} words.</em></p>
                </div>
                
                <div class="email-format">
                    <h4>📧 Important Format Rules:</h4>
                    <ul style="margin-left: 20px; margin-bottom: 10px;">
                        <li><strong>Must include:</strong> Greeting (Dear...) and Closing (Yours sincerely...)</li>
                        <li><strong>If missing greeting OR closing:</strong> 1 mark will be deducted</li>
                        <li><strong>No addresses needed</strong> - addresses are ignored in marking</li>
                        <li><strong>No signature needed</strong> - just your name after closing</li>
                    </ul>
                </div>
                
                <div class="criteria-display">
                    <h4>📋 Official Marking Guide:</h4>
                    <div class="criteria-item">
                        <span><strong>10/10:</strong> Very clear message, succeeds in purpose, well-organised, good grammar</span>
                    </div>
                    <div class="criteria-item">
                        <span><strong>8/10:</strong> Fairly clear, reasonable success, generally organised, reasonably correct</span>
                    </div>
                    <div class="criteria-item">
                        <span><strong>6/10:</strong> Mixed message, partially achieved purpose, poorly organised but clear</span>
                    </div>
                    <div class="criteria-item">
                        <span><strong>4/10:</strong> Partially clear, very limited success, lacks organization, frequent errors</span>
                    </div>
                    <div class="criteria-item">
                        <span><strong>2/10:</strong> Mostly unclear, fails purpose, incoherent, limited grammar</span>
                    </div>
                    <div class="criteria-item">
                        <span><strong>0/10:</strong> No attempt/irrelevant/copied/not English</span>
                    </div>
                </div>
                
                <div class="ai-options">
                    <h4>🤖 How to Use This Tool:</h4>
                    <ol style="margin-left: 20px; margin-bottom: 10px;">
                        <li>Write your email in the box on the right</li>
                        <li>Click <strong>"Get Suggested Version"</strong> to see an example from stored versions</li>
                        <li>Click <strong>"Get Online Version"</strong> for a new AI-generated example</li>
                        <li>Compare your writing with the example</li>
                        <li>Click <strong>"Get AI Feedback"</strong> for your marks</li>
                    </ol>
                    <div class="api-status" id="apiStatus">
                        <i class="fas fa-check-circle"></i> System Ready: Using Hybrid Mode (Stored + AI)
                    </div>
                </div>
            </div>
            
            <!-- Right: Writing Area -->
            <div class="writing-section">
                <div class="word-count">
                    <span>Write your formal email below:</span>
                    <span class="word-counter" id="wordCounter">Words: 0</span>
                </div>
                
                <textarea 
                    class="writing-area" 
                    id="writingArea" 
                    placeholder="{placeholder_text}"
                    oninput="updateWordCount()"
                ></textarea>
                
                <div class="actions">
                    <button class="btn btn-back" onclick="goBack()">← Back</button>
                    <button class="btn btn-reset" onclick="resetWriting()">Clear</button>
                    <button class="btn btn-suggest" onclick="showComparison(false)">Get Suggested Version</button>
                    <button class="btn btn-suggest-online" onclick="showComparison(true)" id="onlineBtn">Get Online Version</button>
                    <button class="btn btn-submit" onclick="submitWriting()">Get AI Feedback</button>
                </div>
                
                <!-- AI Thinking Indicator -->
                <div class="ai-thinking" id="aiThinking">
                    <div class="spinner"></div>
                    <p id="thinkingMessage">AI is evaluating your writing...</p>
                </div>
                
                <!-- Comparison Section (Two Cards) -->
                <div class="comparison-section" id="comparisonSection">
                    <h3 class="comparison-title">📝 Compare Your Writing</h3>
                    <div id="versionStatus" class="version-status stored">
                        <i class="fas fa-database"></i> Showing a stored example version. Click "Get Online Version" for AI-generated content.
                    </div>
                    
                    <div class="comparison-container">
                        <!-- Student's Writing Card -->
                        <div class="comparison-card student-card">
                            <div class="card-title">Your Writing <span class="word-counter" id="studentWordCount" style="color: white; font-size: 0.8rem; float: right;">Words: 0</span></div>
                            <div class="card-content" id="studentWritingDisplay">
                                <!-- Student's writing will appear here -->
                            </div>
                            <div class="card-note">This is what you wrote. Check if you included all requirements.</div>
                        </div>
                        
                        <!-- Suggested Version Card -->
                        <div class="comparison-card suggested-card">
                            <div class="card-title">Suggested Version <span id="versionSource" class="version-source stored">STORED</span></div>
                            <div class="card-content" id="suggestedContent">
{example_content}
                            </div>
                            <div class="card-note" id="suggestedNote">Note: This is an example. Your writing can be different but should include all requirements.</div>
                        </div>
                    </div>
                    
                    <div class="mark-explanation">
                        <h4>🎯 Why This is a Good Example:</h4>
                        <ul class="explanation-points">
                            <li><strong>Clear message:</strong> Says exactly why applying for the job</li>
                            <li><strong>Good organization:</strong> Separate paragraphs for each requirement</li>
                            <li><strong>Complete:</strong> Includes all required pieces of information</li>
                            <li><strong>Formal language:</strong> Uses appropriate formal expressions</li>
                            <li><strong>Correct format:</strong> Has greeting (Dear...) and closing (Yours sincerely...)</li>
                        </ul>
                        <div class="good-example">
                            <strong>Tip:</strong> Compare how the suggested version organizes information. Each paragraph answers one part of the task.
                        </div>
                    </div>
                    
                    <div class="suggested-actions">
                        <button class="btn btn-suggest" onclick="showComparison(false)">New Stored Example</button>
                        <button class="btn btn-suggest-online" onclick="showComparison(true)">Get Online Version</button>
                        <button class="btn btn-submit" onclick="submitWriting()">Get Feedback on My Writing</button>
                        <button class="btn btn-close" onclick="hideComparison()">Close Comparison</button>
                    </div>
                </div>
                
                <!-- Feedback Section -->
                <div class="feedback-section" id="feedbackSection">
                    <div class="score-display">
                        <div class="score-value" id="aiScore">0/10</div>
                        <div>Your Score According to Official Criteria</div>
                    </div>
                    
                    <div class="feedback-content" id="feedbackContent">
                        <!-- AI feedback will appear here -->
                    </div>
                    
                    <div class="actions">
                        <button class="btn btn-suggest" onclick="showComparison(false)">Compare with Example</button>
                        <button class="btn btn-reset" onclick="resetWriting()">Try Again</button>
                        <button class="btn btn-submit" onclick="submitWriting()">New Feedback</button>
                        <button class="btn btn-back" onclick="saveAndExit()">Save & Exit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // ============================================
        // CONFIGURATION
        // ============================================
        const AI_SERVICE = 'deepseek';
        const API_KEYS = {{
            deepseek: '{deepseek_key}',
            gemini: '{gemini_key}',
            together: '{together_key}'
        }};
        // ============================================
        
        const urlParams = new URLSearchParams(window.location.search);
        const studentName = urlParams.get('student') || 'Student';
        const apiKey = API_KEYS[AI_SERVICE];
        
        // STORED EXAMPLES DATABASE
        const storedExamples = {examples_json};
        
        // Current state
        let currentStoredExampleIndex = 0;
        let lastUsedExampleIndex = -1;
        
        document.addEventListener('DOMContentLoaded', function() {{
            loadStudentName();
            updateTime();
            setInterval(updateTime, 60000);
            
            // Display API status
            const apiStatus = document.getElementById('apiStatus');
            const useRealAI = AI_SERVICE !== 'simulated' && 
                             apiKey && 
                             apiKey.length > 20 && 
                             !apiKey.includes('your-');
            
            if (useRealAI) {{
                apiStatus.innerHTML = '<i class="fas fa-check-circle"></i> System Ready: Hybrid Mode (Stored + DeepSeek AI)';
            }} else {{
                apiStatus.innerHTML = '<i class="fas fa-exclamation-triangle"></i> AI Service Offline: Using stored examples only';
                apiStatus.classList.add('warning');
            }}
            
            // Load a random stored example initially
            loadRandomStoredExample();
        }});
        
        function loadStudentName() {{
            document.getElementById('studentName').textContent = studentName;
        }}
        
        function updateTime() {{
            const now = new Date();
            const timeString = now.toLocaleTimeString([], {{ hour: '2-digit', minute: '2-digit' }});
            document.getElementById('currentTime').textContent = timeString;
        }}
        
        function updateWordCount() {{
            const text = document.getElementById('writingArea').value;
            const words = text.trim().split(/\\s+/).filter(word => word.length > 0);
            const wordCount = words.length;
            
            const counter = document.getElementById('wordCounter');
            counter.textContent = `Words: ${{wordCount}}`;
            
            if (wordCount < {min_words}) {{
                counter.classList.add('warning');
            }} else {{
                counter.classList.remove('warning');
            }}
        }}
        
        function goBack() {{
            window.location.href = `../dashboard.html?student=${{encodeURIComponent(studentName)}}`;
        }}
        
        function resetWriting() {{
            if (confirm('Clear your email?')) {{
                document.getElementById('writingArea').value = '';
                updateWordCount();
                hideFeedback();
                hideComparison();
            }}
        }}
        
        function hideFeedback() {{
            document.getElementById('feedbackSection').classList.remove('show');
        }}
        
        function hideComparison() {{
            document.getElementById('comparisonSection').classList.remove('show');
        }}
        
        // Load a random stored example (avoid repeating the same one)
        function loadRandomStoredExample() {{
            if (storedExamples.length === 0) return null;
            
            let randomIndex;
            do {{
                randomIndex = Math.floor(Math.random() * storedExamples.length);
            }} while (randomIndex === lastUsedExampleIndex && storedExamples.length > 1);
            
            lastUsedExampleIndex = randomIndex;
            currentStoredExampleIndex = randomIndex;
            
            const example = storedExamples[randomIndex];
            document.getElementById('suggestedContent').textContent = example.content;
            document.getElementById('suggestedNote').innerHTML = 
                `Note: Example ${{randomIndex + 1}} of ${{storedExamples.length}} (${{example.description}})`;
            
            return example;
        }}
        
        // Show comparison with option for online or stored
        async function showComparison(useOnline = false) {{
            const studentText = document.getElementById('writingArea').value.trim();
            
            if (!studentText) {{
                alert('Please write something first before comparing.');
                return;
            }}
            
            // Display student's writing in the comparison card
            document.getElementById('studentWritingDisplay').textContent = studentText;
            const studentWordCount = studentText.split(/\\s+/).filter(word => word.length > 0).length;
            document.getElementById('studentWordCount').textContent = `Words: ${{studentWordCount}}`;
            
            const versionSource = document.getElementById('versionSource');
            const versionStatus = document.getElementById('versionStatus');
            
            if (useOnline) {{
                // Try to get AI-generated version
                versionSource.textContent = "AI";
                versionSource.className = "version-source ai";
                versionStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Requesting AI-generated version...';
                versionStatus.className = "version-status ai";
                
                document.getElementById('comparisonSection').classList.add('show');
                document.getElementById('comparisonSection').scrollIntoView({{ behavior: 'smooth' }});
                
                try {{
                    const aiVersion = await getAISuggestedVersion();
                    document.getElementById('suggestedContent').textContent = aiVersion;
                    document.getElementById('suggestedNote').innerHTML = 
                        '<i class="fas fa-robot"></i> AI-generated version (DeepSeek). Each version is unique.';
                    versionStatus.innerHTML = '<i class="fas fa-check-circle"></i> AI-generated version loaded successfully!';
                }} catch (error) {{
                    console.error('AI Error:', error);
                    // Fall back to stored version
                    const example = loadRandomStoredExample();
                    versionSource.textContent = "STORED";
                    versionSource.className = "version-source stored";
                    versionStatus.innerHTML = `AI unavailable. Showing stored example (${{example ? example.description : 'default'}}).`;
                    versionStatus.className = "version-status error";
                }}
            }} else {{
                // Use stored version
                const example = loadRandomStoredExample();
                versionSource.textContent = "STORED";
                versionSource.className = "version-source stored";
                versionStatus.innerHTML = `Showing stored example ${{currentStoredExampleIndex + 1}} of ${{storedExamples.length}} (${{example ? example.description : 'default'}}).`;
                versionStatus.className = "version-status stored";
                
                document.getElementById('comparisonSection').classList.add('show');
                document.getElementById('comparisonSection').scrollIntoView({{ behavior: 'smooth' }});
            }}
            
            // Hide feedback if it's showing
            hideFeedback();
        }}
        
        // Get AI suggested version using DeepSeek
        async function getAISuggestedVersion() {{
            const onlineBtn = document.getElementById('onlineBtn');
            const originalText = onlineBtn.innerHTML;
            onlineBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
            onlineBtn.classList.add('loading');
            onlineBtn.disabled = true;
            
            try {{
                // Check if API key is valid
                const useRealAI = AI_SERVICE !== 'simulated' && 
                                 apiKey && 
                                 apiKey.length > 20 && 
                                 !apiKey.includes('your-');
                
                if (!useRealAI) {{
                    throw new Error('API key not configured or invalid');
                }}
                
                const requirementsList = {json.dumps(requirements, ensure_ascii=False)};
                const systemPrompt = `You are an English teacher helping Grade 11 students write a formal email. 
Create a model answer for this task:
"{template_data.get("task_description", "")}"

Requirements:
{requirements_text}

General Requirements:
1. Use formal email format (greeting, body paragraphs, closing)
2. Write as {student_name}
3. Include all required pieces of information
4. Write {min_words}+ words
5. Use appropriate formal language
6. Make it realistic for a Grade 11 student
7. Each version should be unique - vary the structure, vocabulary, and examples

Write ONLY the email content (no explanations, no markdown).`;

                const response = await fetch('https://api.deepseek.com/chat/completions', {{
                    method: 'POST',
                    headers: {{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${{apiKey}}`
                    }},
                    body: JSON.stringify({{
                        model: 'deepseek-chat',
                        messages: [
                            {{ role: 'system', content: systemPrompt }},
                            {{ role: 'user', content: 'Generate a model email for this writing task.' }}
                        ],
                        temperature: 0.8, // Higher temperature for more variety
                        max_tokens: 500
                    }})
                }});
                
                if (!response.ok) {{
                    throw new Error(`API error: ${{response.status}}`);
                }}
                
                const data = await response.json();
                const aiResponse = data.choices[0].message.content;
                
                // Clean up the response
                let cleanedResponse = aiResponse.trim();
                // Remove any markdown formatting if present
                cleanedResponse = cleanedResponse.replace(/```[\\s\\S]*?\\n|```/g, '');
                
                return cleanedResponse;
                
            }} catch (error) {{
                console.error('AI Generation Error:', error);
                // Return a fallback generated version using templates
                return generateFallbackVersion();
            }} finally {{
                onlineBtn.innerHTML = originalText;
                onlineBtn.classList.remove('loading');
                onlineBtn.disabled = false;
            }}
        }}
        
        // Generate fallback version using templates if AI fails
        function generateFallbackVersion() {{
            const greetings = [
                "Dear Hiring Manager,",
                "Dear Sir/Madam,",
                "To the Recruitment Team,",
                "Dear Selection Committee,"
            ];
            
            const closings = [
                `Thank you for considering my application. I look forward to the possibility of contributing to your team.\\n\\nYours sincerely,\\n{student_name}`,
                `I appreciate your time and consideration. I am enthusiastic about this opportunity and hope to discuss my application further.\\n\\nYours faithfully,\\n{student_name}`,
                `Thank you for reviewing my application. I am eager to bring my skills and enthusiasm to your organization.\\n\\nSincerely,\\n{student_name}`
            ];
            
            // Create paragraphs based on requirements
            let bodyParagraphs = [];
            const reqs = {json.dumps(requirements, ensure_ascii=False)};
            
            for (let i = 0; i < reqs.length; i++) {{
                const req = reqs[i];
                bodyParagraphs.push(`[Paragraph addressing: ${{req}}]`);
            }}
            
            // Randomly select components
            const greeting = greetings[Math.floor(Math.random() * greetings.length)];
            const closing = closings[Math.floor(Math.random() * closings.length)];
            
            return `${{greeting}}\\n\\n${{bodyParagraphs.join('\\n\\n')}}\\n\\n${{closing}}`;
        }}
        
        // Main submission function
        async function submitWriting() {{
            const writingText = document.getElementById('writingArea').value.trim();
            const wordCount = writingText.split(/\\s+/).filter(word => word.length > 0).length;
            
            if (writingText.length === 0) {{
                alert('Please write your email before getting feedback.');
                return;
            }}
            
            // Show thinking indicator
            const thinkingMessage = document.getElementById('thinkingMessage');
            thinkingMessage.textContent = 'Evaluating your writing against official criteria...';
            document.getElementById('aiThinking').classList.add('show');
            
            try {{
                let feedback;
                
                // Check if we should use real AI or simulated
                const useRealAI = AI_SERVICE !== 'simulated' && 
                                 apiKey && 
                                 apiKey.length > 20 && 
                                 !apiKey.includes('your-');
                
                if (useRealAI) {{
                    feedback = await getAIFeedback(writingText, wordCount);
                }} else {{
                    feedback = getSimulatedFeedback(writingText, wordCount);
                }}
                
                // Display feedback
                displayFeedback(feedback);
                
                // Save result
                saveWritingResult(feedback.score, wordCount);
                
                // Hide comparison if showing
                hideComparison();
                
            }} catch (error) {{
                console.error('Error:', error);
                // Fallback to simulated
                const feedback = getSimulatedFeedback(writingText, wordCount);
                displayFeedback(feedback);
                saveWritingResult(feedback.score, wordCount);
                hideComparison();
                
            }} finally {{
                setTimeout(() => {{
                    document.getElementById('aiThinking').classList.remove('show');
                }}, 500);
            }}
        }}
        
        // Get AI feedback
        async function getAIFeedback(writingText, wordCount) {{
            if (!apiKey || apiKey.includes('your-')) {{
                throw new Error('API key not configured');
            }}
            
            const requirements_text = `{requirements_text}\\n${{len(requirements) + 1}}. At least {min_words} words\\n${{len(requirements) + 2}}. Clear and well-organised`;
            
            const systemPrompt = `You are an English teacher grading a Grade 11 formal email. Use the OFFICIAL MARKING GUIDE:

10 MARKS: Very clear message, succeeds in purpose, well-organised, good grammar
8 MARKS: Fairly clear, reasonable success, generally organised, reasonably correct
6 MARKS: Mixed message, partially achieved purpose, poorly organised but clear
4 MARKS: Partially clear, very limited success, lacks organization, frequent errors
2 MARKS: Mostly unclear, fails purpose, incoherent, limited grammar
0 MARKS: No attempt/irrelevant/copied/not English

IMPORTANT RULES:
1. MUST have greeting (Dear...) AND closing (Yours sincerely...)
2. If missing greeting OR closing: DEDUCT 1 MARK
3. Addresses are ignored - don't mark them

TASK REQUIREMENTS (Purpose):
{requirements_text}

GRADING STEPS:
1. Check greeting and closing (deduct 1 if missing)
2. Check all requirements are covered
3. Check word count ({min_words}+)
4. Evaluate clarity, organization, grammar
5. Assign rating (10,8,6,4,2,0)
6. Apply deduction if needed

Provide feedback in this JSON format:
{{
    "score": "X/10",
    "ratingLevel": "10/8/6/4/2/0",
    "messageClarity": "Clear/Fairly clear/Mixed/Partially clear/Mostly unclear",
    "purposeAchieved": "Yes/Partially/No - which requirements missing",
    "organization": "Well-organised/Generally organised/Poorly organised/Lacks organization/Incoherent",
    "grammar": "Good/Reasonable/Noticeable errors/Frequent errors/Limited",
    "missingGreetingClosing": "Yes/No",
    "deductionApplied": "Yes/No",
    "wordCount": "XX words (Meets/Doesn't meet {min_words})",
    "strengths": ["What is good", "What is good"],
    "improvements": ["What to improve", "What to improve"],
    "whyThisScore": "Explain exactly why this score according to official criteria"
}}`;

            const userPrompt = `Grade this email ({template_data.get("title", "Writing Task")}) (${{wordCount}} words):\\n\\n${{writingText}}`;
            
            try {{
                const response = await fetch('https://api.deepseek.com/chat/completions', {{
                    method: 'POST',
                    headers: {{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${{apiKey}}`
                    }},
                    body: JSON.stringify({{
                        model: 'deepseek-chat',
                        messages: [
                            {{ role: 'system', content: systemPrompt }},
                            {{ role: 'user', content: userPrompt }}
                        ],
                        temperature: 0.3,
                        max_tokens: 800
                    }})
                }});
                
                if (!response.ok) throw new Error(`API error: ${{response.status}}`);
                
                const data = await response.json();
                const aiResponse = data.choices[0].message.content;
                
                try {{
                    const jsonMatch = aiResponse.match(/\\{{[\\s\\S]*\\}}/);
                    const jsonText = jsonMatch ? jsonMatch[0] : aiResponse;
                    return JSON.parse(jsonText);
                }} catch (parseError) {{
                    return getSimulatedFeedback(writingText, wordCount);
                }}
                
            }} catch (error) {{
                throw error;
            }}
        }}
        
        // Simulated feedback
        function getSimulatedFeedback(writingText, wordCount) {{
            const lowerText = writingText.toLowerCase();
            
            // Check format
            const hasGreeting = /dear\\s+(mr|ms|mrs|sir|madam|manager|hiring|recruitment|selection)/i.test(writingText);
            const hasClosing = /(yours sincerely|sincerely yours|yours faithfully|sincerely|best regards)/i.test(writingText);
            
            // Check content - we'll simulate checking requirements
            const requirements = {json.dumps(requirements, ensure_ascii=False)};
            let requirementsCovered = 0;
            
            for (let i = 0; i < requirements.length; i++) {{
                const req = requirements[i];
                // Check if the requirement is mentioned (first 3 words)
                const reqWords = req.toLowerCase().split(' ').slice(0, 3);
                for (let j = 0; j < Math.min(reqWords.length, 3); j++) {{
                    const word = reqWords[j];
                    if (word.length > 3 && lowerText.includes(word)) {{
                        requirementsCovered++;
                        break;
                    }}
                }}
            }}
            
            // Check grammar and organization
            const grammarScore = estimateGrammarScore(writingText);
            const paragraphs = writingText.split(/\\n\\s*\\n/).filter(p => p.trim().length > 0);
            const hasStructure = paragraphs.length >= 3;
            
            // Determine rating level
            let ratingLevel, score;
            const totalRequirements = requirements.length;
            
            if (wordCount < 20) {{
                ratingLevel = "0";
                score = 0;
            }} else if (requirementsCovered >= totalRequirements && grammarScore > 0.7 && hasStructure && wordCount >= {min_words}) {{
                ratingLevel = "10";
                score = 10;
            }} else if (requirementsCovered >= totalRequirements - 1 && grammarScore > 0.6 && wordCount >= {min_words} - 20) {{
                ratingLevel = "8";
                score = 8;
            }} else if (requirementsCovered >= totalRequirements - 1 && grammarScore > 0.5) {{
                ratingLevel = "6";
                score = 6;
            }} else if (requirementsCovered >= totalRequirements - 2 && grammarScore > 0.3) {{
                ratingLevel = "4";
                score = 4;
            }} else {{
                ratingLevel = "2";
                score = 2;
            }}
            
            // Apply deduction for missing greeting/closing
            let deduction = 0;
            if (!hasGreeting || !hasClosing) {{
                deduction = 1;
                score = Math.max(0, score - deduction);
            }}
            
            // Message clarity descriptions
            const clarityLevels = ["Very clear", "Fairly clear", "Mixed", "Partially clear", "Mostly unclear"];
            const clarityIndex = Math.min(Math.floor(score/2), 4);
            
            return {{
                score: `${{score}}/10`,
                ratingLevel: ratingLevel,
                messageClarity: clarityLevels[clarityIndex],
                purposeAchieved: requirementsCovered === totalRequirements ? "Yes" : `Partially (${{requirementsCovered}}/${{totalRequirements}} requirements)`,
                organization: hasStructure ? "Generally organised" : "Needs better organization",
                grammar: grammarScore > 0.7 ? "Good" : grammarScore > 0.5 ? "Reasonable" : "Needs improvement",
                missingGreetingClosing: (!hasGreeting || !hasClosing) ? "Yes" : "No",
                deductionApplied: deduction > 0 ? "Yes (1 mark deducted)" : "No",
                wordCount: `${{wordCount}} words ${{wordCount >= {min_words} ? "(Meets " + {min_words} + ")" : "(Doesn't meet " + {min_words} + ")"}}`,
                strengths: [
                    requirementsCovered > 0 ? `Covers ${{requirementsCovered}}/${{totalRequirements}} requirements` : "Attempted task",
                    wordCount > 50 ? `Good length (${{wordCount}} words)` : "Started writing",
                    hasGreeting && hasClosing ? "Correct format" : null
                ].filter(Boolean),
                improvements: [
                    requirementsCovered < totalRequirements ? `Add missing requirements (${{totalRequirements - requirementsCovered}} missing)` : null,
                    !hasGreeting ? "Add greeting (Dear...)" : null,
                    !hasClosing ? "Add closing (Yours sincerely...)" : null,
                    wordCount < {min_words} ? `Write more (aim for {min_words}+ words)` : null,
                    grammarScore < 0.6 ? "Check grammar and spelling" : null
                ].filter(Boolean),
                whyThisScore: `You got ${{score}}/10 because: ${{score >= 8 ? "Your message is clear and well-organized with good grammar." : score >= 6 ? "Your message is understandable but could be clearer or better organized." : score >= 4 ? "Your message is partially clear but has organization or grammar issues." : "Your message needs significant improvement in clarity and organization."}} ${{deduction > 0 ? " Also, 1 mark was deducted for missing greeting or closing." : ""}}`
            }};
        }}
        
        function estimateGrammarScore(text) {{
            const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
            if (sentences.length === 0) return 0.3;
            
            const firstChars = sentences.map(s => s.trim()[0]);
            const properCaps = firstChars.filter(c => c === c.toUpperCase()).length;
            const capScore = properCaps / sentences.length;
            
            let errorCount = 0;
            const words = text.toLowerCase().split(/\\s+/);
            errorCount += words.filter(w => w === 'u' || w === 'ur' || w === 'r').length;
            
            return Math.max(0.3, capScore - (errorCount * 0.05));
        }}
        
        // Display feedback
        function displayFeedback(feedback) {{
            const feedbackContent = document.getElementById('feedbackContent');
            const aiScore = document.getElementById('aiScore');
            
            aiScore.textContent = feedback.score;
            
            feedbackContent.innerHTML = `
                <div class="feedback-item">
                    <h4>📊 Your Score: ${{feedback.score}}</h4>
                    <p><strong>Why you got this score:</strong> ${{feedback.whyThisScore || 'Based on official criteria'}}</p>
                    <p><strong>Official Rating Level:</strong> ${{feedback.ratingLevel || 'Not specified'}}/10 level</p>
                    ${{feedback.deductionApplied ? `<p><strong>Format Deduction:</strong> ${{feedback.deductionApplied}}</p>` : ''}}
                </div>
                
                <div class="feedback-item">
                    <h4>✅ What You Did Well</h4>
                    <ul>
                        ${{(feedback.strengths || ['Good effort']).map(s => `<li>${{s}}</li>`).join('')}}
                    </ul>
                </div>
                
                <div class="feedback-item">
                    <h4>🎯 How to Improve</h4>
                    <ul>
                        ${{(feedback.improvements || ['Check the requirements']).map(i => `<li>${{i}}</li>`).join('')}}
                    </ul>
                </div>
                
                <div class="feedback-item">
                    <h4>📝 Detailed Evaluation</h4>
                    <p><strong>Message Clarity:</strong> ${{feedback.messageClarity || 'Not evaluated'}}</p>
                    <p><strong>Purpose Achieved:</strong> ${{feedback.purposeAchieved || 'Not evaluated'}}</p>
                    <p><strong>Organization:</strong> ${{feedback.organization || 'Not evaluated'}}</p>
                    <p><strong>Grammar & Vocabulary:</strong> ${{feedback.grammar || 'Not evaluated'}}</p>
                    <p><strong>Word Count:</strong> ${{feedback.wordCount || 'Not counted'}}</p>
                    <p><strong>Format Check:</strong> ${{feedback.missingGreetingClosing === 'Yes' ? 'Missing greeting or closing' : 'Greeting and closing present'}}</p>
                </div>
                
                <div class="feedback-item">
                    <h4>💡 Next Steps</h4>
                    <p>Compare your writing with the suggested version to see:</p>
                    <ol>
                        <li>How to organize information in paragraphs</li>
                        <li>How to use formal language</li>
                        <li>How to include all required information clearly</li>
                    </ol>
                    <p style="margin-top: 10px; font-style: italic;">
                        Click "Compare with Example" button to see side-by-side comparison.
                    </p>
                </div>
            `;
            
            document.getElementById('feedbackSection').classList.add('show');
            document.getElementById('feedbackSection').scrollIntoView({{ behavior: 'smooth' }});
        }}
        
        // Save result
        function saveWritingResult(scoreString, wordCount) {{
            const score = parseFloat(scoreString.split('/')[0]);
            const total = 10;
            const percentage = Math.round((score / total) * 100);
            const grade = calculateGrade(score, total);
            
            const result = {{
                activity: "{template_data.get("title", "Writing Task")}",
                score: score,
                total: total,
                percentage: percentage,
                date: new Date().toLocaleString(),
                grade: grade,
                wordCount: wordCount
            }};
            
            const allResults = JSON.parse(localStorage.getItem('examResults') || '[]');
            allResults.push(result);
            localStorage.setItem('examResults', JSON.stringify(allResults));
            localStorage.setItem('{template_data.get("filename", "writing_task").replace(" ", "_").lower()}_result', JSON.stringify(result));
            localStorage.setItem('justCompletedModule', '{template_data.get("filename", "writing_task").replace(" ", "_").lower()}');
            
            return result;
        }}
        
        function calculateGrade(score, total) {{
            const percentage = (score / total) * 100;
            if (percentage >= 90) return "A";
            if (percentage >= 80) return "B";
            if (percentage >= 70) return "C";
            if (percentage >= 60) return "D";
            return "F";
        }}
        
        function saveAndExit() {{
            alert('Your writing has been saved. Returning to dashboard.');
            goBack();
        }}
        
        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {{
            if (e.ctrlKey && e.code === 'Enter') {{
                e.preventDefault();
                submitWriting();
            }}
        }});
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js"></script>
</body>
</html>'''
    
    return html_template

def get_user_input():
    """Get user input for the writing task"""
    
    print("=" * 60)
    print("Writing Task HTML Generator")
    print("=" * 60)
    print()
    
    template_data = {}
    
    # Basic information
    template_data["title"] = input("Enter the page title (e.g., 'Writing 02 - Formal Email'): ").strip()
    template_data["filename"] = input("Enter output filename (without .html): ").strip().replace(" ", "_")
    
    # Task information
    print("\n--- Writing Task Information ---")
    template_data["situation"] = input("Enter the situation/context: ").strip()
    template_data["task_description"] = input("Enter the task description: ").strip()
    
    # Requirements
    print("\n--- Task Requirements ---")
    print("Enter each requirement (press Enter on empty line to finish):")
    requirements = []
    while True:
        req = input(f"Requirement {len(requirements)+1}: ").strip()
        if not req:
            break
        requirements.append(req)
    template_data["requirements"] = requirements
    
    # Minimum words
    min_words = input(f"Minimum words (default 100): ").strip()
    template_data["min_words"] = int(min_words) if min_words.isdigit() else 100
    
    # Student name
    template_data["student_name"] = input("Student name (e.g., 'Salim/Salma Al Balushi'): ").strip()
    
    # Examples
    print("\n--- Stored Examples ---")
    num_examples = input("How many examples do you want to add? ").strip()
    num_examples = int(num_examples) if num_examples.isdigit() else 3
    
    examples = []
    for i in range(num_examples):
        print(f"\n--- Example {i+1} ---")
        description = input(f"Description for example {i+1}: ").strip()
        print(f"Enter the content for example {i+1} (type 'END' on a new line to finish):")
        
        lines = []
        while True:
            line = input()
            if line.strip().upper() == "END":
                break
            lines.append(line)
        
        content = "\n".join(lines)
        
        examples.append({
            "id": i + 1,
            "description": description,
            "content": content
        })
    
    template_data["examples"] = examples
    
    # API keys (optional)
    print("\n--- API Configuration (Optional) ---")
    use_api = input("Do you want to configure API keys? (y/n): ").strip().lower()
    
    if use_api == 'y':
        api_keys = {}
        deepseek_key = input("DeepSeek API key (leave blank to skip): ").strip()
        if deepseek_key:
            api_keys["deepseek"] = deepseek_key
        
        gemini_key = input("Gemini API key (leave blank to skip): ").strip()
        if gemini_key:
            api_keys["gemini"] = gemini_key
            
        template_data["api_keys"] = api_keys
    else:
        template_data["api_keys"] = {}
    
    return template_data

def save_html_file(filename, html_content):
    """Save HTML content to file"""
    
    if not filename.endswith(".html"):
        filename += ".html"
    
    with open(filename, "w", encoding="utf-8") as f:
        f.write(html_content)
    
    print(f"\n✅ HTML file saved as: {filename}")
    print(f"📁 File size: {len(html_content)} bytes")
    
    return filename

def create_template_json(template_data):
    """Create a JSON template file for reuse"""
    
    json_filename = f"{template_data['filename']}_template.json"
    
    with open(json_filename, "w", encoding="utf-8") as f:
        json.dump(template_data, f, indent=2, ensure_ascii=False)
    
    print(f"📄 Template JSON saved as: {json_filename}")
    return json_filename

def load_from_json():
    """Load template data from JSON file"""
    
    json_file = input("Enter JSON template filename: ").strip()
    
    if not json_file.endswith(".json"):
        json_file += ".json"
    
    try:
        with open(json_file, "r", encoding="utf-8") as f:
            template_data = json.load(f)
        
        print(f"✅ Template loaded from {json_file}")
        return template_data
    except FileNotFoundError:
        print(f"❌ File {json_file} not found!")
        return None
    except json.JSONDecodeError:
        print(f"❌ Invalid JSON file: {json_file}")
        return None

def main():
    """Main function"""
    
    print("Writing Task HTML Generator")
    print("=" * 60)
    
    # Ask user if they want to load from JSON or create new
    choice = input("\nDo you want to: \n1. Create new template\n2. Load from JSON file\nEnter choice (1 or 2): ").strip()
    
    if choice == "2":
        template_data = load_from_json()
        if not template_data:
            print("Creating new template instead...")
            template_data = get_user_input()
    else:
        template_data = get_user_input()
    
    # Generate HTML
    print("\n" + "=" * 60)
    print("Generating HTML page...")
    
    try:
        html_content = generate_html_page(template_data)
        
        # Save HTML file
        filename = save_html_file(template_data["filename"], html_content)
        
        # Save template as JSON for reuse
        save_template = input("\nSave as reusable JSON template? (y/n): ").strip().lower()
        if save_template == 'y':
            create_template_json(template_data)
        
        print("\n" + "=" * 60)
        print("🎉 HTML page generated successfully!")
        print(f"📄 Open {filename} in your browser to view the page.")
        print("=" * 60)
        
    except Exception as e:
        print(f"\n❌ Error generating HTML: {e}")
        print("Please check your input and try again.")

if __name__ == "__main__":
    main()