import { Skeleton, SkeletonCard } from "../../common/Skeleton"

const CaptainHomeSkeleton = () => {
  return (
    <div className="min-h-screen flex bg-[#F4F6FA]">
      {/* Sidebar skeleton */}
      <div className="w-64 shrink-0 bg-white border-r border-black/5 p-5 hidden md:flex flex-col gap-6">
        <Skeleton className="h-10 w-10 rounded-xl" />
        <div className="space-y-3 mt-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-full rounded-xl" />
          ))}
        </div>
      </div>

      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32 rounded-xl" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>

        <Skeleton className="w-full h-72 rounded-2xl" />
      </main>
    </div>
  )
}

export default CaptainHomeSkeleton
