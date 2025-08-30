export function ProductInfoLoader() {
  return (
    <div className="space-y-4 p-2">
      {/* Back Button Skeleton */}
      <div className="mb-4">
        <div className="h-10 w-24 bg-gray-200/30 animate-pulse rounded-md"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images Skeleton */}
        <div>
          <div className="space-y-4 sticky top-3">
            {/* Main Image Skeleton */}
            <div className="aspect-square relative overflow-hidden rounded-xl bg-gray-200/30 animate-pulse"></div>

            {/* Thumbnail Images Skeleton */}
            <div className="flex gap-2 overflow-x-auto">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-20 h-20 rounded-lg bg-gray-200/30 animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Details Skeleton */}
        <div className="space-y-6">
          {/* Brand & Title Skeleton */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="h-6 w-24 bg-gray-200/30 animate-pulse rounded mb-2"></div>
              <div className="h-8 w-3/4 bg-gray-200/30 animate-pulse rounded"></div>
            </div>
            <div className="flex flex-col gap-2 ml-4">
              <div className="h-10 w-10 bg-gray-200/30 animate-pulse rounded-full"></div>
              <div className="h-10 w-10 bg-gray-200/30 animate-pulse rounded-full"></div>
            </div>
          </div>

          {/* Rating Skeleton */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 w-4 bg-gray-200/30 animate-pulse rounded"
                ></div>
              ))}
              <div className="h-4 w-8 bg-gray-200/30 animate-pulse rounded ml-1"></div>
            </div>
            <div className="h-4 w-20 bg-gray-200/30 animate-pulse rounded"></div>
          </div>

          {/* Price Skeleton */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-24 bg-gray-200/30 animate-pulse rounded"></div>
            <div className="h-6 w-20 bg-gray-200/30 animate-pulse rounded"></div>
            <div className="h-6 w-16 bg-gray-200/30 animate-pulse rounded"></div>
          </div>

          {/* Stock Status Skeleton */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-200/30 animate-pulse rounded-full"></div>
            <div className="h-4 w-16 bg-gray-200/30 animate-pulse rounded"></div>
          </div>

          <div className="w-full h-px bg-gray-200/30"></div>

          {/* Description Skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200/30 animate-pulse rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200/30 animate-pulse rounded"></div>
            <div className="h-4 w-4/5 bg-gray-200/30 animate-pulse rounded"></div>
          </div>

          {/* Color Selection Skeleton */}
          <div>
            <div className="h-5 w-20 bg-gray-200/30 animate-pulse rounded mb-3"></div>
            <div className="flex gap-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 w-20 bg-gray-200/30 animate-pulse rounded-lg"
                ></div>
              ))}
            </div>
          </div>

          {/* Size Selection Skeleton */}
          <div>
            <div className="h-5 w-16 bg-gray-200/30 animate-pulse rounded mb-3"></div>
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 w-12 bg-gray-200/30 animate-pulse rounded-lg"
                ></div>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart Skeleton */}
          <div className="space-y-4">
            <div>
              <div className="h-5 w-16 bg-gray-200/30 animate-pulse rounded mb-3"></div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gray-200/30 animate-pulse rounded"></div>
                <div className="h-6 w-8 bg-gray-200/30 animate-pulse rounded"></div>
                <div className="h-10 w-10 bg-gray-200/30 animate-pulse rounded"></div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-1 h-12 bg-gray-200/30 animate-pulse rounded"></div>
              <div className="h-12 w-12 bg-gray-200/30 animate-pulse rounded"></div>
            </div>
          </div>

          {/* Features Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-4 w-4 bg-gray-200/30 animate-pulse rounded"></div>
                <div className="h-4 w-24 bg-gray-200/30 animate-pulse rounded"></div>
              </div>
            ))}
          </div>

          {/* Tags Skeleton */}
          <div>
            <div className="h-5 w-12 bg-gray-200/30 animate-pulse rounded mb-3"></div>
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-6 w-16 bg-gray-200/30 animate-pulse rounded"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
