import { Main } from "@k8slens/extensions";
import { sternPreferenceStore } from "./src/preference/stern-preference/stern-preference-store";

/**
 * Main.LensExtension api allows you to access, configure, and customize Lens data add
 * custom application menu items, and generally run custom code in Lens'
 * main process.
 *
 * See more details: <https://docs.k8slens.dev/>
 */
export default class MultiPodLogsMain extends Main.LensExtension {
  /**
   * onActivate is called when your extension has been successfully enabled.
   */
  onActivate() {
    // !! Note that the console statements in MainExtension is NOT visible in the
    // !! DevTools console in Lens
    // To see console statements, start the Lens app from a Terminal
    console.log("lens-multi-pod-logs main | activating...");
    sternPreferenceStore.loadExtension(this);
    console.log("lens-multi-pod-logs main | activated");
  }
}
