import React from "react";
import { Renderer, Common } from "@k8slens/extensions";

type Deployment = Renderer.K8sApi.Deployment;

const {
  Component: { createTerminalTab, terminalStore, MenuItem, Icon },
  Navigation,
} = Renderer;
const { Util, App } = Common;

export class DeploymentMultiPodLogsMenu extends React.Component<
  Renderer.Component.KubeObjectMenuProps<Deployment>
> {
  render() {
    const { object: deployment, toolbar } = this.props;
    if (!deployment) return null;

    // Show menu item only if deployment has at least 1 replica
    const replicas = deployment.getReplicas();
    if (replicas <= 0) return null;

    // Create menu item UI
    return (
      <MenuItem onClick={Util.prevDefault(() => this.execStern())}>
        <Icon
          material="playlist_play"
          interactive={toolbar}
          tooltip="Multi Pod Logs"
        />
        <span className="title">Multi Pod Logs</span>
      </MenuItem>
    );
  }

  async execStern() {
    const deployment = this.props.object;
    console.log(deployment);

    const sternPath = /* App.Preferences.getKubectlPath() || */ "stern";
    const commandParts = [
      sternPath,
      "deployment/" + deployment.getName(),
      "--color",
      "never",
      "--namespace",
      deployment.getNs(),
      "--output",
      "default",
      "--since",
      "1s",
      "--timestamps",
    ];

    if (false) {
      commandParts.push("--context", "XXX");
    }

    if (false) {
      commandParts.push("--container", "XXX");
    }

    const shell = createTerminalTab({
      title: `Multi Pod Logs | Deployment: ${deployment.getName()}`,
    });

    terminalStore.sendCommand(commandParts.join(" "), {
      enter: true,
      tabId: shell.id,
    });

    Navigation.hideDetails();
  }
}
