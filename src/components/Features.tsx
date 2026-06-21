import * as TabsPrimitive from "@radix-ui/react-tabs";
import { Layout, Pointer, Zap } from "lucide-react";

const Tabs = TabsPrimitive.Root;
const TabsList = TabsPrimitive.List;
const TabsTrigger = TabsPrimitive.Trigger;
const TabsContent = TabsPrimitive.Content;

interface TabContent {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
}

interface Tab {
  value: string;
  icon: React.ReactNode;
  label: string;
  content: TabContent;
}

interface Feature108Props {
  badge?: string;
  heading?: string;
  description?: string;
  tabs?: Tab[];
}

export const Features = ({
  badge = "Enterprise Solutions",
  heading = "A Collection of Tools Built for High Performance",
  description = "Join us to build flawless digital solutions designed for the modern enterprise.",
  tabs = [
    {
      value: "tab-1",
      icon: <Zap className="h-auto w-4 shrink-0" />,
      label: "Boost Efficiency",
      content: {
        badge: "Modern Tactics",
        title: "Make your workflow a true standout.",
        description:
          "Discover new operational trends that help you craft sleek, highly functional processes that drive results.",
        buttonText: "See Plans",
        imageSrc:
          "https://shadcnblocks.com/images/block/placeholder-dark-1.svg",
        imageAlt: "placeholder",
      },
    },
    {
      value: "tab-2",
      icon: <Pointer className="h-auto w-4 shrink-0" />,
      label: "Higher Engagement",
      content: {
        badge: "Expert Features",
        title: "Boost your team with top-tier design.",
        description:
          "Use stellar design to easily engage users and strengthen their loyalty. Create a seamless experience that keeps them coming back for more.",
        buttonText: "See Tools",
        imageSrc:
          "https://shadcnblocks.com/images/block/placeholder-dark-2.svg",
        imageAlt: "placeholder",
      },
    },
    {
      value: "tab-3",
      icon: <Layout className="h-auto w-4 shrink-0" />,
      label: "Stunning Architecture",
      content: {
        badge: "Elite Solutions",
        title: "Build an advanced digital experience.",
        description:
          "Lift your brand with modern tech that grabs attention and drives action. Create a digital experience that stands out from the crowd.",
        buttonText: "See Options",
        imageSrc:
          "https://shadcnblocks.com/images/block/placeholder-dark-3.svg",
        imageAlt: "placeholder",
      },
    },
  ],
}: Feature108Props) => {
  return (
    <section className="py-32 bg-surface">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="px-3 py-1 text-xs border rounded-full border-outline text-on-surface-variant font-label-sm uppercase tracking-wider">
            {badge}
          </span>
          <h2 className="max-w-2xl font-headline-md text-headline-md text-on-surface">
            {heading}
          </h2>
          <p className="text-on-surface-variant font-body-md max-w-xl">
            {description}
          </p>
        </div>
        <Tabs defaultValue={tabs[0].value} className="mt-12">
          <TabsList className="flex flex-col items-center justify-center gap-4 sm:flex-row md:gap-10 mb-8">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-on-surface-variant data-[state=active]:bg-primary-container/10 data-[state=active]:text-primary transition-colors cursor-pointer"
              >
                {tab.icon} {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mx-auto max-w-screen-xl rounded-[24px] bg-surface-container-lowest border border-outline-variant/30 soft-shadow p-6 lg:p-16">
            {tabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="grid place-items-center gap-12 lg:grid-cols-2 lg:gap-10 data-[state=inactive]:hidden"
              >
                <div className="flex flex-col gap-6 text-left w-full">
                  <span className="px-3 py-1 text-[10px] w-fit border rounded-[2px] border-outline text-on-surface-variant font-label-sm uppercase tracking-widest bg-surface">
                    {tab.content.badge}
                  </span>
                  <h3 className="font-headline-sm text-[32px] md:text-[40px] leading-[1.2] text-on-surface">
                    {tab.content.title}
                  </h3>
                  <p className="text-on-surface-variant font-body-md md:text-body-lg">
                    {tab.content.description}
                  </p>
                  <button className="btn-primary px-8 py-3 rounded font-label-sm text-label-sm w-fit mt-2">
                    {tab.content.buttonText}
                  </button>
                </div>
                <div className="w-full h-full min-h-[300px] rounded-xl overflow-hidden bg-surface-container-low flex items-center justify-center border border-outline-variant/30">
                  <img
                    src={tab.content.imageSrc}
                    alt={tab.content.imageAlt}
                    className="w-full h-full object-cover opacity-80"
                    style={{ filter: "grayscale(100%) contrast(1.1) brightness(1.2) sepia(20%) hue-rotate(10deg)" }}
                  />
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
};
