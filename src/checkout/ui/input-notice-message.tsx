import * as React from "react";
import { ToggleGroup, ToggleGroupItem } from "@checkout/ui/toggle-group";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import DOMPurify from "dompurify";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
} from "lucide-react";

type Token = { label: string; value: string }; // ex.: {label: "Nome do cliente", value: "{{NOME}}"}
type Props = {
  label?: string;
  value?: string; // HTML inicial
  onChange?: (html: string) => void;
  placeholder?: string;
  tokens?: Token[]; // variáveis para "inject"
  maxLength?: number; // opcional: limita caracteres (texto puro)
  disabled?: boolean;
};

export function InputNoticeMessage({
  label = "Mensagem da barra de avisos",
  value = "<strong>Frete Gratis</strong> para todo Brasil!",
  onChange,
  placeholder = "Digite a mensagem…",
  maxLength,
  disabled = false,
}: Props) {
  const editor = useEditor({
    editable: !disabled,
    extensions: [
      StarterKit.configure({
        bold: {},
        italic: {},
        strike: {},
      }),
      Underline,
      Placeholder.configure({
        placeholder,
        showOnlyWhenEditable: true,
      }),
    ],
    content: value ?? "",
    editorProps: {
      attributes: {
        class: "px-3 py-2 min-h-[56px] outline-none prose prose-sm max-w-none",
      },
      handleDOMEvents: {
        keydown: (view, event) => {
          // Max length (conta texto sem tags)
          if (
            typeof maxLength === "number" &&
            !event.metaKey &&
            !event.ctrlKey
          ) {
            const plain = view.state.doc.textBetween(
              0,
              view.state.doc.content.size,
              " "
            );
            if (plain.length >= maxLength) {
              // permitir backspace/delete/navegação
              const k = event.key.toLowerCase();
              const allowed = [
                "backspace",
                "delete",
                "arrowleft",
                "arrowright",
                "arrowup",
                "arrowdown",
                "tab",
              ];
              if (!allowed.includes(k)) {
                event.preventDefault();
                return true;
              }
            }
          }

          // Hotkeys B/I/U
          if ((event.ctrlKey || event.metaKey) && !event.shiftKey) {
            const key = event.key.toLowerCase();
            if (key === "b") {
              editor?.chain().focus().toggleBold().run();
              event.preventDefault();
              return true;
            }
            if (key === "i") {
              editor?.chain().focus().toggleItalic().run();
              event.preventDefault();
              return true;
            }
            if (key === "u") {
              editor?.chain().focus().toggleUnderline().run();
              event.preventDefault();
              return true;
            }
          }
          return false;
        },
      },
    },
    onUpdate: ({ editor }) => {
      // Sanitize antes de propagar
      const dirty = editor.getHTML();
      const clean = DOMPurify.sanitize(dirty, {
        ALLOWED_TAGS: [
          "b",
          "i",
          "u",
          "s",
          "strong",
          "em",
          "span",
          "div",
          "p",
          "br",
          "a",
        ],
        ALLOWED_ATTR: ["href", "title", "class", "style"], // se quiser, remova 'style'
        FORBID_TAGS: ["script", "iframe", "object", "embed"],
        FORBID_ATTR: ["^on"], // bloqueia onClick etc.
      });
      onChange?.(clean);
    },
  });

  // Mantém o editor em sync se `value` externo mudar
  React.useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (value != null && value !== current) {
      editor.commands.setContent(value, { emitUpdate: false }); // false = não cria histórico novo
    }
  }, [value, editor]);

  if (!editor) return null;

  const active = {
    bold: editor.isActive("bold"),
    italic: editor.isActive("italic"),
    underline: editor.isActive("underline"),
    strike: editor.isActive("strike"),
  };

  const currentValues = [
    active.bold && "bold",
    active.italic && "italic",
    active.underline && "underline",
    active.strike && "strike",
  ].filter(Boolean) as string[];

  // const injectToken = (token: string) => {
  //   editor.chain().focus().insertContent(token).run();
  // };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
        </label>
      )}

      <div
        className={`rounded-none border border-border bg-card ${disabled ? "opacity-60 pointer-events-none" : ""}`}
      >
        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-border px-2 py-1.5">
          <ToggleGroup
            type="multiple"
            value={currentValues}
            onValueChange={(vals) => {
              const has = (k: string) => vals.includes(k);
              const chain = editor.chain().focus();
              active.bold !== has("bold") && chain.toggleBold();
              active.italic !== has("italic") && chain.toggleItalic();
              active.underline !== has("underline") && chain.toggleUnderline();
              active.strike !== has("strike") && chain.toggleStrike();
              chain.run();
            }}
            className="flex gap-1 border-none"
          >
            <ToggleGroupItem
              value="bold"
              aria-label="Negrito"
              className="h-10 w-10"
            >
              <Bold className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="italic"
              aria-label="Itálico"
              className="h-10 w-10"
            >
              <Italic className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="underline"
              aria-label="Sublinhado"
              className="h-10 w-10"
            >
              <UnderlineIcon className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="strike"
              aria-label="Tachado"
              className="h-10 w-10"
            >
              <Strikethrough className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Editor */}
        <EditorContent
          editor={editor}
          className="bg-transparent text-foreground py-2 min-h-[100px] rounded-b-md outline-none prose prose-sm max-w-none"
        />
      </div>

      {/* opcional: contador quando maxLength for usado */}
      {typeof maxLength === "number" && (
        <div className="text-xs text-muted-foreground text-right pr-1 pb-0.5">
          {editor.storage.characterCount?.characters() ??
            editor.getText().length}
          /{maxLength}
        </div>
      )}
    </div>
  );
}
