import prisma from "@/lib/prisma";
import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";
import { CourseCard } from "../_components/course-card";

const StudentCoursesPage = async () => {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) {
    redirect("/login");
  }

  const courses = await prisma.course.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {courses.map((course) => (
        <CourseCard key={course.id} data={course} />
      ))}
    </div>
  );
};

export default StudentCoursesPage;
