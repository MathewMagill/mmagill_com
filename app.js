// English Learning App JavaScript

const vocabulary = [
    { word: "kangaroo", image: "img/kangaroo.svg", audio: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/kangaroo--_gb_1.mp3", zh: "袋鼠", pinyin: "dài shǔ", es: "canguro" },
    { word: "boomerang", image: "img/boomerang.svg", audio: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/boomerang--_gb_1.mp3", zh: "回力镖", pinyin: "huí lì biāo", es: "bumerán" },
    { word: "koala", image: "img/koala.svg", audio: "", zh: "考拉", pinyin: "kǎo lā", es: "koala" },
    { word: "didgeridoo", image: "img/didgeridoo.svg", audio: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/didgeridoo--_gb_1.mp3", zh: "迪吉里杜管", pinyin: "dí jí lǐ dù guǎn", es: "didyeridú" },
    { word: "Australia", image: "img/australia.svg", audio: "https://www.oxfordlearnersdictionaries.com/media/english/us_pron/a/aus/austr/australia__us_1.mp3", zh: "澳大利亚", pinyin: "ào dà lì yà", es: "Australia" },
    { word: "platypus", image: "img/platypus.svg", audio: "", zh: "鸭嘴兽", pinyin: "yā zuǐ shòu", es: "ornitorrinco" },
    { word: "wombat", image: "img/wombat.svg", audio: "", zh: "袋熊", pinyin: "dài xióng", es: "wombat" },
    { word: "emu", image: "img/emu.svg", audio: "", zh: "鸸鹋", pinyin: "ér miáo", es: "emú" },
    { word: "outback", image: "img/outback.svg", audio: "", zh: "内陆", pinyin: "nèi lù", es: "interior (de Australia)" },
    { word: "billabong", image: "img/billabong.svg", audio: "", zh: "水潭", pinyin: "shuǐ tán", es: "billabong (laguna)" },
];

const conversationPrompts = [
    {
        en: "What is your favorite food in Australia so far?",
        zh: "到目前为止，你在澳大利亚最喜欢的食物是什么？",
        pinyin: "Dào mùqián wéizhǐ, nǐ zài àodàlìyà zuì xǐhuān de shíwù shì shénme?",
        es: "¿Cuál es tu comida favorita en Australia hasta ahora?"
    },
    {
        en: "Describe your first day at school in Australia.",
        zh: "描述一下你在澳大利亚的第一天上学经历。",
        pinyin: "Miáoshù yīxià nǐ zài àodàlìyà de dì yī tiān shàngxué jīnglì.",
        es: "Describe tu primer día en la escuela en Australia."
    },
    {
        en: "What do you miss most about Taiwan?",
        zh: "你最想念台湾的什么？",
        pinyin: "Nǐ zuì xiǎngniàn Táiwān de shénme?",
        es: "¿Qué es lo que más extrañas de Taiwán?"
    },
    {
        en: "What new English word did you learn today?",
        zh: "你今天学到了什么新的英语单词？",
        pinyin: "Nǐ jīntiān xué dào le shénme xīn de Yīngyǔ dāncí?",
        es: "¿Qué nueva palabra en inglés aprendiste hoy?"
    },
    {
        en: "How do you feel about making new friends here?",
        zh: "你对在这里结交新朋友有什么感受？",
        pinyin: "Nǐ duì zài zhèlǐ jiéjiāo xīn péngyǒu yǒu shénme gǎnshòu?",
        es: "¿Cómo te sientes al hacer nuevos amigos aquí?"
    }
];

function showSection(sectionId) {
    document.querySelectorAll('.activity-section').forEach(sec => {
        sec.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
    if (sectionId === 'flashcards') renderFlashcards();
    if (sectionId === 'matching') renderMatchingGame();
    if (sectionId === 'conversation') renderConversationPrompts();
}

// Flashcards
let flashcardIndex = 0;
function renderFlashcards() {
    const section = document.getElementById('flashcards');
    const vocab = vocabulary[flashcardIndex];
    section.innerHTML = `
        <div class="flashcard">
            <img src="${vocab.image}" alt="${vocab.word}"><br>
            <strong>${vocab.word.charAt(0).toUpperCase() + vocab.word.slice(1)}</strong>
            <div class="flashcard-audio">
                <button onclick="playAudio('${vocab.audio}')">🔊 Listen</button>
            </div>
        </div>
        <div class="flashcard flashcard-chinese">
            <span style="font-size:1.5em;">${vocab.zh}</span><br>
            <span style="color:#888;">${vocab.pinyin}</span>
            <div class="flashcard-audio">
                <button onclick="playChineseAudio()">🔊 听中文</button>
            </div>
        </div>
        <div class="flashcard flashcard-spanish">
            <span style="font-size:1.5em;">${vocab.es}</span>
            <div class="flashcard-audio">
                <button onclick="playSpanishAudio()">🔊 Escuchar en español</button>
            </div>
        </div>
        <button onclick="prevFlashcard()" ${flashcardIndex === 0 ? 'disabled' : ''}>Previous</button>
        <button onclick="nextFlashcard()" ${flashcardIndex === vocabulary.length - 1 ? 'disabled' : ''}>Next</button>
    `;
}

function playChineseAudio() {
    const vocab = vocabulary[flashcardIndex];
    if ('speechSynthesis' in window) {
        const utter = new SpeechSynthesisUtterance(vocab.zh);
        utter.lang = 'zh-CN';
        window.speechSynthesis.speak(utter);
    } else {
        alert('Text-to-speech is not supported in this browser.');
    }
}
function playAudio(url) {
    // If the URL is a valid audio file, try to play it. Otherwise, use TTS.
    if (url && url.endsWith('.mp3')) {
        const audio = new Audio(url);
        audio.onerror = function() {
            speakCurrentWord();
        };
        audio.play().catch(() => speakCurrentWord());
    } else {
        speakCurrentWord();
    }
}

function speakCurrentWord() {
    const vocab = vocabulary[flashcardIndex];
    if ('speechSynthesis' in window) {
        const utter = new SpeechSynthesisUtterance(vocab.word);
        utter.lang = 'en-AU';
        window.speechSynthesis.speak(utter);
    } else {
        alert('Text-to-speech is not supported in this browser.');
    }
}
function prevFlashcard() {
    if (flashcardIndex > 0) {
        flashcardIndex--;
        renderFlashcards();
    }
}
function nextFlashcard() {
    if (flashcardIndex < vocabulary.length - 1) {
        flashcardIndex++;
        renderFlashcards();
    }
}

// Matching Game
let matchingState = { selected: [], matched: [] };
function renderMatchingGame() {
    const section = document.getElementById('matching');
    // Shuffle for game
    const words = vocabulary.map(v => v.word);
    const images = vocabulary.map(v => v.image);
    const shuffledWords = shuffle([...words]);
    const shuffledImages = shuffle([...images]);
    section.innerHTML = `
        <div class="matching-grid" id="matching-words">
            ${shuffledWords.map(word => `<div class="matching-item" data-type="word" data-value="${word}" onclick="selectMatching(this)">${word}</div>`).join('')}
        </div>
        <div class="matching-grid" id="matching-images">
            ${shuffledImages.map(img => `<div class="matching-item" data-type="image" data-value="${img}" onclick="selectMatching(this)"><img src="${img}" alt="" style="max-width:60px"></div>`).join('')}
        </div>
        <div id="matching-result" style="margin-top:18px;font-weight:bold;"></div>
        <button onclick="renderMatchingGame()">Restart</button>
    `;
    matchingState = { selected: [], matched: [] };
}
function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}
function selectMatching(el) {
    if (el.classList.contains('matched') || el.classList.contains('selected')) return;
    el.classList.add('selected');
    matchingState.selected.push(el);
    if (matchingState.selected.length === 2) {
        const [first, second] = matchingState.selected;
        let match = false;
        if (first.dataset.type !== second.dataset.type) {
            // Check match
            const word = first.dataset.type === 'word' ? first.dataset.value : second.dataset.value;
            const img = first.dataset.type === 'image' ? first.dataset.value : second.dataset.value;
            const vocab = vocabulary.find(v => v.word === word && v.image === img);
            if (vocab) match = true;
        }
        setTimeout(() => {
            if (match) {
                first.classList.add('matched');
                second.classList.add('matched');
                matchingState.matched.push(first, second);
                document.getElementById('matching-result').textContent = 'Correct!';
            } else {
                first.classList.remove('selected');
                second.classList.remove('selected');
                document.getElementById('matching-result').textContent = 'Try again!';
            }
            matchingState.selected = [];
            // Check win
            if (matchingState.matched.length === vocabulary.length * 2) {
                document.getElementById('matching-result').textContent = 'You matched all! Well done!';
            }
        }, 700);
    }
}

// Conversation Prompts
function renderConversationPrompts() {
    const section = document.getElementById('conversation');
    section.innerHTML = conversationPrompts.map(prompt => `
        <div class="conversation-prompt">
            <div><strong>${prompt.en}</strong></div>
            <div style="color:#2a4d8f;font-size:1.1em;margin-top:6px;">${prompt.zh}</div>
            <div style="color:#888;font-size:0.95em;">${prompt.pinyin}</div>
            <div style="color:#b36b00;font-size:1.05em;margin-top:4px;">${prompt.es}</div>
        </div>
    `).join('');
}

// Show flashcards by default
showSection('flashcards');

// Expose TTS functions globally for inline onclick
window.playChineseAudio = playChineseAudio;
window.playAudio = playAudio;
window.playSpanishAudio = playSpanishAudio;

function playSpanishAudio() {
    const vocab = vocabulary[flashcardIndex];
    if ('speechSynthesis' in window) {
        const synth = window.speechSynthesis;
        function speak() {
            const voices = synth.getVoices();
            let spanishVoice = voices.find(v => v.lang && v.lang.startsWith('es'));
            const utter = new SpeechSynthesisUtterance(vocab.es);
            utter.lang = 'es-ES';
            if (spanishVoice) {
                utter.voice = spanishVoice;
            } else if (voices.length > 0) {
                utter.voice = voices[0]; // fallback to default voice
            }
            synth.speak(utter);
        }
        if (synth.getVoices().length === 0) {
            synth.onvoiceschanged = function() {
                speak();
                synth.onvoiceschanged = null;
            };
        } else {
            speak();
        }
    } else {
        alert('Text-to-speech is not supported in this browser.');
    }
}
