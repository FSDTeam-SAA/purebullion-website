export type Topic = "All discussions" | "Signals" | "Education" | "Market discussion" | "Platform help";
export type SortKey = "Trending" | "Newest" | "Most replies";

export const TOPICS: Topic[] = ["All discussions", "Signals", "Education", "Market discussion", "Platform help"];
export const SORTS: SortKey[] = ["Trending", "Newest", "Most replies"];
/** Topics that can be chosen when publishing a post. */
export const POST_TOPICS: Exclude<Topic, "All discussions">[] = ["Signals", "Education", "Market discussion", "Platform help"];

export type Post = {
  id: string;
  author: string;
  avatar?: string;
  /** label shown next to the author */
  topicLabel: string;
  /** filter category */
  category: Exclude<Topic, "All discussions">;
  timeLabel: string;
  minutesAgo: number;
  title: string;
  body: string;
  image?: string;
  comments: number;
  likes: number;
};

export const INITIAL_POSTS: Post[] = [
  {
    id: "p1",
    author: "Marcus D.",
    avatar: "/images/community/avatar-marcus.png",
    topicLabel: "Signals",
    category: "Signals",
    timeLabel: "2h ago",
    minutesAgo: 120,
    title: "How are people sizing the NVDA setup relative to their stop?",
    body: "The stop is 2.9% away which is tighter than most of the signals I've taken this quarter. Curious whether people size to a fixed dollar risk or a fixed position size. I've been doing fixed dollar risk for about six months and it has changed how the losing trades feel more than how the winners pay.",
    image: "/images/community/post-nvidia.jpg",
    comments: 19,
    likes: 19,
  },
  {
    id: "p2",
    author: "Samantha L.",
    avatar: "/images/community/avatar-samantha.png",
    topicLabel: "Market Trends",
    category: "Market discussion",
    timeLabel: "1h ago",
    minutesAgo: 60,
    title: "Has anyone noticed the recent volatility in tech stocks?",
    body: "It's been quite a ride lately, with some stocks jumping while others are falling. I wonder if this is a temporary phase or a sign of a bigger market shift. Are traders adjusting their strategies in response to this?",
    comments: 15,
    likes: 15,
  },
  {
    id: "p3",
    author: "Alex T.",
    avatar: "/images/community/avatar-alex.png",
    topicLabel: "Options Strategies",
    category: "Education",
    timeLabel: "30m ago",
    minutesAgo: 30,
    title: "What are the best strategies for trading options in this market?",
    body: "Given the current market dynamics, I’m curious about strategies that have worked well for others. Should we focus on spreads or straddles? Any insights on risk management would also be appreciated!",
    image: "/images/community/post-trading.jpg",
    comments: 22,
    likes: 22,
  },
];

export const STATS = [
  { label: "Total Members", value: "1,240" },
  { label: "Your total Post", value: "47" },
  { label: "Total Likes", value: "1.2k" },
];

export const ANNOUNCEMENTS = [
  { title: "Scanner update: two new exit conditions are live", date: "5h ago" },
  { title: "Community guidelines updated", date: "Sep 10" },
  { title: "New feature launch: Dark mode", date: "Oct 1" },
  { title: "Bug fixes and performance improvements", date: "Oct 15" },
];

export const TRENDING = [
  { title: "Scanner update: two new exit conditions are live", tag: "Signals", comments: "34 Comments" },
  { title: "Bug fix: resolved issues with user notifications", tag: "Fixes", comments: "12 Comments" },
  { title: "Performance report: increased efficiency by 25%", tag: "Reports", comments: "10 Comments" },
  { title: "Feature launch: improved speed optimization available", tag: "Updates", comments: "20 Comments" },
  { title: "Maintenance notice: scheduled downtime this weekend", tag: "Alerts", comments: "15 Comments" },
  { title: "Scanner update: two new exit conditions are live", tag: "Signals", comments: "34 Comments" },
  { title: "User feedback: new interface receives positive reviews", tag: "Reviews", comments: "8 Comments" },
];

export const REPORT_REASONS = [
  "Spam or promotion",
  "Harassment or abuse",
  "Misleading financial content",
  "Inappropriate content",
  "Other",
];
