import React from "react";
import { Renderer } from "@k8slens/extensions";
import { DeploymentMultiPodLogsMenu } from "./src/deployment-menu";

type Deployment = Renderer.K8sApi.Deployment;

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
  ];

  // Enabling extension calls onActivate()
  onActivate() {
    console.log("lens-multi-pod-logs extension | activated");
  }

  // Disabling extension calls onDeactivate()
  onDeactivate() {
    console.log("lens-multi-pod-logs extension | de-activated");
  }
}
