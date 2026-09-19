import React from "react";
import { ArrowUpRight } from "lucide-react";
import {
  Logo01,
  Logo02,
  Logo03,
  Logo04,
  Logo05,
  Logo06,
  Logo07,
  Logo08,
} from "@/components/ui/logo-cloud-14-utils/logos";
import { Button } from "@/components/ui/button";

const logos = [
  Logo01,
  Logo02,
  Logo03,
  Logo04,
  Logo05,
  Logo06,
  Logo07,
  Logo08,
  Logo01,
];

const LogoCloud = () => {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto grid max-w-5xl grid-cols-3 gap-2 sm:gap-3.5 md:gap-4 md:grid-cols-4">
        {/* Featured Card */}
        <div
          className="col-span-3 md:col-span-1 md:row-span-3 flex flex-col rounded-2xl p-5 sm:p-7 justify-between"
          style={{
            background:
              'linear-gradient(145deg, rgba(255, 255, 255, 0.94) 0%, rgba(246, 244, 251, 0.84) 100%)',
            border: '1px solid rgba(55, 44, 95, 0.14)',
            boxShadow:
              '0 8px 30px -4px rgba(55, 44, 95, 0.07), inset 0 1px 0 0 rgba(255, 255, 255, 1)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <p className="font-['ario-sans',sans-serif] mb-6 sm:mb-8 max-w-[22ch] text-balance font-black uppercase text-xl sm:text-2xl tracking-[-0.03em] leading-[1.14] text-[#020202]">
            Trusted by teams and companies around the world
          </p>

          <Button
            className="mt-auto w-full sm:w-auto self-start bg-[#372C5F] hover:bg-[#372C5F]/90 text-white font-['ario-sans',sans-serif] font-bold uppercase tracking-[0.09em] text-xs px-5 py-3 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
            size="lg"
            asChild
          >
            <a href="#contact" className="inline-flex items-center justify-center gap-2">
              View companies <ArrowUpRight className="w-4 h-4" />
            </a>
          </Button>
        </div>

        {/* 9 Original Logo Tiles (3 in a row on mobile, 3 in a row across 3 rows on md+) */}
        {logos.map((Logo, index) => (
          <div
            className="col-span-1 group flex w-full items-center justify-center rounded-xl px-2 py-4 sm:px-3 sm:py-6 md:py-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#372C5F]/35 hover:shadow-[0_10px_24px_-2px_rgba(55,44,95,0.1)]"
            style={{
              background:
                'linear-gradient(135deg, rgba(255, 255, 255, 0.90) 0%, rgba(248, 246, 252, 0.70) 100%)',
              border: '1px solid rgba(55, 44, 95, 0.10)',
              boxShadow:
                '0 2px 10px rgba(55, 44, 95, 0.03), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
            }}
            key={index}
          >
            <div className="transition-transform duration-300 group-hover:scale-105 flex items-center justify-center w-full max-w-[85%] sm:max-w-none">
              <Logo className="h-5 sm:h-6 md:h-8 w-auto max-w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoCloud;
