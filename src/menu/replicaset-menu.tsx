import React from "react";
import { Renderer } from "@k8slens/extensions";
import { MultiPodLogsCommon } from "../common";

type ReplicaSet = Renderer.K8sApi.ReplicaSet;
type Pod = Renderer.K8sApi.Pod;

interface State {
  pods: Pod[];
  containerNames: Set<string>;
}

export class ReplicaSetMultiPodLogsMenu extends React.Component<
  Renderer.Component.KubeObjectMenuProps<ReplicaSet>,
  State
> {
  replicaset: ReplicaSet;

  protected dStore = Renderer.K8sApi.apiManager.getStore(
    Renderer.K8sApi.replicaSetApi
  ) as Renderer.K8sApi.ReplicaSetStore;

  constructor(props: Renderer.Component.KubeObjectMenuProps<ReplicaSet>) {
    super(props);
    this.replicaset = props.object;
    this.state = {
      pods: [],
      containerNames: new Set(),
    };
  }

  async componentDidMount() {
    // Get replicaset pods
    const podList = this.dStore.getChildPods(this.replicaset);

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

    // Show menu item only if replicaset has at least 1 replica
    if (!this.replicaset || this.replicaset.getCurrent() <= 0) {
      return null;
    }

    // Render menu item UI (and associate onClick action)
    return MultiPodLogsCommon.uiMenu(
      this.props,
      containerNames,
      this.replicaset.getNs(),
      "replicaset",
      this.replicaset.getName(),
      "ReplicaSet"
    );
  }
}
