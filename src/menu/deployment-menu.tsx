import React from "react";
import { Renderer } from "@k8slens/extensions";
import { MultiPodLogsCommon } from "../common";

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
    const containerNameList =
      MultiPodLogsCommon.getContainersByPodList(podList);

    // Update state
    this.setState({
      pods: podList,
      containerNames: containerNameList,
    });
  }

  render() {
    const { containerNames } = this.state;

    // Show menu item only if deployment has at least 1 replica
    if (!this.deployment || this.deployment.getReplicas() <= 0) {
      return null;
    }

    // Render menu item UI (and associate onClick action)
    return MultiPodLogsCommon.uiMenu(
      this.props,
      containerNames,
      this.deployment.getNs(),
      "deployment",
      this.deployment.getName(),
      "Deployment"
    );
  }
}
