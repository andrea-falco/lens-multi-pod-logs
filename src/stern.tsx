export interface SternFlags {
  allNamespaces?: boolean; // If present, tail across all namespaces. A specific namespace is ignored even if specified with --namespace.
  color?: string; // Force set color output. 'auto':  colorize if tty attached, 'always': always colorize, 'never': never colorize. (default "auto")
  completion?: string; // Output stern command-line completion code for the specified shell. Can be 'bash', 'zsh' or 'fish'.
  container?: string; // Container name when multiple containers in pod. (regular expression) (default ".*")
  containerState?: string; // Tail containers with state in running, waiting or terminated. To specify multiple states, repeat this or set comma-separated value. (default [running])
  context?: string; // Kubernetes context to use. Default to current context configured in kubeconfig.
  ephemeralContainers?: boolean; // Include or exclude ephemeral containers. (default true)
  exclude?: string; // Log lines to exclude. (regular expression)
  excludeContainer?: string; // Container name to exclude when multiple containers in pod. (regular expression)
  excludePod?: string; // Pod name to exclude. (regular expression)
  fieldSelector?: string; // Selector (field query) to filter on. If present, default to ".*" for the pod-query.
  include?: string; // Log lines to include. (regular expression)
  initContainers?: boolean; // Include or exclude init containers. (default true)
  kubeConfig?: string; // Path to kubeconfig file to use. Default to KUBECONFIG variable then ~/.kube/config path.
  maxLogRequests?: number; // Maximum number of concurrent logs to request. Defaults to 50, but 5 when specifying --no-follow (default -1)
  namespace?: string; // Kubernetes namespace to use. Default to namespace configured in kubernetes context. To specify multiple namespaces, repeat this or set comma-separated value.
  noFollow?: boolean; // Exit when all logs have been shown.
  onlyLogLines?: boolean; // Print only log lines
  output?: string; // Specify predefined template. Currently support: [default, raw, json, extjson, ppextjson] (default "default")
  prompt?: string; // Toggle interactive prompt for selecting 'app.kubernetes.io/instance' label values.
  selector?: string; // Selector (label query) to filter on. If present, default to ".*" for the pod-query.
  since?: string; // Return logs newer than a relative duration like 5s, 2m, or 3h. (default 48h0m0s)
  tail?: number; // The number of lines from the end of the logs to show. Defaults to -1, showing all logs. (default -1)
  template?: string; // Template to use for log lines, leave empty to use --output flag.
  timestamps?: boolean; // Print timestamps.
  timezone?: string; // Set timestamps to specific timezone. (default "Local")
  verbosity?: number; // Number of the log level verbosity
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
      if (flags.containerState) {
        const containerState = flags.containerState;
        if (
          containerState === "running" ||
          containerState === "waiting" ||
          containerState === "terminated"
        ) {
          // TODO Support multiple states (separated by comma)
          cmdParts.push("--container-state", containerState);
        }
      }
      if (flags.context) {
        cmdParts.push("--context", flags.context);
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
      if (flags.include) {
        cmdParts.push("--include", `"${flags.include}"`);
      }
      if (flags.initContainers) {
        cmdParts.push("--init-containers");
      }
      if (flags.kubeConfig) {
        cmdParts.push("--kubeconfig", `"${flags.kubeConfig}"`);
      }
      if (flags.maxLogRequests) {
        cmdParts.push("--max-log-requests", `${flags.maxLogRequests}`);
      }
      if (flags.namespace) {
        cmdParts.push("--namespace", flags.namespace);
      }
      if (flags.noFollow) {
        cmdParts.push("--no-follow");
      }
      if (flags.onlyLogLines) {
        cmdParts.push("--only-log-lines");
      }
      if (flags.output) {
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
        cmdParts.push("--prompt", `"${flags.prompt}"`);
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
        cmdParts.push("--template", `"${flags.template}"`);
      }
      if (flags.timestamps) {
        cmdParts.push("--timestamps");
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
