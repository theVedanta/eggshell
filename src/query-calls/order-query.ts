import { API_URL } from "@/lib/env";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CheckoutForm } from "@/app/(pages)/checkout/page";
import { CartItem } from "@/lib/types";

// Type for the order, based on CheckoutForm
export interface Order extends CheckoutForm {
  id?: string;
  items?: CartItem[];
  createdAt?: string;
  updatedAt?: string;
}

// Fetch all orders
export function useGetAllOrders(id?: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["all-orders", id],
    queryFn: async () => {
      if (id) {
        const response = await fetch(`${API_URL}/order?id=${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const result = await response.json();
        return [result.data] as Order[]; // Wrap single order in array
      } else {
        const response = await fetch(`${API_URL}/order`);
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const result = await response.json();
        return result.data as Order[];
      }
    },
  });
  return { data, error, isLoading };
}

// Create a new order
export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      order: CheckoutForm | { items: CartItem[]; total: number }
    ) => {
      const response = await fetch(`${API_URL}/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      // Fetch brand info for each unique brand and send them an email for their items
      const orderData = JSON.parse(JSON.stringify(order));
      const items: CartItem[] = orderData.items || [];

      // Group items by brand
      const brandItemsMap = items.reduce<Record<string, CartItem[]>>(
        (acc, item) => {
          if (item.brand) {
            acc[item.brand] = acc[item.brand] || [];
            acc[item.brand].push(item);
          }
          return acc;
        },
        {}
      );

      // For each brand, fetch brand info and send a single email listing all their items in the order
      await Promise.all(
        Object.entries(brandItemsMap).map(async ([brandName, brandItems]) => {
          // Fetch brand info by name
          const brandRes = await fetch(
            `${API_URL}/brands/name?name=${encodeURIComponent(brandName)}`
          );
          if (!brandRes.ok) return;

          const brandResult = await brandRes.json();
          const brand = brandResult.data && brandResult.data[0];

          if (brand && brand.email) {
            // Calculate total for this brand's items
            const brandTotal = brandItems.reduce((total, item) => {
              return total + (item.price || 0) * (item.quantity || 1);
            }, 0);

            const message = `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; color: #1f2937; line-height: 1.6;">
                  <!-- Header -->
                  <div style="background-color: #4f46e5; color: white; padding: 32px 24px; text-align: center; border-radius: 8px 8px 0 0;">
                    <h1 style="margin: 0; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">🎉 New Order Received!</h1>
                    <p style="margin: 8px 0 0 0; font-size: 16px; opacity: 0.9;">Hello ${brand.name}</p>
                  </div>

                  <!-- Content Container -->
                  <div style="padding: 32px 24px; background-color: #ffffff;">
                    <p style="font-size: 16px; margin: 0 0 24px 0; color: #6b7280;">Great news! You've received a new order for the following products:</p>

                    <!-- Products Section -->
                    <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                      <h3 style="color: #4f46e5; margin: 0 0 16px 0; font-size: 18px; font-weight: 600; display: flex; align-items: center;">
                        📦 Ordered Items
                      </h3>
                      <table style="width: 100%; border-collapse: collapse;">
                      ${brandItems
                        .map(
                          (item, index) =>
                            `<tr style="border-bottom: ${index < brandItems.length - 1 ? "1px solid #e5e7eb" : "none"};">
                               <td style="padding: 16px 0; vertical-align: top; width: 80px;">
                                 ${item.selectedImage ? `<img src="${item.selectedImage}" alt="${item.name}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 4px;">` : `<div style="width: 70px; height: 70px; background-color: #e5e7eb; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 24px;">📦</div>`}
                               </td>
                               <td style="padding: 16px 0 16px 16px; vertical-align: top;">
                                 <h4 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #1f2937;">${item.name}</h4>
                                 <div style="font-size: 18px; color: #6b7280; margin-bottom: 4px;">
                                   <span><strong>Qty:</strong> ${item.quantity ?? 1}</span>
                                   ${item.size ? ` | <strong>Size:</strong> ${item.size}` : ""}
                                   ${item.selectedColor ? ` | <strong>Color:</strong> ${item.selectedColor}` : ""}
                                 </div>
                                 <div style="font-size: 16px; color: #4f46e5; font-weight: 600;">
                                   $${item.price?.toFixed(2) ?? "N/A"}
                                 </div>
                               </td>
                             </tr>`
                        )
                        .join("")}
                      </table>
                    </div>

                    <!-- Brand Total Section -->
                    <div style="background-color: #4f46e5; border-radius: 8px; padding: 20px; margin-bottom: 24px; text-align: center;">
                      <h3 style="color: #ffffff; margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">
                        Total:
                      </h3>
                      <div style="color: #ffffff; font-size: 24px; font-weight: 700;">
                        $${brandTotal.toFixed(2)}
                      </div>
                    </div>

                    <!-- Customer Details Section -->
                    <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px;">
                      <h3 style="color: #4f46e5; margin: 0 0 16px 0; font-size: 18px; font-weight: 600; display: flex; align-items: center;">
                        👤 Customer Information
                      </h3>
                      <table style="width: 100%; border-collapse: collapse;">
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                          <td style="padding: 12px 0; font-weight: 600; color: #6b7280; width: 35%;">Name:</td>
                          <td style="padding: 12px 0; color: #1f2937;">${orderData.name || "Customer"}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                          <td style="padding: 12px 0; font-weight: 600; color: #6b7280;">Email:</td>
                          <td style="padding: 12px 0; color: #1f2937;">${orderData.email || ""}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                          <td style="padding: 12px 0; font-weight: 600; color: #6b7280;">Phone:</td>
                          <td style="padding: 12px 0; color: #1f2937;">${orderData.phone || ""}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                          <td style="padding: 12px 0; font-weight: 600; color: #6b7280;">Address:</td>
                          <td style="padding: 12px 0; color: #1f2937;">${orderData.address || ""}</td>
                        </tr>
                      </table>
                    </div>

                    <!-- Action Section -->
                    <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin: 32px 0; text-align: center;">
                      <p style="margin: 0; font-size: 16px; color: #6b7280; font-weight: 500;">
                        ⚡ Please prepare these items for delivery or pickup as soon as possible.
                      </p>
                    </div>

                    <!-- Footer -->
                    <div style="text-align: center; padding-top: 24px; border-top: 1px solid #e5e7eb;">
                      <p style="margin: 0; font-size: 16px; color: #4f46e5; font-weight: 600;">Thank you for your partnership! 🙏</p>
                      <p style="margin: 8px 0 0 0; font-size: 14px; color: #9ca3af;">This is an automated notification from your order management system.</p>
                    </div>
                  </div>
                </div>
           `;

            await fetch(`${API_URL}/email`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: orderData.name || "Customer",
                email: orderData.email || "",
                subject: `New Order for ${brand.name}`,
                recipient: brand.email,
                message,
              }),
            });
          }
        })
      );

      const result = await response.json();
      return result.data as Order;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-orders"] });
    },
  });
}

// Fetch all orders
export function useGetAllOrdersByUserId(userId: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["all-orders", userId],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/order/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const result = await response.json();
      return [result.data] as Order[]; // Wrap single order in array
    },
  });
  return { data, error, isLoading };
}
