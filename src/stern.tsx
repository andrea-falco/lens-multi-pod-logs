export interface SternFlags {
  allNamespaces?: boolean; // If present, tail across all namespaces. A specific namespace is ignored even if specified with --namespace.
  color?: string; // Force set color output. 'auto':  colorize if tty attached, 'always': always colorize, 'never': never colorize. (default "auto")
  completion?: string; // Output stern command-line completion code for the specified shell. Can be 'bash', 'zsh' or 'fish'.
  config?: string; // Path to the stern config file (default "~/.config/stern/config.yaml")
  container?: string; // Container name when multiple containers in pod. (regular expression) (default ".*")
  containerColors?: number[]; // Specifies the colors used to highlight container names. Use the same format as --pod-colors. Defaults to the values of --pod-colors if omitted, and must match its length.
  containerState?: string[]; // Tail containers with state in running, waiting or terminated. To specify multiple states, repeat this or set comma-separated value. (default [running])
  context?: string; // Kubernetes context to use. Default to current context configured in kubeconfig.
  diffContainer?: boolean; // Display different colors for different containers.
  ephemeralContainers?: boolean; // Include or exclude ephemeral containers. (default true)
  exclude?: string; // Log lines to exclude. (regular expression)
  excludeContainer?: string; // Container name to exclude when multiple containers in pod. (regular expression)
  excludePod?: string; // Pod name to exclude. (regular expression)
  fieldSelector?: string; // Selector (field query) to filter on. If present, default to ".*" for the pod-query.
  // help?: boolean; // help for stern
  highlight?: string; // Log lines to highlight. (regular expression)
  include?: string; // Log lines to include. (regular expression)
  initContainers?: boolean; // Include or exclude init containers. (default true)
  kubeconfig?: string; // Path to kubeconfig file to use. Default to KUBECONFIG variable then ~/.kube/config path.
  maxLogRequests?: number; // Maximum number of concurrent logs to request. Defaults to 50, but 5 when specifying --no-follow (default -1)
  namespace?: string[]; // Kubernetes namespace to use. Default to namespace configured in kubernetes context. To specify multiple namespaces, repeat this or set comma-separated value.
  noFollow?: boolean; // Exit when all logs have been shown.
  node?: string; // Node name to filter on
  onlyLogLines?: boolean; // Print only log lines
  output?: string; // Specify predefined template. Currently support: [default, raw, json, extjson, ppextjson] (default "default")
  podColors?: number[]; // Specifies the colors used to highlight pod names. Provide colors as a comma-separated list using SGR (Select Graphic Rendition) sequences, e.g., "91,92,93,94,95,96".
  prompt?: boolean; // Toggle interactive prompt for selecting 'app.kubernetes.io/instance' label values.
  selector?: string; // Selector (label query) to filter on. If present, default to ".*" for the pod-query.
  // showHiddenOptions?: boolean; // Print a list of hidden options.
  since?: string; // Return logs newer than a relative duration like 5s, 2m, or 3h. (default 48h0m0s)
  // stdin?: boolean; // Parse logs from stdin. All Kubernetes related flags are ignored when it is set.
  tail?: number; // The number of lines from the end of the logs to show. Defaults to -1, showing all logs. (default -1)
  template?: string; // Template to use for log lines, leave empty to use --output flag.
  templateFile?: string; // Path to template to use for log lines, leave empty to use --output flag. It overrides --template option.
  timestamps?: string; // Print timestamps with the specified format. One of 'default' or 'short' in the form '--timestamps=format' ('=' cannot be omitted). If specified but without value, 'default' is used.
  timezone?: string; // Set timestamps to specific timezone. (default "Local")
  verbosity?: number; // Number of the log level verbosity
  // version?: boolean; // Print the version and exit.
}

export interface SternOptions {
  krew?: boolean; // True if stern was installed with Krew plugin manager
}

export class SternCmd {
  public static generateCmd(
    query: string,
    flags?: SternFlags,
    options?: SternOptions
  ): string {
    let prefix = "stern";

    if (options != null) {
      if (options.krew) {
        prefix = "kubectl stern";
      }
    }

    const cmdParts = [prefix, query];

    if (flags != null) {
      if (flags.allNamespaces) {
        cmdParts.push("--all-namespaces");
      }
      if (flags.color) {
        const color = flags.color;
        if (color === "auto" || color === "always" || color === "never") {
          cmdParts.push("--color", color);
        }
      }
      if (flags.config) {
        cmdParts.push("--config", `"${flags.config}"`);
      }
      if (flags.completion) {
        const completion = flags.completion;
        if (
          completion === "bash" ||
          completion === "zsh" ||
          completion === "fish"
        ) {
          cmdParts.push("--completion", completion);
        }
      }
      if (flags.container) {
        cmdParts.push("--container", `"${flags.container}"`);
      }
      if (flags.containerColors && flags.containerColors.length > 0) {
        cmdParts.push("--container-state", flags.containerColors.join(","));
      }
      if (flags.containerState && flags.containerState.length > 0) {
        const containerState = flags.containerState.filter((s) =>
          ["running", "waiting", "terminated", "all"].includes(s)
        );
        if (containerState.length > 0) {
          cmdParts.push("--container-state", containerState.join(","));
        }
      }
      if (flags.context) {
        cmdParts.push("--context", flags.context);
      }
      if (flags.diffContainer) {
        cmdParts.push("--diff-container");
      }
      if (flags.ephemeralContainers) {
        cmdParts.push("--ephemeral-containers");
      }
      if (flags.exclude) {
        cmdParts.push("--exclude", `"${flags.exclude}"`);
      }
      if (flags.excludeContainer) {
        cmdParts.push("--exclude-container", `"${flags.excludeContainer}"`);
      }
      if (flags.excludePod) {
        cmdParts.push("--exclude-pod", `"${flags.excludePod}"`);
      }
      if (flags.fieldSelector) {
        cmdParts.push("--field-selector", `"${flags.fieldSelector}"`);
      }
      if (flags.highlight) {
        cmdParts.push("--highlight", `"${flags.highlight}"`);
      }
      if (flags.include) {
        cmdParts.push("--include", `"${flags.include}"`);
      }
      if (flags.initContainers) {
        cmdParts.push("--init-containers");
      }
      if (flags.kubeconfig) {
        cmdParts.push("--kubeconfig", `"${flags.kubeconfig}"`);
      }
      if (flags.maxLogRequests) {
        cmdParts.push("--max-log-requests", `${flags.maxLogRequests}`);
      }
      if (flags.namespace && flags.namespace.length > 0) {
        cmdParts.push("--namespace", flags.namespace.join(","));
      }
      if (flags.noFollow) {
        cmdParts.push("--no-follow");
      }
      if (flags.node) {
        cmdParts.push("--node", flags.node);
      }
      if (flags.onlyLogLines) {
        cmdParts.push("--only-log-lines");
      }
      if (flags.output && !flags.template) {
        const output = flags.output;
        if (
          output === "default" ||
          output === "raw" ||
          output === "json" ||
          output === "extjson" ||
          output === "ppextjson"
        ) {
          cmdParts.push("--output", output);
        }
      }
      if (flags.prompt) {
        cmdParts.push("--prompt");
      }
      if (flags.podColors && flags.podColors.length > 0) {
        cmdParts.push("--container-state", flags.podColors.join(","));
      }
      if (flags.selector) {
        cmdParts.push("--selector", `"${flags.selector}"`);
      }
      if (flags.since) {
        cmdParts.push("--since", flags.since);
      }
      if (flags.tail && flags.tail >= -1) {
        cmdParts.push("--tail", `${flags.tail}`);
      }
      if (flags.template) {
        cmdParts.push("--template", `'${flags.template}'`);
      }
      if (flags.templateFile) {
        cmdParts.push("--template-file", `'${flags.templateFile}'`);
      }
      if (flags.timestamps) {
        const timestamps = flags.timestamps;
        if (timestamps === "default" || timestamps === "short") {
          cmdParts.push(`--timestamps=${timestamps}`); // TODO AF - Add option on Lens settings
        }
      }
      if (flags.timezone) {
        cmdParts.push("--timezone", `"${flags.timezone}"`);
      }
      if (flags.verbosity) {
        cmdParts.push("--verbosity", `${flags.verbosity}`);
      }
    }

    return cmdParts.join(" ");
  }
}
