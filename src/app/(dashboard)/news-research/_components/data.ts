export const categories = ["All News", "Technology", "Stocks", "ETFs", "Economy", "Education"] as const;
export type Category = (typeof categories)[number];

export type Article = {
  id: string;
  title: string;
  body: string[];
  source: string;
  time: string;
  tag: Exclude<Category, "All News">;
  image: string;
  imagePosition?: string;
};

const nvidiaBody =
  "Lorem ipsum dolor sit amet consectetur. Turpis et varius aliquam condimentum consequat proin phasellus. Lectus semper in nullam non ut. Amet habitant non non penatibus sed varius. Fermentum eu faucibus semper fusce non. Vulputate eros nulla feugiat id risus. Porttitor diam egestas tortor metus enim vitae mauris felis. Ac justo lorem nulla ut mi amet tincidunt. Dolor arcu varius ultrices vulputate vitae elementum. Scelerisque netus eu enim eu blandit et ornare. Neque orci massa lacus volutpat feugiat purus etiam in. Nec volutpat tortor id purus diam dolor feugiat ut purus. Nullam id tincidunt et pulvinar pretium id purus.";

export const articles: Article[] = [
  {
    id: "1",
    title: "NVIDIA Shares Rise on Strong Al Demand and New Data Center Partnerships",
    body: [nvidiaBody],
    source: "Reuters",
    time: "3h ago",
    tag: "Technology",
    image: "/images/news-research/nvidia.jpg",
    imagePosition: "50% 20%",
  },
  {
    id: "2",
    title: "Tesla Reports Record Deliveries Amidst Supply Chain Challenges",
    body: [
      "Lorem ipsum dolor sit amet consectetur. Bibendum adipiscing sit amet tellus. In quis tellus tempus nulla mi egestas fermentum. Nunc et ultrices in velit ornare adipiscing mi. Ligula odio morbi at natoque morbi tellus fringilla nunc maecenas. At morbi nascetur proin nec eget porttitor ut. Libero nibh cras dictumst massa vitae odio tellus porttitor sed.",
      "Hendrerit id viverra cursus ornare eget quam quisque sed viverra. Aliquet aenean neque ullamcorper diam scelerisque netus nunc morbi dui. Nibh lacus ultricies blandit id dolor. Vulputate eu scelerisque id.",
    ],
    source: "Bloomberg",
    time: "1h ago",
    tag: "Economy",
    image: "/images/news-research/tesla.jpg",
  },
  {
    id: "3",
    title: "NVIDIA Shares Rise on Strong Al Demand and New Data Center Partnerships",
    body: [nvidiaBody],
    source: "Reuters",
    time: "3h ago",
    tag: "Technology",
    image: "/images/news-research/nvidia.jpg",
    imagePosition: "50% 20%",
  },
  {
    id: "4",
    title: "Apple Unveils New Features for iOS 17 to Enhance User Experience",
    body: [
      "Curabitur sit amet libero euismod, bibendum nulla a, interdum nisl. Nulla facilisi. Proin cursus orci sed massa tincidunt, ut dictum nisl faucibus. Mauris quis sapien nec enim tristique porta. Suspendisse porttitor erat diam, vitae gravida libero vestibulum ac. Aliquam erat volutpat. Ut pulvinar augue nec libero vehicula, nec varius velit scelerisque. Integer malesuada felis elit, non pretium tellus scelerisque at. Etiam sit amet purus ac nulla porta malesuada id vel dui.",
    ],
    source: "TechCrunch",
    time: "2h ago",
    tag: "Technology",
    image: "/images/news-research/apple.jpg",
  },
];
