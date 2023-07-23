import React from "react";
import { Renderer } from "@k8slens/extensions";
import { MultiPodLogsCommon } from "../common";

type StatefulSet = Renderer.K8sApi.StatefulSet;
type Pod = Renderer.K8sApi.Pod;

interface State {
  pods: Pod[];
  containerNames: Set<string>;
}

export class StatefulSetMultiPodLogsMenu extends React.Component<
  Renderer.Component.KubeObjectMenuProps<StatefulSet>,
  State
> {
  statefulset: StatefulSet;

  protected sStore = Renderer.K8sApi.apiManager.getStore(
    Renderer.K8sApi.statefulSetApi
  ) as Renderer.K8sApi.StatefulSetStore;

  constructor(props: Renderer.Component.KubeObjectMenuProps<StatefulSet>) {
    super(props);
    this.statefulset = props.object;
    this.state = {
      pods: [],
      containerNames: new Set(),
    };
  }

  async componentDidMount() {
    // Get statefulset pods
    const podList = this.sStore.getChildPods(this.statefulset);

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

    // Show menu item only if statefulset has at least 1 replica
    if (!this.statefulset || this.statefulset.getReplicas() <= 0) {
      return null;
    }

    // Render menu item UI (and associate onClick action)
    return MultiPodLogsCommon.uiMenu(
      this.props,
      containerNames,
      this.statefulset.getNs(),
      "statefulset",
      this.statefulset.getName(),
      "StatefulSet"
    );
  }
}
