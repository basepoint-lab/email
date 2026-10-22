# `@basepoint-lab/ui`

> Standardized UI component library (Buttons, Badges, Cards, Modals, Inputs, Tabs, Selects, Avatars) for the **Basepoint** ecosystem.

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

Then install the package along with peer dependencies:

```bash
npm install @basepoint-lab/ui @basepoint-lab/tokens lucide-react
```

---

## 🚀 Usage

### 1. Button

```tsx
import { Button } from '@basepoint-lab/ui';
import { ArrowRight } from 'lucide-react';

export function ActionExample() {
  return (
    <div className="flex gap-3">
      <Button variant="pine" size="md">
        Explore Sprints
      </Button>
      <Button variant="citron" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
        Launch Studio
      </Button>
      <Button variant="outline" size="sm">
        Documentation
      </Button>
    </div>
  );
}
```

### 2. Badge & Status Indicators

```tsx
import { Badge } from '@basepoint-lab/ui';

export function StatusExample() {
  return (
    <div className="flex gap-2">
      <Badge variant="live" pulse>LIVE</Badge>
      <Badge variant="pine">v1.0.0</Badge>
      <Badge variant="learn">01 · LEARN</Badge>
      <Badge variant="build">02 · BUILD</Badge>
      <Badge variant="kbd">⌘K</Badge>
    </div>
  );
}
```

### 3. Cards & Metrics

```tsx
import { Card, CardTitle, CardDescription, MetricCard, RealmCard } from '@basepoint-lab/ui';
import { Rocket } from 'lucide-react';

export function DashboardOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <MetricCard
        label="Active Sprints"
        value="12"
        change="+22%"
        isPositive
        subtext="4 ready to deploy"
      />
      <RealmCard
        number="02"
        subtitle="VENTURE STUDIO"
        title="BIAB Sprints"
        description="Ship enterprise-grade software products in rapid sprints."
        href="/build"
        icon={<Rocket className="w-4 h-4" />}
      />
    </div>
  );
}
```

### 4. Search & Inputs

```tsx
import { SearchInput, Input, Select, Checkbox } from '@basepoint-lab/ui';

export function FilterControls() {
  return (
    <div className="space-y-4">
      <SearchInput shortcut="⌘K" placeholder="Search Basepoint ecosystem..." />
      <Input label="Workspace Name" placeholder="e.g. basepoint_hq" />
      <Select
        label="Role"
        options={[
          { value: 'admin', label: 'Super Admin' },
          { value: 'member', label: 'Workspace Member' },
        ]}
      />
      <Checkbox label="Enable SSO auto-redirect" defaultChecked />
    </div>
  );
}
```

---

## 🏛️ Components Catalog

| Component | Export | Variants / Key Props |
| :--- | :--- | :--- |
| **Button** | `Button` | `pine`, `citron`, `spring`, `outline`, `ghost` / `sm`, `md`, `lg` / `isLoading` |
| **Badge** | `Badge` | `pine`, `citron`, `spring`, `subtle`, `outline`, `live`, `kbd`, `learn`, `build`, `launch`, `operations` |
| **Card** | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` | Modular surface container with hover lift |
| **MetricCard** | `MetricCard` | Statistical KPI card with change metric and icon |
| **RealmCard** | `RealmCard` | Ecosystem navigation card with number and link |
| **Input** | `Input`, `SearchInput`, `Textarea` | Label, error state, helper text, left/right accessories |
| **Select** | `Select` | Styled select dropdown with chevron icon and option contracts |
| **Checkbox** | `Checkbox` | Custom checkmark container with label and helper text |
| **Tabs** | `Tabs` | `pills` (segmented) and `underline` architectural modes |
| **Modal** | `Modal` | Accessible dialog with backdrop and Escape key listener |
| **Avatar** | `Avatar`, `AvatarGroup` | Monogram initials, image avatar, status pulse dot |
| **ProgressBar**| `ProgressBar` | Pine/lime linear bar with percentage and labels |
| **EmptyState** | `EmptyState` | Empty container with icon, title, description, and action CTA |
| **LanguageSwitcher** | `LanguageSwitcher` | Tactile language toggle button group with globe icon |
| **AccountSwitcher** | `AccountSwitcher` | Tenant/workspace account selector dropdown with root indicators |
| **ToolCard** | `ToolCard` | Ecosystem tool dispatcher card with category badge and role lock |
| **Accordion** | `Accordion` | Accessible expandable disclosure list for FAQs and nested settings |
| **StarRating** | `StarRating` | 5-star rating display with score label and size variants |
| **AuthCard** | `AuthCard` | Standardized authentication container with SSO badge and alert messages |
| **TestimonialCard** | `TestimonialCard` | Founder review card with quote, rating stars, avatar, and impact metric |

---

## 📄 License

MIT © Basepoint Engineering
