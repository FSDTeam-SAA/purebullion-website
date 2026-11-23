"use client";

import type { AnnouncementDto, CommunityPostDto } from "@/services/community.service";
import { useCommunityAnnouncements, useTrendingPosts } from "@/hooks/useCommunity";
import { fmtDate, timeAgo } from "@/lib/format";
import { PanelEmpty, PanelLoading } from "../../_components/shared/QueryState";

const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="flex flex-col gap-5 overflow-hidden rounded-lg border border-white/10 bg-[#101010] p-4">
    <h2 className="text-[24px] font-semibold leading-[1.2] text-white">{title}</h2>
    {children}
  </section>
);

const itemTitle = "text-[16px] font-semibold leading-[1.2] text-pb-text";
const itemMeta = "text-[12px] font-medium leading-[1.5] text-pb-muted";

export function SidePanels() {
  const ann = useCommunityAnnouncements();
  const trending = useTrendingPosts(7);
  return (
    <div className="flex w-[453px] shrink-0 flex-col gap-4">
      <Card title="Announcements">
        {ann.isLoading ? (
          <PanelLoading rows={3} />
        ) : !ann.data?.length ? (
          <PanelEmpty>No announcements.</PanelEmpty>
        ) : (
          ann.data.map((a: AnnouncementDto) => {
            const d = a.publishedAt ?? a.createdAt;
            const recent = d && Date.now() - new Date(d).getTime() < 7 * 86400000;
            return (
              <div key={a._id} className="flex flex-col gap-2">
                <p className={itemTitle}>{a.title}</p>
                <p className={itemMeta}>{recent ? timeAgo(d) : fmtDate(d)}</p>
              </div>
            );
          })
        )}
      </Card>
      <Card title="Trending discussions">
        {trending.isLoading ? (
          <PanelLoading rows={4} />
        ) : !trending.data?.length ? (
          <PanelEmpty>No discussions yet.</PanelEmpty>
        ) : (
          trending.data.map((t: CommunityPostDto) => (
            <div key={t._id} className="flex flex-col gap-2">
              <p className={itemTitle}>{t.title}</p>
              <div className={`flex items-center gap-2 ${itemMeta}`}>
                <span>{t.topic}</span>
                <span className="flex items-center gap-2">
                  <span className="size-[3px] rounded-full bg-pb-muted" />
                  {t.repliesCount} Comments
                </span>
              </div>
            </div>
          ))
        )}
      </Card>
    </div>
  );
}
