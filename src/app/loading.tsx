import ShimmerText from "@/components/shimmer-text";

export default function Loading() {
  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      <div className="text-white text-lg">
        <ShimmerText text="EGGSHELL" />
      </div>
    </div>
  );
}
