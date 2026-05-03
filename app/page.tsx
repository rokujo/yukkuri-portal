import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import KampaInfo from "@/components/KampaInfo";
import SubjectNav from "@/components/SubjectNav";
import SubjectSection from "@/components/SubjectSection";
import AboutJuku from "@/components/AboutJuku";
import Footer from "@/components/Footer";
import { getAppsBySubject } from "@/lib/apps";

export default function HomePage() {
  const groups = getAppsBySubject();
  const subjects = groups.map((g) => g.subject);
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <KampaInfo />
        <div className="bg-kinari-deep/30 border-y border-sumi/5 pb-8">
          <SubjectNav subjects={subjects} />
          {groups.map(({ subject, apps }) => (
            <SubjectSection key={subject} subject={subject} apps={apps} />
          ))}
        </div>
        <AboutJuku />
      </main>
      <Footer />
    </>
  );
}
