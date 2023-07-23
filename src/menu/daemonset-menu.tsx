import React from "react";
import { Renderer } from "@k8slens/extensions";
import { MultiPodLogsCommon } from "../common";

type DaemonSet = Renderer.K8sApi.DaemonSet;
type Pod = Renderer.K8sApi.Pod;

interface State {
  pods: Pod[];
  containerNames: Set<string>;
}

export class DaemonSetMultiPodLogsMenu extends React.Component<
  Renderer.Component.KubeObjectMenuProps<DaemonSet>,
  State
> {
  daemonset: DaemonSet;

  protected dStore = Renderer.K8sApi.apiManager.getStore(
    Renderer.K8sApi.daemonSetApi
  ) as Renderer.K8sApi.DaemonSetStore;

  constructor(props: Renderer.Component.KubeObjectMenuProps<DaemonSet>) {
    super(props);
    this.daemonset = props.object;
    this.state = {
      pods: [],
      containerNames: new Set(),
    };
  }

  async componentDidMount() {
    // Get daemonset pods
    const podList = this.dStore.getChildPods(this.daemonset);

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

    // Render menu item UI (and associate onClick action)
    return MultiPodLogsCommon.uiMenu(
      this.props,
      containerNames,
      this.daemonset.getNs(),
      "daemonset",
      this.daemonset.getName(),
      "DaemonSet"
    );
  }
}
