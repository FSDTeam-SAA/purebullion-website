import Image from "next/image";
import PageContainer from "@/components/website/shared/PageContainer";
import PageHero from "@/components/website/shared/PageHero";
import type { LegalDocument } from "@/data/website/legal";
import ConsentCheckbox from "./ConsentCheckbox";

export default function LegalPage({ doc }: { doc: LegalDocument }) {
  return (
    <>
      <PageHero
        badge={doc.badge}
        goldTitle={doc.goldTitle}
        whiteTitle={doc.whiteTitle}
        description={doc.description}
        className="lg:-mb-16"
      />
      <PageContainer className="-mb-10 flex flex-col gap-12 lg:-mb-[60px]">
        <div className="flex w-full items-center gap-3 rounded-lg border border-pb-bronze bg-pb-bronze/10 px-4 py-2">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-pb-bronze/10">
            <Image src="/icons/website/legal/info.svg" alt="" width={24} height={24} />
          </div>
          <p className="text-sm font-medium leading-[1.4] text-pb-bronze">
            {doc.summaryLabel} {doc.summary}
          </p>
        </div>

        {doc.sections.map((section, i) => (
          <section key={section.title} className="flex w-full flex-col gap-4">
            <h2 className="text-2xl font-semibold leading-[1.2] text-white lg:text-[32px]">
              {i + 1}. {section.title}
            </h2>
            {section.blocks.map((block, j) =>
              block.type === "p" ? (
                <p key={j} className="text-base leading-[1.5] text-pb-body">
                  {block.text}
                </p>
              ) : (
                <ul
                  key={j}
                  className="flex list-disc flex-col gap-4 pl-6 text-base leading-[1.5] text-pb-body"
                >
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ),
            )}
          </section>
        ))}

        <ConsentCheckbox
          prefix={doc.consentPrefix}
          link={doc.consentLink}
          suffix={doc.consentSuffix}
        />
      </PageContainer>
    </>
  );
}
