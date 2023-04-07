import { Story } from "@prisma/client"
import { Accessor, createContext, createSignal, JSXElement, Setter, useContext } from "solid-js"

interface StoryContextProps {
   story: Accessor<Story | undefined>
   setStory: Setter<Story | undefined>
}

const StoryContext = createContext<StoryContextProps>()

export const StoryContextProvider = (props: { children: JSXElement }) => {
   const [story, setStory] = createSignal<Story>()

   return <StoryContext.Provider value={{ story, setStory }}>{props.children}</StoryContext.Provider>
}

export const useStoryContext = () => useContext(StoryContext)!
