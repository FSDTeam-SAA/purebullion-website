import Image from "next/image";
import PageContainer from "@/components/website/shared/PageContainer";
import SectionHeading from "@/components/website/shared/SectionHeading";
import { NEWS_CATEGORIES, NEWS_CATEGORIES_HEADING } from "@/data/website/news";

export default function NewsCategories() {
  return (
    <PageContainer
      as="section"
      className="flex flex-col items-center gap-10 lg:gap-[60px]"
    >
      <SectionHeading
        badge={NEWS_CATEGORIES_HEADING.badge}
        title={NEWS_CATEGORIES_HEADING.title}
        description={NEWS_CATEGORIES_HEADING.description}
        descriptionClassName="max-w-[594px]"
      />
      <div className="grid w-full grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
        {NEWS_CATEGORIES.map((cat) => (
          <div
            key={cat.title}
            className="flex flex-col items-center justify-center gap-5 rounded-2xl border border-pb-bronze bg-[rgba(45,40,37,0.2)] p-4 sm:p-6"
          >
            <div className="flex items-center justify-center rounded-full bg-[rgba(192,146,72,0.1)] p-3">
              <Image src={cat.icon} alt="" width={32} height={32} />
            </div>
            <p className="text-center text-base font-semibold leading-[1.2] text-white sm:text-xl">
              {cat.title}
            </p>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
