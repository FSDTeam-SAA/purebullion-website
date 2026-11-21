export type Topic = "All discussions" | "Signals" | "Education" | "Market discussion" | "Platform help";
export type SortKey = "Trending" | "Newest" | "Most replies";

export const TOPICS: Topic[] = ["All discussions", "Signals", "Education", "Market discussion", "Platform help"];
export const SORTS: SortKey[] = ["Trending", "Newest", "Most replies"];
/** Topics that can be chosen when publishing a post. */
export const POST_TOPICS: Exclude<Topic, "All discussions">[] = ["Signals", "Education", "Market discussion", "Platform help"];

/** UI topic -> backend `topic` query value */
export const topicParam = (t: Topic) => (t === "All discussions" ? "all" : t);
/** UI sort -> backend `sort` query value */
export const SORT_PARAM: Record<SortKey, "trending" | "newest" | "most-replies"> = {
  Trending: "trending",
  Newest: "newest",
  "Most replies": "most-replies",
};

export const REPORT_REASONS = [
  "Spam or promotion",
  "Harassment or abuse",
  "Misleading financial content",
  "Inappropriate content",
  "Other",
];
