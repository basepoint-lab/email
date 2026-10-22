# `@basepoint-lab/layout`

> Structural layout primitives, responsive containers, page shells, navigation headers, footers, and composite blocks for the **Basepoint** ecosystem.

[![Registry](https://img.shields.io/badge/registry-GitHub%20Packages-blue.svg)](https://npm.pkg.github.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-green.svg)](https://www.typescriptlang.org/)

---

## 📦 Installation

Ensure your project has an `.npmrc` configured for the `@basepoint-lab` scope:

```ini
# .npmrc
@basepoint-lab:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Then install the layout package alongside tokens and UI primitives:

```bash
npm install @basepoint-lab/layout @basepoint-lab/ui @basepoint-lab/tokens lucide-react
```

---

## 🚀 Usage

### 1. Full Page Architecture (`PageShell`, `Header`, `Footer`)

```tsx
import { PageShell, Header, Footer, Container, PageHeading } from '@basepoint-lab/layout';
import { Button } from '@basepoint-lab/ui';

export default function AppPage() {
  return (
    <PageShell
      grid="pine"
      header={
        <Header
          navItems={[
            { label: 'Academy', href: '/learn' },
            { label: 'Studio', href: '/build', active: true },
            { label: 'Ventures', href: '/launch' },
          ]}
          actions={<Button size="sm" variant="citron">Launch Console</Button>}
        />
      }
      footer={<Footer />}
    >
      <Container size="xl" className="py-10">
        <PageHeading
          badge="02 · VENTURE STUDIO"
          title="BIAB Sprints"
          description="Accelerate your product delivery cycles with battle-tested architectures."
          actions={<Button variant="pine">New Sprint</Button>}
        />
        {/* Content Blocks */}
      </Container>
    </PageShell>
  );
}
```

### 2. Dashboard Shell (`SidebarLayout`)

```tsx
import { SidebarLayout } from '@basepoint-lab/layout';

export function DashboardExample() {
  return (
    <SidebarLayout
      sidebar={
        <div className="p-4 space-y-4">
          <div className="font-black text-xl text-[#003c2d]">
            basepoint<span className="text-[#BCF63C]">.</span>
          </div>
          {/* Navigation links */}
        </div>
      }
    >
      <h1 className="text-2xl font-bold">Workspace Overview</h1>
    </SidebarLayout>
  );
}
```

### 3. Content Sections (`Section`)

```tsx
import { Section } from '@basepoint-lab/layout';
import { Button } from '@basepoint-lab/ui';

export function LandingSection() {
  return (
    <Section
      badge="01 · LEARN"
      title="Architecture & Automation"
      subtitle="Hands-on blueprints and workshops tailored for founders and engineers."
      background="white"
      withGrid
      actions={<Button variant="outline">Browse Catalog</Button>}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Course Cards */}
      </div>
    </Section>
  );
}
```

---

## 🏛️ Components Catalog

| Component | Export | Purpose |
| :--- | :--- | :--- |
| **`Container`** | `Container` | Responsive max-width container (`sm`, `md`, `lg`, `xl`, `2xl`, `full`) with gutter padding |
| **`PageShell`** | `PageShell` | Full-height application shell with warm canvas and grid background support (`pine`, `dark`) |
| **`Header`** | `Header` | Sticky navigation header with canonical `basepoint.` logo, links, and mobile drawer |
| **`Footer`** | `Footer` | Ecosystem footer with pillar links, `b.` monogram, and legal copyright |
| **`PageHeading`** | `PageHeading` | Standardized masthead with mono category pill, display title, and action controls |
| **`Breadcrumbs`**| `Breadcrumbs` | Accessible navigational breadcrumbs with separators |
| **`SidebarLayout`**| `SidebarLayout` | Responsive desktop sidebar + mobile drawer layout for admin and portal apps |
| **`Section`** | `Section` | Reusable section block with header, category pill, subtitle, and responsive container |
| **`CountdownTimer`** | `CountdownTimer` | Event / launch countdown grid with day/hour/min/sec cards and progress bar |
| **`SystemStatusMonitor`**| `SystemStatusMonitor` | Dark-mode terminal service health monitor block with module latency & SLA |
| **`CommunityCard`** | `CommunityCard` | WhatsApp / VIP ecosystem community callout card with member chips |
| **`LogoCloud`** | `LogoCloud` | Partner / alliance logo grid with interactive hover preview tooltips |
| **`PricingSection`** | `PricingSection`, `PricingCard` | Multi-tier membership & pricing plan table with feature checklist and CTA |
| **`ProcessSteps`** | `ProcessSteps` | Numbered workflow progression cards (01 -> 02 -> 03) for roadmaps & onboarding |
| **`LeadCapture`** | `LeadCapture` | Dark-mode newsletter & deal-flow dispatch conversion block with audience roles |
| **`CtaBanner`** | `CtaBanner` | High-impact call-to-action banner with glowing ambience, trust stats, and dual buttons |
| **`TestimonialsSection`** | `TestimonialsSection` | Trustpilot-rated founder reviews grid with client avatars and performance metrics |
| **`StatsSection`** | `StatsSection` | High-authority key metrics grid with narrative box and enterprise guarantees |

---

## 📄 License

MIT © Basepoint Engineering
