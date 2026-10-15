import React from "react";
import { Renderer } from "@k8slens/extensions";
import { MultiPodLogsCommon } from "../common";

type Job = Renderer.K8sApi.Job;
type Pod = Renderer.K8sApi.Pod;

interface State {
  pods: Pod[];
  containerNames: Set<string>;
}

export class JobMultiPodLogsMenu extends React.Component<
  Renderer.Component.KubeObjectMenuProps<Job>,
  State
> {
  job: Job;

  protected jStore = Renderer.K8sApi.apiManager.getStore(
    Renderer.K8sApi.jobApi
  ) as Renderer.K8sApi.JobStore;

  constructor(props: Renderer.Component.KubeObjectMenuProps<Job>) {
    super(props);
    this.job = props.object;
    this.state = {
      pods: [],
      containerNames: new Set(),
    };
  }

  async componentDidMount() {
    // Get job pods
    const podList = this.jStore.getChildPods(this.job);

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
      this.job.getNs(),
      "job",
      this.job.getName(),
      "Job"
    );
  }
}
