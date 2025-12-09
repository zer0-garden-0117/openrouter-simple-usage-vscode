const vscode = require("vscode");
const https = require("https");

/**
 * Call https://openrouter.ai/api/v1/key
 * and return the "data" object from your JSON response.
 */
async function fetchKeyInfo(apiKey) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "openrouter.ai",
      path: "/api/v1/key",
      method: "GET",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "User-Agent": "vscode-openrouter-usage"
      }
    };

    const req = https.request(options, res => {
      let data = "";
      res.on("data", chunk => {
        data += chunk;
      });
      res.on("end", () => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          return reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
        try {
          const json = JSON.parse(data);
          if (!json.data) {
            return reject(new Error("Unexpected response format, 'data' field missing"));
          }
          resolve(json.data);
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on("error", err => {
      reject(err);
    });

    req.end();
  });
}

/**
 * Get API key from config or from environment.
 */
function getApiKeyFromConfig() {
  const config = vscode.workspace.getConfiguration("openrouterUsage");
  const fromSetting = config.get("apiKey");

  if (fromSetting && fromSetting.trim() !== "") {
    return fromSetting.trim();
  }

  const fromEnv = process.env.OPENROUTER_API_KEY;
  if (fromEnv && fromEnv.trim() !== "") {
    return fromEnv.trim();
  }

  return null;
}

/**
 * Called when the extension is activated.
 */
function activate(context) {
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  statusBarItem.text = "💵 loading...";
  statusBarItem.tooltip = "OpenRouter usage";
  statusBarItem.command = "openrouterUsage.refresh";
  statusBarItem.show();

  let refreshTimer = null;

  async function refreshUsage(showNotifications) {
    const apiKey = getApiKeyFromConfig();
    if (!apiKey) {
      statusBarItem.text = "💵 no key";
      statusBarItem.tooltip = "Set openrouterUsage.apiKey in settings or OPENROUTER_API_KEY env var";
      if (showNotifications) {
        vscode.window.showWarningMessage(
          "OpenRouter Usage: no API key configured. Set openrouterUsage.apiKey in settings or OPENROUTER_API_KEY env var."
        );
      }
      return;
    }

    statusBarItem.text = "💵 ...";
    statusBarItem.tooltip = "Fetching OpenRouter usage...";

    try {
      const info = await fetchKeyInfo(apiKey);

      const limit = info.limit;                     // 200
      const remaining = info.limit_remaining;       // 195.0116025
      const used = info.usage;                      // 4.9883975
      const remainingPct = limit > 0 ? (remaining / limit) * 100 : null;

      const remainingShort = remaining.toFixed(1);
      const usedShort = used.toFixed(1);

      let emoji = "💵";
      if (remaining <= 20) {
        emoji = "🚨";
      }

      // Status bar text, for example: "💵 195.0/200$"
      statusBarItem.text = `${emoji} ${remainingShort}/${limit}$`;

      let tooltip = "OpenRouter key usage\n";
      tooltip += `Remaining: ${remaining}\n`;
      tooltip += `Used: ${used}\n`;
      tooltip += `Daily: ${info.usage_daily}\n`;
      tooltip += `Weekly: ${info.usage_weekly}\n`;
      tooltip += `Monthly: ${info.usage_monthly}\n`;
      tooltip += `Free tier: ${info.is_free_tier ? "yes" : "no"}\n`;
      if (info.limit_reset) {
        tooltip += `Resets at: ${info.limit_reset}\n`;
      }
      statusBarItem.tooltip = tooltip;

      if (showNotifications) {
        vscode.window.showInformationMessage(
          `OpenRouter remaining: ${remainingShort} / ${limit} (used ${usedShort})`
        );
      }
    } catch (err) {
      statusBarItem.text = "🚨 error";
      statusBarItem.tooltip = String(err.message || err);
      if (showNotifications) {
        vscode.window.showErrorMessage(
          `OpenRouter Usage error: ${err.message || err}`
        );
      }
    }
  }

  // Command to refresh manually
  const refreshCommand = vscode.commands.registerCommand(
    "openrouterUsage.refresh",
    async () => {
      await refreshUsage(true);
    }
  );

  context.subscriptions.push(statusBarItem, refreshCommand);

  function setupAutoRefresh() {
    const config = vscode.workspace.getConfiguration("openrouterUsage");
    const minutes = config.get("refreshIntervalMinutes") || 10;

    if (refreshTimer) {
      clearInterval(refreshTimer);
      refreshTimer = null;
    }

    if (minutes > 0) {
      refreshTimer = setInterval(() => {
        refreshUsage(false);
      }, minutes * 60 * 1000);

      context.subscriptions.push({
        dispose: () => {
          if (refreshTimer) {
            clearInterval(refreshTimer);
          }
        }
      });
    }
  }

  setupAutoRefresh();
  refreshUsage(false);

  // React to config changes
  const configWatcher = vscode.workspace.onDidChangeConfiguration(e => {
    if (e.affectsConfiguration("openrouterUsage")) {
      setupAutoRefresh();
      refreshUsage(false);
    }
  });

  context.subscriptions.push(configWatcher);
}

/**
 * Called when the extension is deactivated.
 */
function deactivate() {}

module.exports = {
  activate,
  deactivate
};
