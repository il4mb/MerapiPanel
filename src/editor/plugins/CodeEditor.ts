import { Editor } from "grapesjs";
import { EditorView, basicSetup, minimalSetup } from 'codemirror';
import { autocompletion } from "@codemirror/autocomplete"
import { css } from '@codemirror/lang-css';
import { json } from '@codemirror/lang-json';
import $ from "jquery";
import { html_beautify, css_beautify, js_beautify } from "js-beautify";
import type { Plugin } from 'grapesjs';


const beautyOptions = {
    "arrowParens": "always",
    "bracketSameLine": false,
    "bracketSpacing": true,
    "semi": true,
    "experimentalTernaries": false,
    "singleQuote": false,
    "jsxSingleQuote": false,
    "quoteProps": "as-needed",
    "trailingComma": "all",
    "singleAttributePerLine": false,
    "htmlWhitespaceSensitivity": "css",
    "vueIndentScriptAndStyle": false,
    "proseWrap": "preserve",
    "insertPragma": false,
    "printWidth": 80,
    "requirePragma": false,
    "tabWidth": 4,
    "useTabs": false,
    "embeddedLanguageFormatting": "auto"
} as any;


interface CodeEditorOptions {
    allowScripts?: boolean
}

export const CodeEditor: Plugin<CodeEditorOptions> = (editor, options) => {

    var jsonContent = JSON.stringify(editor.getComponents(), null, 4);
    var cssContent = css_beautify(editor.getCss() || "", beautyOptions);

    if (options.allowScripts) {
        (editor.getConfig() as any).allowScripts = 1;
    } else {
        (editor.getConfig() as any).allowScripts = 0;
    }

    editor.Commands.add("code-editor", {
        run: async (editor: Editor, sender: any) => {

            const content = $(`<div class="code-editor-wrapper">
                <div class="code-editor code-json">
                    <div class="code-title">JSON</div>
                    <div class="code-content"></div>
                </div>
                <div class="code-divider"></div>
                <div class="code-editor code-css">
                    <div class="code-title">CSS</div>
                    <div class="code-content"></div>
                </div>
            </div>`);

            $(content.find(".code-divider")).on("mousedown", function (e) {
                e.preventDefault(); // Prevent default browser behavior (e.g., text selection)

                const divider = $(this);
                divider.addClass("active");
                const prevEditor = divider.prev(".code-editor");
                const nextEditor = divider.next(".code-editor");

                $(document).on("mousemove", function (e) {
                    const offset = e.clientX - (divider.offset() as any).left;
                    const prevWidth = prevEditor.width() as any;
                    const nextWidth = nextEditor.width() as any;

                    const minimum = 25;

                    if (prevEditor.width() as any <= minimum || nextEditor.width() as any <= minimum) {

                        if (prevWidth + offset > minimum && nextWidth - offset > minimum) {
                            prevEditor.width(prevWidth + offset);
                            nextEditor.width(nextWidth - offset);
                            prevEditor.removeClass("closed");
                            nextEditor.removeClass("closed");
                        } else {
                            prevEditor.width(Math.max(prevWidth, minimum));
                            nextEditor.width(Math.max(nextWidth, minimum));
                            if (prevEditor.width() as any <= minimum) {
                                prevEditor.addClass("closed");
                            }
                            if (nextEditor.width() as any <= minimum) {
                                nextEditor.addClass("closed");
                            }
                        }

                    } else {
                        prevEditor.width(prevWidth + offset);
                        nextEditor.width(nextWidth - offset);
                    }
                });

                $(document).on("mouseup", function () {
                    $(document).off("mousemove");
                    $(document).off("mouseup");
                    divider.removeClass("active");

                });
            });
            $(content.find("#console-toggle")).on("click", function () {
                if (content.find(".code-console").hasClass("active")) {
                    content.find(".code-console").removeClass("active");
                    $(this).removeClass("active");
                } else {
                    content.find(".code-console").addClass("active");
                    $(this).addClass("active");
                }
            });

            jsonContent = JSON.stringify(editor.getComponents(), null, 4);
            cssContent = css_beautify(editor.getCss() || "", beautyOptions);

            var updateComponents: any = null;

            new EditorView({
                doc: jsonContent,
                extensions: [
                    basicSetup,
                    json(),
                    autocompletion(),
                    EditorView.updateListener.of((update) => {
                        if (update.docChanged) {
                            jsonContent = update.state.doc.toString();

                            if (updateComponents) clearTimeout(updateComponents);
                            updateComponents = setTimeout(() => {
                                let x: number = 0;
                                try {
                                    JSON.parse(jsonContent);
                                } catch (error) {
                                    x++;
                                } finally {
                                    if (x > 0) return;
                                    editor.DomComponents.clear();
                                    const components = JSON.parse(jsonContent);
                                    editor.setComponents(components);
                                    editor.setStyle(cssContent);
                                    editor.refresh();
                                }

                            }, 1000);
                        }
                    })
                ],
                parent: content.find("div.code-json .code-content")[0]
            });
            new EditorView({
                doc: cssContent,
                extensions: [
                    basicSetup,
                    css(),
                    autocompletion(),
                    EditorView.updateListener.of((update) => {
                        if (update.docChanged) {
                            cssContent = update.state.doc.toString();

                            if (updateComponents) clearTimeout(updateComponents);
                            updateComponents = setTimeout(() => {
                                let x: number = 0;
                                try {
                                    JSON.parse(jsonContent);
                                } catch (error) {
                                    x++;
                                } finally {
                                    if (x > 0) return;
                                    editor.DomComponents.clear();
                                    const components = JSON.parse(jsonContent);
                                    editor.setComponents(components);
                                    editor.setStyle(cssContent);
                                    editor.refresh();
                                }
                            }, 1000);
                        }
                    })
                ],
                parent: content.find("div.code-css .code-content")[0]
            });


            const modal = editor.Modal;
            modal.onceOpen(() => {
                setTimeout(() => {
                    const editorView = $(content.find(".code-editor") as any);
                    const divider = $(content.find(".code-divider") as any);
                    const totalWidth = editorView.parent().width() as any;
                    const itemWidth = (totalWidth - (divider.map(function () { return $(this).width() as any; }).toArray().reduce((a, b) => a + b, 0))) / editorView.length;
                    for (let i = 0; i < editorView.length; i++) {
                        $(editorView[i]).width(itemWidth);
                    }
                }, 1)
            });
            modal.open({
                title: "Code Editor",
                content: content,
                attributes: {
                    class: "code-editor-modal"
                }
            });
            modal.onceClose(() => {

            });
        }
    });
}