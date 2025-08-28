import Link from "next/link";
import Image from "next/image";
import { Separator } from "./ui/separator";
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  Mail,
  Globe,
  Phone,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-[#e5e7eb] py-12 mt-auto shadow-lg px-10 md:px-20">
      <div className="container-wide mx-auto px-2 sm:px-4">
        {/* Brand Section */}
        <div className="flex flex-col items-center justify-center mb-12">
          <h1 className="flex items-center font-extrabold text-4xl sm:text-4xl md:text-8xl tracking-tight text-black uppercase mb-2">
            <Image
              src="/assets/logo/1x-black.png"
              alt="Eggshell Store Logo"
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain mr-2 md:mr-3"
              width={64}
              height={64}
            />
            Eggshell
          </h1>
          <span
            className="block font-bebas text-lg sm:text-xl md:text-3xl text-gray-500 mt-2 md:mt-4 tracking-tight"
            style={{ letterSpacing: "-0.03em" }}
          >
            Home grown Indian brands
          </span>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-5 md:mb-20">
          <div className="space-y-3">
            <h4 className="font-bold text-lg sm:text-xl text-gray-900 mb-2">
              Shop
            </h4>
            <ul className="space-y-3 text-base">
              <li>
                <Link
                  href="/category/apparel"
                  className="text-gray-500 hover:text-black transition-colors font-medium"
                >
                  Apparel
                </Link>
              </li>
              <li>
                <Link
                  href="/category/footwear"
                  className="text-gray-500 hover:text-black transition-colors font-medium"
                >
                  Footwear
                </Link>
              </li>
              <li>
                <Link
                  href="/category/accessories"
                  className="text-gray-500 hover:text-black transition-colors font-medium"
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link
                  href="/category/jewellery"
                  className="text-gray-500 hover:text-black transition-colors font-medium"
                >
                  Jewellery
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-lg sm:text-xl text-gray-900 mb-2">
              Account
            </h4>
            <ul className="space-y-3 text-base">
              <li>
                <Link
                  href="/profile"
                  className="text-gray-500 hover:text-black transition-colors font-medium"
                >
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/orders"
                  className="text-gray-500 hover:text-black transition-colors font-medium"
                >
                  Order History
                </Link>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  className="text-gray-500 hover:text-black transition-colors font-medium"
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="text-gray-500 hover:text-black transition-colors font-medium"
                >
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-lg sm:text-xl text-gray-900 mb-2">
              Support
            </h4>
            <ul className="space-y-3 text-base">
              <li>
                <Link
                  href="/help"
                  className="text-gray-500 hover:text-black transition-colors font-medium"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-500 hover:text-black transition-colors font-medium"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-500 hover:text-black transition-colors font-medium"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-gray-500 hover:text-black transition-colors font-medium"
                >
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-lg sm:text-xl text-gray-900 mb-6">
              Socials
            </h4>
            <div className="flex flex-col gap-4">
              {/* Social Icons */}
              <div className="flex flex-wrap gap-2">
                <Link
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="rounded-full p-2 transition-colors"
                >
                  <Instagram className="w-6 h-6 text-gray-800" />
                </Link>
                <Link
                  href="https://facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="rounded-full p-2 transition-colors"
                >
                  <Facebook className="w-6 h-6 text-gray-800" />
                </Link>
                <Link
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="rounded-full p-2 transition-colors"
                >
                  <Twitter className="w-6 h-6 text-gray-800" />
                </Link>
                <Link
                  href="https://youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="rounded-full p-2 transition-colors"
                >
                  <Youtube className="w-6 h-6 text-gray-800" />
                </Link>
                <Link
                  href="https://youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="rounded-full p-2 transition-colors"
                ></Link>
              </div>
              {/* Contact Info */}
              <div className="flex flex-col gap-2 mt-4 text-gray-500 text-base">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-gray-800" />
                  <span>
                    <a
                      href="mailto:support@eggshellstore.com"
                      className="hover:text-black transition-colors"
                    >
                      support@eggshellstore.com
                    </a>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gray-800" />
                  <span>
                    <a
                      href="tel:+919876543210"
                      className="hover:text-black transition-colors"
                    >
                      +91 98765 43210
                    </a>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-gray-800" />
                  <span>
                    <a
                      href="https://eggshellstore.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-black transition-colors"
                    >
                      eggshellstore.com
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-10" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-base font-semibold text-gray-500 text-center sm:text-left">
            © 2024 Eggshell Store. All rights reserved.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-base font-medium text-gray-500">
            <Link
              href="/privacy"
              className="hover:text-black transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-black transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
