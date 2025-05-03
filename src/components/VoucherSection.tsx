import { useState } from "react";
import voucherData from "@assets/data-voucher.json";

interface Props {
  title: string;
}

export default function VoucherSection({ title }: Props) {
  const [voucherCode, setVoucherCode] = useState("");
  const [message, setMessage] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const [validVoucherCode, setValidVoucherCode] = useState("");

  const baseWaUrl = `https://wa.me/6281384913190/?text=${encodeURIComponent(
    `Hi Ceria Hari Kita!\nSaya mau tanya tentang\n\n${title}\n\nNama :\n\nTerima kasih`
  )}`;

  const handleCheckVoucher = () => {
    const trimmedCode = voucherCode.trim();

    if (!trimmedCode) {
      setMessage("Silakan masukkan kode voucher terlebih dahulu");
      setIsValid(false);
      setShowMessage(true);
      return;
    }

    const found = voucherData.find((v) => v.code === trimmedCode);

    if (found) {
      setMessage(
        `Voucher "${trimmedCode}" ditemukan! Dapatkan diskon ${found.discount}%`
      );
      setIsValid(true);
      setValidVoucherCode(trimmedCode);
    } else {
      setMessage("Kode voucher tidak ditemukan");
      setIsValid(false);
      setValidVoucherCode("");
    }

    setShowMessage(true);
  };

  const handleBooking = () => {
    const trimmedCode = voucherCode.trim();

    if (!trimmedCode) {
      window.open(baseWaUrl, "_blank");
      return;
    }

    if (trimmedCode && trimmedCode !== validVoucherCode) {
      handleCheckVoucher();
      if (!isValid) return;
    }

    const url =
      isValid && validVoucherCode
        ? `https://wa.me/6281384913190/?text=${encodeURIComponent(
            `Hi Ceria Hari Kita!\nSaya mau tanya tentang\n\n${title}\n\nNama :\nKode Voucher : ${validVoucherCode}\n\nTerima kasih`
          )}`
        : baseWaUrl;

    window.open(url, "_blank");
  };

  return (
    <div className="bg-white mt-4 p-4 rounded-md space-y-4 max-w-sm">
      <div className="text-sm space-y-2">
        <div>
          <label htmlFor="voucher">Punya kode voucher?</label>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            id="voucher"
            className="pl-2 p-1 border rounded-md placeholder:text-gray-400"
            placeholder="Masukkan kode voucher"
            value={voucherCode}
            onChange={(e) => {
              setVoucherCode(e.target.value);
              setShowMessage(false);
              setIsValid(null);
              setValidVoucherCode("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleCheckVoucher();
              }
            }}
          />
          <button
            onClick={handleCheckVoucher}
            className="py-1 px-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md font-medium w-fit ml-auto hover:cursor-pointer"
          >
            Cek Voucher
          </button>
        </div>

        {showMessage && (
          <div
            className={`flex justify-between items-start gap-2 text-sm p-2 rounded-md w-full ${
              isValid
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            <span>{message}</span>
            <button
              className="text-gray-600 hover:text-black text-sm font-semibold hover:cursor-pointer"
              onClick={() => setShowMessage(false)}
            >
              ✕
            </button>
          </div>
        )}
      </div>

      <button
        onClick={handleBooking}
        className="flex items-center gap-x-1 mt-8 py-2 px-4 bg-deep-blue hover:bg-deep-blue/80 text-white rounded-full font-semibold w-fit mx-auto hover:cursor-pointer transition-colors"
      >
        Pesan Sekarang
      </button>
    </div>
  );
}
