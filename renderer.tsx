import React from "react";
import { Renderer } from "@k8slens/extensions";

import { DeploymentMultiPodLogsMenu } from "./src/menu/deployment-menu";
import { StatefulSetMultiPodLogsMenu } from "./src/menu/statefulset-menu";
import { DaemonSetMultiPodLogsMenu } from "./src/menu/daemonset-menu";

import { sternPreferenceStore } from "./src/preference/stern-preference/stern-preference-store";
import {
  MultiPodLogsSternPreference,
  MultiPodLogsSternPreferenceHint,
} from "./src/preference/stern-preference/stern-preference";

type Deployment = Renderer.K8sApi.Deployment;
type StatefulSet = Renderer.K8sApi.StatefulSet;
type DaemonSet = Renderer.K8sApi.DaemonSet;

/**
 *
 * RendererExtension which extends LensRendererExtension runs in Lens' 'renderer' process (NOT 'main' process)
 * main vs renderer <https://www.electronjs.org/docs/tutorial/quick-start#main-and-renderer-processes>
 *
 * LensRendererExtension is the interface to Lens' renderer process. Its api allows you to access, configure,
 * and customize Lens data add custom Lens UI elements, and generally run custom code in Lens' renderer process.
 *
 * To see console statements in 'renderer' process, go to the console tab in DevTools in Lens
 * View > Toggle Developer Tools > Console.
 *
 */
export default class MultiPodLogsRenderer extends Renderer.LensExtension {
  // Array of objects matching the KubeObjectMenuRegistration interface
  kubeObjectMenuItems = [
    {
      kind: "Deployment",
      apiVersions: ["apps/v1"],
      components: {
        MenuItem: (
          props: Renderer.Component.KubeObjectMenuProps<Deployment>
        ) => <DeploymentMultiPodLogsMenu {...props} />,
      },
    },
    {
      kind: "StatefulSet",
      apiVersions: ["apps/v1"],
      components: {
        MenuItem: (
          props: Renderer.Component.KubeObjectMenuProps<StatefulSet>
        ) => <StatefulSetMultiPodLogsMenu {...props} />,
      },
    },
    {
      kind: "DaemonSet",
      apiVersions: ["apps/v1"],
      components: {
        MenuItem: (
          props: Renderer.Component.KubeObjectMenuProps<DaemonSet>
        ) => <DaemonSetMultiPodLogsMenu {...props} />,
      },
    },
  ];

  // Array of objects for extension preferences
  appPreferences = [
    {
      title: "",
      components: {
        Input: () => <MultiPodLogsSternPreference />,
        Hint: () => <MultiPodLogsSternPreferenceHint />,
      },
    },
  ];

  // Enabling extension calls onActivate()
  onActivate() {
    console.log("lens-multi-pod-logs renderer | activating...");
    sternPreferenceStore.loadExtension(this);
    console.log("lens-multi-pod-logs renderer | activated");
  }

  // Disabling extension calls onDeactivate()
  onDeactivate() {
    console.log("lens-multi-pod-logs renderer | de-activated");
  }
}
