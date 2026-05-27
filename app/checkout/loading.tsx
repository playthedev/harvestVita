export default function CheckoutLoading() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] pt-44 pb-24 px-[5.128vw]">
      <div className="max-w-[1800px] mx-auto animate-pulse">
        <div className="h-4 w-24 bg-[#F5F0E8]/8 rounded mb-4" />
        <div className="h-12 w-64 bg-[#F5F0E8]/8 rounded mb-16" />
        <div className="grid lg:grid-cols-[1fr_400px] gap-14">
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 bg-[#F5F0E8]/5 rounded" />
            ))}
          </div>
          <div className="h-96 bg-[#F5F0E8]/5 rounded" />
        </div>
      </div>
    </main>
  );
}
