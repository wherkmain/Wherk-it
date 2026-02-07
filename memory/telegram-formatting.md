# Telegram Formatting Guide

## Critical Rule
**NEVER use markdown tables in Telegram.** They render as unreadable plain text.

## What Happened
Sent a comparison chart as a markdown table. On Telegram it looked like:
```
| Tool | Cost | GitHub |
|------|------|--------|
| GitHub | Free | Native |
```

Instead of a readable table, it was garbled text.

## The Fix

### For Comparisons/Charts
**Option 1: Bullet Lists** ✅
```
**GitHub Discussions**
• Cost: Free
• GitHub Integration: Native
• Routing: Manual
• Best for: Pre-launch

**Help Scout**
• Cost: $25/user/mo
• GitHub Integration: Strong
• Routing: Auto-tags
• Best for: 10+ tickets/week
```

**Option 2: Generate Image** ✅
Use canvas or screenshot tool to create actual JPEG/PNG charts

### For Data
Use bold labels instead of tables:
❌ Bad:
| Domain | Price |
|--------|-------|
| skowt.app | $12.98 |

✅ Good:
• **skowt.app** — $12.98/yr
• **restockscout.com** — $11.28/yr

## Platform Support

| Platform | Tables | Images | Notes |
|----------|--------|--------|-------|
| Telegram | ❌ No | ✅ Yes | Use bullets or images |
| Discord | ✅ Yes | ✅ Yes | Tables work fine |
| Web | ✅ Yes | ✅ Yes | Tables render properly |
| iMessage | ❌ No | ✅ Yes | Similar to Telegram |

## When to Generate Images

Create JPEG/PNG charts when:
- Comparing 3+ items with multiple attributes
- Showing pricing tiers
- Displaying feature matrices
- Any complex data visualization

Tools to use:
- Canvas (present HTML → screenshot)
- Quick chart generators
- Simple HTML tables → screenshot

## Remember
If it looks like a spreadsheet, don't paste it as text to Telegram. Generate an image instead.
