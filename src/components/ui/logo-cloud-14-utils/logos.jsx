import React from "react";

/**
 * Authentic brand logos formatted for light-theme backgrounds:
 * 1. Ahrefs (Orange 'a' + Blue 'hrefs')
 * 2. Turso (Dark horned bull mark + 'TURSO')
 * 3. Roblox (Dark 'ROBLOX' with tilted square O)
 * 4. Hulu (Signature green 'hulu')
 * 5. Suno (Dark wave mark + 'Suno')
 * 6. Soldera (Dark swirl mark + 'Soldera')
 * 7. Mintlify (Emerald green leaf mark + dark 'mintlify')
 * 8. Clerk (Purple C bracket mark + dark 'clerk')
 */

export const Logo01 = ({ className = "h-7 sm:h-8", ...props }) => (
  <svg viewBox="0 0 115 32" fill="none" className={className} {...props}>
    <text
      x="2"
      y="24"
      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      fontWeight="900"
      fontSize="27"
      letterSpacing="-0.04em"
    >
      <tspan fill="#FF5A1F">a</tspan>
      <tspan fill="#2F68FF">hrefs</tspan>
    </text>
  </svg>
);

export const Logo02 = ({ className = "h-7 sm:h-8", ...props }) => (
  <svg viewBox="0 0 115 32" fill="none" className={className} {...props}>
    <g transform="translate(0, 4)">
      <path
        d="M2 3c3-3 7-3 9 0l-2.5 3c-1.5-1.5-3.5-1.5-4.5 0L2 3zM26 3c-3-3-7-3-9 0l2.5 3c1.5-1.5 3.5-1.5 4.5 0L26 3z"
        fill="#12101E"
      />
      <path
        d="M4 6h20c0 0 .5 3-1 6-1.5 3-4 6-9 8-5-2-7.5-5-9-8-1.5-3-1-6-1-6z"
        fill="#12101E"
      />
      <circle cx="9.5" cy="11.5" r="1.8" fill="#FFFFFF" />
      <circle cx="18.5" cy="11.5" r="1.8" fill="#FFFFFF" />
      <rect x="12" y="10" width="4" height="6" rx="1" fill="#FFFFFF" />
    </g>
    <text
      x="33"
      y="22"
      fill="#12101E"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="900"
      fontSize="17"
      letterSpacing="0.04em"
    >
      TURSO
    </text>
  </svg>
);

export const Logo03 = ({ className = "h-7 sm:h-8", ...props }) => (
  <svg viewBox="0 0 115 32" fill="none" className={className} {...props}>
    {/* R */}
    <path
      d="M5 6h8c3 0 5 1.5 5 4.2 0 2-1 3.4-2.8 3.9l3.8 9.9h-4.5l-3.3-8.8H9.2V24H5V6zm4.2 3.6v4.6h3.6c1.6 0 2.6-.7 2.6-2.3s-1-2.3-2.6-2.3H9.2z"
      fill="#12101E"
    />
    {/* Tilted square O */}
    <g transform="translate(20.5, 6)">
      <polygon points="3.5,1 17.5,4.5 14.5,18.5 0.5,15" fill="#12101E" />
      <polygon points="7,6.5 13,8 11.5,14 5.5,12.5" fill="#FFFFFF" />
    </g>
    {/* B */}
    <path
      d="M41 6h7.5c2.4 0 4 1.2 4 3 0 1.2-.7 2.2-1.9 2.6 1.6.4 2.5 1.6 2.5 3.2 0 2.2-1.8 3.2-4.5 3.2H41V6zm4.2 3.3v3h3.2c1.1 0 1.9-.4 1.9-1.5s-.8-1.5-1.9-1.5h-3.2zm0 5.4V18h3.5c1.2 0 2.1-.4 2.1-1.7 0-1.2-.9-1.6-2.1-1.6h-3.5z"
      fill="#12101E"
    />
    {/* L */}
    <path d="M58 6h4.2v14.4H69V24H58V6z" fill="#12101E" />
    {/* O */}
    <path
      d="M79 5.5c5.3 0 9.2 4 9.2 9.5s-3.9 9.5-9.2 9.5-9.2-4-9.2-9.5 3.9-9.5 9.2-9.5zm0 3.8c-3.1 0-5 2.4-5 5.7s1.9 5.7 5 5.7 5-2.4 5-5.7-1.9-5.7-5-5.7z"
      fill="#12101E"
    />
    {/* X */}
    <path
      d="M91 6h4.6l4.2 6.8 4.2-6.8h4.6l-6.5 9.8 6.8 8.2h-4.8l-4.3-5.7-4.3 5.7H91l6.8-8.2L91 6z"
      fill="#12101E"
    />
  </svg>
);

export const Logo04 = ({ className = "h-7 sm:h-8", ...props }) => (
  <svg viewBox="0 0 95 32" fill="none" className={className} {...props}>
    <path
      d="M8 3v10.5c0 1.8 1.1 2.8 2.6 2.8 1.5 0 2.6-1 2.6-2.8V3h5.2v10.8c0 4.6-2.9 7-7.6 7-2.3 0-4.3-.8-5.6-2.4L5 20.5H2.4V3H8zm19.5 17.8c-4.7 0-7.6-2.4-7.6-7V3h5.2v10.5c0 1.8 1.1 2.8 2.6 2.8 1.5 0 2.6-1 2.6-2.8V3h5.2v10.8c0 4.6-2.9 7-7.6 7zm16.5-17.8h5.2v17.5H44V3zm19.5 17.8c-4.7 0-7.6-2.4-7.6-7V3h5.2v10.5c0 1.8 1.1 2.8 2.6 2.8 1.5 0 2.6-1 2.6-2.8V3h5.2v10.8c0 4.6-2.9 7-7.6 7z"
      fill="#00B859"
    />
  </svg>
);

export const Logo05 = ({ className = "h-7 sm:h-8", ...props }) => (
  <svg viewBox="0 0 100 32" fill="none" className={className} {...props}>
    <g transform="translate(4, 5)">
      <path
        d="M13 1.5c-3 0-5.5 2.5-5.5 5.5 0 2.2 1.3 4 3.2 4.8l.5.2c2.2.9 3 1.8 3 3 0 1.8-1.5 3-3.5 3-2.2 0-3.8-1.2-4.4-2.8L2 17c1.3 3.2 4.4 5 8.2 5 4.8 0 8.2-3.2 8.2-7.5 0-3.5-2.2-5.5-5.2-6.6l-.6-.2c-1.8-.7-2.4-1.4-2.4-2.4 0-1.5 1.2-2.5 2.8-2.5 1.7 0 3 1 3.6 2.2l4-2.5C19.8 3.5 17 1.5 13 1.5z"
        fill="#12101E"
      />
    </g>
    <text
      x="33"
      y="22"
      fill="#12101E"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="700"
      fontSize="21"
      letterSpacing="-0.02em"
    >
      Suno
    </text>
  </svg>
);

export const Logo06 = ({ className = "h-7 sm:h-8", ...props }) => (
  <svg viewBox="0 0 115 32" fill="none" className={className} {...props}>
    <g transform="translate(2, 5)" fill="#12101E">
      <path d="M11 2c2 2 2 5 0 7s-5 2-7 0 0-5 2-7 3-2 5 0z" transform="rotate(0 11 11)" />
      <path d="M11 2c2 2 2 5 0 7s-5 2-7 0 0-5 2-7 3-2 5 0z" transform="rotate(72 11 11)" />
      <path d="M11 2c2 2 2 5 0 7s-5 2-7 0 0-5 2-7 3-2 5 0z" transform="rotate(144 11 11)" />
      <path d="M11 2c2 2 2 5 0 7s-5 2-7 0 0-5 2-7 3-2 5 0z" transform="rotate(216 11 11)" />
      <path d="M11 2c2 2 2 5 0 7s-5 2-7 0 0-5 2-7 3-2 5 0z" transform="rotate(288 11 11)" />
    </g>
    <text
      x="31"
      y="22"
      fill="#12101E"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="700"
      fontSize="20"
      letterSpacing="-0.01em"
    >
      Soldera
    </text>
  </svg>
);

export const Logo07 = ({ className = "h-7 sm:h-8", ...props }) => (
  <svg viewBox="0 0 115 32" fill="none" className={className} {...props}>
    <g transform="translate(3, 5)">
      <path
        d="M12 2C6.5 2 2 6.5 2 12c0 4.2 2.6 7.8 6.4 9.2 1-3.2 3.2-5.4 6.4-6.4-2.2-2.2-3.2-4.8-3.2-7.5 0-3 2.3-5.3 5.3-5.3.6 0 1.2.1 1.7.4C17.2 3.1 14.7 2 12 2z"
        fill="#10B981"
      />
      <circle cx="16" cy="14" r="5" fill="#34D399" opacity="0.9" />
    </g>
    <text
      x="31"
      y="22"
      fill="#12101E"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="700"
      fontSize="20"
      letterSpacing="-0.03em"
    >
      mintlify
    </text>
  </svg>
);

export const Logo08 = ({ className = "h-7 sm:h-8", ...props }) => (
  <svg viewBox="0 0 100 32" fill="none" className={className} {...props}>
    <g transform="translate(3, 5)">
      <path
        d="M11 1C5 1 0 6 0 12s5 11 11 11c4.5 0 8.3-2.7 10-6.7h-5c-1.1 2-3 3.3-5 3.3-3.8 0-7-3.2-7-7.6s3.2-7.6 7-7.6c2 0 3.9 1.3 5 3.3h5C19.3 3.7 15.5 1 11 1z"
        fill="#7C3AED"
      />
      <circle cx="11" cy="12" r="3.2" fill="#9333EA" />
    </g>
    <text
      x="31"
      y="22"
      fill="#12101E"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="700"
      fontSize="21"
      letterSpacing="-0.02em"
    >
      clerk
    </text>
  </svg>
);
