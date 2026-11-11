# Documentação da Implementação de Drag and Drop para Tablets

Esta documentação descreve a arquitetura, parâmetros de configuração e regras de estilo adotadas para garantir o funcionamento fluido e sem conflitos da mecânica de *Drag and Drop* (arrastar e soltar) em tablets e dispositivos com tela sensível ao toque (*touchscreens*).

---

### 1. Visão Geral e Biblioteca Utilizada

A funcionalidade de montagem de programas e blocos de instruções utiliza a biblioteca **SortableJS** (`sortablejs`), integrada no módulo `src/lightbot/lightbot.view.canvas.ui.editor.js`.

O sistema divide-se em dois tipos de contêineres:
- **Paleta de Instruções (`#instructionsContainer ul`)**: Fonte de blocos disponíveis (modo clone).
- **Lista de Execução do Programa (`#programContainer ul`)**: Lista principal e sublistas aninhadas (corpos de loops `repeat`) onde as instruções são organizadas e reordenadas.

---

### 2. Configurações Específicas para Touchscreen (`touchDragOptions`)

Dispositivos *touch* apresentam o desafio clássico de diferenciar a intenção de rolagem de página (*scroll*) da intenção de arrastar um elemento. Para resolver isso, foi implementada a função auxiliar `touchDragOptions()`:

```javascript
function touchDragOptions() {
  return {
    delay: 150,
    delayOnTouchOnly: true,
    touchStartThreshold: 5,
    fallbackTolerance: 8,
  };
}
```

#### Detalhamento dos parâmetros:
- `delay: 150` (ms): Introduz uma pausa de 150 milissegundos entre o toque inicial e o início do arraste. Isso permite que toques rápidos para rolagem não disparem o arraste acidentalmente.
- `delayOnTouchOnly: true`: Garante que o atraso seja aplicado **exclusivamente** a eventos de toque (*touch*), mantendo a resposta imediata em desktops com mouse.
- `touchStartThreshold: 5` (pixels): Limite de deslocamento do dedo antes do atraso expirar. Se o usuário mover o dedo mais de 5px durante os 150ms iniciais, o SortableJS entende que é uma tentativa de rolagem e cancela o início do arraste.
- `fallbackTolerance: 8` (pixels): Tolerância em pixels para ativação da emulação de arraste (*fallback*) em navegadores móveis cujo suporte nativo a Drag and Drop HTML5 seja inconsistente.

---

### 3. Configuração dos Contêineres de Arraste

As opções de touch são mescladas via `Object.assign(touchDragOptions(), { ... })` nas instâncias do SortableJS:

#### 3.1. Paleta de Instruções (`_ensureInstructionSortable`)
- `group`: `{ name: "lightbot-instructions", pull: "clone", put: false }` — As instruções são clonadas para o programa e a paleta nunca recebe itens nem se reordena (`sort: false`).
- `handle: "p"`: Apenas o elemento `<p>` da instrução atua como alça de arraste.
- `filter: "input, .lb-instruction-delete"` com `preventOnFilter: false`: Evita que toques em botões ou campos de texto iniciem arraste, permitindo interação normal com esses elementos.
- `swapThreshold: 0.5` e `animation: 150`: Suaviza a transição e troca de posições visuais.

#### 3.2. Área de Programa e Blocos `repeat` (`_ensureProgramSortables`)
- `group`: `{ name: "lightbot-program", pull: true, put: ["lightbot-program", "lightbot-instructions"] }` — Permite reordenação interna e recepção de itens tanto da paleta quanto de outros blocos.
- `sort: true`: Permite reorganizar as instruções livremente.
- **Suporte a sublistas aninhadas**: No evento `onAdd`, caso uma instrução de repetição (`repeat`) seja solta no programa, o método `_ensureProgramSortables(evt.item)` é disparado para instanciar o SortableJS no `<ul>` interno do novo bloco.

---

### 4. Estilos CSS e Otimizações de UX para Touch

No arquivo `src/styles/main.css`, foram aplicadas regras essenciais para dispositivos móveis e tablets:

#### 4.1. Controle de Ações de Toque (`touch-action`)
```css
.lb-instruction-row {
  touch-action: none;
}
```
A propriedade `touch-action: none` impede que o navegador intercepte o gesto de toque para gestos padrão da viewport (como *pinch-zoom* ou rolagem da janela iniciada sobre a alça), garantindo que os manipuladores do SortableJS capturem o movimento do dedo sem atrasos ou interrupções.

#### 4.2. Prevenção de Seleção de Texto
```css
.lb-instruction {
  @apply select-none;
}
```
Evita que o toque longo abra o menu de contexto ou selecione o texto do rótulo da instrução no tablet.

#### 4.3. Feedback Visual de Arraste e Drop
- `.sortable-ghost`: Aplica opacidade `0.4` na posição de destino do elemento durante o arraste.
- `.sortable-chosen` e `.lb-dragging`: Indicadores visuais do item em trânsito.
- `.lb-drop-active` e `.lb-drop-hover`: Destaques internos (`outline-offset: -2px`) adicionados durante `onStart` / `onMove` para indicar visualmente as zonas válidas de soltura sem quebrar o layout com barras de rolagem.

---

### 5. Ciclo de Vida e Limpeza de Recursos

- **Persistência**: Alterações na estrutura ou nos contadores de repetição disparam `saveProgram()` que persiste o estado no `localStorage`.
- **Limpeza (`_cleanupProgramSortables`)**: Ao remover nós ou restaurar o programa, instâncias de `Sortable` órfãs que não estão mais no DOM são destruídas via `instance.destroy()` para evitar vazamento de memória e conflito de ouvintes de eventos de toque.
