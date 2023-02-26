import React from "react";
import { Renderer, Common } from "@k8slens/extensions";
import { SternCmd } from "./stern";

type Deployment = Renderer.K8sApi.Deployment;

export class DeploymentMultiPodLogsMenu extends React.Component<
  Renderer.Component.KubeObjectMenuProps<Deployment>
> {
  // Get deployment
  deployment = this.props.object;

  render() {
    // Show menu item only if deployment has at least 1 replica
    if (!this.deployment || this.deployment.getReplicas() <= 0) {
      return null;
    }

    // Render menu item UI (and associate onClick action)
    return (
      <Renderer.Component.MenuItem
        onClick={Common.Util.prevDefault(() => this.multiPodLogs())}
      >
        <Renderer.Component.Icon
          material="playlist_play"
          interactive={this.props.toolbar}
          tooltip="Multi Pod Logs"
        />
        <span className="title">Multi Pod Logs</span>
      </Renderer.Component.MenuItem>
    );
  }

  private multiPodLogs() {
    // Get deployment name
    const deploymentName = this.deployment.getName();

    // Generate stern command
    const cmd = SternCmd.generateCmd(`deployment/${deploymentName}`, {
      color: "never",
      namespace: this.deployment.getNs(),
    });

    // Open new terminal
    this.openTerminal(`Multi Pod Logs | Deployment: ${deploymentName}`, cmd);
  }

  private openTerminal(title: string, command: string) {
    const shell = Renderer.Component.createTerminalTab({
      title: title,
    });

    Renderer.Component.terminalStore.sendCommand(command, {
      enter: true,
      tabId: shell.id,
    });

    Renderer.Navigation.hideDetails();
  }
}
