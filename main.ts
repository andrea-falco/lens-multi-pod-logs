import { Main } from "@k8slens/extensions";

/**
 * Main.LensExtension api allows you to access, configure, and customize Lens data add
 * custom application menu items, and generally run custom code in Lens'
 * main process.
 * 
 * See more details: <https://docs.k8slens.dev/>
 */
export default class YourExtensionMain extends Main.LensExtension {
  /**
   * onActivate is called when your extension has been successfully enabled.
   */
  onActivate() {
    // print hello world when extension is activated
    // !! Note that the console statements in MainExtension is NOT visible in the 
    // !! DevTools console in Lens
    // To see console statements, start the Lens app from a Terminal
    console.log("activated");
  }
}
