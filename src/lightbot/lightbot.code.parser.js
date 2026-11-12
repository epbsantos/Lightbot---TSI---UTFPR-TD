export const COMMAND_MAP = {
  walk: 'walk',
  w: 'walk',

  jump: 'jump',
  j: 'jump',

  light: 'light',
  l: 'light',

  turnleft: 'turnLeft',
  turn_left: 'turnLeft',
  left: 'turnLeft',
  tl: 'turnLeft',

  turnright: 'turnRight',
  turn_right: 'turnRight',
  right: 'turnRight',
  tr: 'turnRight',

  repeat: 'repeat',
  loop: 'repeat',
  r: 'repeat',
};

export function tokenizeCode(code) {
  const tokens = [];
  let line = 1;
  let i = 0;
  const len = code.length;

  while (i < len) {
    const ch = code[i];

    if (ch === '\n') {
      line++;
      i++;
      continue;
    }
    if (ch === ' ' || ch === '\t' || ch === '\r') {
      i++;
      continue;
    }

    // comments: // or #
    if ((ch === '/' && code[i + 1] === '/') || ch === '#') {
      while (i < len && code[i] !== '\n') i++;
      continue;
    }

    // block comments: /* ... */
    if (ch === '/' && code[i + 1] === '*') {
      i += 2;
      while (i < len && !(code[i] === '*' && code[i + 1] === '/')) {
        if (code[i] === '\n') line++;
        i++;
      }
      i += 2;
      continue;
    }

    // punctuation
    if (ch === '(' || ch === ')' || ch === '{' || ch === '}' || ch === ';') {
      tokens.push({ type: ch, value: ch, line });
      i++;
      continue;
    }

    // Numbers
    if (/[0-9]/.test(ch)) {
      let numStr = '';
      while (i < len && /[0-9]/.test(code[i])) {
        numStr += code[i];
        i++;
      }
      tokens.push({ type: 'NUMBER', value: parseInt(numStr, 10), line });
      continue;
    }

    // identifiers
    if (/[a-zA-Z_]/.test(ch)) {
      let ident = '';
      while (i < len && /[a-zA-Z0-9_]/.test(code[i])) {
        ident += code[i];
        i++;
      }
      tokens.push({ type: 'IDENT', value: ident, line });
      continue;
    }

    throw new Error(`Line ${line}: Unexpected character "${ch}"`);
  }

  return tokens;
}

export function parseCodeToProgramData(code) {
  if (!code || typeof code !== 'string') {
    return { success: true, program: [] };
  }

  try {
    const tokens = tokenizeCode(code);
    let pos = 0;

    function peek() {
      return tokens[pos] || null;
    }
    function next() {
      return tokens[pos++] || null;
    }

    function parseBlock(stopAtRBrace, openLine) {
      const result = [];

      while (pos < tokens.length) {
        const tok = peek();

        if (tok.type === ';') {
          next();
          continue;
        }

        if (tok.type === '}') {
          if (stopAtRBrace) {
            next(); // consume '}'
            return result;
          } else {
            throw new Error(`Line ${tok.line}: Unexpected closing "}"`);
          }
        }

        if (tok.type === 'IDENT') {
          const rawIdent = next().value;
          const lower = rawIdent.toLowerCase();
          const cmd = COMMAND_MAP[lower];

          if (!cmd) {
            throw new Error(
              `Line ${tok.line}: Unknown command "${rawIdent}". Valid commands: walk(), jump(), light(), turnLeft(), turnRight(), repeat(n)`
            );
          }

          if (cmd === 'repeat') {
            let count = 2;
            let p = peek();
            if (p && p.type === '(') {
              next(); // consume '('
              const numTok = next();
              if (!numTok || numTok.type !== 'NUMBER') {
                throw new Error(`Line ${p.line}: Expected a number inside repeat(...)`);
              }
              count = numTok.value;
              const closeParen = next();
              if (!closeParen || closeParen.type !== ')') {
                throw new Error(`Line ${numTok.line}: Expected ")" after the number in repeat`);
              }
            } else if (p && p.type === 'NUMBER') {
              count = next().value;
            }

            if (count < 1 || count > 99) {
              throw new Error(
                `Line ${tok.line}: The number of repetitions must be between 1 and 99 (received ${count})`
              );
            }

            const brace = next();
            if (!brace || brace.type !== '{') {
              throw new Error(`Line ${tok.line}: Expected "{" after repeat(${count})`);
            }

            const body = parseBlock(true, tok.line);
            result.push({ type: 'repeat', count, body });
            continue;
          }

          // standard commands: walk, jump, light, turnLeft, turnRight
          let p = peek();
          if (p && p.type === '(') {
            next(); // consume '('
            const closeP = next();
            if (!closeP || closeP.type !== ')') {
              throw new Error(`Line ${p.line}: Expected ")" after ${rawIdent}(`);
            }
          }
          if (peek() && peek().type === ';') {
            next(); // optional ';'
          }

          result.push({ type: cmd });
          continue;
        }

        throw new Error(`Line ${tok.line}: Unexpected token "${tok.value}"`);
      }

      if (stopAtRBrace) {
        throw new Error(`Line ${openLine}: Block opened with "{" was not closed with "}"`);
      }

      return result;
    }

    const program = parseBlock(false, 1);
    return { success: true, program };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export function programDataToCode(programData, indentLevel = 0) {
  const indent = '  '.repeat(indentLevel);
  const lines = [];
  if (!Array.isArray(programData)) return '';

  for (let i = 0; i < programData.length; i++) {
    const item = programData[i];
    if (!item) continue;
    const type = item.type || item.name;
    if (type === 'walk') {
      lines.push(`${indent}walk();`);
    } else if (type === 'jump') {
      lines.push(`${indent}jump();`);
    } else if (type === 'light') {
      lines.push(`${indent}light();`);
    } else if (type === 'turnLeft') {
      lines.push(`${indent}turnLeft();`);
    } else if (type === 'turnRight') {
      lines.push(`${indent}turnRight();`);
    } else if (type === 'repeat') {
      const count = item.count != null ? item.count : item.counter != null ? item.counter : 2;
      lines.push(`${indent}repeat(${count}) {`);
      const bodyCode = programDataToCode(item.body || [], indentLevel + 1);
      if (bodyCode) lines.push(bodyCode);
      lines.push(`${indent}}`);
    }
  }

  return lines.join('\n');
}

export function getSnippetForInstruction(type) {
  switch (type) {
    case 'walk':
      return 'walk();\n';
    case 'jump':
      return 'jump();\n';
    case 'light':
      return 'light();\n';
    case 'turnLeft':
      return 'turnLeft();\n';
    case 'turnRight':
      return 'turnRight();\n';
    case 'repeat':
      return 'repeat(2) {\n  walk();\n}\n';
    default:
      return '';
  }
}
