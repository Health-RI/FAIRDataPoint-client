import PrismJs from 'prismjs'

function registerTurtle(prism: any): void {
  const { languages } = prism

  if (languages.turtle) {
    return
  }

  languages.turtle = {
    comment: {
      pattern: /#.*/,
      greedy: true,
    },
    'multiline-string': {
      pattern: /"""(?:(?:""?)?(?:[^"\\]|\\.))*"""|'''(?:(?:''?)?(?:[^'\\]|\\.))*'''/,
      greedy: true,
      alias: 'string',
      inside: {
        comment: /#.*/,
      },
    },
    string: {
      pattern: /"(?:[^\\"\r\n]|\\.)*"|'(?:[^\\'\r\n]|\\.)*'/,
      greedy: true,
    },
    url: {
      // Prism's Turtle grammar needs the ASCII control-character range here.
      // eslint-disable-next-line no-control-regex
      pattern: /<(?:[^\x00-\x20<>"{}|^`\\]|\\(?:u[\da-fA-F]{4}|U[\da-fA-F]{8}))*>/,
      greedy: true,
      inside: {
        punctuation: /[<>]/,
      },
    },
    function: {
      pattern: /(?:(?![-.\d\xB7])[-.\w\xB7\xC0-\uFFFD]+)?:(?:(?![-.])(?:[-.:\w\xC0-\uFFFD]|%[\da-f]{2}|\\.)+)?/i,
      inside: {
        'local-name': {
          pattern: /([^:]*:)[\s\S]+/,
          lookbehind: true,
        },
        prefix: {
          pattern: /[\s\S]+/,
          inside: {
            punctuation: /:/,
          },
        },
      },
    },
    number: /[+-]?\b\d+(?:\.\d*)?(?:e[+-]?\d+)?/i,
    punctuation: /[{}.,;()[\]]|\^\^/,
    boolean: /\b(?:false|true)\b/,
    keyword: [
      /(?:\ba|@prefix|@base)\b|=/,
      /\b(?:base|graph|prefix)\b/i,
    ],
    tag: {
      pattern: /@[a-z]+(?:-[a-z\d]+)*/i,
      inside: {
        punctuation: /@/,
      },
    },
  }

  languages.trig = languages.turtle
}

function registerSparql(prism: any): void {
  const { languages } = prism

  if (languages.sparql) {
    return
  }

  registerTurtle(prism)

  languages.sparql = languages.extend('turtle', {
    boolean: /\b(?:false|true)\b/i,
    variable: {
      pattern: /[?$]\w+/,
      greedy: true,
    },
  })

  languages.insertBefore('sparql', 'punctuation', {
    keyword: [
      /\b(?:A|ADD|ALL|AS|ASC|ASK|BNODE|BY|CLEAR|CONSTRUCT|COPY|CREATE|DATA|DEFAULT|DELETE|DESC|DESCRIBE|DISTINCT|DROP|EXISTS|FILTER|FROM|GROUP|HAVING|INSERT|INTO|LIMIT|LOAD|MINUS|MOVE|NAMED|NOT|NOW|OFFSET|OPTIONAL|ORDER|RAND|REDUCED|SELECT|SEPARATOR|SERVICE|SILENT|STRUUID|UNION|USING|UUID|VALUES|WHERE)\b/i,
      /\b(?:ABS|AVG|BIND|BOUND|CEIL|COALESCE|CONCAT|CONTAINS|COUNT|DATATYPE|DAY|ENCODE_FOR_URI|FLOOR|GROUP_CONCAT|HOURS|IF|IRI|isBLANK|isIRI|isLITERAL|isNUMERIC|isURI|LANG|LANGMATCHES|LCASE|MAX|MD5|MIN|MINUTES|MONTH|REGEX|REPLACE|ROUND|sameTerm|SAMPLE|SECONDS|SHA1|SHA256|SHA384|SHA512|STR|STRAFTER|STRBEFORE|STRDT|STRENDS|STRLANG|STRLEN|STRSTARTS|SUBSTR|SUM|TIMEZONE|TZ|UCASE|URI|YEAR)\b(?=\s*\()/i,
      /\b(?:BASE|GRAPH|PREFIX)\b/i,
    ],
  })

  languages.rq = languages.sparql
}

export function registerPrismLanguages(): void {
  registerTurtle(PrismJs)
  registerSparql(PrismJs)
}
