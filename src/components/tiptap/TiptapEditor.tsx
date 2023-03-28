import { createTiptapEditor } from "solid-tiptap"
import StarterKit from "@tiptap/starter-kit"
import BubbleMenu from "@tiptap/extension-bubble-menu"
import Typography from "@tiptap/extension-typography"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import { createSignal, JSX, Show } from "solid-js"
import { Toolbar } from "solid-headless"
import FloatingToolbar from "./FloatingToolbar"
import FixedToolbar from "./FixedToolbar"
import { EditorSettingsTypes } from "../Editor"

const CONTENT = `
  <h2>
  Hi there,
  </h2>
  <p>
  this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
  </p>
  <ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
  </ul>
  <p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
  </p>
  <pre><code class="language-css">body {
    display: none;
  }</code></pre>
  <p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
  </p>
  <p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
  </p>
  <pre><code class="language-css">body {
    display: none;
  }</code></pre>
  <p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
  </p>
  <p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
  </p>
  <pre><code class="language-css">body {
    display: none;
  }</code></pre>
  <p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
  </p>
  <blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
  </blockquote>    
  `

interface TipEditorProps {
   editorSettings: EditorSettingsTypes
}

export default function TiptapEditor(props: TipEditorProps): JSX.Element {
   const [container, setContainer] = createSignal<HTMLDivElement>()
   const [menu, setMenu] = createSignal<HTMLDivElement>()

   const editor = createTiptapEditor(() => ({
      element: container()!,
      extensions: [
         StarterKit,
         BubbleMenu.configure({ element: menu()!, tippyOptions: { placement: "bottom" } }),
         Typography,
         Underline,
         TextAlign.configure({ types: ["heading", "paragraph"] }),
      ],
      editorProps: {
         attributes: {
            class: "p-2 md:p-8 focus:outline-none prose max-w-full",
         },
      },
      content: CONTENT,
   }))

   return (
      <>
         <Toolbar ref={setMenu} class="shadow bg-white/70 backdrop-blur-sm  rounded-xl" horizontal>
            <Show when={editor()} keyed>
               {(instance) => <FloatingToolbar editor={instance} />}
            </Show>
         </Toolbar>

         <div class={`${props.editorSettings.toolbar_position}  relative`}>
            <Show when={editor()} keyed>
               {(instance) => (
                  <div class="FixedToolbar sticky w-full p-2 rounded-xl bg-white/70 backdrop-blur-sm shadow-6 z-10">
                     <FixedToolbar editor={instance} />
                  </div>
               )}
            </Show>

            <div class="min-h-[80vh]" ref={setContainer} />
         </div>
      </>
   )
}
