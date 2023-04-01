// 0. RANKS - F | F+..... S+
// 1. Writing streaks: Track the number of consecutive days an author writes and reward them for hitting milestones (e.g. 30-day streak, 60-day streak, etc.).
// 2. Average words per day: Calculate the average number of words an author writes each day and use that to assign them a productivity rating.
// 3. Time spent writing: Track how much time an author spends writing each day and assign them a rating based on the number of hours they log.
// 4. Consistency: Reward authors for consistently hitting their writing goals by assigning them a rating based on their ability to meet their word count targets over a long period of time.
// 5. Word Count Milestones: Similar to the word count ranks you mentioned earlier, but with specific milestones along the way. For example, reaching 10,000 words, 50,000 words, 100,000 words, etc.

export default function DashboardSection() {
   return (
      <div>
         <h1 class="text-4xl md:text-5xl font-extrabold">Dashboard</h1>
         <hr />
         <h2 class="text-3xl md:text-4xl font-bold text-slate-800">Recent Updated</h2>
      </div>
   )
}
