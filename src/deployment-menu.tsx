import React from "react";
import { Renderer, Common } from "@k8slens/extensions";
import { SternCmd, SternFlags } from "./stern";

const {
  Component: { MenuItem, Icon, SubMenu, StatusBrick },
} = Renderer;

type Deployment = Renderer.K8sApi.Deployment;
type Pod = Renderer.K8sApi.Pod;

interface State {
  pods: Pod[];
  containerNames: Set<string>;
}

export class DeploymentMultiPodLogsMenu extends React.Component<
  Renderer.Component.KubeObjectMenuProps<Deployment>,
  State
> {
  deployment: Deployment;

  protected dStore = Renderer.K8sApi.apiManager.getStore(
    Renderer.K8sApi.deploymentApi
  ) as Renderer.K8sApi.DeploymentStore;

  constructor(props: Renderer.Component.KubeObjectMenuProps<Deployment>) {
    super(props);
    this.deployment = props.object;
    this.state = {
      pods: [],
      containerNames: new Set(),
    };
  }

  async componentDidMount() {
    // Get deployment pods
    const podList = this.dStore.getChildPods(this.deployment);

    // Get all containers from all pods
    const containerNameList: Set<string> = new Set();
    for (let i = 0; i < podList.length; i++) {
      const containers = podList[i].getContainers();
      for (let j = 0; j < containers.length; j++) {
        containerNameList.add(containers[j].name);
      }
    }

    // Update state
    this.setState({
      pods: podList,
      containerNames: containerNameList,
    });
  }

  render() {
    const { pods, containerNames } = this.state;

    // Show menu item only if deployment has at least 1 replica
    if (!this.deployment || this.deployment.getReplicas() <= 0) {
      return null;
    }

    // Render menu item UI (and associate onClick action)
    return (
      <MenuItem onClick={Common.Util.prevDefault(() => this.multiPodLogs())}>
        <Icon
          material="playlist_play"
          interactive={this.props.toolbar}
          tooltip="Multi Pod Logs"
        />
        <span className="title">Multi Pod Logs</span>
        {
          // Show sub-menu only if deployment pods has at least 2 containers
          containerNames.size > 1 && (
            <>
              <Icon material="keyboard_arrow_right" />
              <SubMenu>
                {/* All containers */}
                <MenuItem
                  onClick={Common.Util.prevDefault(() => this.multiPodLogs())}
                >
                  <span>All containers</span>
                </MenuItem>
                {/* All containers, except selected */}
                <MenuItem onClick={Common.Util.prevDefault(() => {})}>
                  <span>All except</span>
                  <Icon material="keyboard_arrow_right" />

                  <SubMenu>
                    {Array.from(containerNames).map((c) => {
                      return (
                        <MenuItem
                          key={`except_${c}`}
                          onClick={Common.Util.prevDefault(() =>
                            this.multiPodLogs({ exclude: c })
                          )}
                        >
                          <StatusBrick />
                          <span>{c}</span>
                        </MenuItem>
                      );
                    })}
                  </SubMenu>
                </MenuItem>
                {/* Only selected container */}
                <MenuItem onClick={Common.Util.prevDefault(() => {})}>
                  <span>Only</span>
                  <Icon material="keyboard_arrow_right" />

                  <SubMenu>
                    {Array.from(containerNames).map((c) => {
                      return (
                        <MenuItem
                          key={`only_${c}`}
                          onClick={Common.Util.prevDefault(() =>
                            this.multiPodLogs({ include: c })
                          )}
                        >
                          <StatusBrick />
                          <span>{c}</span>
                        </MenuItem>
                      );
                    })}
                  </SubMenu>
                </MenuItem>
              </SubMenu>
            </>
          )
        }
      </MenuItem>
    );
  }

  private multiPodLogs(options?: { exclude?: string; include?: string }) {
    // Get deployment name
    const deploymentName = this.deployment.getName();

    // Generate stern command
    const cmd = SternCmd.generateCmd(`deployment/${deploymentName}`, {
      namespace: this.deployment.getNs(),
      excludeContainer: options?.exclude,
      container: options?.include,
      color: "auto",
      since: "1s",
    });

    // Open new terminal
    this.openTerminal(`Multi Pod Logs | Deployment: ${deploymentName}`, cmd);
  }

  private openTerminal(title: string, command: string) {
    const tab = Renderer.Component.createTerminalTab({
      title: title,
    });

    Renderer.Component.terminalStore.sendCommand(command, {
      enter: true,
      tabId: tab.id,
    });

    Renderer.Navigation.hideDetails();
  }
}
