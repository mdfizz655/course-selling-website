const CourseSkeleton = () => {
  return (
    <div className="bg-gray-100 rounded-3xl p-4 animate-pulse h-[400px] flex flex-col gap-4">
      <div className="bg-gray-200 h-48 w-full rounded-2xl"></div>
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="mt-auto h-10 bg-gray-200 rounded-xl w-full"></div>
    </div>
  );
};

export default CourseSkeleton;