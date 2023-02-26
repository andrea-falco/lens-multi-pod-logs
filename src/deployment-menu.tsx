import React from "react";
import { Renderer, Common } from "@k8slens/extensions";
import { SternCmd } from "./stern";

type Deployment = Renderer.K8sApi.Deployment;

const {
  Component: { createTerminalTab, terminalStore, MenuItem, Icon },
  Navigation,
} = Renderer;
const { Util, App } = Common;

export class DeploymentMultiPodLogsMenu extends React.Component<
  Renderer.Component.KubeObjectMenuProps<Deployment>
> {
  // Current deployment
  deployment = this.props.object;

  render() {
    if (!this.deployment) return null;

    // Show menu item only if deployment has at least 1 replica
    const replicas = this.deployment.getReplicas();
    if (replicas <= 0) return null;

    // Render menu item UI (and associate onClick action)
    return (
      <MenuItem onClick={Util.prevDefault(() => this.execStern())}>
        <Icon
          material="playlist_play"
          interactive={this.props.toolbar}
          tooltip="Multi Pod Logs"
        />
        <span className="title">Multi Pod Logs</span>
      </MenuItem>
    );
  }

  async execStern() {
    const deploymentName = this.deployment.getName();

    const cmd: string = SternCmd.generateCmd(`deployment/${deploymentName}`, {
      color: "never",
      namespace: this.deployment.getNs(),
    });

    const shell = createTerminalTab({
      title: `Multi Pod Logs | Deployment: ${deploymentName}`,
    });

    terminalStore.sendCommand(cmd, {
      enter: true,
      tabId: shell.id,
    });

    Navigation.hideDetails();
  }
}
