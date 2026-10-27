export const liviuTools = [
  {
    "data": {
      "title": "Security assessment",
      "icon": "tabler--shield-check",
      "items": [
        {
          "title": "Burp Suite",
          "description": "I use Burp Suite in authorised labs to inspect HTTP requests and responses, follow authentication flows and understand how web vulnerabilities arise before documenting remediation.",
          "icon": "simple-icons--burpsuite",
          "highlightColor": "#e69a46",
          "example": "In an authorised test environment: review HTTP methods, inspect session cookies and compare access-control responses. Output: reproducible observation and remediation notes."
        },
        {
          "title": "Wireshark",
          "description": "I capture and analyse packets to understand DNS, TCP/TLS and application behaviour, investigate unexpected connections and learn to recognise network indicators.",
          "icon": "simple-icons--wireshark",
          "highlightColor": "#51a2d8",
          "example": "Network lab: capture DNS/TCP traffic, use display filters, follow connections and assemble a short evidence-based network timeline."
        }
      ]
    }
  },
  {
    "data": {
      "title": "Operating systems",
      "icon": "tabler--device-desktop",
      "items": [
        {
          "title": "Linux",
          "description": "I work with Linux for server administration, log analysis, command-line troubleshooting and repeatable security labs.",
          "icon": "simple-icons--linux",
          "highlightColor": "#d0b156",
          "example": "Lab/server workflow: review processes and journal logs, inspect TLS endpoints and file permissions, then document exact configuration changes."
        },
        {
          "title": "Kali Linux",
          "description": "I use Kali Linux as a controlled lab environment for authorised reconnaissance, application assessment and practising security tools.",
          "icon": "simple-icons--kalilinux",
          "highlightColor": "#78b3d9",
          "example": "Controlled assessment lab: use recon tools to understand an authorised target; preserve command output and distinguish findings from assumptions."
        },
        {
          "title": "Windows",
          "description": "I work with Windows administration and endpoint configuration, and analyse common security events in hands-on exercises.",
          "icon": "simple-icons--windows",
          "highlightColor": "#69a6ee",
          "example": "Endpoint lab: inspect event logs, service configuration and authentication-related events as part of incident-response exercises."
        }
      ]
    }
  },
  {
    "data": {
      "title": "Infrastructure and cloud",
      "icon": "tabler--cloud-computing",
      "items": [
        {
          "title": "Cloudflare",
          "description": "I configure DNS, TLS, WAF, rate limiting and security headers, and examine how caching, access policies and edge security affect live websites.",
          "icon": "simple-icons--cloudflare",
          "highlightColor": "#f2ab52",
          "example": "ZebraByte operations: configuration workflows for DNS/DNSSEC, TLS, WAF rules, rate limiting, cache exclusions and monitoring. Changes must be tested so real visitors are not blocked."
        },
        {
          "title": "Docker",
          "description": "I use containers when a repeatable isolated runtime is helpful for application development, testing and documenting deployment behaviour.",
          "icon": "simple-icons--docker",
          "highlightColor": "#389bd8",
          "example": "Example: the ACME SSL Engine repository contains a Dockerfile and repeatable deployment workflow for certificate automation experiments."
        }
      ]
    }
  },
  {
    "data": {
      "title": "Development",
      "icon": "tabler--code",
      "items": [
        {
          "title": "Python",
          "description": "I use Python for small security utilities, parsing technical data, automating routine checks and exploring forensic or network datasets.",
          "icon": "simple-icons--python",
          "highlightColor": "#dfc05c",
          "example": "Lab use: parse technical text or traffic-derived datasets and automate safe repeatable checks; the goal is small auditable scripts, not black-box scanner claims."
        },
        {
          "title": "TypeScript",
          "description": "I build typed web applications and APIs, including integrations with Cloudflare services and defensive security workflows.",
          "icon": "simple-icons--typescript",
          "highlightColor": "#5a9aea",
          "example": "Public code: SSL Generator and Dark Web Intelligence use typed Cloudflare Worker APIs with input validation, service integrations and bounded security workflows."
        },
        {
          "title": "Bash",
          "description": "I use shell scripts for Linux maintenance, safe task automation, diagnostics and repeatable lab setup.",
          "icon": "simple-icons--gnubash",
          "highlightColor": "#76b88b",
          "example": "Public example: ACME SSL Engine uses shell scripts for installing ACME.sh, issuing certificates and running renewal routines in a documented environment."
        }
      ]
    }
  }
] as const;

export const liviuToolsRo = [
  {
    "data": {
      "title": "Evaluare de securitate",
      "icon": "tabler--shield-check",
      "items": [
        {
          "title": "Burp Suite",
          "description": "Folosesc Burp Suite în laboratoare autorizate pentru a analiza cereri HTTP, răspunsuri, sesiuni de autentificare și modul în care apar vulnerabilitățile web.",
          "icon": "simple-icons--burpsuite",
          "highlightColor": "#e69a46",
          "example": "Într-un mediu de testare autorizat: urmăresc cereri HTTP, verific cookie-uri de sesiune și compar răspunsuri privind controlul accesului. Rezultat: observații reproductibile și recomandări."
        },
        {
          "title": "Wireshark",
          "description": "Capturez și interpretez pachete pentru a înțelege DNS, TCP/TLS, conexiuni neobișnuite și indicatori relevanți în analiza de rețea.",
          "icon": "simple-icons--wireshark",
          "highlightColor": "#51a2d8",
          "example": "Laborator de rețea: captez trafic DNS/TCP, folosesc filtre, urmăresc conexiuni și construiesc o cronologie tehnică bazată pe pachetele observate."
        }
      ]
    }
  },
  {
    "data": {
      "title": "Sisteme de operare",
      "icon": "tabler--device-desktop",
      "items": [
        {
          "title": "Linux",
          "description": "Administrez sisteme Linux, analizez loguri și investighez probleme tehnice în terminal și în laboratoare reproductibile.",
          "icon": "simple-icons--linux",
          "highlightColor": "#d0b156",
          "example": "Laborator/server: inspectez procese și jurnale, verific endpointuri TLS și permisiuni de fișiere, apoi documentez modificările."
        },
        {
          "title": "Kali Linux",
          "description": "Folosesc Kali într-un mediu controlat pentru recunoaștere autorizată, evaluări web și exersarea instrumentelor de securitate.",
          "icon": "simple-icons--kalilinux",
          "highlightColor": "#78b3d9",
          "example": "Laborator controlat: folosesc instrumente de recunoaștere pentru ținte autorizate, păstrez rezultatele comenzilor și separ constatările de ipoteze."
        },
        {
          "title": "Windows",
          "description": "Lucrez cu administrarea stațiilor Windows, configurarea endpointurilor și analiza unor evenimente de securitate în laborator.",
          "icon": "simple-icons--windows",
          "highlightColor": "#69a6ee",
          "example": "Laborator endpoint: interpretez loguri Windows, configurația serviciilor și evenimente de autentificare în exerciții de răspuns la incidente."
        }
      ]
    }
  },
  {
    "data": {
      "title": "Infrastructură și cloud",
      "icon": "tabler--cloud-computing",
      "items": [
        {
          "title": "Cloudflare",
          "description": "Configurez DNS, TLS, WAF, rate limiting, antete HTTP și măsuri de protecție pentru site-uri și aplicații web.",
          "icon": "simple-icons--cloudflare",
          "highlightColor": "#f2ab52",
          "example": "În activitatea ZebraByte: configurări DNS/DNSSEC, TLS, WAF, rate limiting, excluderi cache și monitorizare. Testez regulile pentru a evita blocarea vizitatorilor legitimi."
        },
        {
          "title": "Docker",
          "description": "Folosesc containere când este utilă o execuție izolată și reproductibilă pentru aplicații și experimente tehnice.",
          "icon": "simple-icons--docker",
          "highlightColor": "#389bd8",
          "example": "Exemplu verificabil: repository-ul ACME SSL Engine include Dockerfile și pași reproductibili de rulare a automatizării certificatelor."
        }
      ]
    }
  },
  {
    "data": {
      "title": "Dezvoltare",
      "icon": "tabler--code",
      "items": [
        {
          "title": "Python",
          "description": "Scriu mici instrumente de analiză, procesare a datelor și automatizare a verificărilor tehnice.",
          "icon": "simple-icons--python",
          "highlightColor": "#dfc05c",
          "example": "În laborator: parsez date tehnice și automatizez verificări repetitive, folosind scripturi mici, ușor de auditat și de explicat."
        },
        {
          "title": "TypeScript",
          "description": "Dezvolt aplicații și API-uri tipizate, inclusiv fluxuri integrate cu servicii Cloudflare și instrumente defensive.",
          "icon": "simple-icons--typescript",
          "highlightColor": "#5a9aea",
          "example": "Cod public: SSL Generator și Dark Web Intelligence folosesc API-uri Cloudflare Worker tipizate, validare de intrări și integrarea fluxurilor defensive."
        },
        {
          "title": "Bash",
          "description": "Automatizez sarcini Linux, diagnostice și pași repetați în laboratoare prin scripturi shell.",
          "icon": "simple-icons--gnubash",
          "highlightColor": "#76b88b",
          "example": "Exemplu public: ACME SSL Engine folosește scripturi shell pentru instalarea ACME.sh, emiterea certificatelor și rutina de reînnoire."
        }
      ]
    }
  }
] as const;
