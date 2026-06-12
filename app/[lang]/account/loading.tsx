export default function AccountLoading() {
  return (
    <main className="min-h-screen bg-[#0D0D0D] pt-32 pb-24 px-[5.128vw]">
      <div className="max-w-[1200px] mx-auto animate-pulse">
        <div className="h-4 w-24 bg-[#F5F0E8]/8 rounded mb-4" />
        <div className="h-10 w-64 bg-[#F5F0E8]/8 rounded mb-14" />
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-[#F5F0E8]/5 rounded" />
            ))}
          </div>
          <div className="h-64 bg-[#F5F0E8]/5 rounded" />
        </div>
      </div>
    </main>
  );
}
