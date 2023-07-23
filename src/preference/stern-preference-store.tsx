import { Common } from "@k8slens/extensions";
import { observable, makeObservable } from "mobx";

export type MultiPodLogsSternPreferenceModel = {
  krew: boolean;
};

export class MultiPodLogsSternPreferencesStore extends Common.Store
  .ExtensionStore<MultiPodLogsSternPreferenceModel> {
  // Store properties
  @observable krew = false;

  constructor() {
    super({
      // Store name
      configName: "stern-preference-store",
      // Store default property values
      defaults: {
        krew: false,
      },
    });
    makeObservable(this);
  }

  protected fromStore({ krew }: MultiPodLogsSternPreferenceModel): void {
    this.krew = krew;
  }

  toJSON(): MultiPodLogsSternPreferenceModel {
    return {
      krew: this.krew,
    };
  }
}

export const sternPreferenceStore = new MultiPodLogsSternPreferencesStore();
