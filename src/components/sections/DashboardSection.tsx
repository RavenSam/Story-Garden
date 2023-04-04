// 0. RANKS - F | F+..... S+
// 1. Writing streaks: Track the number of consecutive days an author writes and reward them for hitting milestones (e.g. 30-day streak, 60-day streak, etc.).
// 2. Average words per day: Calculate the average number of words an author writes each day and use that to assign them a productivity rating.
// 3. Time spent writing: Track how much time an author spends writing each day and assign them a rating based on the number of hours they log.
// 4. Consistency: Reward authors for consistently hitting their writing goals by assigning them a rating based on their ability to meet their word count targets over a long period of time.
// 5. Word Count Milestones: Similar to the word count ranks you mentioned earlier, but with specific milestones along the way. For example, reaching 10,000 words, 50,000 words, 100,000 words, etc.

import { For } from "solid-js"
import { RecentStories, StoryCard } from "~/components/flow/Books"

const stories = [
   {
      id: "1",
      title: "The Adventures of Sherlock Holmes",
      slug: "the-adventures-of-sherlock-holmes",
      cover: "",
      published: true,
      accountId: "1234",
      createdAt: "2022-04-01T14:30:00.000Z",
      updatedAt: "2022-04-05T09:45:00.000Z",
   },
   {
      id: "2",
      title: "Pride and Prejudice",
      slug: "pride-and-prejudice",
      cover: "",
      published: true,
      accountId: "5678",
      createdAt: "2022-02-15T08:00:00.000Z",
      updatedAt: "2022-03-01T16:20:00.000Z",
   },
   {
      id: "3",
      title: "The Catcher in the Rye",
      slug: "the-catcher-in-the-rye",
      cover: null,
      published: false,
      accountId: "9012",
      createdAt: "2022-03-10T11:15:00.000Z",
      updatedAt: "2022-03-15T18:00:00.000Z",
   },
   {
      id: "4",
      title: "To Kill a Mockingbird",
      slug: "to-kill-a-mockingbird",
      cover: "",
      published: true,
      accountId: "3456",
      createdAt: "2022-01-20T19:30:00.000Z",
      updatedAt: "2022-02-10T13:40:00.000Z",
   },
   {
      id: "5",
      title: "1984",
      slug: null,
      cover: null,
      published: true,
      accountId: "7890",
      createdAt: "2022-02-05T10:00:00.000Z",
      updatedAt: "2022-03-01T14:50:00.000Z",
   },
]

export default function DashboardSection() {
   return (
      <div class="p-4">
         <h1 class="text-3xl text-slate-500 font-extrabold ">Dashboard</h1>
         <hr class="border-emerald-500 border-2 rounded-full w-1/5 my-4" />

         <RecentStories stories={stories} />
      </div>
   )
}
