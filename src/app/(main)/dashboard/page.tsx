import { Button } from "@/components/ui/button";
import Link from "next/link";

const DashboardPage = () => {
  return (
    <div className="w-full flex flex-col space-y-4 items-center justify-center h-[90vh]">
      <h1 className="text-sm text-muted-foreground font-bold">
        Are you a tutor or student? Please select your preferred choice below.
      </h1>

      <div className="flex items-center justify-center space-x-4">
        <Button variant="outline" size="lg">
          <Link href="/author/contents">Tutor</Link>
        </Button>

        <Button variant="outline" size="lg">
          <Link href="/student/library">Student</Link>
        </Button>
      </div>
    </div>
  );
};

export default DashboardPage;
