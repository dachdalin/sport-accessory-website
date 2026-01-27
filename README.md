# Sport Accessory Website

This is a web application for a Sport Accessory Website, built with Next.js and TypeScript.

## Project Structure

The project structure is as follows:

```
/var/www/html/sport-accessory-website/
├───.gitignore
├───components.json
├───next.config.mjs
├───package.json
├───pnpm-lock.yaml
├───postcss.config.mjs
├───tsconfig.json
├───.git/...
├───app/
│   ├───globals.css
│   ├───layout.tsx
│   ├───page.tsx
│   ├───about/
│   │   └───page.tsx
│   ├───cart/
│   │   └───page.tsx
│   ├───checkout/
│   │   └───page.tsx
│   ├───contact/
│   │   └───page.tsx
│   ├───order-success/
│   │   └───page.tsx
│   ├───product/
│   │   └───[id]/
│   │       ├───page.tsx
│   │       └───product-page-client.tsx
│   └───shop/
│       ├───loading.tsx
│       └───page.tsx
├───components/
│   ├───footer.tsx
│   ├───header.tsx
│   ├───product-card.tsx
│   ├───theme-provider.tsx
│   ├───home/
│   │   ├───categories-section.tsx
│   │   ├───featured-products.tsx
│   │   ├───features-section.tsx
│   │   ├───hero-section.tsx
│   │   └───testimonials-section.tsx
│   └───ui/
│       ├───... (various UI components)
├───hooks/
│   ├───use-mobile.ts
│   └───use-toast.ts
├───lib/
│   ├───cart-context.tsx
│   ├───products.ts
│   └───utils.ts
├───node_modules/...
├───public/
│   ├───... (images and static assets)
└───styles/
    └───globals.css
```

## Technologies Used

*   **Framework:** [Next.js](https://nextjs.org/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [Radix UI](https://www.radix-ui.com/)
*   **Package Manager:** [pnpm](https://pnpm.io/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/installation) installed on your machine.

### Installation

1.  Clone the repo
    ```sh
    git clone https://example.com/sport-accessory-website.git
    ```
2.  Install PNPM packages
    ```sh
    pnpm install
    ```

### Running the Application

To run the application in development mode, use the following command:

```sh
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building the Application

To build the application for production, use the following command:

```sh
pnpm build
```
