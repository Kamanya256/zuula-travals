import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

interface Props {
  booking: {
    fullName: string;
    email: string;
    phone: string;
    travelers: string;
    travelDate: string;
    packageName: string;
    paymentMethod: string;
    promoCode?: string;
    amount?: string;
  };
}

export default function BookingReceipt({ booking }: Props) {
  const receiptId = `ZT-${Date.now().toString(36).toUpperCase()}`;
  const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html><head><title>Booking Receipt - ${receiptId}</title>
      <style>
        body { font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 40px auto; padding: 20px; color: #333; }
        .header { text-align: center; border-bottom: 2px solid #2a7a52; padding-bottom: 20px; margin-bottom: 20px; }
        .logo { font-size: 24px; font-weight: bold; color: #2a7a52; }
        .logo span { color: #c89030; }
        .receipt-id { font-size: 12px; color: #888; margin-top: 5px; }
        .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; font-size: 14px; }
        .label { color: #888; }
        .value { font-weight: 500; }
        .footer { text-align: center; margin-top: 30px; font-size: 11px; color: #888; }
        .status { display: inline-block; background: #e8f5e9; color: #2a7a52; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        @media print { body { margin: 0; } }
      </style></head><body>
      <div class="header">
        <div class="logo">Zula<span>Travels</span></div>
        <p style="font-size:12px;color:#888;">Premium Travel & Logistics — East Africa</p>
        <div class="receipt-id">Receipt: ${receiptId}</div>
        <div class="receipt-id">Date: ${date}</div>
      </div>
      <h3 style="margin-bottom:15px;">Booking Confirmation</h3>
      <div class="row"><span class="label">Name</span><span class="value">${booking.fullName}</span></div>
      <div class="row"><span class="label">Email</span><span class="value">${booking.email}</span></div>
      <div class="row"><span class="label">Phone</span><span class="value">${booking.phone}</span></div>
      <div class="row"><span class="label">Package</span><span class="value">${booking.packageName || "Custom"}</span></div>
      <div class="row"><span class="label">Travel Date</span><span class="value">${booking.travelDate}</span></div>
      <div class="row"><span class="label">Travelers</span><span class="value">${booking.travelers}</span></div>
      <div class="row"><span class="label">Payment</span><span class="value">${booking.paymentMethod}</span></div>
      ${booking.promoCode ? `<div class="row"><span class="label">Promo Code</span><span class="value">${booking.promoCode}</span></div>` : ""}
      <div style="text-align:center;margin:20px 0;"><span class="status">✓ Booking Confirmed</span></div>
      <div class="footer">
        <p>Zula Travels Ltd · Kampala, Uganda</p>
        <p>+256 774 488 956 · zulatravels@gmail.com</p>
        <p style="margin-top:10px;">Thank you for choosing Zula Travels!</p>
      </div>
      </body></html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <Button onClick={handlePrint} variant="outline" size="sm" className="rounded-full">
      <Printer className="w-4 h-4 mr-1.5" /> Print Receipt
    </Button>
  );
}
