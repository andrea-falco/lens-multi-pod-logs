import React from "react";
import { Renderer, Common } from "@k8slens/extensions";
import { SternCmd } from "./stern";
import { sternPreferenceStore } from "./preference/stern-preference/stern-preference-store";

const {
  Component: { MenuItem, Icon, SubMenu, StatusBrick },
} = Renderer;

type Pod = Renderer.K8sApi.Pod;

export class MultiPodLogsCommon {
  /**
   * Get the container name list by a list of pods.
   *
   * @param podList
   * @returns a set, without duplicates
   */
  public static getContainersByPodList(podList: Pod[]): Set<string> {
    const containerNameList: Set<string> = new Set();
    for (let i = 0; i < podList.length; i++) {
      const containers = podList[i].getContainers();
      for (let j = 0; j < containers.length; j++) {
        containerNameList.add(containers[j].name);
      }
    }

    return containerNameList;
  }

  /**
   * Construct the menu voices.
   *
   * @param props
   * @param containerNames
   * @param resourceNs
   * @param resourceType
   * @param resourceName
   * @param resourceTitle
   * @returns the MenuItem to show in Lens
   */
  public static uiMenu(
    props: any,
    containerNames: Set<string>,
    resourceNs: string,
    resourceType: string,
    resourceName: string,
    resourceTitle: string
  ) {
    return (
      <MenuItem
        onClick={Common.Util.prevDefault(() =>
          this.multiPodLogs(
            resourceNs,
            resourceType,
            resourceName,
            resourceTitle
          )
        )}
      >
        <Icon
          material="playlist_play"
          interactive={props.toolbar}
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
                  onClick={Common.Util.prevDefault(() =>
                    this.multiPodLogs(
                      resourceNs,
                      resourceType,
                      resourceName,
                      resourceTitle
                    )
                  )}
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
                            this.multiPodLogs(
                              resourceNs,
                              resourceType,
                              resourceName,
                              resourceTitle,
                              { exclude: c }
                            )
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
                            this.multiPodLogs(
                              resourceNs,
                              resourceType,
                              resourceName,
                              resourceTitle,
                              { include: c }
                            )
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

  private static multiPodLogs(
    resourceNs: string,
    resourceType: string,
    resourceName: string,
    resourceTitle: string,
    options?: { exclude?: string; include?: string }
  ) {
    // Generate stern command
    const cmd = SternCmd.generateCmd(
      `${resourceType}/${resourceName}`,
      {
        namespace: resourceNs,
        excludeContainer: options?.exclude,
        container: options?.include,
        color: "auto",
        since: "1s",
        maxLogRequests: sternPreferenceStore.maxLogRequests,
      },
      {
        krew: sternPreferenceStore.krew,
      }
    );

    // Open new terminal
    this.openTerminal(
      `Multi Pod Logs | ${resourceTitle}: ${resourceName}`,
      cmd
    );
  }

  private static openTerminal(title: string, command: string) {
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
