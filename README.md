# 💵 OpenRouter Simple Usage

> A minimal VS Code extension to keep track of your OpenRouter API credits in the status bar.

![VS Code](https://img.shields.io/badge/VS%20Code-^1.90.0-blue?logo=visualstudiocode)
![License](https://img.shields.io/badge/license-MIT-green)

## 📝 About

This extension is a **fork** of [openrouter-usage-vscode](https://github.com/flol3622/openrouter-usage-vscode) by [Philippe Soubrier](https://github.com/flol3622).

While the original was already streamlined, this version pushes simplicity even further — showing nothing but the essential credit information you need at a glance.

## ✨ Features

- **💵 Real-time balance** — See your remaining OpenRouter credits in the status bar
- **🚨 Low balance alert** — Status bar shows warning emoji when credits drop below $10
- **🔄 Auto-refresh** — Automatically updates your balance (configurable interval)
- **⚡ Manual refresh** — Click the status bar or run the command to refresh instantly


## 📸 Preview

| Status | Display |
|--------|---------|
| Normal | `💵 195.0/200$` |
| Low balance (≤$10) | `🚨 9.0/200$` |
| Loading | `💵 loading...` |
| Fetching | `💵 ...` |
| No API key | `💵 no key` |
| Error | `🚨 error` |


## 🚀 Getting Started

### 1. Install the Extension

Install from the VS Code Marketplace or load it manually.

### 2. Configure Your API Key

You have two options:

**Option A: VS Code Settings**
1. Open Settings (`Ctrl+,` / `Cmd+,`)
2. Search for `openrouterSimpleUsage.apiKey`
3. Enter your OpenRouter API key (`sk-or-v1-...`)

**Option B: Environment Variable**
```bash
export OPENROUTER_SIMPLE_USAGE_API_KEY="sk-or-v1-your-key-here"
```


## ⚙️ Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| `openrouterSimpleUsage.apiKey` | `""` | Your OpenRouter API key |
| `openrouterSimpleUsage.refreshIntervalMinutes` | `10` | Auto-refresh interval in minutes (0 to disable) |


## 📋 Commands

| Command | Description |
|---------|-------------|
| `OpenRouter Simple Usage: Refresh` | Manually refresh your usage stats |

> 💡 **Tip:** Click the status bar item to quickly refresh!


## 🔒 Security Note

Your API key is stored in VS Code's settings (plain text). For better security, consider using the `OPENROUTER_SIMPLE_USAGE_API_KEY` environment variable instead.

## 🙏 Acknowledgments

- Original extension: [openrouter-usage-vscode](https://github.com/flol3622/openrouter-usage-vscode) by [Philippe Soubrier](https://github.com/flol3622)


## 📊 Tooltip Details

Hover over the status bar item to see detailed usage info:

- Total credits
- Total used
- Remaining credits


## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.


## 📄 License

MIT © Philippe Soubrier (original author)
MIT © zer0 (modifications)

---

<p align="center">
  Made with ❤️ for the OpenRouter community
</p>
