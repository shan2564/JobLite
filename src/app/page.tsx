import AddJobApplication from '@/components/AddJobApplication';
import JobList from '@/components/JobList';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Job Application Tracker</h1>
      <AddJobApplication />
      <JobList />
    </div>
  );
}
