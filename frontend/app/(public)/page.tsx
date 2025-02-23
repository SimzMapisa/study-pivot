import CourseOfferingsSection from '@/components/courses/courses';
import FeaturesSection from '@/components/feature/feature';
import Header from '@/components/home/hero';

export default async function Home() {
	return (
		<>
			<Header />
			<FeaturesSection />
			<CourseOfferingsSection />
		</>
	);
}
