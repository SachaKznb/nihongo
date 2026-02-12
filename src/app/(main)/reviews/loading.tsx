export default function ReviewsLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="animate-pulse">
        <div className="h-8 bg-stone-200 rounded w-32 mb-8" />
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-200">
          <div className="flex justify-center">
            <div className="h-32 w-32 bg-stone-200 rounded-full" />
          </div>
          <div className="h-6 bg-stone-200 rounded w-48 mx-auto mt-6" />
        </div>
      </div>
    </div>
  );
}
