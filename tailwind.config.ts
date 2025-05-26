import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif'], // Set Poppins as the default sans-serif font
      },
  		colors: {
  			background: 'hsl(var(--background))', // White
  			foreground: 'hsl(var(--foreground))', // Dark Slate Blue for text

  			muted: 'hsl(var(--muted))', // Very Light Cool Grey
  			'muted-foreground': 'hsl(var(--muted-foreground))', // Cool Grey

  			popover: 'hsl(var(--popover))',
  			'popover-foreground': 'hsl(var(--popover-foreground))',

  			card: 'hsl(var(--card))', // White cards
  			'card-foreground': 'hsl(var(--card-foreground))',

  			border: 'hsl(var(--border))', // Light Cool Grey border
  			input: 'hsl(var(--input))', // Same as muted for input background

  			primary: 'hsl(var(--primary))', // Deep Teal
  			'primary-foreground': 'hsl(var(--primary-foreground))', // White

  			secondary: 'hsl(var(--secondary))', // Light Blue-Grey (can be adjusted if needed)
  			'secondary-foreground': 'hsl(var(--secondary-foreground))', // Primary blue text on secondary

  			accent: 'hsl(var(--accent))', // Soft Blue
  			'accent-foreground': 'hsl(var(--accent-foreground))', // Darker blue for text on accent
        
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
