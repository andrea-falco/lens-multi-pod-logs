import { Common } from "@k8slens/extensions";
import { observable, makeObservable } from "mobx";

export type MultiPodLogsSternPreferenceModel = {
  krew: boolean;
  maxLogRequests: number;
};

export class MultiPodLogsSternPreferencesStore extends Common.Store
  .ExtensionStore<MultiPodLogsSternPreferenceModel> {
  // Store properties
  @observable krew = false;
  @observable maxLogRequests = 50;

  constructor() {
    super({
      // Store name
      configName: "stern-preference-store",
      // Store default property values
      defaults: {
        krew: false,
        maxLogRequests: 50,
      },
    });
    makeObservable(this);
  }

  protected fromStore({
    krew,
    maxLogRequests,
  }: MultiPodLogsSternPreferenceModel): void {
    this.krew = krew;
    this.maxLogRequests = maxLogRequests;
  }

  toJSON(): MultiPodLogsSternPreferenceModel {
    return {
      krew: this.krew,
      maxLogRequests: this.maxLogRequests,
    };
  }
}

export const sternPreferenceStore = new MultiPodLogsSternPreferencesStore();
