
import type { Language } from '../types';

export const translations: Record<Language, Record<string, any>> = {
  en: {
    title: "Study Hacker",
    copyright: "© 2024 Dr. Ali Noori. All rights reserved.",
    sidebar: {
      smartTutor: "Smart Tutor",
      mindMaps: "Mind Maps",
      whiteboard: "Whiteboard",
      studyTools: "Study Tools",
      tables: "Tables",
    },
    chat: {
      placeholder: "Ask how to study, understand, or upload an image...",
      sendMessage: "Send Message",
      uploadFile: "Upload File",
      exportChat: "Export Chat",
      screenshot: "Screenshot",
      exportPdf: "Export PDF",
      saveChat: "Save Chat",
      clearChat: "Clear Chat",
      saved: "Chat saved!",
      cleared: "Chat cleared!",
      searchTheWeb: "Search the web",
      sources: "Sources",
      myTasks: "My Tasks",
      addTask: "Add",
      taskPlaceholder: "New task...",
      copyChat: "Copy Chat",
      copiedChat: "Chat copied!",
    },
    mindmap: {
      title: "Generate a Mind Map",
      placeholder: "Enter a topic, e.g., 'Cellular Respiration'",
      generate: "Generate Map",
      generating: "Generating...",
    },
    whiteboard: {
      title: "Digital Whiteboard",
      clear: "Clear",
      undo: "Undo",
      save: "Save as PNG",
      color: "Color",
      strokeWidth: "Stroke Width",
    },
    tools: {
      title: "Specialized Study Tools",
      subconscious: {
        title: "Subconscious Mind Study",
        description: "Generate techniques and affirmations to engage your subconscious mind for better learning and retention.",
        button: "Generate Techniques"
      },
      problemSolver: {
        title: "Study Problem Solver",
        description: "Get AI-powered advice for common study problems like procrastination, lack of focus, or exam anxiety.",
        button: "Solve My Problem"
      },
      affirmations: {
        title: "Success Affirmations",
        description: "Generate powerful affirmations and motivational sentences to boost your confidence and focus for success.",
        button: "Generate Affirmations"
      },
      generating: "Generating...",
      responseTitle: "AI Generated Advice"
    },
    tables: {
      title: "Table Generator",
      placeholder: "Describe the table you need, e.g., 'A 3-column table of planets, their diameter, and moons.'",
      generate: "Generate Table",
      generating: "Generating...",
      copyMarkdown: "Copy Markdown",
      exportPdf: "Export PDF",
      copied: "Copied!",
      saveTable: "Save Table",
    },
    settings: {
        language: "Language",
        theme: "Theme",
        themes: {
            deep_ocean: "Deep Ocean",
            cool_mint: "Cool Mint",
            sunset_glow: "Sunset Glow",
            ivory_gold: "Ivory & Gold",
            royal_purple: "Royal Purple",
            white: "White",
            sky_blue: "Sky Blue",
            light_green: "Light Green",
            pastel_purple: "Pastel Purple"
        }
    }
  },
  ar: {
    title: "تهكير الدراسة",
    copyright: "© 2024 د. علي نوري. كل الحقوق محفوظة.",
    sidebar: {
      smartTutor: "المدرس الذكي",
      mindMaps: "خرائط ذهنية",
      whiteboard: "السبورة البيضاء",
      studyTools: "أدوات الدراسة",
      tables: "الجداول",
    },
    chat: {
      placeholder: "اسأل عن كيفية الدراسة، الفهم، أو قم بتحميل صورة...",
      sendMessage: "إرسال رسالة",
      uploadFile: "تحميل ملف",
      exportChat: "تصدير الدردشة",
      screenshot: "لقطة شاشة",
      exportPdf: "تصدير PDF",
      saveChat: "حفظ الدردشة",
      clearChat: "مسح الدردشة",
      saved: "تم حفظ الدردشة!",
      cleared: "تم مسح الدردشة!",
      searchTheWeb: "ابحث في الويب",
      sources: "المصادر",
      myTasks: "مهامي",
      addTask: "إضافة",
      taskPlaceholder: "مهمة جديدة...",
      copyChat: "نسخ الدردشة",
      copiedChat: "تم نسخ الدردشة!",
    },
    mindmap: {
      title: "إنشاء خريطة ذهنية",
      placeholder: "أدخل موضوعًا، على سبيل المثال، 'التنفس الخلوي'",
      generate: "إنشاء الخريطة",
      generating: "جاري الإنشاء...",
    },
    whiteboard: {
      title: "السبورة الرقمية",
      clear: "مسح",
      undo: "تراجع",
      save: "حفظ بصيغة PNG",
      color: "اللون",
      strokeWidth: "عرض الخط",
    },
    tools: {
      title: "أدوات دراسية متخصصة",
      subconscious: {
        title: "الدراسة بالعقل الباطن",
        description: "احصل على تقنيات وتوكيدات لإشراك عقلك الباطن من أجل تعلم واستيعاب أفضل.",
        button: "إنشاء تقنيات"
      },
      problemSolver: {
        title: "حل مشاكل الدراسة",
        description: "احصل على نصائح مدعومة بالذكاء الاصطناعي لمشاكل الدراسة الشائعة مثل المماطلة أو قلة التركيز أو قلق الامتحانات.",
        button: "حل مشكلتي"
      },
      affirmations: {
        title: "توكيدات النجاح",
        description: "احصل على توكيدات قوية وجمل تحفيزية لتعزيز ثقتك وتركيزك من أجل النجاح.",
        button: "إنشاء توكيدات"
      },
      generating: "جاري الإنشاء...",
      responseTitle: "نصيحة من الذكاء الاصطناعي"
    },
    tables: {
      title: "مولّد الجداول",
      placeholder: "صف الجدول الذي تحتاجه، مثلاً: 'جدول من 3 أعمدة للكواكب، قطرها، وأقمارها.'",
      generate: "إنشاء الجدول",
      generating: "جاري الإنشاء...",
      copyMarkdown: "نسخ الكود",
      exportPdf: "تصدير PDF",
      copied: "تم النسخ!",
      saveTable: "حفظ الجدول",
    },
    settings: {
        language: "اللغة",
        theme: "المظهر",
        themes: {
            deep_ocean: "محيط عميق",
            cool_mint: "نعناع بارد",
            sunset_glow: "وهج الغروب",
            ivory_gold: "عاج وذهب",
            royal_purple: "أرجواني ملكي",
            white: "أبيض",
            sky_blue: "أزرق سماوي",
            light_green: "أخضر فاتح",
            pastel_purple: "بنفسجي فاتح"
        }
    }
  },
  da: {
    title: "Studie Hacker",
    copyright: "© 2024 Dr. Ali Noori. Alle rettigheder forbeholdes.",
    sidebar: {
      smartTutor: "Smart Lærer",
      mindMaps: "Mindmaps",
      whiteboard: "Whiteboard",
      studyTools: "Studieværktøjer",
      tables: "Tabeller",
    },
    chat: {
      placeholder: "Spørg hvordan du studerer, forstår, eller upload et billede...",
      sendMessage: "Send besked",
      uploadFile: "Upload fil",
      exportChat: "Eksporter chat",
      screenshot: "Skærmbillede",
      exportPdf: "Eksporter PDF",
      saveChat: "Gem chat",
      clearChat: "Ryd chat",
      saved: "Chat gemt!",
      cleared: "Chat ryddet!",
      searchTheWeb: "Søg på nettet",
      sources: "Kilder",
      myTasks: "Mine Opgaver",
      addTask: "Tilføj",
      taskPlaceholder: "Ny opgave...",
      copyChat: "Kopier chat",
      copiedChat: "Chat kopieret!",
    },
    mindmap: {
      title: "Generer et mindmap",
      placeholder: "Indtast et emne, f.eks. 'Cellulær respiration'",
      generate: "Generer kort",
      generating: "Genererer...",
    },
    whiteboard: {
      title: "Digitalt Whiteboard",
      clear: "Ryd",
      undo: "Fortryd",
      save: "Gem som PNG",
      color: "Farve",
      strokeWidth: "Stregtykkelse",
    },
    tools: {
      title: "Specialiserede Studieværktøjer",
      subconscious: {
        title: "Studer med underbevidstheden",
        description: "Generer teknikker og bekræftelser for at engagere dit underbevidste sind for bedre læring og fastholdelse.",
        button: "Generer teknikker"
      },
      problemSolver: {
        title: "Studieproblemløser",
        description: "Få AI-drevet rådgivning til almindelige studieproblemer som udsættelse, manglende fokus eller eksamensangst.",
        button: "Løs mit problem"
      },
      affirmations: {
        title: "Succesbekræftelser",
        description: "Generer kraftfulde bekræftelser og motiverende sætninger for at øge din selvtillid og fokus for succes.",
        button: "Generer bekræftelser"
      },
      generating: "Genererer...",
      responseTitle: "AI-genereret rådgivning"
    },
    tables: {
      title: "Tabelgenerator",
      placeholder: "Beskriv den tabel, du har brug for, f.eks. 'En 3-kolonne tabel over planeter, deres diameter og måner.'",
      generate: "Generer tabel",
      generating: "Genererer...",
      copyMarkdown: "Kopier Markdown",
      exportPdf: "Eksporter PDF",
      copied: "Kopieret!",
      saveTable: "Gem tabel",
    },
    settings: {
        language: "Sprog",
        theme: "Tema",
        themes: {
            deep_ocean: "Dybhav",
            cool_mint: "Kølig Mynte",
            sunset_glow: "Solnedgangsglød",
            ivory_gold: "Elfenben & Guld",
            royal_purple: "Kongelig Lilla",
            white: "Hvid",
            sky_blue: "Himmelblå",
            light_green: "Lysegrøn",
            pastel_purple: "Pastel Lilla"
        }
    }
  }
};
