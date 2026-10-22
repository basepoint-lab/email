import test from "node:test";
import assert from "node:assert/strict";
import * as Layout from "../dist/index.js";

test("@basepoint-lab/layout - Exports all layout primitives and components", () => {
  assert.equal(typeof Layout.Container, "function", "Container must be a function");
  assert.equal(typeof Layout.PageShell, "function", "PageShell must be a function");
  assert.equal(typeof Layout.Header, "function", "Header must be a function");
  assert.equal(typeof Layout.Footer, "function", "Footer must be a function");
  assert.equal(typeof Layout.PageHeading, "function", "PageHeading must be a function");
  assert.equal(typeof Layout.Breadcrumbs, "function", "Breadcrumbs must be a function");
  assert.equal(typeof Layout.SidebarLayout, "function", "SidebarLayout must be a function");
  assert.equal(typeof Layout.Section, "function", "Section must be a function");
  // Components from apps
  assert.equal(typeof Layout.CountdownTimer, "function", "CountdownTimer must be a function");
  assert.equal(typeof Layout.SystemStatusMonitor, "function", "SystemStatusMonitor must be a function");
  assert.equal(typeof Layout.CommunityCard, "function", "CommunityCard must be a function");
  assert.equal(typeof Layout.LogoCloud, "function", "LogoCloud must be a function");
  assert.equal(typeof Layout.PricingSection, "function", "PricingSection must be a function");
  assert.equal(typeof Layout.PricingCard, "function", "PricingCard must be a function");
  assert.equal(typeof Layout.ProcessSteps, "function", "ProcessSteps must be a function");
  assert.equal(typeof Layout.LeadCapture, "function", "LeadCapture must be a function");
  assert.equal(typeof Layout.CtaBanner, "function", "CtaBanner must be a function");
  assert.equal(typeof Layout.TestimonialsSection, "function", "TestimonialsSection must be a function");
  assert.equal(typeof Layout.StatsSection, "function", "StatsSection must be a function");
  assert.equal(typeof Layout.CenteredHeader, "function", "CenteredHeader must be a function");
  assert.equal(typeof Layout.AppHeader, "function", "AppHeader must be a function");
  assert.equal(typeof Layout.MinimalHeader, "function", "MinimalHeader must be a function");
  assert.equal(typeof Layout.AnnouncementBar, "function", "AnnouncementBar must be a function");
  assert.equal(typeof Layout.HeroSection, "function", "HeroSection must be a function");
  assert.equal(typeof Layout.FaqSection, "function", "FaqSection must be a function");
  assert.equal(typeof Layout.AppShell, "function", "AppShell must be a function");
});
