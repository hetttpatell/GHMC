"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import React, { useRef, useState, useEffect } from "react";

export interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

export interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

export interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  activeSection?: string;
  className?: string;
  onItemClick?: (link: string) => void;
}

export interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

export interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Navbar Container
 * rAF-throttled scroll tracking for 60/120fps fluid responsiveness.
 */
export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPos = window.scrollY || document.documentElement.scrollTop;
          setVisible(scrollPos > 60);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-4 sm:top-5 z-50 w-full px-4 sm:px-6 pointer-events-none flex justify-center",
        className,
      )}
    >
      <div className="w-full flex justify-center pointer-events-auto">
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(
                child as React.ReactElement<{ visible?: boolean }>,
                { visible },
              )
            : child,
        )}
      </div>
    </div>
  );
};

/**
 * Desktop NavBody
 * Ample breathing room: max-w-[1040px] when scrolled, max-w-7xl at top.
 * Distinct separation of Company brand, Content links, and Auth cluster.
 */
export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <div
      className={cn(
        "relative z-[60] mx-auto hidden lg:flex flex-row items-center justify-between font-['ario-sans',sans-serif] select-none",
        "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,max-width,padding,background-color,box-shadow]",
        visible
          ? "max-w-[1040px] w-full py-2.5 px-8 rounded-full bg-white/95 backdrop-blur-xl border border-black/[0.08] shadow-[0_14px_36px_-6px_rgba(55,44,95,0.14),0_1px_2px_rgba(0,0,0,0.04)] translate-y-1"
          : "max-w-7xl w-full py-3 px-8 rounded-full bg-white/70 backdrop-blur-md border border-black/[0.05] shadow-[0_2px_14px_rgba(0,0,0,0.03)] translate-y-0",
        className,
      )}
    >
      {children}
    </div>
  );
};

/**
 * NavItems with Active Section Underline
 * Clean, elegant gliding underline (no bulky background highlight).
 */
export const NavItems = ({
  items,
  activeSection = "#hero",
  className,
  onItemClick,
}: NavItemsProps) => {
  return (
    <div
      className={cn(
        "flex flex-row items-center space-x-1 sm:space-x-2 px-3 shrink-0",
        className,
      )}
    >
      {items.map((item, idx) => {
        const isActive = activeSection === item.link;

        return (
          <a
            key={`link-${idx}`}
            href={item.link}
            onClick={() => onItemClick?.(item.link)}
            className={cn(
              "relative px-3.5 py-2 text-[12.5px] font-bold uppercase tracking-[0.05em] font-['ario-sans',sans-serif] transition-colors whitespace-nowrap shrink-0 select-none",
              isActive
                ? "text-[#020202]"
                : "text-[#4a4d55] hover:text-[#020202]",
            )}
          >
            <span className="relative z-10 whitespace-nowrap">{item.name}</span>

            {/* Smooth gliding active underline */}
            {isActive && (
              <motion.div
                layoutId="activeUnderline"
                className="absolute bottom-0.5 left-3 right-3 h-[2px] bg-[#372C5F] rounded-full"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
          </a>
        );
      })}
    </div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <div
      className={cn(
        "relative z-50 mx-auto flex lg:hidden flex-col items-center justify-between font-['ario-sans',sans-serif] select-none",
        "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,width,padding]",
        visible
          ? "w-[calc(100%-1rem)] py-2 px-4 rounded-full bg-white/95 backdrop-blur-xl border border-black/[0.08] shadow-[0_10px_28px_-6px_rgba(55,44,95,0.14)] translate-y-1"
          : "w-full py-2.5 px-4 rounded-full bg-white/80 backdrop-blur-md border border-black/[0.05] shadow-sm translate-y-0",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] lg:hidden"
          />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={cn(
              "absolute inset-x-0 top-14 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-2xl bg-white px-5 py-6 shadow-[0_16px_40px_rgba(55,_44,_95,_0.14)] border border-[#372C5F]/10",
              className,
            )}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Toggle navigation menu"
      className="p-1.5 rounded-full hover:bg-black/5 transition-colors cursor-pointer text-[#020202]"
    >
      {isOpen ? (
        <IconX className="w-5 h-5 text-[#372C5F]" />
      ) : (
        <IconMenu2 className="w-5 h-5 text-[#020202]" />
      )}
    </button>
  );
};

/**
 * Editorial GHMC Wordmark
 * Prominent, distinct company branding with dedicated breathing space.
 */
export const NavbarLogo = () => {
  return (
    <a
      href="#hero"
      className="relative z-20 flex items-center pr-6 select-none group shrink-0"
    >
      <span className="font-['ario-sans',sans-serif] font-black text-[21px] tracking-[-0.04em] uppercase text-[#020202] leading-none hover:text-[#372C5F] transition-colors whitespace-nowrap">
        GHMC
      </span>
    </a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "button",
  children,
  className,
  variant = "primary",
  onClick,
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
  onClick?: (e: React.MouseEvent) => void;
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-5 py-2 rounded-full font-['ario-sans',sans-serif] text-[12.5px] font-bold uppercase tracking-[0.05em] relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-flex items-center justify-center text-center select-none active:scale-[0.98] whitespace-nowrap shrink-0";

  const variantStyles = {
    primary:
      "bg-[#372C5F] text-white shadow-[0_3px_12px_rgba(55,44,95,0.22)] hover:bg-[#2c224c] hover:shadow-[0_5px_18px_rgba(55,44,95,0.3)]",
    secondary:
      "bg-transparent text-[#020202] hover:text-[#372C5F] hover:bg-black/[0.04] shadow-none",
    dark:
      "bg-[#020202] text-white shadow-[0_3px_12px_rgba(0,0,0,0.18)] hover:bg-black/90",
    gradient:
      "bg-gradient-to-r from-[#372C5F] to-[#513f8c] text-white shadow-[0_3px_12px_rgba(55,44,95,0.22)] hover:opacity-95",
  };

  const Component = href ? "a" : Tag;

  return (
    <Component
      href={href || undefined}
      onClick={onClick}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
};
