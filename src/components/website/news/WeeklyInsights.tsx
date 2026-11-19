import Image from "next/image";
import Link from "next/link";
import PageContainer from "@/components/website/shared/PageContainer";
import SectionHeading from "@/components/website/shared/SectionHeading";
import {
  NEWS_ARTICLES,
  NEWS_TOPICS,
  NEWS_WEEKLY,
} from "@/data/website/news";

export default function WeeklyInsights() {
  const { featured } = NEWS_WEEKLY;
  return (
    <PageContainer
      as="section"
      id="latest"
      className="flex flex-col items-center gap-10 lg:gap-[60px]"
    >
      <SectionHeading
        badge={NEWS_WEEKLY.badge}
        title={NEWS_WEEKLY.title}
        description={NEWS_WEEKLY.description}
        descriptionClassName="max-w-[1024px]"
        titleClassName="max-w-[1202px]"
      />

      <div className="flex w-full flex-col gap-6 overflow-hidden rounded-2xl bg-[rgba(192,146,72,0.05)] p-4 sm:p-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="relative aspect-[636/492] w-full overflow-hidden rounded-lg lg:aspect-auto lg:h-[492px]">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              sizes="(min-width: 1024px) 636px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-2 p-0 sm:p-5">
              <h3 className="text-2xl font-semibold leading-[1.2] text-white sm:text-[32px]">
                {featured.title}
              </h3>
              <p className="text-base leading-[1.5] text-pb-body sm:text-lg">
                {featured.description}
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 sm:gap-x-[120px] sm:gap-y-6 lg:px-8 lg:py-5">
              {NEWS_TOPICS.map((topic) => (
                <div key={topic.title} className="flex flex-col gap-2">
                  <div className="size-10 overflow-hidden rounded-lg bg-[rgba(192,146,72,0.1)]">
                    <Image src={topic.icon} alt="" width={40} height={40} />
                  </div>
                  <h4 className="text-xl font-bold leading-[1.2] text-white">
                    {topic.title}
                  </h4>
                  <p className="text-sm leading-[1.2] text-pb-body">
                    {topic.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {NEWS_ARTICLES.map((article) => (
            <Link
              key={article.title}
              href={article.href}
              className="flex flex-col overflow-hidden rounded-lg border-[0.5px] border-pb-bronze bg-[rgba(192,146,72,0.05)] transition hover:brightness-110"
            >
              <div className="relative h-[251px] w-full">
                <Image
                  src={article.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 408px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-2 p-5 leading-[1.2]">
                <h3 className="text-lg font-semibold text-white">{article.title}</h3>
                <p className="line-clamp-6 text-sm text-pb-body">{article.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
